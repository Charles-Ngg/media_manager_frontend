import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;

export const NavigationBar = styled.nav`
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    padding: 1rem;
    background-color: ${({ theme }) => theme.cardBackground};
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const NavLink = styled(Link)`
    padding: 0.5rem 1rem;
    margin: 0 1rem;
    text-decoration: none;
    color: ${({ theme }) => theme.textColor};
    font-weight: 500;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
        background-color: ${({ theme }) => theme.hoverBackground};
    }

    &.active {
        background-color: ${({ theme }) => theme.primaryColor};
        color: white;
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

export const Title = styled.h1`
    font-size: 2rem;
    color: ${({ theme }) => theme.textColor};
    margin: 0;
`;

export const AddButton = styled(Link)`
    padding: 0.75rem 1.5rem;
    background-color: ${({ theme }) => theme.primaryColor};
    color: white;
    border: none;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${({ theme }) => theme.primaryColorDark};
    }
`;

export const SortContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: ${({ theme }) => theme.cardBackground};
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SortLabel = styled.label`
    margin-right: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.textColor};
`;

export const SortSelect = styled.select`
    padding: 0.5rem;
    margin-right: 2rem;
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 4px;
    background-color: white;
    color: ${({ theme }) => theme.textColor};
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.primaryColor};
    }
`;

export const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    padding: 1rem;
    background-color: ${({ theme }) => theme.cardBackground};
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FilterLabel = styled.label`
    margin-right: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.textColor};
`;

export const FilterSelect = styled.select`
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 4px;
    background-color: white;
    color: ${({ theme }) => theme.textColor};
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.primaryColor};
    }
`;

export const ActorGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    padding: 1rem 0;
`;

export const ActorCard = styled.div`
    background-color: ${({ theme }) => theme.cardBackground};
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;

    &:hover {
        transform: translateY(-4px);
    }
`;

export const ActorLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    display: block;
`;

export const ActorImage = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
`;

export const ActorName = styled.h3`
    margin: 1rem;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.textColor};
`;

export const ActorInfo = styled.div`
    padding: 1rem;
    color: ${({ theme }) => theme.textColor};

    div {
        margin: 0.5rem 0;
    }
`;

export const Loading = styled.div`
    text-align: center;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.textColor};
    margin-top: 3rem;
`;

export const ErrorMessage = styled.div`
    text-align: center;
    color: ${({ theme }) => theme.errorColor};
    margin-top: 3rem;
    padding: 1rem;
    background-color: ${({ theme }) => theme.errorBackground};
    border-radius: 8px;
`; 