// src/pages/ActorDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getActorDetail, submitInteraction } from '../services/api';

function ActorDetail() {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [rating, setRating] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    fetchActorDetail();
  }, []);

  const fetchActorDetail = async () => {
    try {
      const response = await getActorDetail(id);
      setActor(response.data);
    } catch (error) {
      console.error('Error fetching actor detail:', error);
    }
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      const interactionData = {
        user_id: 'user123',
        target_id: id,
        target_type: 'actor',
        interaction_type: 'rating',
        value: rating,
      };
      await submitInteraction(interactionData);
      fetchActorDetail();
      setRating('');
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handleTagSubmit = async (e) => {
    e.preventDefault();
    try {
      const interactionData = {
        user_id: 'user123',
        target_id: id,
        target_type: 'actor',
        interaction_type: 'tag',
        value: tag,
      };
      await submitInteraction(interactionData);
      fetchActorDetail();
      setTag('');
    } catch (error) {
      console.error('Error submitting tag:', error);
    }
  };

  async function handleLike() {
    try {
      const interactionData = {
        user_id: 'user123',
        target_id: id,
        target_type: 'actor',
        interaction_type: 'like',
        value: '1',
      };
      await submitInteraction(interactionData);
      fetchActorDetail();
    } catch (error) {
      console.error('Error liking actor:', error);
    }
  }

  if (!actor) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{actor.name}</h2>
      <p>Tags: {actor.tags.join(', ')}</p>
      <p>Rating: {actor.ratings}</p>
      <p>Likes: {actor.likes}</p>

      <h3>Rate this actor:</h3>
      <form onSubmit={handleRatingSubmit}>
        <input
          type="number"
          step="0.1"
          max="5"
          min="0"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
        <button type="submit">Submit Rating</button>
      </form>

      <h3>Add a tag:</h3>
      <form onSubmit={handleTagSubmit}>
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          required
        />
        <button type="submit">Add Tag</button>
      </form>

      <button onClick={handleLike}>Like</button>
    </div>
  );
}

export default ActorDetail;
