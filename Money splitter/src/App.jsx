import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import CreateGroup from "./pages/CreateGroup"; 
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar is always present */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create-group" element={<CreateGroup />} />
        
      </Routes>
      
    </Router>
  );
}

export default App;
