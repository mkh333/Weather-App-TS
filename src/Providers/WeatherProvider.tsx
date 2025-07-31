import { createContext, useState } from "react"
import type { ForecastStateType, ForecastDayType, ValidateResult, ForecastEntry } from "../Types/Weather";

type WeatherContextType = {
    loading: boolean;
    error: string | null;
    setError: (msg: string | null) => void;
    forecastState: ForecastStateType | null;
    setForecastState:  (state: ForecastStateType | null) => void;
    validateCity: (city: string, unit: string) => Promise<ValidateResult>;
};

export const WeatherContext = createContext<WeatherContextType>({} as WeatherContextType);

const apiKey = "c65af87ae0f4647d7ac8883b694261b1";

function WeatherProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [forecastState, setForecastState] = useState<ForecastStateType | null>(null);

    const validateCity = async (city: string, unit: string): Promise<ValidateResult>  => {
        const trimmed = city.trim();
        if (!trimmed) {
            setError("City cannot be empty.");
            return { ok: false };
        }
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${trimmed}&appid=${apiKey}&units=${unit}`
            );
            if (!res.ok) throw new Error();

            const data = await res.json();

            const grouped = data.list.reduce((acc: ForecastDayType[], entry: ForecastEntry) => {
                const date = entry.dt_txt.split(" ")[0];
                let day = acc.find((d) => d.date === date);
                if (!day) {
                    day = { date, entries: [] };
                    acc.push(day);
                }
                day.entries.push(entry);
                return acc;
            }, []);

            const cityName = data.city.name;

            return { ok: true, forecast: grouped, city: cityName };
        } catch {
            setError("This city does not exist.");
            return { ok: false };
        } finally {
            setLoading(false);
        }
    };

    return (
        <WeatherContext.Provider value={{ loading, error, setError, forecastState, setForecastState, validateCity }}>
            {children}
        </WeatherContext.Provider>
    );
}

export default WeatherProvider;
