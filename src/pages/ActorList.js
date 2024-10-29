// src/pages/ActorList.js
import React, { useEffect, useState } from 'react';
import { getActors } from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/ActorList.css'; // Ensure you have corresponding CSS

function ActorList() {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActors();
  }, []);

  const fetchActors = async () => {
    try {
      const response = await getActors();
      setActors(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching actors:', err);
      setError('Failed to fetch actors.');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading actors...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="actor-list">
      <h2>Actors</h2>
      <div className="actor-grid">
        {actors.map((actor) => (
          <div key={actor.id} className="actor-card">
            <Link to={`/actors/${actor.id}`}>
              <img src={actor.profile_image_url} alt={actor.name} className="actor-image" />
              <h3>{actor.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActorList;
