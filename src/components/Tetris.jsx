import React, { useState } from 'react';

import { createStage } from '../gameHelpers';
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';

import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {

  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player);

  const movePlayer = dir => {
    updatePlayerPos({ x: dir, y: 0 });
  }

  const moveLeft = () => {
    movePlayer(-1)
  }

  const moveRight= () => {
    movePlayer(1)
  }

  const startGame = () => {
    setStage(createStage());
    resetPlayer();
  }

  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false });
  }

  const dropPlayer = () => {
    drop();
  }

  // const move = ({ keycode }) => {
  //   if (!gameOver) {

  //   }
  // }

  function move (e) {
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
      }
    }
  }

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
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
      <StartButton onclick={startGame} />
      </aside>
      </StyledTetris>
      </StyledTetrisWrapper>
      );

};

export default Tetris;
