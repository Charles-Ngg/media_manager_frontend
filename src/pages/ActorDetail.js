// src/pages/ActorDetail.js
import React, { useEffect, useState } from 'react';
import { getActorById } from '../services/api';
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
} from '../styles/ActorDetail.styles';

function ActorDetail() {
    const { id } = useParams(); // Extract the actor ID from the URL
    const [actor, setActor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchActorDetail();
    }, [id]);

    const fetchActorDetail = async () => {
        try {
            const response = await getActorById(id);
            setActor(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching actor details:', err);
            setError('Failed to fetch actor details.');
            setLoading(false);
        }
    };

    if (loading) return <Loading>Loading actor details...</Loading>;
    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!actor) return <NoActor>No actor found.</NoActor>;

    return (
        <Container>
            <Name>{actor.name}</Name>
            {actor.profile_image_url && (
                <ProfileImage
                    src={actor.profile_image_url}
                    alt={actor.name}
                />
            )}

            <Info>
                <p><strong>Aliases:</strong> {actor.alias.length > 0 ? actor.alias.join(', ') : 'N/A'}</p>
                <p><strong>Date of Birth:</strong> {new Date(actor.date_of_birth).toLocaleDateString()}</p>
                <p><strong>Nationality:</strong> {actor.nationality}</p>
                <p><strong>Biography:</strong> {actor.biography}</p>
            </Info>

            {actor.body_measurements && (
                <Section className="body-measurements">
                    <h3>Body Measurements</h3>
                    <p><strong>Height:</strong> {actor.body_measurements.height_cm} cm</p>
                    <p><strong>Weight:</strong> {actor.body_measurements.weight_kg} kg</p>
                    <p><strong>Bust:</strong> {actor.body_measurements.bust_cm} cm</p>
                    <p><strong>Waist:</strong> {actor.body_measurements.waist_cm} cm</p>
                    <p><strong>Hips:</strong> {actor.body_measurements.hips_cm} cm</p>
                    <p><strong>Bra Cup:</strong> {actor.body_measurements.bra_cup}</p>
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
        </Container>
    );
}

export default ActorDetail;
