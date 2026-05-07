// src/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MediaList from './pages/MediaList';
import MediaDetail from './pages/MediaDetail';
import AddMedia from './pages/AddMedia';
import ActorList from './pages/ActorList';
import ActorDetail from './pages/ActorDetail';
// Import other necessary components

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MediaList />} />
            <Route path="/media/:id" element={<MediaDetail />} />
            <Route path="/add-media" element={<AddMedia />} />
            <Route path="/actors" element={<ActorList />} />
            <Route path="/actors/:id" element={<ActorDetail />} />
            {/* Add other routes as needed */}
        </Routes>
    );
}

export default AppRoutes;
