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

  // Gestion loading / erreur
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    getQuestionsByCategory(Number(categoryId))
      .then((data) => {
        if (!cancelled) {
          setQuestions(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Impossible de charger les questions.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [categoryId, attempt]);

  const currentQuestion = questions[currentIndex];

  const goToNext = (finalScore: number = score) => {
    setSelected(null);
    if (currentIndex + 1 >= questions.length) {
<<<<<<< Updated upstream
      navigate("/result", { state: { score } });
=======
      navigate("/result", { state: { score: finalScore } });
>>>>>>> Stashed changes
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const timeLeft = useTimer(30, goToNext, currentIndex);

  const handleAnswer = (answer: string) => {
    if (selected) return;
    setSelected(answer);

    const isCorrect = answer === currentQuestion.correctAnswer;
    const updatedScore = isCorrect ? score + 1 : score;

    if (isCorrect) setScore(updatedScore);
    setTimeout(() => goToNext(updatedScore), 1000);
  };

  if (loading) {
    return (
      <div className="page">
        <p className="status-message">Chargement des questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <p className="status-message">{error}</p>

        <button
          className="result-button"
          onClick={() => setAttempt((a) => a + 1)}
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="page">
        <p className="status-message">
          Aucune question disponible.
        </p>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="quiz-timer">⏱ {timeLeft}s</div>

      <h2 className="quiz-question">
        {currentQuestion.text}
      </h2>

      {currentQuestion.answers.map((answer) => {
        let extraClass = "";

        if (selected) {
          if (answer === currentQuestion.correctAnswer) {
            extraClass = "correct";
          } else if (answer === selected) {
            extraClass = "wrong";
          }
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

      <p className="quiz-progress">
        Question {currentIndex + 1} / {questions.length}
      </p>
    </div>
  );
}