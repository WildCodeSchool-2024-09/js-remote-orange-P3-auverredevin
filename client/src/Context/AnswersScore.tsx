import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface IAnswer {
  questionId: number;
  answerId: number;
  scoreValue: number;
}

interface IAnswersContext {
  answers: IAnswer[];
  setAnswers: (answers: IAnswer[]) => void;
}

const AnswersContext = createContext<IAnswersContext | undefined>(undefined);

export const AnswersProvider = ({ children }: { children: ReactNode }) => {
  const [answers, setAnswers] = useState<IAnswer[]>([]);

  return (
    <AnswersContext.Provider value={{ answers, setAnswers }}>
      {children}
    </AnswersContext.Provider>
  );
};

export const useAnswers = () => {
  const context = useContext(AnswersContext);
  if (!context) {
    throw new Error("useAnswers must be used within an AnswersProvider");
  }
  return context;
};
