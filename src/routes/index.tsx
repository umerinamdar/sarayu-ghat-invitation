import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import sealedImg from "@/assets/sealed-backdrop.jpg";
import heroImg from "@/assets/hero-backdrop.jpg";
import sealImg from "@/assets/wax-seal.png";
import paperImg from "@/assets/paper-texture.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import { Divider, Frame, Heading } from "@/components/invite/Ornaments";
import { ScratchCard } from "@/components/invite/ScratchCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aarav & Anaya · 14 February 2027" },
      { name: "description", content: "You are invited to the wedding of Aarav & Anaya at The Grand Pavilion, 14 February 2027." },
      { property: "og:title", content: "Aarav & Anaya · Wedding Invitation" },
      { property: "og:description", content: "Join us on the ghats of devotion — 14 February 2027, The Grand Pavilion." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

const WEDDING = new Date("2027-02-14T19:00:00+05:30");
const MAP_URL = "https://www.google.com/maps/search/?api=1&query=The+Grand+Pavilion";

const goldColors = () => {
  const s = getComputedStyle(document.documentElement);
  return ["--highlight", "--accent-soft", "--tint", "--scratch-foil"].map((v) => s.getPropertyValue(v).trim());
};

function Invitation() {
  const [stage, setStage] = useState<"sealed" | "opening" | "revealed">("sealed");
  const [overlayGone, setOverlayGone] = useState(false);
  const [petals, setPetals] = useState(false);
  const music = useRef<HTMLAudioElement>(null);
  const sealSfx = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    document.body.classList.toggle("is-sealed", stage !== "revealed" || !overlayGone);
    return () => document.body.classList.remove("is-sealed");
  }, [stage, overlayGone]);

  const open = () => {
    if (stage !== "sealed") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const m = music.current;
    if (m) {
      m.muted = true;
      m.volume = 0;
      m.play().then(() => {
        m.muted = false;
        const start = performance.now();
        const step = (t: number) => {
          const p = Math.min((t - start) / 8000, 1);
          m.volume = 0.6 * p;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }).catch(() => {});
    }
    sealSfx.current?.play().catch(() => {});
    setStage("opening");
    window.setTimeout(() => setStage("revealed"), reduced ? 50 : 1300);
    window.setTimeout(() => setOverlayGone(true), reduced ? 100 : 2400);
  };

  const onDateReveal = async () => {
    const confetti = (await import("canvas-confetti")).default;
    const colors = goldColors();
    const fire = (x: number, angle: number) =>
      confetti({ particleCount: 70, angle, spread: 60, startVelocity: 55, origin: { x, y: 0.7 }, colors, scalar: 0.9, disableForReducedMotion: true });
    fire(0, 60);
    fire(1, 120);
    window.setTimeout(() => setPetals(true), 900);
  };

  return (
    <div style={{ "--paper-img": `url(${paperImg})` } as CSSProperties}>
      <audio ref={music} src="/audio/music.mp3" loop preload="auto" />
      <audio ref={sealSfx} src="/audio/seal.mp3" preload="auto" />

      {!overlayGone && <SealedCard stage={stage} onOpen={open} />}

      <main className={stage === "revealed" ? "revealed" : ""} aria-hidden={stage === "sealed"}>
        <Hero onDateReveal={onDateReveal} />
        <Families />
        <Venue />
        <Countdown />
        <Programme />
        <Gallery />
        <Blessing />
        <Travel />
        <Rsvp />
        <Closing />
      </main>
      {petals && <PetalShower />}
    </div>
  );
}

