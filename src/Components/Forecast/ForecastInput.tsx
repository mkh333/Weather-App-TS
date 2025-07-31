import Button from "../Button";
import type { ChangeEvent, FormEvent } from "react";

type ForecastInputProps = {
    city: string;
    setCity: (city: string) => void;
    fetchForecast: () => void;
    showGetForecast: boolean;
    showAddToFavorites: boolean;
    handleToggleFavorite: () => void;
    error: string | null;
    setError: (error: string | null) => void;
    isFavorite: boolean;
};

const ForecastInput = ({city, setCity, fetchForecast, showGetForecast, showAddToFavorites, handleToggleFavorite, error, setError, isFavorite}: ForecastInputProps) => {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        fetchForecast();
        console.log("submit")
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
        if (error) setError(null);
    };

    return (
        <div className="flex flex-col items-center gap-3 my-5">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={handleChange}
                    className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {showGetForecast && (
                    <Button type="primary" size="medium" onClick={fetchForecast}>
                        Get Forecast
                    </Button>
                )}
            </form>

            <div className="flex gap-2 mt-2 sm:mt-0">
                {showAddToFavorites && (
                    <Button
                        type="primary"
                        size="medium"
                        onClick={handleToggleFavorite}
                        disabled={!city.trim()}
                    >
                        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </Button>
                )}
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};

export default ForecastInput;
