"use client";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Banner from "./components/Banner";
import StreamingSection from "./components/StreamingSection";
import TopChartsSection from "./components/TopChartsSection";
import RightPanel from "./components/RightPanel";
import WeatherForecast from "./components/WeatherForecast";
import MatchCard from "./components/MatchCard";
// import AgendaFutbolArg from "./components/AgendaFutbolArg";
// import TablaPosicionesArg from "./components/TablaPosicionesArg";
// import ProximosPartidosArg from "./components/ProximosPartidosArg";
// import PartidosTemporadaArg from "./components/PartidosTemporadaArg";
import ProximosPartidosEquipo from "./components/ProximosPartidosEquipo";

export default function Dashboard() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#18181b",
        color: "#fff",
        fontFamily: "Roboto, Arial, sans-serif",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Sidebar />
      <Box
        id="main-content"
        sx={{
          ml: { xs: 0, md: 10 }, // espacio sidebar solo desktop
          mr: { xs: 0, md: 140 }, // espacio right panel solo desktop
          minHeight: "100vh",
          px: { xs: 1, sm: 2, md: 4 },
          pt: 3,
          maxWidth: { xs: "100vw", sm: "100vw", md: "1400px" },
          mx: "auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <WeatherForecast
          textOnly
          interval={4}
          barPosition="top" // o "bottom"
          labels={{
            cloudy: "Tremendas nubes",
            today: "Hoy",
            tomorrow: "Mañana",
            dayAfterTomorrow: "Pasado",
            forecastTitle: "Clima para los próximos días",
          }}
          colors={{
            paperBg: "#222",
            text: "#facc15",
            icon: "#facc15",
            bar: "#facc15", // color de la barra de progreso
          }}
        />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: "row",
            flexWrap: { xs: "nowrap", md: "wrap" }, // wrap en desktop, nowrap en mobile
            overflowX: { xs: "auto", md: "visible" }, // scroll horizontal solo en mobile
            width: "100%",
            justifyContent: { xs: "flex-start", md: "center" }, // centrado en desktop
          }}
        >
          <MatchCard team1="River Plate" team2="Bonfield" />
          <MatchCard
            team1="River Plate"
            team2="El equipo de la gente"
            bordered
            dateTime="Sábado 7/9/2025 - 21:30"
            dateTimePosition="bottom" // o "top"
          />
          <MatchCard team1="River Plate 1" team2="Bonfield" />
        </Box>
        <ProximosPartidosEquipo id="135171" />
        {/* <PartidosTemporadaArg />
        <ProximosPartidosArg />
        <TablaPosicionesArg />
        <AgendaFutbolArg /> */}
        <Header />
        <Banner />
        <StreamingSection />
        <TopChartsSection />
      </Box>
      <RightPanel />
    </Box>
  );
}
