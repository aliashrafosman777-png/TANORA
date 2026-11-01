"use client";

import { useEffect, useRef, useState } from "react";
import { motion, MotionConfig, useReducedMotion } from "motion/react";

const experiences = [
  {
    number: "01",
    title: "THE MOVEMENT",
    label: "A language without words",
    image: "dancer",
    alt: "Tanoura dancer with a flowing terracotta skirt and teal shadows",
    className: "movement",
    body: "An outstretched hand. A sweep of fabric. A circle that becomes a world of its own. Movement is at the heart of TANORA — expressive, instinctive, and always alive.",
    caption: "Movement / The art of the turn",
  },
  {
    number: "02",
    title: "THE MUSIC",
    label: "Feel the rhythm. Find your place.",
    image: "ensemble",
    alt: "An ensemble of white-robed whirling performers in a warmly lit hall",
    className: "music",
    body: "Rooted in traditional Egyptian music and the energy of live performance, TANORA brings rhythm into a shared space. A place to gather, listen, and feel the celebration.",
    caption: "Music / A shared rhythm",
  },
  {
    number: "03",
    title: "THE HERITAGE",
    label: "Carried forward. Never standing still.",
    image: "textile",
    alt: "An intricate textile pattern in muted gold, burgundy, and deep teal",
    className: "heritage",
    body: "The colors, forms, music, and dance of Egyptian folk heritage inspire a contemporary expression. Familiar patterns take on a new rhythm, while their roots remain part of the story.",
    caption: "Heritage / A living inspiration",
  },
];
const gallery = [
  {
    image: "movement",
    title: "The shape of a turn",
    category: "Movement",
    alt: "Overhead view of a whirling dancer with flowing white fabric",
  },
  {
    image: "heritage",
    title: "Color in celebration",
    category: "Heritage",
    alt: "Expressive painting of a colorful Egyptian Tanoura dancer",
  },
  {
    image: "ritual",
    title: "Stillness in motion",
    category: "Movement",
    alt: "Monochrome photograph of a whirling dancer in an architectural courtyard",
  },
  {
    image: "textile",
    title: "Threads of tradition",
    category: "Heritage",
    alt: "Repeating floral textile geometry in teal, cream, and burgundy",
  },
  {
    image: "ensemble",
    title: "A shared rhythm",
    category: "Movement",
    alt: "An ensemble of whirling dancers on a warm wooden floor",
  },
  {
    image: "overhead",
    title: "A circle, unfolding",
    category: "Movement",
    alt: "White skirt opening into a circular form, viewed from above",
  },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg className="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
function Rings({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`rings ${className}`}
      viewBox="0 0 700 700"
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: 22 }, (_, i) => (
        <circle
          key={i}
          cx="350"
          cy="350"
          r={85 + i * 12}
          stroke="currentColor"
          strokeWidth={i % 5 === 0 ? 1 : 0.6}
          opacity={0.8 - i * 0.019}
        />
      ))}
      <circle
        cx="350"
        cy="350"
        r="342"
        stroke="currentColor"
        strokeWidth=".6"
        strokeDasharray="3 11"
        opacity=".3"
      />
    </svg>
  );
}
function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 1, y: 0 }}
      whileInView={reduce ? {} : { opacity: [0.7, 1], y: [18, 0] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
function MediaDialog({
  items,
  index,
  setIndex,
  close,
}: {
  items: {
    image: string;
    title: string;
    alt: string;
    body?: string;
    category?: string;
    caption?: string;
  }[];
  index: number;
  setIndex: (index: number) => void;
  close: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const item = items[index];
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="media-dialog"
      aria-labelledby="dialog-title"
      onClose={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          setIndex((index + 1) % items.length);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setIndex((index - 1 + items.length) % items.length);
        }
      }}
    >
      <div className="dialog-inner">
        <div className="dialog-toolbar">
          <span className="eyebrow">
            TANORA / {item.category || "THE EXPERIENCE"}
          </span>
          <button
            autoFocus
            className="icon-button"
            aria-label="Close image viewer"
            onClick={close}
          >
            ×
          </button>
        </div>
        <div
          className={`dialog-image ${item.image === "dancer" ? "dialog-dancer" : ""}`}
        >
          <img src={`/images/${item.image}.webp`} alt={item.alt} />
        </div>
        <div className="dialog-bottom">
          <div aria-live="polite">
            <span className="eyebrow">
              {item.caption ||
                `${String(index + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`}
            </span>
            <h2 id="dialog-title">{item.title}</h2>
            {item.body && <p>{item.body}</p>}
          </div>
          <div className="dialog-controls">
            <button
              className="icon-button"
              aria-label="Previous image"
              onClick={() =>
                setIndex((index - 1 + items.length) % items.length)
              }
            >
              ←
            </button>
            <button
              className="icon-button"
              aria-label="Next image"
              onClick={() => setIndex((index + 1) % items.length)}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default function Tanora() {
  const [filter, setFilter] = useState("All");
  const [viewer, setViewer] = useState<{
    kind: "gallery" | "experience";
    index: number;
  } | null>(null);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const filtered = gallery.filter(
    (item) => filter === "All" || item.category === filter,
  );
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!menu) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.showModal();
    return () => {
      document.body.style.overflow = previous;
      menuButton.current?.focus({ preventScroll: true });
    };
  }, [menu]);
  const navigation = [
    { name: "The experience", href: "#experience" },
    { name: "Our story", href: "#story" },
    { name: "Gallery", href: "#gallery" },
  ];
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#top" aria-label="TANORA home">
            <img
              className="wordmark"
              src="/images/wordmark.webp"
              alt="TANORA"
              width="132"
              height="34"
            />
            <img
              className="brand-emblem"
              src="/images/emblem.webp"
              alt=""
              width="25"
              height="25"
            />
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((link) => (
              <a key={link.href} href={link.href}>
                {link.name}
              </a>
            ))}
          </nav>
          <a className="header-cta" href="#experience">
            ENTER THE EXPERIENCE <Arrow diagonal />
          </a>
          <button
            className="menu-button"
            ref={menuButton}
            aria-label="Open navigation"
            aria-haspopup="dialog"
            aria-expanded={menu}
            onClick={() => setMenu(true)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      {menu && (
        <dialog
          ref={menuRef}
          className="mobile-menu"
          aria-label="Navigation"
          onClose={() => setMenu(false)}
        >
          <div className="menu-top">
            <span className="menu-wordmark">TANORA</span>
            <button
              autoFocus
              className="icon-button"
              aria-label="Close navigation"
              onClick={() => setMenu(false)}
            >
              ×
            </button>
          </div>
          <p className="eyebrow">HERITAGE IN MOTION</p>
          <nav>
            {navigation.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  menuRef.current?.close();
                  setMenu(false);
                  requestAnimationFrame(() =>
                    document
                      .querySelector<HTMLElement>(link.href)
                      ?.focus({ preventScroll: true }),
                  );
                }}
              >
                <small>0{i + 1}</small>
                {link.name}
                <Arrow diagonal />
              </a>
            ))}
          </nav>
          <img src="/images/emblem.webp" className="menu-emblem" alt="" />
          <p className="menu-bottom">ANCIENT MOTION. NEW EXPRESSION.</p>
        </dialog>
      )}
      <main id="main" tabIndex={-1}>
        <section className="hero" id="top" aria-labelledby="hero-heading">
          <img
            className="hero-atmosphere"
            src="/images/hero-atmosphere.webp"
            alt=""
            fetchPriority="high"
            width="1672"
            height="941"
          />
          <div className="shell hero-shell">
            <motion.div
              className="hero-copy"
              initial={reduce ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="eyebrow hero-eyebrow">
                <span className="tiny-star">✳</span> EGYPTIAN SOUL. CONTEMPORARY
                SPIRIT.
              </p>
              <h1 id="hero-heading">
                THE ART
                <br />
                OF MOTION<span className="gold-period">.</span>
              </h1>
              <p className="hero-tagline">ANCIENT MOTION. NEW EXPRESSION.</p>
              <a className="button" href="#experience">
                EXPLORE THE EXPERIENCE <Arrow diagonal />
              </a>
            </motion.div>
            <motion.div
              className="hero-visual"
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.12 }}
              aria-hidden="true"
            >
              <Rings />
              <img
                className="hero-dancer"
                src="/images/dancer.webp"
                alt=""
                fetchPriority="high"
                width="1400"
                height="1394"
              />
              <div className="hero-coordinate">
                THE TURN / AN EXPRESSION WITHOUT END
              </div>
            </motion.div>
            <div className="hero-baseline">
              <a href="#experience">
                <span className="scroll-line" /> SCROLL TO FEEL THE RHYTHM
              </a>
              <span>
                HERITAGE IN MOTION <span aria-hidden="true">↘</span>
              </span>
            </div>
          </div>
        </section>

        <section
          className="intro-section shell"
          id="experience"
          tabIndex={-1}
          aria-labelledby="experience-heading"
        >
          <Reveal className="intro-grid">
            <div>
              <p className="eyebrow">01 / THE TANORA EXPERIENCE</p>
              <h2 id="experience-heading">
                ANCIENT MOTION.
                <br />
                <span className="gold-text">NEW EXPRESSION.</span>
              </h2>
            </div>
            <div className="intro-copy">
              <span className="short-rule" />
              <p>
                TANORA is where Egypt’s rich folk heritage meets the energy of
                live entertainment.
              </p>
              <p>
                Rooted in music, dance, and the spirit of celebration.
                Reimagined for the way we come together today.
              </p>
              <a className="text-link" href="#story">
                GET TO KNOW TANORA <Arrow diagonal />
              </a>
            </div>
          </Reveal>
          <Reveal className="experience-grid">
            {experiences.map((item, index) => (
              <button
                className={`experience-card ${item.className}`}
                key={item.title}
                onClick={() => setViewer({ kind: "experience", index })}
                aria-label={`Explore ${item.title.toLowerCase()}`}
              >
                <img
                  src={`/images/${item.image}.webp`}
                  alt={item.alt}
                  loading="lazy"
                  width="600"
                  height="650"
                />
                <span className="card-shade" />
                <span className="card-number">{item.number}</span>
                <span className="experience-caption">
                  <span className="card-title">{item.title}</span>
                  <span className="card-label">{item.label}</span>
                </span>
                <span className="card-arrow">
                  <Arrow diagonal />
                </span>
              </button>
            ))}
          </Reveal>
        </section>

        <section
          className="story-section"
          id="story"
          tabIndex={-1}
          aria-labelledby="story-heading"
        >
          <div className="shell story-grid">
            <Reveal className="story-art">
              <img
                src="/images/heritage.webp"
                alt="Painting of a Tanoura dancer in a flowing, brightly colored skirt"
                loading="lazy"
                width="716"
                height="494"
              />
              <span className="story-art-label">
                ROOTED IN CULTURE. MADE TO MOVE.
              </span>
              <span className="story-art-corner" />
            </Reveal>
            <Reveal className="story-copy">
              <p className="eyebrow">02 / OUR STORY</p>
              <h2 id="story-heading">
                HERITAGE
                <br />
                IS A LIVING
                <br />
                <span className="gold-text">THING.</span>
              </h2>
              <p>
                It’s in the rhythm we recognise. The colors we carry. The
                moments that bring us together.
              </p>
              <p>
                Inspired by traditional Egyptian music, dance, and performance,
                TANORA brings the spirit of old-school celebrations into a bold,
                contemporary setting.
              </p>
              <span className="story-signature">
                A place to gather. A reason to feel.
              </span>
            </Reveal>
          </div>
        </section>

        <section className="campaign" aria-label="Culture never stands still">
          <div className="shell campaign-inner">
            <img
              className="campaign-emblem"
              src="/images/emblem.webp"
              alt=""
              loading="lazy"
              width="400"
              height="400"
            />
            <p>
              CULTURE NEVER
              <br />
              <span>STANDS STILL.</span>
            </p>
            <div className="campaign-aside">
              <span className="eyebrow">THE SPIRIT OF TANORA</span>
              <span className="campaign-circle">
                <Arrow diagonal />
              </span>
            </div>
          </div>
        </section>

        <section
          className="gallery-section shell"
          id="gallery"
          tabIndex={-1}
          aria-labelledby="gallery-heading"
        >
          <Reveal>
            <div className="gallery-heading">
              <div>
                <p className="eyebrow">03 / IN THE FRAME</p>
                <h2 id="gallery-heading">
                  MOMENTS
                  <br />
                  <span className="gold-text">IN MOTION.</span>
                </h2>
              </div>
              <div className="gallery-intro">
                <p>
                  A visual world of movement, texture,
                  <br className="desktop-break" /> and the beauty in between.
                </p>
                <div className="gallery-filters" aria-label="Filter gallery">
                  {["All", "Movement", "Heritage"].map((value) => (
                    <button
                      key={value}
                      aria-pressed={filter === value}
                      onClick={() => setFilter(value)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
          <div
            className={`gallery-grid ${filter !== "All" ? "is-filtered" : ""}`}
            aria-live="polite"
          >
            {filtered.map((item, index) => (
              <button
                className={`gallery-item gallery-${item.image}`}
                key={item.image}
                onClick={() => setViewer({ kind: "gallery", index })}
                aria-label={`View ${item.title}`}
              >
                <img
                  src={`/images/${item.image}.webp`}
                  alt={item.alt}
                  loading="lazy"
                  width="736"
                  height="740"
                />
                <span className="gallery-item-shade" />
                <span className="gallery-caption">
                  <small>{item.category}</small>
                  <span>{item.title}</span>
                </span>
                <span className="gallery-expand" aria-hidden="true">
                  ↗
                </span>
              </button>
            ))}
          </div>
          <div className="gallery-footnote">
            <span>THE TANORA VISUAL JOURNAL</span>
            <span>
              {String(filtered.length).padStart(2, "0")} FRAMES / ONE SHARED
              SPIRIT
            </span>
          </div>
        </section>

        <section className="closing-section shell">
          <Reveal className="closing-inner">
            <p className="eyebrow">THE RHYTHM CONTINUES</p>
            <h2>
              COME FOR THE CULTURE.
              <br />
              <span className="gold-text">STAY FOR THE FEELING.</span>
            </h2>
            <a className="text-link" href="#experience">
              EXPLORE THE WORLD OF TANORA <Arrow diagonal />
            </a>
          </Reveal>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-art">
          <a className="footer-brand" href="#top" aria-label="TANORA — back to top">
            <span className="footer-emblem" aria-hidden="true" />
            <img
              className="footer-wordmark"
              src="/images/wordmark.webp"
              alt="TANORA"
              loading="lazy"
              width="926"
              height="257"
            />
          </a>
        </div>
      </footer>
      {viewer && (
        <MediaDialog
          items={viewer.kind === "gallery" ? filtered : experiences}
          index={viewer.index}
          setIndex={(index) => setViewer({ ...viewer, index })}
          close={() => setViewer(null)}
        />
      )}
    </MotionConfig>
  );
}
