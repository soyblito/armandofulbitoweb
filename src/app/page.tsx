"use client";
import Image from "next/image";
import { Parallax } from "react-parallax";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-[#B2EBF2] via-white min-h-screen w-full font-sans">
      {/* Hero Section */}
      <Parallax bgImage="/hero-bg.jpg" strength={600}>
        <section className="flex flex-col items-center justify-center h-[80vh] text-center relative">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#B2EBF2]/80 via-white/80 to-black/80 pointer-events-none"></div>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-[#00BFFF] drop-shadow-lg mb-6 animate-fade-in relative z-10">
            Armando Fulbito
          </h1>
          <p className="text-xl sm:text-2xl text-black/80 font-medium mb-8 animate-fade-in delay-200 relative z-10">
            La forma más fácil y divertida de organizar tus partidos de fútbol
            amateur.
          </p>
          <a
            href="#beneficios"
            className="bg-[#00BFFF] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-[#009ACD] transition-all animate-bounce relative z-10"
          >
            ¡Sumate ahora!
          </a>
        </section>
      </Parallax>

      {/* Beneficios */}
      <section
        id="beneficios"
        className="max-w-7xl mx-auto py-20 px-4 flex flex-col md:flex-row items-center justify-center gap-10"
      >
        <div className="flex-1 flex flex-col items-center p-8 border-2 border-[#00BFFF] rounded-2xl bg-white/70 shadow-xl transition-transform hover:scale-105 hover:shadow-2xl animate-slide-up">
          <Image
            src="/icon-teams.png"
            alt="Equipos"
            width={80}
            height={80}
            className="mb-4"
          />
          <h2 className="text-2xl font-bold text-[#00BFFF] mb-2">
            Gestioná tus equipos
          </h2>
          <p className="text-black/80 text-center">
            Creá equipos, invitá amigos y llevá el control de tus partidos y
            estadísticas.
          </p>
        </div>
        <div className="flex-1 flex flex-col items-center p-8 border-2 border-[#00BFFF] rounded-2xl bg-white/70 shadow-xl transition-transform hover:scale-105 hover:shadow-2xl animate-slide-up delay-100">
          <Image
            src="/icon-calendar.png"
            alt="Calendario"
            width={80}
            height={80}
            className="mb-4"
          />
          <h2 className="text-2xl font-bold text-[#00BFFF] mb-2">
            Organizá partidos
          </h2>
          <p className="text-black/80 text-center">
            Definí fecha, lugar y hora. Confirmá asistentes y armá los equipos
            automáticamente.
          </p>
        </div>
        <div className="flex-1 flex flex-col items-center p-8 border-2 border-[#00BFFF] rounded-2xl bg-white/70 shadow-xl transition-transform hover:scale-105 hover:shadow-2xl animate-slide-up delay-200">
          <Image
            src="/icon-chat.png"
            alt="Chat"
            width={80}
            height={80}
            className="mb-4"
          />
          <h2 className="text-2xl font-bold text-[#00BFFF] mb-2">
            Comunidad y chat
          </h2>
          <p className="text-black/80 text-center">
            Chateá con tus amigos, compartí resultados y viví el fulbito como
            nunca.
          </p>
        </div>
      </section>

      {/* CTA Final */}
      <section className="w-full py-16 bg-[#00BFFF] text-white text-center animate-fade-in">
        <h2 className="text-3xl font-bold mb-4">¿Listo para jugar?</h2>
        <p className="mb-8 text-lg">
          Registrate gratis y empezá a organizar tus partidos hoy mismo.
        </p>
        <a
          href="/register"
          className="bg-white text-[#00BFFF] font-bold px-8 py-4 rounded-full shadow-lg hover:bg-[#B2EBF2] transition-all"
        >
          Crear cuenta
        </a>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-black text-white text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Armando Fulbito. Todos los derechos
          reservados.
        </p>
      </footer>

      {/* Animaciones CSS */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease;
        }
        .animate-slide-up {
          animation: slideUp 1s ease;
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </main>
  );
}
