import React, { useState, useEffect } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

function App() {
  const { width, height } = useWindowSize();
  const [win, setWin] = useState(false);

  const [dice, setDice] = useState(() =>
    Array.from({ length: 10 }, (x) => ({
      clicked: false,
      value: Math.floor(Math.random() * 6) + 1,
    }))
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
  const handleClick = (die, i) => {
    setDice((prevDice) => {
      const newDice = [...prevDice];
      console.log("newDice", newDice, !die.clicked);
      newDice[i].clicked = !die.clicked;
      return newDice;
    });
  };
  useEffect(() => {
    setWin(dice.every((die) => die.clicked === true));
  }, [dice]);
  return (
    <main className=" mx-auto my-12 min-h-[517px] bg-white flex items-center justify-center scale-[1.5]">
      <div className="w-[360px] min-h-[379px] flex items-center justify-center bg-[#0B2434]">
        {win && <Confetti width={width} height={height} />}
        <div className="max-w-[320px] min-h-[320px] bg-[#F5F5F5] flex flex-col justify-center gap-4 items-center">
          <h1 className="text-[25.6px] leading-[29.93px] tracking-[-3%] font-bold text-center">
            Tenzies
          </h1>
          <p className="text-[13.11px] leading-[15.86px] tracking-[-3%] text-center font-normal">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="grid grid-cols-5 gap-2">
            {dice.map((die, i) => (
              <button
                onClick={() => handleClick(die, i)}
                className={`w-[35.84px] ${
                  die.clicked ? "bg-[#59E391]" : "bg-white"
                }  aspect-square text-[20.59px] leading-[24.07px] shadow-lg text-center flex items-center justify-center`}
              >
                {die.value}
              </button>
            ))}
          </div>
          {!win ? (
            <button
              onClick={roll}
              className="bg-[#5035FF] text-white text-[16.38px] leading-[19.15px] font-bold h-[35.84px] w-[92.16px] flex items-center justify-center"
            >
              Roll
            </button>
          ) : (
            <button
              onClick={() => {
                setWin(0);

                setDice(
                  Array.from({ length: 10 }, (x) => ({
                    clicked: false,
                    value: Math.floor(Math.random() * 6) + 1,
                  }))
                );
              }}
              className="bg-[#5035FF] text-white text-[16.38px] leading-[19.15px] font-bold h-[35.84px] w-[92.16px] flex items-center justify-center"
            >
              Play again
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
