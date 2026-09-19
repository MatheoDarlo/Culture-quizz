import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score ?? 0;

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Score final</h1>
      <p style={{ fontSize: "2rem" }}>{score} / 10</p>
      <button onClick={() => navigate("/")}>Rejouer</button>
    </div>
  );
}