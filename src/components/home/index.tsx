import React from "react";
import TrendingTags from "./trendingTags";
import PostContainer from "../posts";
import AddPostButton from "./addPostButton";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <TrendingTags />
      <PostContainer />
      <Link to="/post">
        <AddPostButton />
      </Link>
    </motion.div>
  );
};

export default Home;
