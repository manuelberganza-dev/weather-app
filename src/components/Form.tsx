import { ChangeEvent, FormEvent, useMemo, useState } from "react"
import { countries } from "../data"
import Error from "./Error"

const initialLocation = {
    city: '',
    country: ''
}

type FormProps = {
    weatherResponse: (city: string, country: string) => Promise<void>
}

export default function Form({ weatherResponse }: FormProps) {
    const [location, setLocation] = useState(initialLocation)
    const [error, setError] = useState('')
    const isError = useMemo(() => error.length > 0, [error])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setLocation({
            ...location,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (!location.city.trim() || !location.country.trim()) {
            setError('Todos los campos son obligatorios.')
            return
        }

        await weatherResponse(location.city, location.country)
        setLocation(initialLocation)
        setError('')
    }

    return (
        <form className="p-4 text-white" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-6">
                <label className="mb-2" htmlFor="city">Ciudad:</label>
                <input 
                    name="city"
                    type="text"
                    className="p-2 rounded text-black" 
                    placeholder="Escribe el nombre de la ciudad"
                    value={location.city}
                    onChange={handleChange} />
            </div>
            
            <div className="flex flex-col mb-6">
                <label className="mb-2" htmlFor="country">País:</label>
                <select
                    name="country"
                    onChange={handleChange}
                    className="text-black p-2 rounded"
                    value={location.country}>
                    <option value="">-- Seleccione un país ---</option>
                    {countries.map(country => (
                        <option key={country.code} value={country.code}>{country.name}</option>
                    ))}
                </select>
            </div>

            {isError && <Error>{error}</Error>}

            <input 
                type="submit"
                className="bg-slate-800 hover:bg-slate-700 p-2 w-full uppercase font-bold rounded cursor-pointer transition-colors" 
                value="Buscar clima" />

        </form>
    )
}