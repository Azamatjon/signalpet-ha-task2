'use client';

import { translations } from '@/translations'; // Your translations
import { useLocale } from '@/context/LocaleContext'; // Get locale from context
import { useMemo } from 'react';

export function useTranslation() {
    const { locale } = useLocale(); // Get current locale from context
    
    // Force re-render by using the locale in the dependency array
    const t = useMemo(() => {
        return translations[locale];
    }, [locale]);

    return { t, locale };
}
