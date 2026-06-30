/** Campo de estrelas sutil (puro CSS, sem JS) — clima espacial de fundo. */
export function Starfield() {
  const stars = Array.from({ length: 40 }, (_, i) => {
    const top = (i * 53) % 100;
    const left = (i * 37) % 100;
    const delay = (i % 7) * 0.5;
    const size = (i % 3) + 1;
    return { top, left, delay, size };
  });
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/70 animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
