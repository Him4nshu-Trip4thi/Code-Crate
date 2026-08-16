import React, { useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

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
      const res = await api.post('/repo/create', { owner, name, description, visibility });
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
      <main style={{ padding: 24 }}>
        <h2>Create Repository</h2>
        {error && <div role="alert" aria-live="assertive" style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
          <div style={{ marginBottom: 8 }}>
            <label htmlFor="repo-name">Name</label>
            <input id="repo-name" aria-required="true" value={name} onChange={e=>setName(e.target.value)} className="input" />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label htmlFor="repo-desc">Description</label>
            <textarea id="repo-desc" aria-required="false" value={description} onChange={e=>setDescription(e.target.value)} style={{ width: '100%', minHeight: 80 }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="repo-visibility">
              <input id="repo-visibility" type="checkbox" checked={visibility} onChange={e=>setVisibility(e.target.checked)} /> Public
            </label>
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Repository'}</button>
        </form>
      </main>
    </>
  );
};

export default CreateRepo;
