import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageContainer = styled.div`
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
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

export const NavLink = styled(Link)`
    padding: 0.75rem 1.5rem;
    margin: 0 0.5rem;
    text-decoration: none;
    color: ${({ theme }) => theme.textColor};
    font-weight: 600;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${({ theme }) => theme.hoverBackground};
        transform: translateY(-1px);
    }

    &.active {
        background-color: ${({ theme }) => theme.primaryColor};
        color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding: 0.5rem 0;
`;

export const Title = styled.h1`
    font-size: 2.2rem;
    color: ${({ theme }) => theme.textColor};
    margin: 0;
    font-weight: 700;
`;

export const AddButton = styled(Link)`
    padding: 0.75rem 1.5rem;
    background-color: ${({ theme }) => theme.primaryColor};
    color: white;
    border: none;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: ${({ theme }) => theme.primaryColorDark};
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    &:active {
        transform: translateY(0);
    }
`;

export const ControlsContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const FilterSortContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: ${({ theme }) => theme.cardBackground};
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    flex: 1;

    @media (max-width: 768px) {
        flex-wrap: wrap;
    }
`;

export const Label = styled.label`
    margin-right: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.textColor};
    white-space: nowrap;
`;

export const Select = styled.select`
    padding: 0.5rem 1rem;
    margin-right: 1.5rem;
    border: 2px solid ${({ theme }) => theme.borderColor};
    border-radius: 8px;
    background-color: ${({ theme }) => theme.cardBackground};
    color: ${({ theme }) => theme.textColor};
    cursor: pointer;
    font-size: 0.95rem;
    transition: all 0.2s ease;

    option {
        background-color: ${({ theme }) => theme.cardBackground};
        color: ${({ theme }) => theme.textColor};
    }

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.primaryColor};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.primaryColor}20;
    }

    &:hover {
        border-color: ${({ theme }) => theme.primaryColor};
    }
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    padding: 1rem 0;
`;

export const Card = styled.div`
    background-color: ${({ theme }) => theme.cardBackground};
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    position: relative;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
    }
`;

export const CardImageLink = styled(Link)`
    display: block;
    overflow: hidden;
    cursor: pointer;
`;

export const CardImage = styled.img`
    width: 100%;
    height: 320px;
    object-fit: cover;
    transition: transform 0.3s ease;

    ${CardImageLink}:hover & {
        transform: scale(1.05);
    }
`;

export const CardContent = styled.div`
    padding: 1.5rem;
`;

export const CardTitle = styled.h3`
    margin: 0 0 1rem 0;
    font-size: 1.3rem;
    color: ${({ theme }) => theme.textColor};
    font-weight: 600;
`;

export const CardInfo = styled.div`
    color: ${({ theme }) => theme.textColor};
    font-size: 0.95rem;

    div {
        margin: 0.5rem 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

export const CardActions = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

export const ActionButton = styled.button`
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: ${({ variant, theme }) => 
        variant === 'primary' ? theme.primaryColor :
        variant === 'danger' ? theme.dangerColor || '#dc3545' :
        theme.cardBackground};
    color: ${({ variant, theme }) => variant ? 'white' : theme.textColor};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        background-color: ${({ variant, theme }) => 
            variant === 'primary' ? theme.primaryColorDark :
            variant === 'danger' ? '#bd2130' :
            theme.hoverBackground};
    }

    &:active {
        transform: translateY(0);
    }
`;

export const Loading = styled.div`
    text-align: center;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.textColor};
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

export const ErrorMessage = styled.div`
    text-align: center;
    color: ${({ theme }) => theme.errorColor};
    margin-top: 3rem;
    padding: 1.5rem;
    background-color: ${({ theme }) => theme.errorBackground};
    border-radius: 12px;
    font-weight: 500;
`; 