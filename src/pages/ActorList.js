// src/pages/ActorList.js
import React, { useEffect, useState } from 'react';
import { getActors } from '../services/api';
import { Link } from 'react-router-dom';
import {
    Container,
    Header,
    Title,
    AddButton,
    ActorGrid,
    ActorCard,
    ActorLink,
    ActorImage,
    ActorName,
    ActorInfo,
    Loading,
    ErrorMessage,
    NavigationBar,
    NavLink,
} from '../styles/ActorList.styles';
import LikeDislikeButtons from '../components/LikeDislikeButtons';
import RatingStar from '../components/RatingStar';

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
            <NavigationBar>
                <NavLink to="/media">Media List</NavLink>
                <NavLink to="/actors" className="active">Actor List</NavLink>
            </NavigationBar>
            
            <Header>
                <Title>Actors</Title>
                <AddButton as={Link} to="/add-actor">Add New Actor</AddButton>
            </Header>

            <ActorGrid>
                {actors.map((actor) => (
                    <ActorCard key={actor.id}>
                        <ActorLink to={`/actors/${actor.id}`}>
                            {actor.profile_image_urls && actor.profile_image_urls.length > 0 ? (
                                <ActorImage
                                    src={actor.profile_image_urls[0]}
                                    alt={actor.name}
                                />
                            ) : (
                                <ActorImage
                                    src="/placeholder-actor.jpg"
                                    alt={actor.name}
                                />
                            )}
                            <ActorName>{actor.name}</ActorName>
                            <ActorInfo>
                                {actor.nationality && (
                                    <p><strong>Nationality:</strong> {actor.nationality}</p>
                                )}
                                {actor.date_of_birth && (
                                    <p><strong>Birth Date:</strong> {new Date(actor.date_of_birth).toLocaleDateString()}</p>
                                )}
                                {actor.alias && actor.alias.length > 0 && (
                                    <p><strong>Aliases:</strong> {actor.alias.slice(0, 2).join(', ')}{actor.alias.length > 2 ? '...' : ''}</p>
                                )}
                            </ActorInfo>
                        </ActorLink>
                        <div className="actor-actions">
                            <LikeDislikeButtons
                                likeState={actor.like_state}
                                onLike={() => {}} // TODO: Implement like functionality
                                onDislike={() => {}} // TODO: Implement dislike functionality
                                likesCount={actor.likes}
                                dislikesCount={actor.dislikes}
                            />
                            <RatingStar
                                rating={actor.rating || 0}
                                onRate={() => {}} // TODO: Implement rating functionality
                            />
                        </div>
                    </ActorCard>
                ))}
            </ActorGrid>
        </Container>
    );
}

export default ActorList;
