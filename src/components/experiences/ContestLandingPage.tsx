import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { PageExperience, TimeOfDay, FinishItem } from '../../types';
import { TIME_CONFIGS, lightingAccentFor, lightingFilterFor, lightingWashFor } from '../../data/timeConfigs';
import { FINISHES_DATA } from '../../data/finishesData';
import { REAL_PROJECTS } from '../../data/projectsData';
import { SUBURBS_DATA } from '../../data/suburbsData';
import { CONTEST_SUBMISSION_DATA } from '../../data/contestSubmissionData';
import ProofBadge from '../ProofBadge';
import DestinationWorld from '../DestinationWorld';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ContestLandingPageProps {
  currentTime: TimeOfDay;
  onTimeChange: (t: TimeOfDay) => void;
  onSelectFinish: (finish: FinishItem) => void;
  onNavigateExperience: (exp: PageExperience) => void;
  onOpenAtelier: () => void;
  onOpenContest: () => void;
}

const JOURNEY: {
  act: string;
  title: string;
  blurb: string;
  experience: PageExperience;
  image: string;
  caption: string;
}[] = [
  {
    act: '01',
    title: 'Brand world',
    blurb: 'Light, surface, and Melbourne atmosphere before any sales pitch.',
    experience: 'homepage',
    image: '/hero-painter-melbourne.jpg',
    caption: 'Arrival · chalk plane under southern light'
  },
  {
    act: '02',
    title: 'Finish exploration',
    blurb: 'Venetian, limewash, Tadelakt, clay, microcement — as behaviour under daylight.',
    experience: 'finishes',
    image: '/hero-melbourne-inner-north.jpg',
    caption: 'Finish lab · limewash as daylight behaviour'
  },
  {
    act: '03',
    title: 'Project proof',
    blurb: 'Gore Street as a real case — then directional narratives with honest labels.',
    experience: 'case-study',
    image: '/before-gore-street.jpg',
    caption: 'Gore Street · verified-pattern commission'
  },
  {
    act: '04',
    title: 'Suburb fabric',
    blurb: 'Fitzroy brick, Bayside salt, Toorak prestige — finish by micro-climate.',
    experience: 'suburbs',
    image: '/hero-melbourne-bayside.jpg',
    caption: 'Suburb fabric · salt, brick, canopy'
  },
  {
    act: '05',
    title: 'Decision guidance',
    blurb: 'Orientation, mineral vs acrylic, sheen — education that dissolves colour regret.',
    experience: 'guidance',
    image: '/hero-melbourne-mineral.jpg',
    caption: 'Guidance · mineral grain at arm’s length'
  },
  {
    act: '06',
    title: 'Material atelier',
    blurb: 'Not “get 3 quotes.” Swatch board + substrate consult as a crafted close.',
    experience: 'quote-flow',
    image: '/hero-melbourne-clay.jpg',
    caption: 'Atelier · boards on the wall before the brief'
  }
];

const portivaEase = [0.16, 1, 0.3, 1] as const;
const journeyEase = [0.22, 1, 0.36, 1] as const;
const roomEase = [0.25, 0.1, 0.25, 1] as const;
const JOURNEY_HOLD_MS = 6800;
const ROOM_TRANSITION_MS = 1100;

const roomCopyVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    y: 20,
    x: dir * 12
  }),
  center: {
    opacity: 1,
    y: 0,
    x: 0
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: -12,
    x: dir * -8
  })
};

function useSectionMotion(
  reduceMotion: boolean | null,
  offset: [string, string] = ['start end', 'start 35%']
) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ['start end', 'start 35%']
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 420 : 64,
    damping: reduceMotion ? 44 : 30,
    mass: 0.95,
    restDelta: 0.001
  });
  const y = useTransform(
    progress,
    [0, 1],
    reduceMotion ? [0, 0] : [32, 0]
  );
  const opacity = useTransform(
    progress,
    [0, 0.55, 1],
    reduceMotion ? [1, 1, 1] : [0.55, 1, 1]
  );
  return { ref, y, opacity, progress };
}

/** Portiva-style section shell: content settles as the band enters view. */
function SectionBand({
  children,
  className = '',
  reduceMotion,
  id
}: {
  children: ReactNode;
  className?: string;
  reduceMotion: boolean | null;
  id?: string;
}) {
  const { ref, y, opacity } = useSectionMotion(reduceMotion);
  return (
    <section ref={ref} id={id} className={className}>
      <motion.div style={{ y, opacity }} className="will-change-transform">
        {children}
      </motion.div>
    </section>
  );
}

