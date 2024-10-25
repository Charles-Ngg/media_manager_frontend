// src/App.js
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom'; // Added import
import { lightTheme, darkTheme } from './themes';
import Navbar from './components/Navbar';
import AppRoutes from './Routes';
import GlobalStyle from './GlobalStyle';

function App() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <BrowserRouter> {/* Added BrowserRouter */}
                <GlobalStyle />
                <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
                <AppRoutes />
            </BrowserRouter> {/* Closed BrowserRouter */}
        </ThemeProvider>
    );
}

export default App;
