import { Box, Typography, Button, Paper } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Image from "next/image";

export default function Banner() {
  return (
    <Paper
      sx={{
        bgcolor: "#232326",
        borderRadius: 3,
        mb: 4,
        overflow: "hidden",
        position: "relative",
        height: { xs: 140, sm: 180 },
        display: "flex",
        alignItems: "flex-end",
        px: { xs: 2, sm: 4 },
        py: 3,
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <Image
        src="/hero-bg.jpg"
        alt="Banner"
        fill
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.3,
          zIndex: 0,
        }}
      />
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
          Star Wars
        </Typography>
        <Typography sx={{ mb: 2, color: "#a1a1aa" }}>
          Playing by someone, current viewers: 2,500
        </Typography>
        <Button
          variant="contained"
          color="error"
          startIcon={<PlayArrowIcon />}
          sx={{ fontWeight: "bold", borderRadius: 2 }}
        >
          Play Now
        </Button>
      </Box>
    </Paper>
  );
}
