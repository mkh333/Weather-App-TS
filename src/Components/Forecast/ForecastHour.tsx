import Button from "../Button";
import type { ForecastEntry } from "../../Types/Weather";

type ForecastHourProps = {
    times: ForecastEntry[];
    selectedTimeData: ForecastEntry | null;
    setSelectedTimeData: (entry: ForecastEntry) => void;
};

function ForecastHour({ times, selectedTimeData, setSelectedTimeData }: ForecastHourProps) {
    const formatTime = (dt_txt: string) => dt_txt.split(" ")[1].slice(0, 5);

    return (
        <div className="flex justify-center items-center gap-4 mt-4">
            {times.map((time) => {
                const isActive = selectedTimeData?.dt === time.dt;
                return (
                    <Button type={isActive ? "primary" : "secondary"}
                            size="small"
                            key={time.dt}
                            onClick={() => setSelectedTimeData(time)}
                            className="border p-2 cursor-pointer"
                    >
                        <p>{formatTime(time.dt_txt)}</p>
                    </Button>
                )
            })}
        </div>
    );
}

export default ForecastHour;
