// src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Actors API calls
export const getActors = () => axios.get(`${API_URL}/actors/`);
export const getActorById = (id) => axios.get(`${API_URL}/actors/${id}/`);
export const createActor = (actorData) => axios.post(`${API_URL}/actors/`, actorData);
export const updateActor = (id, actorData) => axios.put(`${API_URL}/actors/${id}/`, actorData);
export const deleteActor = (id) => axios.delete(`${API_URL}/actors/${id}/`);

// Media API calls
export const getMediaList = () => axios.get(`${API_URL}/media/`);
export const getMediaById = (id) => axios.get(`${API_URL}/media/${id}/`);
export const createMedia = (mediaData) => axios.post(`${API_URL}/media/`, mediaData);
export const updateMedia = (id, mediaData) => axios.put(`${API_URL}/media/${id}/`, mediaData);
export const deleteMedia = (id) => axios.delete(`${API_URL}/media/${id}/`);

// Ratings API calls
export const getRatings = () => axios.get(`${API_URL}/ratings/`);
export const createRating = (ratingData) => axios.post(`${API_URL}/ratings/`, ratingData);

// Users API calls (if applicable)
export const getUsers = () => axios.get(`${API_URL}/users/`);
export const getUserById = (id) => axios.get(`${API_URL}/users/${id}/`);
export const createUser = (userData) => axios.post(`${API_URL}/users/`, userData);
export const updateUser = (id, userData) => axios.put(`${API_URL}/users/${id}/`, userData);
export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}/`);

// Tags API calls
export const getTags = () => axios.get(`${API_URL}/tags/`);

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