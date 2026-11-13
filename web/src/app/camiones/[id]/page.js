import Link from "next/link";
import { API_URL } from "../../../lib/api";
import FavoritoBoton from "./FavoritoBoton";

export const instant = false;

// En Next.js 15+, params es una Promise y hay que esperarla.
export default async function DetalleCamion({ params }) {
  const { id } = await params;
  let camion = null;
  let error = null;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (res.status === 404) {
      error = "Ese camión no existe.";
    } else if (!res.ok) {
      error = `La API respondió con error ${res.status}.`;
    } else {
      camion = await res.json();
    }
  } catch {
    error = "No se pudo conectar con la API.";
  }

  return (
    <main>
      <p>
        <Link href="/">← Volver al listado</Link>
      </p>

      {error && <p className="error">{error}</p>}

      {camion && (
        <>
          <h1>{camion.modelo}</h1>
          <ul>
            <li>Patente: {camion.patente}</li>
            <li>Servicio: {camion.tipo_servicio}</li>
            <li>Capacidad: {camion.capacidad_kg} kg</li>
            <li>Refrigerado: {camion.refrigerado ? "Sí" : "No"}</li>
            <li>
              Último service:{" "}
              {camion.fecha_ultimo_service
                ? camion.fecha_ultimo_service.slice(0, 10)
                : "Sin registro"}
            </li>
          </ul>
          <FavoritoBoton />
        </>
      )}
    </main>
  );
}

