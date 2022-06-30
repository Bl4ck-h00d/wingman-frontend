import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../Home";
import CreatePost from "../Form/CreatePostForm";
import PostSection from "../PostSection";
import { AnimatePresence } from "framer-motion";


const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />{" "}
        <Route path="/post" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostSection />} />
      </Routes>
    </AnimatePresence>
  );
};


export default AnimatedRoutes;