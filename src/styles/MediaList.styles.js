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

// Added Styled Components for Sorting
export const SortContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

export const SortLabel = styled.label`
    margin-right: 10px;
    font-size: 1em;
    color: #333333;
`;

export const SortSelect = styled.select`
    padding: 8px 12px;
    font-size: 1em;
    border: 1px solid #cccccc;
    border-radius: 8px;
    background-color: #ffffff;
    color: #333333;
    cursor: pointer;
    transition: border-color 0.3s ease;

    &:focus {
        outline: none;
        border-color: #1e90ff;
    }
`;

// Added PlayButton and DeleteButton
export const PlayButton = styled(StyledButton)`
    margin-top: 10px;
    background-color: #32cd32;

    &:hover {
        background-color: #228b22;
    }
`;

export const DeleteButton = styled(StyledButton)`
    margin-top: 10px;
    background-color: #ff4500;

    &:hover {
        background-color: #c71800;
    }
`;

export const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    margin-right: 20px;
`;

export const FilterLabel = styled.label`
    margin-right: 10px;
    font-size: 1em;
    color: #333333;
`;

export const FilterSelect = styled.select`
    padding: 8px 12px;
    font-size: 1em;
    border: 1px solid #cccccc;
    border-radius: 8px;
    background-color: #ffffff;
    color: #333333;
    cursor: pointer;
    transition: border-color 0.3s ease;
    margin-right: 20px;

    &:focus {
        outline: none;
        border-color: #1e90ff;
    }
`;