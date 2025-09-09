import {
  Box,
  Typography,
  //Avatar,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Header() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
      <TextField
        variant="outlined"
        placeholder="Search products, order..."
        size="small"
        sx={{
          bgcolor: "#232326",
          borderRadius: 2,
          input: { color: "#fff" },
          width: { xs: "100%", sm: 350 },
          mr: 2,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#a1a1aa" }} />
            </InputAdornment>
          ),
        }}
      />
      <Box sx={{ flexGrow: 1 }} />
      {/* <Avatar
        src="/logo-armandofulbito.png"
        sx={{ width: 32, height: 32, mr: 1 }}
      /> */}
      <Typography fontWeight="bold" sx={{ mr: 2 }}>
        Novedades...
      </Typography>
      {/* <Avatar src="/logo-armandofulbito.png" sx={{ width: 32, height: 32 }} /> */}
    </Box>
  );
}
