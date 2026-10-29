import Link from "next/link";
export default function NotFound() {
  return (
    <main className="not-found shell">
      <p className="eyebrow">404 / A DIFFERENT TURN</p>
      <h1>
        LET’S FIND
        <br />
        OUR RHYTHM.
      </h1>
      <p>This page could not be found.</p>
      <Link className="button" href="/">
        Back to TANORA <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}
