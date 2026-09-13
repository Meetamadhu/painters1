import { useState, useRef, MouseEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TimeOfDay, FinishItem, PageExperience } from '../../types';
import { TIME_CONFIGS, lightingFilterFor, lightingWashFor } from '../../data/timeConfigs';
import { FINISHES_DATA } from '../../data/finishesData';
import { REAL_PROJECTS } from '../../data/projectsData';
import ProofBadge from '../ProofBadge';
import ScrollTintFrame from '../ScrollTintFrame';
import { ArrowRight, Sun, Sliders, Volume2, VolumeX } from 'lucide-react';

/** Transform slider cases — project photography paired with finish chemistry */
const REVEAL_CASES = [
  {
    id: 'fitzroy-terrace',
    tab: 'Fitzroy',
    finishId: 'limewash',
    beforeLabel: 'Trade acrylic · before',
    beforeNote: 'Flat latex film. No breath.'
  },
  {
    id: 'south-yarra-penthouse',
    tab: 'South Yarra',
    finishId: 'venetian-plaster',
    beforeLabel: 'Builder paint · before',
    beforeNote: 'Cold plastic sheen. No depth.'
  },
  {
    id: 'kew-edwardian',
    tab: 'Kew',
    finishId: 'roman-clay',
    beforeLabel: 'Clinical white · before',
    beforeNote: 'Hard acoustic plane. No warmth.'
  },
  {
    id: 'brighton-coastal',
    tab: 'Brighton',
    finishId: 'microcement',
    beforeLabel: 'Salt-worn coat · before',
    beforeNote: 'Failed film on wet substrate.'
  }
] as const;

interface HomepageExperienceProps {
  currentTime: TimeOfDay;
  onSelectFinish: (finish: FinishItem) => void;
  onNavigateExperience: (exp: PageExperience) => void;
  onOpenAtelier: () => void;
}

