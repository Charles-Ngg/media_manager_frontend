// src/components/StyledButton.js
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: ${({ theme }) => theme.buttonBackground};
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: ${({ theme }) => theme.buttonHoverBackground};
        transform: translateY(-2px);
    }

    &:active {
        background-color: ${({ theme }) => theme.buttonActiveBackground};
        transform: translateY(0);
    }
`;

export default StyledButton;
