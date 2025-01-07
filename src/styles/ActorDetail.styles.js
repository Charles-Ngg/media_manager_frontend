import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    max-width: 800px;
    margin: 40px auto;
    padding: 30px;
    background-color: ${({ theme }) => theme.cardBackground};
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
`;

export const Name = styled.h2`
    font-size: 2em;
    color: ${({ theme }) => theme.textColor};
    text-align: center;
    margin-bottom: 20px;
`;

export const ProfileImage = styled.img`
    width: 100%;
    max-width: 300px;
    height: auto;
    display: block;
    margin: 0 auto 20px auto;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const ProfileGallery = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    margin-bottom: 20px;

    img {
        width: calc(33% - 10px);
        border-radius: 8px;
        object-fit: cover;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        @media (max-width: 768px) {
            width: calc(50% - 10px);
        }

        @media (max-width: 480px) {
            width: 100%;
        }
    }
`;

export const Info = styled.div`
    p {
        font-size: 1.1em;
        margin: 10px 0;
        color: ${({ theme }) => theme.textColor};
    }
`;

export const Section = styled.section`
    margin: 2rem 0;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h3 {
        margin-bottom: 1rem;
        color: #333;
        font-size: 1.5rem;
    }

    .media-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1.5rem;
        padding: 1rem 0;
    }

    .media-item {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        transition: transform 0.2s;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        &:hover {
            transform: translateY(-5px);
        }

        a {
            text-decoration: none;
            color: inherit;
            display: block;
            padding: 1rem;
        }

        h4 {
            margin: 0 0 0.5rem 0;
            font-size: 1.1rem;
            color: #333;
        }

        .media-cover {
            width: 100%;
            height: 250px;
            object-fit: cover;
            border-radius: 4px;
            margin-bottom: 0.5rem;
        }

        p {
            margin: 0.25rem 0;
            font-size: 0.9rem;
            color: #666;
        }
    }
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

export const NoActor = styled.div`
    text-align: center;
    font-size: 1.5em;
    color: ${({ theme }) => theme.textColor};
    margin-top: 50px;
`; 