function RevealLine({
  children,
  className = '',
  delay = 0,
  reduceMotion
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  reduceMotion: boolean | null;
}) {
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className}`}>
      <motion.span
        className="inline-block"
        initial={reduceMotion ? false : { y: '110%', opacity: 0.2 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true, margin: '-10% 0px', amount: 0.6 }}
        transition={{ duration: reduceMotion ? 0 : 1.05, delay: reduceMotion ? 0 : delay, ease: portivaEase }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function RevealMedia({
  children,
  className = '',
  delay = 0,
  reduceMotion
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 36, clipPath: 'inset(12% 0 12% 0)' }}
      whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0% 0)' }}
      viewport={{ once: true, margin: '-8% 0px', amount: 0.35 }}
      transition={{ duration: reduceMotion ? 0 : 1.15, delay: reduceMotion ? 0 : delay, ease: portivaEase }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduceMotion ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-8% 0px', amount: 0.35 }}
        transition={{ duration: reduceMotion ? 0 : 1.45, delay: reduceMotion ? 0 : delay, ease: portivaEase }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function staggerProps(
  index: number,
  reduceMotion: boolean | null,
  x = 0
) {
  if (reduceMotion) return {};
  return {
    initial: { opacity: 0, y: 28, x },
    whileInView: { opacity: 1, y: 0, x: 0 },
    viewport: { once: true, margin: '-6% 0px', amount: 0.35 },
    transition: {
      duration: 0.85,
      delay: 0.06 + index * 0.07,
      ease: portivaEase
    }
  };
}

export default function ContestLandingPage({
  currentTime,
  onTimeChange,
  onSelectFinish,
  onNavigateExperience,
  onOpenAtelier,
  onOpenContest
}: ContestLandingPageProps) {
  const reduceMotion = useReducedMotion();
  const [wipe, setWipe] = useState(48);
  const [dragging, setDragging] = useState(false);
  const [journeyIndex, setJourneyIndex] = useState(0);
  const [journeyDir, setJourneyDir] = useState(1);
  const [journeyPaused, setJourneyPaused] = useState(false);
  const [roomBusy, setRoomBusy] = useState(false);
  const journeyRef = useRef<HTMLElement>(null);
  const roomBusyTimer = useRef<number | null>(null);
  const featured = FINISHES_DATA[0];
  const project =
    REAL_PROJECTS.find((p) => p.proofStatus === 'verified-commission') || REAL_PROJECTS[0];
  const timeInfo = TIME_CONFIGS[currentTime];
  const activeJourney = JOURNEY[journeyIndex] || JOURNEY[0];

  const enterRoom = (next: number) => {
    if (next === journeyIndex || roomBusy) return;
    const len = JOURNEY.length;
    let dir = next > journeyIndex ? 1 : -1;
    if (journeyIndex === len - 1 && next === 0) dir = 1;
    if (journeyIndex === 0 && next === len - 1) dir = -1;
    setJourneyDir(dir);
    setJourneyIndex(next);
    if (!reduceMotion) {
      setRoomBusy(true);
      if (roomBusyTimer.current) window.clearTimeout(roomBusyTimer.current);
      roomBusyTimer.current = window.setTimeout(() => {
        setRoomBusy(false);
        roomBusyTimer.current = null;
      }, ROOM_TRANSITION_MS);
    }
  };

  useEffect(() => {
    return () => {
      if (roomBusyTimer.current) window.clearTimeout(roomBusyTimer.current);
    };
  }, []);

  const { scrollYProgress: journeyProgress } = useScroll({
    target: journeyRef,
    offset: ['start end', 'end start']
  });
  const journeySmooth = useSpring(journeyProgress, {
    stiffness: reduceMotion ? 420 : 48,
    damping: reduceMotion ? 42 : 34,
    mass: 1.1,
    restDelta: 0.001
  });
  const journeyFrameY = useTransform(
    journeySmooth,
    [0, 1],
    reduceMotion ? ['0%', '0%'] : ['-2.5%', '3.5%']
  );
  const journeyHeadY = useTransform(
    journeySmooth,
    [0, 0.4],
    reduceMotion ? [0, 0] : [20, 0]
  );
  const journeyHeadOpacity = useTransform(
    journeySmooth,
    [0.05, 0.32],
    reduceMotion ? [1, 1] : [0.45, 1]
  );

  useEffect(() => {
    if (reduceMotion || journeyPaused) return;
    const id = window.setInterval(() => {
      setJourneyIndex((i) => {
        const next = (i + 1) % JOURNEY.length;
        setJourneyDir(1);
        if (!reduceMotion) {
          setRoomBusy(true);
          if (roomBusyTimer.current) window.clearTimeout(roomBusyTimer.current);
          roomBusyTimer.current = window.setTimeout(() => {
            setRoomBusy(false);
            roomBusyTimer.current = null;
          }, ROOM_TRANSITION_MS);
        }
        return next;
      });
    }, JOURNEY_HOLD_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, journeyPaused]);

  const lightingFilter = useMemo(() => lightingFilterFor(currentTime), [currentTime]);
  const lightingWash = useMemo(() => lightingWashFor(currentTime), [currentTime]);
  const lightingAccent = useMemo(() => lightingAccentFor(currentTime), [currentTime]);

  const tokens = CONTEST_SUBMISSION_DATA['design-system'].content.designSystemTokens;
  const psychology = CONTEST_SUBMISSION_DATA['homeowner-psychology']?.content.psychologyBreakdown;
  const pastWork = CONTEST_SUBMISSION_DATA['past-work']?.content.pastWorkProjects;

  const onWipePointer = (clientX: number, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    setWipe(Math.max(6, Math.min(94, ((clientX - r.left) / r.width) * 100)));
  };

  const rise = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 40 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-12% 0px', amount: 0.28 },
          transition: { duration: 1.05, delay, ease: portivaEase }
        };

  const riseSoft = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-10% 0px', amount: 0.35 },
          transition: { duration: 0.9, delay, ease: portivaEase }
        };

  return (
    <div className="bg-[#f2f5f3] text-[#16191c] mineral-wash">
      <DestinationWorld
        onNavigateExperience={onNavigateExperience}
        onOpenAtelier={onOpenAtelier}
        currentTime={currentTime}
      />

      {/* Daylight rail — drives hero, rooms, and wipe */}
      <div className="border-b border-[#c9d4ce] bg-[#16191c] px-5 py-4 sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(TIME_CONFIGS) as TimeOfDay[]).map((t) => {
              const on = currentTime === t;
              const Icon = TIME_CONFIGS[t].icon;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => onTimeChange(t)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 font-mono-spec text-[0.62rem] uppercase tracking-[0.16em] transition-all duration-300 ${
                    on
                      ? 'bg-[#eef1f3] text-[#16191c]'
                      : 'text-[#9aa3ab] hover:text-[#eef1f3]'
                  }`}
                  title={TIME_CONFIGS[t].description}
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full transition-colors duration-300"
                    style={{ background: lightingAccentFor(t), boxShadow: on ? `0 0 10px ${lightingAccentFor(t)}` : undefined }}
                  />
                  <Icon className="h-3.5 w-3.5" />
                  {TIME_CONFIGS[t].label}
                </button>
              );
            })}
          </div>
          <p className="font-mono-spec text-[0.62rem] uppercase tracking-[0.18em] text-[#9aa3ab]">
            <span className="text-[#8fb8a8]">{timeInfo.label}</span>
            {' · '}
            {timeInfo.timeString}
            {' · '}
            {timeInfo.kelvin}
          </p>
        </div>
        <div
          className="mx-auto mt-3 h-1 max-w-7xl transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, ${lightingAccent}, transparent 70%)`
          }}
        />
      </div>

      {/* Proof strip */}
      <div className="border-y border-[#c9d4ce] bg-[#16191c] px-5 py-3.5 sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <p className="max-w-4xl text-[0.8rem] leading-relaxed text-[#9aa3ab] sm:whitespace-nowrap">
            <span className="text-[#8fb8a8]">Real vs conceptual — </span>
            Gore Street: site photography · verified pattern; others stay directional until client credit.
          </p>
          <div className="flex flex-wrap gap-2">
            <ProofBadge kind="verified-commission" compact />
            <ProofBadge kind="directional-narrative" compact />
          </div>
        </div>
      </div>

      {/* Design language */}
      <SectionBand
        reduceMotion={reduceMotion}
        className="relative overflow-hidden px-5 py-24 sm:px-10 lg:px-16"
      >
        <div className="mineral-grain pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div {...rise()}>
            <p className="font-mono-spec text-[0.68rem] uppercase tracking-[0.22em] text-[#4a6b5e]">
              Design language
            </p>
            <h2 className="mt-4 font-editorial text-[clamp(1.65rem,3.6vw,2.85rem)] font-light leading-[1.15] text-[#16191c]">
              <RevealLine reduceMotion={reduceMotion}>One mineral system —</RevealLine>{' '}
              <RevealLine reduceMotion={reduceMotion} delay={0.08}>
                type, chalk, steel.
              </RevealLine>
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            <motion.div className="lg:col-span-5" {...rise(0.1)}>
              <div className="flex h-full flex-col justify-between gap-8 border-t border-[#a8c0b6] pt-6">
                <div>
                  <p className="font-editorial text-5xl font-light leading-none text-[#16191c] sm:text-6xl">
                    Aa
                  </p>
                  <p className="mt-3 font-editorial text-2xl font-light text-[#4a6b5e]">
                    Cormorant Garamond
                  </p>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#5a6660]">
                    Display for craft and atmosphere. Jakarta for decisions. Space Mono for specs and
                    Melbourne hour codes.
                  </p>
                </div>
                <p className="font-mono-spec text-[0.7rem] uppercase tracking-[0.14em] text-[#6a7a74]">
                  Plus Jakarta · Space Mono
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-px bg-[#c9d4ce] sm:grid-cols-3 lg:col-span-7">
              {tokens?.colors.map((c, i) => (
                <motion.div key={c.hex} className="bg-[#f2f5f3] p-4 sm:p-5" {...staggerProps(i, reduceMotion)}>
                  <motion.div
                    className="mb-4 aspect-5/3 w-full origin-center"
                    style={{ background: c.hex }}
                    initial={reduceMotion ? false : { scale: 1.08, opacity: 0.5 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.08 + i * 0.05, ease: portivaEase }}
                  />
                  <p className="font-mono-spec text-[0.62rem] tracking-wider text-[#4a6b5e]">
                    {c.hex}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#16191c]">{c.name}</p>
                  <p className="mt-1 text-[0.75rem] leading-snug text-[#6a7a74]">{c.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </SectionBand>

      {/* Six experiences — enter each room */}
      <section
        ref={journeyRef}
        className="relative overflow-hidden border-t border-[#c9d4ce] bg-[#0e1012] px-5 py-24 text-[#eef1f3] sm:px-10 sm:py-28 lg:px-16"
        onMouseEnter={() => setJourneyPaused(true)}
        onMouseLeave={() => setJourneyPaused(false)}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#8fb8a8]/45 to-transparent" />
        <div className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-[#8fb8a8]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            style={{ y: journeyHeadY, opacity: journeyHeadOpacity }}
            className="mb-10 flex flex-wrap items-end justify-between gap-6 will-change-transform"
          >
            <div>
              <p className="font-mono-spec text-[0.68rem] uppercase tracking-[0.28em] text-[#8fb8a8]">
                Six core experiences
              </p>
              <h2 className="mt-3 font-editorial text-[clamp(1.85rem,4vw,3.1rem)] font-light leading-[1.05]">
                Step through each room
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#9aa3ab]">
              Image and copy move as one — like crossing a threshold into the next Melbourne field.
            </p>
          </motion.div>

          {/* Room portal */}
          <div className="relative overflow-hidden border border-[#2c3538]/80 bg-[#16191c]">
            {/* Door jambs */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-3 bg-linear-to-r from-[#0e1012] to-transparent sm:w-5" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-3 bg-linear-to-l from-[#0e1012] to-transparent sm:w-5" />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-4 bg-linear-to-b from-[#0e1012]/90 to-transparent" />

            <div className="relative aspect-4/5 sm:aspect-16/10 lg:aspect-21/9 lg:min-h-144">
              {/* Stacked rooms — crossfade without remount pop */}
              <div className="absolute inset-0">
                {JOURNEY.map((item, i) => {
                  const on = i === journeyIndex;
                  const behind =
                    journeyDir >= 0
                      ? i < journeyIndex || (journeyIndex === 0 && i === JOURNEY.length - 1)
                      : i > journeyIndex || (journeyIndex === JOURNEY.length - 1 && i === 0);
                  return (
                    <motion.div
                      key={item.act}
                      className="absolute inset-0"
                      initial={false}
                      animate={{
                        opacity: on ? 1 : 0,
                        scale: on ? 1 : 1.045,
                        x: on ? 0 : behind ? -18 * journeyDir : 18 * journeyDir,
                        zIndex: on ? 2 : 1
                      }}
                      transition={{
                        opacity: {
                          duration: reduceMotion ? 0 : 1.15,
                          ease: roomEase
                        },
                        scale: {
                          duration: reduceMotion ? 0 : 1.35,
                          ease: journeyEase
                        },
                        x: {
                          duration: reduceMotion ? 0 : 1.2,
                          ease: journeyEase
                        }
                      }}
                      aria-hidden={!on}
                    >
                      <motion.img
                        src={item.image}
                        alt=""
                        style={{
                          y: journeyFrameY,
                          filter: lightingFilter,
                          transition: 'filter 0.7s ease'
                        }}
                        className="absolute inset-0 h-[120%] w-full object-cover will-change-transform"
                        initial={false}
                        animate={{
                          scale: on && !reduceMotion ? 1.06 : 1.03
                        }}
                        transition={{
                          duration: on ? JOURNEY_HOLD_MS / 1000 : 1.2,
                          ease: 'easeInOut'
                        }}
                        decoding="async"
                      />
                    </motion.div>
                  );
                })}
              </div>

              <div
                className="pointer-events-none absolute inset-0 z-3 mix-blend-soft-light transition-[background] duration-700"
                style={{ background: lightingWash }}
              />
              <div className="pointer-events-none absolute inset-0 z-3 bg-[linear-gradient(180deg,rgba(14,16,18,0.15)_0%,transparent_28%,rgba(14,16,18,0.55)_62%,rgba(14,16,18,0.94)_100%)]" />
              <div className="pointer-events-none absolute inset-0 z-3 bg-[linear-gradient(90deg,rgba(14,16,18,0.55)_0%,transparent_45%)]" />

              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-4 bg-[#0e1012]"
                initial={false}
                animate={{ opacity: roomBusy ? 0.2 : 0 }}
                transition={{ duration: 0.55, ease: roomEase }}
              />

              <AnimatePresence mode="wait" custom={journeyDir} initial={false}>
                <motion.div
                  key={activeJourney.act}
                  custom={journeyDir}
                  variants={reduceMotion ? undefined : roomCopyVariants}
                  initial={reduceMotion ? false : 'enter'}
                  animate="center"
                  exit={reduceMotion ? undefined : 'exit'}
                  transition={{
                    duration: reduceMotion ? 0 : 0.75,
                    ease: journeyEase
                  }}
                  className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-10 lg:max-w-2xl"
                >
                  <p className="font-mono-spec text-[0.62rem] uppercase tracking-[0.28em] text-[#8fb8a8]">
                    Room {activeJourney.act} · {activeJourney.caption}
                  </p>
                  <h3 className="mt-3 font-editorial text-[clamp(2rem,5vw,3.6rem)] font-light leading-[0.95] text-[#eef1f3]">
                    {activeJourney.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-[#b8c4be] sm:text-[0.95rem]">
                    {activeJourney.blurb}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      activeJourney.experience === 'homepage'
                        ? document
                            .getElementById('transform')
                            ?.scrollIntoView({ behavior: 'smooth' })
                        : onNavigateExperience(activeJourney.experience)
                    }
                    className="pm-cta mt-7 inline-flex items-center gap-2 bg-[#8fb8a8] px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#16191c]"
                  >
                    Enter this room
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={`wm-${activeJourney.act}`}
                  aria-hidden
                  className="pointer-events-none absolute right-5 top-5 z-10 font-editorial text-[clamp(4.5rem,14vw,9rem)] font-light leading-none text-[#eef1f3]/8 sm:right-8 sm:top-6"
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: reduceMotion ? 0 : 0.7, ease: journeyEase }}
                >
                  {activeJourney.act}
                </motion.span>
              </AnimatePresence>

              <div className="absolute top-5 left-5 z-30 flex items-center gap-2 sm:top-7 sm:left-7">
                <button
                  type="button"
                  aria-label="Previous room"
                  disabled={roomBusy}
                  onClick={() =>
                    enterRoom((journeyIndex - 1 + JOURNEY.length) % JOURNEY.length)
                  }
                  className="inline-flex h-10 w-10 items-center justify-center border border-[#eef1f3]/25 bg-[#0e1012]/45 text-[#eef1f3] backdrop-blur-sm transition-colors hover:border-[#8fb8a8] hover:text-[#8fb8a8] disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next room"
                  disabled={roomBusy}
                  onClick={() => enterRoom((journeyIndex + 1) % JOURNEY.length)}
                  className="inline-flex h-10 w-10 items-center justify-center border border-[#eef1f3]/25 bg-[#0e1012]/45 text-[#eef1f3] backdrop-blur-sm transition-colors hover:border-[#8fb8a8] hover:text-[#8fb8a8] disabled:opacity-40"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
                <motion.span
                  key={activeJourney.act}
                  initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: journeyEase }}
                  className="ml-2 font-mono-spec text-[0.62rem] tracking-[0.18em] text-[#9aa3ab]"
                >
                  {activeJourney.act} / 0{JOURNEY.length}
                </motion.span>
              </div>

              {!reduceMotion && !journeyPaused && (
                <motion.div
                  key={`timer-${journeyIndex}`}
                  className="absolute bottom-0 left-0 z-30 h-0.5 origin-left bg-[#8fb8a8]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: JOURNEY_HOLD_MS / 1000,
                    ease: 'linear'
                  }}
                  style={{ width: '100%' }}
                />
              )}
            </div>

            <div className="border-t border-[#2c3538] bg-[#121517] p-3 sm:p-4">
              <div className="flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-6 sm:gap-3 sm:overflow-visible sm:pb-0">
                {JOURNEY.map((item, i) => {
                  const on = i === journeyIndex;
                  return (
                    <button
                      key={item.act}
                      type="button"
                      disabled={roomBusy && !on}
                      onClick={() => enterRoom(i)}
                      className={`group relative min-w-28 shrink-0 overflow-hidden text-left transition-opacity duration-500 sm:min-w-0 ${
                        on ? 'ring-1 ring-[#8fb8a8]' : 'ring-1 ring-transparent'
                      } ${roomBusy && !on ? 'opacity-60' : ''}`}
                    >
                      <span className="relative block aspect-4/3 overflow-hidden">
                        <img
                          src={item.image}
                          alt=""
                          className={`h-full w-full object-cover transition-all duration-1000 ease-out ${
                            on
                              ? 'scale-105 opacity-100'
                              : 'scale-100 opacity-45 group-hover:opacity-75'
                          }`}
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="absolute inset-0 bg-linear-to-t from-[#0e1012]/90 via-[#0e1012]/25 to-transparent" />
                        <span
                          className={`absolute inset-x-0 bottom-0 p-2.5 transition-colors duration-500 ${
                            on ? 'text-[#eef1f3]' : 'text-[#9aa3ab]'
                          }`}
                        >
                          <span className="font-mono-spec text-[0.55rem] tracking-[0.16em] text-[#8fb8a8]">
                            {item.act}
                          </span>
                          <span className="mt-0.5 block truncate font-editorial text-sm font-light">
                            {item.title}
                          </span>
                        </span>
                        {on && (
                          <motion.span
                            layoutId="room-door-glow"
                            className="absolute inset-x-0 top-0 h-px bg-[#8fb8a8]"
                            transition={{ type: 'spring', stiffness: 140, damping: 26, mass: 0.8 }}
                          />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation */}
      <SectionBand
        id="transform"
        reduceMotion={reduceMotion}
        className="border-t border-[#c9d4ce] px-5 py-24 sm:px-10 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div {...rise()}>
            <p className="font-mono-spec text-[0.68rem] uppercase tracking-[0.22em] text-[#4a6b5e]">
              Interaction concept
            </p>
            <h2 className="mt-4 font-editorial text-[clamp(1.9rem,4vw,3.1rem)] font-light leading-[1.05] text-[#16191c]">
              <RevealLine reduceMotion={reduceMotion}>The same wall, before and after,</RevealLine>{' '}
              <RevealLine reduceMotion={reduceMotion} delay={0.1}>
                at whatever hour you like
              </RevealLine>
            </h2>
            <motion.p
              className="mt-5 text-sm leading-relaxed text-[#5a6660] sm:text-[0.95rem]"
              {...riseSoft(0.15)}
            >
              Drag the divider. Change daylight above. Acrylic holds one note; mineral finishes open.
              Specialist surfaces become explorable — not claimed in adjectives.
            </motion.p>
            <div className="mt-8 flex flex-wrap gap-2">
              {FINISHES_DATA.slice(0, 5).map((f, i) => (
                <motion.div key={f.id} {...staggerProps(i, reduceMotion)}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectFinish(f);
                      onNavigateExperience('finishes');
                    }}
                    className="border-b border-[#c9d4ce] px-1 py-2 text-[0.68rem] uppercase tracking-[0.12em] text-[#3D5C56] transition-colors hover:border-[#4a6b5e] hover:text-[#16191c]"
                  >
                    {f.name}
                  </button>
                </motion.div>
              ))}
            </div>
            <p className="mt-6 font-mono-spec text-[0.62rem] uppercase tracking-[0.16em] text-[#6a7a74]">
              Featured · {featured.name}
            </p>
          </motion.div>

          <RevealMedia delay={0.12} reduceMotion={reduceMotion}>
            <div
              className="relative aspect-16/10 cursor-ew-resize select-none"
              onPointerDown={(e) => {
                setDragging(true);
                e.currentTarget.setPointerCapture(e.pointerId);
                onWipePointer(e.clientX, e.currentTarget);
              }}
              onPointerMove={(e) => {
                if (!dragging) return;
                onWipePointer(e.clientX, e.currentTarget);
              }}
              onPointerUp={() => setDragging(false)}
              onPointerCancel={() => setDragging(false)}
            >
              <img
                src={project.beforeImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-700"
                style={{ filter: lightingFilter }}
                draggable={false}
              />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 0 0 ${wipe}%)` }}
              >
                <img
                  src={project.afterImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-700"
                  style={{ filter: lightingFilter }}
                  draggable={false}
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 z-5 mix-blend-soft-light transition-[background] duration-700"
                style={{ background: lightingWash }}
              />
              <div
                className="pointer-events-none absolute top-3 left-3 z-10 border border-[#eef1f3]/30 bg-[#0e1012]/55 px-2.5 py-1.5 backdrop-blur-sm"
              >
                <p className="font-mono-spec text-[0.55rem] uppercase tracking-[0.16em] text-[#eef1f3]">
                  Daylight · {timeInfo.label}
                </p>
              </div>
              <div
                className="absolute top-0 bottom-0 z-10 w-px bg-[#eef1f3]"
                style={{ left: `${wipe}%` }}
              >
                <span className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#eef1f3] text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-[#16191c] shadow-[0_8px_28px_rgba(22,25,28,0.25)]">
                  Drag
                </span>
              </div>
              <span className="absolute bottom-4 left-4 z-10 font-mono-spec text-[0.58rem] uppercase tracking-[0.14em] text-[#eef1f3] drop-shadow">
                Before · acrylic
              </span>
              <span className="absolute right-4 bottom-4 z-10 font-mono-spec text-[0.58rem] uppercase tracking-[0.14em] text-[#eef1f3] drop-shadow">
                After · mineral
              </span>
            </div>
          </RevealMedia>
        </div>
      </SectionBand>

      {/* Real case */}
      <SectionBand
        reduceMotion={reduceMotion}
        className="border-t border-[#c9d4ce] bg-[#e8eeea] px-5 py-24 sm:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div className="lg:col-span-5" {...rise()}>
              <ProofBadge kind={project.proofStatus} />
              <p className="mt-6 font-mono-spec text-[0.68rem] uppercase tracking-[0.22em] text-[#4a6b5e]">
                Featured case · {project.suburb}
              </p>
              <h2 className="mt-4 font-editorial text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.05] text-[#16191c]">
                <RevealLine reduceMotion={reduceMotion}>{project.title}</RevealLine>
              </h2>
              <p className="mt-2 font-mono-spec text-[0.62rem] uppercase tracking-[0.14em] text-[#6a7a74]">
                {project.architectureEra} · {project.completionYear} · {project.timeline}
              </p>
              <p className="mt-6 text-sm leading-relaxed text-[#5a6660] sm:text-[0.95rem]">
                {project.transformationStory}
              </p>
              <blockquote className="mt-8 border-l border-[#8fb8a8] pl-5 font-editorial text-xl font-light italic leading-snug text-[#16191c]">
                “{project.homeownerQuote.quote}”
                <span className="mt-3 block font-mono-spec text-[0.62rem] not-italic uppercase tracking-[0.14em] text-[#6a7a74]">
                  — {project.homeownerQuote.author}
                </span>
              </blockquote>
              <p className="mt-6 text-xs leading-relaxed text-[#6a7a74]">{project.imageSourceNote}</p>
              <button
                type="button"
                onClick={() => onNavigateExperience('case-study')}
                className="pm-cta mt-8 inline-flex items-center gap-2 bg-[#4a6b5e] px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#eef1f3]"
              >
                Open full case study
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </motion.div>

            <RevealMedia className="lg:col-span-7" delay={0.1} reduceMotion={reduceMotion}>
              <div className="relative aspect-4/3 sm:aspect-16/11">
                <img
                  src={project.afterImage}
                  alt={`${project.title} after`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(22,25,28,0.55)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 sm:p-7">
                  <div>
                    <p className="font-mono-spec text-[0.58rem] uppercase tracking-[0.16em] text-[#8fb8a8]">
                      After · chalk limewash
                    </p>
                    <p className="mt-1 text-sm text-[#eef1f3]">{project.architecturalNotes}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.colorPalette.map((c) => (
                      <span
                        key={c.hex}
                        className="inline-flex items-center gap-2 border border-[#eef1f3]/25 bg-[#16191c]/45 px-2.5 py-1.5 text-[0.58rem] uppercase tracking-[0.12em] text-[#eef1f3] backdrop-blur-sm"
                      >
                        <span
                          className="h-3 w-3 border border-[#eef1f3]/40"
                          style={{ backgroundColor: c.hex }}
                        />
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealMedia>
          </div>
        </div>
      </SectionBand>

      {/* Psychology */}
      <SectionBand
        reduceMotion={reduceMotion}
        className="border-t border-[#c9d4ce] bg-[#e8eeea] px-5 py-24 sm:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div {...rise()}>
            <p className="font-mono-spec text-[0.68rem] uppercase tracking-[0.22em] text-[#4a6b5e]">
              Homeowner psychology
            </p>
            <h2 className="mt-4 max-w-2xl font-editorial text-[clamp(2rem,4vw,3rem)] font-light text-[#16191c]">
              <RevealLine reduceMotion={reduceMotion}>Lead to enquiry without</RevealLine>{' '}
              <RevealLine reduceMotion={reduceMotion} delay={0.08}>
                shouting “best painters”
              </RevealLine>
            </h2>
          </motion.div>
          <div className="mt-12 space-y-0 divide-y divide-[#c9d4ce] border-y border-[#c9d4ce]">
            {(psychology || []).map((row, i) => (
              <motion.div key={row.trigger} className="grid gap-6 py-8 md:grid-cols-3" {...staggerProps(i, reduceMotion)}>
                <div>
                  <p className="font-mono-spec text-[0.58rem] uppercase tracking-[0.14em] text-[#8fb8a8]">
                    Trigger
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#16191c]">{row.trigger}</p>
                </div>
                <div>
                  <p className="font-mono-spec text-[0.58rem] uppercase tracking-[0.14em] text-[#8fb8a8]">
                    Barrier
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#5a6660]">{row.barrier}</p>
                </div>
                <div>
                  <p className="font-mono-spec text-[0.58rem] uppercase tracking-[0.14em] text-[#8fb8a8]">
                    Solution
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#16191c]">{row.ourSolution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionBand>

      {/* Past work */}
      <SectionBand
        reduceMotion={reduceMotion}
        className="border-t border-[#c9d4ce] px-5 py-24 sm:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div {...rise()}>
            <p className="font-mono-spec text-[0.68rem] uppercase tracking-[0.22em] text-[#4a6b5e]">
              Relevant past work
            </p>
            <h2 className="mt-4 font-editorial text-[clamp(2rem,4vw,3rem)] font-light text-[#16191c]">
              <RevealLine reduceMotion={reduceMotion}>Digital experiences & direction</RevealLine>
            </h2>
            <p className="mt-3 max-w-lg text-sm text-[#5a6660]">
              Structure ready for your portfolio URLs before submission.
            </p>
          </motion.div>
          <div className="mt-12 grid gap-px bg-[#c9d4ce] sm:grid-cols-2">
            {(pastWork || []).map((w, i) => (
              <motion.div key={w.title} className="bg-[#f2f5f3] p-7 sm:p-8" {...staggerProps(i, reduceMotion)}>
                <p className="font-mono-spec text-[0.62rem] uppercase tracking-[0.14em] text-[#4a6b5e]">
                  {w.year} · {w.category}
                </p>
                <h3 className="mt-3 font-editorial text-2xl font-light text-[#16191c]">{w.title}</h3>
                <p className="mt-1 text-xs text-[#6a7a74]">{w.client}</p>
                <p className="mt-4 text-sm leading-relaxed text-[#5a6660]">{w.impact}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionBand>

      {/* Depth strip */}
      <SectionBand
        reduceMotion={reduceMotion}
        className="border-t border-[#c9d4ce] bg-[#16191c] px-5 py-14 text-[#eef1f3] sm:px-10"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-8">
          <div>
            <p className="font-mono-spec text-[0.62rem] uppercase tracking-[0.18em] text-[#8fb8a8]">
              Live prototype depth
            </p>
            <p className="mt-3 font-editorial text-2xl font-light sm:text-3xl">
              <RevealLine reduceMotion={reduceMotion}>
                {SUBURBS_DATA.length} suburbs · {REAL_PROJECTS.length} cases · {FINISHES_DATA.length}{' '}
                finishes
              </RevealLine>
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            {(
              [
                ['suburbs', 'Suburbs'],
                ['case-study', 'Cases'],
                ['guidance', 'Guidance']
              ] as const
            ).map(([id, label], i) => (
              <motion.div key={id} {...staggerProps(i, reduceMotion, 12)}>
                <button
                  type="button"
                  onClick={() => onNavigateExperience(id)}
                  className="font-mono-spec text-[0.68rem] uppercase tracking-[0.14em] text-[#9aa3ab] transition-colors hover:text-[#8fb8a8]"
                >
                  {label} →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionBand>

      {/* Close */}
      <SectionBand
        reduceMotion={reduceMotion}
        className="relative overflow-hidden px-5 py-28 text-center sm:px-10"
      >
        <div className="mineral-grain pointer-events-none absolute inset-0 opacity-50" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8fb8a8]/15 blur-3xl" />
        <div className="relative mx-auto max-w-3xl">
          <p className="font-mono-spec text-[0.68rem] uppercase tracking-[0.22em] text-[#8fb8a8]">
            Natural close
          </p>
          <h2 className="mt-5 font-editorial text-[clamp(2.2rem,5vw,3.8rem)] font-light leading-[1.05] text-[#16191c]">
            <RevealLine reduceMotion={reduceMotion}>See the finish in your own daylight —</RevealLine>{' '}
            <RevealLine reduceMotion={reduceMotion} delay={0.1}>
              then enquire.
            </RevealLine>
          </h2>
          <motion.p
            className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#5a6660]"
            {...riseSoft(0.18)}
          >
            Boards on your wall for a week. Substrate read on site. No high-pressure quote theatre.
          </motion.p>
          <motion.div className="mt-10 flex flex-wrap justify-center gap-3" {...riseSoft(0.28)}>
            <button
              type="button"
              onClick={onOpenAtelier}
              className="pm-cta inline-flex items-center gap-2 bg-linear-to-r from-[#8fb8a8] to-[#6a9484] px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#16191c]"
            >
              Enter Material Atelier
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onOpenContest}
              className="px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-[#5a6660] transition-colors hover:text-[#16191c]"
            >
              Submission dossier
            </button>
          </motion.div>
        </div>
      </SectionBand>
    </div>
  );
}
