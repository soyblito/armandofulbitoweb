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
  dateEvent: string;
  strTime: string;
  strHomeTeamBadge: string;
  strAwayTeamBadge: string;
  strVenue: string;
  strStatus: string;
}

interface Props {
  id: string;
}

export default function ProximosPartidosEquipo({ id }: Props) {
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`https://www.thesportsdb.com/api/v1/json/123/eventsnext.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPartidos(data.events || []);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress color="inherit" />;

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Próximos partidos del equipo
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
                vs
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
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
