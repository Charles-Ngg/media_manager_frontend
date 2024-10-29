import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background-color: ${({ theme }) => theme.cardBackground};
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
`;

export const Title = styled.h2`
    font-size: 2em;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.textColor};
    text-align: center;
`;

export const Poster = styled.img`
    width: 100%;
    max-width: 400px;
    height: auto;
    display: block;
    margin: 0 auto 20px auto;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Info = styled.div`
    p {
        font-size: 1.1em;
        margin: 10px 0;
        color: ${({ theme }) => theme.textColor};
    }
`;

export const Section = styled.div`
    margin-top: 30px;

    h3 {
        font-size: 1.5em;
        margin-bottom: 15px;
        color: ${({ theme }) => theme.textColor};
    }

    ul {
        list-style-type: disc;
        margin-left: 20px;
        color: ${({ theme }) => theme.textColor};
    }

    p {
        margin-left: 20px;
        color: ${({ theme }) => theme.textColor};
    }

    a {
        color: ${({ theme }) => theme.linkColor};
        text-decoration: none;
        transition: color 0.2s ease;

        &:hover {
            color: ${({ theme }) => theme.linkHoverColor};
        }
    }

    .screenshot-gallery {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
    }

    .screenshot-image {
        width: calc(33% - 10px);
        border-radius: 8px;
        object-fit: cover;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    video {
        width: 100%;
        max-width: 600px;
        border-radius: 8px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        margin: 0 auto;
        display: block;
    }
`;

export const Loading = styled.div`
    text-align: center;
    font-size: 1.5em;
    color: ${({ theme }) => theme.textColor};
    margin-top: 50px;
`; 