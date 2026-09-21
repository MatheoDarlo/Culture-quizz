import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="page home-page" onClick={() => navigate("/categories")}>
      <img src="/logo.png" alt="Logo Culture Quiz" className="home-logo" />
      <h1 className="home-title">Culture Quiz</h1>
      <p className="home-hint">Clique pour commencer</p>
    </div>
  );
}