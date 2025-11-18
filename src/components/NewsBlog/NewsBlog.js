import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Button, Spinner } from "react-bootstrap";
import "./NewsBlog.css";

export default function NewsBlog() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch posts from API
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/public/api/newsblogs/list`, {
        method: "POST",
      });
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setPosts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Animate cards on scroll into view
  useEffect(() => {
    const cards = document.querySelectorAll(".newsblog-card");
    const onScroll = () => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
          card.classList.add("show");
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [posts]);

  const handleReadMore = (post) => setSelectedPost(post);

  // Updated: refetch posts when going back
  const handleBack = () => {
    setSelectedPost(null);
    fetchPosts(); // re-fetch the list
  };

  // -------------------------
  // Detail View
  // -------------------------
  if (selectedPost) {
    return (
      <section className="newsblog-section pb-5">
        <Container>
          <Button variant="secondary" className="mb-4 post-card-btn" onClick={handleBack}>
            ← Back
          </Button>
          <div
            className="p-4 bg-white rounded shadow-sm"
            style={{ maxWidth: "900px", margin: "0 auto" }}
          >
            <h3 className="mb-3">{selectedPost.title}</h3>
            <div className="text-center">
              {selectedPost.image && (
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="img-fluid mb-3 rounded"
                />
              )}
            </div>
            {selectedPost.tag && (
              <div className="mb-3 d-flex flex-wrap">
                {selectedPost.tag.split(",").map((t, i) => (
                  <Badge bg="info" key={i} className="me-1 mb-1">
                    {t.trim()}
                  </Badge>
                ))}
              </div>
            )}
            <p style={{ whiteSpace: "pre-line" }}>{selectedPost.content}</p>
          </div>
        </Container>
      </section>
    );
  }

  // -------------------------
  // Main News & Blogs View
  // -------------------------
  if (loading) {
    return (
      <section className="newsblog-section text-center py-5">
        <Spinner animation="border" />
      </section>
    );
  }

  if (!posts.length) {
    return (
      <section className="newsblog-section text-center py-5">
        <p>No News or Blog posts found.</p>
      </section>
    );
  }

  return (
    <section className="newsblog-section pb-5">
      <Container>
        <div className="text-center mb-5">
          <h2
            className="display-5 fw-bold newsblog-header"
            style={{ color: "#735d34" }}
          >
            <span className="header-slidein">News & Blog</span>
          </h2>
          <p
            className="lead text-secondary fadein-from-right"
            style={{ maxWidth: 540, margin: "0 auto" }}
          >
            Insights, stories, and updates from our lodge. Explore brotherhood,
            community, and reflections on Freemasonry.
          </p>
        </div>

        {/* All posts in card view */}
        <Row className="g-4">
          {posts.map((post) => (
            <Col xs={12} md={6} lg={4} key={post.id}>
              <Card className="newsblog-card h-100 shadow-sm border-0 hover-card">
                <div className="newsblog-card-img-wrap overflow-hidden">
                  {post.image && (
                    <Card.Img
                      variant="top"
                      src={post.image}
                      alt={post.title}
                      className="card-img-hover"
                    />
                  )}
                  {/* Tags displayed inline */}
                  {post.tag && (
                    <div className="d-flex flex-wrap batch">
                      {post.tag
                        .split(",")
                        .map((t, i) => (
                          <Badge
                            bg="info"
                            key={i}
                            className="me-1 mb-1 newsblog-badge"
                          >
                            {t.trim()}
                          </Badge>
                        ))}
                    </div>
                  )}
                </div>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  {post.date && (
                    <Card.Subtitle className="mb-2 text-muted small">
                      {post.date}
                    </Card.Subtitle>
                  )}
                  <Card.Text>
                    {post.content?.length > 100
                      ? post.content.slice(0, 100) + "..."
                      : post.content}
                  </Card.Text>
                  <div className="text-center mt-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleReadMore(post)}
                    >
                      Read More
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
