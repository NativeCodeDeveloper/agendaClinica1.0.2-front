"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RevealOnScroll from "@/Componentes/RevealOnScroll";

export default function Seccion1() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const [sobreNosotros, setSobreNosotros] = useState("");
  const [primerParrafo, setPrimerParrafo] = useState("");
  const [segundoParrafo, setSegundoParrafo] = useState("");

  async function cargarContenido() {
    try {
      const [resTitulos, resTextos] = await Promise.all([
        fetch(`${API}/titulo`),
        fetch(`${API}/textos`),
      ]);

      if (resTitulos.ok) {
        const data = await resTitulos.json();
        if (Array.isArray(data)) {
          const t3 = data.find((i) => Number(i.id_titulo) === 3);
          if (t3?.titulo) setSobreNosotros(t3.titulo);
        }
      }

      if (resTextos.ok) {
        const data = await resTextos.json();
        if (Array.isArray(data)) {
          const p1 = data.find((i) => Number(i.id_Textos) === 1);
          const p2 = data.find((i) => Number(i.id_Textos) === 2);
          if (p1?.contenido) setPrimerParrafo(p1.contenido);
          if (p2?.contenido) setSegundoParrafo(p2.contenido);
        }
      }
    } catch (err) {
      console.error("Error cargando contenido sobre nosotros", err);
    }
  }

  useEffect(() => {
    cargarContenido();
  }, []);

  return (
    <section
      id="sobre-nosotros"
      className="scroll-mt-24 bg-white py-20 sm:py-28 border-t border-slate-100"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
        <RevealOnScroll>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-start">

            {/* Left */}
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="h-px w-10 bg-indigo-600" />
                <span className="text-sm font-semibold tracking-widest text-indigo-600 uppercase">
                  Nosotros
                </span>
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight mb-7">
                {sobreNosotros || "Sobre Nosotros"}
              </h2>
              {primerParrafo ? (
                <p className="text-lg text-slate-600 leading-relaxed">
                  {primerParrafo}
                </p>
              ) : (
                <p className="text-lg text-slate-400 leading-relaxed italic">
                  El equipo de este centro está listo para atenderte. Ingresa tu descripción desde el panel de administración para que tus pacientes te conozcan mejor.
                </p>
              )}
            </div>

            {/* Right */}
            <div className="flex flex-col gap-8 lg:pt-16">
              {segundoParrafo && (
                <p className="text-lg text-slate-600 leading-relaxed">
                  {segundoParrafo}
                </p>
              )}
              <Link
                href="/agendaProfesionales"
                className="group inline-flex items-center gap-2 font-semibold text-slate-900 hover:text-indigo-600 transition-colors w-fit"
              >
                Reservar una hora
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
