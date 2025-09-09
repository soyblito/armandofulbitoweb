import { Box, Avatar, IconButton, Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const sidebarMenu = [
  { label: "Home", icon: <HomeIcon /> },
  { label: "Mis partidos", icon: <SportsSoccerIcon /> },
  { label: "Mis listas", icon: <ListAltIcon /> },
  { label: "Mis contactos", icon: <PeopleIcon /> },
  { label: "Perfil", icon: <AccountCircleIcon /> },
  { label: "Logout", icon: <LogoutIcon /> },
];

export default function Sidebar() {
  return (
    <>
      {/* Sidebar vertical (desktop) */}
      <Box
        sx={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 90,
          height: "100vh",
          bgcolor: "#18181b",
          borderRight: "1px solid #232326",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "center",
          py: 3,
          zIndex: 10,
        }}
      >
        <Avatar
          src="/logo-armandofulbito.png"
          sx={{ width: 48, height: 48, mb: 4 }}
        />
        {sidebarMenu.map((item, idx) => (
          <Tooltip
            key={item.label}
            title={item.label}
            placement="right"
            slotProps={{
              popper: {
                sx: {
                  "& .MuiTooltip-tooltip": {
                    fontSize: "1.1rem",
                    px: 2,
                    py: 1,
                  },
                },
              },
            }}
          >
            <IconButton
              sx={{
                color: idx === 0 ? "#fff" : "#a1a1aa",
                bgcolor: idx === 0 ? "#ef4444" : "transparent",
                mb: 2,
                width: 56,
                height: 56,
                borderRadius: 2,
                ":hover": { bgcolor: "#232326", color: "#fff" },
              }}
            >
              {item.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      {/* Sidebar horizontal (mobile) */}
      <Box
        sx={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100vw",
          height: 70,
          bgcolor: "#18181b",
          borderTop: "1px solid #232326",
          display: { xs: "flex", md: "none" },
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          zIndex: 20,
        }}
      >
        {sidebarMenu.map((item, idx) => (
          <IconButton
            key={item.label}
            sx={{
              color: idx === 0 ? "#fff" : "#a1a1aa",
              bgcolor: idx === 0 ? "#ef4444" : "transparent",
              width: 48,
              height: 48,
              borderRadius: 2,
              ":hover": { bgcolor: "#232326", color: "#fff" },
            }}
          >
            {item.icon}
          </IconButton>
        ))}
      </Box>
    </>
  );
}
