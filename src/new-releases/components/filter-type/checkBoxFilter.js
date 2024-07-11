import React from 'react';

const CheckboxOption = ({ category, option, selectedOption, handleSelection }) => {
    const isSelected = selectedOption[category] === option;

    return (
        <div>
            <label>
                <input
                    style={{ marginRight: '10px' }}  // Estilo inline para espacio
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSelection(category, option)}
                />
                {option}
            </label>
        </div>
    );
};

export default CheckboxOption;