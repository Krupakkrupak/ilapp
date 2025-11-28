"use client";

import { useCallback, useState } from "react";

type PronunciationItem = {
  text: string;
  hint?: string;
};

type PronunciationGroup = {
  level: "Beginner" | "Intermediate" | "Advanced";
  title: string;
  items: PronunciationItem[];
};

const GROUPS: PronunciationGroup[] = [
  {
    level: "Beginner",
    title: "Simple everyday words",
    items: [
      { text: "water" },
      { text: "coffee" },
      { text: "library" },
      { text: "family" },
      { text: "computer" },
      { text: "beautiful", hint: "stress on BEAU" },
    ],
  },
  {
    level: "Intermediate",
    title: "Common tricky words",
    items: [
      { text: "comfortable", hint: "often /KUMF-tuh-buhl/" },
      { text: "vegetable" },
      { text: "environment" },
      { text: "restaurant" },
      { text: "chocolate" },
      { text: "schedule", hint: "/SKED-jool/ or /SHED-jool/" },
    ],
  },
  {
    level: "Advanced",
    title: "Longer phrases",
    items: [
      { text: "How are you doing today?" },
      { text: "Could you repeat that, please?" },
      { text: "I would like a cup of coffee." },
      { text: "Thank you for your help." },
      { text: "I really appreciate your time." },
    ],
  },
];

export default function PronunciationPage() {
  const [customText, setCustomText] = useState("");
  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Speech is not supported in this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pronunciation Practice
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Tap the speaker button to hear each word or phrase. Listen, then pause
            and repeat out loud. Focus on stress and rhythm.
          </p>
        </header>

        <section className="mb-6 bg-white shadow rounded-lg p-4 sm:p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Try your own word or sentence
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            Type anything you want to practice and press Speak to hear it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Type a word or sentence..."
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
            />
            <button
              type="button"
              onClick={() => {
                const text = customText.trim();
                if (!text) return;
                speak(text);
              }}
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              🔊 Speak
            </button>
          </div>
        </section>

        <div className="space-y-6">
          {GROUPS.map((group) => (
            <section
              key={group.title}
              className="bg-white shadow rounded-lg p-4 sm:p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {group.title}
                  </h2>
                  <p className="text-xs text-gray-500">{group.level} level</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {group.items.map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
                  >
                    <div>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">
                        {item.text}
                      </p>
                      {item.hint && (
                        <p className="text-xs text-gray-500 mt-0.5">{item.hint}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => speak(item.text)}
                      className="inline-flex items-center rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow hover:bg-indigo-700"
                    >
                      🔊 Listen
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
