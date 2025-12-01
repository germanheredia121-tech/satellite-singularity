import { useState } from "react";
import BlurText from "./BlurText.tsx";

export default function HeroAnimated() {
  const [ready, setReady] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen pt-32 sm:pt-40 md:pt-48 px-4 text-center">
      {/* 1️⃣ Primer texto */}
      <BlurText
        text="German Heredia Ezequiel"
        animateBy="letters"
        direction="top"
        delay={40}
        className="text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg"
        onAnimationComplete={() => setReady(true)}
      />

      {/* 2️⃣ Segundo texto — aparece recién cuando termina el primero */}
      {ready && (
        <BlurText
          text="Software Developer"
          animateBy="letters"
          direction="top"
          delay={40}
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-200 mt-4"
        />
      )}
    </div>
  );
}
