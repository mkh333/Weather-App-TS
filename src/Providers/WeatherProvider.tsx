import { createContext, useState } from "react"
import type { ForecastStateType, ForecastDayType, ValidateResult, ForecastEntry } from "../Types/Weather";
import { WeatherApi } from "../API/Weatherapi";
import { apiKey } from "../API/Weatherapi"
import { normalizeCityName, capitalizeCityName } from "../Types/City.ts";

type WeatherContextType = {
    loading: boolean;
    error: string | null;
    setError: (msg: string | null) => void;
    forecastState: ForecastStateType | null;
    setForecastState:  (state: ForecastStateType | null) => void;
    validateCity: (city: string, unit: string) => Promise<ValidateResult>;
};

export const WeatherContext = createContext<WeatherContextType>({} as WeatherContextType);

function WeatherProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [forecastState, setForecastState] = useState<ForecastStateType | null>(null);

    const validateCity = async (city: string, unit: string): Promise<ValidateResult>  => {
        const normalized = normalizeCityName(city);
        if (!normalized) {
            setError("City cannot be empty.");
            return { ok: false };
        }
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(
                `${WeatherApi}forecast?q=${normalized}&appid=${apiKey}&units=${unit}`
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

            const cityName = capitalizeCityName(data.city.name);

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
