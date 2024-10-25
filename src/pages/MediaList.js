// src/pages/MediaList.js
import React, { useEffect, useState } from 'react';
import { getMediaList } from '../services/api';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import StyledButton from '../components/StyledButton';
import styled from 'styled-components';

const Container = styled.div`
    padding: 40px;
    max-width: 1200px;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.bodyBackground};
    transition: background-color 0.3s ease;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const MediaGrid = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 0;
`;

const MediaCard = styled.li`
    background-color: ${({ theme }) => theme.cardBackground};
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    }
`;

const MediaTitle = styled.h3`
    margin-top: 0;
    color: ${({ theme }) => theme.textColor};
`;

function MediaList() {
    const [mediaList, setMediaList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
        try {
            const response = await getMediaList();
            setMediaList(response.data);
        } catch (error) {
            console.error('Error fetching media list:', error);
        }
    };

    // Filter media based on search query
    const filteredMediaList = mediaList.filter((media) => {
        const query = searchQuery.toLowerCase();
        return (
            (media.title && media.title.toLowerCase().includes(query)) ||
            (media.categories &&
                media.categories.some(
                    (cat) => cat && cat.toLowerCase().includes(query)
                )) ||
            (media.tags &&
                media.tags.some(
                    (tag) => tag && tag.toLowerCase().includes(query)
                ))
        );
    });

    return (
        <Container>
            <Header>
                <h2>Media List</h2>
                <StyledButton as={Link} to="/add-media">
                    Add New Media
                </StyledButton>
            </Header>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <MediaGrid>
                {filteredMediaList.map((media) => (
                    <MediaCard key={media.id}>
                        <MediaTitle>{media.title}</MediaTitle>
                        <p>Categories: {media.categories.join(', ')}</p>
                        <p>Tags: {media.tags.join(', ')}</p>
                        <StyledButton as={Link} to={`/media/${media.id}`}>
                            View Details
                        </StyledButton>
                    </MediaCard>
                ))}
            </MediaGrid>
        </Container>
    );
}

export default MediaList;
