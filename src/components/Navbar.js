// src/components/Navbar.js
import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa'; // Ensure react-icons is installed
import {
    Nav,
    NavList,
    NavItem,
    StyledLink,
    ThemeToggle,
} from '../styles/Navbar.styles';

function Navbar({ toggleTheme, currentTheme }) {
    return (
        <Nav>
            <NavList>
                <NavItem>
                    <StyledLink to="/">Media List</StyledLink>
                </NavItem>
                <NavItem>
                    <StyledLink to="/actors">Actor List</StyledLink>
                </NavItem>
                <NavItem>
                    <ThemeToggle onClick={toggleTheme}>
                        {currentTheme === 'light' ? (
                            <>
                                <FaMoon style={{ marginRight: '8px' }} />
                                Dark Mode
                            </>
                        ) : (
                            <>
                                <FaSun style={{ marginRight: '8px' }} />
                                Light Mode
                            </>
                        )}
                    </ThemeToggle>
                </NavItem>
            </NavList>
        </Nav>
    );
}

export default Navbar;
