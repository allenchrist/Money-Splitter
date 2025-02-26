import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Money Splitter. All rights reserved.</p>
    </footer>
  );
}
