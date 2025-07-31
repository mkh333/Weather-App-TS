import { useContext, useEffect, useState } from "react";
import Loading from "./Loading";
import { TempContext } from "../Providers/TempToggle";
import {WeatherApi} from "../API/Weatherapi";
import { apiKey } from "../API/Weatherapi"

type CityType = {
    name: string;
    main: {
        temp: number;
    };
    weather: {
        description: string;
    }[];
};

const Header = () => {
    const [city, setCity] = useState<CityType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { unit } = useContext(TempContext);

    const getWeather = () => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                fetch(
                    `${WeatherApi}weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=${unit}`
                )
                    .then((res) => res.json())
                    .then((data) => setCity(data))
                    .catch(() => setError("Failed to fetch weather data."));
            },
            () => setError("Geolocation permission denied.")
        );
    };

    useEffect(() => {
        getWeather();
    }, [unit]);

    if (error) return <div className="text-red-500">{error}</div>;
    if (!city) return <Loading size="medium" tip="Getting your current location..." />;
    const temp = Math.round(city.main.temp);

    return (
        <div className="pt-[60px] mx-auto text-center">
            <h2 className="mb-2 text-orange-500 font-bold text-2xl">{city.name}</h2>
            <p className="text-lg">
                <span className="text-gray-500 pr-1">Temp:</span>
                {temp} °{unit === 'metric' ? 'C' : 'F'}
            </p>
            <p className="text-lg">
                <span className="text-gray-500 pr-1">Weather:</span>
                {city.weather[0].description}
            </p>
        </div>
    );
};

export default Header;
