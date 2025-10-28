// WhatIsFreemasonry.jsx
import React from "react";
import { Container, Row, Col, Card, Accordion } from "react-bootstrap";
import "./WhatIsFreemasonry.css";

const freimaurerImage = "/bg2.jpg"; 
const img2 = '/what_is_freemansory2.jpg'

export default function WhatIsFreemasonry() {
  return (
    <div style={{ background: "#f7f5ef", minHeight: "100vh", paddingTop: 32 }}>
      <Container>
        {/* TITLE */}
        <Row className="mb-5 justify-content-center">
          <Col xs="12" md="8" className="text-center">
            <h1 className="display-5 fw-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#573e1d" }}>
              What is Freemasonry?
            </h1>
            <hr style={{ width: 70, margin: "0 auto", borderTop: "3px solid #baa55c" }} />
          </Col>
        </Row>

        {/* WHAT IS FREEMASONRY */}
        <Row className="align-items-center mb-5 gy-4">
          <Col xs={12} md={6}>
            <Card className="shadow-sm border-0 p-3" style={{ background: "rgba(255,255,240,0.97)", borderRadius: "1.2rem" }}>
              <Card.Body>
                <Card.Text style={{ fontSize: "1.15rem" }}>
                  <strong>Freemasonry</strong>, also known as the Royal Art, sees itself as an ethical association of free men with the conviction that constant improvement leads to more humane behavior. Freemasons are committed to secrecy and, in particular, to the principle of not revealing Masonic customs and lodge matters to the outside world. This is referred to as the duty of secrecy, also known as the secret discipline. This also facilitates the internal exchange of ideas and opinions.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} className="text-center">
            <img
              src={freimaurerImage}
              alt="Freemasonry Symbolism"
              className="img-fluid rounded shadow"
              style={{ maxHeight: 270, border: "2.5px solid #ede6d1", boxShadow: "0 4px 18px #b7a47529" }}
            />
          </Col>
        </Row>

        {/* BROTHERHOOD */}
        <Row className="align-items-center mb-5 gy-4 flex-md-row-reverse">
          <Col xs={12} md={6}>
            <Card className="shadow-sm border-0 p-3" style={{ background: "rgba(255,255,240,0.97)", borderRadius: "1.2rem" }}>
              <Card.Body>
                <Card.Text style={{ fontSize: "1.13rem" }}>
                  The members call each other <strong>brothers</strong>. The spiritual idea of brotherhood connects people of all races and nationalities into a global brotherhood. There are well over six million Freemasons throughout the world who, with brotherly love and commitment, work on themselves and on the fraternal, liberal, and international ideal of Freemasonry.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} className="text-center">
            <img
              src={img2}
              alt="Freemasonry Brotherhood"
              className="img-fluid rounded shadow"
              style={{ maxHeight: 270, border: "2.5px solid #ede6d1", boxShadow: "0 4px 18px #b7a47529" }}
            />
          </Col>
        </Row>

        {/* WAY OF LIFE */}
        <Row className="align-items-center mb-5 gy-4">
          <Col xs={12} md={12}>
            <Card className="shadow-sm border-0 p-3" style={{ background: "rgba(255,255,240,0.97)", borderRadius: "1.2rem" }}>
              <Card.Body>
                <Card.Text style={{ fontSize: "1.13rem" }}>
                  Freemasonry is a way of life. It is a direction for the righteous life. However, the goal cannot be achieved in a week, a month, or a year. True to the motto: <strong>"The path is the destination."</strong> The teachings of Freemasonry are so comprehensive and appeal so strongly to the individual that they will ponder them for a lifetime. People also become Freemasons because they want to believe, but cannot believe everything. A Freemason does not strive for complete knowledge, but rather to become essential, in the truest sense of the word.
                </Card.Text>
                <Card.Text style={{ fontStyle: "italic", color: "#654321", fontSize: "1.08rem" }}>
                  The history of Freemasonry reaches far back, but its message is timeless. The principles and values of the Freemasons are still relevant today and invite everyone to get involved.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* ORDER STRUCTURE & SYMBOLISM */}
        <Row className="mb-5">
          <Col xs={12} md={10} lg={8} className="mx-auto">
            <h2 className="mb-4 mt-3" style={{ color: "#83642e", fontFamily: "'Cormorant Garamond', serif" }}>Order Structure & Symbolism</h2>
            <Card className="border-0 shadow-sm" style={{ background: "#fcf8ec", borderRadius: "1rem" }}>
              <Card.Body>
                <ul style={{ fontSize: "1.12rem", lineHeight: 1.7, marginBottom: 0 }}>
                  <li>
                    <strong>Lodge:</strong> The basic organizational unit, each with its own rituals and traditions.
                  </li>
                  <li>
                    <strong>Degrees:</strong> Freemasonry is structured in symbolic steps or "degrees" (e.g., Entered Apprentice, Fellowcraft, Master Mason).
                  </li>
                  <li>
                    <strong>Symbols:</strong> Rich symbolism (like the square and compass) is used for personal development and reflection.
                  </li>
                  <li>
                    <strong>Meetings:</strong> Lodges hold regular meetings, often in ritual form, to promote learning, reflection, and fraternity.
                  </li>
                  <li>
                    <strong>Values:</strong> Freemasons strive for honesty, tolerance, charity, and the improvement of self and society.
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* FAQ */}
        <Row className="mb-5">
          <Col xs={12} md={10} lg={8} className="mx-auto">
            <h2 className="mb-4" style={{ color: "#83642e", fontFamily: "'Cormorant Garamond', serif" }}>FAQ for Interested Parties</h2>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Who can become a Freemason?</Accordion.Header>
                <Accordion.Body>
                  Any adult who believes in moral values, personal development, and is open to the ideas of tolerance and brotherhood can apply for membership.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Is Freemasonry a religion?</Accordion.Header>
                <Accordion.Body>
                  No. Freemasonry is not a religion, but many members have a personal belief in a higher principle. All religions, backgrounds, and worldviews are welcome.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Are lodge meetings secret?</Accordion.Header>
                <Accordion.Body>
                  Meetings are private and based on tradition, but not secret in the sense of being conspiratorial. The emphasis is on personal reflection, ritual, and community.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>How do I join?</Accordion.Header>
                <Accordion.Body>
                  Start by reaching out to a local lodge, attending public events, or speaking with a member. There is usually an introductory process before formal membership.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
