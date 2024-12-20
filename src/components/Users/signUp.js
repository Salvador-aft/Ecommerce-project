import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f0f0f0; // Light gray background for the entire page
`;

const Form = styled.form`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // Adds a soft shadow for a card-like appearance
  width: 100%;
  max-width: 400px; // Limits the form's maximum width for better UX
`;

const Title = styled.h1`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  text-align: center;
  color: #333; // Dark gray text color for better contrast
`;

const InputGroup = styled.div`
  margin-bottom: 1rem; // Adds spacing between input fields
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #666; // Medium gray for labels
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd; // Light gray border
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
  transition: border-color 0.2s; // Smooth transition for focus effect

  &:focus {
    border-color: #007bff; // Blue border on focus
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: red; // Red color for error messages
  margin-top: 0.5rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  color: #fff; // White text
  background-color: #000000; // Black background
  cursor: pointer;
  transition: background-color 0.2s; // Smooth hover effect
  margin-top: 10px;

  &:hover {
    background-color: #42261a; // Dark brown on hover
  }
`;

const SignInLink = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: #666;

  a {
    color: #007bff; // Blue links for emphasis
    text-decoration: none;

    &:hover {
      text-decoration: underline; // Underline on hover for clarity
    }
  }
`;

// Main SignUp functional component
const SignUp = () => {
  // States for form fields and messages
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // React Router hook for navigation

  // Function to validate password using a regex pattern
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,15}$/; // Password must have 7-15 characters, 1 uppercase, and 1 number
    return passwordRegex.test(password);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    if (validatePassword(password)) { // Validates the password before submitting
      try {
        const res = await axios.post('http://localhost:5000/api/users/register', { name, email, password });
        setSuccessMessage(res.data.msg); // Displays success message from the server
        setErrorMessage('');

        // Store the received token in localStorage for session management
        localStorage.setItem('token', res.data.token);
        
        navigate('/profile'); // Redirects user to the profile page upon success
      } catch (err) {
        setErrorMessage(err.response.data.msg); // Sets error message for server-side issues
        setSuccessMessage('');
      }
    } else {
      setPasswordError('Password must be 7-15 characters long, with at least one uppercase letter and one number.');
      setSuccessMessage('');
    }
  };

  // Password change handler with real-time validation
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!validatePassword(e.target.value)) {
      setPasswordError('Password must be 7-15 characters long, with at least one uppercase letter and one number.');
    } else {
      setPasswordError('');
    }
  };

  return (
    <SignUpContainer>
      <Form onSubmit={handleSubmit}>
        <Title>Sign Up</Title>
        <InputGroup>
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        </InputGroup>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <Button type="submit">Register</Button>
        <SignInLink>
          Already have an account? <Link to="/signin">Sign in</Link>
        </SignInLink>
      </Form>
    </SignUpContainer>
  );
};

export default SignUp;