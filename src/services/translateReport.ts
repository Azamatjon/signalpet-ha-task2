'use client';

import { ReportModel } from "@/models/report";
import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export const collectTextsToTranslate = (data: ReportModel): Record<string, string> => {
    const texts: Record<string, string> = {};

    data.abnormalFindings.forEach((finding, idx) => {
        texts[`abnormalFindings.${idx}.name`] = finding.name;
    });

    data.normalFindings.forEach((finding, idx) => {
        texts[`normalFindings.${idx}.name`] = finding.name;
    });

    texts['analysisSummary'] = data.analysisSummary;

    return texts;
};

export const mergeTranslatedTexts = (originalData: ReportModel, translatedTexts: Record<string, string>): ReportModel => {
    const updatedData = JSON.parse(JSON.stringify(originalData)); // Deep copy

    Object.entries(translatedTexts).forEach(([path, translatedValue]) => {
        const parts = path.split('.');

        if (parts[0] === 'abnormalFindings' || parts[0] === 'normalFindings') {
            const arrayName = parts[0];
            const index = parseInt(parts[1], 10);
            const field = parts[2];

            if (updatedData[arrayName] && updatedData[arrayName][index]) {
                updatedData[arrayName][index][field] = translatedValue;
            }
        } else if (parts[0] === 'analysisSummary') {
            updatedData.analysisSummary = translatedValue;
        }
    });

    return updatedData;
};

interface UseTranslateReportResult {
    translatedReport: ReportModel | null;
    loading: boolean;
    error: string | null;
}



export function useTranslateReport(report: ReportModel): UseTranslateReportResult {
    const { locale } = useTranslation();

    const [translatedReport, setTranslatedReport] = useState<ReportModel>(report);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!report) return;

        async function translate() {
            setLoading(true);
            setError(null);

            try {
                const textsToTranslate = collectTextsToTranslate(report);
                console.log('textsToTranslate', textsToTranslate)

                // Get the list of texts to be translated
                const textsArray = Object.values(textsToTranslate);

                // Send the texts to the translation API
                const response = await fetch('/api/translate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        q: textsArray, // Pass the array of texts here
                        source: 'en', // Pass the target locale
                        target: locale, // Pass the target locale
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Translation API failed: ${response.statusText}`);
                }

                const translatedTextsArray: string[] = await response.json();

                console.log('translatedTextsArray', translatedTextsArray)
                const translatedTexts: Record<string, string> = {};
                const keys = Object.keys(textsToTranslate);

                keys.forEach((key, idx) => {
                    translatedTexts[key] = translatedTextsArray[idx];
                });

                const newReport = mergeTranslatedTexts(report, translatedTexts);

                console.log('newReport', newReport)
                setTranslatedReport(newReport);
            } catch (err: any) {
                console.error('Translation error:', err);
                setError(err.message || 'Unknown error during translation.');
            } finally {
                setLoading(false);
            }
        }

        if (locale === 'en') {
            setTranslatedReport(report)
        } else translate();
    }, [report, locale]);

    return { translatedReport, loading, error };
}