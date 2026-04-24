import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sunflowerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setShow(false);
        onComplete();
      },
    });

    // Sunflower spins in from nothing
    tl.fromTo(
      sunflowerRef.current,
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.5)" }
    );

    // "Hi there" fades in
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

    // Subtitle
    tl.fromTo(
      subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );

    // Pause
    tl.to({}, { duration: 0.8 });

    // Sunflower keeps spinning slowly
    tl.to(sunflowerRef.current, { rotation: 360, duration: 3.5, ease: "power1.inOut" }, "-=0.8");

    // Everything slides up and out
    tl.to(
      containerRef.current,
      {
        y: "-100%",
        duration: 1.5,
        ease: "power4.inOut",
      },
      "-=0.5"
    );
  }, [onComplete]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(180deg, #0a0818 0%, #1a1130 100%)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-[100px]"
        style={{ background: "var(--gradient-sun)" }}
      />

      {/* Rotating sunflower */}
      <div ref={sunflowerRef} className="relative mb-10">
        <div className="sunflower w-[100px] h-[100px]" />
      </div>

      {/* Hii there */}
      <h1
        ref={textRef}
        className="text-6xl sm:text-8xl tracking-[-2px] opacity-0"
        style={{
          fontFamily: "'Instrument Serif', serif",
          background: "linear-gradient(135deg, #ffd97a 0%, #f5c542 40%, #e89b1a 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Hii there
      </h1>

      <p
        ref={subRef}
        className="text-white/50 text-sm mt-4 uppercase tracking-[0.3em] opacity-0"
      >
        welcome to my little world, am sneha!
      </p>
    </div>
  );
}
