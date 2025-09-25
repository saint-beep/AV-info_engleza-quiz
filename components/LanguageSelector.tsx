"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-600">{t("common.language")}:</span>
      <Button variant={language === "ro" ? "default" : "outline"} size="sm" onClick={() => setLanguage("ro")}>
        {t("common.romanian")}
      </Button>
      <Button variant={language === "en" ? "default" : "outline"} size="sm" onClick={() => setLanguage("en")}>
        {t("common.english")}
      </Button>
    </div>
  )
}