/* ---------------- Sealed card ---------------- */
function SealedCard({ stage, onOpen }: { stage: string; onOpen: () => void }) {
  return (
    <div
      className={`stage fixed inset-0 z-50 overflow-hidden transition-opacity duration-1000 ${stage === "opening" ? "is-opening" : ""} ${stage === "revealed" ? "pointer-events-none opacity-0" : ""}`}
      style={{ background: "var(--background)" }}
    >
      <button type="button" onClick={onOpen} className="absolute inset-0 block h-full w-full cursor-pointer focus:outline-none" aria-label="Tap to open the invitation of Aarav and Anaya">
        <div className="leaf leaf-left"><img src={sealedImg} alt="" className="leaf-img" width={1536} height={1024} /></div>
        <div className="leaf leaf-right"><img src={sealedImg} alt="" className="leaf-img" width={1536} height={1024} /></div>
        <div className="pointer-events-none absolute inset-0" style={{ background: "var(--dusk-veil)" }} />

        <div className="seal-idle absolute left-1/2 top-[46%] w-[34vmin] max-w-[220px] min-w-[120px] -translate-x-1/2 -translate-y-1/2">
          <div className="seal">
            <img src={sealImg} alt="" width={816} height={816} className="w-full" />
            <span className="absolute inset-0 flex items-center justify-center font-display text-[7vmin] font-semibold italic sm:text-[2.6rem]" style={{ color: "var(--tint)", textShadow: "0 1px 0 var(--scratch-ink), 0 -1px 0 var(--accent-soft)" }}>
              A<span className="mx-0.5 text-[0.6em]">&</span>A
            </span>
          </div>
        </div>

        <div className="tap-plate absolute inset-x-0 bottom-[6%] flex flex-col items-center gap-3 px-4">
          <span className="label-caps rounded-sm border px-5 py-2 backdrop-blur-sm" style={{ color: "var(--tint)", borderColor: "var(--highlight)", background: "color-mix(in oklab, var(--scratch-ink) 55%, transparent)" }}>
            Tap to open
          </span>
          <span className="text-gold shimmer font-display text-4xl italic sm:text-6xl">Aarav &amp; Anaya</span>
        </div>
      </button>
    </div>
  );
}

/* ---------------- Hero ---------------- */
function Hero({ onDateReveal }: { onDateReveal: () => void }) {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
      <img src={heroImg} alt="Riverside temple ghat at dusk with floating diyas" className="hero-img absolute inset-0 h-full w-full object-cover" width={1536} height={1024} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 55% at 50% 48%, color-mix(in oklab, var(--scratch-ink) 45%, transparent), transparent 75%), var(--dusk-veil)" }} />
      <div className="relative z-10 flex flex-col items-center">
        <p className="rise d1 label-caps" style={{ color: "var(--tint)" }}>Shubh Vivah · With the blessings of Shri Ram</p>
        <h1 className="rise d2 mt-5 font-display text-6xl font-medium italic leading-[0.9] sm:text-8xl lg:text-9xl">
          <span className="text-gold shimmer block">Aarav</span>
          <span className="my-2 block text-3xl not-italic sm:text-4xl" style={{ color: "var(--accent-soft)" }}>&amp;</span>
          <span className="text-gold shimmer block">Anaya</span>
        </h1>
        <p className="rise d3 mt-6 max-w-md font-display text-xl italic" style={{ color: "var(--paper-light)" }}>
          request the honour of your presence as they walk the seven steps together
        </p>
        <div className="rise d4 mt-10 w-full"><ScratchCard onReveal={onDateReveal} /></div>
        <p className="rise d5 label-caps mt-10 animate-bounce" style={{ color: "var(--tint)" }}>Scroll ↓</p>
      </div>
    </section>
  );
}

