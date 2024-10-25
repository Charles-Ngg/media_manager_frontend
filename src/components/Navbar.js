// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaMoon, FaSun } from 'react-icons/fa'; // Ensure react-icons is installed

const Nav = styled.nav`
    background-color: ${({ theme }) => theme.navbarBackground};
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
`;

const NavList = styled.ul`
    list-style: none;
    display: flex;
    gap: 20px;
    margin: 0;
    padding: 0;
    align-items: center;
`;

const NavItem = styled.li``;

const StyledLink = styled(Link)`
    font-size: 18px;
    color: ${({ theme }) => theme.textColor};
    &:hover {
        color: ${({ theme }) => theme.linkColor};
    }
`;

const ThemeToggle = styled.button`
    background: none;
    border: none;
    color: ${({ theme }) => theme.textColor};
    cursor: pointer;
    font-size: 16px;
    padding: 8px 12px;
    border-radius: 4px;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        background-color: ${({ theme }) => theme.inputBackground};
    }
`;

function Navbar({ toggleTheme, currentTheme }) {
    return (
        <Nav>
            <NavList>
                <NavItem>
                    <StyledLink to="/">Media List</StyledLink>
                </NavItem>
                <NavItem>
                    <StyledLink to="/add-media">Add Media</StyledLink>
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
