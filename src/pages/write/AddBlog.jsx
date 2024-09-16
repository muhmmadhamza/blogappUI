 
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createPost } from "../../redux/features/postSlice"; // Import the async thunk
import "./addblog.css";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  content: Yup.string().required("content is required"),
});

 const AddBlog=()=>{
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { loading, error } = useSelector((state) => state.posts || {});

  const [imagePreview, setImagePreview] = useState(
    "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
  );

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      content: "",
      image:"",
    },
    validationSchema: validationSchema,
    onSubmit:async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("author", values.author);
      formData.append("content", values.content);
 
        formData.append("image",values.image);
      // }

      // dispatch(createPost(formData));  
      try {
        await dispatch(createPost(formData)).unwrap();
        navigate('/'); // Redirect to a success page or another route
      } catch (error) {
        console.error("Failed to create post:", error);
      }
      
    },
  });
 
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        formik.setFieldValue("image", file); // Set the image file in Formik state
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="write">
      <img className="writeImg" src={imagePreview} alt="Uploaded Preview" />
      <form className="writeForm" onSubmit={formik.handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
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
          <input
            className="writeInput"
            placeholder="Author"
            type="text"
            id="author"
            name="author"
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.author && formik.errors.author ? (
            <div className="error">{formik.errors.author}</div>
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
        <button className="writeSubmit" type="submit" disabled={loading}>
          {loading ? "Publishing..." : "Publish"}
        </button>
        {/* {error && <div className="error">{error}</div>} */}
      </form>
    </div>
  );
}


export default AddBlog;