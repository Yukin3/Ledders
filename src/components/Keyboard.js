import React, { useContext, useCallback, useEffect } from "react";
import { AppContext } from "../App";
import Key from "./Key";

function Keyboard() {
  const { onEnter, onDelete, onSelectLetter, lockedLetters } =
    useContext(AppContext);

  //ARRAY OF KEYBOARD KEYS
  const kbRow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const kbRow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const kbRow3 = ["Z", "X", "C", "V", "B", "N", "M"];

  //handling keyboard events
  const handleKeyboard = useCallback((event) => {
    if (event.key === "Enter") {
      onEnter();
    } else if (event.key === "Backspace") {
      onDelete();
    } else {
      kbRow1.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      kbRow2.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      kbRow3.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {kbRow1.map((key) => {
          return <Key keyVal={key} locked={lockedLetters.includes(key)} />;
        })}
      </div>
      <div className="line2">
        {kbRow2.map((key) => {
          return <Key keyVal={key} locked={lockedLetters.includes(key)} />;
        })}
      </div>
      <div className="line3">
        <Key keyVal={"DELETE"} bigKey />
        {kbRow3.map((key) => {
          return <Key keyVal={key} locked={lockedLetters.includes(key)} />;
        })}
        <Key keyVal={"ENTER"} bigKey />
      </div>
    </div>
  );
}

export default Keyboard;
