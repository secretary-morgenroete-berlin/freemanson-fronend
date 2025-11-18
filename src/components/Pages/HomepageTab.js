// src/components/Portal/HomepageContentTab.js
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Table,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";

const HomepageContentTab = ({ role }) => {
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    section: "",
    title: "",
    content: "",
    image: null,
  });

  // Fetch homepage content
  const fetchContent = async () => {
    try {
      const res = await axios.get("/homepage/all");
      setContentList(res.data);
    } catch (err) {
      console.error("Error fetching homepage content:", err);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("section", formData.section);
    data.append("title", formData.title);
    data.append("content", formData.content);
    if (formData.image) data.append("image", formData.image);

    try {
      if (editId) {
        await axios.put(`/homepage/update/${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("/homepage/create", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setShowForm(false);
      setEditId(null);
      setFormData({ section: "", title: "", content: "", image: null });
      fetchContent();
    } catch (err) {
      console.error("Error saving homepage content:", err);
    }

    setLoading(false);
  };

  // Delete content
  const deleteContent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this content?")) return;

    try {
      await axios.delete(`/homepage/delete/${id}`);
      fetchContent();
    } catch (err) {
      console.error("Error deleting content:", err);
    }
  };

  // Load data into form for editing
  const startEdit = (item) => {
    setEditId(item.id);
    setFormData({
      section: item.section,
      title: item.title,
      content: item.content,
      image: null, // user uploads new one only if needed
    });
    setShowForm(true);
  };

  return (
    <>
      {role === "admin" && (
        <Button className="mb-3" onClick={() => setShowForm(true)}>
          + Add Homepage Content
        </Button>
      )}

      {/* Content Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Section</th>
            <th>Title</th>
            <th>Content</th>
            <th>Image</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {contentList.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No content added yet.
              </td>
            </tr>
          ) : (
            contentList.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.section}</td>
                <td>{item.title}</td>
                <td>{item.content?.slice(0, 60)}...</td>
                <td>
                  {item.image && (
                    <img
                      src={item.image}
                      alt="section"
                      style={{ width: "80px", borderRadius: "6px" }}
                    />
                  )}
                </td>

                {role === "admin" && (
                  <td>
                    <Button
                      variant="warning"
                      className="me-2"
                      size="sm"
                      onClick={() => startEdit(item)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteContent(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Create/Edit Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editId ? "Edit Homepage Content" : "Create Homepage Content"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Section Name</Form.Label>
              <Form.Control
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
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
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="image"
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" /> : editId ? "Update" : "Create"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HomepageContentTab;
