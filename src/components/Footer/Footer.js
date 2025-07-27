import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => (
  <footer className="bg-dark text-light py-3">
    <Container className="text-center">
      © {new Date().getFullYear()} Freemasonry Berlin | Inspired by UGLE & Morgenröte
    </Container>
  </footer>
);

export default Footer;
