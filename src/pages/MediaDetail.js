// src/pages/MediaDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMediaById, getGenreById, getTagById } from '../services/api';
import {
    Container,
    Title,
    Poster,
    Info,
    Section,
    Loading,
} from '../styles/MediaDetail.styles';

function MediaDetail() {
    const { id } = useParams();
    const [media, setMedia] = useState(null);
    const [genres, setGenres] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetchMediaDetail();
    }, [id]);

    const fetchMediaDetail = async () => {
        try {
            const response = await getMediaById(id);
            const mediaData = response.data;
            setMedia(mediaData);

            // Fetch genres if genre_ids exists
            if (mediaData.genre_ids && mediaData.genre_ids.length > 0) {
                const genrePromises = mediaData.genre_ids.map((genreId) => getGenreById(genreId));
                const genreResponses = await Promise.all(genrePromises);
                const genreNames = genreResponses.map((res) => res.data.name);
                setGenres(genreNames);
            }

            // Fetch tags if tag_ids exists
            if (mediaData.tag_ids && mediaData.tag_ids.length > 0) {
                const tagPromises = mediaData.tag_ids.map((tagId) => getTagById(tagId));
                const tagResponses = await Promise.all(tagPromises);
                const tagNames = tagResponses.map((res) => res.data.name);
                setTags(tagNames);
            }
        } catch (error) {
            console.error('Error fetching media detail:', error);
        }
    };

    if (!media) {
        return <Loading>Loading...</Loading>;
    }

    return (
        <Container>
            <Title>{media.title}</Title>
            {media.poster_image_url && (
                <Poster
                    src={media.poster_image_url}
                    alt={media.title}
                />
            )}
            <Info>
                <p><strong>Type:</strong> {media.type || 'N/A'}</p>
                <p><strong>Release Date:</strong> {media.release_date || 'N/A'}</p>
                <p><strong>Runtime:</strong> {media.runtime ? `${media.runtime} minutes` : 'N/A'}</p>
                <p><strong>Language:</strong> {media.language || 'N/A'}</p>
                <p><strong>Country:</strong> {media.country || 'N/A'}</p>
                <p><strong>Description:</strong> {media.description || 'No description available'}</p>
            </Info>

            {tags.length > 0 && (
                <Section className="media-tags">
                    <h3>Tags:</h3>
                    <ul>
                        {tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                        ))}
                    </ul>
                </Section>
            )}

            {media.cast && media.cast.length > 0 && (
                <Section className="media-cast">
                    <h3>Cast:</h3>
                    <ul>
                        {media.cast.map((actor) => (
                            <li key={actor.id}>
                                <Link to={`/actors/${actor.id}`} className="actor-link">
                                    {actor.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Section>
            )}

            {media.directors && media.directors.length > 0 && (
                <Section className="media-directors">
                    <h3>Directors:</h3>
                    <ul>
                        {media.directors.map((director) => (
                            <li key={director.id}>
                                <Link to={`/director/${director.id}`} className="director-link">
                                    {director.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Section>
            )}

            {media.file_info && (
                <Section className="media-file-info">
                    <h3>File Information:</h3>
                    <p><strong>Resolution:</strong> {media.file_info.resolution || 'N/A'}</p>
                    <p><strong>File Size:</strong> {media.file_info.file_size ? `${media.file_info.file_size} bytes` : 'N/A'}</p>
                    <p><strong>Video Codec:</strong> {media.file_info.video_codec || 'N/A'}</p>
                    <p><strong>Audio Codec:</strong> {media.file_info.audio_codec || 'N/A'}</p>
                    <p><strong>File Path:</strong> {media.file_info.file_path || 'N/A'}</p>
                </Section>
            )}

            {media.screenshot_urls && media.screenshot_urls.length > 0 && (
                <Section className="media-screenshots">
                    <h3>Screenshots:</h3>
                    <div className="screenshot-gallery">
                        {media.screenshot_urls.map((url, index) => (
                            <img
                                key={index}
                                src={url}
                                alt={`Screenshot ${index + 1}`}
                                className="screenshot-image"
                            />
                        ))}
                    </div>
                </Section>
            )}

            {media.trailer_url && (
                <Section className="media-trailer">
                    <h3>Trailer:</h3>
                    <video src={media.trailer_url} controls className="trailer-video" />
                </Section>
            )}
        </Container>
    );
}

export default MediaDetail;
