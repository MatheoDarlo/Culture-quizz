export interface Category {
  id: number;
  name: string;
}

export interface Question {
  id: number;
  categoryId: number;
  text: string;
  answers: string[]; // 4 réponses affichées
  correctAnswer: string;
}