export default function HomepageExperience({
  currentTime,
  onSelectFinish,
  onNavigateExperience,
  onOpenAtelier
}: HomepageExperienceProps) {
  const reduceMotion = useReducedMotion();
  const [sliderPosition, setSliderPosition] = useState(52);
  const [selectedRevealId, setSelectedRevealId] = useState<string>(REVEAL_CASES[0].id);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const [loupeActive, setLoupeActive] = useState(false);
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50 });
  const [ambientAudio, setAmbientAudio] = useState(false);
  const [narrativeLayer, setNarrativeLayer] = useState<'surface' | 'lab'>('surface');
  const audioContextRef = useRef<AudioContext | null>(null);

  const revealCase = REVEAL_CASES.find((c) => c.id === selectedRevealId) || REVEAL_CASES[0];
  const activeProject = REAL_PROJECTS.find((p) => p.id === revealCase.id) || REAL_PROJECTS[0];
  const activeFinish =
    FINISHES_DATA.find((f) => f.id === revealCase.finishId) || FINISHES_DATA[0];
  const timeInfo = TIME_CONFIGS[currentTime];
  const heroImage = '/hero-painter-melbourne.jpg';

  const getLightingFilter = () => lightingFilterFor(currentTime);

  const toggleAmbientSound = () => {
    if (!ambientAudio) {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(146.83, ctx.currentTime);
        osc2.frequency.setValueAtTime(220.0, ctx.currentTime);
        gain.gain.setValueAtTime(0.015, ctx.currentTime);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start();
        osc2.start();
        setAmbientAudio(true);
      } catch {
        /* audio optional */
      }
    } else {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setAmbientAudio(false);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    setSliderPosition((x / rect.width) * 100);
    setLoupePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  return (
    <div
      className={`min-h-screen text-[#16191c] pb-28 mineral-grain ${
        narrativeLayer === 'lab' ? 'pm-lab-layer' : 'mineral-wash'
      }`}
    >
      <aside className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4">
        {[
          { id: 'hero', label: '01 Brand' },
          { id: 'reveal', label: '02 Reveal' },
          { id: 'finishes', label: '03 Finishes' },
          { id: 'proof', label: '04 Proof' },
          { id: 'suburbs', label: '05 Suburbs' },
          { id: 'atelier', label: '06 Atelier' }
        ].map((ch) => (
          <a key={ch.id} href={`#pm-${ch.id}`} className="group flex flex-col items-center gap-2">
            <span className="w-px h-6 bg-[#c9d4ce] group-hover:bg-[#4a6b5e] transition-colors" />
            <span className="font-mono-spec text-[9px] uppercase tracking-[0.2em] text-[#5a6660] group-hover:text-[#4a6b5e] pm-chapter-rail">
              {ch.label}
            </span>
          </a>
        ))}
      </aside>

      <div className="fixed left-4 sm:left-6 bottom-24 z-30 flex flex-col gap-1">
        <button
          type="button"
          onClick={() => setNarrativeLayer('surface')}
          className={`px-3 py-2 text-[10px] font-mono-spec uppercase tracking-[0.15em] transition-colors ${
            narrativeLayer === 'surface'
              ? 'bg-[#4a6b5e] text-[#f4f6f4]'
              : 'bg-[#ffffff]/85 text-[#4a6b5e] border border-[#c9d4ce] backdrop-blur-md'
          }`}
        >
          Surface
        </button>
        <button
          type="button"
          onClick={() => setNarrativeLayer('lab')}
          className={`px-3 py-2 text-[10px] font-mono-spec uppercase tracking-[0.15em] transition-colors ${
            narrativeLayer === 'lab'
              ? 'bg-[#4a6b5e] text-[#f4f6f4]'
              : 'bg-[#ffffff]/85 text-[#4a6b5e] border border-[#c9d4ce] backdrop-blur-md'
          }`}
        >
          Lab
        </button>
      </div>

      {/* Hero */}
      <section id="pm-hero" className="relative min-h-svh flex flex-col justify-end overflow-hidden">
        <ScrollTintFrame className="absolute inset-0 animate-pm-clip-up" intensity={0.18}>
          <img
            src={heroImage}
            alt="Chalk limewash walls catching Melbourne daylight in a Victorian terrace living room"
            className={`absolute inset-0 z-0 w-full h-full object-cover object-center ${
              reduceMotion ? '' : 'animate-pm-pan'
            }`}
            style={{ filter: getLightingFilter() }}
          />
          <div
            className="absolute inset-0 z-0 animate-pm-shimmer transition-[background] duration-700"
            style={{
              background: lightingWashFor(currentTime),
              mixBlendMode: 'soft-light'
            }}
          />
          <div className="absolute inset-0 z-0 bg-linear-to-t from-[#eef1f3]/90 via-[#eef1f3]/45 to-transparent" />
          <div className="absolute inset-0 z-0 mineral-grain opacity-30 pointer-events-none" />
        </ScrollTintFrame>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 pt-10 sm:pt-12 text-center flex flex-col items-center">
          <p className="pm-hero-kicker mb-5 animate-pm-rise">This is how colour works</p>

          <p className="pm-hero-brand">
            <span className="pm-word-mask mr-[0.18em]">
              <span className="pm-brand-painter" style={{ animationDelay: '0.15s' }}>
                PAINTER
              </span>
            </span>
            <span className="pm-word-mask">
              <span className="pm-brand-melbourne" style={{ animationDelay: '0.28s' }}>
                MELBOURNE
              </span>
            </span>
          </p>

          <h1 className="pm-hero-lede mt-6 sm:mt-8">
            <span className="pm-word-mask mr-[0.28em]">
              <span style={{ animationDelay: '0.45s' }}>Where</span>
            </span>
            <span className="pm-word-mask mr-[0.28em]">
              <span style={{ animationDelay: '0.5s' }}>
                <em>daylight</em>
              </span>
            </span>
            <span className="pm-word-mask mr-[0.28em]">
              <span style={{ animationDelay: '0.55s' }}>meets</span>
            </span>
            <span className="pm-word-mask mr-[0.28em]">
              <span style={{ animationDelay: '0.6s' }}>
                <em>mineral</em>
              </span>
            </span>
            <span className="pm-word-mask">
              <span className="pm-lede-end" style={{ animationDelay: '0.65s' }}>
                permanence.
              </span>
            </span>
          </h1>

          <div className="pm-hero-rule animate-pm-rise-delay-2">
            <span>
              Mineral
              <i className="pm-rule-dot" aria-hidden />
              Melbourne
            </span>
          </div>

          <p className="pm-hero-body mt-5 animate-pm-rise-delay-3">
            <strong>Breathable limewash</strong> and{' '}
            <span className="pm-body-em">burnished plaster</span> for Melbourne’s light—crafted walls
            that feel alive, not coated.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-pm-rise-delay-3">
            <button
              type="button"
              onClick={onOpenAtelier}
              className="pm-cta px-7 py-3.5 bg-[#1a1f1c] text-sm font-semibold tracking-wide text-[#f4f6f4] shadow-[0_12px_40px_rgba(22,25,28,0.22)] flex items-center gap-2"
            >
              Request a swatch box
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigateExperience('finishes')}
              className="px-7 py-3.5 border border-[#16191c]/40 text-sm font-medium tracking-wide text-[#16191c] hover:bg-[#16191c]/06 transition-colors"
            >
              Explore finishes
            </button>
            <button
              type="button"
              onClick={toggleAmbientSound}
              className="px-3 py-3 border border-[#16191c]/30 text-[10px] font-mono-spec uppercase tracking-wider text-[#2a3530] hover:text-[#16191c] hover:border-[#16191c] transition-colors flex items-center gap-2"
              title="Toggle atelier ambient tone"
              aria-label="Toggle ambient sound"
            >
              {ambientAudio ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{ambientAudio ? 'Sound On' : 'Sound'}</span>
            </button>
          </div>

          <p className="mt-14 font-mono-spec text-[10px] uppercase tracking-[0.25em] text-[#3a4f47] animate-pm-float">
            Scroll — enter the transformation
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#8fb8a8]/50 to-transparent" />
      </section>

      {/* Transform */}
      <section id="pm-reveal" className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18, clipPath: 'inset(0 18% 0 0)' }}
            whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 max-w-none"
          >
            <ProofBadge kind="directional-narrative" className="mb-4" />
            <p className="font-mono-spec text-[11px] uppercase tracking-[0.2em] text-[#8fb8a8]">
              {narrativeLayer === 'lab' ? 'Atelier lab · project daylight' : 'Live project reveal'}
            </p>
            <h2 className="mt-3 font-editorial text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-[#16191c] leading-none whitespace-nowrap overflow-x-auto">
              {narrativeLayer === 'lab'
                ? 'Behind the wall: light, chemistry, and the rake of Melbourne sun.'
                : 'Drag the wall. Watch trade paint give way to mineral craft.'}
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#5a6660] font-light max-w-2xl">
              Same room photograph · {activeProject.title} · {activeProject.suburb}. Drag to compare
              trade-paint simulation vs mineral craft.
            </p>
          </motion.div>

          <div className="relative overflow-hidden border border-[#c9d4ce] bg-[#ffffff] animate-pm-clip-left">
            <div className="px-4 sm:px-6 py-3 border-b border-[#c9d4ce] flex flex-wrap items-center justify-between gap-3 bg-[#eef3f0]/95">
              <div className="flex items-center gap-2 overflow-x-auto">
                {REVEAL_CASES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedRevealId(c.id)}
                    className={`text-xs px-3.5 py-1.5 whitespace-nowrap transition-all ${
                      selectedRevealId === c.id
                        ? 'bg-[#4a6b5e] text-[#f4f6f4] font-semibold'
                        : 'text-[#5a6660] hover:text-[#16191c]'
                    }`}
                  >
                    {c.tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs font-mono-spec text-[#8fb8a8]">
                <Sun className="w-3.5 h-3.5" />
                <span>
                  {timeInfo.timeString} · {timeInfo.kelvin}
                </span>
              </div>
            </div>

            <ScrollTintFrame className="relative h-105 sm:h-140" intensity={0.28}>
              <div
                className="relative h-full select-none cursor-ew-resize overflow-hidden bg-[#100F0D]"
                onMouseMove={handleMouseMove}
                onTouchMove={(e) => {
                  if (e.touches[0]) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
                    setSliderPosition((x / rect.width) * 100);
                  }
                }}
                onMouseEnter={() => {
                  setIsHoveringHero(true);
                  setLoupeActive(true);
                }}
                onMouseLeave={() => {
                  setIsHoveringHero(false);
                  setLoupeActive(false);
                }}
              >
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    filter: `${getLightingFilter()} grayscale(0.55) saturate(0.45) brightness(0.92) contrast(0.9)`
                  }}
                >
                  <img
                    src={activeProject.afterImage}
                    alt={`${activeProject.title} — trade paint simulation`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#8a9a9e]/25 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />
                  <div className="absolute top-6 right-6 max-w-50 text-right">
                    <p className="font-editorial text-xl sm:text-2xl text-[#E8E2D8]">
                      {revealCase.beforeLabel}
                    </p>
                    <p className="text-xs text-[#9E9385] mt-1">{revealCase.beforeNote}</p>
                  </div>
                </div>

                <div
                  className="absolute inset-y-0 left-0 overflow-hidden border-r border-[#8fb8a8]"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div
                    className="absolute inset-0 w-[min(100vw,1280px)] h-full transition-all duration-500"
                    style={{ filter: getLightingFilter() }}
                  >
                    <img
                      src={activeProject.afterImage}
                      alt={`${activeProject.title} — mineral finish`}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none opacity-40"
                      style={{
                        background:
                          currentTime === 'golden'
                            ? 'linear-gradient(105deg, rgba(235,160,80,0.3) 0%, transparent 65%)'
                            : currentTime === 'morning'
                            ? 'linear-gradient(45deg, rgba(255,255,255,0.28) 0%, transparent 70%)'
                            : currentTime === 'evening'
                            ? 'linear-gradient(180deg, transparent 20%, rgba(20,15,10,0.65) 100%)'
                            : 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 80%)'
                      }}
                    />
                    <div className="absolute top-6 left-6 max-w-sm">
                      <p className="font-mono-spec text-[10px] uppercase tracking-[0.2em] text-[#8fb8a8] mb-1">
                        {activeProject.suburb} · {activeProject.completionYear}
                      </p>
                      <p className="font-editorial text-2xl sm:text-3xl text-[#F4EFEA] leading-tight">
                        {activeProject.title}
                      </p>
                      <p className="text-xs sm:text-sm text-[#D8CFC2] mt-1.5 max-w-xs">
                        {activeFinish.name} — {activeFinish.tagline}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute top-0 bottom-0 w-px bg-[#8fb8a8] shadow-[0_0_18px_rgba(143,184,168,0.65)] z-30 pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#16191c] border border-[#8fb8a8] flex items-center justify-center text-[#8fb8a8] text-[10px] font-mono-spec">
                    ◄►
                  </div>
                </div>

                {loupeActive && sliderPosition > 15 && sliderPosition < 85 && (
                  <div
                    className="absolute pointer-events-none z-40 hidden md:block rounded-full border border-[#8fb8a8] overflow-hidden w-28 h-28 shadow-2xl"
                    style={{
                      left: `${sliderPosition}%`,
                      top: `${loupePos.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <img
                      src={activeProject.afterImage}
                      alt=""
                      className="w-full h-full object-cover scale-150 contrast-125"
                    />
                  </div>
                )}

                {!isHoveringHero && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#16191c]/80 backdrop-blur-sm border border-[#c9d4ce] px-4 py-2 text-xs text-[#8fb8a8] pointer-events-none flex items-center gap-2">
                    <Sliders className="w-3.5 h-3.5" />
                    Drag to reveal the project transformation
                  </div>
                )}
              </div>
            </ScrollTintFrame>

            <div className="px-6 py-4 border-t border-[#c9d4ce] flex flex-wrap items-center justify-between gap-4 bg-[#ffffff]">
              <p className="text-xs text-[#5a6660] max-w-xl">
                <span className="text-[#8fb8a8] font-mono-spec uppercase tracking-wider mr-2">
                  Daylight
                </span>
                {activeFinish.lightResponse[currentTime]}
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigateExperience('case-study')}
                  className="text-xs font-medium text-[#16191c] border border-[#c9d4ce] px-4 py-2.5 hover:border-[#8fb8a8]/50 transition-colors"
                >
                  View case study
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectFinish(activeFinish);
                    onNavigateExperience('finishes');
                  }}
                  className="text-xs font-medium text-[#16191c] border border-[#c9d4ce] px-4 py-2.5 hover:border-[#8fb8a8]/50 transition-colors"
                >
                  Finish chemistry
                </button>
                <button
                  type="button"
                  onClick={onOpenAtelier}
                  className="pm-cta px-5 py-2.5 bg-linear-to-r from-[#8fb8a8] to-[#6a9484] text-xs font-semibold text-[#16191c] flex items-center gap-1.5"
                >
                  Physical swatch box
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialist finishes mosaic */}
      <section id="pm-finishes" className="pm-section-light py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <p className="font-mono-spec text-[11px] uppercase tracking-[0.2em] text-[#4a6b5e]">
                Material library
              </p>
              <h2 className="mt-3 font-editorial text-3xl sm:text-5xl font-light text-[#16191c]">
                Specialist finishes
              </h2>
              <p className="mt-3 text-sm text-[#4a5f56] font-light leading-relaxed">
                Hand-applied mineral surfaces—no roller stipple—tuned to Melbourne’s four seasons of
                light.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateExperience('finishes')}
              className="text-sm text-[#4a6b5e] hover:text-[#2d453c] flex items-center gap-2 transition-colors group"
            >
              View material lab
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-3 sm:gap-4 auto-rows-auto">
            {FINISHES_DATA.slice(0, 4).map((finish, i) => {
              const layout =
                i === 0
                  ? 'md:col-span-7 md:row-span-2 min-h-[18rem] md:min-h-[34rem]'
                  : i === 1
                  ? 'md:col-span-5 min-h-[16rem] md:min-h-0'
                  : i === 2
                  ? 'md:col-span-5 min-h-[16rem] md:min-h-0'
                  : 'md:col-span-12 min-h-[14rem] md:min-h-[18rem]';

              return (
                <motion.button
                  key={finish.id}
                  type="button"
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => {
                    onSelectFinish(finish);
                    onNavigateExperience('finishes');
                  }}
                  className={`group relative overflow-hidden text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#4a6b5e] ${layout}`}
                >
                  <img
                    src={finish.roomImage}
                    alt={finish.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105 ${
                      i === 0
                        ? 'object-[center_40%]'
                        : i === 3
                        ? 'object-center'
                        : 'object-[center_30%]'
                    }`}
                  />
                  <motion.div
                    aria-hidden
                    className="absolute inset-0 z-1 pointer-events-none"
                    style={{
                      background:
                        i % 2 === 0
                          ? 'linear-gradient(135deg, #8fb8a8 0%, #4a6b5e 55%, #2d453c 100%)'
                          : 'linear-gradient(225deg, #2d453c 0%, #4a6b5e 50%, #8fb8a8 100%)'
                    }}
                    initial={
                      reduceMotion
                        ? { clipPath: 'inset(0 0 0 100%)' }
                        : { clipPath: 'inset(0 0% 0 0)' }
                    }
                    whileInView={{ clipPath: 'inset(0 0% 0 100%)' }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{
                      duration: 1.25,
                      delay: 0.08 + i * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  />
                  <div className="absolute inset-0 z-2 bg-linear-to-t from-[#12110f]/75 via-[#12110f]/15 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 z-2 ring-1 ring-inset ring-[#12110f]/10 pointer-events-none" />
                  <div
                    className={`absolute inset-x-0 bottom-0 z-3 p-5 sm:p-6 flex flex-col justify-end ${
                      i === 0 ? 'sm:p-8 min-h-[40%]' : ''
                    }`}
                  >
                    <p className="font-mono-spec text-[10px] uppercase tracking-[0.22em] text-[#8fb8a8]">
                      0{i + 1} · {finish.category}
                    </p>
                    <h3
                      className={`mt-2 font-editorial font-light text-[#f4f2ee] leading-tight group-hover:text-[#c5d8ce] transition-colors ${
                        i === 0
                          ? 'text-3xl sm:text-4xl lg:text-5xl max-w-md'
                          : i === 3
                          ? 'text-2xl sm:text-3xl'
                          : 'text-xl sm:text-2xl'
                      }`}
                    >
                      {finish.name}
                    </h3>
                    <p
                      className={`mt-2 text-[#d5ddd8] font-light leading-relaxed ${
                        i === 0 ? 'text-sm max-w-sm' : 'text-xs line-clamp-2 max-w-xs'
                      }`}
                    >
                      {finish.tagline}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 font-mono-spec text-[10px] uppercase tracking-[0.2em] text-[#eef1f3] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      Explore finish
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section id="pm-proof" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <motion.div
              className="lg:col-span-5 space-y-6"
              initial={reduceMotion ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-mono-spec text-[11px] uppercase tracking-[0.2em] text-[#8fb8a8]">
                Verified case · Gore Street, Fitzroy
              </p>
              <h2 className="font-editorial text-3xl sm:text-5xl text-[#16191c] leading-tight font-light">
                {REAL_PROJECTS[0].title}
              </h2>
              <p className="text-sm text-[#5a6660] leading-relaxed font-light">
                {REAL_PROJECTS[0].transformationStory}
              </p>
              <blockquote className="border-l border-[#8fb8a8] pl-5 text-base italic text-[#2a3530] font-editorial leading-relaxed">
                “{REAL_PROJECTS[0].homeownerQuote.quote}”
                <span className="block not-italic font-mono-spec text-xs text-[#6a7a74] mt-3">
                  — {REAL_PROJECTS[0].homeownerQuote.author}
                </span>
              </blockquote>
              <button
                type="button"
                onClick={() => onNavigateExperience('case-study')}
                className="pm-cta inline-flex items-center gap-2 px-6 py-3 bg-[#8fb8a8] text-xs font-semibold text-[#16191c]"
              >
                View case study
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            <motion.div
              className="lg:col-span-7 relative aspect-4/3"
              initial={reduceMotion ? false : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <ScrollTintFrame className="absolute inset-0" intensity={0.35}>
                <img
                  src={REAL_PROJECTS[0].afterImage}
                  alt="Fitzroy terrace living room with artisan limewash"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-[#c9d4ce]/80 pointer-events-none" />
              </ScrollTintFrame>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Suburbs */}
      <section id="pm-suburbs" className="pm-section-light-soft py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="font-mono-spec text-[11px] uppercase tracking-[0.2em] text-[#4a6b5e]">
              Melbourne micro-climates
            </p>
            <h2 className="mt-3 font-editorial text-3xl sm:text-4xl text-[#16191c] font-light">
              Formulated for your suburb’s fabric
            </h2>
            <p className="mt-3 text-sm text-[#3D5C56] font-light">
              From Bayside salt spray to Fitzroy double-brick party walls.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {[
              { suburb: 'Fitzroy & Carlton', type: 'Victorian terraces', tag: 'Vapor-breathable lime' },
              { suburb: 'Brighton & Bayside', type: 'Coastal weatherboards', tag: 'Marine salt-shield' },
              {
                suburb: 'Toorak & South Yarra',
                type: 'Mansions & penthouses',
                tag: 'Burnished marmorino'
              },
              { suburb: 'Kew & Hawthorn', type: 'Californian bungalows', tag: 'Roman clay & spray' }
            ].map((item, i) => (
              <motion.button
                key={item.suburb}
                type="button"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduceMotion ? undefined : { x: 6 }}
                onClick={() => onNavigateExperience('suburbs')}
                className="text-left group border-t border-[#a8c0b6] pt-5 hover:border-[#4a6b5e] transition-colors"
              >
                <p className="font-mono-spec text-[10px] uppercase tracking-wider text-[#4a6b5e]">
                  {item.tag}
                </p>
                <h3 className="font-editorial text-2xl text-[#16191c] mt-2 group-hover:text-[#4a6b5e] transition-colors">
                  {item.suburb}
                </h3>
                <p className="text-xs text-[#5a7268] mt-1">{item.type}</p>
                <span className="mt-3 block h-px w-0 bg-[#4a6b5e] transition-all duration-500 group-hover:w-12" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section id="pm-atelier" className="relative py-24 sm:py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(143,184,168,0.18), transparent 70%)'
          }}
        />
        <motion.div
          className="relative max-w-6xl mx-auto px-4 text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono-spec text-[11px] uppercase tracking-[0.2em] text-[#8fb8a8]">
            Begin with tactile reality
          </p>
          <h2 className="mt-4 font-editorial text-2xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#16191c] leading-none font-light whitespace-nowrap overflow-x-auto">
            See your walls in your own daylight.
          </h2>
          <div className="mx-auto mt-5 h-px w-16 bg-[#8fb8a8]/70" />
          <p className="mt-5 text-sm sm:text-base text-[#5a6660] max-w-xl mx-auto font-light leading-relaxed">
            Physical mineral boards delivered to your Melbourne address—then an on-site light and
            substrate consultation.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenAtelier}
              className="pm-cta px-8 py-4 bg-linear-to-r from-[#8fb8a8] to-[#6a9484] text-sm font-semibold text-[#16191c] flex items-center gap-2 shadow-[0_16px_50px_rgba(143,184,168,0.22)]"
            >
              Enter the Material Atelier
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigateExperience('guidance')}
              className="px-8 py-4 text-sm font-medium text-[#5a6660] border border-[#c9d4ce] hover:border-[#8fb8a8]/50 transition-colors"
            >
              Test the daylight lab
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
