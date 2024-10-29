// src/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MediaList from './pages/MediaList';
import AddMedia from './pages/AddMedia';
import MediaDetail from './pages/MediaDetail';
import ActorList from './pages/ActorList';
import ActorDetail from './pages/ActorDetail';
// Import other components as needed

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MediaList />} />
            <Route path="/add-media" element={<AddMedia />} />
            <Route path="/media/:id" element={<MediaDetail />} />
            <Route path="/actors" element={<ActorList />} />
            <Route path="/actors/:id" element={<ActorDetail />} />
            <Route path="*" element={<div>404 Not Found</div>} />
            {/* Add more routes as needed */}
        </Routes>
    );
}

export default AppRoutes;
