import wordSet from "../../src/fiveletterwords.txt";
export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordBank = async () => {
  let wordBank;
  let spotlightWord;
  await fetch(wordSet)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\n");
      spotlightWord = wordArr[Math.floor(Math.random() * wordArr.length)];
      wordBank = new Set(wordArr);
    });
  return { wordBank, spotlightWord };
};
