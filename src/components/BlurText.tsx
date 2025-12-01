import { useEffect, useRef } from "react";

interface BlurTextProps {
  text: string;
  animateBy?: "letters" | "words";
  direction?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
  onAnimationComplete?: () => void; // 👈 AGREGADA ESTA PROP
}

export default function BlurText({
  text,
  animateBy = "letters",
  direction = "top",
  delay = 50,
  className = "",
  onAnimationComplete,
}: BlurTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const children = Array.from(element.children);

    children.forEach((child, i) => {
      const el = child as HTMLElement;

      el.style.opacity = "0";
      el.style.filter = "blur(6px)";
      el.style.transform =
        direction === "top"
          ? "translateY(20px)"
          : direction === "bottom"
          ? "translateY(-20px)"
          : direction === "left"
          ? "translateX(20px)"
          : "translateX(-20px)";

      setTimeout(() => {
        el.style.transition =
          "opacity 0.6s ease-out, filter 0.6s ease-out, transform 0.6s ease-out";

        el.style.opacity = "1";
        el.style.filter = "blur(0)";
        el.style.transform = "translate(0,0)";

        // Cuando termina el último → llamamos al callback
        if (i === children.length - 1 && onAnimationComplete) {
          setTimeout(() => {
            onAnimationComplete();
          }, 600); // igual al tiempo de transición
        }
      }, i * delay);
    });
  }, [text, direction, delay, onAnimationComplete]);

  const parts =
    animateBy === "letters" ? text.split("") : text.split(" ");

  return (
    <span ref={containerRef} className={className}>
      {parts.map((part, i) => (
        <span
          key={i}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {part}
        </span>
      ))}
    </span>
  );
}
