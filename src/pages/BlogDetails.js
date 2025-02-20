import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog details:", error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/blogs/${id}`)
        .then(() => navigate("/"))
        .catch((error) => console.error("Error deleting blog:", error));
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!blog) {
    return (
      <div className="text-center mt-5 alert alert-danger">Blog not found!</div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">{blog.title}</h2>
      <p className="text-muted">
        By {blog.author} on {blog.publication_date}
      </p>
      <p>{blog.content}</p>
      <div className="mt-3">
        <Link to="/" className="btn btn-secondary">
          Back to List
        </Link>
        <Link to={`/edit/${blog.id}`} className="btn btn-warning ms-2">
          Edit
        </Link>
        <button onClick={handleDelete} className="btn btn-danger ms-2">
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
