import React, { useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const getRandomArray = (size) =>
  Array.from({ length: size }, () => ({
    clicked: false,
    value: Math.floor(Math.random() * 6) + 1,
  }));

const App = () => {
  const { width, height } = useWindowSize();
  const [dice, setDice] = useState(() => getRandomArray(10));
  const win = dice.every(
    (die) => die.clicked === true && die.value === dice[0].value
  );
  const roll = () => {
    setDice((dice) => {
      const newDice = dice.map((die) => {
        if (die.clicked) {
          return die;
        } else {
          return {
            ...die,
            value: Math.floor(Math.random() * 6) + 1,
          };
        }
      });
      return newDice;
    });
  };
  const handleClick = (die, index) => {
    setDice((prevDice) => {
      const newDice = [...prevDice];
      newDice[index].clicked = !die.clicked;
      return newDice;
    });
  };
  return (
    <main className=" mx-auto my-12 overflow-x-hidden min-h-[517px] bg-white flex items-center justify-center scale-150">
      <div className="w-[360px] min-h-[379px] flex items-center justify-center bg-[#0B2434]">
        {win && <Confetti width={width} height={height} />}
        <div className="max-w-[320px] min-h-[320px] bg-[#F5F5F5] rounded-[10px] flex flex-col justify-center gap-4 items-center">
          <h1 className="text-[25.6px] leading-[29.93px] tracking-[-3%] font-bold text-center">
            Tenzies
          </h1>
          <p className="text-sm leading-4 tracking-[-3%] text-center font-normal">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="grid grid-cols-5 gap-2">
            {dice.map((die, index) => (
              <button
                onClick={() => handleClick(die, index)}
                className={`w-9 ${
                  die.clicked ? "bg-[#59E391]" : "bg-white"
                }  aspect-square text-xl leading-6 shadow-lg text-center flex items-center justify-center rounded-md`}
              >
                {die.value}
              </button>
            ))}
          </div>
          {!win ? (
            <button
              onClick={roll}
              className="bg-[#5035FF] text-white  leading-5 font-bold h-9 w-24 flex items-center justify-center"
            >
              Roll
            </button>
          ) : (
            <button
              onClick={() => {
                setDice(getRandomArray(10));
              }}
              className="bg-[#5035FF] text-white  leading-5 font-bold h-9 w-24 flex items-center justify-center"
            >
              Play again
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default App;
