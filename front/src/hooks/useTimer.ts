import { useEffect, useState } from "react";

export function useTimer(duration: number, onExpire: () => void, resetKey: number) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resetKey]); // se relance à chaque nouvelle question

  return timeLeft;
}