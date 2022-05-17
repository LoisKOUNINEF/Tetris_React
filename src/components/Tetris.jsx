import React, { useState } from 'react';

import { createStage, checkCollision } from '../gameHelpers';
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';

import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {

  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

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
  }

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false })
    } else {
      if (player.pos.y < 1) {
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
        setDropTime(1000);
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
      <Display gameOver={gameOver} text="Game Over" />
      ) : (
      <div>
      <Display text="Score"/>
      <Display text="Rows"/>
      <Display text="Level"/>
      </div>
      )}
      <StartButton callback={startGame} />
      </aside>
      </StyledTetris>
      </StyledTetrisWrapper>
      );

};

export default Tetris;
