"use client";

import { useState, useRef, useEffect, FormEvent } from "react";

type Message = {
  id: number;
  role: "user" | "tutor";
  text: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: "tutor",
    text: "Hi! I am your AI chat tutor. Ask me something in English, and I will reply and help you practise.",
  },
];

function createTutorReply(userText: string): string {
  const trimmed = userText.trim();
  if (!trimmed) return "Can you type a sentence for us to practise?";

  const lower = trimmed.toLowerCase();

   // Simple grammar correction patterns (very limited, just to give examples)
  type CorrectionRule = {
    test: (s: string) => boolean;
    apply: (original: string) => string;
    note: string;
  };

  const rules: CorrectionRule[] = [
    {
      // "I am agree" -> "I agree"
      test: (s) => s.includes("i am agree"),
      apply: (original) =>
        original.replace(/I am agree/gi, (m) =>
          m[0] === "I" ? "I agree" : "i agree"
        ),
      note: "In English we say 'I agree', not 'I am agree'.",
    },
    {
      // "He don't" / "She don't" already handled below, but make a direct correction
      test: (s) => s.includes("he don't") || s.includes("she don't"),
      apply: (original) =>
        original
          .replace(/He don't/gi, (m) =>
            m[0] === "H" ? "He doesn't" : "he doesn't"
          )
          .replace(/She don't/gi, (m) =>
            m[0] === "S" ? "She doesn't" : "she doesn't"
          ),
      note: "We use 'doesn't' with he/she/it in the present simple.",
    },
    {
      // "He go" / "She go" -> "He goes" / "She goes" (very naive)
      test: (s) => s.includes("he go ") || s.includes("she go "),
      apply: (original) =>
        original
          .replace(/He go\b/gi, (m) =>
            m[0] === "H" ? "He goes" : "he goes"
          )
          .replace(/She go\b/gi, (m) =>
            m[0] === "S" ? "She goes" : "she goes"
          ),
      note: "In the present simple we add 'es' for he/she/it with 'go' → 'goes'.",
    },
    {
      // "I doesn't" -> "I don't"
      test: (s) => s.includes("i doesn't"),
      apply: (original) =>
        original.replace(/I doesn't/gi, (m) =>
          m[0] === "I" ? "I don't" : "i don't"
        ),
      note: "We say 'I don't', not 'I doesn't'.",
    },
  ];

  const matchedRule = rules.find((rule) => rule.test(lower));
  if (matchedRule) {
    const corrected = matchedRule.apply(trimmed);
    if (corrected !== trimmed) {
      return (
        "Good try! A more correct sentence is: '" +
        corrected +
        "'. " +
        matchedRule.note +
        " Can you repeat it using this version?"
      );
    }
  }

  // Greetings
  if (lower.includes("hello") || lower.includes("hi")) {
    return "Hello! Nice to chat with you. How are you today, and what did you do today?";
  }

  // Talking about feelings
  if (lower.includes("how are you")) {
    return "I am doing great, thank you. A natural answer is: 'I'm fine, thanks. I'm a bit tired because I studied a lot today.' How are you?";
  }

  // Simple preference pattern: "I like ..."
  if (lower.startsWith("i like ")) {
    const rest = trimmed.slice(7);
    return (
      "Nice! You can make it longer: 'I like " +
      rest +
      " because ...'. Can you tell me why you like it?"
    );
  }

  // Simple favourite pattern
  if (lower.startsWith("my favourite") || lower.startsWith("my favorite")) {
    return (
      "Great sentence. You can also say: 'One of my favourite things is ... because ...'. Can you add a reason using 'because'?"
    );
  }

  // Correct common grammar issue: "He don't" / "She don't"
  if (lower.includes("he don't") || lower.includes("she don't")) {
    return "Small correction: we say 'He doesn't' or 'She doesn't'. For example: 'He doesn't like coffee.' Can you try the sentence again with 'doesn't'?";
  }

  // Talking about family
  if (lower.includes("family") || lower.includes("mother") || lower.includes("father")) {
    return "Family is a good topic. Try a longer answer like: 'There are __ people in my family. I am close to __ because __.' Can you describe your family like this?";
  }

  // Talking about hobbies
  if (lower.includes("hobby") || lower.includes("hobbies") || lower.includes("free time")) {
    return "Great, let's talk about hobbies. You can say: 'In my free time I like to __ because __.' What do you like doing in your free time and why?";
  }

  // Daily routine
  if (lower.includes("morning") || lower.includes("evening") || lower.includes("usually")) {
    return "Daily routines are perfect for practice. Try: 'In the morning I usually __. In the evening I __.' Can you tell me about your typical day like this?";
  }

  // Past / future plans
  if (lower.includes("yesterday") || lower.includes("last") || lower.includes("tomorrow") || lower.includes("next")) {
    return "Good! Remember: we use past tense for yesterday/last, and future forms for tomorrow/next. For example: 'Yesterday I went...' / 'Next weekend I will ...'. Can you make one past and one future sentence?";
  }

  // Topic: travel
  if (lower.includes("travel") || lower.includes("trip") || lower.includes("holiday")) {
    return "Travel is a great topic! You can practise like this: 'I would like to travel to __ because __.' Where would you like to go and why?";
  }

  // Topic: job / work / study
  if (lower.includes("job") || lower.includes("work") || lower.includes("study")) {
    return "Talking about work and study is very useful. Try answering: 'I work/study as __. I like it because __.' Can you complete this sentence?";
  }

  // Default coaching reply
  return (
    "Nice sentence! To make your English more advanced, try adding a reason with 'because' or 'so'. For example: '" +
    trimmed +
    " because ...'. Can you extend your sentence like that?"
  );
}

export default function ChatTutorPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [nextId, setNextId] = useState(2);
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: nextId,
      role: "user",
      text: trimmed,
    };
    setNextId((id) => id + 1);
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    setTimeout(() => {
      const tutorMessage: Message = {
        id: Date.now(),
        role: "tutor",
        text: createTutorReply(trimmed),
      };
      setMessages((prev) => [...prev, tutorMessage]);
      setIsThinking(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto flex flex-col h-[80vh] bg-white shadow rounded-xl border border-gray-200">
        <header className="px-4 sm:px-6 py-3 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              AI Chat Tutor
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Practise English conversation. Type your message and I will reply.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            Online
          </span>
        </header>

        <main className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 space-y-3 bg-gray-50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white rounded-br-sm"
                    : "bg-white text-gray-900 rounded-bl-sm border border-gray-200"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-1 rounded-2xl bg-white border border-gray-200 px-3 py-2 text-xs text-gray-500 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Tutor is thinking...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </main>

        <form
          onSubmit={handleSubmit}
          className="border-t border-gray-200 px-3 sm:px-4 py-3 bg-white"
        >
          <div className="flex items-center gap-2">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 max-h-24"
            />
            <button
              type="submit"
              disabled={!input.trim() || isThinking}
              className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
