import { useEffect, useState } from "react";

const sections = ["inicio", "experiencia", "habilidades", "proyectos", "contacto"];

export default function HeaderReact() {
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const observers = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        { threshold: 0.55 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10 ">
      <nav className="flex gap-6 py-4 px-4 overflow-x-auto whitespace-nowrap scrollbar-none justify-start sm:justify-center">
        {sections.map((sec) => (
          <a
            key={sec}
            href={`#${sec}`}
            className={`
              relative text-sm sm:text-base transition-all px-2 pb-1
              ${active === sec ? "text-white font-semibold" : "text-gray-300 hover:text-white transition-transform duration-300 hover:scale-120"}
            `}
          >
            {sec.charAt(0).toUpperCase() + sec.slice(1)}

            {/* Glow */}
            {active === sec && (
              <span
                className=" 
                  absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                  w-[120%] h-6 rounded-full
                  bg-blue-400/20 blur-lg
                  opacity-80 pointer-events-none
                "
              ></span>
            )}
          </a>
        ))}
      </nav>
    </header>
  );
}
