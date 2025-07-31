import {Route, Routes} from "react-router-dom";
import Forecast from '../Components/Forecast/Forecast';
import Favorites from '../Components/Favorites/Favorites';
import Header from '../Components/Header';
import Layout from "../Layout/Layout";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Header />}/>
                <Route path="/forecast" element={<Forecast />}/>
                <Route path="/favorites" element={<Favorites />}/>
            </Route>
        </Routes>
    )
}

export default AppRouter;
