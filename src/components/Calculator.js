import classes from "./calculator.module.css";
import React, { useEffect, useState } from "react";
import moonIcon from "../Assets/moon.png";
import sunIcon from "../Assets/sun.png";
import CalculatorHeader from "./CalculatorHeader";
import CalculatorKeypad from "./CalculatorKeypad";
const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 106, 107, 109, 8, 13, 187, 189, 190, 191,
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];
const Calculator = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("calculator-app-mode")) || false
  );
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("calculator-app-history")) || []
  );
  const handleKeypress = (keycode, key) => {
    if (!keycode) return;
    if (!usedKeyCodes.includes(keycode)) return;
    if (numbers.includes(key)) {
      if (key === "0") {
        if (expression.length === 0) return;
      }
      calculateResult(expression + key);
      setExpression(expression + key);
    } else if (operators.includes(key)) {
      if (!expression) return;
      const lastChar = expression.slice(-1);
      if (operators.includes(lastChar)) return;
      if (lastChar === ".") return;
      setExpression(expression + key);
    } else if (key === ".") {
      if (!expression) return;
      const lastChar = expression.slice(-1);
      if (!numbers.includes(lastChar)) return;
      setExpression(expression + key);
    } else if (keycode === 8) {
      if (!expression) return;
      calculateResult(expression.slice(0, -1));
      setExpression(expression.slice(0, -1));
    } else if (keycode === 13) {
      if (!expression) return;
      calculateResult(expression);
      let tempHistory = [...history];
      if (tempHistory.length > 20) tempHistory = tempHistory.splice(0, 1);
      tempHistory.push(expression);
      setHistory(tempHistory);
    }
  };

  const calculateResult = (exp) => {
    if (!exp) {
      setResult("");
      return;
    }
    const lastChar = exp.slice(-1);
    if (!numbers.includes(lastChar)) exp = exp.slice(0, -1);
    const answer = eval(exp).toFixed(2) + "";
    setResult(answer);
  };

  useEffect(() => {
    localStorage.setItem("calculator-app-mode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("calculator-app-history", JSON.stringify(history));
  }, [history]);

  return (
    <div
      className={classes.app}
      tabIndex="0"
      onKeyDown={(event) => handleKeypress(event.keyCode, event.key)}
      data-theme={isDarkMode ? "dark" : ""}
    >
      <div className={classes.calculator}>
        <div className={classes.navbar}>
          <div
            onClick={() => {
              setIsDarkMode(!isDarkMode);
            }}
            className={classes.toggle}
          >
            <div
              className={`${classes.circle} ${
                isDarkMode ? classes.circle_active : ""
              }`}
            ></div>
          </div>
          <img src={isDarkMode ? moonIcon : sunIcon} alt={"img"} />
        </div>
        <CalculatorHeader
          expression={expression}
          result={result}
          history={history}
        />
        <CalculatorKeypad handleKeypress={handleKeypress} />
      </div>
    </div>
  );
};

export default Calculator;
