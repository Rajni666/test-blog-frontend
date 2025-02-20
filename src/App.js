import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import BlogList from "./pages/BlogList";
import BlogDetails from "./pages/BlogDetails";
import BlogForm from "./pages/BlogForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/create" element={<BlogForm />} />
        <Route path="/edit/:id" element={<BlogForm />} />
      </Routes>
    </Router>
  );
}

export default App;
