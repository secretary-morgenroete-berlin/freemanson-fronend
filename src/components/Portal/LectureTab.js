import React, { useState, useEffect } from "react";
import { Button, Table, Form, Modal, Dropdown, Toast, ToastContainer } from "react-bootstrap";
import { FaFolder, FaArrowLeft } from "react-icons/fa";
import "./LectureTab.css";

const LectureTab = ({ role }) => {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  const [showFolderModal, setShowFolderModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [viewOnly, setViewOnly] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editFolderName, setEditFolderName] = useState("");
  const [editViewOnly, setEditViewOnly] = useState(false);

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewURL, setPreviewURL] = useState("");

  // Toast state
  const [toastMsg, setToastMsg] = useState("");
  const [toastShow, setToastShow] = useState(false);
  const [toastVariant, setToastVariant] = useState("success");

  // Confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  // Toast helper
  const showToast = (message, variant = "success") => {
    setToastMsg(message);
    setToastVariant(variant);
    setToastShow(true);
    setTimeout(() => setToastShow(false), 3000);
  };

  // Fetch folders
  const fetchFolders = async () => {
    try {
      const res = await fetch(`${API_URL}/public/api/folders/get`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFolders(data);
    } catch (err) {
      console.error(err);
      showToast("Failed to fetch folders", "danger");
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  // Fetch files
  const fetchFiles = async (folderId) => {
    try {
      const res = await fetch(`${API_URL}/public/api/folders/${folderId}/files/list`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      console.error(err);
      showToast("Failed to fetch files", "danger");
    }
  };

  const handleFolderSelect = (folder) => {
    setSelectedFolder(folder);
    fetchFiles(folder.id);
  };

  const handleBackToFolders = () => {
    setSelectedFolder(null);
    setFiles([]);
  };

  // ---------- Confirmation Modal Helpers ----------
  const confirmPopup = (message, action) => {
    setConfirmMsg(message);
    setConfirmAction(() => action);
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    if (confirmAction) confirmAction();
    setShowConfirmModal(false);
  };

  const handleCancelConfirm = () => {
    setShowConfirmModal(false);
  };
  // -----------------------------------------------

  const handleCreateFolder = async () => {
    if (!folderName) return showToast("Enter folder name", "danger");
    try {
      const res = await fetch(`${API_URL}/public/api/folders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: folderName, view_only: viewOnly }),
      });
      if (res.ok) {
        setFolderName("");
        setViewOnly(false);
        setShowFolderModal(false);
        fetchFolders();
        showToast("Folder created successfully");
      } else {
        const data = await res.json();
        showToast(data.message || "Failed to create folder", "danger");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error during folder creation", "danger");
    }
  };

  const openEditModal = (folder) => {
    setSelectedFolder(folder);
    setEditFolderName(folder.name);
    setEditViewOnly(folder.view_only);
    setShowEditModal(true);
  };

  const handleUpdateFolder = async () => {
    try {
      const res = await fetch(`${API_URL}/public/api/folders/update/${selectedFolder.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: editFolderName, view_only: editViewOnly }),
      });
      if (res.ok) {
        setFolders(folders.map(f =>
          f.id === selectedFolder.id ? { ...f, name: editFolderName, view_only: editViewOnly } : f
        ));
        setShowEditModal(false);
        showToast("Folder updated successfully");
      } else {
        showToast("Failed to update folder", "danger");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error during folder update", "danger");
    }
  };

  const toggleViewOnly = async (folder) => {
    try {
      const res = await fetch(`${API_URL}/public/api/folders/update/${folder.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: folder.name, view_only: !folder.view_only }),
      });
      if (res.ok) {
        setFolders(folders.map(f => f.id === folder.id ? { ...f, view_only: !folder.view_only } : f));
        showToast("Folder updated successfully");
      } else {
        showToast("Failed to update folder", "danger");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error during folder update", "danger");
    }
  };

  const handleDeleteFolder = (id) => {
    confirmPopup("Delete this folder and all files?", async () => {
      try {
        await fetch(`${API_URL}/public/api/folders/delete/${id}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
        setFolders(folders.filter(f => f.id !== id));
        if (selectedFolder?.id === id) setSelectedFolder(null);
        showToast("Folder deleted successfully");
      } catch (err) {
        console.error(err);
        showToast("Failed to delete folder", "danger");
      }
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !selectedFolder) return showToast("Select folder and file first", "danger");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/public/api/folders/${selectedFolder.id}/files/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message || "File uploaded successfully");
        setFile(null);
        fetchFiles(selectedFolder.id);
      } else {
        showToast(data.message || "Upload failed", "danger");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error during upload", "danger");
    }
  };

  const handleDeleteFile = (id) => {
    confirmPopup("Delete this file?", async () => {
      try {
        await fetch(`${API_URL}/public/api/files/${id}/delete`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchFiles(selectedFolder.id);
        showToast("File deleted successfully");
      } catch (err) {
        console.error(err);
        showToast("Failed to delete file", "danger");
      }
    });
  };

  const handlePreview = async (file) => {
    try {
      const res = await fetch(`${API_URL}/public/api/files/${file.id}/download`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch file");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      setPreviewURL(url);
      setShowPreviewModal(true);
    } catch (err) {
      console.error(err);
      showToast("Failed to preview file", "danger");
    }
  };

  const handleDownload = async (file) => {
    try {
      const res = await fetch(`${API_URL}/public/api/files/${file.id}/download`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to download file");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      showToast("File downloaded successfully");
    } catch (err) {
      console.error(err);
      showToast("Failed to download file", "danger");
    }
  };

  return (
    <div className="container-fluid">
      {/* Toast Notifications */}
      <ToastContainer position="top-end" className="p-3">
        <Toast show={toastShow} bg={toastVariant} onClose={() => setToastShow(false)} delay={3000} autohide>
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={handleCancelConfirm} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>{confirmMsg}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelConfirm}>Cancel</Button>
          <Button variant="danger" onClick={handleConfirm}>Yes</Button>
        </Modal.Footer>
      </Modal>

      {/* Folder Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
        <h4 className="mb-0">
          {selectedFolder ? (
            <>
              <Button
                id="back-btn"
                variant="link"
                size="sm"
                className="p-0 me-2 text-decoration-none"
                onClick={handleBackToFolders}
              >
                <FaArrowLeft className="me-1" />
                Back to Folders
              </Button>
              Files in "{selectedFolder.name}"
            </>
          ) : (
            "Lecture Folders"
          )}
        </h4>
        {!selectedFolder && role === "admin" && (
          <span className="create-folder" onClick={() => setShowFolderModal(true)}>
            + Create Folder
          </span>
        )}
      </div>

      {/* Folder Table */}
      {!selectedFolder && (
        <div className="folder-list table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Folder</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {folders.map((folder) => (
                <tr key={folder.id}>
                  <td style={{ cursor: "pointer" }} onClick={() => handleFolderSelect(folder)}>
                    <FaFolder color="#f0ad4e" className="me-2" />
                    {folder.name} {Number(folder.view_only) === 1 && "(View Only)"}
                  </td>
                  <td>{new Date(folder.created_at).toLocaleString()}</td>
                  <td>
                    {role === "admin" && (
                      <Dropdown>
                        <Dropdown.Toggle size="sm" variant="secondary">Actions</Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => openEditModal(folder)}>Rename</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDeleteFolder(folder.id)}>Delete</Dropdown.Item>
                          <Dropdown.Item onClick={() => toggleViewOnly(folder)}>Toggle View Only</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* File Table */}
      {selectedFolder && (
        <div className="mt-3">
          {role === "admin" && (
            <div className="d-flex justify-content-end mb-3">
              <Form onSubmit={handleUpload} className="d-flex align-items-center gap-2">
                <Form.Group controlId="formFile" className="mb-0">
                  <Form.Control type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
                </Form.Group>
                <button onClick={handleUpload} className="upload" style={{ cursor: "pointer" }}>Upload</button>
              </Form>
            </div>
          )}

          <div className="file-list table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Uploaded At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((pdf) => (
                  <tr key={pdf.id}>
                    <td>{pdf.name}</td>
                    <td>{new Date(pdf.uploaded_at).toLocaleString()}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle size="sm" variant="secondary">Actions</Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handlePreview(pdf)}>Preview</Dropdown.Item>
                          {!selectedFolder.view_only && <Dropdown.Item onClick={() => handleDownload(pdf)}>Download</Dropdown.Item>}
                          {role === "admin" && <Dropdown.Item onClick={() => handleDeleteFile(pdf.id)}>Delete</Dropdown.Item>}
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Preview Modal */}
          <Modal show={showPreviewModal} onHide={() => setShowPreviewModal(false)} size="lg" dialogClassName="modal-90w" centered>
            <Modal.Header closeButton>
              <Modal.Title>Preview PDF</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {previewURL && <iframe src={previewURL} title="PDF Preview" width="100%" height="600px" style={{ border: "none" }} />}
            </Modal.Body>
          </Modal>
        </div>
      )}

      {/* Create Folder Modal */}
      <Modal show={showFolderModal} onHide={() => setShowFolderModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Folder Name</Form.Label>
            <Form.Control value={folderName} onChange={(e) => setFolderName(e.target.value)} placeholder="Enter folder name" />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Check type="checkbox" label="View Only" checked={viewOnly} onChange={(e) => setViewOnly(e.target.checked)} />
          </Form.Group>
          <Button className="mt-3 w-100" onClick={handleCreateFolder}>Create</Button>
        </Modal.Body>
      </Modal>

      {/* Edit Folder Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Folder Name</Form.Label>
            <Form.Control value={editFolderName} onChange={(e) => setEditFolderName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Check type="checkbox" label="View Only" checked={editViewOnly} onChange={(e) => setEditViewOnly(e.target.checked)} />
          </Form.Group>
          <Button className="mt-3 w-100" onClick={handleUpdateFolder}>Update</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LectureTab;
