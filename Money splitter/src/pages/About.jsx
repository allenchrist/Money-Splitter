import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import "../styles/about.css";

export default function About() {
  return (
    <div className="about-page">
      {/* <Navbar /> */}
      <motion.section
        className="about-hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>About Money Splitter</h1>
        <p>Making group expense management simple, fast, and fair.</p>
      </motion.section>

      <section className="about-features">
        <div className="feature">
          <h3>📊 Track Expenses</h3>
          <p>Keep a record of all shared expenses in one place.</p>
        </div>
        <div className="feature">
          <h3>⚡ Instant Splitting</h3>
          <p>Quickly calculate who owes what, without hassle.</p>
        </div>
        <div className="feature">
          <h3>🔒 Secure Payments</h3>
          <p>Send and receive payments securely within the app.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
