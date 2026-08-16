import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-root">
      <header className="landing-header">
        <div className="hero">
          <div className="hero-text">
            <h1>Code Crate</h1>
            <p className="subtitle">A lightweight GitHub-like repo explorer and demo platform.</p>
            <div className="cta-row">
              <button className="primary" onClick={() => navigate('/auth')}>Get Started</button>
              <button className="secondary" onClick={() => navigate('/app')}>Preview App</button>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">📦</div>
        </div>
      </header>
      <section className="features">
        <div className="feature">
          <h3>Browse Repos</h3>
          <p>See repositories, issues and activity in a simple UI.</p>
        </div>
        <div className="feature">
          <h3>Easy Auth</h3>
          <p>Signup or login with demo credentials to try the app.</p>
        </div>
        <div className="feature">
          <h3>Lightweight</h3>
          <p>Built with React + Vite and a Node/Mongo backend.</p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
