import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import "../styles/hero.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

export default function Hero() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="hero"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Bootstrap Carousel as Background */}
      <div id="carouselExampleIndicators" className="carousel slide hero-carousel" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=600/" alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://images.pexels.com/photos/3531895/pexels-photo-3531895.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://images.pexels.com/photos/6778656/pexels-photo-6778656.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Third slide" />
          </div>
        </div>
      </div>

      {/* Overlay Content */}
      <div className="hero-content">
        <h2 className="hero-title">Split Expenses with Ease</h2>
        <p className="hero-description">
          Manage group expenses, track payments, and settle balances seamlessly with Money Splitter.
        </p>
        <Button variant="default" onClick={() => navigate("/create-group")}>
          Get Started
        </Button>
      </div>
    </motion.div>
  );
}
