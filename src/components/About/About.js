import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const About = () => (
  <Container className="py-5">
    <Row className="justify-content-center mb-4">
      <Col md={8}>
        <h2 className="fw-bold mb-3">About Freemasonry Berlin</h2>
        <p>
          Freemasonry is a centuries-old tradition that brings together people who seek personal development, ethical values, and a cosmopolitan worldview.
        </p>
        <p>
          Our Berlin lodge is a meeting place for open-minded individuals. We encourage reflection, honest dialogue, and mutual support, respecting the beliefs and background of each member.
        </p>
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>What Is Freemasonry?</Card.Title>
            <Card.Text>
              Freemasonry is not a religion or a political group. It is a brotherhood based on the ideals of humanity, tolerance, freedom, and equality. Through rituals, symbolism, and charitable activities, members strive to become better individuals.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Our Activities</Card.Title>
            <Card.Text>
              In our lodge, we regularly hold discussions, lectures, and social events. We are committed to supporting the local community and nurturing a spirit of friendship and learning.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default About;
