import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
// import { stat } from "fs";

class Quiz extends Component {
  otv = 3654 - 2454;
  otv2 = 348 / 4;
  otv3 = 1856 + 932;
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: "Алый это?",
        rightAnswerId: 3,
        id: 1,
        answers: [{ text: "Парус?", id: 1 }, { text: "Имя", id: 2 }, { text: "Цвет", id: 3 }, { text: "Другой", id: 4 }]
      },
      {
        question: "Сколько будет 348 / 4?",
        rightAnswerId: 3,
        id: 2,
        answers: [{ text: "123", id: 1 }, { text: "234", id: 2 }, { text: this.otv2, id: 3 }, { text: "678", id: 4 }]
      },
      {
        question: "Сколько будет 3534-2354?",
        rightAnswerId: 2,
        id: 3,
        answers: [{ text: "2365", id: 1 }, { text: this.otv, id: 2 }, { text: "4538", id: 3 }, { text: "3543", id: 4 }]
      },
      {
        question: "Сколько будет 1856 + 932?",
        rightAnswerId: 1,
        id: 4,
        answers: [{ text: this.otv3, id: 1 }, { text: "2574", id: 2 }, { text: "4538", id: 3 }, { text: "3543", id: 4 }]
      }
    ]
  };

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "success") {
        return;
      }
    }
    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;
    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }
      this.setState({
        answerState: { [answerId]: "success" },
        results
      });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          });
        } else {
          this.setState({ activeQuestion: this.state.activeQuestion + 1, answerState: null });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "error";
      this.setState({
        answerState: { [answerId]: "error" },
        results
      });
    }
  };
  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  componentDidMount(){
    console.log("Quiz ID = ", this.props.match.params.id)
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    });
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {this.state.isFinished ? (
            <FinishedQuiz results={this.state.results} quiz={this.state.quiz} onRetry={this.retryHandler} />
          ) : (
            <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}
export default Quiz;
