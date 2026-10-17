import { useEffect, useRef, useState } from "react";

const THRESHOLD = 0.38;

export function ScratchCard({ onReveal }: { onReveal: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [gone, setGone] = useState(false);
  const drawing = useRef(false);
  const strokes = useRef(0);
  const done = useRef(false);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    setRevealed(true);
    onReveal();
    window.setTimeout(() => setGone(true), 900);
  };

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = c.getBoundingClientRect();
    c.width = width * dpr;
    c.height = height * dpr;
    const ctx = c.getContext("2d")!;
    ctx.scale(dpr, dpr);
    const css = getComputedStyle(document.documentElement);
    const foil = css.getPropertyValue("--scratch-foil").trim();
    const hi = css.getPropertyValue("--tint").trim();
    const ink = css.getPropertyValue("--scratch-ink").trim();
    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, foil);
    g.addColorStop(0.45, hi);
    g.addColorStop(0.55, foil);
    g.addColorStop(1, foil);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 1400; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.12})`;
      ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
    }
    ctx.strokeStyle = ink;
    ctx.globalAlpha = 0.35;
    ctx.strokeRect(10, 10, width - 20, height - 20);
    ctx.globalAlpha = 1;
  }, []);

  const scratch = (x: number, y: number) => {
    const c = canvasRef.current;
    if (!c || done.current) return;
    const rect = c.getBoundingClientRect();
    const ctx = c.getContext("2d")!;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x - rect.left, y - rect.top, 22, 0, Math.PI * 2);
    ctx.fill();
    if (++strokes.current % 8 === 0) check();
  };

  const check = () => {
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    const data = ctx.getImageData(0, 0, c.width, c.height).data;
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 64) {
      total++;
      if (data[i] === 0) clear++;
    }
    if (clear / total >= THRESHOLD) finish();
  };

  return (
    <div className="relative mx-auto w-full max-w-xs">
      <div className="framed rounded-sm px-6 py-7 text-center">
        <p className="label-caps text-muted-foreground">Save the date</p>
        <p className="mt-2 font-display text-4xl font-semibold text-accent">14 · II · 2027</p>
        <p className="mt-1 font-display text-lg italic text-foreground">Sunday, 14 February 2027</p>
        <p className="label-caps mt-2 text-muted-foreground">7:00 pm IST · The Grand Pavilion</p>
      </div>
      {!gone && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${revealed ? "opacity-0" : "opacity-100"}`}>
          <canvas
            ref={canvasRef}
            className="h-full w-full touch-none cursor-grab rounded-sm"
            onPointerDown={(e) => { drawing.current = true; e.currentTarget.setPointerCapture(e.pointerId); scratch(e.clientX, e.clientY); }}
            onPointerMove={(e) => drawing.current && scratch(e.clientX, e.clientY)}
            onPointerUp={() => { drawing.current = false; check(); }}
            aria-hidden
          />
          <button
            type="button"
            onClick={(e) => { if (e.detail === 0) finish(); }}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); finish(); } }}
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight"
            style={{ color: "var(--scratch-ink)" }}
            aria-label="Reveal the wedding date. Press Enter to reveal."
          >
            <span className="label-caps">Rub the gold</span>
            <span className="mt-1 font-display text-lg italic">to reveal the date</span>
          </button>
        </div>
      )}
    </div>
  );
}
