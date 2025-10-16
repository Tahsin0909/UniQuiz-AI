
interface QuizScoreProps {
  correctAnswers: number
  totalQuestions: number
}

export default function QuizScore({ correctAnswers, totalQuestions }: QuizScoreProps) {
  const score = (correctAnswers / totalQuestions) * 100
  const roundedScore = Math.round(score)

  const getMessage = () => {
    if (score >= 90) return "Outstanding! You're among the top scorers!";
    if (score >= 75) return "Great job! You performed really well!";
    if (score >= 50) return "Nice effort! Keep improving!";
    if (score >= 30) return "You're getting there! A little more practice will help.";
    return "Don't worry, keep practicing and you'll improve!";
  };


  return (
    <div className="w-full">
      <div className="space-y-4 p-8">
        <div className="text-center">
          <p className="text-4xl font-bold">{roundedScore}%</p>
          <p className="text-sm text-muted-foreground">
            {correctAnswers} out of {totalQuestions} correct
          </p>
        </div>
        <p className="text-center font-medium">{getMessage()}</p>
      </div>
    </div>
  )
}
