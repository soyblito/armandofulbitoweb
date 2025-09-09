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
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import { apiFetch } from "../hooks/useApi";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    telephone: "",
  });
  type FormErrors = {
    name?: string;
    lastname?: string;
    email?: string;
    password?: string;
    telephone?: string;
  };
  const [errors, setErrors] = useState<FormErrors>({});
  const [, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!form.lastname.trim())
      newErrors.lastname = "El apellido es obligatorio";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Email inválido";
    if (!form.password || form.password.length < 6)
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    if (form.telephone && !form.telephone.match(/^\+?\d{7,15}$/))
      newErrors.telephone = "Teléfono inválido";
    // Simple XSS prevention
    Object.keys(form).forEach((key) => {
      const value = form[key as keyof typeof form];
      if (/<|>|script|onerror|onload/.test(value))
        newErrors[key] = "Caracteres inválidos";
    });
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    setSubmitted(true);
    if (Object.keys(v).length === 0) {
      // Aquí iría la llamada a la API
      // ...dentro de handleSubmit...
      if (Object.keys(v).length === 0) {
        apiFetch("/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
          .then(async (res) => {
            if (res.ok) {
              alert(
                "¡Registro exitoso! Revisa tu email para confirmar la cuenta."
              );
            } else {
              const data = await res.json();
              alert(data.message || "Error en el registro");
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
          Registrate
        </Typography>
        <Typography mb={3} color="text.secondary">
          Completá tus datos para crear tu cuenta.
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
            margin="normal"
            required
            error={!!errors.name}
            helperText={errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Apellido"
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            margin="normal"
            required
            error={!!errors.lastname}
            helperText={errors.lastname}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
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
          <TextField
            fullWidth
            label="Teléfono (opcional)"
            name="telephone"
            value={form.telephone}
            onChange={handleChange}
            margin="normal"
            error={!!errors.telephone}
            helperText={errors.telephone}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon color="primary" />
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
            Crear cuenta
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
