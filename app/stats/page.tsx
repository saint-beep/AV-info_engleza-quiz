"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, Target, Clock, BookOpen, BarChart3, Trophy, RefreshCw } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { questions } from "../../data/questions"

export default function StatsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [language, setLanguage] = useState<"ro" | "en">("ro")
  const [stats, setStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    averageTime: 0,
    categoriesStudied: new Set<string>(),
    studyTime: 0,
  })
  const [bestStreak, setBestStreak] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState<Set<number>>(new Set())

  useEffect(() => {
    // Get params from URL
    const urlLanguage = searchParams.get("language") as "ro" | "en"
    const urlTheme = searchParams.get("theme") as "light" | "dark"

    if (urlLanguage) setLanguage(urlLanguage)
    if (urlTheme) setTheme(urlTheme)

    // Load saved data
    const savedStats = localStorage.getItem("quizStats")
    if (savedStats) {
      const parsed = JSON.parse(savedStats)
      setStats({
        ...parsed,
        categoriesStudied: new Set(parsed.categoriesStudied || []),
      })
    }

    const savedBestStreak = localStorage.getItem("bestStreak")
    if (savedBestStreak) {
      setBestStreak(Number.parseInt(savedBestStreak))
    }

    const savedWrongAnswers = localStorage.getItem("wrongAnswers")
    if (savedWrongAnswers) {
      setWrongAnswers(new Set(JSON.parse(savedWrongAnswers)))
    }
  }, [searchParams])

  const resetStats = () => {
    if (
      confirm(
        language === "ro"
          ? "Sigur vrei să resetezi toate statisticile?"
          : "Are you sure you want to reset all statistics?",
      )
    ) {
      localStorage.removeItem("quizStats")
      localStorage.removeItem("bestStreak")
      localStorage.removeItem("wrongAnswers")
      setStats({
        totalQuestions: 0,
        correctAnswers: 0,
        averageTime: 0,
        categoriesStudied: new Set(),
        studyTime: 0,
      })
      setBestStreak(0)
      setWrongAnswers(new Set())
    }
  }

  const t = (key: string, params?: Record<string, string | number>) => {
    const translations = {
      ro: {
        "stats.title": "Statisticile Tale",
        "stats.accuracy": "Acuratețe",
        "stats.accuracy.desc": "{correct} corecte din {total}",
        "stats.best.streak": "Cel Mai Bun Streak",
        "stats.best.streak.desc": "Răspunsuri consecutive corecte",
        "stats.study.time": "Timp de Studiu",
        "stats.study.time.desc": "Medie: {avg}s per întrebare",
        "stats.need.review": "Necesită Revizuire",
        "stats.need.review.desc": "Întrebări de reîncercat",
        "stats.categories.progress": "Progresul Categoriilor",
        "stats.studied": "Studiat",
        "stats.total.questions": "Total Întrebări",
        "stats.total.questions.desc": "Întrebări rezolvate",
        "common.back": "Înapoi",
        "common.reset": "Resetează Statisticile",
        "stats.no.data": "Nu există date de statistici încă. Începe un quiz pentru a vedea progresul!",
      },
      en: {
        "stats.title": "Your Statistics",
        "stats.accuracy": "Accuracy",
        "stats.accuracy.desc": "{correct} correct out of {total}",
        "stats.best.streak": "Best Streak",
        "stats.best.streak.desc": "Consecutive correct answers",
        "stats.study.time": "Study Time",
        "stats.study.time.desc": "Avg: {avg}s per question",
        "stats.need.review": "Need Review",
        "stats.need.review.desc": "Questions to retry",
        "stats.categories.progress": "Categories Progress",
        "stats.studied": "Studied",
        "stats.total.questions": "Total Questions",
        "stats.total.questions.desc": "Questions answered",
        "common.back": "Back",
        "common.reset": "Reset Statistics",
        "stats.no.data": "No statistics data yet. Start a quiz to see your progress!",
      },
    }

    let translation = translations[language][key as keyof (typeof translations)[typeof language]] || key

    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, String(value))
      })
    }

    return translation
  }

  const accuracy = stats.totalQuestions > 0 ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) : 0
  const categories = [...new Set(questions.map((q) => q.category))]

  return (
    <div className={`min-h-screen p-4 ${theme === "dark" ? "bg-gray-900" : "bg-purple-50"}`}>
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className={theme === "dark" ? "bg-gray-800 text-white border-gray-600" : ""}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("common.back")}
          </Button>

          <Button variant="destructive" onClick={resetStats} size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            {t("common.reset")}
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
            {t("stats.title")}
          </h1>
        </div>

        {stats.totalQuestions === 0 ? (
          <Card className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
            <CardContent className="p-8 text-center">
              <BarChart3 className={`h-16 w-16 mx-auto mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-300"}`} />
              <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{t("stats.no.data")}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    <Target className="h-4 w-4 inline mr-2" />
                    {t("stats.accuracy")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                    {accuracy}%
                  </div>
                  <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    {t("stats.accuracy.desc", { correct: stats.correctAnswers, total: stats.totalQuestions })}
                  </p>
                </CardContent>
              </Card>

              <Card className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    <Trophy className="h-4 w-4 inline mr-2" />
                    {t("stats.best.streak")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                    {bestStreak}
                  </div>
                  <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    {t("stats.best.streak.desc")}
                  </p>
                </CardContent>
              </Card>

              <Card className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    <Clock className="h-4 w-4 inline mr-2" />
                    {t("stats.study.time")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                    {Math.round(stats.studyTime / 60)}m
                  </div>
                  <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    {t("stats.study.time.desc", { avg: stats.averageTime })}
                  </p>
                </CardContent>
              </Card>

              <Card className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    <BookOpen className="h-4 w-4 inline mr-2" />
                    {t("stats.need.review")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                    {wrongAnswers.size}
                  </div>
                  <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    {t("stats.need.review.desc")}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Categories Progress */}
            <Card className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle className={`${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                  <TrendingUp className="h-5 w-5 inline mr-2" />
                  {t("stats.categories.progress")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => {
                    const categoryQuestions = questions.filter((q) => q.category === category)
                    const isStudied = stats.categoriesStudied.has(category)

                    return (
                      <div
                        key={category}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                      >
                        <div>
                          <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                            {category}
                          </p>
                          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                            {categoryQuestions.length} questions
                          </p>
                        </div>
                        <div
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            isStudied
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
                          }`}
                        >
                          {isStudied ? t("stats.studied") : "Not studied"}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={`${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                    {t("stats.total.questions")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Total answered:</span>
                      <span className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                        {stats.totalQuestions}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Correct:</span>
                      <span className="font-medium text-green-600">{stats.correctAnswers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Wrong:</span>
                      <span className="font-medium text-red-600">{stats.totalQuestions - stats.correctAnswers}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={`${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                    Progress Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                          Overall Progress
                        </span>
                        <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                          {Math.round((stats.totalQuestions / questions.length) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(stats.totalQuestions / questions.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                          Accuracy Rate
                        </span>
                        <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                          {accuracy}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div
                          className={`h-2 rounded-full ${accuracy >= 80 ? "bg-green-600" : accuracy >= 60 ? "bg-yellow-600" : "bg-red-600"}`}
                          style={{ width: `${accuracy}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
