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
import LockIcon from "@mui/icons-material/Lock";
import { useRouter } from "next/navigation";
import { apiFetch } from "../hooks/useApi";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Email inválido";
    if (!form.password || form.password.length < 6)
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    if (/<|>|script|onerror|onload/.test(form.email + form.password))
      newErrors.email = "Caracteres inválidos";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      // Aquí iría la llamada a la API
      // ...dentro de handleSubmit...
      if (Object.keys(v).length === 0) {
        apiFetch("/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .then((data) => {
            // Si llega aquí, la respuesta fue OK
            router.push("/dashboard");
            // data.accessToken disponible aquí
          })
          .catch((err) => {
            // Si hay error, err es el objeto del error lanzado por apiFetch
            alert(err.message || "Credenciales inválidas");
          });
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
          Iniciá sesión
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
            required
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            margin="normal"
            required
            error={!!errors.password}
            helperText={errors.password}
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
            Iniciar sesión
          </Button>
        </form>
        <Box mt={3}>
          <Link
            href="/register"
            color="#00BFFF"
            underline="hover"
            fontWeight="bold"
          >
            ¿No tenés cuenta? Registrate
          </Link>
          <br />
          <Link
            href="/forgot"
            color="#00BFFF"
            underline="hover"
            fontWeight="bold"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
