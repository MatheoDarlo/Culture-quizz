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