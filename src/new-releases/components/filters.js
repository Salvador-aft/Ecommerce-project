import React, { useState } from 'react';
import styled from 'styled-components';
import { Container as Row } from 'react-bootstrap';
import CheckboxOption from './filter-type/checkBoxFilter';
import ButtonOption from './filter-type/buttomFilter';

const ArrowUp = styled.div`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: ${props => (props.isOpen ? 'rotate(-135deg)' : 'rotate(45deg)')};
  -webkit-transform: ${props => (props.isOpen ? 'rotate(-135deg)' : 'rotate(45deg)')};
  cursor: pointer;
`;

const Filter = () => {
    const [selectedOption, setSelectedOption] = useState({
        opportunities: null,
        size: null,
        shoeSize: null,
        gender: null,
        categories: null,
        productType: null,
        recommendedFor: null,
        surface: null,
        age: null,
        collections: null,
        color: null,
    });

    const [isOpen, setIsOpen] = useState(false);

    const handleSelection = (category, option) => {
        setSelectedOption(prevState => ({
            ...prevState,
            [category]: prevState[category] === option ? null : option,
        }));
    };

    const toggleOpen = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div>
            <div>
                <Row>Filters</Row>
                <Row>
                    Opportunities <ArrowUp isOpen={isOpen} onClick={toggleOpen} />
                </Row>
                {isOpen && (
                    <Row>
                        <ul className='list-unstyled'>
                            <li><CheckboxOption category="opportunities" option="50% OFF" selectedOption={selectedOption} handleSelection={handleSelection} /></li>
                            <li><CheckboxOption category="opportunities" option="40% OFF" selectedOption={selectedOption} handleSelection={handleSelection} /></li>
                            <li><CheckboxOption category="opportunities" option="30% OFF" selectedOption={selectedOption} handleSelection={handleSelection} /></li>
                            <li><CheckboxOption category="opportunities" option="20% OFF" selectedOption={selectedOption} handleSelection={handleSelection} /></li>
                        </ul>
                    </Row>
                )}
            </div>
        </div>
    );
};

export default Filter;