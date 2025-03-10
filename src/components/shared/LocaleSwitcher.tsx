"use client";

import { useTranslations } from "next-intl";
import Flag from "react-world-flags";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";

interface LocaleSwitcherProps {
  currentLocale: string;
  locales: Readonly<string[]>;
}

const LocaleSwitcher = ({ currentLocale, locales }: LocaleSwitcherProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Locales");

  const changeLanguage = (newLocale: string) => {
    if (newLocale !== currentLocale) {
      router.push(pathname, { locale: newLocale });
    }
  };

  return (
    <Select onValueChange={changeLanguage}>
      <SelectTrigger>
        <SelectValue
          placeholder={
            <span className="flex gap-2">
              <Flag
                width={16}
                code={currentLocale == "en" ? "gb" : currentLocale}
              />
              {t(currentLocale)}
            </span>
          }
        />
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale} value={locale} className="px-2">
            <span className="flex gap-2">
              <Flag width={16} code={locale == "en" ? "gb" : locale} />
              {t(locale)}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LocaleSwitcher;
