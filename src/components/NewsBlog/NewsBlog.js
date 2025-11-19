import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Button, Spinner } from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./NewsBlog.css";

export default function NewsBlog() {
  const API_URL = process.env.REACT_APP_API_URL;

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch posts
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

  // Fetch posts whenever the list view is shown (route = '/news-blog')
  useEffect(() => {
    if (location.pathname === "/news-blog") {
      setSelectedPost(null);
      fetchPosts();
    }
  }, [location.pathname]);

  // Open detail when URL has id
  useEffect(() => {
    if (id && posts.length > 0) {
      const post = posts.find((p) => p.id.toString() === id.toString());
      setSelectedPost(post || null);
    }
  }, [id, posts]);

  // Animate cards
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

  // Read More → go to detail view
  const handleReadMore = (post) => {
    navigate(`/news-blog/${post.id}`);
  };

  // Back → go to list view
  const handleBack = () => {
    setSelectedPost(null);
    navigate("/news-blog");
  };

  // WhatsApp Share
  const shareOnWhatsApp = (post) => {
    const url = `${window.location.origin}/news-blog/${post.id}`;
    const message = `${post.title}\n\nRead more here:\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Facebook Share
  const shareOnFacebook = (post) => {
    const url = `${window.location.origin}/news-blog/${post.id}`;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  // LinkedIn Share
  const shareOnLinkedIn = (post) => {
    const url = `${window.location.origin}/news-blog/${post.id}`;
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  // -------------------------
  // DETAIL VIEW
  // -------------------------
  if (id && selectedPost) {
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

            {/* SHARE BUTTONS */}
            <div className="text-center mt-4">
              <Button
                variant="success"
                className="px-4 me-2"
                onClick={() => shareOnWhatsApp(selectedPost)}
              >
                WhatsApp
              </Button>

              <Button
                variant="primary"
                className="px-4 me-2"
                onClick={() => shareOnFacebook(selectedPost)}
              >
                Facebook
              </Button>

              <Button
                variant="info"
                className="px-4"
                onClick={() => shareOnLinkedIn(selectedPost)}
              >
                LinkedIn
              </Button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // -------------------------
  // MAIN LIST VIEW
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
          <h2 className="display-5 fw-bold newsblog-header" style={{ color: "#735d34" }}>
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

                  {post.tag && (
                    <div className="d-flex flex-wrap batch">
                      {post.tag.split(",").map((t, i) => (
                        <Badge bg="info" key={i} className="me-1 mb-1 newsblog-badge">
                          {t.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>

                  {post.date && (
                    <Card.Subtitle className="mb-2 text-muted small">{post.date}</Card.Subtitle>
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
