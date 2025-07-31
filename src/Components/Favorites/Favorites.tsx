import { useContext } from "react";
import  {FavoriteContext } from "../../Providers/FavoriteCity"
import FavoriteCityItem from "../Favorites/FavoriteCityItem";
import AddCity from "../Favorites/AddCity";
import Loading from "../Loading"
import {WeatherContext} from "../../Providers/WeatherProvider";

const Favorites = () => {
    const { favorites, removeCity } = useContext(FavoriteContext)
    const { loading } = useContext(WeatherContext);

    return (
        <div>
            <h2 className="text-2xl font-semibold my-4 text-gray-800 leading-snug text-center">My Favorite Cities</h2>
            <div className="flex items-start justify-center gap-4">
                <div>
                    <ul>
                        {favorites.map((city) => (
                            <FavoriteCityItem key={city} city={city} onRemove={removeCity}/>
                        ))}
                    </ul>
                </div>
                <div>
                    <AddCity />
                </div>
            </div>
            {loading && <Loading size="medium" tip="Loading..."/>}
        </div>
    )
}

export default Favorites;
