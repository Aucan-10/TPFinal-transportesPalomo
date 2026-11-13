"use client";

import { useState } from "react";

// Client Component: tiene su propio estado (favorito o no).
export default function FavoritoBoton() {
  const [favorito, setFavorito] = useState(false);

  return (
    <button onClick={() => setFavorito(!favorito)}>
      {favorito ? "★ En favoritos" : "☆ Marcar como favorito"}
    </button>
  );
}
export const dynamic = "force-dynamic";
