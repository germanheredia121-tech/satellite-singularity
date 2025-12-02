import { useEffect, useState, useRef } from "react";

const sections = ["inicio", "experiencia", "habilidades", "proyectos", "contacto"];

const sectionNames = {
  es: ["Inicio", "Experiencia", "Habilidades", "Proyectos", "Contacto"],
  en: ["Home", "Experience", "Skills", "Projects", "Contact"],
  de: ["Start", "Erfahrung", "Fähigkeiten", "Projekte", "Kontakt"],
};

const languages = {
  es: { code: "ES", name: "Español", flag: "🇪🇸" },
  en: { code: "EN", name: "English", flag: "🇬🇧" },
  de: { code: "DE", name: "Deutsch", flag: "🇩🇪" },
};

export default function HeaderReact() {
  const [active, setActive] = useState("inicio");
  const [language, setLanguage] = useState("es");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Observador de scroll
  useEffect(() => {
    const observers = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.25 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Cargar idioma guardado
  useEffect(() => {
    const stored = localStorage.getItem("language");
    if (stored && languages[stored]) {
      setLanguage(stored);
      document.documentElement.setAttribute("lang", stored);
      document.documentElement.setAttribute("data-lang", stored);
    }
  }, []);

  // Click fuera para cerrar dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const selectLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("data-lang", lang);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    window.dispatchEvent(
      new CustomEvent("languagechange", { detail: { language: lang } })
    );
  };

  return (
    <>
      {/* Desktop Header: NO se toca nada */}
<header className="hidden sm:flex fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
  <div className="mx-auto relative flex items-center h-15 px-4 w-full">
    {/* Navegación centrada */}
    <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-6 items-center whitespace-nowrap">
      {sections.map((sec, index) => (
        <a
          key={sec}
          href={`#${sec}`}
          className={`relative text-sm sm:text-base transition-all px-2 pb-1 ${
            active === sec
              ? "text-white font-semibold"
              : "text-gray-300 hover:text-white transition-transform duration-300 hover:scale-120"
          }`}
        >
          {sectionNames[language][index]}
          {active === sec && (
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-6 rounded-full bg-blue-400/20 blur-lg opacity-80 pointer-events-none"></span>
          )}
        </a>
      ))}
    </nav>

    {/* Selector de lenguaje extremo derecho */}
    <div className="ml-auto flex justify-end relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-transparent text-white transition-colors duration-200"
      >
        <span>{languages[language].flag}</span>
        <span className="font-medium text-sm sm:text-base">{languages[language].code}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {dropdownOpen && (
        <div
          className="absolute top-full right-0 mt-3 w-40 bg-black/40 backdrop-blur-md rounded-lg shadow-lg overflow-hidden z-50 transition-all"
          onMouseLeave={() => setDropdownOpen(false)}
        >
          {Object.keys(languages).map((langKey) => (
            <button
              key={langKey}
              onClick={() => selectLanguage(langKey)}
              className="w-full text-left px-4 py-3 text-white hover:bg-black/50 transition-colors duration-150 flex items-center gap-2"
            >
              <span className="font-medium">{languages[langKey].flag}</span>
              <span>{languages[langKey].name}</span>
              <span className="ml-auto text-xs text-gray-400">{languages[langKey].code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
</header>

{/* Mobile: solo botón hamburguesa */}
<header className="sm:hidden fixed top-0 left-0 w-full z-50 flex justify-end items-center h-16 px-4">
  <button onClick={toggleMobileMenu} className="text-white text-2xl">
    ☰
  </button>
</header>

{/* Mobile menu desplegable */}
{mobileMenuOpen && (
  <div className="sm:hidden fixed top-16 left-0 w-full h-[calc(100%-4rem)] bg-transparent/90 backdrop-blur-md overflow-auto z-50">
    <nav className="flex flex-col px-6 py-4 gap-4">
      {sections.map((sec, index) => (
        <a
          key={sec}
          href={`#${sec}`}
          onClick={() => setMobileMenuOpen(false)}
          className="text-white text-lg py-2 rounded hover:bg-black/50 transition-colors"
        >
          {sectionNames[language][index]}
        </a>
      ))}

      <div className="border-t border-white/20 mt-4 pt-4 flex flex-col gap-2">
        {Object.keys(languages).map((langKey) => (
          <button
            key={langKey}
            onClick={() => selectLanguage(langKey)}
            className="w-full text-left px-2 py-2 text-white hover:bg-white/50 transition-colors flex items-center gap-2"
          >
            <span>{languages[langKey].flag}</span>
            <span>{languages[langKey].name}</span>
          </button>
        ))}
      </div>
    </nav>
  </div>
)}

      {/* Mobile: solo botón hamburguesa */}
      <header className="sm:hidden fixed top-0 left-0 w-full z-50 flex justify-end items-center h-16 px-4">
        <button onClick={toggleMobileMenu} className="text-white text-2xl">
          ☰
        </button>
      </header>

      {/* Mobile menu desplegable */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed top-16 left-0 w-full h-[calc(100%-4rem)] bg-transparent backdrop-blur-md overflow-auto z-50">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {sections.map((sec, index) => (
              <a
                key={sec}
                href={`#${sec}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white text-lg py-2 rounded hover:bg-white/50 transition-colors"
              >
                {sectionNames[language][index]}
              </a>
            ))}

            <div className="border-t border-white/20 mt-4 pt-4 flex flex-col gap-2">
              {Object.keys(languages).map((langKey) => (
                <button
                  key={langKey}
                  onClick={() => selectLanguage(langKey)}
                  className="w-full text-left px-2 py-2 text-white hover:bg-white/50 transition-colors flex items-center gap-2"
                >
                  <span>{languages[langKey].flag}</span>
                  <span>{languages[langKey].name}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

