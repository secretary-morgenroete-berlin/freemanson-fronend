import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import { useSelector } from "react-redux";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Container,
  Card,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import './CalenderTab.css'

const localizer = momentLocalizer(moment);

function CalendarComponent() {
  const user = useSelector((state) => state.auth.user);
  const API_URL = process.env.REACT_APP_API_URL;

  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    place: "",
    details: "",
    start: "",
    end: "",
  });
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/public/api/get-events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const eventsData = res.data.map((e) => ({
        ...e,
        start: new Date(e.start),
        end: new Date(e.end),
        title: `${e.title} @ ${e.place || ""}`,
      }));
      setEvents(eventsData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEvent = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      await axios.post(`${API_URL}/public/api/events`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents(); // refresh events
      setShowModal(false);
      setFormData({ title: "", place: "", details: "", start: "", end: "" });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error adding event");
    }
    setLoading(false);
  };

  return (
    <Container className="py-4">
      <Card className="shadow-lg border-0">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">📅 Event Calendar</h5>
          {user?.role === "admin" && (
            <Button className="add-event" variant="light" size="sm" onClick={handleShowModal}>
              + Add Event
            </Button>
          )}
        </Card.Header>
        <Card.Body>
          <div style={{ height: "600px" }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              popup
              views={["month", "week", "day", "agenda"]}
              step={60}
              showMultiDayTimes
              style={{
                borderRadius: "10px",
                backgroundColor: "#fff",
                padding: "10px",
              }}
              date={date}
              view={view}
              onView={(v) => setView(v)}
              onNavigate={(newDate) => setDate(newDate)}
            />
          </div>
        </Card.Body>
      </Card>

      {/* Add Event Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter event title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Place</Form.Label>
              <Form.Control
                type="text"
                name="place"
                placeholder="Location"
                value={formData.place}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="details"
                placeholder="Describe the event..."
                value={formData.details}
                onChange={handleChange}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Start Date & Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="start"
                    value={formData.start}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>End Date & Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="end"
                    value={formData.end}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddEvent} disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Saving...
              </>
            ) : (
              "Add Event"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default CalendarComponent;
