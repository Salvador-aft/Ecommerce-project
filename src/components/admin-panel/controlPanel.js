import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ControlPanel = () => {
  const [isChatOpen, setIsChatOpen] = useState(false); // Manages the state of the chat window (open/closed)
  const [tickets, setTickets] = useState([]); // Stores the list of support tickets

  // Fetch support tickets when the chat window is opened
  useEffect(() => {
    if (isChatOpen) {
      axios.get('/api/tickets')
        .then(response => {
          setTickets(response.data); // Updates the state with the fetched tickets
        })
        .catch(error => {
          console.error('Error fetching tickets:', error); // Logs any errors during the fetch operation
        });
    }
  }, [isChatOpen]); // Dependency array to ensure the effect runs only when 'isChatOpen' changes

  // Toggles the chat window state between open and closed
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <Container>
      <h1>Admin Control Panel</h1>
      <p>Welcome, admin! Here you can manage users, products, etc.</p>

      <ChatButton onClick={toggleChat}>
        <FontAwesomeIcon icon={faEnvelope} />
      </ChatButton>

      {isChatOpen && (
        <ChatWindow>
          <h2>Support Tickets</h2>
          <TicketList>
            {/* Maps over the tickets array to display each ticket, to show a message if no tickets are available */}
            {tickets.length > 0 ? (
              tickets.map(ticket => (
                <TicketItem key={ticket.id}>
                  <strong>{ticket.subject}</strong>
                  <p>{ticket.message}</p>
                </TicketItem>
              ))
            ) : (
              <p>No tickets available</p>
            )}
          </TicketList>
        </ChatWindow>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  padding: 20px;
`;

const ChatButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #007bff;
  color: white;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 350px;
  height: 400px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TicketList = styled.div`
  overflow-y: auto;
  flex-grow: 1;
`;

const TicketItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;

  strong {
    display: block;
    margin-bottom: 5px;
  }
`;

export default ControlPanel;