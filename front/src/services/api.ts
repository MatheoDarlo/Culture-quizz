import type { Category, Question } from "../types/quiz";

const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: "Histoire" },
  { id: 2, name: "Cinéma" },
  { id: 3, name: "Sport" },
];

const MOCK_QUESTIONS: Question[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  categoryId: 1,
  text: `Question exemple n°${i + 1} ?`,
  answers: ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
  correctAnswer: "Réponse A",
}));

export async function getCategories(): Promise<Category[]> {
  // Plus tard : return fetch("http://localhost:PORT/api/categories").then(r => r.json());
  return Promise.resolve(MOCK_CATEGORIES);
}

export async function getQuestionsByCategory(categoryId: number): Promise<Question[]> {
  // Plus tard : return fetch(`http://localhost:PORT/api/categories/${categoryId}/questions`).then(r => r.json());
  return Promise.resolve(MOCK_QUESTIONS);
}