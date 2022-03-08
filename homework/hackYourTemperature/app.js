import express from "express";
import keys from "./sources/keys.js";
import fetch from "node-fetch";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  let cityName = req.body.city;
  if (!cityName) {
    res.status(400).json({ weatherText: "City is not found!" });
  } else {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${keys.API_KEY}`
      );
      const data = await response.json();
      return res.status(200).json(`${cityName}: ${data.main.temp}°C`);
    } catch (err) {
      res.status(404).json({
        error: err.message,
        weatherText: "Please provide an invalid city name",
      });
    }
  }
});

export default app;
