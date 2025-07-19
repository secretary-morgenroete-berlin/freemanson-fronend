import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const paperBg = "https://www.transparenttextures.com/patterns/old-mathematics.png"; // Subtle vintage paper

const chairmanLetter = `
Welcome! 
Welcome to our website. Perhaps you've come to our site to gather information or learn something about the "myth" of Freemasonry. Please take a look around and get to know us better.

We are a daughter lodge of the “Grand Provincial Lodge of Freemasons of Germany / Freemasonry Order”.

The headquarters is in the Order House (photo) at Peter-Lenné-Straße 1-3, 14195 Berlin.

We would be delighted to welcome you to a guest evening or a personal meeting. Here you can learn more about us, our lodge, and the Freemasons. Simply use the contact form.

Best regards!

The Chairman Master
`;

const HomeMessage = () => (
  <div
    style={{
      background: `url(${paperBg}), #f6f2e8`,
      minHeight: "100vh",
      padding: "60px 0",
      fontFamily: "'Cormorant Garamond', serif",
    }}
  >
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <Card
            className="shadow-lg border-0"
            style={{
              background: "rgba(255,255,240,0.92)",
              borderRadius: "22px",
              border: "1.5px solid #bba",
              boxShadow: "0 4px 32px 0 #998f7b40",
              padding: "2rem 2.2rem",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.28rem",
              lineHeight: "2.2",
              letterSpacing: "0.03em",
            }}
          >
            <div
              style={{
                fontFamily: "'Great Vibes', 'Parisienne', cursive",
                fontSize: "2.5rem",
                color: "#654321",
                marginBottom: "1.5rem",
                textAlign: "center",
                letterSpacing: "0.1em",
                textShadow: "0 1px 0 #fff2c4",
              }}
            >
              Welcome!
            </div>
            <div style={{ whiteSpace: "pre-line", color: "#2e1b0e", fontWeight: 500 }}>
              Welcome to our website. Perhaps you've come to our site to gather information or learn something about the "myth" of Freemasonry.
              <br /><br />
              Please take a look around and get to know us better.<br /><br />
              We are a daughter lodge of the “Grand Provincial Lodge of Freemasons of Germany / Freemasonry Order”.
              <br /><br />
              The headquarters is in the Order House (photo) at Peter-Lenné-Straße 1-3, 14195 Berlin.
              <br /><br />
              We would be delighted to welcome you to a guest evening or a personal meeting. Here you can learn more about us, our lodge, and the Freemasons. Simply use the contact form.
              <br /><br />
              <span style={{
                fontFamily: "'Great Vibes', 'Parisienne', cursive",
                fontSize: "1.7rem",
                color: "#795548",
                fontWeight: 600,
                display: "block",
                marginTop: "2.2rem"
              }}>
                Best regards!
                <br />
                <span style={{
                  fontFamily: "'Great Vibes', 'Parisienne', cursive",
                  fontSize: "2.2rem",
                  color: "#8b5a2b",
                  display: "block",
                  marginTop: "0.6rem"
                }}>
                  The Chairman Master
                </span>
              </span>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default HomeMessage;
