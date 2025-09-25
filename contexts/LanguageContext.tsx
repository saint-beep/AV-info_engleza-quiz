"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "ro" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  ro: {
    // Main menu
    "app.title": "Quiz & Training",
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

    // Filters
    "filters.title": "Filtre",
    "filters.category": "Categorie",
    "filters.difficulty": "Dificultate",
    "filters.all.categories": "Toate Categoriile",
    "filters.all.difficulties": "Toate Dificultățile",
    "filters.questions.available": "{count} întrebări disponibile",

    // Training
    "training.title": "Mod Antrenament",
    "training.cards": "{count} carduri",
    "training.show.answers": "Arată Toate Răspunsurile",
    "training.show.questions": "Arată Toate Întrebările",
    "training.shuffle": "Amestecă",
    "training.flip.back": "Click pentru a întoarce",

    // Quiz
    "quiz.question": "Întrebarea {current} din {total}",
    "quiz.correct": "Corecte: {count}",
    "quiz.wrong": "Greșite: {count}",
    "quiz.remaining": "Rămase: {count}",
    "quiz.mode.challenge": "Mod: Challenge",
    "quiz.mode.retry": "Mod: Retry",
    "quiz.streak": "Streak: {count}",
    "quiz.explanation": "Explicație",
    "quiz.confidence": "Cât de sigur ai fost cu acest răspuns?",
    "quiz.next": "Următoarea Întrebare",
    "quiz.complete": "Quiz Completat!",
    "quiz.final.score": "Scor Final: {correct} corecte din {total}",
    "quiz.accuracy": "Acuratețe: {percent}%",
    "quiz.final.streak": "Streak Final: {count}",
    "quiz.take.again": "Ia Quiz-ul Din Nou",

    // Stats
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

    // Common
    "common.back": "Înapoi",
    "common.reset": "Resetează",
    "common.export": "Exportă Date",
    "common.import": "Importă Date",
    "common.best.streak": "Cel Mai Bun Streak: {count}",
    "common.language": "Limba",
    "common.romanian": "Română",
    "common.english": "Engleză",

    // Difficulties
    "difficulty.easy": "ușor",
    "difficulty.medium": "mediu",
    "difficulty.hard": "greu",
  },
  en: {
    // Main menu
    "app.title": "Quiz & Training",
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

    // Filters
    "filters.title": "Filters",
    "filters.category": "Category",
    "filters.difficulty": "Difficulty",
    "filters.all.categories": "All Categories",
    "filters.all.difficulties": "All Difficulties",
    "filters.questions.available": "{count} questions available",

    // Training
    "training.title": "Training Mode",
    "training.cards": "{count} cards",
    "training.show.answers": "Show All Answers",
    "training.show.questions": "Show All Questions",
    "training.shuffle": "Shuffle",
    "training.flip.back": "Click to flip back",

    // Quiz
    "quiz.question": "Question {current} of {total}",
    "quiz.correct": "Correct: {count}",
    "quiz.wrong": "Wrong: {count}",
    "quiz.remaining": "Remaining: {count}",
    "quiz.mode.challenge": "Mode: Challenge",
    "quiz.mode.retry": "Mode: Retry",
    "quiz.streak": "Streak: {count}",
    "quiz.explanation": "Explanation",
    "quiz.confidence": "How confident were you with this answer?",
    "quiz.next": "Next Question",
    "quiz.complete": "Quiz Complete!",
    "quiz.final.score": "Final Score: {correct} correct out of {total}",
    "quiz.accuracy": "Accuracy: {percent}%",
    "quiz.final.streak": "Final Streak: {count}",
    "quiz.take.again": "Take Quiz Again",

    // Stats
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

    // Common
    "common.back": "Back",
    "common.reset": "Reset",
    "common.export": "Export Data",
    "common.import": "Import Data",
    "common.best.streak": "Best Streak: {count}",
    "common.language": "Language",
    "common.romanian": "Romanian",
    "common.english": "English",

    // Difficulties
    "difficulty.easy": "easy",
    "difficulty.medium": "medium",
    "difficulty.hard": "hard",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ro")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "ro" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string, params?: Record<string, string | number>) => {
    let translation = translations[language][key as keyof (typeof translations)[typeof language]] || key

    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, String(value))
      })
    }

    return translation
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
