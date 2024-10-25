// src/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MediaList from './pages/MediaList';
import AddMedia from './pages/AddMedia';
import MediaDetail from './pages/MediaDetail';
// Import other components as needed

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MediaList />} />
            <Route path="/add-media" element={<AddMedia />} />
            <Route path="/media/:id" element={<MediaDetail />} />
            {/* Add more routes as needed */}
        </Routes>
    );
}

export default AppRoutes;
