// src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Actors API calls
export const getActors = () => axios.get(`${API_URL}/actors/`);
export const getActorById = (id) => axios.get(`${API_URL}/actors/${id}/`);
export const createActor = (actorData) => axios.post(`${API_URL}/actors/`, actorData);
export const updateActor = (id, actorData) => axios.put(`${API_URL}/actors/${id}/`, actorData);
export const deleteActor = (id) => axios.delete(`${API_URL}/actors/${id}/`);

// Media API calls
export const getMediaList = async (params = {}) => {
    try {
        const response = await axios.get(`${API_URL}/media/`, { params });
        return response;
    } catch (error) {
        console.error('Error fetching media list:', error);
        throw error;
    }
};

export const getMediaById = (id) => axios.get(`${API_URL}/media/${id}/`);
export const createMedia = (mediaData) => axios.post(`${API_URL}/media/`, mediaData);
export const updateMedia = (id, mediaData) => axios.put(`${API_URL}/media/${id}/`, mediaData);
export const deleteMedia = (id) => axios.delete(`${API_URL}/media/${id}/`);

// Play and Delete Files
export const playMedia = async (mediaId) => {
    try {
        const response = await axios.post(`${API_URL}/media/${mediaId}/play/`);
        return response.data;
    } catch (error) {
        console.error('Error playing media:', error);
        throw error;
    }
};

export const deleteMediaFiles = async (mediaId) => {
    try {
        const response = await axios.delete(`${API_URL}/media/${mediaId}/delete-files/`);
        return response.data;
    } catch (error) {
        console.error('Error deleting media files:', error);
        throw error;
    }
};

// Like and Rating API calls
// Media Like and Rating
export const likeMedia = (mediaId, likeState) => 
    axios.post(`${API_URL}/media/${mediaId}/like/`, { like_state: likeState });

export const rateMedia = (mediaId, ratingValue) => 
    axios.post(`${API_URL}/media/${mediaId}/rate/`, { rating_value: ratingValue });

// Actor Like and Rating
export const likeActor = (actorId, likeState) => 
    axios.post(`${API_URL}/actors/${actorId}/like/`, { like_state: likeState });

export const rateActor = (actorId, ratingValue) => 
    axios.post(`${API_URL}/actors/${actorId}/rate/`, { rating_value: ratingValue });

// Categories API calls
export const getCategories = () => axios.get(`${API_URL}/categories/`);

// Studios API calls
export const getStudios = () => axios.get(`${API_URL}/studios/`);

// Directors API calls
export const getDirectors = () => axios.get(`${API_URL}/directors/`);

// Get Genre Names
export const getGenreById = (id) => axios.get(`${API_URL}/genres/${id}/`);

// Get Tag Names
export const getTagById = (id) => axios.get(`${API_URL}/tags/${id}/`);