import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score ?? 0;

  return (
    <div className="page result-page">
      <h1 className="result-title">Score final</h1>
      <p className="result-score">{score} / 10</p>
      <button className="result-button" onClick={() => navigate("/")}>Rejouer</button>
    </div>
  );
}