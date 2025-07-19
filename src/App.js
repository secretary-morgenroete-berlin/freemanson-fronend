import './App.css';
// import HomePage from './components/Home/Home';

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import WhatIsFreemasonry from './components/WhatIsFreemasonry/WhatIsFreemasonry';

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/what-is-freemasonry" element={<WhatIsFreemasonry />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
