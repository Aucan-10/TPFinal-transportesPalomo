"use client";

import { useEffect } from "react";

// Client Component: registra el Service Worker una sola vez al cargar la app.
export default function RegistrarSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("Service Worker registrado"))
        .catch((err) => console.error("No se pudo registrar el Service Worker", err));
    }
  }, []);

  return null;
}
