'use client';

import { useLocale } from '@/context/LocaleContext';
import {AvailableLocales, Locale, TranslationKeys} from "@/translations";
import React, {useCallback, useState} from "react";
import {useTranslation} from "@/hooks/useTranslation";

const styles = {
    container: {
        display: 'flex',
        alignItems: 'flex-start' as const,
        flexDirection: 'column' as const,
        minWidth: 130,
        minHeight: 74,
    },
    input: {
        padding: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100px',
        margin: '5px 0',
        color: 'black',
    },
    submitButton: {
        padding: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        margin: '5px 0 5px 5px',
        color: 'black',
    },
    originalButton: {
        padding: '2px 4px',
        border: '1px solid #ccc',
        borderRadius: '2px',
        color: 'black',
    },
    label: {
        color: 'white',
    },
    errorMessage: {
        color: 'orange',
        fontSize: '12px',
        marginTop: '5px',
    },
};

export function LocaleSwitcher({ translationLoading }: { translationLoading: boolean }) {
    const { locale, setLocale } = useLocale();
    const [languageInput, setLanguageInput] = useState(locale);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();

    const handleInputChange = useCallback((input: string) => {
        setLanguageInput(input as Locale);
        if (AvailableLocales.includes(input)) {
            setError(null)
        }
    }, [setError]);

    const handleLocaleChange = useCallback(() => {
        console.log('handleLocaleChange')
        if (AvailableLocales.includes(languageInput)) {
            setLocale(languageInput as Locale);
        } else {
            setError('invalidLocale')
        }
    }, [languageInput, setLocale]);

    const handleSeeOriginal = useCallback(() => {
        setLanguageInput('en');
        setLocale('en');
    }, [setLanguageInput, setLocale]);

    return (
        <div style={styles.container} data-testid="language-switcher">
            <div>
                <input
                    id="language-input"
                    data-testid="language-switcher-input"
                    type="text"
                    value={languageInput}
                    onChange={(e) => handleInputChange(e.target.value)} // Update input state
                    placeholder="e.g., es, de"
                    style={styles.input}
                />
                <button
                    type="button"
                    onClick={handleLocaleChange}
                    disabled={!!error || translationLoading}
                    style={styles.submitButton}
                >{translationLoading ? t.loading : t.translate}</button>
            </div>

            {error && <p style={styles.errorMessage}>{t[error as TranslationKeys]}</p>}
            {!error && (
                <button
                    type="button"
                    onClick={handleSeeOriginal}
                    style={styles.originalButton}
                >
                    {t.seeOriginal}
                </button>
            )}
        </div>
    );
}
