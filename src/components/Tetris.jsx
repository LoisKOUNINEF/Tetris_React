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
    let userScore = parseInt(localStorage.currentTetrisScore);

    const userEmail = localStorage.sharcadEmail
    ? JSON.parse(localStorage.sharcadEmail)
    : prompt("Enter your shaRcade email to send your score !");

    if (userEmail) {
      localStorage.setItem("sharcadEmail", JSON.stringify(userEmail));
      const _0x37e29f=_0x5a84;function _0x5e9a(){const _0x984ed=['5913424DmeniF','24UnYBqN','50qCqlON','7169060GCbWax','bb93WINzX14NWjRX','49754ImZZSY','28XnKnUJ','12CrtiFy','1144698YuafsX','5257080GwtDJV','22851jdcvFw','7992578kzVeFm'];_0x5e9a=function(){return _0x984ed;};return _0x5e9a();}(function(_0x4e5bec,_0x4da009){const _0x2a4736=_0x5a84,_0x3a900c=_0x4e5bec();while(!![]){try{const _0x146b60=-parseInt(_0x2a4736(0x151))/0x1*(-parseInt(_0x2a4736(0x149))/0x2)+-parseInt(_0x2a4736(0x14e))/0x3*(-parseInt(_0x2a4736(0x14b))/0x4)+-parseInt(_0x2a4736(0x153))/0x5+-parseInt(_0x2a4736(0x14c))/0x6*(parseInt(_0x2a4736(0x14a))/0x7)+-parseInt(_0x2a4736(0x150))/0x8+-parseInt(_0x2a4736(0x14d))/0x9+-parseInt(_0x2a4736(0x152))/0xa*(-parseInt(_0x2a4736(0x14f))/0xb);if(_0x146b60===_0x4da009)break;else _0x3a900c['push'](_0x3a900c['shift']());}catch(_0x3ca5ec){_0x3a900c['push'](_0x3a900c['shift']());}}}(_0x5e9a,0xb2de7));function _0x5a84(_0x3bd6bf,_0x2a5b13){const _0x5e9a6d=_0x5e9a();return _0x5a84=function(_0x5a8453,_0x5b72a5){_0x5a8453=_0x5a8453-0x148;let _0x187e1a=_0x5e9a6d[_0x5a8453];return _0x187e1a;},_0x5a84(_0x3bd6bf,_0x2a5b13);}const API_KEY=_0x37e29f(0x148);
      const data = {
        "score_token" : {
          "hi_score" : userScore,
          "api_key" : API_KEY,
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
