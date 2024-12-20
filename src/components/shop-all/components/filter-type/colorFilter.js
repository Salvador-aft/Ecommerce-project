import React from 'react';
import styled from 'styled-components';

const ColorButton = styled.button`
    border: 2px solid ${props => (props.isSelected ? 'black' : '#ccc')};
    background: ${props => props.color}; /* Soporta color sólido o gradiente */
    border-radius: 50%; /* Hace que el botón sea circular */
    width: 40px; /* Tamaño fijo para el ancho y alto */
    height: 40px;
    margin: 1px;
    cursor: pointer;
    transition: border-color 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        border-color: ${props => (props.isSelected ? 'black' : '#888')};
    }

    &:focus {
        outline: none;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

const ColorLabel = styled.span`
    display: block;
    text-align: center;
    margin-top: 4px; /* Separación entre el botón y el texto */
    font-size: 12px;
`;

// Renders a selectable color option for a given category.
const ColorOption = ({ category, option, color, selectedOption, handleSelection }) => {
    // Determines if the current option is selected within the category.
    const isSelected = selectedOption[category] === option;

    return (
        <div style={{ textAlign: 'center' }}>
            <ColorButton
                isSelected={isSelected}
                color={color}
                onClick={() => handleSelection(category, option)}
            />
            <ColorLabel>{option}</ColorLabel>
        </div>
    );
};

export default ColorOption;