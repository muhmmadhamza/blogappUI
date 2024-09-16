import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./edit.css";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
});

export default function EditPost() {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_URL}/posts/${id}`);
       
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

  const formik = useFormik({
    initialValues: {
      title: post ? post.title : "",
      content: post ? post.content : "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await axios.put(`${API_URL}/posts/update/${id}`, values);
        toast.success("Blog edit Successfully")
        navigate(`/post/${id}`); // Redirect to the single post page
      } catch (error) {
        setError('Error updating post');
        console.error("Failed to update post:", error);
      }
    },
  });

  if (loading) return <p>Loading post details...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>No post found</p>;

  return (
    <div className="write">

      <h1>Edit Post</h1>


      <form className="writeForm" onSubmit={formik.handleSubmit}>
            <div className="writeFormGroup">
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="error">{formik.errors.title}</div>
          ) : null}
        </div>
        <div className="writeFormGroup">
          <textarea
         className="writeInput writeText"
            placeholder="Tell your story..."
            id="content"
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.content && formik.errors.content ? (
            <div className="error">{formik.errors.content}</div>
          ) : null}
        </div>
        <button className="writeSubmit" type="submit">
          Update Post
        </button>
      </form>
    </div>
  );
}
