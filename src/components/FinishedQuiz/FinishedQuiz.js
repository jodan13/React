import React from "react";
import check from "./check.svg";
import times from "./times.svg";
import classes from "./FinishedQuiz.module.css";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";

const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === "success") {
      total++;
    }
    return total;
  }, 0);
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          const cls = [props.results[quizItem.id] === "error" ? times : check];
          return (
            <li key={index}>
              <strong>{index + 1} </strong>
              {quizItem.question}
              <img src={cls} alt="icon" />
            </li>
          );
        })}
        {/* <li>
          <strong>1. </strong>
          How are you
          <img src={times} alt="times" />
        </li>
        <li>
          <strong>2. </strong>
          How are you
          <img src={check} alt="check" />
        </li> */}
      </ul>
      <p>
        Правильно {successCount} из {props.quiz.length}
      </p>
      <div>
        <Button onClick={props.onRetry} type="primary">
          Повторить
        </Button>
        <Link to="/">
          <Button type="success">
            Перейти в список тестов
          </Button>
        </Link>

      </div>
    </div>
  );
};
export default FinishedQuiz;
