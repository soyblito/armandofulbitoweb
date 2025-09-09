import { Box, Typography, Paper, Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Image from "next/image";

const streamingCards = [
  { title: "Series: Tokyo Revengers", img: "/hero-bg.jpg" },
  { title: "Series: Bleach Sennen Kessen-hen", img: "/hero-bg.jpg" },
  { title: "Series: Demon Slayers Kimetsu no Yaiba", img: "/hero-bg.jpg" },
  { title: "Series: Uma Musume Pretty Derby Season 3", img: "/hero-bg.jpg" },
];

export default function StreamingSection() {
  return (
    <>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Streaming
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        {streamingCards.map((card) => (
          <Paper
            key={card.title}
            sx={{
              bgcolor: "#232326",
              borderRadius: 3,
              width: { xs: "100%", sm: "48%", md: 220 },
              minWidth: 140,
              height: { xs: 100, sm: 140 },
              overflow: "hidden",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              px: 2,
              py: 2,
              mb: { xs: 2, sm: 0 },
            }}
          >
            <Image
              src={card.img}
              alt={card.title}
              fill
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
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography fontWeight="bold" sx={{ color: "#fff", mb: 1 }}>
                {card.title}
              </Typography>
              <Button
                variant="contained"
                color="error"
                size="small"
                sx={{ borderRadius: 2, fontWeight: "bold" }}
                startIcon={<PlayArrowIcon />}
              >
                Play
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </>
  );
}
