// src/components/Portal/Portal.js
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LectureTab from "./LectureTab";
import MagazineTab from "./MagazineTab";
import MembersTab from "./MembersTab";
import NewsBlogsTab from "./NewsBlogsTab";
import CalendarTab from "./CalendarTab";
import "./Portal.css";

const Portal = () => {
  const [key, setKey] = useState("lecture");
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Portal</h2>

      <Tabs
        id="portal-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 justify-content-center"
      >
        <Tab eventKey="lecture" title="Lecture">
          <LectureTab role={user?.role} />
        </Tab>

        <Tab eventKey="magazine" title="Magazine">
          <MagazineTab role={user?.role} />
        </Tab>

        <Tab eventKey="members" title="Members">
          <MembersTab role={user?.role} />
        </Tab>

        <Tab eventKey="news" title="News & Blogs">
          <NewsBlogsTab role={user?.role} />
        </Tab>

        <Tab eventKey="calendar" title="Calendar">
          <CalendarTab role={user?.role} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Portal;
