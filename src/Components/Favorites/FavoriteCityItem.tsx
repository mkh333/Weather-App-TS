import Modal from '../Modal'
import Button from '../Button'
import { useNavigate } from "react-router-dom";
import {useContext} from "react";
import {WeatherContext} from "../../Providers/WeatherProvider";
import {FavoriteContext} from "../../Providers/FavoriteCity";

type FavoriteCityItemProps = {
    city: string;
    onRemove: (city: string) => void;
};

const FavoriteCityItem = ({ city }: FavoriteCityItemProps) => {
    const { setForecastState } = useContext(WeatherContext);
    const { removeCity } = useContext(FavoriteContext);
    const navigate = useNavigate();

    return (
        <li className="flex items-center gap-2 mb-2">
            <p className="w-20 truncate">{city}</p>
            <Button
                onClick={() => {
                    setForecastState({ city, forecast: [] });
                    navigate("/forecast");
                }}
                type="primary"
                size="small"
            >
                See Forecast
            </Button>
            <Modal title="Delete city?"
                   content={`Are you sure you want to remove "${city}" from favorites?`}
                   trigger={<Button type="secondary" size="small">Remove</Button>}
                   city={city}
                   removeCity={removeCity}
            >
            </Modal>
        </li>
    )
}
export default FavoriteCityItem;
