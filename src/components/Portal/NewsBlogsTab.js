import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Card,
  Spinner,
  Row,
  Col,
  Badge,
  Toast,
  ToastContainer,
  Modal,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import "./NewsBlogsTab.css";

const NewsBlogsTab = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.user?.role);

  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: "", tag: "", content: "" });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/public/api/newsblogs/list`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setPosts([]);
    }
    setFetched(true);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") setImageFile(files[0]);
    else setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!imageFile) {
      setErrorMessage("Please select an image!");
      setShowErrorModal(true);
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("tag", formData.tag || "");
      form.append("content", formData.content);
      form.append("image", imageFile);

      const res = await fetch(`${API_URL}/public/api/newsblogs/create`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      const data = await res.json();
      const msg = data.message || "Post created successfully";
      setMessage(msg);
      setShowToast(true);
      setFormData({ title: "", tag: "", content: "" });
      setImageFile(null);
      setShowForm(false);
      fetchPosts();
    } catch (err) {
      console.error(err);
      setMessage("Error creating post");
      setShowToast(true);
    }
    setLoading(false);
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!confirmDeleteId) return;
    setShowConfirmModal(false);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/public/api/newsblogs/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: confirmDeleteId }),
      });
      const data = await res.json();
      const msg = data.message || "Post deleted successfully";
      setMessage(msg);
      setShowToast(true);
      fetchPosts();
    } catch (err) {
      console.error(err);
      setMessage("Error deleting post");
      setShowToast(true);
    }
    setLoading(false);
  };

  const handleReadMore = (post) => {
    setSelectedPost(post);
  };

  const handleBack = () => {
    setSelectedPost(null);
  };

  // -------------------------
  // Detail View
  // -------------------------
  if (selectedPost) {
    return (
      <div className="news-blogs-tab">
        <Button
          variant="secondary"
          className="mb-3 post-card-btn"
          onClick={handleBack}
        >
          ← Back
        </Button>

        <div
          className="p-4"
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 0 5px rgba(0,0,0,0.2)",
          }}
        >
          <h4 className="mb-3">{selectedPost.title}</h4>
          <div className="img-div">
            {selectedPost.image && (
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="img-fluid mb-3 rounded"
              />
            )}
          </div>

          {selectedPost.tag && (
            <div className="mb-3">
              {selectedPost.tag.split(",").map((t, i) => (
                <Badge bg="info" key={i} className="me-1">
                  {t.trim()}
                </Badge>
              ))}
            </div>
          )}

          <p style={{ whiteSpace: "pre-line" }}>{selectedPost.content}</p>
        </div>

        {/* Toast Notification */}
        <ToastContainer position="top-end" className="p-3">
          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            delay={8000}
            autohide
            bg="success"
          >
            <Toast.Header>
              <strong className="me-auto">Notification</strong>
            </Toast.Header>
            <Toast.Body className="text-white">{message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    );
  }

  // -------------------------
  // Main Post List View
  // -------------------------
  return (
    <div className="news-blogs-tab">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>News & Blogs</h5>
        {role === "admin" && (
          <Button className="create-post" onClick={() => setShowForm(true)}>
            +Create Post
          </Button>
        )}
      </div>

      {!loading && fetched && posts.length === 0 && (
        <p className="text-center">No posts found</p>
      )}

      <Row>
        {Array.isArray(posts) &&
          posts.map((p) => (
            <Col md={4} key={p.id} className="mb-3 d-flex">
              <Card className="flex-fill d-flex flex-column h-100">
                {p.image && <Card.Img className="card-img" variant="top" src={p.image} />}
                <Card.Body className="d-flex flex-column">
                  <div>
                    <Card.Title>{p.title}</Card.Title>
                    {p.tag && (
                      <div className="mb-2">
                        {p.tag.split(",").map((t, i) => (
                          <Badge bg="secondary" key={i} className="me-1">
                            {t.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <Card.Text className="text-truncate-2">{p.content}</Card.Text>
                  </div>

                  <div className="mt-auto pt-3 text-center">
                    <Button
                      className="post-card-btn"
                      variant="primary"
                      size="sm"
                      onClick={() => handleReadMore(p)}
                    >
                      Read More
                    </Button>
                    {role === "admin" && (
                      <Button
                        variant="danger"
                        size="sm"
                        className="ms-2 post-card-btn"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={8000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{message}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Confirm Delete Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowErrorModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Create Post Modal */}
        <Modal show={showForm} onHide={() => setShowForm(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Create New Post</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tag</Form.Label>
                <Form.Control
                  type="text"
                  name="tag"
                  value={formData.tag}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner size="sm" /> : "Create Post"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

    </div>

    
  );
};

export default NewsBlogsTab;
