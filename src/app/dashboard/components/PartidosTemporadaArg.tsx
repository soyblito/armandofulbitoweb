import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Avatar,
} from "@mui/material";

interface Partido {
  idEvent: string;
  strEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  dateEvent: string;
  strTime: string;
  strHomeTeamBadge: string;
  strAwayTeamBadge: string;
  strVenue: string;
  strStatus: string;
  strVideo: string;
}

export default function PartidosTemporadaArg() {
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://www.thesportsdb.com/api/v1/json/123/eventsseason.php?id=4406&s=2025"
    )
      .then((res) => res.json())
      .then((data) => {
        setPartidos(data.events || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress color="inherit" />;

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Partidos de la Temporada 2025 - Primera División Argentina
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {partidos.length === 0 && (
          <Typography>No hay partidos programados.</Typography>
        )}
        {partidos.map((p) => (
          <Box
            key={p.idEvent}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 1,
              borderRadius: 2,
              bgcolor: "#18181b",
              color: "#fff",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                src={p.strHomeTeamBadge}
                alt={p.strHomeTeam}
                sx={{ width: 32, height: 32 }}
              />
              <Typography sx={{ fontWeight: "bold" }}>
                {p.strHomeTeam}
              </Typography>
              <Typography sx={{ mx: 1, fontWeight: "bold", color: "#facc15" }}>
                {p.intHomeScore !== null && p.intAwayScore !== null
                  ? `${p.intHomeScore} - ${p.intAwayScore}`
                  : "vs"}
              </Typography>
              <Avatar
                src={p.strAwayTeamBadge}
                alt={p.strAwayTeam}
                sx={{ width: 32, height: 32 }}
              />
              <Typography sx={{ fontWeight: "bold" }}>
                {p.strAwayTeam}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Typography sx={{ color: "#facc15", fontWeight: "bold" }}>
                {p.dateEvent} {p.strTime?.slice(0, 5)}
              </Typography>
              <Typography sx={{ fontSize: 13 }}>{p.strVenue}</Typography>
              <Typography sx={{ fontSize: 12, color: "#a1a1aa" }}>
                {p.strStatus}
              </Typography>
              {p.strVideo && (
                <a
                  href={p.strVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#38bdf8",
                    fontSize: 12,
                    textDecoration: "underline",
                  }}
                >
                  Ver resumen
                </a>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
