import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import { EnvelopeAt, LockFill, CheckCircleFill } from "react-bootstrap-icons";
import "./BecomeMember.css";
import React, { useEffect, useState } from "react";

export default function BecomeMember() {
  const [animate, setAnimate] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  // ✅ Handle form input
  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    try {
      const res = await fetch(`${API_URL}/public/api/contact-us`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setError("Unable to send message. Please check your connection or try again later.");
    }
  };

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  return (
    <section
      className="become-member-section py-5"
      style={{
        background: "linear-gradient(120deg,#f7f6f2 70%,#e5e0d9 100%)",
      }}
    >
      <Container>
        <div className="mb-4">
          <h2
            className={
              "display-5 fw-bold mb-3 become-header" +
              (animate ? " become-header-in" : "")
            }
            style={{ color: "#735d34", letterSpacing: ".02em" }}
          >
            Become a Member
          </h2>
          <p
            className={
              "lead become-para" + (animate ? " become-para-in" : "")
            }
            style={{ color: "#463820" }}
          >
            Are you interested in Freemasonry? Start your personal journey with us in a spirit of trust, respect, and genuine curiosity.
          </p>
        </div>

        <Row className="align-items-center flex-lg-row-reverse">
          <Col xs={12} lg={6} className="mb-4 mb-lg-0 text-center">
            <img
              src="/10.JPG"
              alt="Join Freemasonry"
              className="img-fluid rounded-4 shadow img-zoom"
              style={{ border: "2px solid #d7cdb4", background: "#fff" }}
            />
          </Col>

          <Col xs={12} lg={6}>
            <Row className="g-3">
              <Col xs={12} sm={6}>
                <Card className="h-100 shadow-sm border-0 creative-card">
                  <Card.Body>
                    <LockFill size={28} className="text-primary mb-2" />
                    <Card.Title className="fs-5 mb-2" style={{ color: "#694c1e" }}>
                      Confidentiality
                    </Card.Title>
                    <Card.Text style={{ fontSize: "1.06rem" }}>
                      All contacts and inquiries are treated with absolute discretion. Your privacy is always respected.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} sm={6}>
                <Card className="h-100 shadow-sm border-0 creative-card">
                  <Card.Body>
                    <CheckCircleFill size={28} className="text-success mb-2" />
                    <Card.Title className="fs-5 mb-2" style={{ color: "#694c1e" }}>
                      Requirements
                    </Card.Title>
                    <Card.Text style={{ fontSize: "1.06rem" }}>
                      • You are open-minded, respectful, and seeking personal growth.<br />
                      • You believe in ethical principles.<br />
                      • You are willing to get to know us over several conversations and open meetings.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12}>
                <Card className="h-100 shadow-sm border-0 creative-card">
                  <Card.Body>
                    <EnvelopeAt size={28} className="text-info mb-2" />
                    <Card.Title className="fs-5 mb-2" style={{ color: "#694c1e" }}>
                      Contact Process
                    </Card.Title>
                    <Card.Text style={{ fontSize: "1.07rem" }}>
                      Please write us a brief, informal email about yourself and your motivation.
                      <br />
                      We will reply personally and confidentially, usually within a few days.
                    </Card.Text>
                    <Button
                      variant="primary"
                      className="rounded-pill mt-2 px-4"
                      style={{ background: "#735d34", border: "none" }}
                      href="#contact-form"
                    >
                      Contact Us
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <div className="mt-4 text-muted small" style={{ color: "#756b5a" }}>
              <em>
                We look forward to your message and to meeting you in person.<br />
                <b>Your Freemasons Berlin</b>
              </em>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center mt-5" id="contact-form">
          <Col md={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <h2 className="fw-bold mb-4">Contact Us</h2>

                {submitted && <Alert variant="success">✅ Thank you for contacting us! Your message has been sent.</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    style={{ background: "#735d34", border: "none" }}
                  >
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
