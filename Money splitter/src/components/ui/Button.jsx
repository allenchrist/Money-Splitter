import "../../styles/button.css";

export function Button({ children, onClick, variant = "default" }) {
  return (
    <button onClick={onClick} className={`button ${variant}`}>
      {children}
    </button>
  );
}
