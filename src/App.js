import './App.css';
// import HomePage from './components/Home/Home';

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import About from "./components/About/About";
// import Contact from "./components/Contact/Contact";
import Lodge from "./components/Lodge/Lodge";
import NewsBlog from "./components/NewsBlog/NewsBlog";
import BecomeMember from "./components/BecomeMember/BecomeMember";
import WhatIsFreemasonry from './components/WhatIsFreemasonry/WhatIsFreemasonry';

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Router>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
            <Route path="/lodge" element={<Lodge />} />
            <Route path="/news-blog" element={<NewsBlog />} />
            <Route path="/become-member" element={<BecomeMember />} />
            <Route path="/what-is-freemasonry" element={<WhatIsFreemasonry />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}


export default App;
