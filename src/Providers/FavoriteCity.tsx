import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react"

type FavoriteContextType = {
    favorites: string[];
    addCity: (city: string) => void;
    removeCity: (city: string) => void;
};

export const FavoriteContext = createContext<FavoriteContextType>({
    favorites: [],
    addCity: () => {},
    removeCity: () => {},
});

export function FavoriteProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>(getFavorites);

    function getFavorites(): string[] {
        return JSON.parse(localStorage.getItem('favorites') || "[]")
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites])

    const addCity = (city: string) => {
        const trimmed = city.trim();
        const normalized = trimmed.toLowerCase();

        const normalizedFavorites = favorites.map((c) => c.toLowerCase());
        if (!trimmed || normalizedFavorites.includes(normalized)) return;

        setFavorites([...favorites, trimmed]);
    };

    const removeCity = (city: string) => {
        const updated = favorites.filter((c) => c !== city)
        setFavorites(updated);
    }

    return (
        <FavoriteContext.Provider value={{ favorites, addCity, removeCity }}>
            {children}
        </FavoriteContext.Provider>
    )
}

export default FavoriteProvider;
