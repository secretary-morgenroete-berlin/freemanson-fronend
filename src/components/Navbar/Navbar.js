import React from "react";
import { Container, Nav, Navbar as BsNavbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = () => (
  <BsNavbar bg="dark" variant="dark" expand="lg" sticky="top">
    <Container>
      <BsNavbar.Brand as={Link} to="/">Freemasonry Berlin</BsNavbar.Brand>
      <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BsNavbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          {/* FREEMASONS DROPDOWN */}
          <NavDropdown title="Freemasons" id="freemasons-dropdown">
            <NavDropdown.Item as={Link} to="/what-is-freemasonry">
              What is Freemasonry?
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/history-of-freemasons">
              History of Freemasons
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/goals-of-freemasonry">
              Goals of Freemasonry
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/symbolism">
              symbolism
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
        </Nav>
      </BsNavbar.Collapse>
    </Container>
  </BsNavbar>
);

export default Navbar;
