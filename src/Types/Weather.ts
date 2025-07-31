export type ForecastEntry = {
    dt: number;
    dt_txt: string;
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
    };
};

export type ForecastDayType = {
    date: string;
    entries: ForecastEntry[];
};

export type ValidateResult =
    | { ok: false; error?: string }
    | { ok: true; city: string; forecast: ForecastDayType[] };

export type ForecastStateType = {
    city: string;
    forecast: ForecastDayType[];
};
