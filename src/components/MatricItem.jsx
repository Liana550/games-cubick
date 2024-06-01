import React, { useCallback, useState, memo } from "react";
import { Check, Close } from "../assets";
function MatricItem({ position, index, ind, setCount, test }) {
  const [color, setColor] = useState("blueviolet");
  const [text, setText] = useState(false);
  let x, y;
  const click = useCallback(
    (index, ind) => {
      if (x !== index && y !== ind) {
        if (position.colum !== null && position.row !== null && test) {
          x = index;
          y = ind;
          if (index === position.colum && ind === position.row) {
            setColor("green");
            setText(true);
            setCount((prev) => prev + 1);
          } else {
            setColor("red");
            setText(false);
            setCount((prev) => (prev - 1 <= 0 ? 0 : prev - 1));
          }
        }
      }
      setTimeout(() => {
        setColor("blueviolet");
        setText(false);
        x = null;
        y = null;
      }, [1000]);
    },
    [position, test]
  );

  return (
    <div
      className="colum"
      style={{
        background:
          index === position.colum && ind === position.row
            ? !text
              ? "black"
              : color
            : color,
      }}
      onClick={() => {
        click(index, ind);
      }}
    >
      <div className="icon">
        {color === "green" ? <Check /> : color === "red" ? <Close /> : ""}
      </div>
    </div>
  );
}

export default memo(
  MatricItem,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
);
