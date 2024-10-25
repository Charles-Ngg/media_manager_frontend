// src/pages/MediaList.js
import React, { useEffect, useState } from 'react';
import { getMediaList } from '../services/api';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Button from '@mui/material/Button';

function MediaList() {
  const [mediaList, setMediaList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await getMediaList();
      setMediaList(response.data);
    } catch (error) {
      console.error('Error fetching media list:', error);
    }
  };

  // Filter media based on search query
  const filteredMediaList = mediaList.filter((media) => {
    const query = searchQuery.toLowerCase();
    return (
      (media.title && media.title.toLowerCase().includes(query)) ||
      (media.categories && media.categories.some((cat) => cat && cat.toLowerCase().includes(query))) ||
      (media.tags && media.tags.some((tag) => tag && tag.toLowerCase().includes(query)))
    );
  });

  return (
      <div>
        <h2>Media List</h2>
        <Button variant="contained" color="primary" component={Link} to="/add-media">
          Add New Media
        </Button>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        <ul>
          {filteredMediaList.map((media) => (
              <li key={media.id}>
                <Link to={`/media/${media.id}`}>{media.title}</Link>
              </li>
          ))}
        </ul>
      </div>
  );
}

export default MediaList;
