// src/components/Pages/Pages.js
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomePageTab from "./HomepageTab";
import "./Pages.css";

const Pages = () => {
  const [key, setKey] = useState("home");
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Manage Pages</h2>

      <Tabs
        id="pages-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 justify-content-center"
      >
        <Tab eventKey="home" title="Homepage">
          <HomePageTab role={user?.role} />
        </Tab>

        {/* <Tab eventKey="about" title="About Page">
          <AboutPageTab role={user?.role} />
        </Tab>

        <Tab eventKey="contact" title="Contact Page">
          <ContactPageTab role={user?.role} />
        </Tab> */}
      </Tabs>
    </Container>
  );
};

export default Pages;