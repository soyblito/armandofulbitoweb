import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";

interface Equipo {
  idStanding: string;
  intRank: string;
  idTeam: string;
  strTeam: string;
  strBadge: string;
  intPlayed: string;
  intWin: string;
  intDraw: string;
  intLoss: string;
  intGoalsFor: string;
  intGoalsAgainst: string;
  intGoalDifference: string;
  intPoints: string;
}

export default function TablaPosicionesArg() {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.thesportsdb.com/api/v1/json/123/lookuptable.php?l=4406")
      .then((res) => res.json())
      .then((data) => {
        setEquipos(data.table || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress color="inherit" />;

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Tabla de Posiciones - Primera División Argentina
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Equipo</TableCell>
            <TableCell align="center">PJ</TableCell>
            <TableCell align="center">G</TableCell>
            <TableCell align="center">E</TableCell>
            <TableCell align="center">P</TableCell>
            <TableCell align="center">GF</TableCell>
            <TableCell align="center">GC</TableCell>
            <TableCell align="center">DG</TableCell>
            <TableCell align="center">Pts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipos.map((eq) => (
            <TableRow key={eq.idStanding}>
              <TableCell>{eq.intRank}</TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Image
                    src={eq.strBadge}
                    alt={eq.strTeam}
                    width={24}
                    height={24}
                    style={{ borderRadius: "50%" }}
                  />
                  {eq.strTeam}
                </Box>
              </TableCell>
              <TableCell align="center">{eq.intPlayed}</TableCell>
              <TableCell align="center">{eq.intWin}</TableCell>
              <TableCell align="center">{eq.intDraw}</TableCell>
              <TableCell align="center">{eq.intLoss}</TableCell>
              <TableCell align="center">{eq.intGoalsFor}</TableCell>
              <TableCell align="center">{eq.intGoalsAgainst}</TableCell>
              <TableCell align="center">{eq.intGoalDifference}</TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "#facc15" }}
              >
                {eq.intPoints}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
