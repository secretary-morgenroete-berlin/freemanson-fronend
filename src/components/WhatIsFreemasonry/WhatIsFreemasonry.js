// WhatIsFreemasonry.jsx
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Accordion, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./WhatIsFreemasonry.css"; // keep your existing css
// Note: images are fixed (not editable)
const API_URL = process.env.REACT_APP_API_URL || ""; 

// replaced first image with uploaded local file path (developer note)
const defaultData = {
  pageTitle: "What is Freemasonry?",
  introCard: {
    text:
      "<strong>Freemasonry</strong>, also known as the Royal Art, sees itself as an ethical association of free men with the conviction that constant improvement leads to more humane behavior. Freemasons are committed to secrecy and, in particular, to the principle of not revealing Masonic customs and lodge matters to the outside world. This is referred to as the duty of secrecy, also known as the secret discipline. This also facilitates the internal exchange of ideas and opinions.",
    image: "/bg2.jpg", // developer-supplied local path
    imageAlt: "Freemasonry Symbolism",
  },
  brotherhoodCard: {
    text:
      "The members call each other <strong>brothers</strong>. The spiritual idea of brotherhood connects people of all races and nationalities into a global brotherhood. There are well over six million Freemasons throughout the world who, with brotherly love and commitment, work on themselves and on the fraternal, liberal, and international ideal of Freemasonry.",
    image: "/what_is_freemansory2.jpg",
    imageAlt: "Freemasonry Brotherhood",
  },
  wayOfLife: {
    paragraphs: [
      `Freemasonry is a way of life. It is a direction for the righteous life. However, the goal cannot be achieved in a week, a month, or a year. True to the motto: <strong>"The path is the destination."</strong> The teachings of Freemasonry are so comprehensive and appeal so strongly to the individual that they will ponder them for a lifetime. People also become Freemasons because they want to believe, but cannot believe everything. A Freemason does not strive for complete knowledge, but rather to become essential, in the truest sense of the word.`,
    ],
    italicNote:
      "The history of Freemasonry reaches far back, but its message is timeless. The principles and values of the Freemasons are still relevant today and invite everyone to get involved.",
  },
  orderStructure: [
    { title: "Lodge:", text: "The basic organizational unit, each with its own rituals and traditions." },
    { title: "Degrees:", text: 'Freemasonry is structured in symbolic steps or "degrees" (e.g., Entered Apprentice, Fellowcraft, Master Mason).' },
    { title: "Symbols:", text: "Rich symbolism (like the square and compass) is used for personal development and reflection." },
    { title: "Meetings:", text: "Lodges hold regular meetings, often in ritual form, to promote learning, reflection, and fraternity." },
    { title: "Values:", text: "Freemasons strive for honesty, tolerance, charity, and the improvement of self and society." },
  ],
  faq: [
    { q: "Who can become a Freemason?", a: "Any adult who believes in moral values, personal development, and is open to the ideas of tolerance and brotherhood can apply for membership." },
    { q: "Is Freemasonry a religion?", a: "No. Freemasonry is not a religion, but many members have a personal belief in a higher principle. All religions, backgrounds, and worldviews are welcome." },
    { q: "Are lodge meetings secret?", a: "Meetings are private and based on tradition, but not secret in the sense of being conspiratorial. The emphasis is on personal reflection, ritual, and community." },
    { q: "How do I join?", a: "Start by reaching out to a local lodge, attending public events, or speaking with a member. There is usually an introductory process before formal membership." },
  ],
};

