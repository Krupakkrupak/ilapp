"use client";

import { useState, useMemo } from "react";

const SAMPLE_VOCAB = [
  {
    word: "Eloquent",
    translation: "Fluent or persuasive in speaking or writing",
    example: "She gave an eloquent speech about the importance of education.",
    level: "Intermediate",
  },
  {
    word: "Resilient",
    translation: "Able to recover quickly from difficulties",
    example: "Children can be remarkably resilient in the face of change.",
    level: "Intermediate",
  },
  {
    word: "Meticulous",
    translation: "Showing great attention to detail",
    example: "He kept meticulous notes of every meeting.",
    level: "Advanced",
  },
  {
    word: "Curious",
    translation: "Eager to know or learn something",
    example: "Her curious nature led her to explore many different topics.",
    level: "Beginner",
  },
  {
    word: "Confident",
    translation: "Feeling sure about your abilities or decisions",
    example: "He felt confident before the job interview.",
    level: "Beginner",
  },
  {
    word: "Efficient",
    translation: "Working in a well-organized and productive way",
    example: "The new system is much more efficient than the old one.",
    level: "Intermediate",
  },
  {
    word: "Generous",
    translation: "Willing to give more of something than is necessary",
    example: "It was generous of her to share her notes with everyone.",
    level: "Beginner",
  },
  {
    word: "Frustrated",
    translation: "Feeling annoyed or upset because you cannot do something",
    example: "He was frustrated by the slow internet connection.",
    level: "Intermediate",
  },
  {
    word: "Innovative",
    translation: "Using new ideas or methods",
    example: "The company is known for its innovative products.",
    level: "Advanced",
  },
  {
    word: "Reluctant",
    translation: "Not wanting to do something; hesitant",
    example: "She was reluctant to speak in front of the large audience.",
    level: "Intermediate",
  },
  {
    word: "Grateful",
    translation: "Feeling thankful",
    example: "I am grateful for your help with this project.",
    level: "Beginner",
  },
  {
    word: "Accurate",
    translation: "Correct and without any mistakes",
    example: "Please make sure the report is accurate before sending it.",
    level: "Intermediate",
  },
  {
    word: "Ambitious",
    translation: "Having a strong desire to succeed or achieve something",
    example: "She is very ambitious and wants to start her own company.",
    level: "Intermediate",
  },
  {
    word: "Brief",
    translation: "Lasting only a short time",
    example: "We had a brief meeting before the main event.",
    level: "Beginner",
  },
  {
    word: "Cautious",
    translation: "Careful to avoid problems or danger",
    example: "He is cautious when driving in bad weather.",
    level: "Intermediate",
  },
  {
    word: "Essential",
    translation: "Absolutely necessary and extremely important",
    example: "Water is essential for all forms of life.",
    level: "Beginner",
  },
  {
    word: "Flexible",
    translation: "Able to change or be changed easily",
    example: "You need to be flexible when working with different teams.",
    level: "Intermediate",
  },
  {
    word: "Polite",
    translation: "Having or showing good manners",
    example: "It is polite to say 'thank you' when someone helps you.",
    level: "Beginner",
  },
  {
    word: "Reliable",
    translation: "Can be trusted to do what is expected",
    example: "She is a reliable colleague who always meets deadlines.",
    level: "Intermediate",
  },
  {
    word: "Sincere",
    translation: "Saying what you really think or feel",
    example: "He gave a sincere apology for his mistake.",
    level: "Intermediate",
  },
  {
    word: "Timid",
    translation: "Shy and nervous; not confident",
    example: "The timid child hid behind his mother when meeting new people.",
    level: "Beginner",
  },
  {
    word: "Vast",
    translation: "Extremely large in size or amount",
    example: "They looked out over the vast desert.",
    level: "Intermediate",
  },
  {
    word: "Diligent",
    translation: "Working carefully and with a lot of effort",
    example: "She is a diligent student who always does her homework.",
    level: "Intermediate",
  },
  {
    word: "Elegant",
    translation: "Graceful and stylish in appearance or manner",
    example: "The restaurant has an elegant design.",
    level: "Intermediate",
  },
  {
    word: "Harsh",
    translation: "Unpleasantly rough or severe",
    example: "The critic wrote a harsh review of the movie.",
    level: "Intermediate",
  },
  {
    word: "Immense",
    translation: "Extremely large or great",
    example: "There is immense pressure before the final exam.",
    level: "Advanced",
  },
  {
    word: "Modest",
    translation: "Not talking much about your own abilities or achievements",
    example: "Even after winning the prize, he remained modest.",
    level: "Intermediate",
  },
  {
    word: "Naive",
    translation: "Lacking experience and easily trusting others",
    example: "He was naive to believe everything he read online.",
    level: "Advanced",
  },
  {
    word: "Obvious",
    translation: "Easy to see or understand",
    example: "It was obvious that she was tired.",
    level: "Beginner",
  },
  {
    word: "Patient",
    translation: "Able to stay calm and not get angry",
    example: "Teachers need to be very patient with young children.",
    level: "Beginner",
  },
  {
    word: "Rough",
    translation: "Not smooth; having an uneven surface",
    example: "The road was rough and full of stones.",
    level: "Beginner",
  },
  {
    word: "Serious",
    translation: "Not joking; showing deep thought or importance",
    example: "We need to have a serious talk about your grades.",
    level: "Beginner",
  },
  {
    word: "Tense",
    translation: "Nervous and not relaxed",
    example: "The atmosphere in the room was tense before the results.",
    level: "Intermediate",
  },
  {
    word: "Unique",
    translation: "Being the only one of its kind",
    example: "Everyone has a unique style of learning.",
    level: "Beginner",
  },
  {
    word: "Vivid",
    translation: "Very clear, detailed, and realistic",
    example: "She has vivid memories of her childhood.",
    level: "Advanced",
  },
  {
    word: "Anxious",
    translation: "Worried and nervous about something",
    example: "He felt anxious before giving his presentation.",
    level: "Intermediate",
  },
  {
    word: "Brave",
    translation: "Showing no fear of dangerous or difficult things",
    example: "Firefighters are very brave.",
    level: "Beginner",
  },
  {
    word: "Calm",
    translation: "Relaxed and not excited or upset",
    example: "Try to stay calm during the exam.",
    level: "Beginner",
  },
  {
    word: "Delighted",
    translation: "Very pleased and happy",
    example: "She was delighted with her exam results.",
    level: "Intermediate",
  },
  {
    word: "Enormous",
    translation: "Very large in size or amount",
    example: "They donated an enormous amount of money.",
    level: "Intermediate",
  },
  {
    word: "Fragile",
    translation: "Easily broken or damaged",
    example: "Be careful, that glass is fragile.",
    level: "Intermediate",
  },
  {
    word: "Generous",
    translation: "Willing to give time or money to help others",
    example: "He is generous with his time and always helps his friends.",
    level: "Beginner",
  },
  {
    word: "Hostile",
    translation: "Unfriendly and aggressive",
    example: "The crowd became hostile after the decision.",
    level: "Advanced",
  },
  {
    word: "Isolated",
    translation: "Far away from others; alone",
    example: "The village is isolated from the main city.",
    level: "Intermediate",
  },
  {
    word: "Joyful",
    translation: "Very happy and full of joy",
    example: "The children were joyful during the festival.",
    level: "Beginner",
  },
  {
    word: "Kind",
    translation: "Friendly and helpful to others",
    example: "It was kind of you to wait for me.",
    level: "Beginner",
  },
  {
    word: "Logical",
    translation: "Using reason and clear thinking",
    example: "Her explanation was logical and easy to follow.",
    level: "Intermediate",
  },
  {
    word: "Mature",
    translation: "Behaving like an adult; fully grown",
    example: "He is very mature for his age.",
    level: "Intermediate",
  },
  {
    word: "Nervous",
    translation: "Worried and excited; not calm",
    example: "She felt nervous before the interview.",
    level: "Beginner",
  },
  {
    word: "Optimistic",
    translation: "Believing that good things will happen",
    example: "He is optimistic about the future.",
    level: "Intermediate",
  },
  {
    word: "Polished",
    translation: "Very well done or made; with a smooth finish",
    example: "The presentation was polished and professional.",
    level: "Advanced",
  },
  {
    word: "Quiet",
    translation: "Making little or no noise",
    example: "The library is a very quiet place.",
    level: "Beginner",
  },
  {
    word: "Responsible",
    translation: "Having the duty to take care of something",
    example: "You are responsible for locking the door.",
    level: "Intermediate",
  },
  {
    word: "Steady",
    translation: "Not changing; staying the same over time",
    example: "He made steady progress in his English.",
    level: "Intermediate",
  },
  {
    word: "Talented",
    translation: "Having a natural ability to do something well",
    example: "She is a talented musician.",
    level: "Beginner",
  },
  {
    word: "Urgent",
    translation: "Very important and needing quick action",
    example: "This is an urgent message from your teacher.",
    level: "Intermediate",
  },
  {
    word: "Valuable",
    translation: "Worth a lot of money or very useful",
    example: "Thank you for your valuable advice.",
    level: "Intermediate",
  },
  {
    word: "Warm-hearted",
    translation: "Kind and friendly towards other people",
    example: "She is a warm-hearted person who cares about others.",
    level: "Advanced",
  },
  {
    word: "Youthful",
    translation: "Having the qualities of a young person",
    example: "He looks very youthful for his age.",
    level: "Advanced",
  },
  {
    word: "Zealous",
    translation: "Showing great energy and enthusiasm",
    example: "The volunteers were zealous in their work.",
    level: "Advanced",
  },
  {
    word: "Cheerful",
    translation: "Happy and showing it in your behavior",
    example: "Her cheerful attitude made everyone smile.",
    level: "Beginner",
  },
  {
    word: "Determined",
    translation: "Having a strong will to do something",
    example: "She is determined to improve her English.",
    level: "Intermediate",
  },
  {
    word: "Honest",
    translation: "Telling the truth; not cheating or stealing",
    example: "He is known as an honest businessman.",
    level: "Beginner",
  },
  {
    word: "Lively",
    translation: "Full of energy and enthusiasm",
    example: "They had a lively discussion in class.",
    level: "Intermediate",
  },
  {
    word: "Proud",
    translation: "Feeling pleased about something you did or that you own",
    example: "She was proud of her final project.",
    level: "Beginner",
  },
  {
    word: "Relieved",
    translation: "Happy because something unpleasant has stopped",
    example: "He felt relieved after the exam was over.",
    level: "Intermediate",
  },
  {
    word: "Sensitive",
    translation: "Easily hurt or offended; able to understand others' feelings",
    example: "She is sensitive to criticism.",
    level: "Intermediate",
  },
  {
    word: "Thoughtful",
    translation: "Showing care and consideration for others",
    example: "It was thoughtful of you to bring a gift.",
    level: "Intermediate",
  },
  {
    word: "Worried",
    translation: "Feeling anxious or troubled about something",
    example: "He was worried about his test results.",
    level: "Beginner",
  },
];

export default function VocabularyPage() {
  const [level, setLevel] = useState<"Beginner" | "Intermediate" | "Advanced">(
    "Beginner"
  );

  const filteredVocab = useMemo(
    () => SAMPLE_VOCAB.filter((item) => item.level === level),
    [level]
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Vocabulary Builder
          </h1>
          <p className="text-gray-600">
            Review useful words with their meanings and example sentences. Choose a
            level tab to focus on Beginner, Intermediate, or Advanced vocabulary.
          </p>
        </header>

        <section className="bg-white shadow rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
            <h2 className="text-lg font-semibold text-gray-900">
              {level} words
            </h2>
            <div className="inline-flex rounded-full bg-gray-100 p-1 text-sm">
              {(["Beginner", "Intermediate", "Advanced"] as const).map((lvl) => {
                const isActive = level === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setLevel(lvl)}
                    className={`px-3 py-1 rounded-full font-medium transition-colors ${
                      isActive
                        ? "bg-indigo-600 text-white shadow"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {filteredVocab.map((item, index) => (
              <div
                key={`${item.word}-${index}`}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {item.word}
                  </h3>
                  <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                    {item.level}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{item.translation}</p>
                <p className="text-sm text-gray-500 italic">
                  {item.example}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
