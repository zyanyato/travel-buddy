import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (_req, res) => {
  const cityName = _req.body.cityName;

  if (!cityName) {
    return res.status(400).json({ msg: 'City name is required'});
  }

  try{
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    // console.log(weatherData);
    await HistoryService.getCities();

    return res.status(200).json(weatherData);
  } catch (err) {  
    console.log(err);    
    return res.status(500).json(err);
  }
  // TODO: GET weather data from city name
  // TODO: save city to search history
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  try {
    const savedCities = await HistoryService.getCities();
    res.json(savedCities);
  } catch (err) {
    res.status(500).json(err);
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/historyService/:id', async (req, res) => {
  try{
    if (!req.params.id) {
      res.status(400).json({ msg: 'City id is required'});
    }
    await HistoryService.removeCity(req.params.id);
    res.json({ success: 'City successfully removed from search history'});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