export default function WhatIsFreemasonryEditable() {
  const user = useSelector((state) => state.auth?.user);
  const isAdmin = user?.role === "admin";

  const [data, setData] = useState(defaultData);
  const [editMode, setEditMode] = useState(false);
  const btnRef = useRef(null);
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [btnPos, setBtnPos] = useState({ top: 20, right: 20 });

  // fetch content from API on mount (if API provides content)
  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`${API_URL}/public/api/what-is-freemasonry/get`);
        const json = await res.json();
        if (json.success && json.data) {
          // merge fallback for images (images remain fixed if not provided)
          const merged = { ...defaultData, ...json.data };
          setData(merged);
        }
      } catch (err) {
        // keep defaultData if fetch fails
        console.log("Failed to load WhatIsFreemasonry content, using defaults.");
      }
    };
    fetchPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // draggable admin button handlers (same pattern as Home)
  const onMouseDown = (e) => {
    if (!btnRef.current) return;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Generic handlers to update nested pieces
  const setPageTitle = (val) => setData((d) => ({ ...d, pageTitle: val }));
  const setIntroText = (val) => setData((d) => ({ ...d, introCard: { ...d.introCard, text: val } }));
  const setBrotherhoodText = (val) => setData((d) => ({ ...d, brotherhoodCard: { ...d.brotherhoodCard, text: val } }));
  const setWayParagraph = (idx, val) =>
    setData((d) => {
      const copy = { ...d };
      copy.wayOfLife = { ...copy.wayOfLife, paragraphs: [...(copy.wayOfLife.paragraphs || [])] };
      copy.wayOfLife.paragraphs[idx] = val;
      return copy;
    });
  const setWayItalic = (val) => setData((d) => ({ ...d, wayOfLife: { ...d.wayOfLife, italicNote: val } }));
  const setOrderItem = (idx, key, val) =>
    setData((d) => {
      const copy = { ...d, orderStructure: [...d.orderStructure] };
      copy.orderStructure[idx] = { ...copy.orderStructure[idx], [key]: val };
      return copy;
    });
  const addOrderItem = () =>
    setData((d) => ({ ...d, orderStructure: [...d.orderStructure, { title: "New:", text: "New text" }] }));
  const removeOrderItem = (idx) =>
    setData((d) => ({ ...d, orderStructure: d.orderStructure.filter((_, i) => i !== idx) }));
  const setFaqItem = (idx, key, val) =>
    setData((d) => {
      const copy = { ...d, faq: [...d.faq] };
      copy.faq[idx] = { ...copy.faq[idx], [key]: val };
      return copy;
    });
  const addFaqItem = () => setData((d) => ({ ...d, faq: [...d.faq, { q: "New question?", a: "Answer..." }] }));
  const removeFaqItem = (idx) => setData((d) => ({ ...d, faq: d.faq.filter((_, i) => i !== idx) }));

  // Save to backend
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/public/api/what-is-freemasonry/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setEditMode(false);
        alert("Page updated!");
      } else {
        alert("Save failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving changes.");
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };

  // Render helper for rendering HTML (we store some HTML in strings)
  const renderHtml = (html) => <span dangerouslySetInnerHTML={{ __html: html }} />;

  return (
    <div style={{ background: "#f7f5ef", minHeight: "100vh", paddingTop: 32 }}>
      {/* Floating draggable admin button */}
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
              ✏️ Edit Page
            </Button>
          ) : (
            <div style={{ display: "flex", gap: 10 }}>
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

      <Container>
        {/* TITLE */}
        <Row className="mb-5 justify-content-center">
          <Col xs="12" md="8" className="text-center">
            {editMode ? (
              <input
                type="text"
                value={data.pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                style={{
                  width: "100%",
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#573e1d",
                  fontSize: "2.3rem",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              />
            ) : (
              <h1 className="display-5 fw-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#573e1d" }}>
                {data.pageTitle}
              </h1>
            )}
            <hr style={{ width: 70, margin: "0 auto", borderTop: "3px solid #baa55c" }} />
          </Col>
        </Row>

        {/* WHAT IS FREEMASONRY */}
        <Row className="align-items-center mb-5 gy-4">
          <Col xs={12} md={6}>
            <Card className="shadow-sm border-0 p-3" style={{ background: "rgba(255,255,240,0.97)", borderRadius: "1.2rem" }}>
              <Card.Body>
                {editMode ? (
                  <Form.Group>
                    <Form.Control
                      as="textarea"
                      rows={8}
                      value={data.introCard.text}
                      onChange={(e) => setIntroText(e.target.value)}
                    />
                    <Form.Text className="text-muted">You may use simple HTML tags (strong, em) if desired.</Form.Text>
                  </Form.Group>
                ) : (
                  <Card.Text style={{ fontSize: "1.15rem" }}>{renderHtml(data.introCard.text)}</Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} className="text-center">
            {/* images are fixed as requested */}
            <img
              src={data.introCard.image}
              alt={data.introCard.imageAlt || "Freemasonry Symbolism"}
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
                {editMode ? (
                  <Form.Group>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      value={data.brotherhoodCard.text}
                      onChange={(e) => setBrotherhoodText(e.target.value)}
                    />
                  </Form.Group>
                ) : (
                  <Card.Text style={{ fontSize: "1.13rem" }}>{renderHtml(data.brotherhoodCard.text)}</Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} className="text-center">
            <img
              src={data.brotherhoodCard.image}
              alt={data.brotherhoodCard.imageAlt || "Freemasonry Brotherhood"}
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
                {data.wayOfLife.paragraphs.map((p, idx) => (
                  editMode ? (
                    <Form.Group key={idx} className="mb-3">
                      <Form.Control
                        as="textarea"
                        rows={4}
                        value={p}
                        onChange={(e) => setWayParagraph(idx, e.target.value)}
                      />
                    </Form.Group>
                  ) : (
                    <Card.Text key={idx} style={{ fontSize: "1.13rem" }} dangerouslySetInnerHTML={{ __html: p }} />
                  )
                ))}

                {editMode ? (
                  <Form.Group className="mt-2">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={data.wayOfLife.italicNote}
                      onChange={(e) => setWayItalic(e.target.value)}
                    />
                    <div style={{ marginTop: 8 }}>
                      <Button variant="outline-secondary" size="sm" onClick={() => {
                        // add another paragraph
                        setData(d => ({ ...d, wayOfLife: { ...d.wayOfLife, paragraphs: [...d.wayOfLife.paragraphs, "New paragraph..."] } }));
                      }}>
                        + Add paragraph
                      </Button>
                    </div>
                  </Form.Group>
                ) : (
                  <Card.Text style={{ fontStyle: "italic", color: "#654321", fontSize: "1.08rem" }} dangerouslySetInnerHTML={{ __html: data.wayOfLife.italicNote }} />
                )}
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
                {editMode ? (
                  <>
                    {data.orderStructure.map((item, idx) => (
                      <div key={idx} style={{ marginBottom: 12 }}>
                        <Form.Control
                          type="text"
                          value={item.title}
                          onChange={(e) => setOrderItem(idx, "title", e.target.value)}
                          style={{ marginBottom: 6 }}
                        />
                        <Form.Control
                          as="textarea"
                          rows={2}
                          value={item.text}
                          onChange={(e) => setOrderItem(idx, "text", e.target.value)}
                        />
                        <div style={{ marginTop: 6, display: "flex", gap: 8 }}>
                          <Button variant="outline-danger" size="sm" onClick={() => removeOrderItem(idx)}>Remove</Button>
                        </div>
                      </div>
                    ))}
                    <Button size="sm" onClick={addOrderItem}>+ Add item</Button>
                  </>
                ) : (
                  <ul style={{ fontSize: "1.12rem", lineHeight: 1.7, marginBottom: 0 }}>
                    {data.orderStructure.map((item, idx) => (
                      <li key={idx}>
                        <strong>{item.title}</strong> {item.text}
                      </li>
                    ))}
                  </ul>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* FAQ */}
        <Row className="pb-5">
          <Col xs={12} md={10} lg={8} className="mx-auto">
            <h2 className="mb-4" style={{ color: "#83642e", fontFamily: "'Cormorant Garamond', serif" }}>FAQ for Interested Parties</h2>
            {editMode ? (
              <>
                {data.faq.map((f, idx) => (
                  <Card key={idx} className="mb-2">
                    <Card.Body>
                      <Form.Group className="mb-2">
                        <Form.Control value={f.q} onChange={(e) => setFaqItem(idx, "q", e.target.value)} />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control as="textarea" rows={3} value={f.a} onChange={(e) => setFaqItem(idx, "a", e.target.value)} />
                      </Form.Group>
                      <div style={{ marginTop: 8 }}>
                        <Button variant="outline-danger" size="sm" onClick={() => removeFaqItem(idx)}>Remove</Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
                <Button onClick={addFaqItem}>+ Add FAQ</Button>
              </>
            ) : (
              <Accordion>
                {data.faq.map((f, idx) => (
                  <Accordion.Item eventKey={String(idx)} key={idx}>
                    <Accordion.Header>{f.q}</Accordion.Header>
                    <Accordion.Body>{f.a}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
