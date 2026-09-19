import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../services/api";
import type { Category } from "../types/quiz";

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Choisis une catégorie</h2>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => navigate(`/quiz/${cat.id}`)}
          style={{ display: "block", width: "100%", padding: "1rem", margin: "0.5rem 0" }}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}