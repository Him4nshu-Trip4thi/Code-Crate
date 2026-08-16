import React, { useState, useEffect } from "react";
import api from '../../api';
import { Link } from 'react-router-dom';
import "./dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const resp = await api.get(`/repo/user/${userId}`);
        setRepositories(resp.data.repositories || resp.data || []);
      } catch (err) {
        console.error("Error while fetching repositories: ", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const resp = await api.get(`/repo/all`);
        setSuggestedRepositories(resp.data || []);
      } catch (err) {
        console.error("Error while fetching repositories: ", err);
      }
    };

    Promise.all([fetchRepositories(), fetchSuggestedRepositories()]).finally(() =>
      setLoading(false)
    );
  }, []);

  useEffect(() => {
    if (searchQuery == "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  const deleteRepo = async (id) => {
    if (!window.confirm("Delete this repository? This can't be undone.")) return;
    try {
      await api.delete(`/repo/delete/${id}`);
      setRepositories((prev) => prev.filter((r) => r._id !== id));
      setSearchResults((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Failed to delete repo", err);
    }
  };

  const editRepo = async (id) => {
    const newDesc = prompt("Enter new description");
    if (newDesc === null) return;
    try {
      await api.put(`/repo/update/${id}`, { description: newDesc, content: "" });
      const resp = await api.get(`/repo/user/${localStorage.getItem("userId")}`);
      setRepositories(resp.data.repositories || []);
    } catch (err) {
      console.error("Failed to edit repo", err);
    }
  };

  return (
    <>
      <Navbar />
      <section id="dashboard">
        <aside className="dash-panel">
          <h3>Suggested Repositories</h3>
          {suggestedRepositories.length === 0 && !loading && (
            <p className="empty-hint">No public repositories yet.</p>
          )}
          <div className="repo-list">
            {suggestedRepositories.map((repo) => (
              <Link to={`/repo/${repo._id}`} className="repo-card small" key={repo._id}>
                <h4>{repo.name}</h4>
                <p>{repo.description || "No description"}</p>
              </Link>
            ))}
          </div>
        </aside>

        <main className="dash-main">
          <div className="dash-main-header">
            <h2>Your Repositories</h2>
            <input
              type="text"
              className="search-input"
              aria-label="Search repositories"
              value={searchQuery}
              placeholder="Search your repos..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading && <p className="empty-hint">Loading...</p>}
          {!loading && searchResults.length === 0 && (
            <p className="empty-hint">
              No repositories yet — <Link to="/create">create one</Link>.
            </p>
          )}

          <div className="repo-list">
            {searchResults.map((repo) => (
              <div className="repo-card" key={repo._id}>
                <Link to={`/repo/${repo._id}`}>
                  <h4>{repo.name}</h4>
                </Link>
                <p>{repo.description || "No description"}</p>
                <div className="repo-card-actions">
                  <button onClick={() => editRepo(repo._id)} aria-label={`Edit ${repo.name}`}>
                    Edit
                  </button>
                  <button
                    className="danger"
                    onClick={() => deleteRepo(repo._id)}
                    aria-label={`Delete ${repo.name}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </section>
    </>
  );
};

export default Dashboard;