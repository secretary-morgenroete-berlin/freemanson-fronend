import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Carousel, Button, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./Lodge.css";

const API_URL = process.env.REACT_APP_API_URL;

const defaultData = {
  heroMedia: ["/4.JPG", "/2.JPG", "/3.JPG"],
  lodgeSections: [
    {
      title: "History & Namesake",
      content: [
        "Crown Prince Frederick William, later Frederick III, the “99-day Emperor”",
        "The German Emperor and King of Prussia from the House of Hohenzollern was born in Potsdam on October 18, 1831, and died there on June 15, 1888, of a throat condition. He was the son of Wilhelm I and married Victoria, Princess of Great Britain and Ireland.",
        "Crown Prince Friedrich Wilhelm was introduced to Freemasonry by his father in 1853 and admitted to the 'Grand Provincial Lodge of Freemasons of Germany.'",
        "The saying “Learn to suffer without complaining!” was popularly attributed to him."
      ],
      images: ["/lodge-namesake1.jpg", "/lodge-namesake2.jpg"]
    },
    {
      title: "Our Values",
      content: [
        "Freemasonry is built on five core values: Freedom, Equality, Fraternity, Tolerance, and Humanitarianism.",
        "You will find inspiration, peace and relaxation in our St. Johannis Lodge because you can simply be yourself.",
        "After completing a lodge's work, the brothers often gather for a fraternal get-together.",
        "Membership in the Masonic Order opens new perspectives and often leads to a much more conscious and fulfilling life."
      ],
      images: ["/values-lodge1.jpg", "/values-lodge2.jpg", "/values-lodge3.jpg", "/values-lodge4.jpg"]
    },
    {
      title: "The Freemasons",
      content: [
        "Freemasons see themselves as an ethical order of free individuals working to improve both themselves and society."
      ],
      images: []
    },
    {
      title: "Freemasonry",
      content: [
        "Modern Freemasonry officially began in London on June 14, 1717, when four lodges formed the first Grand Lodge."
      ],
      images: []
    }
  ]
};

const CARD_TRANSITION_TIME = 700;

const Lodge = () => {
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === "admin";

  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [current, setCurrent] = useState(0);

  // Fetch from backend
  useEffect(() => {
    const fetchLodge = async () => {
      try {
        const res = await fetch(`${API_URL}/public/api/lodge/get`);
        
        const json = await res.json();
        console.log('json->', json);
        
        if (json.success && json.data) {
          if (Object.keys(json.data).length > 0) {
            setData(json.data);
          } else {
            setData(defaultData);
          }
        } else {
          setData(defaultData);
        }
      } catch (err) {
        console.error("Failed loading lodge content:", err);
        setData(defaultData);
      } finally {
        setLoading(false);
      }
    };
    fetchLodge();
  }, []);

  // Save updates
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/public/api/lodge/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (result.success) {
        alert("✅ Lodge page updated!");
        setEditMode(false);
      } else {
        alert("❌ Failed to update lodge page");
      }
    } catch (e) {
      console.error(e);
      alert("Error saving changes");
    }
  };

  const handleCancel = () => window.location.reload();

  const handleNext = () => {
    if (current < data.lodgeSections.length - 1) setCurrent((p) => p + 1);
  };
  const handlePrev = () => {
    if (current > 0) setCurrent((p) => p - 1);
  };

  // Draggable edit button
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

  const getCardStyle = (idx) => ({
    opacity: idx === current ? 1 : 0,
    pointerEvents: idx === current ? "auto" : "none",
    transform:
      idx === current
        ? "translateY(0px) scale(1)"
        : idx < current
        ? "translateY(-40px) scale(0.98)"
        : "translateY(40px) scale(0.98)",
    transition: `all ${CARD_TRANSITION_TIME}ms cubic-bezier(.77,0,.18,1)`,
    position: idx === current ? "relative" : "absolute",
    zIndex: idx === current ? 2 : 1
  });

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
        <p>Loading Lodge content...</p>
      </div>
    );

  return (
    <div style={{ position: "relative", background: "#e2dcd0" }}>
      {/* Floating Edit Button */}
      {isAdmin && (
        <div
          ref={btnRef}
          onMouseDown={onMouseDown}
          style={{
            position: "fixed",
            top: btnPos.top,
            right: btnPos.right,
            zIndex: 9999,
            cursor: "grab"
          }}
        >
          {!editMode ? (
            <Button variant="warning" onClick={() => setEditMode(true)}>
              ✏️ Edit Lodge Page
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

      {/* Carousel */}
      <div
        style={{
          width: "100vw",
          height: "90vh",
          overflow: "hidden",
          position: "relative",
          zIndex: 2
        }}
      >
        <Carousel fade controls indicators style={{ height: "100%" }}>
          {data.heroMedia.map((img, i) => (
            <Carousel.Item key={i} style={{ height: "90vh" }}>
              <img
                src={img}
                alt={`Slide ${i + 1}`}
                style={{
                  width: "100vw",
                  height: "90vh",
                  objectFit: "cover"
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <div
          style={{
            position: "absolute",
            bottom: "2.2rem",
            width: "100%",
            textAlign: "center",
            color: "#fff",
            textShadow: "0 2px 14px #40311b99",
            fontSize: "2.2rem",
            fontFamily: "'Cormorant Garamond', serif"
          }}
        >
          The Lodge
        </div>
      </div>

      {/* Lodge Sections */}
      <Container className="pt-5 pb-2 position-relative">
        <div style={{ position: "relative", minHeight: 220 }}>
          {data.lodgeSections.map((section, idx) =>
            idx === current ? (
              <Row key={idx} className="justify-content-center" style={getCardStyle(idx)}>
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
                      minHeight: 220
                    }}
                  >
                    <Card.Body>
                      <Card.Title
                        contentEditable={editMode}
                        suppressContentEditableWarning
                        onInput={(e) => {
                          const updated = { ...data };
                          updated.lodgeSections[idx].title = e.target.innerText;
                          setData(updated);
                        }}
                        className="mb-3"
                        style={{ fontSize: "1.6rem", color: "#735d34" }}
                      >
                        {section.title}
                      </Card.Title>

                      {section.content.map((p, pi) => (
                        <p
                          key={pi}
                          contentEditable={editMode}
                          suppressContentEditableWarning
                          onInput={(e) => {
                            const updated = { ...data };
                            updated.lodgeSections[idx].content[pi] = e.target.innerText;
                            setData(updated);
                          }}
                          style={{ color: "#40311b", fontWeight: 500 }}
                        >
                          {p}
                        </p>
                      ))}

                      <div className="d-flex flex-wrap gap-3 justify-content-center mt-3">
                        {section.images.map((img, ii) => (
                          <img
                            key={ii}
                            src={img}
                            alt=""
                            style={{
                              height: "400px",
                              width: "100%",
                              maxWidth: 300,
                              borderRadius: "10px",
                              boxShadow: "0 2px 14px #bbb6"
                            }}
                          />
                        ))}
                      </div>
                    </Card.Body>

                    <div className="d-flex justify-content-between mt-3">
                      <Button variant="outline-primary" onClick={handlePrev} disabled={current === 0}>
                        ← Previous
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleNext}
                        disabled={current === data.lodgeSections.length - 1}
                      >
                        Next →
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
