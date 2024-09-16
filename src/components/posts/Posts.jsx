import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./posts.css";
import staticimage from "../../assets/image/pexels.webp";
import { CircularProgress } from "@mui/material";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;
  const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
  const imageBaseUrl = `${IMAGE_URL}/uploads/`;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/posts/get`); // Your API endpoint
        setPosts(response.data.posts);
      } catch (err) {
        setError("Error fetching posts");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [API_URL]);

  if (loading)
    return (
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="secondary" />
      </p>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="posts">
      {posts.map((post) => (
        <PostCard post={post} key={post._id} imageBaseUrl={imageBaseUrl} />
      ))}
    </div>
  );
}

function PostCard({ post, imageBaseUrl }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev); // Ensure proper state toggling
  };

  const maxLength = 100;
  const contentToShow = isExpanded
    ? post.content
    : `${post.content.slice(0, maxLength)}...`;

  return (
    <div className="post" key={post._id}>
      
      <img
        className="postImg"
        src={`${imageBaseUrl}${post.image || staticimage}`}
        alt={post.title}
        onError={(e) =>
          (e.target.src =
            "https://images.pexels.com/photos/4916559/pexels-photo-4916559.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500")
        }
      />
      <div className="postInfo">
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>

        <span className="postDate">
          {`PublishblogDate: ${new Date(post.createdAt).toLocaleDateString()}`}
        </span>
        <span className="postAuthor">{`Author: ${post.author}`}</span>
      </div>

      <p className={`postDesc ${isExpanded ? "expanded" : "collapsed"}`}>
        {contentToShow}
        {post.content.length > maxLength && (
          <span onClick={toggleReadMore} className="readMoreToggle">
            {isExpanded ? "Read Less" : "Read More"}
          </span>
        )}
      </p>

      <button className="detailsbtn">
        <Link to={`/post/${post._id}`} className="link">
          view full details
        </Link>
      </button>



    </div>
  );
}
