import { useEffect, useRef, useState } from "react";

type UseTimerOpts = {
  initialSeconds: number;
  autoStart?: boolean;
  onExpire?: () => void;
};

export function useTimer({ initialSeconds, autoStart = true, onExpire }: UseTimerOpts) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [running, setRunning] = useState(autoStart);
  const expiredRef = useRef(false);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
    expiredRef.current = false;
  }, [initialSeconds]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          if (!expiredRef.current) {
            expiredRef.current = true;
            onExpire?.();
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, onExpire]);

  const isWarning = secondsLeft <= 5 * 60 && secondsLeft > 60;
  const isCritical = secondsLeft <= 60 && secondsLeft > 0;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formatted = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return {
    secondsLeft,
    isWarning,
    isCritical,
    formatted,
    running,
    start: () => setRunning(true),
    pause: () => setRunning(false),
    reset: (s?: number) => {
      setSecondsLeft(s ?? initialSeconds);
      expiredRef.current = false;
    },
    setSecondsLeft,
  };
}
