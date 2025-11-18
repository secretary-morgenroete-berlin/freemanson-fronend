import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, useInView } from "framer-motion";
import "./Home.css";

const API_URL = process.env.REACT_APP_API_URL;

// Default homepage data (used ONLY if API returns empty)
const defaultData = {
  heroMedia: [
    { type: "image", src: "/bg1.jpg" },
    { type: "image", src: "/2.JPG" },
    { type: "image", src: "/5.JPG" },
  ],
  heroSections: [
    {
      title: "Welcome to Freemasonry Berlin",
      text: "Freemasonry stands for the values of humanity, tolerance, freedom and fraternity.",
    },
    {
      title: "A Path of Tradition and Progress",
      text: "Discover a community where tradition meets modern thinking.",
    },
    {
      title: "Find Out More & Get Involved",
      text: "Are you interested in our philosophy?",
    },
    {
      title: "At Dawn – Knowledge in the Light",
      text: "Our ancient motto: Let your journey start with wisdom, fraternity, and illumination.",
    },
  ],
  ctaSection: {
    title: "Get to know the lodge",
    subtitle: "Curious about our traditions, activities?",
    buttons: [
      { text: "Learn About the Lodge", link: "/about", variant: "primary" },
      { text: "Interested in Membership?", link: "/become-member", variant: "outline-dark" },
    ],
  },
  missionCards: [
    {
      title: "Our Mission",
      text: "Freemasonry promotes values of self-improvement and responsibility.",
    },
    {
      title: "Who We Are",
      text: "Our lodge in Berlin is part of an international network.",
    },
    {
      title: "Join Us",
      text: "Are you interested in joining Freemasonry?",
      button: { text: "Contact", link: "/become-member", variant: "primary" },
    },
  ],
  welcomeLetter: {
    title: "Welcome!",
    lines: [
      `Welcome to our website. Perhaps you've come to gather information about the "myth" of Freemasonry.`,
      "Please take a look around and get to know us better.",
      'We are a daughter lodge of the “Grand Provincial Lodge of Freemasons of Germany / Freemasonry Order”.',
      "The headquarters is in the Order House at Peter-Lenné-Straße 1-3, Berlin.",
      "We would be delighted to welcome you to a guest evening or a personal meeting.",
    ],
    signature: "The Chairman Master",
  },
};

const paperBg = "https://www.transparenttextures.com/patterns/old-mathematics.png";

const wordVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.44, ease: "easeOut" },
  }),
};

// Animated line
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
            marginRight: 8,
            fontFamily: "'Cormorant Garamond', serif",
            color: "#3e2810",
            fontWeight: 500,
            fontSize: "1.23rem",
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

