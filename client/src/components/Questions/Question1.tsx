import React from "react";

interface IAnswer {
  answer_id: number;
  answer_text: string;
  score_value: number;
}

interface QuestionProps {
  question: {
    question_id: number;
    question_text: string;
  };
  answers: IAnswer[]; // Recevoir les réponses ici
  selectedAnswers: number[];
  onSelectAnswer: (questionId: number, answerId: number) => void;
}

class Question1 extends React.Component<QuestionProps> {
  render() {
    const { question, answers, selectedAnswers, onSelectAnswer } = this.props;
    return (
      <div className="card">
        <h3>{question.question_text}</h3>
        {answers?.map((answer) => (
          <div key={answer.answer_id}>
            <input
              type="radio"
              name={`question-${question.question_id}`}
              value={answer.answer_id}
              checked={selectedAnswers.includes(answer.answer_id)}
              onChange={() =>
                onSelectAnswer(question.question_id, answer.answer_id)
              }
            />
            <span>{answer.answer_text}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default Question1;
