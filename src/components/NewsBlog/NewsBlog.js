import React, { useEffect } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import "./NewsBlog.css";

const blogPosts = [
  {
    id: 1,
    title: "Masonic Charity Project Supports Local Children",
    date: "July 21, 2025",
    category: "Charity",
    summary:
      "Our lodge partnered with community organizations to deliver school supplies and books for underprivileged children.",
    image: "/3.JPG",
  },
  {
    id: 2,
    title: "Insights from the Summer Gathering 2025",
    date: "July 8, 2025",
    category: "Event",
    summary:
      "A look back at our inspiring annual gathering: brotherhood, rituals, and future plans.",
    image: "/1.JPG",
  },
  {
    id: 3,
    title: "Freemasonry and Modern Society: A Perspective",
    date: "June 30, 2025",
    category: "Reflection",
    summary:
      "Discover how the ancient principles of Freemasonry remain relevant and empowering in today's world.",
    image: "/2.JPG",
  },
  // ...more posts as needed
];

export default function NewsBlog() {
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
  }, []);

  // Featured article is the first one
  const featured = blogPosts[0];
  const others = blogPosts.slice(1);

  return (
    <section className="newsblog-section pb-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold newsblog-header" style={{ color: "#735d34" }}>
            <span className="header-slidein">News & Blog</span>
          </h2>
          <p className="lead text-secondary fadein-from-right" style={{ maxWidth: 540, margin: "0 auto" }}>
            Insights, stories, and updates from our lodge. Explore brotherhood, community, and reflections on Freemasonry.
          </p>
        </div>
        <Row className="mb-5 align-items-center">
          <Col xs={12} lg={7} className="mb-4 mb-lg-0">
            <div className="newsblog-featured-img-wrap">
              <img
                src={featured.image}
                alt={featured.title}
                className="newsblog-featured-img"
              />
              <div className="newsblog-gradient-overlay" />
              <div className="newsblog-featured-caption">
                <Badge bg="primary" className="newsblog-badge">{featured.category}</Badge>
                <h3>{featured.title}</h3>
                <span className="small">{featured.date}</span>
                <p>{featured.summary}</p>
                <Button variant="light" className="shadow-sm px-4 mt-2">
                  Read More
                </Button>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={5}>
            <Row>
              {others.map((post, idx) => (
                <Col xs={12} md={6} lg={12} key={post.id} className="mb-4">
                  <Card className="newsblog-card h-100 shadow-sm">
                    <div className="newsblog-card-img-wrap">
                      <Card.Img variant="top" src={post.image} alt={post.title} />
                      <Badge bg="info" className="newsblog-badge">
                        {post.category}
                      </Badge>
                    </div>
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted small">{post.date}</Card.Subtitle>
                      <Card.Text>{post.summary}</Card.Text>
                      <Button variant="outline-primary" size="sm">
                        Read More
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
