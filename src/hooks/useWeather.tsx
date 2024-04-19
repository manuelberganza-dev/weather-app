import axios from "axios"
import {z} from "zod"
import { Country, Weather } from "../types"
import { useState } from "react"

const WeatherGeoSchema = z.object({
    lat: z.number(),
    lon: z.number()
})

export const WeatherSchema = z.object({
    "name": z.string(),
    "main": z.object({
        "temp": z.number(),
        "temp_min": z.number(),
        "temp_max": z.number(),
        "humidity": z.number()
    }),
    "wind": z.object({
        "speed": z.number()
    })
})

const initialStateWeather = {
    name: '',
    main: {
        temp: 0,
        temp_min: 0,
        temp_max: 0,
        humidity: 0,
    },
    wind: {
        speed: 0
    }
}

export const useWeather = () => {
    const appId = import.meta.env.VITE_API_KEY
    const [weather, setWeather] = useState<Weather>(initialStateWeather)
    const [isLoading, setIsLoading] = useState(false)
    
    const weatherResponse = async (city: Country['code'], country: Country['name']) => {
        const urlGeo = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${appId}`
        
        try {
            setIsLoading(true)
            const {data: dataGeo} = await axios(urlGeo)
            const resultGeo = WeatherGeoSchema.safeParse(dataGeo[0])
            if (resultGeo.success) {
                const {lat, lon} = resultGeo.data
                const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

                const {data: weatherData} = await axios(urlWeather)
                const result = WeatherSchema.safeParse(weatherData)
                if (result.success) {
                    setWeather(result.data)
                }
            } else {
                setWeather(initialStateWeather)
            }
            

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    } 
    
    return {
        weatherResponse,
        weather,
        isLoading
    }
}