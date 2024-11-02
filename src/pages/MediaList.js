// src/pages/MediaList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMediaList } from '../services/api';
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
                    </MediaCard>
                ))}
            </MediaGrid>
        </MediaListContainer>
    );
}

export default MediaList;
