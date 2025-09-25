"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shuffle, Star, BookOpen, Bookmark, Calendar, Search, X, Filter } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { questions, getQuestionsByLanguage } from "../../data/questions"

export default function TrainingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [language, setLanguage] = useState<"ro" | "en">("ro")
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())
  const [showAllAnswers, setShowAllAnswers] = useState(false)
  const [filteredQuestions, setFilteredQuestions] = useState(questions)
  const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set())
  const [tomorrowQuestions, setTomorrowQuestions] = useState<Set<number>>(new Set())
  const [showOnlyMarked, setShowOnlyMarked] = useState(false)
  const [showOnlyTomorrow, setShowOnlyTomorrow] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [cardsPerPage] = useState(8)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  useEffect(() => {
    // Get params from URL
    const category = searchParams.get("category")
    const difficulty = searchParams.get("difficulty")
    const urlLanguage = searchParams.get("language") as "ro" | "en"
    const urlTheme = searchParams.get("theme") as "light" | "dark"

    if (urlLanguage) setLanguage(urlLanguage)
    if (urlTheme) setTheme(urlTheme)
    if (category) setSelectedCategory(category)
    if (difficulty) setSelectedDifficulty(difficulty)

    // Filter questions
    let filtered = questions

    if (category && category !== "all") {
      filtered = filtered.filter((q) => q.category === category)
    }

    if (difficulty && difficulty !== "all") {
      filtered = filtered.filter((q) => q.difficulty === difficulty)
    }

    setFilteredQuestions(filtered)
  }, [searchParams])

  useEffect(() => {
    // Load saved data with better error handling
    try {
      const savedMarkedQuestions = localStorage.getItem("markedQuestions")
      if (savedMarkedQuestions) {
        const parsed = JSON.parse(savedMarkedQuestions)
        setMarkedQuestions(new Set(Array.isArray(parsed) ? parsed : []))
      }

      const savedTomorrowQuestions = localStorage.getItem("tomorrowQuestions")
      if (savedTomorrowQuestions) {
        const tomorrowData = JSON.parse(savedTomorrowQuestions)

        if (tomorrowData && tomorrowData.questions && Array.isArray(tomorrowData.questions)) {
          setTomorrowQuestions(new Set(tomorrowData.questions))
        }
      }
    } catch (error) {
      console.error("Error loading saved data:", error)
      // Clear corrupted data
      localStorage.removeItem("markedQuestions")
      localStorage.removeItem("tomorrowQuestions")
    }
  }, [])

  // Memoize the display questions with search functionality
  const displayQuestions = useMemo(() => {
    const questionsWithLanguage = getQuestionsByLanguage(filteredQuestions, language)

    // Add original index to each question for tracking
    let questionsWithIndex = questionsWithLanguage.map((q, index) => ({
      ...q,
      originalIndex: index,
      globalIndex: questions.findIndex((originalQ) => originalQ.question === filteredQuestions[index].question),
    }))

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      questionsWithIndex = questionsWithIndex.filter(
        (q) =>
          q.question.toLowerCase().includes(searchLower) ||
          q.answer.toLowerCase().includes(searchLower) ||
          q.category.toLowerCase().includes(searchLower),
      )
    }

    // Apply other filters
    if (showOnlyMarked) {
      questionsWithIndex = questionsWithIndex.filter((q) => markedQuestions.has(q.globalIndex))
    }

    if (showOnlyTomorrow) {
      questionsWithIndex = questionsWithIndex.filter((q) => tomorrowQuestions.has(q.globalIndex))
    }

    return questionsWithIndex
  }, [filteredQuestions, language, showOnlyMarked, showOnlyTomorrow, markedQuestions, tomorrowQuestions, searchTerm])

  // Pagination
  const totalPages = Math.ceil(displayQuestions.length / cardsPerPage)
  const paginatedQuestions = displayQuestions.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage)

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  const flipCard = (index: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev)
      const cardId = currentPage * cardsPerPage + index
      if (newSet.has(cardId)) {
        newSet.delete(cardId)
      } else {
        newSet.add(cardId)
      }
      return newSet
    })
  }

  const toggleAllAnswers = () => {
    setShowAllAnswers((prev) => !prev)
    if (!showAllAnswers) {
      const allCardIds = paginatedQuestions.map((_, index) => currentPage * cardsPerPage + index)
      setFlippedCards(new Set(allCardIds))
    } else {
      setFlippedCards(new Set())
    }
  }

  const shuffleQuestions = () => {
    setFilteredQuestions([...filteredQuestions].sort(() => Math.random() - 0.5))
    setFlippedCards(new Set())
    setCurrentPage(0)
  }

  const toggleMarkQuestion = (globalIndex: number) => {
    setMarkedQuestions((prev) => {
      const newSet = new Set(prev)

      if (newSet.has(globalIndex)) {
        newSet.delete(globalIndex)
      } else {
        newSet.add(globalIndex)
      }

      // Save with better error handling
      try {
        localStorage.setItem("markedQuestions", JSON.stringify(Array.from(newSet)))
      } catch (error) {
        console.error("Error saving marked questions:", error)
      }

      return newSet
    })
  }

  const toggleTomorrowQuestion = (globalIndex: number) => {
    setTomorrowQuestions((prev) => {
      const newSet = new Set(prev)

      if (newSet.has(globalIndex)) {
        newSet.delete(globalIndex)
      } else {
        newSet.add(globalIndex)
      }

      // Save with better structure and error handling
      try {
        const tomorrowData = {
          questions: Array.from(newSet),
          savedAt: new Date().toISOString(),
        }
        localStorage.setItem("tomorrowQuestions", JSON.stringify(tomorrowData))
      } catch (error) {
        console.error("Error saving tomorrow questions:", error)
      }

      return newSet
    })
  }

  const toggleShowMarked = () => {
    setShowOnlyMarked((prev) => !prev)
    setShowOnlyTomorrow(false)
    setCurrentPage(0)
    setFlippedCards(new Set())
  }

  const toggleShowTomorrow = () => {
    setShowOnlyTomorrow((prev) => !prev)
    setShowOnlyMarked(false)
    setCurrentPage(0)
    setFlippedCards(new Set())
  }

  const clearSearch = () => {
    setSearchTerm("")
    setCurrentPage(0)
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(0)
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Programming: "bg-blue-100 text-blue-800",
      Database: "bg-green-100 text-green-800",
      Algorithms: "bg-purple-100 text-purple-800",
      "Computer Science": "bg-gray-100 text-gray-800",
      OOP: "bg-orange-100 text-orange-800",
      Security: "bg-red-100 text-red-800",
      AI: "bg-pink-100 text-pink-800",
      "Web Development": "bg-cyan-100 text-cyan-800",
      "Software Engineering": "bg-indigo-100 text-indigo-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      hard: "bg-red-100 text-red-800",
    }
    return colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getCategories = () => {
    return [...new Set(questions.map((q) => q.category))]
  }

  const getDifficulties = () => {
    return [...new Set(questions.map((q) => q.difficulty))]
  }

  const t = (key: string, params?: Record<string, string | number>) => {
    const translations = {
      ro: {
        "training.title": "Mod Antrenament",
        "training.cards": "{count} carduri",
        "training.show.answers": "Arată Toate Răspunsurile",
        "training.show.questions": "Arată Toate Întrebările",
        "training.shuffle": "Amestecă",
        "training.flip.back": "Click pentru a întoarce",
        "common.back": "Înapoi",
        "difficulty.easy": "ușor",
        "difficulty.medium": "mediu",
        "difficulty.hard": "greu",
        "training.tomorrow": "Mâine ({count})",
        "training.marked": "Marcate ({count})",
        "training.all": "Toate",
        "training.search": "Caută întrebări...",
        "training.page": "Pagina {current} din {total}",
        "training.no.results": "Nu s-au găsit rezultate pentru căutarea ta.",
        "filters.category": "Categorie",
        "filters.difficulty": "Dificultate",
        "filters.all.categories": "Toate Categoriile",
        "filters.all.difficulties": "Toate Dificultățile",
      },
      en: {
        "training.title": "Training Mode",
        "training.cards": "{count} cards",
        "training.show.answers": "Show All Answers",
        "training.show.questions": "Show All Questions",
        "training.shuffle": "Shuffle",
        "training.flip.back": "Click to flip back",
        "common.back": "Back",
        "difficulty.easy": "easy",
        "difficulty.medium": "medium",
        "difficulty.hard": "hard",
        "training.tomorrow": "Tomorrow ({count})",
        "training.marked": "Marked ({count})",
        "training.all": "All",
        "training.search": "Search questions...",
        "training.page": "Page {current} of {total}",
        "training.no.results": "No results found for your search.",
        "filters.category": "Category",
        "filters.difficulty": "Difficulty",
        "filters.all.categories": "All Categories",
        "filters.all.difficulties": "All Difficulties",
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
          : "bg-gradient-to-br from-green-50 to-emerald-100"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <Card className={`mb-6 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardContent className="p-4">
            {/* Top row with back button and controls */}
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                onClick={() => router.push("/")}
                className={`${
                  theme === "dark"
                    ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("common.back")}
              </Button>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSearch(!showSearch)}
                  className={`${showSearch ? "bg-blue-100 text-blue-800 border-blue-300" : ""} ${
                    theme === "dark"
                      ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Search className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`${showFilters ? "bg-purple-100 text-purple-800 border-purple-300" : ""} ${
                    theme === "dark"
                      ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Filter className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleTheme}
                  className={`${
                    theme === "dark"
                      ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {theme === "dark" ? "☀️" : "🌙"}
                </Button>
              </div>
            </div>

            {/* Search Bar */}
            {showSearch && (
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t("training.search")}
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className={`w-full pl-10 pr-10 py-2 border rounded-md ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                    }`}
                  />
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearSearch}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Filters */}
            {showFilters && (
              <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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
            )}

            {/* Filter Buttons */}
            <div className="flex items-center justify-center space-x-2 mb-4 flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleShowTomorrow}
                className={`${showOnlyTomorrow ? "bg-blue-100 text-blue-800 border-blue-300" : ""} ${
                  theme === "dark"
                    ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Calendar className="h-4 w-4 mr-1" />
                {showOnlyTomorrow ? t("training.all") : t("training.tomorrow", { count: tomorrowQuestions.size })}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={toggleShowMarked}
                className={`${showOnlyMarked ? "bg-orange-100 text-orange-800 border-orange-300" : ""} ${
                  theme === "dark"
                    ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Bookmark className="h-4 w-4 mr-1" />
                {showOnlyMarked ? t("training.all") : t("training.marked", { count: markedQuestions.size })}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={toggleAllAnswers}
                className={`${
                  theme === "dark"
                    ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {showAllAnswers ? t("training.show.questions") : t("training.show.answers")}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={shuffleQuestions}
                className={`${
                  theme === "dark"
                    ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Shuffle className="h-4 w-4 mr-1" />
                {t("training.shuffle")}
              </Button>
            </div>

            {/* Title and card count */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className={`h-6 w-6 mr-2 ${theme === "dark" ? "text-green-400" : "text-green-600"}`} />
                <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                  {t("training.title")}
                </h1>
              </div>
              <div className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                {t("training.cards", { count: displayQuestions.length })}
                {searchTerm && <span className="text-blue-600 ml-2">(căutare: "{searchTerm}")</span>}
                {showOnlyMarked && <span className="text-orange-600 ml-2">(doar marcate)</span>}
                {showOnlyTomorrow && <span className="text-blue-600 ml-2">(pentru mâine)</span>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* No Results Message */}
        {displayQuestions.length === 0 && (
          <Card className={`mb-6 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
            <CardContent className="p-8 text-center">
              <Search className={`h-16 w-16 mx-auto mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-300"}`} />
              <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                {t("training.no.results")}
              </p>
              {searchTerm && (
                <Button onClick={clearSearch} className="mt-4">
                  Șterge căutarea
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Cards Grid */}
        {paginatedQuestions.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {paginatedQuestions.map((item, index) => {
              const isMarked = markedQuestions.has(item.globalIndex)
              const isForTomorrow = tomorrowQuestions.has(item.globalIndex)
              const cardId = currentPage * cardsPerPage + index

              return (
                <Card
                  key={`${item.globalIndex}-${index}`}
                  className={`cursor-pointer h-64 perspective-1000 transition-all duration-200 hover:shadow-lg ${
                    theme === "dark" ? "bg-gray-800 border-gray-700" : ""
                  } ${isMarked ? "ring-2 ring-orange-400" : ""} ${isForTomorrow ? "ring-2 ring-blue-400" : ""} ${
                    isMarked && isForTomorrow ? "ring-2 ring-purple-400" : ""
                  }`}
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                      flippedCards.has(cardId) ? "rotate-y-180" : ""
                    }`}
                  >
                    {/* Front of card */}
                    <div className="absolute inset-0 w-full h-full backface-hidden">
                      <CardContent className={`p-4 h-full flex flex-col ${theme === "dark" ? "bg-gray-800" : ""}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                              Q{item.originalIndex + 1}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleMarkQuestion(item.globalIndex)
                              }}
                              className={`p-1 h-6 w-6 transition-colors ${
                                isMarked ? "text-orange-500" : "text-gray-400 hover:text-orange-500"
                              }`}
                            >
                              <Bookmark className={`h-3 w-3 ${isMarked ? "fill-current" : ""}`} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleTomorrowQuestion(item.globalIndex)
                              }}
                              className={`p-1 h-6 w-6 transition-colors ${
                                isForTomorrow ? "text-blue-500" : "text-gray-400 hover:text-blue-500"
                              }`}
                            >
                              <Calendar className={`h-3 w-3 ${isForTomorrow ? "fill-current" : ""}`} />
                            </Button>
                          </div>
                          <div className="flex space-x-1">
                            <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(item.category)}`}>
                              {item.category}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(item.difficulty)}`}>
                              {t(`difficulty.${item.difficulty}`)}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 flex items-center" onClick={() => flipCard(index)}>
                          <p className={`text-sm line-clamp-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                            {item.question}
                          </p>
                        </div>
                      </CardContent>
                    </div>

                    {/* Back of card */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                      <CardContent
                        className={`p-4 h-full flex flex-col ${theme === "dark" ? "bg-gray-700" : "bg-green-50"}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded">
                              A{item.originalIndex + 1}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleMarkQuestion(item.globalIndex)
                              }}
                              className={`p-1 h-6 w-6 transition-colors ${
                                isMarked ? "text-orange-500" : "text-gray-400 hover:text-orange-500"
                              }`}
                            >
                              <Bookmark className={`h-3 w-3 ${isMarked ? "fill-current" : ""}`} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleTomorrowQuestion(item.globalIndex)
                              }}
                              className={`p-1 h-6 w-6 transition-colors ${
                                isForTomorrow ? "text-blue-500" : "text-gray-400 hover:text-blue-500"
                              }`}
                            >
                              <Calendar className={`h-3 w-3 ${isForTomorrow ? "fill-current" : ""}`} />
                            </Button>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className={`text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                              {t("training.flip.back")}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 flex items-center" onClick={() => flipCard(index)}>
                          <p className={`text-sm line-clamp-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                            {item.answer}
                          </p>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Card className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className={theme === "dark" ? "bg-gray-700 text-white border-gray-600" : ""}
                >
                  Anterior
                </Button>

                <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  {t("training.page", { current: currentPage + 1, total: totalPages })}
                </span>

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                  disabled={currentPage === totalPages - 1}
                  className={theme === "dark" ? "bg-gray-700 text-white border-gray-600" : ""}
                >
                  Următor
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
