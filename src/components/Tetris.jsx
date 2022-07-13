import React, { useState } from 'react';

import { createStage, checkCollision } from '../gameHelpers';
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';

import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {

  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, clearedRows] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel, currentBest, setCurrentBest] = useGameStatus(clearedRows);

  let dropSpeed = 1000 / (level + 1) + 200

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0})) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  }

  const moveLeft = () => {
    movePlayer(-1)
  }

  const moveRight = () => {
    movePlayer(1)
  }

  const rotateRight = () => {
    playerRotate(stage, 1);
  }

  const rotateLeft = () => {
    playerRotate(stage, -1);
  }

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
    setCurrentBest(localStorage.bestTetrisScore ? JSON.parse(localStorage.bestTetrisScore) : 0);
  }

    const submitScore = () => {
    let userScore = parseInt(localStorage.bestTetrisScore);

    const userEmail = localStorage.sharcadEmail
    ? JSON.parse(localStorage.sharcadEmail)
    : prompt("Enter your shaRcade email to send your score !");

    if (userEmail) {
      localStorage.setItem("sharcadEmail", JSON.stringify(userEmail));

      const data = {
        "score_token" : {
          "hi_score" : userScore,
          "api_key" : "4BmxyQvTrc6wRTkm",
          "user_email" : userEmail
        }
      };
      fetch(`https://sharcade-api.herokuapp.com/sharcade_api`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .catch((error) => console.log(error));
    }
  }


  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      setDropTime(dropSpeed);
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false })
    } else {
      if (player.pos.y < 1) {
        submitScore();
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  }

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  }

  const stop = (e) => {
    if (!gameOver) {
      switch (e.key) {
        case 'ArrowDown':
        setDropTime(dropSpeed);
        break
      }
    }
  }

  const move = (e) => {
    if (!gameOver) {
      switch (e.key) {
        case 'ArrowDown':
        dropPlayer()
        break
        case 'ArrowLeft':
        moveLeft()
        break
        case 'ArrowRight':
        moveRight()
        break
        case 'ArrowUp':
        rotateRight();
        break
        case 'a':
        rotateLeft();
        break
        case 'e':
        rotateRight();
        break
        // case 'Space':
        // startGame();
        // break
      }
    }
  }

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={e => stop(e)}>
    <StyledTetris>
    <Stage stage={stage} />
    <aside>
    {gameOver ? (
      <div>
      <Display text={`Score: ${score}`}/>
      <Display text={`Lines: ${rows}`}/>
      <Display gameOver={gameOver} text="Game Over" />
      </div>
      ) : (
      <div>
      <Display text={`Score: ${score}`}/>
      <Display text={`Lines: ${rows}`}/>
      <Display text={`Level: ${level + 1}`}/>
      </div>
      )}
      <StartButton callback={startGame} />
      <Display text={`Best Score: ${currentBest}`} />
      </aside>
      </StyledTetris>
      </StyledTetrisWrapper>
      );

};

export default Tetris;
