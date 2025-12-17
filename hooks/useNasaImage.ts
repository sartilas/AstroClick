import { useState, useEffect } from 'react';

// Simple in-memory cache to avoid re-fetching same images
const imageCache: Record<string, { url: string, nasaId: string }[]> = {};

export interface NasaImage {
    url: string;
    nasaId: string;
}

export function useNasaImage(query: string) {
    const [images, setImages] = useState<NasaImage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!query) return;

        // Check cache first
        if (imageCache[query]) {
            setImages(imageCache[query]);
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchImages = async () => {
            setLoading(true);
            setError(false);
            try {
                // Search for image only
                const res = await fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`, { signal });

                if (!res.ok) throw new Error('Network response was not ok');

                const data = await res.json();

                if (data.collection && data.collection.items && data.collection.items.length > 0) {
                    // Get up to 4 images
                    const foundImages: NasaImage[] = [];
                    for (const item of data.collection.items) {
                        if (item.links && item.links.length > 0 && item.data && item.data.length > 0) {
                            foundImages.push({
                                url: item.links[0].href,
                                nasaId: item.data[0].nasa_id
                            });
                        }
                        if (foundImages.length >= 4) break;
                    }

                    if (foundImages.length > 0) {
                        imageCache[query] = foundImages;
                        if (!signal.aborted) {
                            setImages(foundImages);
                        }
                    } else {
                        if (!signal.aborted) setError(true);
                    }
                } else {
                    if (!signal.aborted) setError(true);
                }
            } catch (err: any) {
                if (err.name === 'AbortError') return;
                console.error("Failed to fetch NASA images", err);
                if (!signal.aborted) setError(true);
            } finally {
                if (!signal.aborted) setLoading(false);
            }
        };

        fetchImages();

        return () => controller.abort();
    }, [query]);

    return { images, loading, error };
}
