import React, { useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import './create.css';

const CreateRepo = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const owner = localStorage.getItem('userId');
    if (!owner) return setError('You must be logged in to create a repository.');
    if (!name.trim()) return setError('Repository name is required.');

    setLoading(true);
    try {
      await api.post('/repo/create', { owner, name, description, visibility });
      setLoading(false);
      navigate('/app');
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.error || 'Failed to create repository');
    }
  };

  return (
    <>
      <Navbar />
      <main className="create-repo-page">
        <div className="create-repo-card">
          <h2>Create a new repository</h2>
          <p className="create-repo-hint">
            A repository contains your project's files, description, and issues.
          </p>

          {error && (
            <div role="alert" aria-live="assertive" className="form-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label htmlFor="repo-name">Repository name</label>
            <input
              id="repo-name"
              aria-required="true"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="my-awesome-project"
              autoFocus
            />

            <label htmlFor="repo-desc">Description <span className="optional">(optional)</span></label>
            <textarea
              id="repo-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this project about?"
            />

            <label className="checkbox-row" htmlFor="repo-visibility">
              <input
                id="repo-visibility"
                type="checkbox"
                checked={visibility}
                onChange={(e) => setVisibility(e.target.checked)}
              />
              <span>
                <strong>Public</strong> — anyone can view this repository
              </span>
            </label>

            <button type="submit" disabled={loading} className="primary-btn">
              {loading ? 'Creating...' : 'Create Repository'}
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateRepo;