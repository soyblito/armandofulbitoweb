"use client";
import { useState, Suspense } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  InputAdornment,
  Link,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useSearchParams } from "next/navigation";
import { apiFetch } from "../hooks/useApi";

function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validate = () => {
    if (!password || password.length < 6)
      return "La contraseña debe tener al menos 6 caracteres";
    if (password !== confirm) return "Las contraseñas no coinciden";
    if (/<|>|script|onerror|onload/.test(password + confirm))
      return "Caracteres inválidos";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = validate();
    setError(v);
    if (!v) {
      const res = await apiFetch("/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.message || "Error al cambiar la contraseña");
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 4,
          boxShadow: 4,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="#00BFFF" mb={2}>
          Cambiá tu contraseña
        </Typography>
        {success ? (
          <>
            <Typography color="success.main" mb={2}>
              ¡Contraseña cambiada con éxito!
            </Typography>
            <Link
              href="/login"
              color="#00BFFF"
              underline="hover"
              fontWeight="bold"
            >
              Ir a iniciar sesión
            </Link>
          </>
        ) : (
          <form onSubmit={handleSubmit} autoComplete="off">
            <TextField
              fullWidth
              label="Nueva contraseña"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              error={!!error}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Confirmar contraseña"
              name="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              margin="normal"
              required
              error={!!error}
              helperText={error}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                bgcolor: "#00BFFF",
                fontWeight: "bold",
                fontSize: "1.1rem",
                py: 1.5,
                borderRadius: 3,
                boxShadow: 2,
                ":hover": { bgcolor: "#009ACD" },
              }}
            >
              Cambiar contraseña
            </Button>
          </form>
        )}
      </Box>
    </Container>
  );
}

// Wrapper con Suspense
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPassword />
    </Suspense>
  );
}
