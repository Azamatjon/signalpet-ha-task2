import { NextRequest, NextResponse } from 'next/server';

const TRANSLATION_URI = `${process.env.LIBRETRANSLATE_URL}/translate`;

// Cache entry structure
interface CacheEntry {
    translation: string;
    timestamp: number;  // Timestamp when the translation was cached
}

// In-memory cache with TTL (7 days = 604800000 ms)
const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 604800000;  // 7 days in milliseconds

export async function POST(request: NextRequest) {
    const data = await request.json() as { q: string[], source: string, target: string };

    // Prepare arrays to store translations and uncached texts
    const translations: string[] = [];
    const textsToTranslate: string[] = [];
    const cacheKeys: string[] = [];

    // Check each text in the array and see if it's cached and still valid
    for (const text of data.q) {
        const cacheKey = `${text}-${data.source}-${data.target}`;
        const cachedEntry = cache.get(cacheKey);

        if (cachedEntry && (Date.now() - cachedEntry.timestamp) <= CACHE_TTL) {
            // If the translation is cached and still valid, use it
            translations.push(cachedEntry.translation);
        } else {
            // If not cached or expired, add to the batch of texts to translate
            textsToTranslate.push(text);
            cacheKeys.push(cacheKey);  // Store the cache keys to update after translation
        }
    }

    // If there are texts to translate, send a batch request
    if (textsToTranslate.length > 0) {
        const response = await fetch(TRANSLATION_URI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: textsToTranslate,  // Batch of uncached texts
                source: data.source,
                target: data.target,
            }),
        });

        const translatedTexts = (await response.json()).translatedText;

        // Cache the results for the texts and push to the translations array
        for (let i = 0; i < textsToTranslate.length; i++) {
            const translatedText = translatedTexts[i];
            const cacheKey = cacheKeys[i];

            // Store each translation in the cache with the current timestamp
            cache.set(cacheKey, { translation: translatedText, timestamp: Date.now() });
            translations.push(translatedText);  // Add to the final translation result
        }
    }

    // Return all the translations, both cached and newly translated
    return NextResponse.json(translations, { status: 200 });
}
