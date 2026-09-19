import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/categories")} style={{ textAlign: "center", padding: "2rem", cursor: "pointer" }}>
      <img src="/logo.png" alt="Logo Culture Quiz" style={{ width: 120 }} />
      <h1>Culture Quiz</h1>
      <p>Clique pour commencer</p>
    </div>
  );
}