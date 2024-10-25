// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MediaList from './pages/MediaList';
import MediaDetail from './pages/MediaDetail';
import ActorDetail from './pages/ActorDetail';
import AddMedia from './pages/AddMedia';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<MediaList />} />
        <Route path="/media/:id" element={<MediaDetail />} />
        <Route path="/actor/:id" element={<ActorDetail />} />
        <Route path="/add-media" element={<AddMedia />} /> {/* Add this line */}
      </Routes>
    </Router>
  );
}

export default App;
