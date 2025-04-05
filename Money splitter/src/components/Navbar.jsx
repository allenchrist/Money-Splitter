import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1  className="logo">💰  Expense Splitter</h1>
      <div className="nav-links">
        <Link to="/">
          <Button variant="ghost">Home</Button>
        </Link>
        <Link to="/about">
          <Button variant="ghost">About</Button>
        </Link>
        <Link to="/contact">
          <Button variant="ghost">Contact</Button>
        </Link>
        <Link to="/login">
          <Button variant="ghost">Login</Button>
        </Link>
        <Link to="/signup">
          <Button variant="ghost">SignUp</Button>
        </Link>
        

      </div>
    </nav>
  );
}
