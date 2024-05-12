import React, { useState, useEffect } from "react";
import { decode } from "html-entities";

export default function Quiz(props) {
  const [data, setData] = useState(props.data);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setData(props.data);
    setShowResults(false);
  }, [props.data]);

  function restart() {
    props.start();
    setSelectedOptions([]);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1300);

    const forms = document.getElementsByClassName("question");

    for (let form of forms) {
      form.reset();
    }
    setShowResults(false);
  }

  const handleOptionChange = (questionIndex, optionIndex) => {
    setSelectedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[questionIndex] = optionIndex;
      return updatedOptions;
    });
  }

  const handleCheckAnswers = () => {
    setShowResults(true);
  };

  return (
    <div className="quiz">
      <div className="question-container">
        {data.map((question, index) => {
          return (
            <form key={index} className="question">
              <h3 className="subject">{decode(question.question)}</h3>
              <div className="choice">
                {question.options.map((option, optionIndex) => {
                  return (
                    <React.Fragment key={optionIndex}>
                      <input
                        type="radio"
                        name={`choice${index}`}
                        className="radio"
                        id={`option${index}-${optionIndex}`}
                        onChange={() => handleOptionChange(index, optionIndex)}
                        disabled={showResults}
                      />
                      <label
                        htmlFor={`option${index}-${optionIndex}`}
                        className={
                          showResults &&
                          !props.correctAns.includes(option) &&
                          selectedOptions[index] === optionIndex
                            ? "incorrect-ans"
                            : props.correctAns.includes(option) && showResults
                            ? "correct-ans"
                            : ""
                        }
                      >
                        {decode(option)}
                      </label>
                    </React.Fragment>
                  );
                })}
              </div>
            </form>
          );
        })}
      </div>
      <button
        className="show-ans"
        onClick={!showResults ? handleCheckAnswers : restart}
      >
        {!showResults ? "Check answers" : "Play again"}
      </button>
    </div>
  );
}
