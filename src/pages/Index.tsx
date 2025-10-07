import {
  ArrowUpRight,
  GaugeCircle,
  LineChart,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Waves,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Cinematic immersion",
    description: "A layered spatial journey that feels tailored to the cadence of your breath.",
    detail: "Engineered with oceanic acoustics, adaptive visuals, and haptic resonance for a multi-sensory reveal.",
  },
  {
    icon: GaugeCircle,
    title: "Zero-gravity interface",
    description: "Navigate with featherlight gestures that respond like water to moonlight.",
    detail: "New magnetic dial clusters learn how you explore, reshaping the UI with each interaction.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    description: "Your reflections stay yours, protected with on-device intelligence.",
    detail: "Secure neural cores render every scene locally, so your story remains untold—until you choose otherwise.",
  },
];

const experiences = [
  {
    name: "Prelude Origin",
    description: "Unfolds with a quiet crescendo—light, mist, and motion in perfect symmetry.",
  },
  {
    name: "Subsurface Bloom",
    description: "Interactive tides respond to your presence, painting the chamber in living color.",
  },
  {
    name: "Luminous Echo",
    description: "An intimate finale that suspends time with crystal-clear acoustics and temporal lighting.",
  },
];

const metrics = [
  {
    label: "Immersion fidelity",
    value: "99.2%",
    caption: "Measured via multi-sensory calibration across 7 acoustic layers.",
  },
  {
    label: "Session flow",
    value: "< 12s",
    caption: "Average time to first meaningful interaction in field studies.",
  },
  {
    label: "Satisfaction",
    value: "4.9 / 5",
    caption: "Rated by early collaborators experiencing the private preview.",
  },
];

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[hsl(var(--background))] text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,_hsla(var(--teal-glow)_/_0.32)_0%,_transparent_70%)] blur-3xl" aria-hidden />
        <div className="absolute -right-32 top-48 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,_hsla(var(--omz-violet)_/_0.28)_0%,_transparent_60%)] blur-3xl" aria-hidden />
        <div className="absolute inset-0 bg-[linear-gradient(140deg,_rgba(255,255,255,0.08)_0%,_rgba(255,255,255,0)_45%)] opacity-60" aria-hidden />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,_rgba(255,255,255,0.04)_1px,_transparent_1px)] bg-[length:100%_56px] opacity-20" aria-hidden />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-foreground">
              <Waves className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.6em] text-muted-foreground/80">
                Glass Ocean
              </p>
              <p className="text-sm font-semibold tracking-wide text-foreground/90">
                Prelude Experience
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-10 text-sm text-muted-foreground/90 md:flex">
            <a className="transition hover:text-foreground" href="#">Product</a>
            <a className="transition hover:text-foreground" href="#">Experience</a>
            <a className="transition hover:text-foreground" href="#">Specifications</a>
            <a className="transition hover:text-foreground" href="#">Stories</a>
          </nav>

          <button className="hidden items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-foreground transition hover:border-white/50 md:inline-flex">
            Reserve Access
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </header>

        <main className="flex flex-1 flex-col">
          <section className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col gap-14 px-6 pb-24 pt-12 lg:flex-row lg:items-center lg:gap-20">
            <div className="flex flex-1 flex-col justify-center space-y-10">
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-muted-foreground backdrop-blur-lg">
                <Sparkles className="h-4 w-4 text-foreground" />
                <span>Introducing the Prelude Sequence</span>
              </div>
              <div className="space-y-6">
                <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Immerse in the first chapter of the Glass Ocean narrative.
                </h1>
                <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
                  A meticulously orchestrated launch environment that bends light, sound, and motion to your presence. Designed for the curious, built for the visionary.
                </p>
              </div>
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <button className="group inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-6 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition duration-300 hover:shadow-[0_24px_60px_-20px_rgba(58,234,213,0.5)] focus-visible:focus-ring">
                  Preorder Prelude
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </button>
                <button className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-white/40 focus-visible:focus-ring">
                  <PlayCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
                  Watch the reveal
                </button>
              </div>
              <div className="flex flex-wrap gap-8 text-sm text-muted-foreground/90">
                <div>
                  <p className="text-2xl font-semibold text-foreground">12K</p>
                  <p>Early viewing invitations requested</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">48 hrs</p>
                  <p>Average waitlist confirmation</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">6</p>
                  <p>Global premiere locations</p>
                </div>
              </div>
            </div>

            <div className="relative flex flex-1 justify-center">
              <div className="perspective-1000">
                <div className="group relative w-full max-w-md rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/[0.02] p-6 text-left shadow-[0_32px_120px_-30px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
                  <div className="absolute -top-8 right-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.35)_0%,_transparent_65%)] blur-xl" aria-hidden />
                  <div className="absolute inset-px rounded-[1.9rem] border border-white/10" aria-hidden />
                  <div className="relative h-full space-y-5">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/60">
                      <span>Sequence Module</span>
                      <span>Edition 01</span>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,_rgba(26,48,70,0.7),_rgba(12,24,44,0.9))] p-6">
                      <p className="text-sm font-semibold text-white/70">Tidal Resonance Frame</p>
                      <p className="mt-2 text-3xl font-medium text-white">Prelude Capsule</p>
                      <p className="mt-3 text-sm text-white/70">
                        The chamber breathes with you—subtle light fields echo each inhale while responsive acoustics envelop the horizon.
                      </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Atmospherics</p>
                        <p className="mt-2 text-base font-semibold text-white">Ambient aurora</p>
                        <p className="mt-1 text-xs text-white/60">Glass refractors with chroma trails</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Soundworks</p>
                        <p className="mt-2 text-base font-semibold text-white">Oceanic bloom</p>
                        <p className="mt-1 text-xs text-white/60">Immersive 360° resonance mapping</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm text-white/70">
                        <p className="text-xs uppercase tracking-[0.25em] text-white/40">Live synchrony</p>
                        <p className="mt-1 text-white">Cloudless handoff across Prelude suites</p>
                      </div>
                      <LineChart className="h-8 w-8 text-white/60" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative border-t border-white/10 bg-white/5 py-20">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-4">
                  <h2 className="text-3xl font-medium text-foreground sm:text-4xl">
                    Crafted for a continuum of discovery.
                  </h2>
                  <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
                    An experience built in movements. Each passage unfolds a deeper layer of interaction, keeping you anchored in the moment while opening portals to what comes next.
                  </p>
                </div>
                <button className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-foreground transition hover:border-white/40 focus-visible:focus-ring">
                  Explore specifications
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {features.map(({ icon: Icon, title, description, detail }) => (
                  <div key={title} className="glass-subtle flex flex-col gap-4 rounded-3xl p-6 transition hover:-translate-y-[6px] hover:shadow-[0_30px_60px_-40px_rgba(0,0,0,0.8)]">
                    <Icon className="h-6 w-6 text-[hsl(var(--primary))]" />
                    <h3 className="text-xl font-semibold text-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                    <p className="text-sm text-muted-foreground/80">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="relative border-t border-white/10 bg-[rgba(12,24,44,0.6)] py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(58,234,213,0.12)_0%,_transparent_70%)]" aria-hidden />
            <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-medium text-white sm:text-4xl">
                  Moments that reshape perspective.
                </h2>
                <p className="max-w-2xl text-base text-white/70 sm:text-lg">
                  Chart the Prelude journey across its three movements—each designed to showcase the dialogue between human intuition and responsive technology.
                </p>
              </div>

              <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:items-start">
                <div className="flex flex-col gap-6">
                  {experiences.map(({ name, description }) => (
                    <div key={name} className="rounded-3xl border border-white/15 bg-white/5 p-6 text-white">
                      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-white/60">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/80">
                          {name.split(" ")[0][0]}
                        </span>
                        {name}
                      </div>
                      <p className="mt-3 text-sm text-white/70">{description}</p>
                    </div>
                  ))}
                </div>

                <div className="glass-intense relative rounded-[2.5rem] border border-white/15 p-8 text-white">
                  <div className="absolute -top-20 right-16 h-32 w-32 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.35)_0%,_transparent_65%)] blur-2xl" aria-hidden />
                  <div className="absolute inset-px rounded-[2.3rem] border border-white/10" aria-hidden />
                  <div className="relative grid gap-10">
                    <div className="space-y-3">
                      <p className="text-xs uppercase tracking-[0.4em] text-white/60">Signals</p>
                      <p className="text-2xl font-semibold">Precision metrics tuned to presence.</p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-3">
                      {metrics.map(({ label, value, caption }) => (
                        <div key={label} className="rounded-2xl border border-white/15 bg-white/10 p-4">
                          <p className="text-xs uppercase tracking-[0.3em] text-white/50">{label}</p>
                          <p className="mt-3 text-2xl font-semibold">{value}</p>
                          <p className="mt-1 text-xs text-white/70">{caption}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 p-5">
                      <div className="space-y-2 text-sm text-white/70">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Live orchestration</p>
                        <p>Prelude suites synchronize across continents within 40 ms latency.</p>
                      </div>
                      <ShieldCheck className="h-8 w-8 text-white/70" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/10 bg-black/30 py-10">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.6em] text-muted-foreground/80">Glass Ocean</p>
              <p className="text-sm text-muted-foreground/80">Prelude launch window: Winter 2025</p>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground/70">
              <a className="transition hover:text-foreground" href="#">Support</a>
              <a className="transition hover:text-foreground" href="#">Press</a>
              <a className="transition hover:text-foreground" href="#">Privacy</a>
              <a className="transition hover:text-foreground" href="#">Terms</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
