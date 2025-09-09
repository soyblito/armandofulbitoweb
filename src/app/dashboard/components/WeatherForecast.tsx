/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  LinearProgress,
} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import GrainIcon from "@mui/icons-material/Grain";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";

type ForecastDay = {
  date: string;
  temp_max: number;
  temp_min: number;
  weather: string;
  icon: React.ReactNode;
  label: string;
};

const defaultLabels = {
  clear: "Despejado",
  partlyCloudy: "Parcialmente nublado",
  cloudy: "Nublado",
  rain: "Lluvia",
  showers: "Chubascos",
  thunderstorm: "Tormenta",
  unknown: "Desconocido",
  today: "Hoy",
  tomorrow: "Mañana",
  dayAfterTomorrow: "Pasado",
  max: "Máx",
  min: "Mín",
  forecastTitle: "Pronóstico (3 días)",
};

const diasSemana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

function getWeatherDescription(code: number, labels: typeof defaultLabels) {
  if (code === 0)
    return {
      weather: labels.clear,
      icon: <WbSunnyIcon color="warning" fontSize="large" />,
    };
  if (code < 3)
    return {
      weather: labels.partlyCloudy,
      icon: <CloudIcon color="info" fontSize="large" />,
    };
  if (code < 45)
    return {
      weather: labels.cloudy,
      icon: <CloudIcon color="disabled" fontSize="large" />,
    };
  if (code < 60)
    return {
      weather: labels.rain,
      icon: <GrainIcon color="primary" fontSize="large" />,
    };
  if (code < 80)
    return {
      weather: labels.showers,
      icon: <GrainIcon color="primary" fontSize="large" />,
    };
  if (code < 100)
    return {
      weather: labels.thunderstorm,
      icon: <ThunderstormIcon color="error" fontSize="large" />,
    };
  return { weather: labels.unknown, icon: <CloudIcon fontSize="large" /> };
}

interface WeatherForecastProps {
  textOnly?: boolean;
  interval?: number; // seconds
  labels?: Partial<typeof defaultLabels>;
  colors?: {
    paperBg?: string;
    text?: string;
    icon?: string;
    bar?: string;
  };
  barPosition?: "top" | "bottom";
}

function getDayLabel(
  idx: number,
  dateStr: string,
  labels: typeof defaultLabels
) {
  if (idx === 0) return labels.today;
  if (idx === 1) return labels.tomorrow;
  if (idx === 2) return labels.dayAfterTomorrow;
  const date = new Date(dateStr);
  return diasSemana[date.getDay()];
}

export default function WeatherForecast({
  textOnly = false,
  interval = 3,
  labels = {},
  colors = {},
  barPosition = "bottom",
}: WeatherForecastProps) {
  const mergedLabels = { ...defaultLabels, ...labels };
  const [loading, setLoading] = useState(true);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocalización no soportada");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
          );
          const data = await res.json();
          const days = data.daily.time
            .slice(0, 3)
            .map((date: string, i: number) => {
              const desc = getWeatherDescription(
                data.daily.weathercode[i],
                mergedLabels
              );
              return {
                date,
                temp_max: data.daily.temperature_2m_max[i],
                temp_min: data.daily.temperature_2m_min[i],
                weather: desc.weather,
                icon: desc.icon,
                label: getDayLabel(i, date, mergedLabels),
              };
            });
          setForecast(days);
        } catch {
          setError("Error al obtener el clima");
        }
        setLoading(false);
      },
      () => {
        setError("No se pudo obtener la ubicación");
        setLoading(false);
      }
    );
  }, [labels]);

  // Barra de progreso para textOnly
  useEffect(() => {
    if (textOnly && forecast.length > 1) {
      setProgress(0);
      const step = 100 / (interval * 40); // actualiza cada 25ms para animación suave
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev + step >= 100) return 100;
          return prev + step;
        });
      }, 25);

      const changeDay = setTimeout(() => {
        setCurrentIdx((idx) => (idx + 1) % forecast.length);
        setProgress(0);
      }, interval * 1000);

      return () => {
        clearInterval(timer);
        clearTimeout(changeDay);
      };
    }
  }, [textOnly, forecast, interval, currentIdx]);

  if (loading) return <CircularProgress color="inherit" />;
  if (error) return <Typography color="error">{error}</Typography>;

  if (textOnly) {
    const day = forecast[currentIdx];
    return (
      <Paper
        sx={{
          p: 2,
          mb: 2,
          bgcolor: colors.paperBg || "#232326",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {barPosition === "top" && (
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: 3,
              borderRadius: 0,
              bgcolor: "#333",
              "& .MuiLinearProgress-bar": {
                bgcolor: colors.bar || colors.text || "#facc15",
                transition: "width 0.2s linear",
              },
            }}
          />
        )}
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{ color: colors.text || "#fff" }}
        >
          {day.label}: {day.weather}, {mergedLabels.max}: {day.temp_max}°C /{" "}
          {mergedLabels.min}: {day.temp_min}°C
        </Typography>
        {barPosition === "bottom" && (
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              height: 3,
              borderRadius: 0,
              bgcolor: "#333",
              "& .MuiLinearProgress-bar": {
                bgcolor: colors.bar || colors.text || "#facc15",
                transition: "width 0.2s linear",
              },
            }}
          />
        )}
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2, mb: 2, bgcolor: colors.paperBg || "#232326" }}>
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ mb: 2, color: colors.text || "#fff" }}
      >
        {mergedLabels.forecastTitle}
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        {forecast.map((day) => (
          <Box key={day.date} sx={{ minWidth: 120, textAlign: "center" }}>
            <Box sx={{ color: colors.icon || undefined }}>{day.icon}</Box>
            <Typography fontWeight="bold" sx={{ color: colors.text || "#fff" }}>
              {day.label}
            </Typography>
            <Typography sx={{ color: colors.text || "#fff" }}>
              {day.weather}
            </Typography>
            <Typography sx={{ color: colors.text || "#fff" }}>
              {mergedLabels.max}: {day.temp_max}°C / {mergedLabels.min}:{" "}
              {day.temp_min}°C
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
