import { useContext } from "react";
import { TempContext } from "../../Providers/TempToggle";
import type { ForecastEntry } from "../../Types/Weather";

type ForecastDetailsProps = {
    time: ForecastEntry;
};

function ForecastDetails({ time } : ForecastDetailsProps) {
    const { unit } = useContext(TempContext);
    const temp = Math.round(time.main.temp);

    return (
        <div className="flex justify-center">
            <div className="mt-6 flex flex-col items-start gap-2">
                <h3 className="text-lg font-bold text-orange-500">Details for {time.dt_txt}</h3>
                <p>Temperature: {temp}°{unit === 'metric' ? 'C' : 'F'}</p>
                <p>Humidity: {time.main.humidity}%</p>
                <p>Pressure: {time.main.pressure} hPa</p>
                <p>Weather: {time.weather[0].description}</p>
                <p>Wind: {time.wind.speed} m/s</p>
            </div>
        </div>
    );
}

export default ForecastDetails;
