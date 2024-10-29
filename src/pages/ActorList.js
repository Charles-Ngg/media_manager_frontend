// src/pages/ActorList.js
import React, { useEffect, useState } from 'react';
import { getActors } from '../services/api';
import { Link } from 'react-router-dom';
import {
    Container,
    Title,
    ActorGrid,
    ActorCard,
    ActorLink,
    ActorImage,
    ActorName,
    Loading,
    ErrorMessage,
} from '../styles/ActorList.styles';

function ActorList() {
    const [actors, setActors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchActors();
    }, []);

    const fetchActors = async () => {
        try {
            const response = await getActors();
            setActors(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching actors:', err);
            setError('Failed to fetch actors.');
            setLoading(false);
        }
    };

    if (loading) return <Loading>Loading actors...</Loading>;
    if (error) return <ErrorMessage>{error}</ErrorMessage>;

    return (
        <Container>
            <Title>Actors</Title>
            <ActorGrid>
                {actors.map((actor) => (
                    <ActorCard key={actor.id}>
                        <ActorLink to={`/actors/${actor.id}`}>
                            {actor.profile_image_url && (
                                <ActorImage
                                    src={actor.profile_image_url}
                                    alt={actor.name}
                                />
                            )}
                            <ActorName>{actor.name}</ActorName>
                        </ActorLink>
                    </ActorCard>
                ))}
            </ActorGrid>
        </Container>
    );
}

export default ActorList;
