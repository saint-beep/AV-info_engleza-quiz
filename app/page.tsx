"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Brain,
  Trophy,
  TrendingUp,
  Filter,
  Zap,
  RefreshCw,
  Globe,
  GraduationCap,
  PenTool,
} from "lucide-react"
import { InstallPrompt } from "../components/install-prompt"
import { questions } from "../data/questions"

export default function HomePage() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [language, setLanguage] = useState<"ro" | "en">("ro")
  const [bestStreak, setBestStreak] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [filteredQuestions, setFilteredQuestions] = useState(questions)
  const [wrongAnswers, setWrongAnswers] = useState<Set<number>>(new Set())
  const [studyStats, setStudyStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    averageTime: 0,
    categoriesStudied: new Set<string>(),
    studyTime: 0,
  })

  // Load data from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem("quizStats")
    if (savedStats) {
      const parsed = JSON.parse(savedStats)
      setStudyStats({
        ...parsed,
        categoriesStudied: new Set(parsed.categoriesStudied),
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
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguage(savedLanguage as "ro" | "en")
    }
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme as "light" | "dark")
    }
  }, [])

  // Remove the separate filterQuestions function and replace the useEffect with:
  useEffect(() => {
    let filtered = questions

    if (selectedCategory !== "all") {
      filtered = filtered.filter((q) => q.category === selectedCategory)
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter((q) => q.difficulty === selectedDifficulty)
    }

    setFilteredQuestions(filtered)
  }, [selectedCategory, selectedDifficulty])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  const toggleLanguage = () => {
    const newLanguage = language === "ro" ? "en" : "ro"
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const getCategories = () => {
    return [...new Set(questions.map((q) => q.category))]
  }

  const getDifficulties = () => {
    return [...new Set(questions.map((q) => q.difficulty))]
  }

  const navigateToMode = (mode: string, params?: Record<string, string>) => {
    const searchParams = new URLSearchParams({
      category: selectedCategory,
      difficulty: selectedDifficulty,
      language,
      theme,
      ...params,
    })
    window.location.href = `/${mode}?${searchParams.toString()}`
  }

  const t = (key: string, params?: Record<string, string | number>) => {
    const translations = {
      ro: {
        "app.title": "Info Engleza Licenta",
        "app.subtitle": "Alege modul de învățare",
        "menu.training": "Antrenament",
        "menu.training.desc": "Studiază cu flashcard-uri",
        "menu.quiz": "Quiz Normal",
        "menu.quiz.desc": "Testează-ți cunoștințele",
        "menu.challenge": "Challenge Mode",
        "menu.challenge.desc": "30 secunde per întrebare",
        "menu.retry": "Smart Retry",
        "menu.retry.desc": "Reîncearcă {count} răspunsuri greșite",
        "menu.stats": "Statistici",
        "menu.stats.desc": "Vezi progresul tău",
        "filters.title": "Filtre",
        "filters.category": "Categorie",
        "filters.difficulty": "Dificultate",
        "filters.all.categories": "Toate Categoriile",
        "filters.all.difficulties": "Toate Dificultățile",
        "filters.questions.available": "{count} întrebări disponibile",
        "common.best.streak": "Cel Mai Bun Streak: {count}",
        "difficulty.easy": "ușor",
        "difficulty.medium": "mediu",
        "difficulty.hard": "greu",
        "menu.typing": "Challenge Scriere",
        "menu.typing.desc": "Scrie răspunsurile manual",
      },
      en: {
        "app.title": "Info Engleza Licenta",
        "app.subtitle": "Choose your learning mode",
        "menu.training": "Training",
        "menu.training.desc": "Study with flashcards",
        "menu.quiz": "Normal Quiz",
        "menu.quiz.desc": "Test your knowledge",
        "menu.challenge": "Challenge Mode",
        "menu.challenge.desc": "30 seconds per question",
        "menu.retry": "Smart Retry",
        "menu.retry.desc": "Retry {count} wrong answers",
        "menu.stats": "Statistics",
        "menu.stats.desc": "View your progress",
        "filters.title": "Filters",
        "filters.category": "Category",
        "filters.difficulty": "Difficulty",
        "filters.all.categories": "All Categories",
        "filters.all.difficulties": "All Difficulties",
        "filters.questions.available": "{count} questions available",
        "common.best.streak": "Best Streak: {count}",
        "difficulty.easy": "easy",
        "difficulty.medium": "medium",
        "difficulty.hard": "hard",
        "menu.typing": "Typing Challenge",
        "menu.typing.desc": "Scrie răspunsurile manual",
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

  return (
    <div
      className={`min-h-screen p-4 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      <InstallPrompt />
      <div className="max-w-md mx-auto pt-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <Trophy className={`h-6 w-6 ${theme === "dark" ? "text-yellow-400" : "text-yellow-600"}`} />
            <span className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              {t("common.best.streak", { count: bestStreak })}
            </span>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={toggleLanguage}
              className={`${
                theme === "dark"
                  ? "bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <Globe className="h-4 w-4 mr-1" />
              {language === "ro" ? "EN" : "RO"}
            </Button>
            <Button
              variant="outline"
              onClick={toggleTheme}
              className={`${
                theme === "dark"
                  ? "bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </Button>
          </div>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className={`h-12 w-12 mr-3 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
            <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              {t("app.title")}
            </h1>
          </div>
          <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{t("app.subtitle")}</p>
        </div>

        {/* Filters */}
        <Card className={`mb-6 ${theme === "dark" ? "bg-gray-800 border-gray-700" : ""}`}>
          <CardContent className="p-4">
            <h3 className={`text-lg font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              <Filter className="h-5 w-5 inline mr-2" />
              {t("filters.title")}
            </h3>
            <div className="space-y-3">
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                  {t("filters.category")}
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`w-full p-2 border rounded-md ${
                    theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                  }`}
                >
                  <option value="all">{t("filters.all.categories")}</option>
                  {getCategories().map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                  {t("filters.difficulty")}
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className={`w-full p-2 border rounded-md ${
                    theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                  }`}
                >
                  <option value="all">{t("filters.all.difficulties")}</option>
                  {getDifficulties().map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {t(`difficulty.${difficulty}`)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className={`text-sm mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              {t("filters.questions.available", { count: filteredQuestions.length })}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card
            className={`cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
              theme === "dark" ? "bg-gray-800 border-gray-700" : ""
            }`}
            onClick={() => navigateToMode("training")}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                    {t("menu.training")}
                  </h2>
                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{t("menu.training.desc")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
              theme === "dark" ? "bg-gray-800 border-gray-700" : ""
            }`}
            onClick={() => navigateToMode("quiz", { mode: "normal" })}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                    {t("menu.quiz")}
                  </h2>
                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{t("menu.quiz.desc")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
              theme === "dark" ? "bg-gray-800 border-gray-700" : ""
            }`}
            onClick={() => navigateToMode("quiz", { mode: "challenge" })}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <Zap className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                    {t("menu.challenge")}
                  </h2>
                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    {t("menu.challenge.desc")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
              theme === "dark" ? "bg-gray-800 border-gray-700" : ""
            }`}
            onClick={() => navigateToMode("quiz", { mode: "typing" })}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <PenTool className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                    {t("menu.typing")}
                  </h2>
                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{t("menu.typing.desc")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {wrongAnswers.size > 0 && (
            <Card
              className={`cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                theme === "dark" ? "bg-gray-800 border-gray-700" : ""
              }`}
              onClick={() => navigateToMode("quiz", { mode: "retry" })}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <RefreshCw className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                      {t("menu.retry")}
                    </h2>
                    <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                      {t("menu.retry.desc", { count: wrongAnswers.size })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card
            className={`cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
              theme === "dark" ? "bg-gray-800 border-gray-700" : ""
            }`}
            onClick={() => navigateToMode("stats")}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                    {t("menu.stats")}
                  </h2>
                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{t("menu.stats.desc")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
