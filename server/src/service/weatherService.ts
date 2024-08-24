import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object

// TODO: Define a class for the Weather object


// TODO: Complete the WeatherService class
class WeatherService {
  
  // TODO: Define the baseURL, API key, and city name properties
  const baseURL= 'https://api.openweathermap.org';
  const apiKey='7c38308ca6ae0cc14fa54ebb3dad4a81';
  //agregar city class

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<LocationData | null> {
    try {
      const reponse = await get(this.baseURL),{
        params: {
          q: query, 
          appid: apiKey,
          units: 'metric',
        },
      }
    }
  }

  const locationData: LocationData = {
    name:
  }


  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
