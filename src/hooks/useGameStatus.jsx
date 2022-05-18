import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = clearedRows => {
  const [currentBest, setCurrentBest] = useState(localStorage.bestSnakeScore ? JSON.parse(localStorage.bestSnakeScore) : 0)
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const linePoints = [40, 100, 300, 1200];

  const calcScore = useCallback(() => {
    if (clearedRows > 0) {
      setScore(prev => prev + linePoints[clearedRows - 1] * (level + 1));
      setRows(prev => prev + clearedRows);
    }
    if (score >= currentBest) {
      setCurrentBest(score);
      localStorage.setItem("bestSnakeScore", JSON.stringify(currentBest))
    }
  }, [level, linePoints, clearedRows]);

  useEffect(() => {
    calcScore();
  }, [calcScore, clearedRows, score]);

  return [score, setScore, rows, setRows, level, setLevel, currentBest, setCurrentBest];

};
