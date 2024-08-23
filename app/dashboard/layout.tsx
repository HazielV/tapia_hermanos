import { JWTPayload } from "jose";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { getSession, logout } from "@/app/actions/auth";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  interface sessionPayload extends JWTPayload {
    usuario: UsuarioPayload;
  }
  interface UsuarioPayload {
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
  }
  const session = (await getSession()) as sessionPayload;
  const usuario = session.usuario;

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 bg-[#F4F4F4] h-full flex flex-col overflow-hidden">
        <Header logout={logout} usuario={usuario} />
        {children}
      </main>
    </div>
  );
}
