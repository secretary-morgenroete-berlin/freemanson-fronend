// src/components/Portal/MembersTab.js
import React, { useEffect, useState } from "react";
import { Table, Button, Form, Alert } from "react-bootstrap";
import './MembersTab.css';

const MembersTab = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [newMember, setNewMember] = useState({
    first_name: "",
    last_name: "",
    role: "member",
    email: "",
    referral: "",
    address: "",
    phone_no: "",
    password: "",
  });

  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token"); // assuming JWT is stored in localStorage

  // Fetch all users
  const fetchMembers = async () => {
    try {
      const res = await fetch(`${API_URL}/public/api/get-all-users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      console.error("Failed to fetch members:", err);
      setMessage({ text: "Failed to load members", type: "danger" });
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Add new member
  const handleAddMember = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch(`${API_URL}/public/api/add-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newMember),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage({ text: "✅ Member added successfully!", type: "success" });
        setShowForm(false);
        setNewMember({
          first_name: "",
          last_name: "",
          role: "member",
          email: "",
          referral: "",
          address: "",
          phone_no: "",
          password: "",
        });
        fetchMembers();
      } else {
        setMessage({ text: result.message || "❌ Failed to add member", type: "danger" });
      }
    } catch (err) {
      console.error("Add member error:", err);
      setMessage({ text: "❌ Server error", type: "danger" });
    }
  };

  return (
    <div className="container mt-3">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Members Directory</h5>
        <span className="add-member" size="sm" onClick={() => setShowForm(true)}>+ Add Member</span>
      </div>

      {message.text && <Alert variant={message.type}>{message.text}</Alert>}

      {/* Members List */}
      {!selectedMember && !showForm && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th><th>Role</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr
                key={m.id}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedMember(m)}
              >
                <td>{`${m.first_name} ${m.last_name}`}</td>
                <td>{`${m.role}`}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Member Details */}
      {selectedMember && !showForm && (
        <div className="card p-3 shadow-sm member-details">
          <h5 className="mb-3">Member Details</h5>
          <p><strong>Name:</strong> {selectedMember.first_name} {selectedMember.last_name}</p>
          <p><strong>Email:</strong> {selectedMember.email}</p>
          <p><strong>Role:</strong> {selectedMember.role}</p>
          <p><strong>Address:</strong> {selectedMember.address}</p>
          <p><strong>Phone:</strong> {selectedMember.phone_no}</p>
          <p><strong>Referral:</strong> {selectedMember.referral || "—"}</p>
          <Button className="back-member" variant="secondary" size="sm" onClick={() => setSelectedMember(null)}>
            ← Back to Members List
          </Button>
        </div>
      )}

      {/* Add Member Form */}
      {showForm && (
        <div className="card p-3 shadow-sm">
          <h5 className="mb-3">Add New Member</h5>
          <Form onSubmit={handleAddMember}>
            <Form.Group className="mb-2">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={newMember.first_name}
                onChange={(e) =>
                  setNewMember({ ...newMember, first_name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={newMember.last_name}
                onChange={(e) =>
                  setNewMember({ ...newMember, last_name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={newMember.role}
                onChange={(e) =>
                  setNewMember({ ...newMember, role: e.target.value })
                }
                required
              >
                <option value="admin">Admin</option>
                <option value="member">Member</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email ID"
                value={newMember.email}
                onChange={(e) =>
                  setNewMember({ ...newMember, email: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Referral</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., john.doe@example.com"
                value={newMember.referral}
                onChange={(e) =>
                  setNewMember({ ...newMember, referral: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={newMember.address}
                onChange={(e) =>
                  setNewMember({ ...newMember, address: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Phone No</Form.Label>
              <Form.Control
                type="text"
                value={newMember.phone_no}
                onChange={(e) =>
                  setNewMember({ ...newMember, phone_no: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={newMember.password}
                onChange={(e) =>
                  setNewMember({ ...newMember, password: e.target.value })
                }
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 mt-3">
              <button
                type="button"
                className="member-btn btn-cancel btn-sm"
                onClick={() => {
                  setShowForm(false);
                  setMessage({ text: "", type: "" });
                }}
              >
                Cancel
              </button>
              <button type="submit" className="member-btn btn-save btn-sm">
                Save Member
              </button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default MembersTab;
