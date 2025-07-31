import {NavLink} from "react-router-dom";
import Button from "./Button";
import {useContext} from "react";
import { TempContext } from "../Providers/TempToggle";

function Menu() {
    const { unit, toggleUnit} = useContext(TempContext);
    return (
        <div className="flex justify-around items-center py-4">
            <div>
                <ul className="list-none flex justify-center items-center py-4 gap-4">
                    <li className="text-orange-500 no-underline text-xl"><NavLink to="/">Home</NavLink></li>
                    <li className="text-orange-500 no-underline text-xl"><NavLink to="forecast">Forecast</NavLink></li>
                    <li className="text-orange-500 no-underline text-xl"><NavLink to="favorites">Favorites</NavLink></li>
                </ul>
            </div>
            <div>
                <Button onClick={toggleUnit} type="primary" size="small">
                    °{unit === "metric" ? "C" : "F"}
                </Button>
            </div>
        </div>
    )
}

export default Menu;