/* ---------------- Section shell ---------------- */
function Section({ children, dark = false, id }: { children: ReactNode; dark?: boolean; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && el.classList.add("in-view"), { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section id={id} className={`${dark ? "paper-ground-dark" : "paper-ground"} px-4 py-16 sm:py-24`}>
      <div ref={ref} className="reveal-on-scroll mx-auto max-w-4xl">
        <Divider className="mb-10" />
        {children}
      </div>
    </section>
  );
}

/* ---------------- Families ---------------- */
function FamilyColumn({ side, name, parents, grand }: { side: string; name: string; parents: string; grand: string[] }) {
  return (
    <div className="text-center">
      <p className="label-caps text-accent">{side}</p>
      <h3 className="mt-3 font-display text-4xl italic text-foreground">{name}</h3>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Beloved son of</p>
      <p className="font-display text-xl text-foreground">{parents}</p>
      <div className="mx-auto my-5 h-px w-16" style={{ background: "var(--gold-gradient)" }} />
      <p className="label-caps text-muted-foreground">Grandparents</p>
      {grand.map((g) => <p key={g} className="mt-1 font-display text-lg text-foreground">{g}</p>)}
    </div>
  );
}

function Families() {
  return (
    <Section>
      <Frame>
        <Heading eyebrow="Two families, one blessing" title="The Families" />
        <p className="drop-cap mx-auto mb-10 max-w-xl text-center text-[15px] leading-relaxed text-muted-foreground sm:text-left">
          As the river joins the sea, so two households come together in joy. With folded hands and full hearts, the families of the bride and groom invite you to bless this union.
        </p>
        <div className="grid gap-12 sm:grid-cols-2">
          <FamilyColumn side="The Groom" name="Aarav" parents="Shri Rajesh & Smt. Meera Sharma" grand={["Late Shri Govind & Smt. Kamla Sharma", "Shri Hari & Smt. Savitri Joshi"]} />
          <div className="text-center">
            <p className="label-caps text-accent">The Bride</p>
            <h3 className="mt-3 font-display text-4xl italic text-foreground">Anaya</h3>
            <p className="mt-4 text-sm text-muted-foreground">Beloved daughter of</p>
            <p className="font-display text-xl text-foreground">Shri Vikram & Smt. Lata Iyer</p>
            <div className="mx-auto my-5 h-px w-16" style={{ background: "var(--gold-gradient)" }} />
            <p className="label-caps text-muted-foreground">Grandparents</p>
            <p className="mt-1 font-display text-lg text-foreground">Shri Raghunath & Smt. Janaki Iyer</p>
            <p className="mt-1 font-display text-lg text-foreground">Late Shri Mohan & Smt. Padma Rao</p>
          </div>
        </div>
      </Frame>
    </Section>
  );
}

/* ---------------- Venue ---------------- */
function Venue() {
  return (
    <Section dark>
      <Frame className="text-center">
        <Heading eyebrow="Where the river bends" title="The Venue" />
        <h3 className="font-display text-3xl text-foreground">The Grand Pavilion</h3>
        <p className="mt-2 text-muted-foreground">Ghat Road, Riverside Quarter · Ayodhya, Uttar Pradesh</p>
        <a href={MAP_URL} target="_blank" rel="noreferrer" className="label-caps mt-8 inline-block rounded-sm border px-7 py-3 text-paper-light transition-shadow hover:shadow-[var(--shadow-glow)]" style={{ background: "var(--accent)", borderColor: "var(--highlight)" }}>
          Open in Maps
        </a>
      </Frame>
    </Section>
  );
}

/* ---------------- Countdown ---------------- */
function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, WEDDING.getTime() - (now ?? WEDDING.getTime()));
  const parts = [
    ["Days", Math.floor(diff / 86400000)],
    ["Hours", Math.floor(diff / 3600000) % 24],
    ["Minutes", Math.floor(diff / 60000) % 60],
    ["Seconds", Math.floor(diff / 1000) % 60],
  ] as const;
  return (
    <Section>
      <Heading eyebrow="Until the sacred fire" title="Counting the Moments" />
      <div className="grid grid-cols-4 gap-2 sm:gap-5" aria-live="off">
        {parts.map(([l, v]) => (
          <div key={l} className="framed rounded-sm px-1 py-6 text-center">
            <p className="font-display text-4xl font-semibold text-accent tabular-nums sm:text-6xl">{now === null ? "—" : String(v).padStart(2, "0")}</p>
            <p className="label-caps mt-2 text-[0.55rem] text-muted-foreground sm:text-[0.68rem]">{l}</p>
          </div>
        ))}
      </div>
      <p className="label-caps mt-6 text-center text-muted-foreground">Sunday 14 February 2027 · 7:00 pm IST (UTC+05:30)</p>
    </Section>
  );
}

