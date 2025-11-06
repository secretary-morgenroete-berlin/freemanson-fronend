// src/components/Portal/MagazineTab.js
import React, { useState, useEffect } from "react";
import { Button, Table, Form } from "react-bootstrap";

const MagazineTab = ({ role }) => {
  const [pdfs, setPdfs] = useState([]);
  const [file, setFile] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/public/api/portal/magazines`)
      .then((res) => res.json())
      .then((data) => setPdfs(data))
      .catch(console.error);
  }, [API_URL]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append("pdf", file);

    const res = await fetch(`${API_URL}/public/api/portal/magazines/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: formData,
    });

    if (res.ok) {
      alert("✅ Magazine uploaded!");
      window.location.reload();
    } else {
      alert("❌ Upload failed!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this file?")) return;
    await fetch(`${API_URL}/public/api/portal/magazines/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    window.location.reload();
  };

  return (
    <div>
      {role === "admin" && (
        <Form onSubmit={handleUpload} className="mb-3">
          <Form.Group controlId="formFile">
            <Form.Label>Upload Magazine PDF</Form.Label>
            <Form.Control
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Form.Group>
          <Button type="submit" variant="success" className="mt-2">
            Upload
          </Button>
        </Form>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Uploaded By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pdfs.map((pdf) => (
            <tr key={pdf.id}>
              <td>{pdf.title}</td>
              <td>{pdf.uploader}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  href={`${API_URL}/public/api/portal/magazines/download/${pdf.id}`}
                  target="_blank"
                  className="me-2"
                >
                  Download
                </Button>
                {role === "admin" && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(pdf.id)}
                  >
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MagazineTab;
