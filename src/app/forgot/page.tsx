"use client";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Container,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { apiFetch } from "../hooks/useApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return "Email inválido";
    if (/<|>|script|onerror|onload/.test(email)) return "Caracteres inválidos";
    return "";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = validate();
    setError(v);
    if (!v) {
      // Aquí iría la llamada a la API
      // ...dentro de handleSubmit...
      if (!v) {
        apiFetch("/auth/forgot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        })
          .then(async (res) => {
            if (res.ok) {
              alert("¡Te enviamos un email para recuperar tu contraseña!");
            } else {
              const data = await res.json();
              alert(data.message || "Error al enviar el email");
            }
          })
          .catch(() => alert("Error de conexión"));
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
          Recuperá tu contraseña
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            error={!!error}
            helperText={error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
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
            Recuperar contraseña
          </Button>
        </form>
        <Box mt={3}>
          <Link
            href="/login"
            color="#00BFFF"
            underline="hover"
            fontWeight="bold"
          >
            ¿Ya tenés cuenta? Iniciá sesión
          </Link>
          <br />
          <Link
            href="/register"
            color="#00BFFF"
            underline="hover"
            fontWeight="bold"
          >
            ¿No tenés cuenta? Registrate
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
