// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Adjust the URL as needed

// Media API calls
export const getMediaList = () => axios.get(`${API_URL}/media/`);

export const getMediaDetail = (id) => axios.get(`${API_URL}/media/${id}/`);

export const createMedia = (mediaData) => {
    return axios.post(`${API_URL}/media/`, mediaData)
      .then(response => response.data)
      .catch(error => {
        console.error('Error creating media:', error);
        throw error; // Rethrow the error to be caught in the component
      });
  };

// Actor API calls
export const getActorDetail = (id) => axios.get(`${API_URL}/actors/${id}/`);

// User Interaction API calls
export const submitInteraction = (interactionData) => axios.post(`${API_URL}/interactions/`, interactionData);

