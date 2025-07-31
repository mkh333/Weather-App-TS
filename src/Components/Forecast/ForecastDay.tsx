import Button from "../Button";
import type { ForecastEntry } from "../../Types/Weather";

type ForecastDayGroup = {
    date: string;
    entries: ForecastEntry[];
};

type ForecastDayProps = {
    forecastData: ForecastDayGroup[];
    selectedDay: string | null;
    setSelectedDay: (day: string) => void;
    setSelectedTimeData: (data: ForecastEntry | null) => void;
};

function ForecastDay({ forecastData, selectedDay, setSelectedDay, setSelectedTimeData } : ForecastDayProps) {
    return (
        <div className="flex justify-center gap-2 mt-4">
            {forecastData.map((day) => {
                const isActive = day.date === selectedDay;
                return (
                    <Button type={isActive ? "primary" : "secondary"}
                            size="small"
                            key={day.date}
                            onClick={() => {
                                setSelectedDay(day.date);
                                setSelectedTimeData(null);
                            }}
                    >
                        {day.date}
                    </Button>
                )
            })}
        </div>
    );
}

export default ForecastDay;
