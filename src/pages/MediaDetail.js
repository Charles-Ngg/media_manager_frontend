// src/pages/MediaDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMediaById, getGenreById, getTagById, getActorById, playMedia, deleteMediaFiles, likeMedia, rateMedia } from '../services/api';
import styled from 'styled-components';
import {
    Container,
    Title,
    Poster,
    Info,
    Section,
    Loading,
    PlayButton,
    DeleteButton,
    SourceLink,
} from '../styles/MediaDetail.styles';
import LikeDislikeButtons from '../components/LikeDislikeButtons';
import RatingStar from '../components/RatingStar';

function MediaDetail() {
    const { id } = useParams();
    const [media, setMedia] = useState(null);
    const [genres, setGenres] = useState([]);
    const [tags, setTags] = useState([]);
    const [cast, setCast] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchMediaDetail();
    }, [id]);

    const fetchMediaDetail = async () => {
        try {
            const response = await getMediaById(id);
            const mediaData = response.data;
            // Ensure rating is a number
            mediaData.rating = typeof mediaData.rating === 'number' ? mediaData.rating : 0;
            setMedia(mediaData);

            // Fetch genres
            if (mediaData.genre_ids && mediaData.genre_ids.length > 0) {
                const genrePromises = mediaData.genre_ids.map((genreId) => getGenreById(genreId));
                const genreResponses = await Promise.all(genrePromises);
                const genreNames = genreResponses.map((res) => res.data.name);
                setGenres(genreNames);
            }

            // Fetch tags
            if (mediaData.tag_ids && mediaData.tag_ids.length > 0) {
                const tagPromises = mediaData.tag_ids.map((tagId) => getTagById(tagId));
                const tagResponses = await Promise.all(tagPromises);
                const tagNames = tagResponses.map((res) => res.data.name);
                setTags(tagNames);
            }

            // Fetch cast actors
            if (mediaData.cast_ids && mediaData.cast_ids.length > 0) {
                const castPromises = mediaData.cast_ids.map((actorId) => getActorById(actorId));
                const castResponses = await Promise.all(castPromises);
                const castData = castResponses.map((res) => res.data);
                setCast(castData);
            }

            // Fetch directors
            if (mediaData.director_ids && mediaData.director_ids.length > 0) {
                const directorPromises = mediaData.director_ids.map((directorId) => getActorById(directorId));
                const directorResponses = await Promise.all(directorPromises);
                const directorData = directorResponses.map((res) => res.data);
                setDirectors(directorData);
            }

            // Set files
            if (mediaData.files && mediaData.files.length > 0) {
                setFiles(mediaData.files);
            }

        } catch (error) {
            console.error('Error fetching media detail:', error);
        }
    };

    const handlePlay = async () => {
        try {
            await playMedia(id);
        } catch (error) {
            alert('Failed to create play link.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete all files for this media? This action cannot be undone.')) {
            try {
                await deleteMediaFiles(id);
                alert('Media files deleted successfully.');
                fetchMediaDetail();
            } catch (error) {
                alert('Failed to delete media files.');
            }
        }
    };

    const handleLike = async (currentLikeState) => {
        let newLikeState = 'liked';
        let newDislikeState = 'no_liked';

        if (currentLikeState === 'liked') {
            newLikeState = 'no_liked';
        } else if (currentLikeState === 'disliked') {
            newLikeState = 'liked';
            newDislikeState = 'no_liked';
        }

        try {
            await likeMedia(id, newLikeState, newDislikeState);
            // Update local state
            setMedia({ 
                ...media, 
                like_state: newLikeState, 
                dislikes: newDislikeState === 'no_liked' ? media.dislikes : media.dislikes - 1,
                likes: newLikeState === 'liked' ? (media.likes || 0) + 1 : (media.likes || 0) - 1 
            });
        } catch (error) {
            console.error('Error liking media:', error);
        }
    };

    const handleDislike = async (currentLikeState) => {
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
            await likeMedia(id, newLikeStateValue, newLikeStateRevert);
            // Update local state
            setMedia({ 
                ...media, 
                like_state: newLikeStateValue, 
                likes: newLikeStateRevert === 'no_liked' ? media.likes : media.likes - 1,
                dislikes: newLikeStateValue === 'disliked' ? (media.dislikes || 0) + 1 : (media.dislikes || 0) - 1 
            });
        } catch (error) {
            console.error('Error disliking media:', error);
        }
    };

    const handleRate = async (ratingValue) => {
        try {
            await rateMedia(id, ratingValue);
            setMedia({ 
                ...media, 
                rating: typeof ratingValue === 'number' ? ratingValue : media.rating 
            });
        } catch (error) {
            console.error('Error rating media:', error);
        }
    };

    if (!media) {
        return <Loading>Loading...</Loading>;
    }

    return (
        <Container>
            <Title>{media.title}</Title>
            {media.poster_image_url && (
                <Poster src={media.poster_image_url} alt={media.title} />
            )}
            <PlayButton onClick={handlePlay}>
                Play
            </PlayButton>
            <DeleteButton onClick={handleDelete}>
                Delete
            </DeleteButton>
            <LikeDislikeButtons 
                likeState={media.like_state} 
                onLike={() => handleLike(media.like_state)} 
                onDislike={() => handleDislike(media.like_state)} 
            />
            <RatingStar 
                rating={media.rating} 
                onRate={(newRating) => handleRate(newRating)} 
            />

            <Info>
                <p><strong>Type:</strong> {media.type || 'N/A'}</p>
                <p><strong>Release Date:</strong> {media.release_date || 'N/A'}</p>
                <p><strong>Runtime:</strong> {media.runtime ? `${media.runtime} minutes` : 'N/A'}</p>
                <p><strong>Language:</strong> {media.language || 'N/A'}</p>
                <p><strong>Country:</strong> {media.country || 'N/A'}</p>
                <p><strong>Description:</strong> {media.description || 'No description available'}</p>
            </Info>

            {tags.length > 0 && (
                <Section className="media-tags">
                    <h3>Tags:</h3>
                    <ul>
                        {tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                        ))}
                    </ul>
                </Section>
            )}

            {cast.length > 0 && (
                <Section className="media-cast">
                    <h3>Cast:</h3>
                    <ul>
                        {cast.map((actor) => (
                            <li key={actor.id}>
                                <Link to={`/actors/${actor.id}`} className="actor-link">
                                    {actor.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Section>
            )}

            {directors.length > 0 && (
                <Section className="media-directors">
                    <h3>Directors:</h3>
                    <ul>
                        {directors.map((director) => (
                            <li key={director.id}>
                                <Link to={`/directors/${director.id}`} className="director-link">
                                    {director.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Section>
            )}

            {media.files && (
                <Section className="media-files">
                    <h3>Files:</h3>
                    <ul>
                        {files.map((file, index) => (
                            <li key={index}>
                                <p><strong>File Name:</strong> {file.file_name || 'N/A'}</p>
                                <p><strong>File Path:</strong> {file.file_path || 'N/A'}</p>
                                <p><strong>Directory Path:</strong> {file.directory_path || 'N/A'}</p>
                                <p><strong>File Size:</strong> {file.file_size ? `${(file.file_size / (1024 * 1024 * 1024)).toFixed(2)} GB` : 'N/A'}</p>
                            </li>
                        ))}
                    </ul>
                </Section>
            )}

            {media.screenshot_urls && media.screenshot_urls.length > 0 && (
                <Section className="media-screenshots">
                    <h3>Screenshots:</h3>
                    <div className="screenshot-gallery">
                        {media.screenshot_urls.map((url, index) => (
                            <img
                                key={index}
                                src={url}
                                alt={`Screenshot ${index + 1}`}
                                className="screenshot-image"
                            />
                        ))}
                    </div>
                </Section>
            )}

            {media.trailer_url && (
                <Section className="media-trailer">
                    <h3>Trailer:</h3>
                    <video src={media.trailer_url} controls className="trailer-video" />
                </Section>
            )}

            {media.information_source_urls && media.information_source_urls.length > 0 && (
                <Section className="media-sources">
                    <h3>Information Sources:</h3>
                    <ul>
                        {media.information_source_urls.map((url, index) => (
                            <li key={index}>
                                <SourceLink 
                                    href={url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    Source {index + 1}
                                </SourceLink>
                            </li>
                        ))}
                    </ul>
                </Section>
            )}
     
        </Container>
    );
}

export default MediaDetail;
