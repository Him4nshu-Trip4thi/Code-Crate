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

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const resp = await api.get(`/repo/user/${userId}`);
        const data = resp.data;
        setRepositories(data.repositories || data || []);
      } catch (err) {
        console.error("Error while fecthing repositories: ", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const resp = await api.get(`/repo/all`);
        setSuggestedRepositories(resp.data || []);
        console.log(suggestedRepositories);
      } catch (err) {
        console.error("Error while fecthing repositories: ", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
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
    try {
      await api.delete(`/repo/delete/${id}`);
      setRepositories((prev) => prev.filter(r => r._id !== id));
      setSearchResults((prev) => prev.filter(r => r._id !== id));
    } catch (err) {
      console.error('Failed to delete repo', err);
    }
  };

  const editRepo = async (id) => {
    const newDesc = prompt('Enter new description');
    if (newDesc === null) return;
    try {
      await api.put(`/repo/update/${id}`, { description: newDesc, content: '' });
      // refresh list
      const resp = await api.get(`/repo/user/${localStorage.getItem('userId')}`);
      setRepositories(resp.data.repositories || []);
    } catch (err) {
      console.error('Failed to edit repo', err);
    }
  };

  return (
    <>
      <Navbar />
      <section id="dashboard">
        <aside>
          <h3>Suggested Repositories</h3>
          {suggestedRepositories.map((repo) => {
            return (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
              </div>
            );
          })}
        </aside>
        <main>
          <h2>Your Repositories</h2>
          <div id="search">
            <input
              type="text"
              aria-label="Search repositories"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {searchResults.map((repo) => {
                return (
              <div key={repo._id} style={{borderBottom: '1px solid #eee', padding: 8}}>
                <h4><Link to={`/repo/${repo._id}`}>{repo.name}</Link></h4>
                <p>{repo.description}</p>
                <div style={{display: 'flex', gap: 8}}>
                  <button onClick={() => editRepo(repo._id)} aria-label={`Edit ${repo.name}`}>Edit</button>
                  <button onClick={() => deleteRepo(repo._id)} aria-label={`Delete ${repo.name}`}>Delete</button>
                </div>
              </div>
            );
          })}
        </main>
        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li>
              <p>Tech Conference - Dec 15</p>
            </li>
            <li>
              <p>Developer Meetup - Dec 25</p>
            </li>
            <li>
              <p>React Summit - Jan 5</p>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;
