// src/components/StyledButton.js
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: #007aff;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #0051a8;
        transform: translateY(-2px);
    }

    &:active {
        background-color: #003f7f;
        transform: translateY(0);
    }
`;

export default StyledButton;
