import { useState, useContext, useCallback, useEffect } from "react";
import ForecastInput from "./ForecastInput";
import ForecastDay from "./ForecastDay";
import ForecastHour from "./ForecastHour";
import ForecastDetails from "./ForecastDetails";
import Loading from "../Loading";

import { FavoriteContext } from "../../Providers/FavoriteCity";
import { WeatherContext } from "../../Providers/WeatherProvider";
import { TempContext } from "../../Providers/TempToggle";

import type { ForecastEntry, ForecastDayType } from "../../Types/Weather";

function Forecast() {
    const { forecastState, validateCity, loading, error, setError } = useContext(WeatherContext);
    const { favorites, addCity, removeCity } = useContext(FavoriteContext);
    const { unit } = useContext(TempContext);

    const [city, setCity] = useState<string>(forecastState?.city || "");
    const [forecastData, setForecastData] = useState<ForecastDayType[]>([]);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedTimeData, setSelectedTimeData] = useState<ForecastEntry | null>(null);

    const resetForecast = () => {
        setForecastData([]);
        setSelectedDay(null);
        setSelectedTimeData(null);
        setCity("");
    };

    const fetchForecast = useCallback(async () => {
        const result = await validateCity(city, unit);
        if (!result.ok) {
            resetForecast();
            return null;
        }
        setCity(result.city);
        setForecastData(result.forecast);
        setSelectedDay(null);
        setSelectedTimeData(null);
        return result;
    }, [city, unit, validateCity]);

    const isFavorite = favorites.some(
        (fav) => fav.toLowerCase() === city.trim().toLowerCase()
    );

    const normalizeCity = (name: string) =>
        name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    const handleToggleFavorite = () => {
        const trimmedCity = city.trim();
        if (!trimmedCity) return;

        const capitalized = normalizeCity(trimmedCity);

        const alreadyFavorite = favorites.includes(capitalized);

        if (alreadyFavorite) {
            removeCity(capitalized);
        } else {
            addCity(capitalized);
        }
    }

    useEffect(() => {
        if (!city.trim()) {
            resetForecast();
        }
    }, [city]);

    useEffect(() => {
        if (forecastState?.city) {
            validateCity(forecastState.city, unit).then((result) => {
                if (result.ok) {
                    setForecastData(result.forecast);
                    setSelectedDay(result.forecast[0].date);
                    setSelectedTimeData(result.forecast[0].entries[0]);
                }
            });
        }
    }, []);

    return (
        <div>
            <ForecastInput
                city={city}
                setCity={setCity}
                fetchForecast={fetchForecast}
                handleToggleFavorite={handleToggleFavorite}
                showGetForecast={true}
                showAddToFavorites={forecastData.length > 0}
                error={error}
                setError={setError}
                isFavorite={isFavorite}
            />

            {loading && <Loading size="medium" tip="Loading..." />}

            {forecastData.length > 0 && (
                <>
                    <ForecastDay
                        forecastData={forecastData}
                        selectedDay={selectedDay}
                        setSelectedDay={setSelectedDay}
                        setSelectedTimeData={setSelectedTimeData}
                    />

                    {selectedDay && (
                        <ForecastHour
                            times={forecastData.find((d) => d.date === selectedDay)?.entries || []}
                            setSelectedTimeData={setSelectedTimeData}
                            selectedTimeData={selectedTimeData}
                        />
                    )}

                    {selectedTimeData && <ForecastDetails time={selectedTimeData} />}
                </>
            )}
        </div>
    );
}

export default Forecast;
