import React, { useRef } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion, useInView } from "framer-motion";

const paperBg = "https://www.transparenttextures.com/patterns/old-mathematics.png";

const lines = [
  `Welcome to our website. Perhaps you've come to our site to gather information or learn something about the "myth" of Freemasonry.`,
  "Please take a look around and get to know us better.",
  'We are a daughter lodge of the “Grand Provincial Lodge of Freemasons of Germany / Freemasonry Order”.',
  "The headquarters is in the Order House (photo) at Peter-Lenné-Straße 1-3, 14195 Berlin.",
  "We would be delighted to welcome you to a guest evening or a personal meeting. Here you can learn more about us, our lodge, and the Freemasons. Simply use the contact form.",
];

const wordVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.44,
      ease: "easeOut"
    }
  }),
};

function AnimatedLine({ text, delay = 0, inView }) {
  const words = text.split(" ");
  return (
    <div style={{ display: "block", marginBottom: "1.05rem", minHeight: 36 }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={wordVariants}
          style={{
            display: "inline-block",
            marginRight: word.endsWith(".") || word.endsWith(",") ? 7 : 8,
            fontFamily: "'Cormorant Garamond', serif",
            color: "#3e2810",
            fontWeight: 500,
            fontSize: "1.23rem",
            lineHeight: "2.0",
            letterSpacing: "0.02em",
          }}
          transition={{
            delay: delay + i * 0.1,
            duration: 0.39,
            ease: "easeOut",
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

const HomeMessage = () => {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: "-70px" });

  return (
    <div
      style={{
        background: `#e2dcd0`,
        minHeight: "100vh",
        padding: "70px 0 100px 0",
        fontFamily: "'Cormorant Garamond', serif",
        zIndex: "1000"
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>

            {/* Envelope flap (SVG triangle) */}
            {/* <div style={{ width: "100%", height: 0, position: "relative", marginBottom: "-10px" }}>
              <svg width="100%" height="54" viewBox="0 0 800 54" style={{ display: "block" }}>
                <polygon points="0,0 800,0 400,54"
                  style={{
                    fill: "#e6dcc0",
                    filter: "drop-shadow(0 7px 10px #cabfa580)",
                    opacity: 0.96,
                  }} />
                <polygon points="0,0 800,0 400,46"
                  style={{
                    fill: "#f7f2dd",
                    opacity: 0.5
                  }} />
              </svg>
            </div> */}

            <motion.div
              initial={{ opacity: 0, y: 70 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              ref={cardRef}
              style={{ position: "relative" }}
            >
              {/* Paper Letter */}
              <Card
                id="letter"
                className="shadow border-0"
                style={{
                  background: "repeating-linear-gradient( #f6f0db 20px), url(" + paperBg + ")",
                  // borderRadius: "0 0 0px 0px/0 0 0px 0px !important",
                  border: "2.5px solid #e5dbba",
                  borderTop: "none",
                  boxShadow: "0 7px 38px 0 #ad977e28, 0 8px 16px #c7b18522",
                  padding: "2.6rem 2.5rem 2.3rem 2.5rem",
                  marginBottom: 24,
                  minHeight: 470,
                  position: "relative",
                  overflow: "visible"
                }}
              >
                {/* Letterhead */}
                <div
                  style={{
                    fontFamily: "'Great Vibes', 'Parisienne', cursive",
                    fontSize: "2.45rem",
                    color: "#80512b",
                    marginBottom: "1.3rem",
                    textAlign: "center",
                    letterSpacing: "0.07em",
                    textShadow: "0 2px 4px #e3cfa18a, 0 1px 0 #fff9e2",
                  }}
                >
                  Welcome!
                </div>
                <div style={{ whiteSpace: "pre-line", color: "#3e2810", fontWeight: 500, marginBottom: "1.3rem" }}>
                  {lines.map((line, i) => (
                    <AnimatedLine text={line} delay={i * 1.25} inView={inView} key={i} />
                  ))}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: lines.length * 1.14 + 0.7, duration: 1.1 }}
                    style={{
                      fontFamily: "'Great Vibes', 'Parisienne', cursive",
                      fontSize: "1.65rem",
                      color: "#795548",
                      fontWeight: 600,
                      display: "block",
                      marginTop: "2.1rem"
                    }}
                  >
                    Best regards!
                    <br />
                    <span style={{
                      fontFamily: "'Great Vibes', 'Parisienne', cursive",
                      fontSize: "2.13rem",
                      color: "#8b5a2b",
                      display: "block",
                      marginTop: "0.5rem"
                    }}>
                      The Chairman Master
                    </span>
                  </motion.div>
                </div>
                {/* Torn Paper SVG edge */}
                <svg
                  width="100%"
                  height="28"
                  viewBox="0 0 800 28"
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: -22,
                    zIndex: 2,
                  }}
                >
                  <path
                    d="M0 6 Q100 22 200 10 Q300 -4 400 14 Q500 30 600 16 Q700 5 800 20 V28 H0 Z"
                    fill="#ede3c7"
                    stroke="#e5dbba"
                    strokeWidth="2"
                  />
                </svg>
                {/* Wax Seal */}
                {/* <div
                  style={{
                    position: "absolute",
                    right: 38,
                    bottom: -36,
                    width: 55,
                    height: 55,
                    borderRadius: "50%",
                    background: "radial-gradient(circle at 60% 38%, #c39e68 65%, #91672c 100%)",
                    border: "2px solid #ad8535",
                    boxShadow: "0 2px 10px #a07a3a80",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 3,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.1rem",
                    color: "#fffbe8",
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    textShadow: "0 2px 5px #8b6b2a60"
                  }}
                >
                  <span style={{ fontSize: 22, fontFamily: "'Great Vibes', cursive", color: "#fffbe0" }}>
                    ✦
                  </span>
                </div> */}
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeMessage;
