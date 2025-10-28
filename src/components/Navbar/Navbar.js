import React from "react";
import { Container, Nav, Navbar as BsNavbar } from "react-bootstrap";
import { Link } from "react-router-dom";
// import logo from "../assets/logo-freemasonry.png"; // if importing

const Navbar = () => (
  <BsNavbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
    <Container>
      <BsNavbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
        {/* If logo is in /public, use: */}
        <img
          src="/Freemasonry_Logo.png"
          alt="Freemasonry Berlin logo"
          style={{
            height: 38,
            width: 38,
            borderRadius: "50%",
            objectFit: "cover",
            background: "#fff",
            boxShadow: "0 2px 8px #0002"
          }}
          className="me-2"
        />
        <span className="fw-bold" style={{
          fontFamily: "'Cormorant Garamond', serif",
          letterSpacing: "0.04em",
          fontSize: "1.33rem"
        }}>
          Freemasonry Berlin
        </span>
      </BsNavbar.Brand>
      <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BsNavbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/lodge">Lodge</Nav.Link>
          <Nav.Link as={Link} to="/what-is-freemasonry">what is freemasonry</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/news-blog">News & Blogs</Nav.Link>
          <Nav.Link as={Link} to="/become-member">Become Member</Nav.Link>
          {/* <Nav.Link as={Link} to="/contact">Contact</Nav.Link> */}
        </Nav>
      </BsNavbar.Collapse>
    </Container>
  </BsNavbar>
);

export default Navbar;
