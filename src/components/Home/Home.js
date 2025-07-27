import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import HomeMessage from "./HomeMessage";
import './Home.css'


const heroMedia = [
  { type: "image", src: "/bg1.jpg" },
  // { type: "video", src: "/hero-banner.mp4" },
  { type: "image", src: "/2.JPG" },
  { type: "image", src: "/5.JPG" },
];

const heroSections = [
  {
    title: "Welcome to Freemasonry Berlin",
    text: "Freemasonry stands for the values of humanity, tolerance, freedom and fraternity. For centuries, it has united people seeking personal development and a better society.",
  },
  {
    title: "A Path of Tradition and Progress",
    text: "Discover a community where tradition meets modern thinking. Our members come from diverse backgrounds and cultures, connected by a common bond of brotherhood and enlightenment.",
  },
  {
    title: "Find Out More & Get Involved",
    text: "Are you interested in our philosophy? Looking for more than just answers? Learn about our lodge, our principles, and how you can become a part of this unique tradition.",
  },
  {
    title: "At Dawn – Knowledge in the Light",
    text: "Our ancient motto: Let your journey start with wisdom, fraternity, and illumination.",
  },
];

const Home = () => {
  const [section, setSection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSection(s => (s + 1) % heroSections.length), 7000);
    return () => clearInterval(interval);
  }, []);

  const currentMedia = heroMedia[section % heroMedia.length];

  return (
    <div>
      {/* Hero Section with dynamic background */}
      <div
        className="d-flex align-items-center justify-content-center text-light"
        style={{
          minHeight: "85vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {currentMedia.type === "video" ? (
          <video
            src={currentMedia.src}
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
              opacity: 0.85,
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: `linear-gradient(rgba(35,35,35,0.7), rgba(35,35,35,0.7)), url('${currentMedia.src}') center/cover no-repeat`,
              zIndex: 0,
              transition: "background-image 0.6s",
            }}
          />
        )}

        <Container style={{ position: "relative", zIndex: 2 }}>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h1 className="display-4 fw-bold mb-3">{heroSections[section].title}</h1>
              <p className="lead mb-4">{heroSections[section].text}</p>
              <Button as={Link} to="/about" variant="outline-light" size="lg">
                Learn More
              </Button>
            </Col>
          </Row>
        </Container>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(rgba(35,35,35,0.75), rgba(35,35,35,0.60))",
            zIndex: 1,
          }}
        />
      </div>

      {/* --- CTA SECTION HERE --- */}
      <Container className="py-4 text-center">
        <h3 className="fw-bold mb-3">Get to know the lodge</h3>
        <p className="lead mb-4">Curious about our traditions, activities, or how to become a member?</p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Button as={Link} to="/about" variant="primary" size="lg">
            Learn About the Lodge
          </Button>
          <Button as={Link} to="/contact" variant="outline-dark" size="lg">
            Interested in Membership?
          </Button>
        </div>
      </Container>
      {/* --- END CTA SECTION --- */}

      {/*About Intro*/}
      <HomeMessage />

      {/* Mission/Values */}
      <Container className="py-5">
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <Card.Title>Our Mission</Card.Title>
                <Card.Text>
                  Freemasonry promotes values of self-improvement, social responsibility, and respectful dialogue. We support charitable projects and foster friendships beyond borders.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <Card.Title>Who We Are</Card.Title>
                <Card.Text>
                  Our lodge in Berlin is part of an international network. We welcome men of all professions and faiths who wish to work together for the good of humanity.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <Card.Title>Join Us</Card.Title>
                <Card.Text>
                  Are you interested in joining Freemasonry? <br />
                  <strong>Contact us</strong> for more information about our regular meetings and the path to membership.
                </Card.Text>
                <Button as={Link} to="/contact" variant="primary" size="sm">
                  Contact
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
