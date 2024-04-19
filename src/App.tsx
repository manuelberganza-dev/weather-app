import Form from "./components/Form"
import { useWeather } from "./hooks/useWeather"
import WeatherCard from "./components/WeatherCard"
import Spinner from "./components/Spinner"

function App() {

    const { weatherResponse, weather, isLoading } = useWeather()

    return (
        <div className="h-screen w-screen flex">
            <div className="w-1/3 h-full bg-slate-900 pt-4">
                <h1 className="text-white text-center text-xl font-bold mb-6">Busca el clima hoy</h1>
                <Form weatherResponse={weatherResponse} />
            </div>
            <div className="w-full h-full flex justify-center items-center bg-weatherBg bg-center bg-cover">
                {weather.name.length > 0 ? 
                isLoading ? <Spinner /> : <WeatherCard weather={weather} /> 
                    : <p className="bg-white p-4 rounded font-bold">No se encontró ningún resultado.</p> }
            </div>
        </div>
    )
}

export default App
