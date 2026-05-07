// src/components/Navbar.js
import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa'; // Ensure react-icons is installed
import {
    Nav,
    NavList,
    NavItem,
    ExternalLink,
    StyledLink,
    ThemeToggle,
} from '../styles/Navbar.styles';

function Navbar({ toggleTheme, currentTheme }) {
    const websitesUrl = `http://${window.location.hostname || '192.168.50.222'}/`;

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
                    <ExternalLink href={websitesUrl}>My Websites</ExternalLink>
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
