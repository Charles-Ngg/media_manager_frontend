// src/pages/ActorDetail.js
import React, { useEffect, useState } from 'react';
import { getActorById } from '../services/api';
import { useParams, Link } from 'react-router-dom';
import '../styles/ActorDetail.css'; // Ensure you have corresponding CSS

function ActorDetail() {
  const { id } = useParams(); // Extract the actor ID from the URL
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActorDetail();
  }, [id]);

  const fetchActorDetail = async () => {
    try {
      const response = await getActorById(id);
      setActor(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching actor details:', err);
      setError('Failed to fetch actor details.');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading actor details...</div>;
  if (error) return <div>{error}</div>;
  if (!actor) return <div>No actor found.</div>;

  return (
    <div className="actor-detail">
      <h2>{actor.name}</h2>
      <img src={actor.profile_image_url} alt={actor.name} className="actor-profile-image" />
      
      <div className="actor-info">
        <p><strong>Aliases:</strong> {actor.alias.length > 0 ? actor.alias.join(', ') : 'N/A'}</p>
        <p><strong>Date of Birth:</strong> {new Date(actor.date_of_birth).toLocaleDateString()}</p>
        <p><strong>Nationality:</strong> {actor.nationality}</p>
        <p><strong>Biography:</strong> {actor.biography}</p>

        {actor.body_measurements && (
          <div className="body-measurements">
            <h3>Body Measurements</h3>
            <p><strong>Height:</strong> {actor.body_measurements.height_cm} cm</p>
            <p><strong>Weight:</strong> {actor.body_measurements.weight_kg} kg</p>
            <p><strong>Bust:</strong> {actor.body_measurements.bust_cm} cm</p>
            <p><strong>Waist:</strong> {actor.body_measurements.waist_cm} cm</p>
            <p><strong>Hips:</strong> {actor.body_measurements.hips_cm} cm</p>
            <p><strong>Bra Cup:</strong> {actor.body_measurements.bra_cup}</p>
          </div>
        )}

        {actor.awards && actor.awards.length > 0 && (
          <div className="awards">
            <h3>Awards</h3>
            <ul>
              {actor.awards.map((award, index) => (
                <li key={index}>{award}</li>
              ))}
            </ul>
          </div>
        )}

        {actor.social_media && (
          <div className="social-media">
            <h3>Social Media</h3>
            {actor.social_media.instagram && (
              <p>
                <a href={actor.social_media.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </p>
            )}
            {actor.social_media.twitter && (
              <p>
                <a href={actor.social_media.twitter} target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Optionally, display filmography if available */}
      {actor.filmography && actor.filmography.length > 0 && (
        <div className="filmography">
          <h3>Filmography</h3>
          <ul>
            {actor.filmography.map((mediaId) => (
              <li key={mediaId}>
                <Link to={`/media/${mediaId}`}>Media ID: {mediaId}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ActorDetail;
