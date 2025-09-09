import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";

interface Partido {
  idEvent: string;
  strEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  dateEvent: string;
  strTime: string;
}

export default function AgendaFutbolArg() {
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=4406"
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
        Agenda Fútbol Argentino - Primera División
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
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              {p.strHomeTeam} vs {p.strAwayTeam}
            </Typography>
            <Typography sx={{ color: "#facc15" }}>
              {p.dateEvent} {p.strTime?.slice(0, 5)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
