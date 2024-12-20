import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { jwtDecode } from 'jwt-decode';

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f0f0f0;
`;

const Form = styled.form`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  text-align: center;
  color: #333;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
  transition: border-color 0.2s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 0.5rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  color: #fff;
  background-color: #000000;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px;

  &:hover {
    background-color: #42261a;
  }
`;

const SignInLink = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: #666;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignIn = () => {
  const [email, setEmail] = useState(''); // State to manage the email input
  const [password, setPassword] = useState(''); // State to manage the password input
  const [errorMessage, setErrorMessage] = useState(''); // State to manage error messages
  const navigate = useNavigate(); // Navigation hook for redirecting users
  const { login } = useAuth(); // AuthContext function for handling user login

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Clear localStorage before login
    localStorage.clear();

    try {
      // Send login request to the server
      const response = await axios.post('http://localhost:5000/users/login', { email, password });
      const { token, name, isAdmin } = response.data;

      // Save token and user info to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      localStorage.setItem('isAdmin', isAdmin);

      // Use the login function from AuthContext
      login(token);

      // Redirect user based on their role
      if (isAdmin) {
        navigate('/control-panel'); // Admin-specific route
      } else {
        navigate('/'); // Default user route
      }
    } catch (err) {
      // Handle errors from the server
      setErrorMessage(err.response?.data.msg || 'Error during login');
      console.error('Error:', err.response?.data || err.message);
    }
  };

  return (
    <SignInContainer>
      <Form onSubmit={handleSubmit}>
        <Title>Sign In</Title>
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputGroup>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button type="submit">Login</Button>
        <SignInLink>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </SignInLink>
        <SignInLink>
          <Link to="/password-recover">Forgot your password?</Link>
        </SignInLink>
      </Form>
    </SignInContainer>
  );
};

export default SignIn;