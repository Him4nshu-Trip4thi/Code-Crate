import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";

const Landing = () => {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="landing-brand">
          <img src="/CodeCrate.png" alt="" />
          <span>Code Crate</span>
        </div>
        <div className="landing-nav-actions">
          <Link to="/auth">Sign in</Link>
          <Link to="/signup" className="landing-nav-cta">Sign up</Link>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Version control, packed</p>
          <h1>
            Ship your code
            <br />
            like it's cargo.
          </h1>
          <p className="hero-sub">
            Code Crate packs your repositories, issues, and history into one
            place — with an auth layer that actually checks who owns what,
            not just who's logged in.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="btn-primary">Get started</Link>
            <a href="#slip" className="btn-secondary">See what's inside</a>
          </div>
          <div className="cmd-row">
            <span>$ git init</span>
            <span>$ git add .</span>
            <span>$ git push origin main</span>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="terminal">
            <div className="terminal-bar">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <div className="terminal-body">
              <p><span className="prompt">$</span> git remote add origin code-crate</p>
              <p><span className="prompt">$</span> git push -u origin main</p>
              <p className="dim">Enumerating objects: 42, done.</p>
              <p className="dim">Writing objects: 100% (42/42), done.</p>
              <p className="ok">To code-crate: main → main</p>
            </div>
          </div>

          <div className="crate-label">
            <div className="label-punch" />
            <p className="label-stamp">CODE CRATE</p>
            <div className="label-row">
              <span>CONTENTS</span>
              <span>1 REPOSITORY</span>
            </div>
            <div className="label-row">
              <span>HANDLING</span>
              <span>OWNER-CHECKED</span>
            </div>
            <div className="label-barcode">
              {Array.from({ length: 28 }).map((_, i) => (
                <span key={i} style={{ height: `${8 + ((i * 13) % 20)}px` }} />
              ))}
            </div>
            <div className="label-badge">V1.0</div>
          </div>
        </div>
      </header>

      <section id="slip" className="slip">
        <p className="slip-heading">Packing slip</p>
        <div className="slip-items">
          <div className="slip-item">
            <span className="slip-field">Contents</span>
            <p>
              Repositories, issues, and a commit-style history — browse
              without guessing what's actually in there.
            </p>
          </div>
          <div className="slip-item">
            <span className="slip-field">Handling</span>
            <p>
              Every write is checked against who owns the repository, not
              just who happens to be logged in.
            </p>
          </div>
          <div className="slip-item">
            <span className="slip-field">Destination</span>
            <p>
              React + Vite on the frontend, Express + MongoDB on the
              backend. Open the source and read it yourself.
            </p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>Code Crate — built by Himanshu Tripathi.</p>
      </footer>
    </div>
  );
};

export default Landing;