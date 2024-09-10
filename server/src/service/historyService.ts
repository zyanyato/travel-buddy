import fs from 'fs/promises';
import {v4 as uuidv4 } from 'uuid';

// const searchHistory = path.resolve('./searchHistory.json');

// TODO: Define a City class with name and id properties
class cityName {
  name: string;
  id: string;

  constructor(name: string, id:string){
    this.name = name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {

  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  private async read(){
    return await fs.readFile('db/db.json', {
      flag: 'a+',
      encoding: 'utf8',
    });
  }
  //   try {
  //     const data = await fs.readFile(searchHistory, 'utf-8');
  //     return JSON.parse(data);
  //   } catch (error) {
  //     console.error('Error reading file', error);
  //     return [];
  //   }
  // })
  
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: cityName[]) {
    return await fs.writeFile('db/db.json', JSON.stringify(cities, null, '\t'));
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    return await this.read().then((cities) => {
      let parsedCities: cityName[];

      try {
        parsedCities = [].concat(JSON.parse(cities));
      } catch (err) {
        parsedCities = [];
      }

      return parsedCities;
    })
  }

  // const app = express();

  // app.get('/api', (_req: Request, res: Response) =>
  // res.json(searchHistory))
  
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(cityName: string) {
    if (!cityName) {
      throw new Error('City cannot be blank');
    }
    const newCity: cityName = { name: cityName, id: uuidv4() };

    return await this.getCities()
    .then((cities) => {
      if (cities.find((index) => index.name === cityName)) {
        return cities;
      }
      return [...cities, newCity];
    })
    .then((updatedCities) => this.write(updatedCities))
    .then(() => newCity);
  }

  
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    return await this.getCities()
    .then((cities) => cities.filter((city) => city.id !== id))
    .then((filteredCities) => this.write(filteredCities));
  }
}

export default new HistoryService();
