'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, MessageSquare, Mic, BarChart } from 'lucide-react';
import Link from 'next/link';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    vocabularyCount: 120,
    streak: 5,
    accuracy: 88,
    quizzesCompleted: 12,
  });

  useEffect(() => {
    // Placeholder: later we'll fetch real stats from Firestore.
    // For now, just keep initial demo stats.
  }, [user]);

  const features = [
    {
      title: 'AI Chat Tutor',
      description: 'Practice conversation with our AI language tutor',
      icon: <MessageSquare className="h-8 w-8 text-indigo-600" />,
      href: '/learn/chat',
    },
    {
      title: 'Vocabulary Builder',
      description: 'Learn and practice new words',
      icon: <BookOpen className="h-8 w-8 text-indigo-600" />,
      href: '/learn/vocabulary',
    },
    {
      title: 'Pronunciation',
      description: 'Improve your speaking skills',
      icon: <Mic className="h-8 w-8 text-indigo-600" />,
      href: '/learn/pronunciation',
    },
    {
      title: 'Quizzes',
      description: 'Test your knowledge',
      icon: <BarChart className="h-8 w-8 text-indigo-600" />,
      href: '/learn/quiz',
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="rounded-2xl bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 p-[1px] shadow-sm">
            <div className="flex flex-col gap-2 rounded-2xl bg-white/95 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Welcome back, {user?.displayName || 'Language Learner'}!
                </h1>
                <p className="mt-1 text-sm sm:text-base text-gray-600">
                  Ready to continue your language learning journey today?
                </p>
              </div>
              <div className="mt-3 flex items-center gap-3 sm:mt-0">
                <div className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                  Streak: {stats.streak} {stats.streak === 1 ? 'day' : 'days'}
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  Accuracy: {stats.accuracy}%
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Vocabulary"
              value={stats.vocabularyCount}
              description="words learned"
            />
            <StatCard
              title="Current Streak"
              value={`${stats.streak} ${stats.streak === 1 ? 'day' : 'days'}`}
              description="in a row"
            />
            <StatCard
              title="Accuracy"
              value={`${stats.accuracy}%`}
              description="average"
            />
            <StatCard
              title="Quizzes"
              value={stats.quizzesCompleted}
              description="completed"
            />
          </div>

          {/* Quick Actions */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Link key={index} href={feature.href}>
                  <div className="bg-white/90 overflow-hidden shadow-sm rounded-xl h-full hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer border border-gray-100">
                    <div className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-indigo-50 rounded-lg p-2">
                          {feature.icon}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {feature.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section className="space-y-4 pb-8">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Activity
            </h2>
            <Card className="border border-gray-100 shadow-sm">
              <CardContent className="pt-6">
                <ul className="space-y-3">
                <li className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-b-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Current streak
                    </p>
                    <p className="text-xs text-gray-500">
                      Keep practicing every day to grow your streak.
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-indigo-600">
                    {stats.streak} {stats.streak === 1 ? 'day' : 'days'}
                  </span>
                </li>
                <li className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-b-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Overall accuracy
                    </p>
                    <p className="text-xs text-gray-500">
                      Based on your recent quizzes and exercises.
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-green-600">
                    {stats.accuracy}%
                  </span>
                </li>
                <li className="flex items-center justify-between pb-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Quizzes completed
                    </p>
                    <p className="text-xs text-gray-500">
                      Total number of quizzes you have finished.
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {stats.quizzesCompleted}
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}

function StatCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string | number;
  description: string;
}) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
        <dd className="mt-1 text-3xl font-semibold text-gray-900">{value}</dd>
        <dd className="text-sm text-gray-500">{description}</dd>
      </div>
    </div>
  );
}
