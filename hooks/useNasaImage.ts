import { useState, useEffect } from 'react';

// Simple in-memory cache to avoid re-fetching same images
const imageCache: Record<string, string[]> = {};

export function useNasaImage(query: string) {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!query) return;

        // Check cache first
        if (imageCache[query]) {
            setImages(imageCache[query]);
            return;
        }

        const fetchImages = async () => {
            setLoading(true);
            setError(false);
            try {
                // Search for image only
                const res = await fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`);
                const data = await res.json();

                if (data.collection && data.collection.items && data.collection.items.length > 0) {
                    // Get up to 4 images
                    const foundImages: string[] = [];
                    for (const item of data.collection.items) {
                        if (item.links && item.links.length > 0) {
                            foundImages.push(item.links[0].href);
                        }
                        if (foundImages.length >= 4) break;
                    }

                    if (foundImages.length > 0) {
                        imageCache[query] = foundImages;
                        setImages(foundImages);
                    } else {
                        setError(true);
                    }
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Failed to fetch NASA images", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [query]);

    return { images, loading, error };
}
