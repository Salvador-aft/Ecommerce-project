import React from 'react';
import styled from 'styled-components';

const SizeButton = styled.button`
    border: 2px solid ${props => (props.isSelected ? 'black' : '#ccc')}; // Highlight border if the option is selected
    background-color: white; // Keep the button background white
    padding: 10px 0; // Vertical padding
    margin: 1px; // Small gap between buttons
    cursor: pointer; // Change the cursor to pointer on hover
    transition: border-color 0.3s; // Smooth transition for border color changes
    flex-basis: calc(32% - 8px); // Button width adapts for flexible rows with spacing
    box-sizing: border-box; // Include padding and border in total width
    text-align: center; // Center the text inside the button
    font-size: 14px; // Font size for readability
    height: 40px; // Fixed height for consistent appearance
    display: flex; // Use flexbox to center content
    align-items: center; // Vertically align the content
    justify-content: center; // Horizontally align the content

    &:hover {
        border-color: ${props => (props.isSelected ? 'black' : '#888')}; // Change border color on hover
    }

    &:focus {
        outline: none; // Remove default focus outline for better design
    }
`;

const ButtonContainer = styled.div`
    display: flex; // Use flexbox for button layout
    flex-wrap: wrap; // Allow buttons to wrap into multiple rows
    gap: 8px; // Uniform spacing between buttons
`;

// Main component for each option button
const ButtonOption = ({ category, option, selectedOption, handleSelection }) => {
    const isSelected = selectedOption[category] === option; // Check if this option is currently selected

    return (
        <SizeButton
            isSelected={isSelected}
            onClick={() => handleSelection(category, option)}
        >
            {option}
        </SizeButton>
    );
};

export default ButtonOption;