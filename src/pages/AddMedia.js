// src/pages/AddMedia.js
import React, { useState } from 'react';
import { createMedia } from '../services/api';
import { useNavigate } from 'react-router-dom';

function AddMedia() {
  const [title, setTitle] = useState('');
  const [filePath, setFilePath] = useState('');
  const [categories, setCategories] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data
    const mediaData = {
      title,
      file_path: filePath,
      categories: categories.split(',').map((cat) => cat.trim()),
      tags: tags.split(',').map((tag) => tag.trim()),
      ratings: 0,
      likes: 0,
      actors: [], // You can add functionality to add actors separately
    };

    try {
      await createMedia(mediaData);
      alert('Media item added successfully!');
      navigate('/'); // Redirect to media list
    } catch (error) {
      console.error('Error adding media item:', error);
      alert('Failed to add media item. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add New Media</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>File Path:</label><br />
          <input
            type="text"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Categories (comma-separated):</label><br />
          <input
            type="text"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
        </div>
        <div>
          <label>Tags (comma-separated):</label><br />
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button type="submit">Add Media</button>
      </form>
    </div>
  );
}

export default AddMedia;
