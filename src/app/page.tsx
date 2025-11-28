import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-10 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-slate-900/70 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-sky-300 ring-1 ring-sky-500/40">
              AI Language Tutor
            </span>
          </div>
          <nav className="flex items-center gap-3 text-sm">
            <Link
              href="/login"
              className="rounded-full px-4 py-1.5 text-slate-200 hover:bg-slate-800/70"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-sky-500 px-4 py-1.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/40 hover:bg-sky-400"
            >
              Get started
            </Link>
          </nav>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center gap-10 pt-10 text-center sm:items-start sm:text-left">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-slate-700">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Practice speaking, vocabulary, grammar & quizzes in one place
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Interactive language learning with your own
              <span className="bg-gradient-to-r from-sky-400 to-emerald-300 bg-clip-text text-transparent">
                {" "}
                AI tutor
              </span>
            </h1>
            <p className="max-w-xl text-base text-slate-300 sm:text-lg">
              Chat with an AI tutor, build vocabulary with smart flashcards, get
              grammar corrections, and track your progress with speaking and
              quiz scores.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/signup"
                className="flex items-center justify-center rounded-full bg-sky-500 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/40 transition hover:bg-sky-400"
              >
                Start learning free
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center justify-center rounded-full border border-slate-600/80 px-6 py-2.5 text-sm font-medium text-slate-100 hover:border-slate-400 hover:bg-slate-900/60"
              >
                Go to dashboard
              </Link>
            </div>
          </div>

          <div className="grid w-full gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-700/80 bg-slate-900/60 p-4 text-left">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                AI Chat Tutor
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Speak or type with an AI tutor that corrects your mistakes and
                explains grammar in simple language.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700/80 bg-slate-900/60 p-4 text-left">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Vocabulary Builder
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Add words and let AI generate meanings, examples, pronunciation
                and flashcards for daily practice.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700/80 bg-slate-900/60 p-4 text-left">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Quizzes & Progress
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Take vocabulary, grammar and speaking quizzes and track your
                streaks, scores and time spent.
              </p>
            </div>
          </div>
        </main>

        <footer className="mt-8 flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} iLapp. All rights reserved.</span>
          <span>Built with Next.js, Firebase, and OpenAI.</span>
        </footer>
      </div>
    </div>
  );
}
