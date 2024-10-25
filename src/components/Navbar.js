// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
    background-color: #ffffff;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavList = styled.ul`
    list-style: none;
    display: flex;
    gap: 20px;
    margin: 0;
    padding: 0;
`;

const NavItem = styled.li``;

const StyledLink = styled(Link)`
    font-size: 18px;
    color: #1c1c1e;
    &:hover {
        color: #007aff;
    }
`;

function Navbar() {
    return (
        <Nav>
            <NavList>
                <NavItem>
                    <StyledLink to="/">Media List</StyledLink>
                </NavItem>
                <NavItem>
                    <StyledLink to="/add-media">Add Media</StyledLink>
                </NavItem>
            </NavList>
        </Nav>
    );
}

export default Navbar;
