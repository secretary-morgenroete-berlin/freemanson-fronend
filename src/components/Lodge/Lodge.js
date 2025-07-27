import React, { useState } from 'react';
import { Container, Row, Col, Card, Carousel, Button } from 'react-bootstrap';
import './Lodge.css';

const carouselImages = [
  "/4.jpg",
  "/2.jpg",
  "/3.jpg"
];

const lodgeSections = [
  {
    title: "History & Namesake",
    content: (
      <Row className="align-items-center gx-4">
        <Col xs={12} md={7} className="order-md-1 mb-3 mb-md-0">
          <p>Crown Prince Frederick William, later Frederick III, the “99-day Emperor”</p>
          <p>
            The German Emperor and King of Prussia from the House of Hohenzollern was born in Potsdam on October 18, 1831, and died there on June 15, 1888, of a throat condition. He was the son of Wilhelm I and married Victoria, Princess of Great Britain and Ireland.
          </p>
          <p>
            Crown Prince Friedrich Wilhelm was introduced to Freemasonry by his father in 1853 and admitted to the "Grand Provincial Lodge of Freemasons of Germany." He was also an honorary member of the "Grand National Mother Lodge – To the Three Globes" and the Grand Lodge of Prussia, known as "Royal York for Friendship." On June 18, 1860, he became Master of the Order of the Grand Provincial Lodge of Freemasons of Germany and, from 1861, assumed the protectorate of the three Grand Lodges in Berlin. At the same time, he became chairman of the Grand Masters' Association.
          </p>
          <p>The saying “Learn to suffer without complaining!” was popularly attributed to him.</p>
        </Col>
        <Col xs={12} md={5} className="order-md-2 text-center">
          <img
            src="/lodge-namesake1.jpg"
            alt="Friedrich Wilhelm"
            style={{
              width: "100%",
              maxWidth: 340,
              maxHeight: 640,
              marginBottom: 16,
              borderRadius: "10px",
              boxShadow: "0 2px 14px #bbb6",
              objectFit: "cover"
            }}
            className="img-fluid mb-3"
          />
          <img
            src="/lodge-namesake2.jpg"
            alt="Friedrich Wilhelm"
            style={{
              width: "100%",
              maxWidth: 340,
              maxHeight: 640,
              borderRadius: "10px",
              boxShadow: "0 2px 14px #bbb6",
              objectFit: "cover"
            }}
            className="img-fluid"
          />
        </Col>
      </Row>
    ),
  },
  {
    title: "Our Values",
    content: (
      <>
        <Row className="align-items-center gx-4 mb-4">
          <Col xs={12} md={6}>
            <p>
              Freemasonry is built on five core values: Freedom, Equality, Fraternity, Tolerance, and Humanitarianism. These ideals harken back to Enlightenment values and guide members to personal growth, solidarity, and responsibility toward society.
            </p>
          </Col>
          <Col xs={12} md={6} className="text-center">
            <img
              src="/values-lodge1.jpg"
              alt="Masonic Brotherhood"
              style={{
                width: "100%",
                maxWidth: 200,
                maxHeight: 640,
                borderRadius: "10px",
                boxShadow: "0 2px 14px #bbb6",
                objectFit: "cover"
              }}
              className="img-fluid"
            />
          </Col>
        </Row>
        <Row className="align-items-center gx-4 mb-4 flex-md-row-reverse">
          <Col xs={12} md={6}>
            <p>
              You will find inspiration, peace and relaxation in our St. Johannis Lodge because you can simply be yourself and therefore do not have to pretend. When the lodge doors close, one temporarily forgets what Freemasons call the "outside world." Here, ritual and brotherhood create a special atmosphere. Sometimes it seems as if time stands still.
            </p>
          </Col>
          <Col xs={12} md={6} className="text-center">
            <img
              src="/values-lodge2.jpg"
              alt="Lodge Ritual"
              style={{
                width: "100%",
                maxWidth: 200,
                maxHeight: 640,
                borderRadius: "10px",
                boxShadow: "0 2px 14px #bbb6",
                objectFit: "cover"
              }}
              className="img-fluid"
            />
          </Col>
        </Row>
        <Row className="align-items-center gx-4 mb-4">
          <Col xs={12} md={6}>
            <p>
              After completing a lodge's work, the brothers often gather for a fraternal get-together. This part of the lodge evening is just as important as the ritual part. Here, the experiences of the lodge are reflected upon and shared. Bonds often develop among brothers that, due to shared ideas and ideals, go far beyond normal friendships.
            </p>
          </Col>
          <Col xs={12} md={6} className="text-center">
            <img
              src="/values-lodge3.jpg"
              alt="Lodge Gathering"
              style={{
                width: "100%",
                maxWidth: 200,
                maxHeight: 640,
                borderRadius: "10px",
                boxShadow: "0 2px 14px #bbb6",
                objectFit: "cover"
              }}
              className="img-fluid"
            />
          </Col>
        </Row>
        <Row className="align-items-center gx-4">
          <Col xs={12} md={6}>
            <p>
              Membership in the Masonic Order opens new perspectives and often leads to a much more conscious and fulfilling life. These brothers, who came from diverse backgrounds, would probably never have met or even spoken to each other without Freemasonry. Through their shared experience of Freemasonry, they found each other and developed mutual understanding – across all boundaries! We are proud of this. Overcoming oneself and improving oneself somewhat is certainly one of the greatest experiences of success.
            </p>
          </Col>
          <Col xs={12} md={6} className="text-center">
            <img
              src="/values-lodge4.jpg"
              alt="Freemasonry Friendship"
              style={{
                width: "100%",
                maxWidth: 200,
                maxHeight: 640,
                borderRadius: "10px",
                boxShadow: "0 2px 14px #bbb6",
                objectFit: "cover"
              }}
              className="img-fluid"
            />
          </Col>
        </Row>
      </>
    ),
  },
  {
    title: "The Freemasons",
    content: (
      <Row>
        <Col xs={12}>
          <p>
            Freemasons see themselves as an ethical order of free individuals working to improve both themselves and society. Through symbolic rituals, they gather in Lodges and follow a strict principle of discretion. Membership transcends national and cultural boundaries, forming a brotherhood across millions globally.
          </p>
        </Col>
      </Row>
    ),
  },
  {
    title: "Freemasonry",
    content: (
      <Row>
        <Col xs={12}>
          <p>
            Modern Freemasonry officially began in London on June 14, 1717, when four lodges formed the first Grand Lodge. In 1723, James Anderson drafted the constitutions still foundational to freemasonry today. The movement flourished in Europe, especially Germany, where it emerged as a space of Enlightenment, moral discourse, and symbolic self‑development.
          </p>
        </Col>
      </Row>
    ),
  }
];

