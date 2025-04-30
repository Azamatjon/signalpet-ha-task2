'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale } from '@/translations'; // Define your supported locales (example: 'en', 'fr', 'de', etc.)

const LocaleContext = createContext<{
    locale: Locale;
    setLocale: (locale: Locale) => void;
}>({
    locale: 'en', // Default fallback
    setLocale: () => {},
});

export function LocaleProvider({
                                   children,
                                   initialLocale,
                               }: {
    children: React.ReactNode;
    initialLocale: Locale;
}) {
    // Use initialLocale directly without any client-side modifications during hydration
    const [locale, setLocaleState] = useState<Locale>(initialLocale);

    // Only run this effect after hydration is complete
    useEffect(() => {
        const savedLocale = document.cookie
            .split('; ')
            .find(row => row.startsWith('NEXT_LOCALE='))
            ?.split('=')[1];

        if (savedLocale && savedLocale !== locale) {
            setLocaleState(savedLocale as Locale);
        }
    }, []); // Empty dependency array to run only once after mount

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000;`;
    };

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            {children}
        </LocaleContext.Provider>
    );
}

export function useLocale() {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error('useLocale must be used within a LocaleProvider');
    }
    return context;
}
