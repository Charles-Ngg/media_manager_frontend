// src/pages/MediaList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMediaList, playMedia, deleteMediaFiles, likeMedia, rateMedia } from '../services/api';
import {
    PageContainer,
    Header,
    Title,
    AddButton,
    ControlsContainer,
    FilterSortContainer,
    Label,
    Select,
    Grid,
    Card,
    CardImage,
    CardImageLink,
    CardContent,
    CardTitle,
    CardInfo,
    CardActions,
    ActionButton,
    Loading,
    ErrorMessage,
} from '../styles/SharedComponents.styles';
import LikeDislikeButtons from '../components/LikeDislikeButtons';
import RatingStar from '../components/RatingStar';
import useLocalStorage from '../hooks/useLocalStorage';
import { FaPlus, FaPlay, FaTrash } from 'react-icons/fa';

function MediaList() {
    const [mediaList, setMediaList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useLocalStorage('sortOrder', 'desc');
    const [sortBy, setSortBy] = useLocalStorage('sortBy', 'total_size');
    const [likeStateFilter, setLikeStateFilter] = useLocalStorage('likeStateFilter', 'all');

    useEffect(() => {
        fetchMedia();
    }, [sortOrder, sortBy, likeStateFilter]);

    const fetchMedia = async () => {
        try {
            setLoading(true);
            const params = {
                sort_order: sortOrder,
                sort_by: sortBy,
            };

            if (likeStateFilter !== 'all') {
                params.like_state = likeStateFilter;
            }

            const response = await getMediaList(params);
            const mediaData = response.data.map((media) => ({
                ...media,
                rating: typeof media.rating === 'number' ? media.rating : 0,
            }));
            setMediaList(mediaData);
            setError(null);
        } catch (error) {
            console.error('Error fetching media list:', error);
            setError('Failed to fetch media list. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleSortByChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleFilterChange = (e) => {
        setLikeStateFilter(e.target.value);
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

    const handleLike = async (mediaId, currentLikeState) => {
        let newLikeState = 'liked';
        let newDislikeState = 'no_liked';

        if (currentLikeState === 'liked') {
            newLikeState = 'no_liked';
        } else if (currentLikeState === 'disliked') {
            newLikeState = 'liked';
            newDislikeState = 'no_liked';
        }

        try {
            await likeMedia(mediaId, newLikeState);
            setMediaList(mediaList.map(media => 
                media.id === mediaId ? { 
                    ...media, 
                    like_state: newLikeState, 
                    dislikes: newDislikeState === 'no_liked' ? media.dislikes : (media.dislikes || 1) - 1,
                    likes: newLikeState === 'liked' ? (media.likes || 0) + 1 : (media.likes || 1) - 1 
                } : media
            ));
        } catch (error) {
            console.error('Error liking media:', error);
        }
    };

    const handleDislike = async (mediaId, currentLikeState) => {
        let newLikeState = 'disliked';
        let newLikeStateValue = 'disliked';
        let newLikeStateRevert = 'no_liked';

        if (currentLikeState === 'disliked') {
            newLikeStateValue = 'no_liked';
        } else if (currentLikeState === 'liked') {
            newLikeStateValue = 'disliked';
            newLikeStateRevert = 'no_liked';
        }

        try {
            await likeMedia(mediaId, newLikeStateValue);
            setMediaList(mediaList.map(media => 
                media.id === mediaId ? { 
                    ...media, 
                    like_state: newLikeStateValue, 
                    likes: newLikeStateRevert === 'no_liked' ? media.likes : (media.likes || 1) - 1,
                    dislikes: newLikeStateValue === 'disliked' ? (media.dislikes || 0) + 1 : (media.dislikes || 1) - 1 
                } : media
            ));
        } catch (error) {
            console.error('Error disliking media:', error);
        }
    };

    const handleRate = async (mediaId, ratingValue) => {
        if (typeof ratingValue !== 'number') return;
        try {
            await rateMedia(mediaId, ratingValue);
            setMediaList(mediaList.map(media => 
                media.id === mediaId ? { 
                    ...media, 
                    rating: typeof ratingValue === 'number' ? ratingValue : media.rating 
                } : media
            ));
        } catch (error) {
            console.error('Error rating media:', error);
        }
    };

    if (loading) return <Loading>Loading media list...</Loading>;
    if (error) return <ErrorMessage>{error}</ErrorMessage>;

    return (
        <PageContainer>
            <Header>
                <Title>Media List</Title>
            </Header>
            <ControlsContainer>
                <FilterSortContainer>
                    <Label htmlFor="likeStateFilter">Filter by Like State:</Label>
                    <Select id="likeStateFilter" value={likeStateFilter} onChange={handleFilterChange}>
                        <option value="all">All</option>
                        <option value="liked">Liked</option>
                        <option value="no_liked">Not Liked</option>
                        <option value="disliked">Disliked</option>
                    </Select>
                </FilterSortContainer>

                <FilterSortContainer>
                    <Label htmlFor="sortBy">Sort by:</Label>
                    <Select id="sortBy" value={sortBy} onChange={handleSortByChange}>
                        <option value="total_size">Total Size</option>
                        <option value="rating">Rating</option>
                    </Select>
                    <Label htmlFor="sortOrder">Order:</Label>
                    <Select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </Select>
                </FilterSortContainer>
            </ControlsContainer>

            <Grid>
                {mediaList.map((media) => (
                    <Card key={media.id}>
                        <CardContent>
                            <CardTitle>{media.title}</CardTitle>
                            {media.poster_image_url && (
                                <CardImageLink to={`/media/${media.id}`}>
                                    <CardImage
                                        src={media.poster_image_url}
                                        alt={media.title}
                                    />
                                </CardImageLink>
                            )}
                            <CardInfo>
                                <div>Type: {media.type}</div>
                                <div>Release Date: {new Date(media.release_date).toLocaleDateString()}</div>
                                <div>
                                    <LikeDislikeButtons 
                                        likeState={media.like_state} 
                                        onLike={() => handleLike(media.id, media.like_state)} 
                                        onDislike={() => handleDislike(media.id, media.like_state)} 
                                        likesCount={media.likes}
                                        dislikesCount={media.dislikes}
                                    />
                                </div>
                                <div>
                                    <RatingStar 
                                        rating={media.rating} 
                                        onRate={(newRating) => handleRate(media.id, newRating)} 
                                    />
                                </div>
                            </CardInfo>
                            <CardActions>
                                <ActionButton as={Link} to={`/media/${media.id}`} variant="primary">
                                    View Details
                                </ActionButton>
                                <ActionButton onClick={() => handlePlay(media.id)}>
                                    <FaPlay /> Play
                                </ActionButton>
                                <ActionButton onClick={() => handleDelete(media.id)} variant="danger">
                                    <FaTrash /> Delete
                                </ActionButton>
                            </CardActions>
                        </CardContent>
                    </Card>
                ))}
            </Grid>
        </PageContainer>
    );
}

export default MediaList;
