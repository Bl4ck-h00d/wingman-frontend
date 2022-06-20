import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../home";
import CreatePost from "../createPost";
import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />{" "}
        <Route path="/post" element={<CreatePost />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
