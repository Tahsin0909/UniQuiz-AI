import { Question } from '@/lib/schemas'
import { Check, X } from 'lucide-react'


interface QuizReviewProps {
  questions: Question[]
  userAnswers: string[]
}

export default function QuizReview({ questions, userAnswers }: QuizReviewProps) {
  const answerLabels: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"]

  return (
    <div className="w-full">
      <div>
        <p className="text-2xl font-bold mx-4 mb-2">Quiz Review</p>
      </div>
      <div className="p-4 w-full">
        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="mb-8 last:mb-0 w-full">
            <h3 className="text-lg font-semibold mb-4"> {questionIndex + 1}. {question.question}</h3>
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => {
                const currentLabel = answerLabels[optionIndex]
                const isCorrect = currentLabel === question.answer
                const isSelected = currentLabel === userAnswers[questionIndex]
                const isIncorrectSelection = isSelected && !isCorrect

                return (
                  <div
                    key={optionIndex}
                    className={`flex items-center w-full p-4 rounded-lg ${isCorrect
                      ? 'bg-green-400 dark:bg-green-700/50'
                      : isIncorrectSelection
                        ? 'bg-red-400 dark:bg-red-700/50'
                        : 'border border-border'
                      }`}
                  >
                    <span className="text-lg font-medium mr-4 w-6">{currentLabel}</span>
                    <span className="flex-grow">{option}</span>
                    {isCorrect && (
                      <Check className="ml-2 text-green-600 dark:text-green-400" size={20} />
                    )}
                    {isIncorrectSelection && (
                      <X className="ml-2 text-red-600 dark:text-red-400" size={20} />
                    )}

                  </div>
                )
              })}
            </div>
            <p className='leading-snug mt-3'>  <span className='font-semibold pr-1 text-blue-500'>Source:</span> {question.sourceText}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

