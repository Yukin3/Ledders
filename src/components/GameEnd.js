import React, { useContext } from "react";
import { AppContext } from "../App";

function GameEnd() {
  const { gameEnd, setGameEnd, sptltWord, currAttempt } =
    useContext(AppContext);
  return (
    <div className="gameOver">
      <h3>
        {gameEnd.guessCorrect
          ? "Congrats! You guessed the word🎉"
          : "You've failed...Try again"}
      </h3>
      <h1>The word was: {sptltWord} </h1>
      {gameEnd.guessCorrect && (
        <h3>You guessed it in {currAttempt.attempt} tries </h3>
      )}
      <button
        className="play-again"
        onClick={() => window.location.reload(true)}
      >
        PLAY AGAIN ?
      </button>
    </div>
  );
}

export default GameEnd;
