// src/App.js
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './themes';
import GlobalStyle from './GlobalStyle';
import AppRoutes from './Routes';
import Navbar from './components/Navbar';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
    const [currentTheme, setCurrentTheme] = useLocalStorage('theme', 'light');

    const toggleTheme = () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setCurrentTheme(newTheme);
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
