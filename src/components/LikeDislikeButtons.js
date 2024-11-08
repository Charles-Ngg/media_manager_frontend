import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaHeart, FaRegHeart, FaThumbsDown, FaRegThumbsDown } from 'react-icons/fa';

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 12px; /* 12px space between buttons */
    margin-top: 10px;
`;

const pop = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.3);
    }
    100% {
        transform: scale(1);
    }
`;

const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    display: flex;
    align-items: center;
    font-size: 1.2em;
    transition: transform 0.2s ease;

    &:active {
        animation: ${pop} 0.3s ease;
    }
`;

const LikeIcon = styled.span`
    color: ${({ active }) => (active ? '#ff6347' : '#cccccc')};
    transition: color 0.3s ease;

    &:hover {
        color: ${({ active }) => (active ? '#e5533d' : '#ff6347')};
    }
`;

const DislikeIcon = styled.span`
    color: ${({ active }) => (active ? '#ff4500' : '#cccccc')};
    transition: color 0.3s ease;

    &:hover {
        color: ${({ active }) => (active ? '#c71800' : '#ff4500')};
    }
`;

const LikeDislikeButtons = ({ likeState, onLike, onDislike, likesCount, dislikesCount }) => {
    return (
        <ButtonContainer>
            <Button onClick={onLike}>
                {likeState === 'liked' ? (
                    <LikeIcon active>
                        <FaHeart />
                    </LikeIcon>
                ) : (
                    <LikeIcon>
                        <FaRegHeart />
                    </LikeIcon>
                )}

            </Button>
            <Button onClick={onDislike}>
                {likeState === 'disliked' ? (
                    <DislikeIcon active>
                        <FaThumbsDown />
                    </DislikeIcon>
                ) : (
                    <DislikeIcon>
                        <FaRegThumbsDown />
                    </DislikeIcon>
                )}

            </Button>
        </ButtonContainer>
    );
};

export default LikeDislikeButtons; 