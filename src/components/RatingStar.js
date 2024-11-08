import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StarContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
`;

const Star = styled.span`
    font-size: 1.5em;
    color: ${({ filled }) => (filled ? '#ffd700' : '#cccccc')};
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
        color: #ffea00;
    }
`;

const RatingStar = ({ rating, onRate }) => {
    const safeRating = typeof rating === 'number' ? rating : 0;

    const handleRating = (value) => {
        onRate(value);
    };

    const stars = [];
    for (let i = 1; i <= 10; i++) {
        stars.push(
            <Star
                key={i}
                filled={i <= Math.round(safeRating)}
                onClick={() => handleRating(i)}
            >
                ★
            </Star>
        );
    }

    return (
        <StarContainer>
            {stars}
            <span style={{ marginLeft: '10px' }}>{safeRating.toFixed(1)}</span>
        </StarContainer>
    );
};

RatingStar.propTypes = {
    rating: PropTypes.number,
    onRate: PropTypes.func.isRequired,
};

RatingStar.defaultProps = {
    rating: 0,
};

export default RatingStar; 