import { kelvinToCelsius } from "../helpers"
import { Weather } from "../types"

type WeatherCardProps = {
    weather: Weather
}

export default function WeatherCard({ weather }: WeatherCardProps) {
    return (
        <div className="bg-white shadow-lg w-2/4 rounded-xl p-4 text-center flex flex-col gap-4">
            <h2 className="text-4xl font-bold">{weather.name}</h2>
            <p className="text-8xl">{kelvinToCelsius(weather.main.temp)}&deg;C</p>
            <div className="text-xl">
                <p>Mínima: <span className="font-bold">{kelvinToCelsius(weather.main.temp_min)}&deg;C</span> </p>
                <p>Máxima: <span className="font-bold">{kelvinToCelsius(weather.main.temp_max)}&deg;C</span> </p>
                <p>Humedad: <span className="font-bold">{weather.main.humidity}%</span> </p>
                <p>Viento: <span className="font-bold">{weather.wind.speed} m/s</span> </p>
            </div>
        </div>
    )
}