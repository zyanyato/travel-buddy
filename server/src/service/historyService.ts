import fs from 'fs/promises';
import path from 'path';

const searchHistory = path.resolve('./searchHistory.json');

// TODO: Define a City class with name and id properties
class city {
  city_name: string;
  id?: number;

  constructor(city_name: string, id:number){
    this.city_name = city_name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {

  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  export async function readFile({
    try {
      const data = await fs.readFile(searchHistory, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading file', error);
      return [];
    }
  })
  
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  export async function writeFile(data){
    try {
      await fs.writeFile(searchHistory, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error writing to file', error);
    }
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  const app = express();

  app.get('/api', (_req: Request, res: Response) =>
  res.json(searchHistory))
  
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}

  
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
