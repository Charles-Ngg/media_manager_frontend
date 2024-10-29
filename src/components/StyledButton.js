// src/components/StyledButton.js
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: ${({ theme }) => theme.buttonBackground};
    color: ${({ theme }) => theme.buttonText};
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        background-color: ${({ theme }) => theme.buttonHoverBackground};
    }

    &:focus {
        outline: none;
    }
`;

export default StyledButton;
