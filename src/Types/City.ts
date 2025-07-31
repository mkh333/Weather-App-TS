export function normalizeCityName(city: string): string {
    return city.trim().toLowerCase();
}

export function capitalizeCityName(city: string): string {
    if (!city) return "";
    return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
}
