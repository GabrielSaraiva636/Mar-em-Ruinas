import { useMemo, useState } from "react";
import { CheckCircle2, HeartPulse, RefreshCcw, XCircle } from "lucide-react";
import { ImpactStat } from "@/components/shared/impact-stat";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { quizQuestions } from "@/data/quiz-questions";
import { useSimulationStore } from "@/store/simulation-store";

export function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [pollutionDelta, setPollutionDelta] = useState(0);
  const applyQuizImpact = useSimulationStore((state) => state.applyQuizImpact);
  const pollutionLevel = useSimulationStore((state) => state.pollutionLevel);

  const isFinished = currentQuestion >= quizQuestions.length;
  const score = useMemo(
    () => answers.filter((answer, index) => answer === quizQuestions[index].correctAnswer).length,
    [answers],
  );

  function answerQuestion(answerIndex: number) {
    if (selectedAnswer !== null || isFinished) return;

    const question = quizQuestions[currentQuestion];
    const isCorrect = answerIndex === question.correctAnswer;
    const appliedImpact = applyQuizImpact(isCorrect, question.pollutionImpact);

    setSelectedAnswer(answerIndex);
    setAnswers((currentAnswers) => [...currentAnswers, answerIndex]);
    setPollutionDelta((currentDelta) => currentDelta + appliedImpact);
  }

  function advanceQuestion() {
    setSelectedAnswer(null);
    setCurrentQuestion((index) => index + 1);
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setPollutionDelta(0);
  }

  return (
    <section id="quiz" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Conhecimento"
          title="Quiz de preservação"
          description="Cada decisão altera o oceano: erros aumentam a poluição e acertos ajudam na recuperação."
        />
        <Card className="mt-10 border-border/70 shadow-xl">
          <CardContent className="p-8">
            {isFinished ? (
              <QuizResult
                score={score}
                pollutionDelta={pollutionDelta}
                pollutionLevel={pollutionLevel}
                onRestart={restartQuiz}
              />
            ) : (
              <QuizQuestion
                questionIndex={currentQuestion}
                selectedAnswer={selectedAnswer}
                onAnswer={answerQuestion}
                onAdvance={advanceQuestion}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

type QuizQuestionProps = {
  questionIndex: number;
  selectedAnswer: number | null;
  onAnswer: (answerIndex: number) => void;
  onAdvance: () => void;
};

function QuizQuestion({ questionIndex, selectedAnswer, onAnswer, onAdvance }: QuizQuestionProps) {
  const question = quizQuestions[questionIndex];
  const hasAnswered = selectedAnswer !== null;
  const answeredCorrectly = selectedAnswer === question.correctAnswer;

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <Badge variant="secondary">Pergunta {questionIndex + 1}</Badge>
        <span className="text-sm text-muted-foreground">{questionIndex + 1} de {quizQuestions.length}</span>
      </div>
      <Progress value={(questionIndex / quizQuestions.length) * 100} className="mb-8" />
      <h3 className="text-2xl font-semibold leading-8">{question.question}</h3>

      <div className="mt-8 grid gap-3">
        {question.answers.map((option, answerIndex) => {
          const isCorrectAnswer = hasAnswered && answerIndex === question.correctAnswer;
          const isSelectedWrongAnswer = selectedAnswer === answerIndex && !isCorrectAnswer;

          return (
            <Button
              key={option}
              variant="outline"
              disabled={hasAnswered}
              className={`h-auto justify-start whitespace-normal rounded-xl px-5 py-4 text-left disabled:opacity-100 ${
                isCorrectAnswer
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                  : isSelectedWrongAnswer
                    ? "border-destructive bg-red-50 text-destructive"
                    : ""
              }`}
              onClick={() => onAnswer(answerIndex)}
            >
              {isCorrectAnswer ? (
                <CheckCircle2 />
              ) : isSelectedWrongAnswer ? (
                <XCircle />
              ) : (
                <span className="mr-2 text-primary">{String.fromCharCode(65 + answerIndex)}</span>
              )}
              {option}
            </Button>
          );
        })}
      </div>

      {hasAnswered && (
        <div className={`mt-6 rounded-2xl border p-5 ${answeredCorrectly ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`}>
          <div className="flex gap-3">
            {answeredCorrectly ? (
              <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" />
            ) : (
              <HeartPulse className="mt-0.5 shrink-0 text-destructive" />
            )}
            <div>
              <p className="font-semibold">
                {answeredCorrectly
                  ? "Resposta correta: o oceano se recuperou."
                  : `Resposta incorreta: +${Math.round(question.pollutionImpact * 100)}% de poluição.`}
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{question.explanation}</p>
            </div>
          </div>
          <Button onClick={onAdvance} className="mt-5 w-full rounded-xl">
            {questionIndex === quizQuestions.length - 1 ? "Ver resultado" : "Próxima pergunta"}
          </Button>
        </div>
      )}
    </>
  );
}

type QuizResultProps = {
  score: number;
  pollutionDelta: number;
  pollutionLevel: number;
  onRestart: () => void;
};

function QuizResult({ score, pollutionDelta, pollutionLevel, onRestart }: QuizResultProps) {
  const resultMessage =
    score >= 9
      ? "Excelente. Suas escolhas ajudaram a recuperar o oceano."
      : score >= 6
        ? "Bom resultado. Algumas decisões ainda causaram impacto."
        : "O ecossistema sofreu. Revise as respostas e tente recuperá-lo.";

  return (
    <div className="py-10 text-center">
      <p className="text-6xl font-semibold text-primary">{score}/{quizQuestions.length}</p>
      <h3 className="mt-5 text-2xl font-semibold">Quiz concluído</h3>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">{resultMessage}</p>
      <div className="mx-auto mt-8 grid max-w-lg gap-3 sm:grid-cols-2">
        <ImpactStat
          label="Impacto do quiz"
          value={`${pollutionDelta > 0 ? "+" : ""}${Math.round(pollutionDelta * 100)}% poluição`}
        />
        <ImpactStat label="Estado atual" value={`${Math.round(pollutionLevel * 100)}% poluído`} />
      </div>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Button onClick={onRestart} variant="outline" className="rounded-xl">
          <RefreshCcw /> Refazer
        </Button>
        <Button asChild className="rounded-xl">
          <a href="#simulacao">Ver impacto no oceano</a>
        </Button>
      </div>
    </div>
  );
}
