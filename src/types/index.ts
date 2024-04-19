import {z} from "zod"
import { WeatherSchema } from "../hooks/useWeather"

export type Country = { 
    code: string, 
    name: string
}

export type Weather = z.infer<typeof WeatherSchema> 