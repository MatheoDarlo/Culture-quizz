import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../services/api";
import type { Category } from "../types/quiz";

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getCategories()
      .then((data) => {
        if (!cancelled) setCategories(data);
      })
      .catch(() => {
        if (!cancelled) setError("Impossible de charger les catégories.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  if (loading) {
    return (
      <div className="page">
        <p className="status-message">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <p className="status-message">{error}</p>
        <button className="result-button" onClick={() => setAttempt((a) => a + 1)}>
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <h2 className="category-title">Choisis une catégorie</h2>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className="category-button"
          onClick={() => navigate(`/quiz/${cat.id}`)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}