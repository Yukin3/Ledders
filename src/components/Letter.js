import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPos, attemptVal }) {
  const { board, sptltWord, currAttempt, lockedLetters, setLockedLetter } =
    useContext(AppContext);
  const letter = board[attemptVal][letterPos]; //letter of ROW and COLUMN

  const correct = sptltWord.toUpperCase()[letterPos] === letter; //if letter index of correct word is the letter typed
  const almost = !correct && letter !== "" && sptltWord.includes(letter); //if not the correct word and not empty and the spotlight word includes typed word

  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error"); //correct, almost, error

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      //if letter exists and not part of word
      setLockedLetter((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
