
import { createContext, useContext, useState, ReactNode } from "react";

interface SurveyContextType {
  currentStep: number;
  totalSteps: number;
  answers: Record<string, string>;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  setAnswer: (questionId: string, answer: string) => void;
  goToStep: (step: number) => void;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error("useSurvey must be used within a SurveyProvider");
  }
  return context;
};

interface SurveyProviderProps {
  children: ReactNode;
}

export const SurveyProvider = ({ children }: SurveyProviderProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const totalSteps = 6;  // Updated to include Step5

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps + 1));
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const goToStep = (step: number) => {
    setCurrentStep(Math.max(0, Math.min(step, totalSteps + 1)));
  };

  const setAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  return (
    <SurveyContext.Provider
      value={{
        currentStep,
        totalSteps,
        answers,
        goToNextStep,
        goToPreviousStep,
        setAnswer,
        goToStep,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};
