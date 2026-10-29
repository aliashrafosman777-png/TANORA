// DOM interaction checks; run with TANORA_JSDOM_PATH pointing to a jsdom installation.
// These validate React behavior, not browser layout or native dialog implementation.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const { JSDOM } = require(process.env.TANORA_JSDOM_PATH || "jsdom");
const dom = new JSDOM(
  '<!doctype html><html><body><div id="root"></div></body></html>',
  { url: "http://localhost/" },
);
for (const name of [
  "window",
  "document",
  "HTMLElement",
  "HTMLDialogElement",
  "MouseEvent",
  "KeyboardEvent",
  "Event",
])
  global[name] = dom.window[name];
global.IS_REACT_ACT_ENVIRONMENT = true;
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
dom.window.HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute("open", "");
  this.querySelector("button")?.focus();
};
dom.window.HTMLDialogElement.prototype.close = function () {
  this.removeAttribute("open");
  this.dispatchEvent(new Event("close"));
};
const React = require("react");
const { act } = React;
const { createRoot } = require("react-dom/client");
const motionMock = {
  MotionConfig: ({ children }) => children,
  useReducedMotion: () => true,
  motion: new Proxy(
    {},
    {
      get: (_, tag) =>
        React.forwardRef(
          (
            {
              initial,
              animate,
              whileInView,
              viewport,
              transition,
              children,
              ...props
            },
            ref,
          ) => React.createElement(tag, { ...props, ref }, children),
        ),
    },
  ),
};
const filename = path.join(__dirname, "../src/components/tanora.tsx");
const compiled = require("typescript").transpileModule(
  fs.readFileSync(filename, "utf8"),
  { compilerOptions: { jsx: 4, module: 1, target: 7, esModuleInterop: true } },
).outputText;
const loaded = new Module(filename, module);
loaded.filename = filename;
loaded.paths = Module._nodeModulePaths(path.dirname(filename));
const originalRequire = loaded.require.bind(loaded);
loaded.require = (name) =>
  name === "motion/react" ? motionMock : originalRequire(name);
loaded._compile(compiled, filename);
const root = createRoot(document.getElementById("root"));
function button(label) {
  return Array.from(document.querySelectorAll("button")).find(
    (b) =>
      b.getAttribute("aria-label") === label || b.textContent.trim() === label,
  );
}
async function click(element) {
  assert(element, "Target exists");
  element.focus();
  await act(() => element.click());
}
async function key(value) {
  await act(() =>
    document
      .querySelector(".media-dialog")
      .dispatchEvent(
        new KeyboardEvent("keydown", { key: value, bubbles: true }),
      ),
  );
}
(async () => {
  await act(() => root.render(React.createElement(loaded.exports.default)));
  assert.equal(document.querySelectorAll(".gallery-item").length, 6);
  await click(button("Heritage"));
  assert.equal(document.querySelectorAll(".gallery-item").length, 2);
  assert.equal(button("Heritage").getAttribute("aria-pressed"), "true");
  await click(button("Movement"));
  assert.equal(document.querySelectorAll(".gallery-item").length, 4);
  const opener = button("View The shape of a turn");
  await click(opener);
  assert(document.querySelector(".media-dialog[open]"));
  assert.equal(document.body.style.overflow, "hidden");
  assert.equal(
    document.querySelector("#dialog-title").textContent,
    "The shape of a turn",
  );
  await click(button("Next image"));
  assert.equal(
    document.querySelector("#dialog-title").textContent,
    "Stillness in motion",
  );
  await key("ArrowLeft");
  assert.equal(
    document.querySelector("#dialog-title").textContent,
    "The shape of a turn",
  );
  await key("ArrowLeft");
  assert.equal(
    document.querySelector("#dialog-title").textContent,
    "A circle, unfolding",
  );
  await act(() => document.querySelector(".media-dialog").close());
  assert.equal(document.querySelector(".media-dialog"), null);
  assert.equal(document.body.style.overflow, "");
  assert.equal(document.activeElement, opener);
  await click(button("All"));
  assert.equal(document.querySelectorAll(".gallery-item").length, 6);
  await click(button("Explore the movement"));
  assert.equal(
    document.querySelector("#dialog-title").textContent,
    "THE MOVEMENT",
  );
  await click(button("Next image"));
  assert.equal(
    document.querySelector("#dialog-title").textContent,
    "THE MUSIC",
  );
  await click(button("Close image viewer"));
  assert.equal(document.querySelector(".media-dialog"), null);
  await click(button("Open navigation"));
  assert(document.querySelector(".mobile-menu[open]"));
  assert.equal(button("Open navigation").getAttribute("aria-expanded"), "true");
  await click(button("Close navigation"));
  assert.equal(document.querySelector(".mobile-menu"), null);
  assert.equal(document.body.style.overflow, "");
  assert.equal(document.activeElement, button("Open navigation"));
  for (const a of document.querySelectorAll('a[href^="#"]'))
    assert(
      document.getElementById(a.hash.slice(1)),
      "Anchor exists: " + a.hash,
    );
  assert.equal(document.querySelectorAll("h1").length, 1);
  await act(() => root.unmount());
  console.log(
    "PASS: filters, gallery navigation and wrapping, experience dialogs, focus restoration, scroll unlock, mobile menu, anchors, and heading structure.",
  );
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
