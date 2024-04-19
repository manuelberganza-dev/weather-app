export const kelvinToCelsius = (kelvin: number): number => {
    return Number((kelvin - 273.15).toPrecision(2))
}