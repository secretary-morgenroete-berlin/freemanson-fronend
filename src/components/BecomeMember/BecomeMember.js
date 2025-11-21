import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import { EnvelopeAt, LockFill, CheckCircleFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import "./BecomeMember.css";

export default function BecomeMember() {
  const API_URL = process.env.REACT_APP_API_URL;
  const user = useSelector((state) => state.auth?.user);
  const isAdmin = user?.role === "admin";

  const [data, setData] = useState({
    header: "Become a Member",
    intro: "Are you interested in Freemasonry? Start your personal journey with us in a spirit of trust, respect, and genuine curiosity.",
    cards: [
      {
        title: "Confidentiality",
        text: "All contacts and inquiries are treated with absolute discretion. Your privacy is always respected.",
      },
      {
        title: "Requirements",
        text: "• You are open-minded, respectful, and seeking personal growth.\n• You believe in ethical principles.\n• You are willing to get to know us over several conversations and open meetings.",
      },
      {
        title: "Contact Process",
        text: "Please write us a brief, informal email about yourself and your motivation. We will reply personally and confidentially, usually within a few days.",
      },
    ],
    footer: "We look forward to your message and to meeting you in person.\nYour Freemasons Berlin",
  });

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Fetch content
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`${API_URL}/public/api/become-member/get`);
        const json = await res.json();
        if (json.success && json.data) setData(json.data);
      } catch (err) {
        console.log("⚠️ Using default Become Member data (fetch failed)");
      }
    };
    fetchContent();
  }, [API_URL]);

  // Save updates
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/public/api/become-member/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        alert("✅ Become Member page updated!");
        setEditMode(false);
      } else alert("❌ Update failed.");
    } catch (err) {
      console.error("Error saving:", err);
    }
  };

  // Contact form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_URL}/public/api/contact-us`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        const data = await res.json();
        setError(data.error || "Submission failed.");
      }
    } catch {
      setError("Network error. Please try again later.");
    }
  };

  return (
    <section
      className="become-member-section py-5"
      style={{
        background: "linear-gradient(120deg,#f7f6f2 70%,#e5e0d9 100%)",
        color: "#463820",
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      {/* Admin Edit Controls */}
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

      <Container>
        {/* Header */}
        <div className="mb-4 text-center">
          {editMode ? (
            <Form.Control
              type="text"
              value={data.header}
              onChange={(e) => setData({ ...data, header: e.target.value })}
              className="fw-bold text-center"
              style={{ fontSize: "2rem" }}
            />
          ) : (
            <h2 className="display-5 fw-bold mb-3">{data.header}</h2>
          )}

          {editMode ? (
            <Form.Control
              as="textarea"
              rows={2}
              value={data.intro}
              onChange={(e) => setData({ ...data, intro: e.target.value })}
              className="mb-3 text-center"
            />
          ) : (
            <p className="lead">{data.intro}</p>
          )}
        </div>

        {/* Info Cards */}
        <Row className="align-items-center flex-lg-row-reverse">
          <Col xs={12} lg={6} className="mb-4 mb-lg-0 text-center">
            <img
              src="/10.JPG"
              alt="Join Freemasonry"
              className="img-fluid rounded-4 shadow"
              style={{ border: "2px solid #d7cdb4", background: "#fff" }}
            />
          </Col>

          <Col xs={12} lg={6}>
            <Row className="g-3">
              {data.cards.map((card, idx) => (
                <Col xs={12} sm={6} key={idx}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Body>
                      {idx === 0 && <LockFill size={28} className="text-primary mb-2" />}
                      {idx === 1 && <CheckCircleFill size={28} className="text-success mb-2" />}
                      {idx === 2 && <EnvelopeAt size={28} className="text-info mb-2" />}

                      {editMode ? (
                        <>
                          <Form.Control
                            type="text"
                            value={card.title}
                            onChange={(e) => {
                              const updated = [...data.cards];
                              updated[idx].title = e.target.value;
                              setData({ ...data, cards: updated });
                            }}
                            className="fw-bold mb-2"
                          />
                          <Form.Control
                            as="textarea"
                            rows={4}
                            value={card.text}
                            onChange={(e) => {
                              const updated = [...data.cards];
                              updated[idx].text = e.target.value;
                              setData({ ...data, cards: updated });
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <Card.Title className="fs-5 mb-2">{card.title}</Card.Title>
                          <Card.Text style={{ whiteSpace: "pre-wrap" }}>{card.text}</Card.Text>
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Footer Text */}
            <div className="mt-4 small text-muted">
              {editMode ? (
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={data.footer}
                  onChange={(e) => setData({ ...data, footer: e.target.value })}
                />
              ) : (
                <em style={{ whiteSpace: "pre-wrap" }}>{data.footer}</em>
              )}
            </div>
          </Col>
        </Row>

        {/* Contact Form */}
        <Row className="justify-content-center mt-5" id="contact-form">
          <Col md={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <h2 className="fw-bold mb-4">Contact Us</h2>
                {submitted && <Alert variant="success">✅ Thank you for contacting us!</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" name="message" rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </Form.Group>

                  <Button type="submit" variant="primary" style={{ background: "#735d34", border: "none" }}>
                    Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
