import React, { useCallback, useEffect, useState, memo } from "react";
import MatricItem from "./MatricItem";
const array = [
  [1, 1, 1],
  [2, 2, 2],
  [3, 3, 3],
];
function Matric() {
  const [test, setTest] = useState(false);
  const [time, setTime] = useState(60);
  const [count, setCount] = useState(0);
  const [level, setLevel] = useState(1);
  const [second, setSecond] = useState(1700);
  const [text, setText] = useState("");
  const [position, setPosition] = useState({ colum: null, row: null });
  const play = useCallback(() => {
    setTest(!test);
    text === "YOU LOSE" || text === "YOU WIN" ? setLevel(1) : setLevel(level);
    text === "YOU LOSE" || text === "YOU WIN" || (level === 1 && time === 60)
      ? setText("Level 1/10")
      : setText(text);
    text === "YOU LOSE" || text === "YOU WIN" ? setCount(0) : setCount(count);
    text === "YOU LOSE" || text === "YOU WIN"
      ? setSecond(1700)
      : setSecond(second);

    setTimeout(() => {
      setText("");
    }, 500);
  }, [test, count, time, level, text]);
  console.log(text);
  useEffect(() => {
    const int = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    if (!test) {
      clearInterval(int);
    }
    if (time === 0) {
      if (count < 50) {
        setText("YOU LOSE");
      }
      setTest(false);
      setPosition({ colum: null, row: null });
      setTime(60);
    }
    return () => clearInterval(int);
  }, [test, time]);
  useEffect(() => {
    if (count === 50) {
      setText("YOU WIN");
      setTest(false);
      setPosition({ colum: null, row: null });
      setTime(60);
    }
    if (count === 10 * level && count !== 50) {
      setSecond(second - level * 300 < 800 ? 700 : second - level * 300);
      setText(`Level ${level + 1}/${(level + 1) * 10}`);
      setLevel(count === 50 ? level : level + 1);
      setTimeout(() => {
        setText("");
      }, 500);
    }
  }, [count]);
  useEffect(() => {
    const int1 = setTimeout(() => {
      setPosition({
        colum: Math.floor(Math.random() * 3),
        row: Math.floor(Math.random() * 3),
      });
    }, second);
    if (!test) {
      clearInterval(int1);
    }
    return () => clearInterval(int1);
  }, [position, test]);

  return (
    <div className="container">
      <div className="matrica">
        <div className="text" style={{ right: text ? "20%" : "" }}>
          {text}
        </div>
        <div className="start">
          <div className="button">
            <button onClick={play}>{test ? "STOP" : "START"}</button>
          </div>
          <div className="timer">
            {time === 60 ? "00:00" : time > 9 ? `00:${time}` : `00:0${time}`}
          </div>
        </div>
        {array.map((elem, index) => (
          <div className="row" key={index}>
            {elem.map((el, ind) => (
              <MatricItem
                key={ind}
                position={position}
                index={index}
                ind={ind}
                test={test}
                setCount={setCount}
                count={count}
              />
            ))}
          </div>
        ))}
        <div
          className="bottom"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: " 0 10px",
          }}
        >
          <div className="level">Level {level}</div>
          <div className="count">{count}/50</div>
        </div>
      </div>
    </div>
  );
}

export default memo(
  Matric,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
);
