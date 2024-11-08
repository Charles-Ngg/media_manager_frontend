// src/pages/MediaList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMediaList, playMedia, deleteMediaFiles, likeMedia, rateMedia } from '../services/api';
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
import LikeDislikeButtons from '../components/LikeDislikeButtons';
import RatingStar from '../components/RatingStar';

function MediaList() {
    const [mediaList, setMediaList] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        fetchMedia();
    }, [sortOrder]);

    const fetchMedia = async () => {
        try {
            const response = await getMediaList({ sort: sortOrder });
            const mediaData = response.data.map((media) => ({
                ...media,
                rating: typeof media.rating === 'number' ? media.rating : 0,
            }));
            setMediaList(mediaData);
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
            await likeMedia(mediaId, newLikeState, newDislikeState);
            // Update local state
            setMediaList(mediaList.map(media => 
                media.id === mediaId ? { 
                    ...media, 
                    like_state: newLikeState, 
                    dislikes: newDislikeState === 'no_liked' ? media.dislikes : media.dislikes - 1,
                    likes: newLikeState === 'liked' ? (media.likes || 0) + 1 : (media.likes || 0) - 1 
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
            await likeMedia(mediaId, newLikeStateValue, newLikeStateRevert);
            // Update local state
            setMediaList(mediaList.map(media => 
                media.id === mediaId ? { 
                    ...media, 
                    like_state: newLikeStateValue, 
                    likes: newLikeStateRevert === 'no_liked' ? media.likes : media.likes - 1,
                    dislikes: newLikeStateValue === 'disliked' ? (media.dislikes || 0) + 1 : (media.dislikes || 0) - 1 
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
            // Update local state (assuming average rating is updated)
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
                        <LikeDislikeButtons 
                            likeState={media.like_state} 
                            onLike={() => handleLike(media.id, media.like_state)} 
                            onDislike={() => handleDislike(media.id, media.like_state)} 
                            likesCount={media.likes}
                            dislikesCount={media.dislikes}
                        />
                        <RatingStar 
                            rating={media.rating} 
                            onRate={(newRating) => handleRate(media.id, newRating)} 
                        />
                    </MediaCard>
                ))}
            </MediaGrid>
        </MediaListContainer>
    );
}

export default MediaList;