/* ---------------- Programme ---------------- */
const EVENTS = [
  { name: "Mehendi", date: "2027-02-12T16:00:00+05:30", when: "Friday 12 February · 4:00 pm IST", place: "Lotus Courtyard", dress: "Greens & florals" },
  { name: "Haldi", date: "2027-02-13T10:00:00+05:30", when: "Saturday 13 February · 10:00 am IST", place: "Riverside Lawns", dress: "Yellow & marigold" },
  { name: "Wedding", date: "2027-02-14T19:00:00+05:30", when: "Sunday 14 February · 7:00 pm IST", place: "The Grand Pavilion, Ghat Steps", dress: "Traditional — saffron, red & gold" },
  { name: "Reception", date: "2027-02-15T20:00:00+05:30", when: "Monday 15 February · 8:00 pm IST", place: "The Grand Pavilion Ballroom", dress: "Black tie / Indo-western" },
];
function Programme() {
  return (
    <Section dark>
      <Heading eyebrow="Four days of celebration" title="The Programme" />
      <div className="grid gap-6 sm:grid-cols-2">
        {EVENTS.map((e, i) => (
          <Frame key={e.name} className="!px-6 !py-10 text-center">
            <p className="font-display text-sm italic text-muted-foreground">{["I", "II", "III", "IV"][i]}</p>
            <h3 className="mt-1 font-display text-4xl italic text-accent">{e.name}</h3>
            <div className="mx-auto my-4 h-px w-12" style={{ background: "var(--gold-gradient)" }} />
            <p className="font-display text-xl text-foreground"><time dateTime={e.date}>{e.when}</time></p>
            <p className="mt-1 text-sm text-muted-foreground">{e.place}</p>
            <p className="label-caps mt-5 text-foreground"><span className="text-accent">Attire</span> · {e.dress}</p>
          </Frame>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Gallery ---------------- */
function Gallery() {
  const imgs = [
    [g1, "Mandap dressed in marigold and brass diyas"],
    [g2, "Hennaed hands holding a diya over the river"],
    [g3, "Carved temple arch opening onto the river"],
  ] as const;
  return (
    <Section>
      <Heading eyebrow="Moments on the ghat" title="Gallery" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
        {imgs.map(([src, alt], i) => (
          <figure key={alt} className={`framed overflow-hidden rounded-sm p-2 ${i === 2 ? "col-span-2 sm:col-span-1" : ""}`}>
            <img src={src} alt={alt} loading="lazy" width={768} height={1024} className="aspect-[3/4] h-full w-full object-cover transition-transform duration-[2s] hover:scale-105" />
          </figure>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Blessing ---------------- */
function Blessing() {
  return (
    <section className="relative overflow-hidden px-4 py-24 text-center sm:py-32">
      <img src={heroImg} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" width={1536} height={1024} />
      <div className="absolute inset-0" style={{ background: "color-mix(in oklab, var(--scratch-ink) 62%, transparent)" }} />
      <div className="relative mx-auto max-w-2xl">
        <Divider />
        <p className="mt-6 font-display text-2xl italic leading-relaxed sm:text-4xl" style={{ color: "var(--paper-light)" }}>
          “May your union be as steadfast as Ram and Sita, as unbroken as the river, and as luminous as a thousand diyas upon its waters.”
        </p>
        <p className="label-caps mt-6" style={{ color: "var(--accent-soft)" }}>A blessing from the elders</p>
        <Divider className="mt-6" />
      </div>
    </section>
  );
}

/* ---------------- Travel ---------------- */
function Travel() {
  const items = [
    ["By Air", "Ayodhya Airport (AYJ) is 20 minutes away. Complimentary transfers run every hour on 12–15 February."],
    ["By Rail", "Ayodhya Dham Junction connects to Delhi, Lucknow and Varanasi. Our hosts will meet guests at the station."],
    ["Accommodation", "Rooms are held for guests at The Grand Pavilion and Sarayu Residency. Mention “Aarav & Anaya” when booking."],
    ["Weather", "February evenings by the river are cool, around 12°C. A light shawl is recommended."],
  ];
  return (
    <Section dark>
      <Frame>
        <Heading eyebrow="For our travelling guests" title="Travel & Stay" />
        <div className="grid gap-8 sm:grid-cols-2">
          {items.map(([t, d]) => (
            <div key={t}>
              <h3 className="font-display text-2xl italic text-accent">{t}</h3>
              <div className="my-2 h-px w-10" style={{ background: "var(--gold-gradient)" }} />
              <p className="text-[15px] leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Frame>
    </Section>
  );
}

/* ---------------- RSVP ---------------- */
function Rsvp() {
  const [sent, setSent] = useState<string | null>(null);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setSent(String(f.get("name") || "dear guest"));
  };
  const field = "w-full rounded-sm border bg-surface px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring";
  return (
    <Section>
      <Frame>
        <Heading eyebrow="Kindly reply by 10 January 2027" title="RSVP" />
        {sent ? (
          <p className="text-center font-display text-2xl italic text-foreground">Thank you, {sent}. Your reply has been received with joy.</p>
        ) : (
          <form onSubmit={submit} className="mx-auto grid max-w-md gap-4">
            <label className="grid gap-1"><span className="label-caps text-muted-foreground">Full name</span><input required name="name" maxLength={80} className={field} /></label>
            <label className="grid gap-1"><span className="label-caps text-muted-foreground">Number of guests</span><input name="guests" type="number" min={1} max={10} defaultValue={2} className={field} /></label>
            <fieldset className="grid gap-2">
              <legend className="label-caps mb-1 text-muted-foreground">Will you attend?</legend>
              <div className="flex gap-6 text-foreground">
                <label className="flex items-center gap-2"><input type="radio" name="attend" value="yes" defaultChecked className="accent-[var(--accent)]" /> Joyfully accept</label>
                <label className="flex items-center gap-2"><input type="radio" name="attend" value="no" className="accent-[var(--accent)]" /> Regretfully decline</label>
              </div>
            </fieldset>
            <label className="grid gap-1"><span className="label-caps text-muted-foreground">A note for the couple</span><textarea name="note" rows={3} maxLength={500} className={field} /></label>
            <button type="submit" className="label-caps mt-2 rounded-sm border px-7 py-4 text-paper-light transition-shadow hover:shadow-[var(--shadow-glow)]" style={{ background: "var(--accent)", borderColor: "var(--highlight)" }}>
              Send our blessings
            </button>
          </form>
        )}
      </Frame>
    </Section>
  );
}

/* ---------------- Closing ---------------- */
function Closing() {
  return (
    <section className="paper-ground-dark px-4 pb-24 pt-16 text-center">
      <Divider />
      <div className="relative mx-auto mt-8 w-40">
        <img src={sealImg} alt="" loading="lazy" width={816} height={816} className="w-full drop-shadow-xl" />
        <span className="absolute inset-0 flex items-center justify-center font-display text-3xl font-semibold italic" style={{ color: "var(--tint)" }}>A&amp;A</span>
      </div>
      <p className="mt-8 font-display text-3xl italic text-foreground sm:text-5xl">With love, Aarav &amp; Anaya</p>
      <p className="label-caps mt-4 text-muted-foreground">14 · 02 · 2027 · The Grand Pavilion</p>
    </section>
  );
}

/* ---------------- Petals ---------------- */
function PetalShower() {
  const [list, setList] = useState<{ id: number; left: number; dur: number; drift: number; size: number }[]>([]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id = 0;
    const t = setInterval(() => {
      setList((l) => [...l.slice(-28), { id: id++, left: Math.random() * 100, dur: 9 + Math.random() * 8, drift: (Math.random() - 0.5) * 200, size: 0.6 + Math.random() * 0.8 }]);
    }, 700);
    return () => clearInterval(t);
  }, []);
  return (
    <div aria-hidden>
      {list.map((p) => (
        <span key={p.id} className="petal" style={{ left: `${p.left}%`, animationDuration: `${p.dur}s`, scale: p.size, "--drift": `${p.drift}px` } as CSSProperties} />
      ))}
    </div>
  );
}
