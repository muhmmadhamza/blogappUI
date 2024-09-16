import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./singlePost.css";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

export default function SinglePost() {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  const imageBaseUrl = "http://localhost:5000/uploads/";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_URL}/posts/${id}`); // Fetch post details by ID
        setPost(response.data.post);
      } catch (err) {
        setError('Error fetching post details');
        console.error('Error fetching post details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, API_URL]);

  const handleEdit = () => {
    // Redirect to edit page
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/posts/delete/${id}`);
      toast.success("deleted successfully")
      navigate('/'); // Redirect to posts list after deletion
    } catch (err) {
      setError('Error deleting post');
      console.error('Error deleting post:', err);
    }
  };

  if (loading) return <div>
    <CircularProgress color="secondary" />
  </div>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>No post found</p>;

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src={`${imageBaseUrl}${post.image}`}
          alt={post.title}
          onError={(e) => e.target.src = "https://images.pexels.com/photos/4916559/pexels-photo-4916559.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
        />
        <h1 className="singlePostTitle">
          {post.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit" onClick={handleEdit}></i>
            <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              {post.author}
            </b>
          </span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="singlePostDesc">
          {post.content}
        </p>
      </div>
    </div>
  );
}