// Welcome Letter Component
const HomeMessage = ({ data, editMode, setData }) => {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: "-70px" });

  const handleLineChange = (index, value) => {
    const updatedLines = [...data.welcomeLetter.lines];
    updatedLines[index] = value;
    setData({
      ...data,
      welcomeLetter: { ...data.welcomeLetter, lines: updatedLines },
    });
  };

  return (
    <div
      style={{
        background: `#e2dcd0`,
        minHeight: "100vh",
        padding: "70px 0 100px 0",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            {editMode ? (
              /** 🔹 EDIT MODE – No animation, No fadeout */
              <Card
                className="shadow border-0"
                style={{
                  background: "repeating-linear-gradient(#f6f0db 20px), url(" + paperBg + ")",
                  border: "2.5px solid #e5dbba",
                  padding: "2.6rem",
                }}
              >
                <input
                  type="text"
                  value={data.welcomeLetter.title}
                  onChange={(e) =>
                    setData({
                      ...data,
                      welcomeLetter: { ...data.welcomeLetter, title: e.target.value },
                    })
                  }
                  style={{ width: "100%", fontSize: "2.45rem", textAlign: "center" }}
                />

                {data.welcomeLetter.lines.map((line, i) => (
                  <textarea
                    key={i}
                    value={line}
                    onChange={(e) => handleLineChange(i, e.target.value)}
                    style={{ width: "100%", marginBottom: "0.7rem", fontSize: "1.2rem" }}
                  />
                ))}

                <input
                  type="text"
                  value={data.welcomeLetter.signature}
                  onChange={(e) =>
                    setData({
                      ...data,
                      welcomeLetter: { ...data.welcomeLetter, signature: e.target.value },
                    })
                  }
                  style={{ width: "100%", fontSize: "2.13rem", marginTop: "1.5rem" }}
                />
              </Card>
            ) : (
              /** 🔹 NORMAL MODE – With animation */
              <motion.div
                initial={{ opacity: 0, y: 70 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.1 }}
                ref={cardRef}
              >
                <Card
                  className="shadow border-0"
                  style={{
                    background: "repeating-linear-gradient(#f6f0db 20px), url(" + paperBg + ")",
                    border: "2.5px solid #e5dbba",
                    padding: "2.6rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Great Vibes', cursive",
                      fontSize: "2.45rem",
                      textAlign: "center",
                      marginBottom: "1.3rem",
                    }}
                  >
                    {data.welcomeLetter.title}
                  </div>

                  {data.welcomeLetter.lines.map((line, i) => (
                    <AnimatedLine key={i} text={line} delay={i * 1.2} inView={inView} />
                  ))}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: data.welcomeLetter.lines.length * 1.1 }}
                    style={{
                      fontFamily: "'Great Vibes', cursive",
                      fontSize: "2rem",
                      marginTop: "2rem",
                    }}
                  >
                    Best regards!
                    <br />
                    {data.welcomeLetter.signature}
                  </motion.div>
                </Card>
              </motion.div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// MAIN PAGE
const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === "admin";

  const [data, setData] = useState(defaultData);
  const [editMode, setEditMode] = useState(false);
  const [section, setSection] = useState(0);

  /** -------------------------------
   * 🔥 Load homepage from API on mount
   ---------------------------------*/
  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        const res = await fetch(`${API_URL}/public/api/homepage/get`);
        const json = await res.json();

        if (json.success && json.data) {
          setData(json.data);
        }
      } catch (err) {
        console.log("Failed loading homepage, using default");
      }
    };

    fetchHomepage();
  }, []);

  /** -------------------------------
   * 🔥 Auto-transition hero section
   ---------------------------------*/
  useEffect(() => {
    if (editMode) return;
    const t = setInterval(() => {
      setSection((s) => (s + 1) % data.heroSections.length);
    }, 7000);
    return () => clearInterval(t);
  }, [editMode, data.heroSections.length]);

  /** -------------------------------
   * 🔥 SAVE to backend
   ---------------------------------*/
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${API_URL}/public/api/homepage/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      setEditMode(false);
      alert("Homepage updated!");
    } catch (e) {
      alert("Error saving changes");
    }
  };

  const handleCancel = () => {
    window.location.reload(); // reload from API
  };

  /** -----------------------------------
   * HERO IMAGE Handler
   ------------------------------------*/
  const currentMedia = data.heroMedia[section % data.heroMedia.length];

  const handleHeroImageChange = (index, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const imgs = [...data.heroMedia];
      imgs[index].src = reader.result;
      setData({ ...data, heroMedia: imgs });
    };
    reader.readAsDataURL(file);
  };

  /** -----------------------------------
   * Draggable Edit Button
   ------------------------------------*/
  const btnRef = useRef(null);
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [btnPos, setBtnPos] = useState({ top: 20, right: 20 });

  const onMouseDown = (e) => {
    dragging.current = true;
    const rect = btnRef.current.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };
  const onMouseMove = (e) => {
    if (!dragging.current) return;
    const newLeft = e.clientX - dragOffset.current.x;
    const newTop = e.clientY - dragOffset.current.y;
    setBtnPos({ top: newTop, right: window.innerWidth - newLeft - 160 });
  };
  const onMouseUp = () => (dragging.current = false);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div>
      {/* Admin Floating Button */}
      {isAdmin && (
        <div
          ref={btnRef}
          onMouseDown={onMouseDown}
          style={{
            position: "fixed",
            top: btnPos.top,
            right: btnPos.right,
            zIndex: 9999,
            cursor: "grab",
          }}
        >
          {!editMode ? (
            <Button variant="warning" onClick={() => setEditMode(true)}>
              ✏️ Edit Homepage
            </Button>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <Button variant="success" onClick={handleSave}>
                💾 Save
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      )}

      {/* HERO SECTION */}
      <div
        className="d-flex align-items-center justify-content-center text-light"
        style={{ minHeight: "85vh", position: "relative", overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(rgba(35,35,35,0.7), rgba(35,35,35,0.7)), url('${currentMedia.src}') center/cover`,
            transition: "background-image 0.6s",
          }}
        />

        <Container style={{ position: "relative", zIndex: 2 }}>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h1
                contentEditable={editMode}
                suppressContentEditableWarning
                onInput={(e) => {
                  const copy = [...data.heroSections];
                  copy[section].title = e.target.innerText;
                  setData({ ...data, heroSections: copy });
                }}
              >
                {data.heroSections[section].title}
              </h1>

              <p
                contentEditable={editMode}
                suppressContentEditableWarning
                onInput={(e) => {
                  const copy = [...data.heroSections];
                  copy[section].text = e.target.innerText;
                  setData({ ...data, heroSections: copy });
                }}
              >
                {data.heroSections[section].text}
              </p>

              {!editMode && (
                <Button variant="outline-light" as={Link} to="/about">
                  Learn More
                </Button>
              )}
            </Col>
          </Row>
        </Container>

        {false  && (
          <div
            style={{
              position: "absolute",
              right: 20,
              top: 20,
              zIndex: 20,
              background: "rgba(0,0,0,0.5)",
              padding: 10,
              borderRadius: 6,
            }}
          >
            <Form.Group>
              <Form.Label className="text-white">Change Hero Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => handleHeroImageChange(section, e.target.files[0])}
              />
            </Form.Group>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <Container className="py-4 text-center">
        <h3
          contentEditable={editMode}
          suppressContentEditableWarning
          onInput={(e) =>
            setData({
              ...data,
              ctaSection: { ...data.ctaSection, title: e.target.innerText },
            })
          }
        >
          {data.ctaSection.title}
        </h3>

        <p
          contentEditable={editMode}
          suppressContentEditableWarning
          onInput={(e) =>
            setData({
              ...data,
              ctaSection: { ...data.ctaSection, subtitle: e.target.innerText },
            })
          }
        >
          {data.ctaSection.subtitle}
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          {data.ctaSection.buttons.map((btn, i) => (
            <Button
              key={i}
              as={Link}
              to={btn.link}
              variant={btn.variant}
              size="lg"
              contentEditable={editMode}
              suppressContentEditableWarning
              onInput={(e) => {
                const copy = [...data.ctaSection.buttons];
                copy[i].text = e.target.innerText;
                setData({
                  ...data,
                  ctaSection: { ...data.ctaSection, buttons: copy },
                });
              }}
            >
              {btn.text}
            </Button>
          ))}
        </div>
      </Container>

      {/* Welcome Letter */}
      <HomeMessage data={data} editMode={editMode} setData={setData} />

      {/* Mission Cards */}
      <Container className="py-5">
        <Row>
          {data.missionCards.map((card, i) => (
            <Col md={4} className="mb-4" key={i}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <Card.Title
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    onInput={(e) => {
                      const copy = [...data.missionCards];
                      copy[i].title = e.target.innerText;
                      setData({ ...data, missionCards: copy });
                    }}
                  >
                    {card.title}
                  </Card.Title>

                  <Card.Text
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    onInput={(e) => {
                      const copy = [...data.missionCards];
                      copy[i].text = e.target.innerText;
                      setData({ ...data, missionCards: copy });
                    }}
                  >
                    {card.text}
                  </Card.Text>

                  {card.button && (
                    <Button
                      as={Link}
                      to={card.button.link}
                      variant={card.button.variant}
                      contentEditable={editMode}
                      suppressContentEditableWarning
                      onInput={(e) => {
                        const copy = [...data.missionCards];
                        copy[i].button.text = e.target.innerText;
                        setData({ ...data, missionCards: copy });
                      }}
                    >
                      {card.button.text}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
