// src/pages/ActorList.js
import React, { useEffect, useState } from 'react';
import { getActors, likeActor, rateActor } from '../services/api';
import { Link } from 'react-router-dom';
import {
    PageContainer,
    Header,
    Title,
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
import { FaPlus } from 'react-icons/fa';

function ActorList() {
    const [actors, setActors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useLocalStorage('actorSortBy', 'rating');
    const [sortOrder, setSortOrder] = useLocalStorage('actorSortOrder', 'desc');
    const [likeState, setLikeState] = useLocalStorage('actorLikeState', '');

    useEffect(() => {
        fetchActors();
    }, [sortBy, sortOrder, likeState]);

    const fetchActors = async () => {
        try {
            setLoading(true);
            const params = {
                sort_by: sortBy,
                sort_order: sortOrder,
                ...(likeState && { like_state: likeState }),
            };
            const response = await getActors(params);
            setActors(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching actors:', err);
            setError('Failed to fetch actors. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleLikeStateChange = (event) => {
        setLikeState(event.target.value);
    };

    const handleLike = async (actorId, currentLikeState) => {
        let newLikeState = 'liked';
        if (currentLikeState === 'liked') {
            newLikeState = 'no_liked';
        }
        try {
            await likeActor(actorId, newLikeState);
            setActors(actors.map(actor => 
                actor.id === actorId ? { 
                    ...actor, 
                    like_state: newLikeState 
                } : actor
            ));
        } catch (error) {
            console.error('Error liking actor:', error);
        }
    };

    const handleDislike = async (actorId, currentLikeState) => {
        let newLikeState = 'disliked';
        if (currentLikeState === 'disliked') {
            newLikeState = 'no_liked';
        }
        try {
            await likeActor(actorId, newLikeState);
            setActors(actors.map(actor => 
                actor.id === actorId ? { 
                    ...actor, 
                    like_state: newLikeState 
                } : actor
            ));
        } catch (error) {
            console.error('Error disliking actor:', error);
        }
    };

    const handleRate = async (actorId, ratingValue) => {
        try {
            await rateActor(actorId, ratingValue);
            setActors(actors.map(actor => 
                actor.id === actorId ? { 
                    ...actor, 
                    rating: ratingValue 
                } : actor
            ));
        } catch (error) {
            console.error('Error rating actor:', error);
        }
    };

    if (loading) return <Loading>Loading actors...</Loading>;
    if (error) return <ErrorMessage>{error}</ErrorMessage>;

    return (
        <PageContainer>
            <Header>
                <Title>Actor List</Title>
            </Header>
            <ControlsContainer>
                <FilterSortContainer>
                    <Label htmlFor="likeState">Filter by Like State:</Label>
                    <Select id="likeState" value={likeState} onChange={handleLikeStateChange}>
                        <option value="">All</option>
                        <option value="liked">Liked</option>
                        <option value="no_liked">Not Liked</option>
                        <option value="disliked">Disliked</option>
                    </Select>
                </FilterSortContainer>

                <FilterSortContainer>
                    <Label htmlFor="sortBy">Sort By:</Label>
                    <Select id="sortBy" value={sortBy} onChange={handleSortByChange}>
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
                {actors.map((actor) => (
                    <Card key={actor.id}>
                        <CardContent>
                            <CardTitle>{actor.name}</CardTitle>
                            {actor.profile_image_urls && actor.profile_image_urls.length > 0 && (
                                <CardImageLink to={`/actors/${actor.id}`}>
                                    <CardImage
                                        src={actor.profile_image_urls[0]}
                                        alt={actor.name}
                                    />
                                </CardImageLink>
                            )}
                            <CardInfo>
                                {actor.nationality && (
                                    <div>Nationality: {actor.nationality}</div>
                                )}
                                {actor.date_of_birth && (
                                    <div>Birth Date: {new Date(actor.date_of_birth).toLocaleDateString()}</div>
                                )}
                                <div>
                                    <LikeDislikeButtons 
                                        likeState={actor.like_state} 
                                        onLike={() => handleLike(actor.id, actor.like_state)} 
                                        onDislike={() => handleDislike(actor.id, actor.like_state)} 
                                    />
                                </div>
                                <div>
                                    <RatingStar 
                                        rating={actor.rating || 0} 
                                        onRate={(newRating) => handleRate(actor.id, newRating)} 
                                    />
                                </div>
                            </CardInfo>
                            <CardActions>
                                <ActionButton as={Link} to={`/actors/${actor.id}`} variant="primary">
                                    View Details
                                </ActionButton>
                            </CardActions>
                        </CardContent>
                    </Card>
                ))}
            </Grid>
        </PageContainer>
    );
}

export default ActorList;
