import React from "react";
import { Container, Nav, Navbar as BsNavbar, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice"; // adjust path if needed
import './Navbar.css'

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const initials = user
    ? `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase()
    : null;

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect to login page
  };

  return (
    <BsNavbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      className="shadow-sm"
    >
      <Container>
        <BsNavbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2"
        >
          <img
            src="/Freemasonry_Logo.png"
            alt="Freemasonry Berlin logo"
            style={{
              height: 38,
              width: 38,
              borderRadius: "50%",
              objectFit: "cover",
              background: "#fff",
              boxShadow: "0 2px 8px #0002",
            }}
            className="me-2"
          />
          <span
            className="fw-bold"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: "0.04em",
              fontSize: "1.33rem",
            }}
          >
            Freemasonry Berlin
          </span>
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="basic-navbar-nav" id="dropdown-btn"/>
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/lodge">Lodge</Nav.Link>
            <Nav.Link as={Link} to="/what-is-freemasonry">What is Freemasonry</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/news-blog">News & Blogs</Nav.Link>
            <Nav.Link as={Link} to="/become-member">Become Member</Nav.Link>

            {/* 👇 Conditional Rendering for User */}
            {user ? (
              <Dropdown align="end" className="ms-3">
                <Dropdown.Toggle
                  variant="warning"
                  id="dropdown-user"
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                    borderRadius: "50%",
                    width: 38,
                    height: 38,
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textTransform: "uppercase",
                  }}
                >
                  {initials}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Header>
                    {user.first_name} {user.last_name}
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/portal">
                    Portal
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
