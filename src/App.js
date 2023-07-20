import "./App.css";
import WordGrid from "./components/WordGrid";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordBank } from "./components/Words";
import { createContext, useEffect, useState } from "react";
import GameEnd from "./components/GameEnd";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordBank, setWordBank] = useState(new Set());
  const [lockedLetters, setLockedLetter] = useState([]);
  const [sptltWord, setSptltWord] = useState("");
  const [gameEnd, setGameEnd] = useState({
    gameEnd: false,
    guessCorrect: false,
  });

  useEffect(() => {
    generateWordBank().then((words) => {
      setWordBank(words.wordBank);
      setSptltWord(words.spotlightWord);
    });
  }, []);

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return; //set increment limit
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return; //if delete from 0, do nothing
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;
    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (wordBank.has(currWord.toLowerCase())) {
      console.log(currWord);
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    } else {
      console.log(currWord);
      alert("Word is not in the Dictionary!");
    }

    if (currWord == sptltWord) {
      setGameEnd({ gameEnd: true, guessCorrect: true });
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameEnd({ gameEnd: true, guessCorrect: false });
    }
  };

  return (
    <div className="App">
      <nav>
        <h1>LEDDER</h1>
      </nav>
      <div className="description-box">
        <p className="description">
          Try to guess the secreat word in 5 or less tries.{" "}
          <span className="green">GREEN</span> a correct letter in the correct
          spot, <span className="yellow">YELLOW</span> is a correct letter in an
          incorrect spots. Will you guess the word ?!{" "}
        </p>
      </div>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onSelectLetter,
          onEnter,
          onDelete,
          sptltWord,
          lockedLetters,
          setLockedLetter,
          gameEnd,
          setGameEnd,
        }}
      >
        <div className="game">
          <WordGrid />
          {gameEnd.gameEnd ? <GameEnd /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
