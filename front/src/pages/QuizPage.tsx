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

  const goToNext = (newScore = score) => {
  setSelected(null);

    if (currentIndex + 1 >= questions.length) {
      navigate("/result", { state: { score: newScore } });
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const timeLeft = useTimer(30, goToNext, currentIndex);

  const handleAnswer = (answer: string) => {
  if (selected) return;

  setSelected(answer);

  const isCorrect = answer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore((s) => s + 1);
    }

    setTimeout(() => {
      goToNext(isCorrect ? score + 1 : score);
    }, 1000);
  };

  if (!currentQuestion) return <p className="page">Chargement...</p>;

  return (
    <div className="page">
      <div className="quiz-timer">⏱ {timeLeft}s</div>
      <h2 className="quiz-question">{currentQuestion.text}</h2>
      {currentQuestion.answers.map((answer) => {
        let extraClass = "";
        if (selected) {
          if (answer === currentQuestion.correctAnswer) extraClass = "correct";
          else if (answer === selected) extraClass = "wrong";
        }
        return (
          <button
            key={answer}
            className={`answer-button ${extraClass}`}
            onClick={() => handleAnswer(answer)}
            disabled={!!selected}
          >
            {answer}
          </button>
        );
      })}
      <p className="quiz-progress">Question {currentIndex + 1} / {questions.length}</p>
    </div>
  );
}