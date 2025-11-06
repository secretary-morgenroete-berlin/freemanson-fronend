// src/components/Portal/Portal.js
import React, { useState } from "react";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import LectureTab from "./LectureTab";
import MagazineTab from "./MagazineTab";
import MembersTab from "./MembersTab";
import './Portal.css'

const Portal = () => {
  const [key, setKey] = useState("lecture");
  const user = useSelector((state) => state.auth.user);

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
      </Tabs>
    </Container>
  );
};

export default Portal;
