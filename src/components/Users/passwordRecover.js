import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordContainer = styled.div`
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

const ForgotPassword = () => {
  // State variables to manage input values and feedback messages
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Navigation hook for redirecting users

  // Function to validate the password format
  const validatePassword = (password) => {
    // Password must be 7-15 characters, with at least one uppercase letter and one number
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,15}$/;
    return passwordRegex.test(password);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if the new password and confirmation match
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Validate the password format
    if (!validatePassword(newPassword)) {
      setErrorMessage('Password must be 7-15 characters long, with at least one uppercase letter and one number.');
      return;
    }

    // Attempt to send the reset request to the server
    try {
      const res = await axios.post('http://localhost:5000/api/users/reset-password', { email, newPassword });
      setSuccessMessage(res.data.msg); // Display server success message
      setErrorMessage(''); // Clear any previous error message
      navigate('/signin'); // Redirect to the sign-in page
    } catch (err) {
      // Display error message returned by the server
      setErrorMessage(err.response.data.msg);
      setSuccessMessage(''); // Clear any previous success message
    }
  };

  return (
    <ForgotPasswordContainer>
      <Form onSubmit={handleSubmit}>
        <Title>Reset Password</Title>
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </InputGroup>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <Button type="submit">Reset Password</Button>
      </Form>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;