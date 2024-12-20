import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container as Row } from 'react-bootstrap';
import CheckboxOption from './filter-type/checkBoxFilter';
import ButtonOption from './filter-type/buttomFilter';
import ColorOption from './filter-type/colorFilter'; 
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const ArrowUp = styled.div.attrs(props => ({
  isOpen: props.isOpen
}))`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: ${(props) => (props.isOpen ? 'rotate(-135deg)' : 'rotate(45deg)')};
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const FilterSection = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const FilterWrapper = styled.div`
  width: 80%;
  margin-left: 0;
  padding: 10px;
`;

const TextRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 0;
`;

const Filter = ({ onFilterChange }) => {
  // State to track selected filter options
  const [selectedOption, setSelectedOption] = useState({
    opportunities: null,
    size: null,
    shoeSize: null,
    gender: null,
    color: null,
    style: null,
  });

  // States to handle opening/closing of filter sections
  const [isOpenOpportunities, setIsOpenOpportunities] = useState(true);
  const [isOpenGender, setIsOpenGender] = useState(true);
  const [isOpenActivity, setIsOpenActivity] = useState(true);
  const [isOpenShoeSize, setIsOpenShoeSize] = useState(true);
  const [isOpenColor, setIsOpenColor] = useState(true);

  // Accessing location and navigation from React Router
  const location = useLocation(); // Get current URL location (to read query params)
  const history = useNavigate();  // For navigating programmatically (to update URL)

  // Effect to initialize selected options based on URL query parameters
  useEffect(() => {
    const query = new URLSearchParams(location.search);  // Parse query parameters from the URL
    const updatedFilters = {
      opportunities: query.get('opportunities') || null,
      size: query.get('size') || null,
      shoeSize: query.get('shoeSize') || null,
      gender: query.get('gender') || null,
      color: query.get('color') || null,
      style: query.get('style') || null,
    };
    setSelectedOption(updatedFilters);  // Set the state to reflect current URL filters
  }, [location.search]);  // Runs every time the URL query params change

  // Effect to trigger URL update and fetch sneakers when filters change
  useEffect(() => {
    if (onFilterChange) {
      updateUrlAndFetchSneakers();  // Update the URL and fetch sneakers when filter options change
    }
  }, [selectedOption]);  // Runs whenever the selectedOption state changes

  // Function to construct query string for filtering
  const updateUrlAndFetchSneakers = () => {
    const queryString = buildQueryString(selectedOption);  // Build query string from selected filters
    history(`?${queryString}`);  // Update the URL with new query string
    fetchFilteredSneakers(queryString);  // Fetch filtered sneakers based on the new query string
  };

  // Build query string from selected filter options
  const buildQueryString = (filters) => {
    const params = new URLSearchParams();  // Create a new URLSearchParams object
    Object.keys(filters).forEach(key => {
      if (filters[key]) {  // Only include filters that have a value (not null)
        params.append(key, filters[key]);  // Add each filter option to the query string
      }
    });
    return params.toString();  // Return the query string (e.g., "?gender=Male&color=Red")
  };

  // Fetch filtered sneakers from the server
  const fetchFilteredSneakers = async (queryString) => {
    try {
      const response = await axios.get(`/sneakers/filter?${queryString}`);  // Fetch filtered sneakers from the API
      if (Array.isArray(response.data)) {  // Ensure the response is an array
        onFilterChange(response.data);  // Pass the filtered sneakers data to the parent component
      } else {
        console.error('Expected array but received:', response.data);  // Error handling if data format is incorrect
      }
    } catch (error) {
      console.error('Error fetching filtered sneakers:', error);  // Error handling for the request
    }
  };

  // Toggle open/close for each filter section
  const toggleOpen = (section) => {
    switch (section) {
      case 'opportunities':
        setIsOpenOpportunities(!isOpenOpportunities);
        break;
      case 'gender':
        setIsOpenGender(!isOpenGender);
        break;
      case 'activity':
        setIsOpenActivity(!isOpenActivity);
        break;
      case 'shoeSize':
        setIsOpenShoeSize(!isOpenShoeSize);
        break;
      case 'color':
        setIsOpenColor(!isOpenColor);
        break;
      default:
        break;
    }
  };

  // Handle selection or deselection of filter options
  const handleSelection = (category, option) => {
    // Toggle the filter selection: if the option is selected, deselect it (set to null), otherwise select it
    const newSelection = {
      ...selectedOption, // Spread the current selected options
      [category]: selectedOption[category] === option ? null : option,  // Ternary operation to toggle selection
    };
    setSelectedOption(newSelection);  // Update the state with the new selection
  };

  return (
    <FilterWrapper>
      <FilterSection>
        <Row>Filters</Row>
      </FilterSection>
      <FilterSection>
        <TextRow>
          <div>Opportunities</div>
          <ArrowUp isOpen={isOpenOpportunities} onClick={() => toggleOpen('opportunities')} />
        </TextRow>
        {isOpenOpportunities && (
          <Row>
            <ul className='list-unstyled'>
              <li>
                <CheckboxOption
                  category="opportunities"
                  option="50% OFF"
                  selectedOption={selectedOption}
                  handleSelection={handleSelection}
                />
              </li>
            </ul>
          </Row>
        )}
      </FilterSection>
      <FilterSection>
        <TextRow>
          <div>Gender</div>
          <ArrowUp isOpen={isOpenGender} onClick={() => toggleOpen('gender')} />
        </TextRow>
        {isOpenGender && (
          <Row>
            <ul className='list-unstyled'>
              <li>
                <CheckboxOption
                  category="gender"
                  option="Man"
                  selectedOption={selectedOption}
                  handleSelection={handleSelection}
                />
              </li>
              <li>
                <CheckboxOption
                  category="gender"
                  option="Woman"
                  selectedOption={selectedOption}
                  handleSelection={handleSelection}
                />
              </li>
              <li>
                <CheckboxOption
                  category="gender"
                  option="Unisex"
                  selectedOption={selectedOption}
                  handleSelection={handleSelection}
                />
              </li>
              <li>
                <CheckboxOption
                  category="gender"
                  option="Kids"
                  selectedOption={selectedOption}
                  handleSelection={handleSelection}
                />
              </li>
            </ul>
          </Row>
        )}
      </FilterSection>
      <FilterSection>
        <TextRow>
          <div>Activity Type</div>
          <ArrowUp isOpen={isOpenActivity} onClick={() => toggleOpen('activity')} />
        </TextRow>
        {isOpenActivity && (
          <Row>
            <ul className='list-unstyled'>
              <li>
                <CheckboxOption
                  category="style"
                  option="Urban"
                  selectedOption={selectedOption}
                  handleSelection={handleSelection}
                />
              </li>
              <li>
                <CheckboxOption
                  category="style"
                  option="Sport"
                  selectedOption={selectedOption}
                  handleSelection={handleSelection}
                />
              </li>
            </ul>
          </Row>
        )}
      </FilterSection>
      <FilterSection>
        <TextRow>
          <div>Shoe Size</div>
          <ArrowUp isOpen={isOpenShoeSize} onClick={() => toggleOpen('shoeSize')} />
        </TextRow>
        {isOpenShoeSize && (
          <ButtonContainer>
            {['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5'].map(size => (
              <ButtonOption
                key={size}
                category="shoeSize"
                option={size}
                selectedOption={selectedOption}
                handleSelection={handleSelection}
              />
            ))}
          </ButtonContainer>
        )}
      </FilterSection>
      <FilterSection>
        <TextRow>
          <div>Color</div>
          <ArrowUp isOpen={isOpenColor} onClick={() => toggleOpen('color')} />
        </TextRow>
        {isOpenColor && (
          <ButtonContainer>
            {[{ label: 'Red', color: '#FF0000' }, { label: 'Green', color: '#00FF00' }, { label: 'Blue', color: '#0000FF' }, { label: 'Yellow', color: '#FFFF00' }]
              .map(({ label, color }) => (
                <ColorOption
                  key={label}
                  category="color"
                  option={label}
                  color={color}
                  selectedOption={selectedOption}
                  handleSelection={handleSelection}
                />
              ))}
          </ButtonContainer>
        )}
      </FilterSection>
    </FilterWrapper>
  );
};

export default Filter;