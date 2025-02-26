import { useState } from "react";
 import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="contact-page">
      {/* <Navbar /> */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Reach out for any queries or feedback.</p>
      </section>

      <section className="contact-form">
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Message</label>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </section>

      <Footer />
    </div>
  );
}
