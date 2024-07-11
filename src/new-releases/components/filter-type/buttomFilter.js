import React from 'react';

const ButtonOption = ({ category, option, selectedOption, handleSelection }) => {
    const isSelected = selectedOption[category] === option;

    return (
        <div>
            <button
                onClick={() => handleSelection(category, option)}
                disabled={isSelected}
            >
                {option} {isSelected ? "(Selected)" : ""}
            </button>
        </div>
    );
};

export default ButtonOption;
