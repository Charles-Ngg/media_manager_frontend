// src/pages/MediaDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMediaDetail, submitInteraction } from '../services/api';

function MediaDetail() {
  const { id } = useParams();
  const [media, setMedia] = useState(null);
  const [rating, setRating] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    fetchMediaDetail();
  }, []);

  const fetchMediaDetail = async () => {
    try {
      const response = await getMediaDetail(id);
      setMedia(response.data);
    } catch (error) {
      console.error('Error fetching media detail:', error);
    }
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      const interactionData = {
        user_id: 'user123', // Replace with actual user ID if applicable
        target_id: id,
        target_type: 'media',
        interaction_type: 'rating',
        value: rating,
      };
      await submitInteraction(interactionData);
      fetchMediaDetail();
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
        target_type: 'media',
        interaction_type: 'tag',
        value: tag,
      };
      await submitInteraction(interactionData);
      fetchMediaDetail();
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
        target_type: 'media',
        interaction_type: 'like',
        value: '1', // Value can be '1' to indicate a like
      };
      await submitInteraction(interactionData);
      fetchMediaDetail();
    } catch (error) {
      console.error('Error liking media:', error);
    }
  }

  if (!media) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{media.title}</h2>
      <p>Categories: {media.categories.join(', ')}</p>
      <p>Tags: {media.tags.join(', ')}</p>
      <p>Rating: {media.ratings}</p>
      <p>Likes: {media.likes}</p>

      <h3>Actors:</h3>
      <ul>
        {media.actors.map((actor) => (
          <li key={actor.id}>
            <a href={`/actor/${actor.id}`}>{actor.name}</a>
          </li>
        ))}
      </ul>

      <h3>Rate this media:</h3>
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

export default MediaDetail;
