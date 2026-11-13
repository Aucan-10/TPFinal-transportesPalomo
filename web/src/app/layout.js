import Link from "next/link";
import RegistrarSW from "./RegistrarSW";
import "./globals.css";

export const metadata = {
  title: "Transportes Palomo",
  description: "Flota de camiones refrigerados y mudanzas",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <header className="encabezado">
          <Link href="/">Transportes Palomo</Link>
        </header>
        {children}
        <RegistrarSW />
      </body>
    </html>
  );
}
