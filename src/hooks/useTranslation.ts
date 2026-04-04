import { useAppStore } from "@/store/appStore";
import { translations, Locale } from "@/lib/translations";

export function useTranslation() {
  const { language } = useAppStore();

  const t = (key: string): string => {
    const translationSet = translations[language as Locale] || translations.en;
    return translationSet[key] || key;
  };

  return { t, language };
}
