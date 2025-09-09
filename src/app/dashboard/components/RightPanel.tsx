import {
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Image from "next/image";

const favouriteStreamers = [
  {
    name: "Amruta Black",
    status: "Online",
    avatar: "/logo-armandofulbito.png",
  },
  {
    name: "Courtney Henry",
    status: "Online",
    avatar: "/logo-armandofulbito.png",
  },
  {
    name: "Guy Hawkins",
    status: "Offline",
    avatar: "/logo-armandofulbito.png",
  },
  {
    name: "Kristin Watson",
    status: "Offline",
    avatar: "/logo-armandofulbito.png",
  },
  {
    name: "Leslie Alexander",
    status: "Offline",
    avatar: "/logo-armandofulbito.png",
  },
];

export default function RightPanel() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        width: { xs: 0, md: 340 },
        height: "100vh",
        bgcolor: "#18181b",
        borderLeft: "1px solid #232326",
        px: 3,
        py: 3,
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        zIndex: 10,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Avatar
          src="/logo-armandofulbito.png"
          sx={{ width: 48, height: 48, mr: 2 }}
        />
        <Box>
          <Typography fontWeight="bold">Pablo Hernandez</Typography>
          <Typography sx={{ color: "#a1a1aa", fontSize: 14 }}>Blito</Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        color="error"
        startIcon={<SportsSoccerIcon />}
        sx={{ fontWeight: "bold", borderRadius: 2, mb: 3 }}
      >
        Crear Partido
      </Button>
      <Paper
        sx={{
          bgcolor: "#232326",
          borderRadius: 3,
          mb: 3,
          overflow: "hidden",
          height: 120,
          display: "flex",
          alignItems: "center",
          px: 2,
        }}
      >
        <Image
          width={80}
          height={120}
          src="/hero-bg.jpg"
          alt="Game Streaming"
          style={{
            width: 80,
            height: "100%",
            objectFit: "cover",
            borderRadius: 8,
            marginRight: 16,
            opacity: 0.7,
          }}
        />
        <Box>
          <Typography fontWeight="bold" sx={{ color: "#fff" }}>
            Game Streaming
          </Typography>
          <Typography sx={{ color: "#a1a1aa", fontSize: 14 }}>
            Now live: 1,200 viewers
          </Typography>
        </Box>
      </Paper>
      <Typography fontWeight="bold" sx={{ mb: 1 }}>
        Favourite Streamers
      </Typography>
      <List dense sx={{ mb: 2 }}>
        {favouriteStreamers.map((streamer) => (
          <ListItem key={streamer.name} sx={{ px: 0 }}>
            <ListItemAvatar>
              <Avatar src={streamer.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  fontWeight="bold"
                  sx={{ color: "#fff", fontSize: 15 }}
                >
                  {streamer.name}
                </Typography>
              }
              secondary={
                <Typography
                  sx={{
                    color: streamer.status === "Online" ? "#22c55e" : "#a1a1aa",
                    fontSize: 13,
                  }}
                >
                  <FiberManualRecordIcon
                    sx={{ fontSize: 10, verticalAlign: "middle", mr: 0.5 }}
                  />
                  {streamer.status}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ bgcolor: "#232326", my: 2 }} />
      <Typography fontWeight="bold" sx={{ mb: 1 }}>
        Play With Friend
      </Typography>
      <List dense>
        {favouriteStreamers.map((streamer) => (
          <ListItem key={streamer.name + "-invite"} sx={{ px: 0 }}>
            <ListItemAvatar>
              <Avatar src={streamer.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  fontWeight="bold"
                  sx={{ color: "#fff", fontSize: 15 }}
                >
                  {streamer.name}
                </Typography>
              }
              secondary={
                <Typography sx={{ color: "#a1a1aa", fontSize: 13 }}>
                  Offline 2h ago
                </Typography>
              }
            />
            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{ borderRadius: 2, fontWeight: "bold" }}
            >
              Invite
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
