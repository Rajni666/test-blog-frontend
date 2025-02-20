import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    author: "",
    publication_date: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/api/blogs/${id}`)
        .then((response) => setBlog(response.data))
        .catch((error) => console.error("Error fetching blog:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios
        .put(`http://127.0.0.1:8000/api/blogs/${id}`, blog)
        .then(() => navigate("/"))
        .catch((error) => console.error("Error updating blog:", error));
    } else {
      axios
        .post("http://127.0.0.1:8000/api/blogs", blog)
        .then(() => navigate("/"))
        .catch((error) => console.error("Error creating blog:", error));
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Edit Blog" : "Create Blog"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={blog.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            name="content"
            value={blog.content}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={blog.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Publication Date</label>
          <input
            type="date"
            className="form-control"
            name="publication_date"
            value={blog.publication_date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          {id ? "Update Blog" : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
