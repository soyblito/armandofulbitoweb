"use client";
import { useState, useEffect, Suspense } from "react";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Link,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import ErrorIcon from "@mui/icons-material/Error";
import { useSearchParams } from "next/navigation";
import { apiFetch } from "../hooks/useApi";

function VerifyAccount() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Token de verificación faltante.");
      setLoading(false);
      return;
    }
    apiFetch("/auth/verify?token=" + token, {
      method: "POST",
    })
      .then(async (res) => {
        setLoading(false);
        if (res.ok) {
          setSuccess(true);
        } else {
          const data = await res.json();
          setError(data.message || "Error al verificar la cuenta.");
        }
      })
      .catch(() => {
        setLoading(false);
        setError("Error de conexión.");
      });
  }, [token]);

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
          Verificación de cuenta
        </Typography>
        {loading ? (
          <CircularProgress color="primary" />
        ) : success ? (
          <>
            <VerifiedIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography color="success.main" mb={2}>
              ¡Tu cuenta fue verificada con éxito!
            </Typography>
            <Link
              href="/login"
              color="#00BFFF"
              underline="hover"
              fontWeight="bold"
            >
              Iniciar sesión
            </Link>
          </>
        ) : (
          <>
            <ErrorIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
            <Typography color="error.main" mb={2}>
              {error}
            </Typography>
            <Link
              href="/register"
              color="#00BFFF"
              underline="hover"
              fontWeight="bold"
            >
              Registrate
            </Link>
          </>
        )}
      </Box>
    </Container>
  );
}

export default function VerifyAccountPage() {
  return (
    <Suspense fallback={null}>
      <VerifyAccount />
    </Suspense>
  );
}
