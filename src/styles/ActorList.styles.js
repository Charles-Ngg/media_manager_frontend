import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;
    background-color: ${({ theme }) => theme.cardBackground};
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
`;

export const Title = styled.h2`
    font-size: 2em;
    color: ${({ theme }) => theme.textColor};
    text-align: center;
    margin-bottom: 30px;
`;

export const ActorGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 25px;
`;

export const ActorCard = styled.div`
    background-color: ${({ theme }) => theme.cardBackground};
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }
`;

export const ActorLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
`;

export const ActorImage = styled.img`
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 15px;
`;

export const ActorName = styled.h3`
    font-size: 1.2em;
    color: ${({ theme }) => theme.textColor};
    text-align: center;
`;

export const Loading = styled.div`
    text-align: center;
    font-size: 1.5em;
    color: ${({ theme }) => theme.textColor};
    margin-top: 50px;
`;

export const ErrorMessage = styled.div`
    text-align: center;
    font-size: 1.2em;
    color: red;
    margin-top: 50px;
`; 