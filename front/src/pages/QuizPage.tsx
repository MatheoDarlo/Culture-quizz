import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestionsByCategory } from "../services/api";
import type { Question } from "../types/quiz";
import { useTimer } from "../hooks/useTimer";

export default function QuizPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    getQuestionsByCategory(Number(categoryId)).then(setQuestions);
  }, [categoryId]);

  const currentQuestion = questions[currentIndex];

  const goToNext = () => {
    setSelected(null);
    if (currentIndex + 1 >= questions.length) {
      navigate("/result", { state: { score } });
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const timeLeft = useTimer(30, goToNext, currentIndex);

  const handleAnswer = (answer: string) => {
    if (selected) return; // déjà répondu
    setSelected(answer);
    if (answer === currentQuestion.correctAnswer) {
      setScore((s) => s + 1);
    }
    setTimeout(goToNext, 1000); // laisse voir la couleur 1s avant de passer
  };

  if (!currentQuestion) return <p>Chargement...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ textAlign: "right", fontWeight: "bold" }}>⏱ {timeLeft}s</div>
      <h2>{currentQuestion.text}</h2>
      {currentQuestion.answers.map((answer) => {
        let bgColor = "white";
        if (selected) {
          if (answer === currentQuestion.correctAnswer) bgColor = "lightgreen";
          else if (answer === selected) bgColor = "salmon";
        }
        return (
          <button
            key={answer}
            onClick={() => handleAnswer(answer)}
            disabled={!!selected}
            style={{ display: "block", width: "100%", padding: "1rem", margin: "0.5rem 0", backgroundColor: bgColor, color: "black" }}
          >
            {answer}
          </button>
        );
      })}
      <p>Question {currentIndex + 1} / {questions.length}</p>
    </div>
  );
}