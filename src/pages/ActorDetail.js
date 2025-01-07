// src/pages/ActorDetail.js
import React, { useEffect, useState } from 'react';
import { getActorById, likeActor, rateActor, getActorMedia } from '../services/api';
import { useParams, Link } from 'react-router-dom';
import {
    Container,
    Name,
    ProfileImage,
    Info,
    Section,
    Loading,
    ErrorMessage,
    NoActor,
    ProfileGallery,
} from '../styles/ActorDetail.styles';
import LikeDislikeButtons from '../components/LikeDislikeButtons';
import RatingStar from '../components/RatingStar';

function ActorDetail() {
    const { id } = useParams();
    const [actor, setActor] = useState(null);
    const [actorMedia, setActorMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchActorDetail();
        fetchActorMedia();
    }, [id]);

    const fetchActorDetail = async () => {
        try {
            const response = await getActorById(id);
            const actorData = response.data;
            // Ensure rating is a number
            actorData.rating = typeof actorData.rating === 'number' ? actorData.rating : 0;
            setActor(actorData);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching actor details:', err);
            setError('Failed to fetch actor details.');
            setLoading(false);
        }
    };

    const fetchActorMedia = async () => {
        try {
            const response = await getActorMedia(id);
            setActorMedia(response.data);
        } catch (err) {
            console.error('Error fetching actor media:', err);
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
            await likeActor(id, newLikeState, newDislikeState);
            // Update local state
            setActor({
                ...actor,
                like_state: newLikeState,
                dislikes: newDislikeState === 'no_liked' ? actor.dislikes : actor.dislikes - 1,
                likes: newLikeState === 'liked' ? (actor.likes || 0) + 1 : (actor.likes || 0) - 1
            });
        } catch (error) {
            console.error('Error liking actor:', error);
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
            await likeActor(id, newLikeStateValue, newLikeStateRevert);
            // Update local state
            setActor({
                ...actor,
                like_state: newLikeStateValue,
                likes: newLikeStateRevert === 'none' ? actor.likes : actor.likes - 1,
                dislikes: newLikeStateValue === 'disliked' ? (actor.dislikes || 0) + 1 : (actor.dislikes || 0) - 1
            });
        } catch (error) {
            console.error('Error disliking actor:', error);
        }
    };

    const handleRate = async (ratingValue) => {
        try {
            await rateActor(id, ratingValue);
            setActor({
                ...actor,
                rating: typeof ratingValue === 'number' ? ratingValue : actor.rating
            });
        } catch (error) {
            console.error('Error rating actor:', error);
        }
    };

    if (loading) return <Loading>Loading actor details...</Loading>;
    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!actor) return <NoActor>No actor found.</NoActor>;

    return (
        <Container>
            <Name>{actor.name}</Name>
            {actor.profile_image_urls && actor.profile_image_urls.length > 0 && (
                <ProfileGallery>
                    {actor.profile_image_urls.map((url, index) => (
                        <ProfileImage
                            key={index}
                            src={url}
                            alt={`${actor.name} Profile ${index + 1}`}
                        />
                    ))}
                </ProfileGallery>
            )}

            <LikeDislikeButtons
                likeState={actor.like_state}
                onLike={() => handleLike(actor.like_state)}
                onDislike={() => handleDislike(actor.like_state)}
                likesCount={actor.likes}
                dislikesCount={actor.dislikes}
            />

            <RatingStar
                rating={actor.rating}
                onRate={(newRating) => handleRate(newRating)}
            />

            <Info>
                <p><strong>Aliases:</strong> {actor.alias.length > 0 ? actor.alias.join(', ') : 'N/A'}</p>
                <p><strong>Date of Birth:</strong> {actor.date_of_birth ? new Date(actor.date_of_birth).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Nationality:</strong> {actor.nationality || 'N/A'}</p>
                <p><strong>Biography:</strong> {actor.biography || 'No biography available.'}</p>
            </Info>

            {actor.body_measurements && (
                <Section className="body-measurements">
                    <h3>Body Measurements</h3>
                    <p><strong>Height:</strong> {actor.body_measurements.height_cm} cm</p>
                    <p><strong>Weight:</strong> {actor.body_measurements.weight_kg} kg</p>
                    <p><strong>Bust:</strong> {actor.body_measurements.bust_cm} cm</p>
                    <p><strong>Waist:</strong> {actor.body_measurements.waist_cm} cm</p>
                    <p><strong>Hips:</strong> {actor.body_measurements.hips_cm} cm</p>
                    <p><strong>Bra Cup:</strong> {actor.body_measurements.bra_cup || 'N/A'}</p>
                </Section>
            )}

            {actor.awards && actor.awards.length > 0 && (
                <Section className="awards-section">
                    <h3>Awards</h3>
                    <ul>
                        {actor.awards.map((award, index) => (
                            <li key={index}>{award}</li>
                        ))}
                    </ul>
                </Section>
            )}

            {actor.social_media && (
                <Section className="social-media-section">
                    <h3>Social Media</h3>
                    {actor.social_media.instagram && (
                        <p>
                            <Link to={actor.social_media.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                                Instagram
                            </Link>
                        </p>
                    )}
                    {actor.social_media.twitter && (
                        <p>
                            <Link to={actor.social_media.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                                Twitter
                            </Link>
                        </p>
                    )}
                </Section>
            )}

            {/* Optionally, display filmography if available */}
            {actor.filmography && actor.filmography.length > 0 && (
                <Section className="filmography-section">
                    <h3>Filmography</h3>
                    <ul>
                        {actor.filmography.map((mediaId) => (
                            <li key={mediaId}>
                                <Link to={`/media/${mediaId}`} className="filmography-link">
                                    Media ID: {mediaId}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Section>
            )}

            {actorMedia && actorMedia.length > 0 && (
                <Section className="media-section">
                    <h3>Media List</h3>
                    <div className="media-grid">
                        {actorMedia.map((media) => (
                            <div key={media.id} className="media-item">
                                <Link to={`/media/${media.id}`}>
                                    <h4>{media.title}</h4>
                                    {media.cover_image && (
                                        <img 
                                            src={media.cover_image} 
                                            alt={media.title} 
                                            className="media-cover"
                                        />
                                    )}
                                    <p>Release Date: {media.release_date || 'N/A'}</p>
                                    <p>Rating: {media.rating || 'Not rated'}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </Section>
            )}
        </Container>
    );
}

export default ActorDetail;
