import Link from "next/link";
import { API_URL } from "../lib/api";

export const instant = false;

export default async function Home() {
  let camiones = [];
  // ...resto igual
  // ...resto igual
  let error = null;

  try {
    const res = await fetch(API_URL, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      error = `La API respondió con error ${res.status}.`;
    } else {
      camiones = await res.json();
    }
  } catch {
    error = "No se pudo conectar con la API. ¿Está corriendo en el puerto 8000?";
  }

  return (
    <main>
      <h1>Flota de camiones</h1>

      {error && <p className="error">{error}</p>}
      {!error && camiones.length === 0 && <p>No hay camiones cargados.</p>}

      <ul className="listado">
        {camiones.map((c) => (
          <li key={c.id}>
            <Link href={`/camiones/${c.id}`}>
              {c.modelo} · {c.patente}
            </Link>{" "}
            ({c.tipo_servicio})
          </li>
        ))}
      </ul>
    </main>
  );
}
