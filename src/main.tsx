import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App'
import TempToggle from "./Providers/TempToggle";
import FavoriteCityProvider from "./Providers/FavoriteCity";
import WeatherProvider from "./Providers/WeatherProvider";

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error("Root element not found");
}

createRoot(rootElement).render(
    <StrictMode>
        <BrowserRouter>
            <TempToggle>
                <FavoriteCityProvider>
                    <WeatherProvider>
                        <App />
                    </WeatherProvider>
                </FavoriteCityProvider>
            </TempToggle>
        </BrowserRouter>
    </StrictMode>
);
