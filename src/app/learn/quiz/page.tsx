"use client";

import { useState } from "react";

type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Choose the correct form: 'She ___ to school every day.'",
    options: ["go", "goes", "is go", "going"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "What is the opposite of 'difficult'?",
    options: ["easy", "heavy", "strong", "late"],
    correctIndex: 0,
  },
  {
    id: 3,
    question: "Which word is a synonym of 'happy'?",
    options: ["sad", "angry", "joyful", "tired"],
    correctIndex: 2,
  },
  {
    id: 4,
    question: "Choose the correct article: 'I saw ___ elephant.'",
    options: ["a", "an", "the", "no article"],
    correctIndex: 1,
  },
  {
    id: 5,
    question: "What is the past tense of 'eat'?",
    options: ["eated", "ate", "eaten", "eats"],
    correctIndex: 1,
  },
  {
    id: 6,
    question: "'Library' is a place where you can ___ books.",
    options: ["cook", "drive", "borrow", "sell"],
    correctIndex: 2,
  },
  {
    id: 7,
    question: "Which sentence is correct?",
    options: [
      "He don't like coffee.",
      "He doesn't likes coffee.",
      "He doesn't like coffee.",
      "He not like coffee.",
    ],
    correctIndex: 2,
  },
  {
    id: 8,
    question: "Find the adjective in this sentence: 'She has a beautiful dress.'",
    options: ["She", "has", "beautiful", "dress"],
    correctIndex: 2,
  },
  {
    id: 9,
    question: "Which word best completes the sentence: 'I am looking ___ my keys.'",
    options: ["at", "for", "to", "on"],
    correctIndex: 1,
  },
  {
    id: 10,
    question: "What is the plural of 'child'?",
    options: ["childs", "childes", "children", "child"],
    correctIndex: 2,
  },
  {
    id: 11,
    question: "Choose the correct preposition: 'She is interested ___ music.'",
    options: ["on", "about", "in", "for"],
    correctIndex: 2,
  },
  {
    id: 12,
    question: "What does 'rarely' mean?",
    options: ["never", "not often", "always", "every day"],
    correctIndex: 1,
  },
  {
    id: 13,
    question: "Which is a correct question?",
    options: [
      "Where you are from?",
      "From where you are?",
      "Where are you from?",
      "You are from where?",
    ],
    correctIndex: 2,
  },
  {
    id: 14,
    question: "Choose the correct word: 'He is a very ___ student.'",
    options: ["intelligence", "intelligent", "intelligently", "intelligents"],
    correctIndex: 1,
  },
  {
    id: 15,
    question: "What is the comparative form of 'good'?",
    options: ["gooder", "more good", "better", "best"],
    correctIndex: 2,
  },
  {
    id: 16,
    question: "Which word fits: 'I have lived here ___ 2010.'",
    options: ["since", "for", "from", "by"],
    correctIndex: 0,
  },
  {
    id: 17,
    question: "Which sentence uses the present continuous?",
    options: [
      "I eat breakfast at 8.",
      "I am eating breakfast now.",
      "I ate breakfast yesterday.",
      "I will eat breakfast tomorrow.",
    ],
    correctIndex: 1,
  },
  {
    id: 18,
    question: "What does 'borrow' mean?",
    options: [
      "To give something for a long time",
      "To take and use something that will be returned",
      "To buy something",
      "To sell something",
    ],
    correctIndex: 1,
  },
  {
    id: 19,
    question: "Choose the correct option: 'There ___ many people at the party.'",
    options: ["was", "were", "is", "be"],
    correctIndex: 1,
  },
  {
    id: 20,
    question: "Which word is a noun?",
    options: ["quickly", "decide", "happiness", "bright"],
    correctIndex: 2,
  },
  {
    id: 21,
    question: "What is the past participle of 'write'?",
    options: ["writed", "wrote", "written", "writing"],
    correctIndex: 2,
  },
  {
    id: 22,
    question: "Choose the correct word: 'She speaks English very ___.'",
    options: ["good", "well", "better", "best"],
    correctIndex: 1,
  },
  {
    id: 23,
    question: "What does 'occasionally' mean?",
    options: ["often", "sometimes", "never", "always"],
    correctIndex: 1,
  },
  {
    id: 24,
    question: "Which sentence is in the future tense?",
    options: [
      "I go to school.",
      "I went to school.",
      "I will go to school.",
      "I am going to school yesterday.",
    ],
    correctIndex: 2,
  },
  {
    id: 25,
    question: "Choose the correct preposition: 'He is good ___ math.'",
    options: ["in", "at", "on", "about"],
    correctIndex: 1,
  },
  {
    id: 26,
    question: "Which is a compound word?",
    options: ["sun", "flower", "sunflower", "flow"],
    correctIndex: 2,
  },
  {
    id: 27,
    question: "What is the superlative form of 'tall'?",
    options: ["taller", "tallest", "most tall", "more tall"],
    correctIndex: 1,
  },
  {
    id: 28,
    question: "Choose the correct word: 'They ___ finished their homework.'",
    options: ["has", "have", "had", "having"],
    correctIndex: 1,
  },
  {
    id: 29,
    question: "What does 'avoid' mean?",
    options: ["to try not to do something", "to enjoy something", "to start something", "to repeat something"],
    correctIndex: 0,
  },
  {
    id: 30,
    question: "Which sentence is correct?",
    options: [
      "She can to swim.",
      "She cans swim.",
      "She can swim.",
      "She can swims.",
    ],
    correctIndex: 2,
  },
];

