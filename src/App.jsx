import { useState, useEffect } from "react";
import Welcome from "./components/Welcome.jsx";
import Quiz from "./components/Quiz.jsx";
import "./App.css";

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const [correctAns, setCorrectAns] = useState([]);

  async function startQuiz() {
    setShowWelcome(false);
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=18&type=multiple"
      );
      const data = await response.json();
      storeQuizData(data.results);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  }

  function storeQuizData(data) {
    const quiz = [];

    for (let question of data) {
      setCorrectAns((oldAns) => {
        return [...oldAns, question.correct_answer];
      });

      const options = question.incorrect_answers;
      options.push(question.correct_answer);
      const shuffledOptions = shuffleArray(options);
      const questionData = {
        question: question.question,
        options: shuffledOptions,
      };

      quiz.push(questionData);
    }

    setQuizData(quiz);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <main>
      {showWelcome && <Welcome onClick={() => startQuiz()} />}
      {!showWelcome && (
        <Quiz
          data={quizData}
          correctAns={correctAns}
          start={() => startQuiz()}
        />
      )}
    </main>
  );
}
