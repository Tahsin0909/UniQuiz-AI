import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Question } from "@/lib/schemas";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  RefreshCw,
  X,
} from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import QuizReview from "./quiz-overview";
import QuizScore from "./score";
import SmoothScrolling from "./smoothScroll/SmoothScroll";

type QuizProps = {
  questions: Question[];
  clearPDF: () => void;
  title: string;
  showhint: boolean,
  setShowHint: Dispatch<SetStateAction<boolean>>,
};

const QuestionCard: React.FC<{
  question: Question;
  showhint: boolean,
  setShowHint: Dispatch<SetStateAction<boolean>>,
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  isSubmitted: boolean;
  showCorrectAnswer: boolean;
}> = ({ question, selectedAnswer, onSelectAnswer, showCorrectAnswer, showhint,
  setShowHint, }) => {
    const answerLabels = ["A", "B", "C", "D"];

    // console.log(selectedAnswer);
    return (
      <div className="space-y-6 w-full">
        <h2 className="text-lg font-semibold leading-tight pr-2">
          {question.question}
          <div
            className={`flex gap-2 items-center `}
          >
            <span className={`px-2 py-1 rounded text-white capitalize text-sm  ${question.difficulty === "easy"
              ? "bg-green-500" // Green for Easy
              : question.difficulty === "medium"
                ? "bg-yellow-500" // Yellow for Medium
                : "bg-red-500" // Red for Hard
              }`}>{question.difficulty}</span>
            {question.difficulty === "hard" && (
              <div className={`group relative w-fit hover:cursor-pointer `}>
                <svg
                  onClick={() => setShowHint(!showhint)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 32 32"
                  className="hint-icon"
                >
                  <path
                    fill="#FFEB3B"
                    d="M6.813 2.406L5.405 3.812L7.5 5.906L8.906 4.5zm18.375 0L23.093 4.5L24.5 5.906l2.094-2.093zM16 3.03q-.495.004-1 .064h-.03c-4.056.465-7.284 3.742-7.845 7.78c-.448 3.25.892 6.197 3.125 8.095a5.24 5.24 0 0 1 1.75 3.03v6h2.28c.348.597.983 1 1.72 1s1.372-.403 1.72-1H20v-4h.094v-1.188c0-1.466.762-2.944 2-4.093C23.75 17.06 25 14.705 25 12c0-4.94-4.066-9.016-9-8.97m0 2c3.865-.054 7 3.11 7 6.97c0 2.094-.97 3.938-2.313 5.28l.032.032A7.8 7.8 0 0 0 18.279 22h-4.374c-.22-1.714-.955-3.373-2.344-4.563c-1.767-1.5-2.82-3.76-2.468-6.312c.437-3.15 2.993-5.683 6.125-6.03a7 7 0 0 1 .78-.064zM2 12v2h3v-2zm25 0v2h3v-2zM7.5 20.094l-2.094 2.093l1.407 1.407L8.905 21.5zm17 0L23.094 21.5l2.093 2.094l1.407-1.407zM14 24h4v2h-4z"
                    strokeWidth="0.2"
                    stroke="#FFEB3B"
                  />
                </svg>
                <span className="group-hover:opacity-100 opacity-0 transition-opacity absolute text-xs p-[2px]  bg-[#FFEB3B] -right-8 top-2">Hint</span>
              </div>
            )}
          </div>



        </h2>

        <div className="grid grid-cols-1 gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`flex items-center py-6 px-4 justify-start text-left whitespace-normal rounded-2xl  hover:bg-blue-300  ${showCorrectAnswer && answerLabels[index] === question.answer
                ? "bg-green-600 hover:bg-green-700"
                : showCorrectAnswer &&
                  selectedAnswer === answerLabels[index] &&
                  selectedAnswer !== question.answer
                  ? "bg-red-600 hover:bg-red-700"
                  : selectedAnswer === answerLabels[index] ? "btn-gradient" : ""
                }`}
              onClick={() => onSelectAnswer(answerLabels[index])}
            >
              <span className="text-lg font-medium mr-4 shrink-0">
                {answerLabels[index]}
              </span>
              <span className="flex-grow ">{option}</span>
              {(showCorrectAnswer && answerLabels[index] === question.answer) ||
                (selectedAnswer === answerLabels[index] && (
                  <Check className="ml-2 shrink-0 text-white absolute right-2" size={20} />
                ))}
              {showCorrectAnswer &&
                selectedAnswer === answerLabels[index] &&
                selectedAnswer !== question.answer && (
                  <X className="ml-2 shrink-0 text-white" size={20} />
                )}
            </button>
          ))}
        </div>
        {
          (showhint && question.difficulty === "hard") && <p className=" py-1"><span className="text-[#d8c731] font-semibold">Hint:</span> {question.hint}</p>
        }

      </div>
    );
  };


export default function Quiz({
  questions,
  clearPDF,
  showhint,
  setShowHint,
  title = "Quiz",
}: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill(null),
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((currentQuestionIndex / questions.length) * 100);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex, questions.length]);

  const handleSelectAnswer = (answer: string) => {
    if (!isSubmitted) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = answer;
      setAnswers(newAnswers);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setShowHint(false)
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowHint(false)
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setShowHint(false)
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const correctAnswers = questions.reduce((acc, question, index) => {
      return acc + (question.answer === answers[index] ? 1 : 0);
    }, 0);
    setScore(correctAnswers);
  };

  const handleReset = () => {
    setAnswers(Array(questions.length).fill(null));
    setIsSubmitted(false);
    setScore(null);
    setCurrentQuestionIndex(0);
    setProgress(0);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="h-full">
      <main className={`container flex items-center justify-center w-full  ${isSubmitted ? "" : "h-screen"}`}>
        <div className={` py-12 rounded-lg  w-full max-w-xl ${isSubmitted ? "" : "shadow-xl px-20 "}`}>
          <h1 className="text-3xl font-bold mb-8 text-center capitalize">
            {title}
          </h1>
          <div className="relative">
            {!isSubmitted && <Progress value={progress} className="h-1 mb-8" />}
            <div className="w-full ">
              {" "}
              {/* Prevent layout shift */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={isSubmitted ? "results" : currentQuestionIndex}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {!isSubmitted ? (

                    <div className="space-y-8 w-full">
                      <QuestionCard
                        showhint={showhint}
                        setShowHint={setShowHint}
                        question={currentQuestion}
                        selectedAnswer={answers[currentQuestionIndex]}
                        onSelectAnswer={handleSelectAnswer}
                        isSubmitted={isSubmitted}
                        showCorrectAnswer={false}
                      />
                      <div className="flex justify-between items-center pt-4">
                        <Button
                          onClick={handlePreviousQuestion}
                          disabled={currentQuestionIndex === 0}
                          variant="ghost"
                        >
                          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                        </Button>
                        <span className="text-sm font-medium">
                          {currentQuestionIndex + 1} / {questions.length}
                        </span>
                        <Button
                          onClick={handleNextQuestion}
                          disabled={answers[currentQuestionIndex] === null}
                          variant="ghost"
                        >
                          {currentQuestionIndex === questions.length - 1
                            ? "Submit"
                            : "Next"}{" "}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <SmoothScrolling>
                      <div className="space-y-8 w-full">
                        <QuizScore
                          correctAnswers={score ?? 0}
                          totalQuestions={questions.length}
                        />
                        <div className="space-y-12">
                          <QuizReview questions={questions} userAnswers={answers} />
                        </div>
                        <div className="flex justify-center space-x-4 pt-4">
                          <Button
                            onClick={handleReset}
                            variant="outline"
                            className="bg-muted hover:bg-muted/80 w-full"
                          >
                            <RefreshCw className="mr-2 h-4 w-4" /> Reset Quiz
                          </Button>
                          <Button
                            onClick={clearPDF}
                            className="bg-primary hover:bg-primary/90 w-full"
                          >
                            <FileText className="mr-2 h-4 w-4" /> Try Another PDF
                          </Button>
                        </div>
                      </div>
                    </SmoothScrolling>

                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
