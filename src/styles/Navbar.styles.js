import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
    background-color: ${({ theme }) => theme.navbarBackground};
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
`;

export const NavList = styled.ul`
    list-style: none;
    display: flex;
    gap: 20px;
    margin: 0;
    padding: 0;
    align-items: center;
`;

export const NavItem = styled.li``;

export const StyledLink = styled(Link)`
    font-size: 18px;
    color: ${({ theme }) => theme.textColor};
    &:hover {
        color: ${({ theme }) => theme.linkColor};
    }
`;

export const ThemeToggle = styled.button`
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

    display: flex;
    align-items: center;
`; 