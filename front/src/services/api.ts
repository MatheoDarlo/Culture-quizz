import type { Category, Question } from "../types/quiz";

const API_URL = "http://127.0.0.1:8000/api";

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/categories`);

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des catégories");
  }

  const data = await response.json();

  return data.map((category: any) => ({
    id: category.id,
    name: category.categorie,
  }));
}

export async function getQuestionsByCategory(
  categoryId: number
): Promise<Question[]> {
  const response = await fetch(
    `${API_URL}/categories/${categoryId}/questions`
  );

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des questions");
  }

  const data = await response.json();

  return data.map((question: any) => ({
    id: question.id,
    categoryId: question.categorie,
    text: question.question,
    answers: [
      question.reponse1,
      question.reponse2,
      question.reponse3,
      question.reponse4,
      question.reponse5,
      question.reponse6,
      question.reponse7,
      question.reponse8,
      question.reponse9,
      question.reponse10,
    ],
    correctAnswer: question.bonne_reponse,
  }));
}