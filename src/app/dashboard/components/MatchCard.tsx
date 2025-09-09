import { Box, Typography, Tooltip, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface MatchCardProps {
  team1: string;
  team2: string;
  bordered?: boolean;
  dateTime?: string;
  dateTimePosition?: "top" | "bottom";
}

export default function MatchCard({
  team1,
  team2,
  bordered = false,
  dateTime,
  dateTimePosition = "bottom",
}: MatchCardProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // Card principal
  const card = isDesktop ? (
    <Box
      sx={{
        width: { xs: 220, md: 340 },
        height: 180,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 2,
        background: "linear-gradient(120deg, #ef4444 50%, #18181b 50%)",
        border: bordered ? "4px solid #facc15" : "none",
        transition: "border 0.2s",
      }}
    >
      {/* Team 1 */}
      <Box
        sx={{
          position: "absolute",
          left: 10,
          top: -90,
          bottom: 0,
          width: "55%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Tooltip
          title={team1}
          placement="top"
          disableHoverListener={team1.length < 18}
          slotProps={{
            popper: {
              sx: {
                "& .MuiTooltip-tooltip": {
                  fontSize: "1rem",
                  px: 2,
                  py: 1,
                },
              },
            },
          }}
        >
          <Typography
            sx={{
              color: "#18181b",
              fontWeight: "bold",
              fontSize: 16,
              border: "2px solid #18181b",
              px: 2,
              py: 0.5,
              borderRadius: 2,
              background: "rgba(255,255,255,0.05)",
              mr: 2,
              maxWidth: "90%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              cursor: team1.length >= 18 ? "pointer" : "default",
            }}
          >
            {team1}
          </Typography>
        </Tooltip>
      </Box>
      {/* VS */}
      <Typography
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          color: "#ef4444",
          fontWeight: "bold",
          fontSize: 64,
          letterSpacing: 2,
          textShadow: "2px 2px 8px #18181b",
        }}
      >
        VS
      </Typography>
      {/* Team 2 */}
      <Box
        sx={{
          position: "absolute",
          right: 10,
          top: 100,
          bottom: 0,
          width: "55%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Tooltip
          title={team2}
          placement="top"
          disableHoverListener={team2.length < 18}
          slotProps={{
            popper: {
              sx: {
                "& .MuiTooltip-tooltip": {
                  fontSize: "1rem",
                  px: 2,
                  py: 1,
                },
              },
            },
          }}
        >
          <Typography
            sx={{
              color: "#ef4444",
              fontWeight: "bold",
              fontSize: 16,
              border: "2px solid #ef4444",
              px: 2,
              py: 0.5,
              borderRadius: 2,
              background: "rgba(0,0,0,0.05)",
              ml: 2,
              maxWidth: "90%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              cursor: team2.length >= 18 ? "pointer" : "default",
            }}
          >
            {team2}
          </Typography>
        </Tooltip>
      </Box>
    </Box>
  ) : (
    // Mobile: todo en una línea
    <Box
      sx={{
        width: { xs: 220, md: 340 },
        minWidth: 220,
        maxWidth: 340,
        height: 56,
        display: "flex",
        alignItems: "center",
        position: "relative", // necesario para VS centrado
        borderRadius: 3,
        boxShadow: 2,
        background: "linear-gradient(90deg, #ef4444 50%, #18181b 50%)",
        border: bordered ? "2px solid #facc15" : "none",
        px: 2,
      }}
    >
      <Tooltip
        title={team1}
        placement="top"
        disableHoverListener={team1.length < 18}
        slotProps={{
          popper: {
            sx: {
              "& .MuiTooltip-tooltip": {
                fontSize: "1rem",
                px: 2,
                py: 1,
              },
            },
          },
        }}
      >
        <Typography
          sx={{
            color: "#18181b",
            fontWeight: "bold",
            fontSize: 16,
            maxWidth: "40%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            cursor: team1.length >= 18 ? "pointer" : "default",
          }}
        >
          {team1}
        </Typography>
      </Tooltip>
      {/* VS centrado absoluto */}
      <Typography
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          fontWeight: "bold",
          fontSize: 32,
          zIndex: 2,
        }}
      >
        VS
      </Typography>
      <Tooltip
        title={team2}
        placement="top"
        disableHoverListener={team2.length < 18}
        slotProps={{
          popper: {
            sx: {
              "& .MuiTooltip-tooltip": {
                fontSize: "1rem",
                px: 2,
                py: 1,
              },
            },
          },
        }}
      >
        <Typography
          sx={{
            color: "#ef4444",
            fontWeight: "bold",
            fontSize: 16,
            maxWidth: "40%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textAlign: "right",
            cursor: team2.length >= 18 ? "pointer" : "default",
            ml: "auto",
          }}
        >
          {team2}
        </Typography>
      </Tooltip>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        //width: "100%",
      }}
    >
      {dateTime && dateTimePosition === "top" && (
        <Typography sx={{ mb: 1, color: "#facc15", fontWeight: "bold" }}>
          {dateTime}
        </Typography>
      )}
      {card}
      {dateTime && dateTimePosition === "bottom" && (
        <Typography sx={{ mt: 1, color: "#facc15", fontWeight: "bold" }}>
          {dateTime}
        </Typography>
      )}
    </Box>
  );
}
