// src/pages/MediaList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMediaList, playMedia, deleteMediaFiles } from '../services/api';
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
    SortContainer,
    SortLabel,
    SortSelect,
    PlayButton,
    DeleteButton,
} from '../styles/MediaList.styles';

function MediaList() {
    const [mediaList, setMediaList] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        fetchMedia();
    }, [sortOrder]);

    const fetchMedia = async () => {
        try {
            const response = await getMediaList({ sort: sortOrder });
            setMediaList(response.data);
        } catch (error) {
            console.error('Error fetching media list:', error);
        }
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handlePlay = async (mediaId) => {
        try {
            await playMedia(mediaId);
        } catch (error) {
            alert('Failed to create play link.');
        }
    };

    const handleDelete = async (mediaId) => {
        if (window.confirm('Are you sure you want to delete all files for this media? This action cannot be undone.')) {
            try {
                await deleteMediaFiles(mediaId);
                alert('Media files deleted successfully.');
                fetchMedia();
            } catch (error) {
                alert('Failed to delete media files.');
            }
        }
    };

    return (
        <MediaListContainer>
            <MediaListHeader>
                <HeaderTitle>Media List</HeaderTitle>
                <AddMediaButton as={Link} to="/add-media">
                    Add New Media
                </AddMediaButton>
            </MediaListHeader>
            <SortContainer>
                <SortLabel htmlFor="sortOrder">Sort by Total Size:</SortLabel>
                <SortSelect id="sortOrder" value={sortOrder} onChange={handleSortChange}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </SortSelect>
            </SortContainer>
            <MediaGrid>
                {mediaList.map((media) => (
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
                        <PlayButton onClick={() => handlePlay(media.id)}>
                            Play
                        </PlayButton>
                        <DeleteButton onClick={() => handleDelete(media.id)}>
                            Delete
                        </DeleteButton>
                    </MediaCard>
                ))}
            </MediaGrid>
        </MediaListContainer>
    );
}

export default MediaList;
