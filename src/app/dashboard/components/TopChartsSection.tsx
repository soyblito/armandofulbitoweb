import { Box, Typography, Paper } from "@mui/material";
import Image from "next/image";

const topCharts = [
  { img: "/hero-bg.jpg", number: 1 },
  { img: "/hero-bg.jpg", number: 2 },
  { img: "/hero-bg.jpg", number: 3 },
  { img: "/hero-bg.jpg", number: 4 },
];

export default function TopChartsSection() {
  return (
    <>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Top Charts
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        {topCharts.map((chart) => (
          <Paper
            key={chart.number}
            sx={{
              bgcolor: "#232326",
              borderRadius: 3,
              width: { xs: "48%", sm: 180 },
              minWidth: 120,
              height: { xs: 80, sm: 120 },
              overflow: "hidden",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: { xs: 2, sm: 0 },
            }}
          >
            <Image
              width={1200} // pon el ancho real de la imagen
              height={600}
              src={chart.img}
              alt={`Chart ${chart.number}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.4,
                zIndex: 0,
              }}
            />
            <Typography
              fontWeight="bold"
              sx={{
                fontSize: { xs: 32, sm: 48 },
                color: "#facc15",
                position: "relative",
                zIndex: 1,
              }}
            >
              {chart.number}
            </Typography>
          </Paper>
        ))}
      </Box>
    </>
  );
}