export default function QuizPage() {
  const [answers, setAnswers] = useState<Record<number, number | null>>(() => {
    const initial: Record<number, number | null> = {};
    QUESTIONS.forEach((q) => {
      initial[q.id] = null;
    });
    return initial;
  });
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (questionId: number, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    if (showResult) {
      setShowResult(false);
    }
  };

  const handleCheckAnswers = () => {
    setShowResult(true);
  };

  const total = QUESTIONS.length;
  const correctCount = QUESTIONS.reduce((sum, q) => {
    const selected = answers[q.id];
    return selected === q.correctIndex ? sum + 1 : sum;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">English Quiz</h1>
          <p className="text-gray-600">
            Answer the multiple-choice questions below. When you are ready, click
            <span className="font-semibold"> Check answers </span>
            to see your score.
          </p>
        </header>

        <div className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto pr-1">
          {QUESTIONS.map((q, index) => (
            <div
              key={q.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <h2 className="font-semibold text-gray-900">
                  {index + 1}. {q.question}
                </h2>
                {showResult && (
                  <span
                    className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full
                    bg-indigo-50 text-indigo-700"
                  >
                    Correct: {String.fromCharCode(65 + q.correctIndex)}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {q.options.map((option, optionIndex) => {
                  const isSelected = answers[q.id] === optionIndex;
                  const isCorrect = optionIndex === q.correctIndex;
                  let borderClass = "border-gray-200";
                  let bgClass = "bg-gray-50 hover:bg-gray-100";

                  if (showResult && isSelected) {
                    borderClass = isCorrect ? "border-emerald-500" : "border-rose-500";
                    bgClass = isCorrect
                      ? "bg-emerald-50"
                      : "bg-rose-50";
                  } else if (!showResult && isSelected) {
                    borderClass = "border-indigo-500";
                    bgClass = "bg-indigo-50";
                  }

                  return (
                    <button
                      key={optionIndex}
                      type="button"
                      onClick={() => handleSelect(q.id, optionIndex)}
                      className={`text-left text-sm rounded-md border px-3 py-2 transition-colors ${borderClass} ${bgClass}`}
                    >
                      <span className="font-semibold mr-2">
                        {String.fromCharCode(65 + optionIndex)}.
                      </span>
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
          <div>
            {showResult ? (
              <p className="text-sm text-gray-800">
                You scored
                <span className="font-semibold"> {correctCount} / {total} </span>
                correct.
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Select an answer for each question and then check your score.
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleCheckAnswers}
            className="ml-4 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-60"
          >
            Check answers
          </button>
        </div>
      </div>
    </div>
  );
}
