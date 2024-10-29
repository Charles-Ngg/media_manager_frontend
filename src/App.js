// src/App.js
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './themes';
import GlobalStyle from './GlobalStyle';
import AppRoutes from './Routes';
import Navbar from './components/Navbar';

function App() {
    const [currentTheme, setCurrentTheme] = useState('light');

    const toggleTheme = () => {
        setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyle />
            <Navbar toggleTheme={toggleTheme} currentTheme={currentTheme} />
            <AppRoutes />
        </ThemeProvider>
    );
}

export default App;
