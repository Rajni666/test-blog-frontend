import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const fetchBlogs = (page) => {
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/blogs?page=${page}`)
      .then((response) => {
        setBlogs(response.data.data);
        setTotalPages(response.data.last_page);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/blogs/${id}`)
        .then(() => {
          setBlogs(blogs.filter((blog) => blog.id !== id));
        })
        .catch((error) => console.error("Error deleting blog:", error));
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Blog Posts</h2>
      <div className="d-flex justify-content-between mb-3">
        <h5>All Blogs</h5>
        <Link to="/create" className="btn btn-primary">
          + Create Blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <p className="alert alert-warning text-center">No Blogs Found</p>
      ) : (
        <>
          <div className="row">
            {blogs.map((blog) => (
              <div className="col-md-4 mb-4" key={blog.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                    <p className="card-text">{blog.content.slice(0, 80)}...</p>
                    <p className="text-muted small">By {blog.author}</p>
                    <div className="d-flex justify-content-between">
                      <Link
                        to={`/blogs/${blog.id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        View
                      </Link>
                      <Link
                        to={`/edit/${blog.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {[...Array(totalPages).keys()].map((number) => (
                <li
                  key={number + 1}
                  className={`page-item ${
                    currentPage === number + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(number + 1)}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default BlogList;
