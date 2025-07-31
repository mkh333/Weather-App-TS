import { useState, useContext } from "react";
import type { FormEvent } from "react";
import { FavoriteContext } from "../../Providers/FavoriteCity";
import { WeatherContext } from "../../Providers/WeatherProvider";
import Button from "../Button";

function AddCity()  {
    const { addCity, favorites } = useContext(FavoriteContext);
    const { validateCity } = useContext(WeatherContext);

    const [newCity, setNewCity] = useState("");
    const [error, setError] = useState<string | undefined>();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const result = await validateCity(newCity, "metric");
        if (!result.ok) {
            setError(result.error);
            return
        }

        if (favorites.includes(result.city)) {
            setError("This city is already in your favorites.");
            return;
        }

        addCity(result.city);
        setNewCity("");
        setError("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center mt-2 bg-white border border-orange-500">
            <input
                type="text"
                placeholder=" Enter your favorite city    "
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                className="p-2 text-orange-500 placeholder-orange-500 outline-none"
            />
            <Button type="primary" size="medium">Add City</Button>
            {error && <p className="text-red-500 mt-1">{error}</p>}
        </form>
    );
}

export default AddCity;
