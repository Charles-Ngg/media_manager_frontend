import styled from 'styled-components';
import { Link } from 'react-router-dom';
import StyledButton from '../components/StyledButton'; // Ensure this import path is correct

export const MediaListContainer = styled.div`
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;
    background-color: ${({ theme }) => theme.cardBackground};
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    transition: background-color 0.3s ease, color 0.3s ease;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
`;

export const MediaListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

export const HeaderTitle = styled.h2`
    font-size: 2em;
    color: ${({ theme }) => theme.textColor};
`;

export const AddMediaButton = styled(StyledButton)`
    /* You can add additional styles here if needed */
`;

export const MediaGrid = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 0;
    margin: 0;
`;

export const MediaCard = styled.li`
    background-color: ${({ theme }) => theme.cardBackground};
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }
`;

export const MediaTitle = styled.h3`
    font-size: 1.2em;
    color: ${({ theme }) => theme.textColor};
    text-align: center;
    margin-bottom: 10px;
`;

export const MediaPoster = styled.img`
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 10px;
`;

export const MediaType = styled.p`
    font-size: 1em;
    color: ${({ theme }) => theme.textColor};
    margin: 5px 0;
`;

export const MediaReleaseDate = styled.p`
    font-size: 1em;
    color: ${({ theme }) => theme.textColor};
    margin: 5px 0 15px 0;
`;

export const ViewDetailsButton = styled(StyledButton)`
    width: 100%;
    text-align: center;
`; 