// src/components/RobustFadeIn.jsx
import { useEffect, useRef, useState } from "react";

/**
 * Uso: <RobustFadeIn client:visible> ... </RobustFadeIn>
 * Inline styles garantizan transición de opacity, transform y filter.
 */
export default function RobustFadeIn({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);     // evita FOUC antes de montar
  const [visible, setVisible] = useState(false); // controla animación

  // Evitar flash inicial: espera al siguiente frame antes de activar observer
  useEffect(() => {
    requestAnimationFrame(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // optional small timeout for staggered effect
          if (delay > 0) {
            setTimeout(() => setVisible(true), delay);
          } else {
            setVisible(true);
          }
          observer.unobserve(node);
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ready, delay]);

  // estilos inline para asegurar la transición de filter
  const transitionTiming = "900ms cubic-bezier(0.22,1,0.36,1)";
  const baseStyle = {
    opacity: 0,
    transform: "translateY(-18px)", // viene desde arriba sutil
    filter: "blur(6px)",
    transition: `opacity ${transitionTiming}, transform ${transitionTiming}, filter ${transitionTiming}`,
    willChange: "opacity, transform, filter",
  };
  const visibleStyle = {
    opacity: 1,
    transform: "translateY(0)",
    filter: "blur(0px)",
  };

  return (
    <div ref={ref} className={className} aria-hidden={!visible && !ready}>
      <div style={visible ? { ...baseStyle, ...visibleStyle } : baseStyle}>
        {children}
      </div>
    </div>
  );
}
