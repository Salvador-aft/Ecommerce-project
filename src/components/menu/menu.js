// src/components/Menu.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useAuth } from '../context/authContext';
import Logo from './Nike.svg';

const CustomContainer = styled.div`
  user-select: none;
  cursor: default;
`;

const CustomNavLink = styled(Nav.Link)`
  color: white !important;
  text-decoration: none !important;
  font-size: 20.8px;
  padding-right: 35px;
  position: relative;
  display: inline-block;

  span {
    display: inline-block;
    position: relative;
  }

  span::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: white;
    transition: width 0.25s ease-out;
  }

  &:hover span::after {
    width: 100%;
  }
`;

const LastNavLink = styled(CustomNavLink)`
  padding-right: 0 !important;
`;

const CartNavLink = styled(CustomNavLink)`
  margin-right: 0 !important;
  padding-right: 0 !important;
`;

const NavbarWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const Menu = () => {
  // Destructure authentication state and actions from the auth context
  const { isAuthenticated, user, logout } = useAuth();


  return (
    <CustomContainer>
      <NavbarWrapper>
        <Navbar expand="lg" style={{ backgroundColor: 'transparent' }}>
          <Container fluid>
            <Row className="w-100 align-items-center mx-5">
              <Col xs={12} sm={6} md={3} lg={3} className="d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <img src={Logo} alt="Nike Logo" className="logo" style={{ width: '100px' }} />
                </Link>
              </Col>
              <Col xs={12} sm={6} md={4} lg={6} className="d-flex justify-content-center align-items-center">
                <Nav>
                  <CustomNavLink as={Link} to="/LastReleases"><span>New Releases</span></CustomNavLink>
                  <CustomNavLink as={Link} to="/Men"><span>Men</span></CustomNavLink>
                  <CustomNavLink as={Link} to="/Women"><span>Women</span></CustomNavLink>
                  <CustomNavLink as={Link} to="/Kids"><span>Kids</span></CustomNavLink>
                  <LastNavLink as={Link} to="/ShopAll"><span>Shop All</span></LastNavLink>
                </Nav>
              </Col>
              <Col xs={12} sm={6} md={3} lg={3} className="d-flex justify-content-end align-items-center">
                <Nav>
                  {isAuthenticated ? (
                    <Dropdown align="end">
                      <Dropdown.Toggle as={CustomNavLink} style={{ paddingRight: '0px' }}>
                        <FontAwesomeIcon icon={faCircleUser} />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.ItemText>Hi, {user?.name || 'User'}</Dropdown.ItemText>
                        <Dropdown.Item as={Link} to="/orders">My Orders</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/technical-support">Help</Dropdown.Item>
                        <Dropdown.Item onClick={logout}>Sign Out</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <CustomNavLink as={Link} to="/signin">
                      <FontAwesomeIcon icon={faCircleUser} />
                    </CustomNavLink>
                  )}
                  <CartNavLink as={Link} to="/cart">
                    <FontAwesomeIcon icon={faBagShopping} />
                  </CartNavLink>
                </Nav>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </NavbarWrapper>
    </CustomContainer>
  );
};

export default Menu;