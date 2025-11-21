import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./About.css";

const API_URL = process.env.REACT_APP_API_URL || "";

const defaultData = {
  pageTitle: "About Freemasonry Berlin",
  introParagraphs: [
    "Freemasonry is a centuries-old tradition that brings together people who seek personal development, ethical values, and a cosmopolitan worldview.",
    "Our Berlin lodge is a meeting place for open-minded individuals. We encourage reflection, honest dialogue, and mutual support, respecting the beliefs and background of each member.",
  ],
  cards: [
    {
      title: "What Is Freemasonry?",
      text: "Freemasonry is not a religion or a political group. It is a brotherhood based on the ideals of humanity, tolerance, freedom, and equality. Through rituals, symbolism, and charitable activities, members strive to become better individuals.",
      image: "/what_is_freemansory2.jpg",
    },
    {
      title: "Our Activities",
      text: "In our lodge, we regularly hold discussions, lectures, and social events. We are committed to supporting the local community and nurturing a spirit of friendship and learning.",
      image: "/values-lodge1.jpg",
    },
    {
      title: "Der Orden (The Order)",
      text: `The Große Landesloge der Freimaurer von Deutschland – Freimaurerorden (GLL / GLLFvD) is based in Berlin and was founded on December 27, 1770.

The Order operates according to the Swedish System. Through a solemn and unbreakable vow, members commit to a community of “apparently unequal but inwardly like-minded men” who stand by each other in all circumstances. The Order is seen as a rock in the storm — a fortress where strength can be drawn.

This system is rooted in Christian teachings: the Order emphasizes Christian knightly values, honouring God, self-improvement, brotherly love, and promoting the dignity and well-being of humanity. It is structured into 10 levels of insight (Erkenntnisstufen), which are explained symbolically. The rites are full of symbolic representations.

Importantly, the Order does not impose dogma: brothers interpret the symbols and rituals for themselves. Faith is a personal matter — the spiritual foundation is the pure teaching of Jesus Christ and the Christian values connected to it, but this is not aligned with Vatican doctrine. The Order rejects unreflective dogma. Each brother is invited to question, reflect, and come to his own understanding. Deep reflection on profound questions is strongly encouraged.`,
      image: "/values-lodge2.jpg",
    },
  ],
};

export default function AboutPage() {
  const user = useSelector((state) => state.auth?.user);
  const isAdmin = user?.role === "admin";

  const [data, setData] = useState(defaultData);
  const [editMode, setEditMode] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/public/api/about/get`);
        const json = await res.json();
        if (json.success && json.data) setData(json.data);
      } catch (err) {
        console.log("⚠️ Using default About data (fetch failed)");
      }
    };
    fetchData();
  }, []);

  // Handle edits
  const handleTitleChange = (e) => setData({ ...data, pageTitle: e.target.value });
  const handleParagraphChange = (i, val) => {
    const updated = [...data.introParagraphs];
    updated[i] = val;
    setData({ ...data, introParagraphs: updated });
  };
  const handleCardChange = (i, key, val) => {
    const updatedCards = [...data.cards];
    updatedCards[i][key] = val;
    setData({ ...data, cards: updatedCards });
  };

  // Save updates
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/public/api/about/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        alert("✅ About page updated!");
        setEditMode(false);
      } else {
        alert("❌ Update failed");
      }
    } catch (err) {
      console.error("Error saving:", err);
      alert("Error saving changes");
    }
  };

  return (
    <div
      style={{
        background: "#e8e2d1",
        fontFamily: "'Cormorant Garamond', serif",
        color: "#3e2f14",
      }}
    >
      {/* Admin floating button */}
      {isAdmin && (
        <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}>
          {!editMode ? (
            <Button variant="warning" onClick={() => setEditMode(true)}>
              ✏️ Edit Page
            </Button>
          ) : (
            <div style={{ display: "flex", gap: 10 }}>
              <Button variant="success" onClick={handleSave}>
                💾 Save
              </Button>
              <Button variant="secondary" onClick={() => window.location.reload()}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <Container className="py-5 text-center">
        {editMode ? (
          <Form.Control
            type="text"
            value={data.pageTitle}
            onChange={handleTitleChange}
            className="fw-bold text-center"
            style={{ fontSize: "2rem" }}
          />
        ) : (
          <h1 className="fw-bold display-5 mb-4 fade-in">{data.pageTitle}</h1>
        )}
      </Container>

      {/* Intro Paragraphs */}
      <Container className="pb-4">
        <Row className="justify-content-center">
          <Col md={8}>
            {data.introParagraphs.map((para, i) =>
              editMode ? (
                <Form.Control
                  as="textarea"
                  key={i}
                  rows={3}
                  value={para}
                  onChange={(e) => handleParagraphChange(i, e.target.value)}
                  className="mb-3"
                />
              ) : (
                <p key={i} className="lead fade-in" style={{ lineHeight: 1.7 }}>
                  {para}
                </p>
              )
            )}
          </Col>
        </Row>
      </Container>

      {/* Cards */}
      <Container className="py-5">
        <Row>
          {data.cards.map((card, i) => (
            <Col md={6} lg={4} key={i} className="mb-4">
              <Card
                className="shadow-sm border-0 h-100"
                style={{
                  background: "rgba(255,255,240,0.96)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 18px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s",
                }}
              >
                <Card.Img
                  variant="top"
                  src={card.image}
                  style={{
                    height: "220px",
                    objectFit: "cover",
                    borderBottom: "1px solid #d2c5a5",
                  }}
                />
                <Card.Body>
                  {editMode ? (
                    <>
                      <Form.Control
                        type="text"
                        value={card.title}
                        onChange={(e) => handleCardChange(i, "title", e.target.value)}
                        className="mb-2 fw-bold"
                      />
                      <Form.Control
                        as="textarea"
                        rows={6}
                        value={card.text}
                        onChange={(e) => handleCardChange(i, "text", e.target.value)}
                        style={{ fontSize: "1rem" }}
                      />
                    </>
                  ) : (
                    <>
                      <Card.Title
                        style={{
                          color: "#704d1a",
                          fontWeight: 600,
                          fontSize: "1.4rem",
                          marginBottom: "0.8rem",
                        }}
                      >
                        {card.title}
                      </Card.Title>
                      <Card.Text
                        style={{
                          whiteSpace: "pre-wrap",
                          lineHeight: 1.6,
                          fontSize: "1.05rem",
                        }}
                      >
                        {card.text}
                      </Card.Text>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
