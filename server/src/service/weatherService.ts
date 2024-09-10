import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  description: string;
  temperature: number;
  humidity: number;
  wind_Speed: number;

  constructor (description: string, temperature: number, humidity: number, wind_Speed: number){
    this.description = description;
    this.temperature = temperature;
    this.humidity = humidity;
    this.wind_Speed = wind_Speed;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  private cityName: string;

  constructor() {
    this.baseURL = 'https://api.openweathermap.org';
    this.apiKey = '7c38308ca6ae0cc14fa54ebb3dad4a81';
    this.cityName = '';
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<Coordinates> {
    const response = await fetch(query);
    const data = await response.json();
    return this.destructureLocationData(data);
  }


  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    console.log(locationData[0]);
    return {
      lat: locationData.lat,
      lon: locationData.lon
    };
  }
  
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    // console.log(this.cityName);
    return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`;
  }
  
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
  }
  
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(this.buildGeocodeQuery());
    // console.log(locationData);
    return this.destructureLocationData(locationData);
  }
  
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const response:any = await fetch(this.buildWeatherQuery(coordinates));
    // console.log(coordinates);
    if (!response) {
      throw new Error ('Weather data not found')
    } 
    const currentWeather: Weather = this.parseCurrentWeather(
      response.list[0]
    )
    const forecast: Weather[] = this.buildForecastArray(
      currentWeather, 
      response.list
    )
    return forecast;
  }
  
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    return new Weather(
      response.current.temp_c, 
      response.current.condition.text,
      response.current.humidity,
      response.current.wind_Speed
    );
  }
  
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    const weatherForecast: Weather[] = [currentWeather]
    // return weatherData.map((data:any) => new Weather (data.temp_c, data.condition.text, data.humidity, data.wind_Speed));
    for(let i = 0; i < weatherData.length; i++){
      weatherForecast.push(new Weather (weatherData[i].temp_c, weatherData[i].condition.text, weatherData[i].humidity, weatherData[i].wind_Speed))
    }
    return weatherForecast;
  }
  
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(cityName: string): Promise<Weather> {
    this.cityName = cityName;
    const coordinates = await this.fetchAndDestructureLocationData();
    // console.log(coordinates);
    const weatherData = await this.fetchWeatherData(coordinates);
    return this.parseCurrentWeather(weatherData);
  }
}
export default new WeatherService();
