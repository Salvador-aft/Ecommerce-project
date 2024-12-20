import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks if the user is logged in or not
  const [user, setUser] = useState(null); // Holds the user details extracted from the token
  const [token, setToken] = useState(null); // Holds the JWT token used for authentication

  /*
   Validates the structure of the token and decodes it if valid.
   A JWT (JSON Web Token) is a string divided into three parts separated by dots ('.'):
   - Header: Contains metadata about the token (e.g., type, signing algorithm).
   - Payload: Contains user data (claims) such as user ID, email, etc.
   - Signature: Ensures the token's integrity and authenticity.
    
   The structure should look like: `<header>.<payload>.<signature>`.
    
   This function:
   1. Checks if the token has three parts (valid structure).
   2. Attempts to decode the payload using `jwtDecode`.
   3. Returns the decoded object if valid or null if the token is invalid.
  */
  const validateAndDecodeToken = (token) => {
    // Check if the token is present and has the correct format
    if (!token || token.split('.').length !== 3) {
      console.error('Invalid token format. A valid JWT must have three parts separated by dots.');
      return null;
    }
    try {
      // Decode the token to extract the payload (e.g., user information)
      const decoded = jwtDecode(token); // jwtDecode automatically parses the payload of the token
      console.log('Decoded token:', decoded);
      return decoded; // Return the decoded payload (e.g., user data and token expiry)
    } catch (error) {
      console.error('Error decoding the token:', error.message);
      return null;
    }
  };

  useEffect(() => {
    // Runs on component mount to check if a session already exists (e.g., token in localStorage or URL)
    
    // 1. Check for a token in the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get('token');

    if (tokenFromURL) {
      console.log('Token captured from URL:', tokenFromURL);
      login(tokenFromURL);
      window.history.replaceState({}, document.title, window.location.pathname); // Clean the token from the URL to avoid exposing it
    } else {
      // 2. Check for a saved token in localStorage
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        const decoded = validateAndDecodeToken(savedToken); // Validate and decode the saved token
        if (decoded?.user) {
          setToken(savedToken); // Store the valid token in state
          setIsAuthenticated(true); // Mark the user as logged in
          setUser(decoded.user); // Store the user details from the token
        } else {
          console.error('Invalid token found in localStorage. Logging out.');
          logout(); // Clear invalid token
        }
      }
    }
  }, []);

  /*
    Handles the login process.
   - Validates and decodes the token.
   - If valid, saves it to localStorage and updates the app's state.
  */
  const login = (newToken) => {
    console.log('Logging in with token:', newToken);
    const decoded = validateAndDecodeToken(newToken); // Validate and decode the new token
    if (decoded?.user) {
      localStorage.setItem('token', newToken); // Save the token to localStorage for persistent login
      setToken(newToken); // Store the token in state
      setIsAuthenticated(true); // Mark the user as logged in
      setUser(decoded.user); // Save user information from the decoded token
    } else {
      console.error('Failed to log in: Invalid token'); // Handle invalid token
    }
  };

  /*
    Handles the logout process.
    - Clears the token from localStorage and resets the state.
  */
  const logout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setToken(null); // Reset the token in state
    setIsAuthenticated(false); // Mark the user as logged out
    setUser(null); // Clear the user information
  };

  /*
   Provides the authentication state and functions (`login`, `logout`) 
   to the rest of the app via React's Context API.
  */
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children} {/* Renders child components wrapped by this provider */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);