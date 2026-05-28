import React, { useState, useEffect } from 'react';

// Coordenadas aproximadas
const CITY_COORDS = {
  "Medellín": { lat: 6.2442, lon: -75.5812 },
  "Bogotá": { lat: 4.6097, lon: -74.0817 },
  "Cali": { lat: 3.4372, lon: -76.5225 },
  "Neiva": { lat: 2.9273, lon: -75.2819 },
};

const WeatherWidget = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city || !CITY_COORDS[city]) {
      setWeatherData(null);
      return;
    }

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const { lat, lon } = CITY_COORDS[city];
        // Fetch precip_prob and temperature for the next hours
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=precipitation_probability,temperature_2m&timezone=auto&forecast_days=2`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Error fetching weather data");
        }

        const data = await response.json();

        // Find current hour index to show next 4 hours
        const now = new Date();
        const currentHourStr = now.toISOString().slice(0, 14) + "00"; // roughly match "YYYY-MM-DDTHH:00" format

        let startIndex = data.hourly.time.findIndex(t => new Date(t) >= now);
        if (startIndex === -1) startIndex = 0;

        const nextHours = [];
        for (let i = 0; i < 4; i++) {
          const idx = startIndex + i;
          if (idx < data.hourly.time.length) {
            const timeObj = new Date(data.hourly.time[idx]);
            const hourLabel = timeObj.getHours() + ":00";
            nextHours.push({
              time: hourLabel,
              temp: Math.round(data.hourly.temperature_2m[idx]),
              precipProb: data.hourly.precipitation_probability[idx]
            });
          }
        }

        setWeatherData({
          nextHours
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (!city) return null;

  return (
    <div className="bg-[#ffffff] rounded-xl shadow-sm border border-[#c1c8c2] p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-[#012d1d] flex items-center gap-1" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
          <span className="material-symbols-outlined text-[18px] text-[#006399]" style={{ fontVariationSettings: "'FILL' 1" }}>partly_cloudy_day</span>
          Pronóstico Local: {city}
        </h3>
        {loading && <span className="material-symbols-outlined animate-spin text-[#717973] text-[16px]">progress_activity</span>}
      </div>

      {error ? (
        <p className="text-sm text-[#ba1a1a]">No se pudo cargar el clima.</p>
      ) : !weatherData && !loading ? (
        <p className="text-sm text-[#717973]">Seleccione una ciudad válida.</p>
      ) : weatherData ? (
        <div className="flex gap-2 w-full">
          {weatherData.nextHours.map((hour, i) => (
            <div key={i} className="flex-1 bg-[#f3f4f5] rounded-lg p-2 flex flex-col items-center justify-center border border-[#e1e3e4]">
              <span className="text-[#414844] text-[11px] font-semibold">{hour.time}</span>
              <div className="flex items-center gap-1 my-1">
                <span className="material-symbols-outlined text-[14px] text-[#006399]">water_drop</span>
                <span className="text-[14px] font-bold text-[#006399]">{hour.precipProb}%</span>
              </div>
              <span className="text-[#191c1d] text-[12px] font-medium">{hour.temp}°C</span>
            </div>
          ))}
        </div>
      ) : null}

      {weatherData && weatherData.nextHours[0]?.precipProb > 50 && (
        <div className="mt-1 bg-[#cde5ff] text-[#001d32] p-2 rounded-lg text-[12px] font-medium flex items-start gap-1">
          <span className="material-symbols-outlined text-[14px] text-[#006399]">info</span>
          <span>Alta probabilidad de lluvia en la próxima hora. Se recomienda aplazar riego manual.</span>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
