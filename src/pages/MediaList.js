// src/pages/MediaList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getMediaList } from '../services/api';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import StyledButton from '../components/StyledButton';
import {
    MediaListContainer,
    MediaListHeader,
    HeaderTitle,
    AddMediaButton,
    MediaGrid,
    MediaCard,
    MediaTitle,
    MediaPoster,
    MediaType,
    MediaReleaseDate,
    ViewDetailsButton,
} from '../styles/MediaList.styles';

function MediaList() {
    const [mediaList, setMediaList] = useState([]);
    const [query, setQuery] = useState('');
    const API_URL = process.env.REACT_APP_API_URL;

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

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${API_URL}/media/search/`, {
                params: { q: query },
            });
            setMediaList(response.data);
        } catch (error) {
            console.error('Error searching media:', error);
        }
    };

    // Filter media based on search query
    const filteredMediaList = mediaList.filter((media) => {
        const searchTerm = query.toLowerCase();
        return (
            (media.title && media.title.toLowerCase().includes(searchTerm)) ||
            (media.categories &&
                media.categories.some(
                    (cat) => cat && cat.toLowerCase().includes(searchTerm)
                )) ||
            (media.tags &&
                media.tags.some(
                    (tag) => tag && tag.toLowerCase().includes(searchTerm)
                ))
        );
    });

    return (
        <MediaListContainer>
            <MediaListHeader>
                <HeaderTitle>Media List</HeaderTitle>
                <AddMediaButton as={Link} to="/add-media">
                    Add New Media
                </AddMediaButton>
            </MediaListHeader>
            <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />
            <MediaGrid>
                {filteredMediaList.map((media) => (
                    <MediaCard key={media.id}>
                        <MediaTitle>{media.title}</MediaTitle>
                        {media.poster_image_url && (
                            <MediaPoster
                                src={media.poster_image_url}
                                alt={media.title}
                            />
                        )}
                        <MediaType>Type: {media.type}</MediaType>
                        <MediaReleaseDate>Release Date: {media.release_date}</MediaReleaseDate>
                        <ViewDetailsButton as={Link} to={`/media/${media.id}`}>
                            View Details
                        </ViewDetailsButton>
                    </MediaCard>
                ))}
            </MediaGrid>
        </MediaListContainer>
    );
}

export default MediaList;
