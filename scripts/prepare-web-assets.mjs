import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const root = new URL("../public/images/", import.meta.url);
const path = (name) => fileURLToPath(new URL(name, root));
await mkdir(root, { recursive: true });
for (const name of [
  "movement",
  "ensemble",
  "ritual",
  "overhead",
  "heritage",
  "textile",
]) {
  await sharp(path(`${name}.jpg`))
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(path(`${name}.webp`));
}
await sharp(path("dancer.png"))
  .extract({ left: 236, top: 239, width: 1646, height: 1639 })
  .resize({ width: 1400 })
  .webp({ quality: 92, alphaQuality: 100 })
  .toFile(path("dancer.webp"));
await sharp(path("footer.png"))
  .extract({ left: 15, top: 372, width: 1204, height: 708 })
  .webp({ quality: 94, alphaQuality: 100 })
  .toFile(path("footer.webp"));
for (const name of ["wordmark", "emblem"]) {
  await sharp(path(`${name}.png`))
    .trim()
    .webp({ lossless: true })
    .toFile(path(`${name}.webp`));
}
await sharp(path("hero-atmosphere.png"))
  .webp({ quality: 82 })
  .toFile(path("hero-atmosphere.webp"));
console.log("Prepared optimized copies; originals preserved.");
