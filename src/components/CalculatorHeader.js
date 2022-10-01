import React, { useEffect, useRef } from "react";
import classes from "./CalculatorHeader.module.css";

const CalculatorHeader = (props) => {
  const resultRef = useRef();
  const expressionRef = useRef();
  useEffect(() => {
    resultRef.current.scrollIntoView();
  }, [props.history]);
  useEffect(() => {
    expressionRef.current.scrollLeft = expressionRef.current.scrollWidth;
  }, [props.expression]);

  return (
    <div className={`${classes.header} ${classes.custom_scroll} `}>
      <div className={`${classes.history}`}>
        {props.history &&
          props.history?.map((item) => {
            return <p key={item + "" + Math.random() * 44}>{item}</p>;
          })}
      </div>
      <br />
      <div
        ref={expressionRef}
        className={`${classes.expression} ${classes.custom_scroll}`}
      >
        <p>{props.expression}</p>
      </div>
      <p ref={resultRef} className={classes.result}>
        {props.result}
      </p>
    </div>
  );
};

export default CalculatorHeader;
