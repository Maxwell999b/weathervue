"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Cloud,
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  Wind,
  Droplets,
  Thermometer,
  Compass,
  Search,
  Github,
  MapPin,
} from "lucide-react";
import { format, fromUnixTime } from "date-fns";

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  dt: number;
  timezone: number;
  weather: Array<{
    icon: string;
    description: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
}

interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
    };
    weather: Array<{
      icon: string;
      description: string;
    }>;
  }>;
}

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [usingGeolocation, setUsingGeolocation] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      setUsingGeolocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setUsingGeolocation(false);
          setError("Couldn't get your location. Please enter a city manually.");
        }
      );
    }
  }, []);

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error("Unable to fetch weather data");
      }

      const weatherData: WeatherData = await weatherResponse.json();
      const forecastData: ForecastData = await forecastResponse.json();

      setWeather(weatherData);
      setForecast(forecastData);
      setCity(weatherData.name);
    } catch (error) {
      setWeather(null);
      setForecast(null);
      setError(`${error}, Unable to fetch weather data. Please try again.`);
    } finally {
      setLoading(false);
      setUsingGeolocation(false);
    }
  };

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error("City not found");
      }

      const weatherData: WeatherData = await weatherResponse.json();
      const forecastData: ForecastData = await forecastResponse.json();

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      setWeather(null);
      setForecast(null);
      setError(`${error}, Unable to fetch weather data. Please check the city name and try again.`);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (iconCode: string) => {
    switch (iconCode) {
      case "01d":
        return <Sun className="w-10 h-10 text-yellow-400" />;
      case "01n":
        return <Moon className="w-10 h-10 text-indigo-200" />;
      case "02d":
      case "02n":
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return <Cloud className="w-10 h-10 text-gray-400" />;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        return <CloudRain className="w-10 h-10 text-blue-400" />;
      case "13d":
      case "13n":
        return <CloudSnow className="w-10 h-10 text-blue-200" />;
      default:
        return <Wind className="w-10 h-10 text-teal-500" />;
    }
  };

  const formatTime = (timestamp: number, timezone: number) => {
    try {
      const date = new Date((timestamp + timezone) * 1000);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }
      return format(date, "h:mm a");
    } catch (error) {
      console.error("Error formatting time:", error);
      return "Invalid time";
    }
  };

  const formatDate = (timestamp: number) => {
    try {
      const date = fromUnixTime(timestamp);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }
      return format(date, "EEE, MMM d");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  const getWindDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(degree / 45) % 8];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white flex flex-col">
      <nav className="bg-black bg-opacity-30 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Cloud className="w-8 h-8 text-blue-400" />
            <Link href="/">
              <span className="text-2xl font-bold">WeatherVue</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto p-4">
        <Card className="bg-black bg-opacity-30 border-none text-white">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Weather Explorer</CardTitle>
            <CardDescription className="text-center text-gray-300">
              {usingGeolocation
                ? "Fetching weather for your location..."
                : "Enter a city to get detailed weather information"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-6">
              <Input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-grow bg-white bg-opacity-20 border-none text-white placeholder-gray-300"
              />
              <Button onClick={fetchWeather} disabled={loading} className="bg-blue-500 hover:bg-blue-600">
                {loading ? "Searching..." : <Search className="w-5 h-5" />}
              </Button>
              <Button
                onClick={() => {
                  if (navigator.geolocation) {
                    setUsingGeolocation(true);
                    navigator.geolocation.getCurrentPosition(
                      (position) => fetchWeatherByCoords(position.coords.latitude, position.coords.longitude),
                      (error) => {
                        console.error("Geolocation error:", error);
                        setUsingGeolocation(false);
                        setError("Couldn't get your location. Please enter a city manually.");
                      }
                    );
                  } else {
                    setError("Geolocation is not supported by your browser");
                  }
                }}
                className="bg-green-500 hover:bg-green-600">
                <MapPin className="w-5 h-5" />
              </Button>
            </div>
            {error && <p className="text-red-400 text-center mb-4">{error}</p>}
            {weather && forecast && (
              <Tabs defaultValue="current" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white bg-opacity-20">
                  <TabsTrigger value="current" className="data-[state=active]:bg-blue-500">
                    Current Weather
                  </TabsTrigger>
                  <TabsTrigger value="forecast" className="data-[state=active]:bg-blue-500">
                    5-Day Forecast
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="current">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        {weather.name}, {weather.sys.country}
                      </h2>
                      <p className="text-gray-300 mb-4">{formatTime(weather.dt, weather.timezone)}</p>
                      <div className="flex items-center mb-4">
                        {getWeatherIcon(weather.weather[0].icon)}
                        <span className="text-4xl font-bold ml-2">{Math.round(weather.main.temp)}°C</span>
                      </div>
                      <p className="text-lg capitalize mb-2">{weather.weather[0].description}</p>
                      <p className="text-sm text-gray-300">Feels like: {Math.round(weather.main.feels_like)}°C</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Thermometer className="w-5 h-5 mr-2 text-red-400" />
                        <div>
                          <p className="text-sm text-gray-300">High / Low</p>
                          <p className="font-semibold">
                            {Math.round(weather.main.temp_max)}°C / {Math.round(weather.main.temp_min)}°C
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Droplets className="w-5 h-5 mr-2 text-blue-400" />
                        <div>
                          <p className="text-sm text-gray-300">Humidity</p>
                          <p className="font-semibold">{weather.main.humidity}%</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Wind className="w-5 h-5 mr-2 text-teal-400" />
                        <div>
                          <p className="text-sm text-gray-300">Wind</p>
                          <p className="font-semibold">{weather.wind.speed} m/s</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Compass className="w-5 h-5 mr-2 text-yellow-400" />
                        <div>
                          <p className="text-sm text-gray-300">Wind Direction</p>
                          <p className="font-semibold">{getWindDirection(weather.wind.deg)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="forecast">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {forecast.list
                      .filter((item, index) => index % 8 === 0)
                      .map((item) => (
                        <Card key={item.dt} className="bg-white bg-opacity-20 border-none">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-semibold">{formatDate(item.dt)}</CardTitle>
                          </CardHeader>
                          <CardContent className="text-center pb-2">
                            {getWeatherIcon(item.weather[0].icon)}
                            <p className="text-2xl font-bold my-2">{Math.round(item.main.temp)}°C</p>
                            <p className="text-sm capitalize">{item.weather[0].description}</p>
                          </CardContent>
                          <CardFooter className="text-xs text-gray-300">
                            <p>
                              H: {Math.round(item.main.temp_max)}°C L: {Math.round(item.main.temp_min)}°C
                            </p>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="bg-black bg-opacity-30 p-4 mt-8">
        <div className="container mx-auto flex justify-between items-center">
          <p>&copy; 2023 WeatherVue. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <a href="https://github.com/Maxwell999b" target="_blank" className="hover:text-blue-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
