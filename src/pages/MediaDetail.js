// src/pages/MediaDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMediaById } from '../services/api';
import { Link } from 'react-router-dom';
import { getGenreById, getTagById } from '../services/api';

function MediaDetail() {
  const { id } = useParams();
  const [media, setMedia] = useState(null);
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchMediaDetail();
  }, []);

  const fetchMediaDetail = async () => {
    try {
        const response = await getMediaById(id);
        const mediaData = response.data;
        setMedia(mediaData);
  
        // Fetch genres if genre_ids exists
        if (mediaData.genre_ids && mediaData.genre_ids.length > 0) {
            const genrePromises = mediaData.genre_ids.map((genreId) => getGenreById(genreId));
            const genreResponses = await Promise.all(genrePromises);
            const genreNames = genreResponses.map((res) => res.data.name);
            setGenres(genreNames);
        }
  
        // Fetch tags if tag_ids exists
        if (mediaData.tag_ids && mediaData.tag_ids.length > 0) {
            const tagPromises = mediaData.tag_ids.map((tagId) => getTagById(tagId));
            const tagResponses = await Promise.all(tagPromises);
            const tagNames = tagResponses.map((res) => res.data.name);
            setTags(tagNames);
        }
    } catch (error) {
      console.error('Error fetching media detail:', error);
    }
  };

  if (!media) {
    return <div>Loading...</div>;
  }

  return (
    <div className="media-detail">
      <h2>{media.title}</h2>
      {media.poster_image_url && (
        <img src={media.poster_image_url} alt={media.title} className="media-poster" />
      )}
      <p><strong>Type:</strong> {media.type || 'N/A'}</p>
      <p><strong>Release Date:</strong> {media.release_date || 'N/A'}</p>
      <p><strong>Runtime:</strong> {media.runtime ? `${media.runtime} minutes` : 'N/A'}</p>
      <p><strong>Language:</strong> {media.language || 'N/A'}</p>
      <p><strong>Country:</strong> {media.country || 'N/A'}</p>
      <p><strong>Description:</strong> {media.description || 'No description available'}</p>
      {tags && tags.length > 0 && (
        <>
          <h3>Tags:</h3>
          <ul>
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </>
      )}

      {media.cast && media.cast.length > 0 && (
        <>
          <h3>Cast:</h3>
          <ul>
            {media.cast.map((actorts) => (
              <li key={actorts}>
                <Link to={`/actors/${actorts.id}`}>{actorts.name}</Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {media.directors && media.directors.length > 0 && (
        <>
          <h3>Directors:</h3>
          <ul>
            {media.directors.map((directors) => (
              <li key={directors}>
                <Link to={`/director/${directors.id}`}>{directors.name}</Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {media.file_info && (
        <>
          <h3>File Information:</h3>
          <p><strong>Resolution:</strong> {media.file_info.resolution || 'N/A'}</p>
          <p><strong>File Size:</strong> {media.file_info.file_size ? `${media.file_info.file_size} bytes` : 'N/A'}</p>
          <p><strong>Video Codec:</strong> {media.file_info.video_codec || 'N/A'}</p>
          <p><strong>Audio Codec:</strong> {media.file_info.audio_codec || 'N/A'}</p>
          <p><strong>File Path:</strong> {media.file_info.file_path || 'N/A'}</p>
        </>
      )}

      {media.screenshot_urls && media.screenshot_urls.length > 0 && (
        <>
          <h3>Screenshots:</h3>
          <div className="screenshot-gallery">
            {media.screenshot_urls.map((url, index) => (
              <img key={index} src={url} alt={`Screenshot ${index + 1}`} className="screenshot-image" />
            ))}
          </div>
        </>
      )}

      {media.trailer_url && (
        <div className="trailer">
          <h3>Trailer:</h3>
          <video src={media.trailer_url} controls />
        </div>
      )}
    </div>
  );
}

export default MediaDetail;
