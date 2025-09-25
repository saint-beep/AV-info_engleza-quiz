"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Trophy, CheckCircle, XCircle, Star, Lightbulb } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { questions, getQuestionsByLanguage } from "../../data/questions"
import { matchAnswer } from "../../utils/textMatcher"

interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

interface CurrentQuestionData {
  question: string
  answer: string
  explanation: string
  category: string
  difficulty: string
}

export default function QuizPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [language, setLanguage] = useState<"ro" | "en">("ro")
  const [mode, setMode] = useState<"normal" | "challenge" | "retry" | "typing">("normal")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showAnswer, setShowAnswer] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState<Set<number>>(new Set())
  const [currentStreak, setCurrentStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isQuizComplete, setIsQuizComplete] = useState(false)
  const [filteredQuestions, setFilteredQuestions] = useState(questions)
  const [confidence, setConfidence] = useState<number>(3)
  const [showConfidence, setShowConfidence] = useState(false)
  const [currentOptions, setCurrentOptions] = useState<QuizOption[]>([])
  const [currentQuestionData, setCurrentQuestionData] = useState<CurrentQuestionData | null>(null)
  const [lives, setLives] = useState(3)
  const [userTypedAnswer, setUserTypedAnswer] = useState("")
  const [typingResult, setTypingResult] = useState<{
    isMatch: boolean
    score: number
    matchedKeywords: string[]
    missedKeywords: string[]
  } | null>(null)

  // Generate smart distractors - same as before
  const generateSmartDistractors = (correctAnswer: string, category: string, language: "ro" | "en") => {
    const distractors = {
      ro: {
        Programming: [
          "Această metodă alternativă se bazează pe principii diferite de implementare și folosește algoritmi optimizați pentru scenarii specifice. Avantajele includ adaptabilitatea la diverse contexte și flexibilitatea în configurare.",
          "Abordarea complementară utilizează tehnici avansate de procesare și structuri de date specializate pentru eficiență maximă. Caracteristicile principale includ scalabilitatea și robustețea sistemului.",
        ],
        Database: [
          "Sistemul de gestiune utilizează structuri ierarhice pentru organizarea datelor în format XML. Relațiile se stabilesc prin referințe directe între noduri și permit navigarea rapidă prin structura arborescente.",
          "Baza de date orientată pe obiecte stochează informațiile în containere specializate. Tipurile de asocieri includ: agregare (1:1), compoziție (1:N), și moștenire (M:N) pentru modelarea complexă.",
        ],
        Algorithms: [
          "Algoritmul de împărțire progresivă segmentează datele în bucăți de dimensiuni variabile. Procesul continuă până când fiecare segment conține exact un element, apoi recombină rezultatele folosind tehnici de agregare.",
          "Metoda de sortare adaptivă analizează mai întâi distribuția datelor pentru a selecta strategia optimă. Utilizează comparații inteligente și ajustează comportamentul în funcție de caracteristicile setului de date.",
        ],
        "Computer Science": [
          "Unitatea fundamentală este octetul (8 cifre binare) care poate reprezenta 256 de valori distincte. Multiplii includ: kilooctet (1000 octeti), megaoctet (1000 KO), gigaoctet (1000 MO), teraoctet (1000 GO).",
          "Măsura de bază este nibble-ul (4 biți) folosit în reprezentarea hexazecimală. Unitățile derivate sunt: word (16 biți), double word (32 biți), quad word (64 biți) pentru arhitecturi moderne.",
        ],
        OOP: [
          "O instanță este o implementare specifică a unui șablon abstract care definește comportamente și proprietăți comune. Exemplu: șablonul Animal are implementări concrete precum Câine(latră(), culoare) și Pisică(miaună(), vârstă).",
          "Un modul este o unitate de cod care grupează funcționalități înrudite și expune o interfață publică. Conține proceduri (acțiuni) și variabile (stare) care colaborează pentru a îndeplini o responsabilitate specifică.",
        ],
        Security: [
          "Protecția cibernetică folosește algoritmi de obfuscare pentru a ascunde conținutul sensibil. Tehnici: codificarea Base64, hash-urile MD5, certificatele SSL, rețelele private, actualizările automate, validarea intrărilor.",
          "Securitatea informațională implementează protocoale de autentificare multi-nivel pentru verificarea identității. Include: scanarea biometrică, token-uri hardware, parole dinamice, monitorizarea comportamentului, alertele în timp real.",
        ],
        AI: [
          "Inteligența computațională simulează procesele cognitive prin modele matematice avansate. Domenii: recunoașterea vocală (chatbot-uri), analiza imaginilor (detectarea obiectelor), automatizarea (vehicule autonome), optimizarea (planificare), diagnosticarea (sisteme medicale).",
          "Învățarea automată folosește algoritmi statistici pentru identificarea tiparelor în seturi mari de date. Aplicații: recomandări personalizate, traducerea automată, recunoașterea facială, conducerea autonomă, asistența medicală, jocurile strategice.",
        ],
        "Web Development": [
          "Tehnologii frontend: HTML5 (semantică), CSS3 (animații), TypeScript (tipizare). Backend: limbaje server (Node.js, Python, Ruby), baze de date (MongoDB, Redis). Framework-uri: Vue.js, Svelte, Next.js. Instrumente: Docker, Kubernetes, CI/CD.",
          "Stack modern: React Native (mobile), GraphQL (API), Serverless (cloud), PWA (aplicații web). Tehnologii: WebAssembly, Service Workers, Web Components. Instrumente: Webpack, Vite, ESLint, Jest for development and testing.",
        ],
        "Software Engineering": [
          "Metodologia Kanban: fluxuri continue, limitarea work-in-progress, optimizarea timpului de livrare. Ceremonii: daily standups, review-uri săptămânale, retrospective lunare. Artefacte: board vizual, metrici de performanță, rapoarte de progres.",
          "Frameworkul SAFe: planificare ierarhică, sincronizarea echipelor, livrarea incrementală. Evenimente: PI Planning, System Demo, Inspect & Adapt. Roluri: Release Train Engineer, Product Manager, System Architect for coordonare.",
        ],
      },
      en: {
        Programming: [
          "This alternative method is based on different implementation principles and uses optimized algorithms for specific scenarios. Advantages include adaptability to diverse contexts and configuration flexibility.",
          "The complementary approach utilizes advanced processing techniques and specialized data structures for maximum efficiency. Key characteristics include system scalability and robustness.",
        ],
        Database: [
          "The management system uses hierarchical structures to organize data in XML format. Relationships are established through direct references between nodes and allow rapid navigation through tree structures.",
          "Object-oriented database stores information in specialized containers. Association types include: aggregation (1:1), composition (1:N), and inheritance (M:N) for complex modeling.",
        ],
        Algorithms: [
          "Progressive division algorithm segments data into variable-sized chunks. The process continues until each segment contains exactly one element, then recombines results using aggregation techniques.",
          "Adaptive sorting method first analyzes data distribution to select optimal strategy. Uses intelligent comparisons and adjusts behavior based on dataset characteristics.",
        ],
        "Computer Science": [
          "The fundamental unit is the byte (8 binary digits) which can represent 256 distinct values. Multiples include: kilobyte (1000 bytes), megabyte (1000 KB), gigabyte (1000 MB), terabyte (1000 GB).",
          "The base measure is the nibble (4 bits) used in hexadecimal representation. Derived units are: word (16 bits), double word (32 bits), quad word (64 bits) for modern architectures.",
        ],
        OOP: [
          "An instance is a specific implementation of an abstract template that defines common behaviors and properties. Example: Animal template has concrete implementations like Dog(bark(), color) and Cat(meow(), age).",
          "A module is a code unit that groups related functionalities and exposes a public interface. Contains procedures (actions) and variables (state) that collaborate to fulfill a specific responsibility.",
        ],
        Security: [
          "Cyber protection uses obfuscation algorithms to hide sensitive content. Techniques: Base64 encoding, MD5 hashes, SSL certificates, private networks, automatic updates, input validation.",
          "Information security implements multi-level authentication protocols for identity verification. Includes: biometric scanning, hardware tokens, dynamic passwords, behavior monitoring, real-time alerts.",
        ],
        AI: [
          "Computational intelligence simulates cognitive processes through advanced mathematical models. Domains: speech recognition (chatbots), image analysis (object detection), automation (autonomous vehicles), optimization (planning), diagnosis (medical systems).",
          "Machine learning uses statistical algorithms to identify patterns in large datasets. Applications: personalized recommendations, automatic translation, facial recognition, autonomous driving, medical assistance, strategic games.",
        ],
        "Web Development": [
          "Frontend technologies: HTML5 (semantics), CSS3 (animations), TypeScript (typing). Backend: server languages (Node.js, Python, Ruby), databases (MongoDB, Redis). Frameworks: Vue.js, Svelte, Next.js. Tools: Docker, Kubernetes, CI/CD.",
          "Modern stack: React Native (mobile), GraphQL (API), Serverless (cloud), PWA (web apps). Technologies: WebAssembly, Service Workers, Web Components. Tools: Webpack, Vite, ESLint, Jest for development and testing.",
        ],
        "Software Engineering": [
          "Kanban methodology: continuous flows, work-in-progress limitation, delivery time optimization. Ceremonies: daily standups, weekly reviews, monthly retrospectives. Artifacts: visual board, performance metrics, progress reports.",
          "SAFe framework: hierarchical planning, team synchronization, incremental delivery. Events: PI Planning, System Demo, Inspect & Adapt. Roles: Release Train Engineer, Product Manager, System Architect for coordination.",
        ],
      },
    }

    return (
      distractors[language][category as keyof (typeof distractors)[typeof language]] ||
      distractors[language]["Programming"]
    )
  }

  // Generate options with smart distractors
  const generateOptions = (correctAnswer: string, category: string, language: "ro" | "en") => {
    const options: QuizOption[] = [{ id: "A", text: correctAnswer, isCorrect: true }]

    const smartDistractors = generateSmartDistractors(correctAnswer, category, language)
    smartDistractors.slice(0, 2).forEach((distractor, index) => {
      options.push({
        id: String.fromCharCode(66 + index),
        text: distractor,
        isCorrect: false,
      })
    })

    return options
      .sort(() => Math.random() - 0.5)
      .map((option, index) => ({
        ...option,
        id: String.fromCharCode(65 + index),
      }))
  }

  // Load question data when index changes
  useEffect(() => {
    if (filteredQuestions.length > 0 && !showAnswer) {
      const displayQuestions = getQuestionsByLanguage(filteredQuestions, language)
      const questionData = displayQuestions[currentQuestionIndex]
      if (questionData) {
        setCurrentQuestionData({
          question: questionData.question,
          answer: questionData.answer,
          explanation: questionData.explanation,
          category: questionData.category,
          difficulty: questionData.difficulty,
        })
        const options = generateOptions(questionData.answer, questionData.category, language)
        setCurrentOptions(options)
      }
    }
  }, [currentQuestionIndex, filteredQuestions, language])

  useEffect(() => {
    const category = searchParams.get("category")
    const difficulty = searchParams.get("difficulty")
    const urlLanguage = searchParams.get("language") as "ro" | "en"
    const urlTheme = searchParams.get("theme") as "light" | "dark"
    const urlMode = searchParams.get("mode") as "normal" | "challenge" | "retry" | "typing"

    if (urlLanguage) setLanguage(urlLanguage)
    if (urlTheme) setTheme(urlTheme)
    if (urlMode) setMode(urlMode)

    const savedBestStreak = localStorage.getItem("bestStreak")
    if (savedBestStreak) {
      setBestStreak(Number.parseInt(savedBestStreak))
    }

    let filtered = questions

    if (urlMode === "retry") {
      const savedWrongAnswers = localStorage.getItem("wrongAnswers")
      if (savedWrongAnswers) {
        const wrongIds = JSON.parse(savedWrongAnswers)
        filtered = questions.filter((_, index) => wrongIds.includes(index))
      }
    } else {
      if (category && category !== "all") {
        filtered = filtered.filter((q) => q.category === category)
      }
      if (difficulty && difficulty !== "all") {
        filtered = filtered.filter((q) => q.difficulty === difficulty)
      }
    }

    setFilteredQuestions(filtered.sort(() => Math.random() - 0.5))
  }, [searchParams])

  useEffect(() => {
    if (mode === "challenge" && timeLeft > 0 && !showAnswer && !isQuizComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (mode === "challenge" && timeLeft === 0 && !showAnswer && !isQuizComplete) {
      handleAnswer("")
    }
  }, [timeLeft, showAnswer, isQuizComplete, mode])

  const handleAnswer = (answer: string) => {
    if (showAnswer) return

    setSelectedAnswer(answer)

    if (mode === "typing") {
      const result = matchAnswer(userTypedAnswer, currentQuestionData.answer)
      setTypingResult(result)

      if (result.isMatch) {
        setCorrectAnswers((prev) => prev + 1)
        setCurrentStreak((prev) => prev + 1)
      } else {
        setWrongAnswers((prev) => new Set([...prev, currentQuestionIndex]))
        setCurrentStreak(0)
      }
    } else {
      const correctOption = currentOptions.find((opt) => opt.isCorrect)
      const isCorrect = answer === correctOption?.id

      if (isCorrect) {
        setCorrectAnswers((prev) => prev + 1)
        setCurrentStreak((prev) => prev + 1)
      } else {
        setWrongAnswers((prev) => new Set([...prev, currentQuestionIndex]))
        setCurrentStreak(0)

        // Lose a life in challenge mode
        if (mode === "challenge") {
          setLives((prev) => prev - 1)
        }
      }
    }

    setShowAnswer(true)

    setTimeout(() => {
      setShowConfidence(true)
    }, 100)
  }

  const handleNext = () => {
    if (!showAnswer) return

    // Check if lives are 0 in challenge mode
    if (mode === "challenge" && lives <= 0) {
      // Reset quiz
      setCurrentQuestionIndex(0)
      setSelectedAnswer("")
      setShowAnswer(false)
      setShowConfidence(false)
      setCorrectAnswers(0)
      setWrongAnswers(new Set())
      setCurrentStreak(0)
      setLives(3)
      setTimeLeft(30)
      setConfidence(3)
      setFilteredQuestions([...filteredQuestions].sort(() => Math.random() - 0.5))
      return
    }

    if (currentStreak > bestStreak) {
      setBestStreak(currentStreak)
      localStorage.setItem("bestStreak", currentStreak.toString())
    }

    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setShowAnswer(false)
      setShowConfidence(false)
      setSelectedAnswer("")
      setConfidence(3)
      setCurrentQuestionIndex((prev) => prev + 1)
      setTimeLeft(30)
      setUserTypedAnswer("")
      setTypingResult(null)
    } else {
      setIsQuizComplete(true)
      localStorage.setItem("wrongAnswers", JSON.stringify(Array.from(wrongAnswers)))

      const stats = {
        totalQuestions: filteredQuestions.length,
        correctAnswers,
        averageTime: mode === "challenge" ? 30 : 60,
        categoriesStudied: new Set(filteredQuestions.map((q) => q.category)),
        studyTime: filteredQuestions.length * (mode === "challenge" ? 30 : 60),
      }
      localStorage.setItem(
        "quizStats",
        JSON.stringify({
          ...stats,
          categoriesStudied: Array.from(stats.categoriesStudied),
        }),
      )
    }
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer("")
    setShowAnswer(false)
    setCorrectAnswers(0)
    setWrongAnswers(new Set())
    setCurrentStreak(0)
    setTimeLeft(30)
    setIsQuizComplete(false)
    setLives(3)
    setFilteredQuestions([...filteredQuestions].sort(() => Math.random() - 0.5))
    setUserTypedAnswer("")
    setTypingResult(null)
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

  const t = (key: string, params?: Record<string, string | number>) => {
    const translations = {
      ro: {
        "quiz.question": "Întrebarea {current} din {total}",
        "quiz.correct": "Corecte: {count}",
        "quiz.wrong": "Greșite: {count}",
        "quiz.remaining": "Rămase: {count}",
        "quiz.explanation": "Explicație",
        "quiz.confidence": "Cât de sigur ai fost cu acest răspuns?",
        "quiz.next": "Următoarea Întrebare",
        "quiz.complete": "Quiz Completat!",
        "quiz.final.score": "Scor Final: {correct} corecte din {total}",
        "quiz.accuracy": "Acuratețe: {percent}%",
        "quiz.final.streak": "Streak Final: {count}",
        "quiz.take.again": "Ia Quiz-ul Din Nou",
        "common.back": "Înapoi",
        "quiz.select.answer": "Selectează răspunsul:",
        "quiz.type.answer": "Scrie răspunsul:",
        "quiz.type.placeholder": "Introdu răspunsul aici...",
        "quiz.score": "Scor: {score}%",
        "quiz.matched.keywords": "Cuvinte corecte: {keywords}",
        "quiz.missed.keywords": "Cuvinte lipsă: {keywords}",
        "quiz.submit": "Verifică Răspunsul",
      },
      en: {
        "quiz.question": "Question {current} of {total}",
        "quiz.correct": "Correct: {count}",
        "quiz.wrong": "Wrong: {count}",
        "quiz.remaining": "Remaining: {count}",
        "quiz.explanation": "Explanation",
        "quiz.confidence": "How confident were you with this answer?",
        "quiz.next": "Next Question",
        "quiz.complete": "Quiz Complete!",
        "quiz.final.score": "Final Score: {correct} correct out of {total}",
        "quiz.accuracy": "Accuracy: {percent}%",
        "quiz.final.streak": "Final Streak: {count}",
        "quiz.take.again": "Take Quiz Again",
        "common.back": "Back",
        "quiz.select.answer": "Select your answer:",
        "quiz.type.answer": "Type your answer:",
        "quiz.type.placeholder": "Enter your answer here...",
        "quiz.score": "Score: {score}%",
        "quiz.matched.keywords": "Correct words: {keywords}",
        "quiz.missed.keywords": "Missing words: {keywords}",
        "quiz.submit": "Check Answer",
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

  if (filteredQuestions.length === 0 || !currentQuestionData) {
    return (
      <div className={`min-h-screen p-4 ${theme === "dark" ? "bg-gray-900" : "bg-blue-50"}`}>
        <div className="max-w-2xl mx-auto pt-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-bold mb-4">Loading...</h2>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isQuizComplete) {
    const accuracy = Math.round((correctAnswers / filteredQuestions.length) * 100)

    return (
      <div className={`min-h-screen p-4 ${theme === "dark" ? "bg-gray-900" : "bg-blue-50"}`}>
        <div className="max-w-2xl mx-auto pt-8">
          <Card className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
            <CardContent className="p-8 text-center">
              <Trophy className={`h-16 w-16 mx-auto mb-4 ${accuracy >= 80 ? "text-yellow-500" : "text-gray-400"}`} />
              <h2 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                {t("quiz.complete")}
              </h2>
              <div className="space-y-2 mb-6">
                <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  {t("quiz.final.score", { correct: correctAnswers, total: filteredQuestions.length })}
                </p>
                <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  {t("quiz.accuracy", { percent: accuracy })}
                </p>
                <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  {t("quiz.final.streak", { count: bestStreak })}
                </p>
              </div>
              <div className="flex justify-center space-x-4">
                <Button onClick={restartQuiz}>{t("quiz.take.again")}</Button>
                <Button variant="outline" onClick={() => router.push("/")}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t("common.back")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen p-4 ${theme === "dark" ? "bg-gray-900" : "bg-blue-50"}`}>
      <div className="max-w-2xl mx-auto pt-8">
        {/* Stats Bar */}
        <Card className={`mb-4 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/")}
                className={theme === "dark" ? "bg-gray-700 text-white border-gray-600" : ""}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                {t("common.back")}
              </Button>
              <div className="flex space-x-6 text-sm font-medium">
                <span className="text-green-600">{t("quiz.correct", { count: correctAnswers })}</span>
                <span className="text-red-600">{t("quiz.wrong", { count: wrongAnswers.size })}</span>
                <span className="text-blue-600">
                  {t("quiz.remaining", { count: filteredQuestions.length - currentQuestionIndex - 1 })}
                </span>
                {mode === "challenge" && <span className="text-purple-600 flex items-center">❤️ {lives}</span>}
              </div>
              <div className="w-16"></div> {/* Spacer for balance */}
            </div>
          </CardContent>
        </Card>

        {/* Question Header */}
        <Card className={`mb-6 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <span className={`text-sm font-medium ${theme === "dark" ? "text-blue-300" : "text-blue-600"}`}>
                {t("quiz.question", { current: currentQuestionIndex + 1, total: filteredQuestions.length })}
              </span>
              <div className="flex space-x-2">
                <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(currentQuestionData.category)}`}>
                  {currentQuestionData.category}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(currentQuestionData.difficulty)}`}>
                  {currentQuestionData.difficulty}
                </span>
              </div>
            </div>

            {mode === "challenge" && (
              <div className="flex items-center justify-center mb-4">
                <Clock className="h-5 w-5 text-red-500 mr-2" />
                <span
                  className={`font-bold ${timeLeft <= 10 ? "text-red-500" : theme === "dark" ? "text-white" : "text-gray-800"}`}
                >
                  {timeLeft}s
                </span>
              </div>
            )}

            <h2 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              {currentQuestionData.question}
            </h2>
          </CardContent>
        </Card>

        {mode === "typing" ? (
          // Typing Interface
          <Card className={`mb-6 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
            <CardContent className="p-4">
              <label
                className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
              >
                {t("quiz.type.answer")}
              </label>
              <textarea
                value={userTypedAnswer}
                onChange={(e) => setUserTypedAnswer(e.target.value)}
                placeholder={t("quiz.type.placeholder")}
                disabled={showAnswer}
                className={`w-full p-3 border rounded-md min-h-[120px] resize-none ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                } ${showAnswer ? "opacity-60" : ""}`}
              />

              {!showAnswer && (
                <Button onClick={() => handleAnswer("")} disabled={!userTypedAnswer.trim()} className="mt-3 w-full">
                  {t("quiz.submit")}
                </Button>
              )}

              {/* Typing Results */}
              {showAnswer && typingResult && (
                <div className="mt-4 space-y-3">
                  <div
                    className={`p-3 rounded-md ${
                      typingResult.isMatch ? "bg-green-100 border border-green-200" : "bg-red-100 border border-red-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-medium ${typingResult.isMatch ? "text-green-800" : "text-red-800"}`}>
                        {typingResult.isMatch ? "✅ Corect!" : "❌ Încercă din nou!"}
                      </span>
                      <span
                        className={`text-sm font-medium ${typingResult.isMatch ? "text-green-700" : "text-red-700"}`}
                      >
                        {t("quiz.score", { score: typingResult.score })}
                      </span>
                    </div>

                    {typingResult.matchedKeywords.length > 0 && (
                      <p className={`text-sm mb-1 ${typingResult.isMatch ? "text-green-700" : "text-red-700"}`}>
                        {t("quiz.matched.keywords", { keywords: typingResult.matchedKeywords.join(", ") })}
                      </p>
                    )}

                    {typingResult.missedKeywords.length > 0 && (
                      <p className={`text-sm ${typingResult.isMatch ? "text-green-700" : "text-red-700"}`}>
                        {t("quiz.missed.keywords", { keywords: typingResult.missedKeywords.slice(0, 5).join(", ") })}
                      </p>
                    )}
                  </div>

                  {/* Show correct answer */}
                  <div className={`p-3 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-blue-50"}`}>
                    <p className={`text-sm font-medium mb-1 ${theme === "dark" ? "text-blue-300" : "text-blue-800"}`}>
                      Răspuns complet:
                    </p>
                    <p className={`text-sm ${theme === "dark" ? "text-blue-200" : "text-blue-700"}`}>
                      {currentQuestionData.answer}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          // Existing Multiple Choice Interface
          <div className="space-y-3 mb-6">
            {currentOptions.map((option) => {
              let bgColor = ""
              let borderColor = ""
              let textColor = ""

              if (showAnswer) {
                if (option.isCorrect) {
                  bgColor = "bg-green-100"
                  borderColor = "border-green-300"
                  textColor = "text-green-800"
                } else if (selectedAnswer === option.id) {
                  bgColor = "bg-red-100"
                  borderColor = "border-red-300"
                  textColor = "text-red-800"
                } else {
                  bgColor = theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                  borderColor = theme === "dark" ? "border-gray-600" : "border-gray-200"
                  textColor = theme === "dark" ? "text-gray-300" : "text-gray-600"
                }
              } else {
                bgColor = selectedAnswer === option.id ? "bg-blue-100" : theme === "dark" ? "bg-gray-800" : "bg-white"
                borderColor =
                  selectedAnswer === option.id
                    ? "border-blue-300"
                    : theme === "dark"
                      ? "border-gray-600"
                      : "border-gray-200"
                textColor = theme === "dark" ? "text-white" : "text-gray-800"
              }

              return (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all duration-200 ${bgColor} ${borderColor} ${
                    showAnswer ? "" : "hover:shadow-md"
                  }`}
                  onClick={() => !showAnswer && handleAnswer(option.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <span className={`font-bold mr-3 ${textColor}`}>{option.id}.</span>
                      <span className={`flex-1 ${textColor}`}>{option.text}</span>
                      {showAnswer && option.isCorrect && (
                        <CheckCircle className="h-5 w-5 text-green-600 ml-2 flex-shrink-0" />
                      )}
                      {showAnswer && selectedAnswer === option.id && !option.isCorrect && (
                        <XCircle className="h-5 w-5 text-red-600 ml-2 flex-shrink-0" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Explanation */}
        {showAnswer && currentQuestionData.explanation && (
          <Card
            className={`mb-6 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-yellow-50 border-yellow-200"}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start">
                <Lightbulb
                  className={`h-5 w-5 mr-2 mt-0.5 ${theme === "dark" ? "text-yellow-400" : "text-yellow-600"}`}
                />
                <div>
                  <p className={`font-medium mb-1 ${theme === "dark" ? "text-yellow-300" : "text-yellow-800"}`}>
                    {t("quiz.explanation")}
                  </p>
                  <p className={theme === "dark" ? "text-yellow-200" : "text-yellow-700"}>
                    {currentQuestionData.explanation}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Confidence Rating */}
        {showConfidence && (
          <Card className={`mb-6 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
            <CardContent className="p-4">
              <p className={`text-sm font-medium mb-3 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                {t("quiz.confidence")}
              </p>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <Button
                    key={level}
                    variant={confidence === level ? "default" : "outline"}
                    size="sm"
                    onClick={() => setConfidence(level)}
                    className="w-12 h-12"
                  >
                    <Star className={`h-4 w-4 ${confidence >= level ? "fill-current" : ""}`} />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Game Over Message for Challenge Mode */}
        {mode === "challenge" && lives <= 0 && showAnswer && (
          <Card className="mb-6 bg-red-50 border-red-200">
            <CardContent className="p-4 text-center">
              <h3 className="text-lg font-bold text-red-800 mb-2">Game Over!</h3>
              <p className="text-red-700 mb-3">Ai pierdut toate vieţile! Quiz-ul se va reseta.</p>
              <p className="text-sm text-red-600">Apasă "Next" pentru a reîncepe.</p>
            </CardContent>
          </Card>
        )}

        {/* Next Button */}
        {showAnswer && (
          <Button onClick={handleNext} className="w-full" size="lg">
            {currentQuestionIndex < filteredQuestions.length - 1 ? t("quiz.next") : t("quiz.complete")}
          </Button>
        )}
      </div>
    </div>
  )
}
