import React, { useState } from 'react';
import axios from 'axios';

const TechnicalSupport = () => {
  // State to manage the ticket's subject, message, and responses from the server
  const [ticket, setTicket] = useState({
    subject: 'modify name',  // Default subject of the ticket
    message: '',  // Initial message is empty
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Prevent message field from exceeding 300 characters
    if (name === 'message' && value.length > 300) return;
    setTicket({
      ...ticket,
      [name]: value,  // Update the corresponding field in ticket state
    });
  };

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent form from reloading the page on submit
    // Clean up the message by removing empty lines
    const cleanMessage = ticket.message
      .split('\n')  // Split the message by newlines
      .filter(line => line.trim() !== '')  // Remove lines that are empty
      .join('\n');  // Join the lines back into a single string
    
    try {
      const token = localStorage.getItem('token'); // Retrieve the user's token from localStorage
      if (!token) {
        setErrorMessage('You are not logged in. Please log in to submit a ticket.');  // Show error if no token is found
        return;
      }
  
      // Send the ticket data to the server using axios
      const response = await axios.post(
        'http://localhost:5000/api/tickets',  // Server endpoint for submitting tickets
        { ...ticket, message: cleanMessage },  // Include cleaned-up message in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        }
      );
  
      // Check if the server successfully created the ticket
      if (response.status === 201) {  // 201 status indicates successful resource creation
        setSuccessMessage('Ticket sent successfully. We will contact you soon.');  // Display success message
        setTicket({ subject: 'modify name', message: '' });  // Reset the form
      }
    } catch (error) {
      console.error('Error submitting the ticket:', error);  // Log any errors that occur
      setErrorMessage('There was an error submitting the ticket. Please try again later.');  // Display error message
    }
  };

  return (
    <div style={{ marginTop: '80px' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto' }}>
        <div className="form-group">
          <label>Subject</label>
          <select
            name="subject"
            value={ticket.subject}
            onChange={handleInputChange}
            className="form-control"
            required
          >
            <option value="modify name">Modify Name</option>
            <option value="modify email">Modify Email</option>
          </select>
        </div>
        <div className="form-group mt-3">
          <label>Message</label>
          <textarea
            name="message"
            value={ticket.message}
            onChange={handleInputChange}
            className="form-control"
            rows="5"
            required
          />
          <small className="form-text text-muted">Max 300 characters.</small>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Submit Ticket</button>
      </form>
      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
    </div>
  );
};

export default TechnicalSupport;