const CARD_TRANSITION_TIME = 700;

const Lodge = () => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(false);

  const handleNext = () => {
    if (current < lodgeSections.length - 1) {
      setFade(true);
      setTimeout(() => {
        setCurrent((prev) => prev + 1);
        setFade(false);
      }, CARD_TRANSITION_TIME);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setFade(true);
      setTimeout(() => {
        setCurrent((prev) => prev - 1);
        setFade(false);
      }, CARD_TRANSITION_TIME);
    }
  };

  const getCardStyle = (idx) => ({
    opacity: idx === current ? 1 : 0,
    pointerEvents: idx === current ? 'auto' : 'none',
    transform: idx === current
      ? "translateY(0px) scale(1)"
      : idx < current
        ? "translateY(-40px) scale(0.98)"
        : "translateY(40px) scale(0.98)",
    transition: `all ${CARD_TRANSITION_TIME}ms cubic-bezier(.77,0,.18,1)`,
    position: idx === current ? 'relative' : 'absolute',
    zIndex: idx === current ? 2 : 1,
    // width: "100%"
  });

  return (
    <div style={{ position: "relative", background: "#e2dcd0" }}>
      {/* Carousel Section */}
      <div style={{
        width: "100vw",
        height: "90vh",
        minHeight: 250,
        maxHeight: 680,
        overflow: "hidden",
        position: "relative",
        zIndex: 2
      }}>
        <Carousel fade controls indicators style={{ height: "100%" }}>
          {carouselImages.map((img, i) => (
            <Carousel.Item key={i} style={{ height: "90vh", minHeight: 250, maxHeight: 480 }}>
              <img
                src={img}
                alt={`Slide ${i + 1}`}
                style={{
                  width: "100vw",
                  height: "90vh",
                  minHeight: 250,
                  maxHeight: 680,
                  objectFit: "cover",
                  objectPosition: "center"
                }}
                className="img-fluid"
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <div style={{
          position: "absolute",
          bottom: "2.2rem",
          left: 0,
          width: "100%",
          zIndex: 3,
          textAlign: "center",
          color: "#fff",
          textShadow: "0 2px 14px #40311b99",
          fontSize: "2.2rem",
          fontFamily: "'Cormorant Garamond', serif",
          letterSpacing: "0.04em",
        }}>
          The Lodge
        </div>
      </div>

      {/* Lodge Cards Section */}
      <Container
        className="pt-5 pb-2 position-relative lodge-card-container"
        style={{
            marginTop: "-6vh",
            marginBottom: "0",
            zIndex: 2
        }}
      >
        <div style={{ position: "relative", minHeight: 220, marginBottom: 0 }}>
        {lodgeSections.map((section, idx) =>
            idx === current ? (
            <Row
                className="justify-content-center"
                key={idx}
                style={getCardStyle(idx)}
            >
                <Col xs={12} md={10} lg={9} xl={8}>
                <Card
                    className="border-0 shadow-lg my-4 lodge-cards"
                    style={{
                    background: "rgba(255,255,240,0.98)",
                    borderRadius: "1rem",
                    border: "1.5px solid #e7dbc5",
                    boxShadow: "0 4px 28px 0 #998f7b30",
                    padding: "2.2rem 2.4rem",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.05rem",
                    minHeight: 220,
                    transition: 'background 0.5s'
                    }}
                >
                    <Card.Body>
                    <Card.Title className="mb-3" style={{ fontSize: "1.6rem", color: "#735d34", letterSpacing: "0.02em" }}>
                        {section.title}
                    </Card.Title>
                    <div style={{ color: "#40311b", fontWeight: 500 }}>{section.content}</div>
                    </Card.Body>
                    <div className="d-flex justify-content-between mt-3">
                    <Button
                        variant="outline-primary"
                        onClick={handlePrev}
                        disabled={current === 0}
                        style={{ minWidth: 90, opacity: current === 0 ? 0.4 : 1 }}
                    >
                        &#8592; Previous
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleNext}
                        disabled={current === lodgeSections.length - 1}
                        style={{ minWidth: 90, opacity: current === lodgeSections.length - 1 ? 0.4 : 1 }}
                    >
                        Next &#8594;
                    </Button>
                    </div>
                </Card>
                </Col>
            </Row>
            ) : null
                )}
        </div>

      </Container>
    </div>
  );
};

export default Lodge;
