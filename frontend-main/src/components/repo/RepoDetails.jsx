import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import Navbar from '../Navbar';

const RepoDetails = () => {
  const { id } = useParams();
  const [repo, setRepo] = useState(null);
  const [newContent, setNewContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchRepo = async () => {
    try {
      const res = await api.get(`/repo/${id}`);
      const data = Array.isArray(res.data) ? res.data[0] : res.data;
      setRepo(data);
    } catch (err) {
      console.error('Failed to fetch repo', err);
    }
  };

  useEffect(() => { fetchRepo(); }, [id]);

  const addContent = async () => {
    if (!newContent.trim()) return;
    setLoading(true);
    try {
      await api.put(`/repo/update/${id}`, { content: newContent, description: repo.description || '' });
      setNewContent('');
      await fetchRepo();
    } catch (err) {
      console.error('Failed to add content', err);
    } finally { setLoading(false); }
  };

  if (!repo) return (<><Navbar/><main style={{padding:24}}>Loading...</main></>);

  return (
    <>
      <Navbar />
      <main style={{ padding: 24 }}>
        <h2>{repo.name}</h2>
        <p>{repo.description}</p>
        <section>
          <h3>Content</h3>
          {Array.isArray(repo.content) && repo.content.length===0 && <p>No content yet.</p>}
          <ul>
            {repo.content && repo.content.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
          <div style={{marginTop:12}}>
            <label htmlFor="new-content">Add content</label>
            <textarea id="new-content" value={newContent} onChange={e=>setNewContent(e.target.value)} style={{width:'100%', minHeight:80}} />
            <div style={{marginTop:8}}>
              <button onClick={addContent} disabled={loading}>{loading ? 'Adding...' : 'Add Content'}</button>
              <button onClick={()=>navigate(-1)} style={{marginLeft:8}}>Back</button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default RepoDetails;
