import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue
} from 'motion/react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { PageExperience } from '../../types';
import { FINISHES_DATA } from '../../data/finishesData';
import { REAL_PROJECTS } from '../../data/projectsData';

interface PaintRevolutionExperienceProps {
  onNavigateExperience: (exp: PageExperience) => void;
  onOpenAtelier: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const revealHidden = (reduce: boolean | null, y = 36) =>
  reduce ? { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' } : { opacity: 0, y, clipPath: 'inset(100% 0 0 0)' };

const revealShown = { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' };

function Reveal({
  children,
  className = '',
  delay = 0,
  y = 36,
  reduceMotion,
  once = true
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  reduceMotion: boolean | null;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={revealHidden(reduceMotion, y)}
      whileInView={revealShown}
      viewport={{ once, margin: '-12% 0px -8% 0px', amount: 0.25 }}
      transition={{ duration: reduceMotion ? 0 : 0.95, delay: reduceMotion ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function RevealLine({
  children,
  className = '',
  delay = 0,
  reduceMotion,
  from = 'left'
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  reduceMotion: boolean | null;
  from?: 'left' | 'right';
}) {
  const hidden = reduceMotion
    ? { opacity: 1, x: 0 }
    : { opacity: 0, x: from === 'left' ? -28 : 28 };
  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-10% 0px', amount: 0.4 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function RevealWords({
  text,
  className = '',
  reduceMotion,
  delay = 0
}: {
  text: string;
  className?: string;
  reduceMotion: boolean | null;
  delay?: number;
}) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom mr-[0.28em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={reduceMotion ? false : { y: '110%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-8% 0px', amount: 0.5 }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              delay: reduceMotion ? 0 : delay + i * 0.045,
              ease: EASE
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Smooth scroll progress for parallax layers (honours reduced motion). */
function useSmoothProgress(
  target: React.RefObject<HTMLElement | null>,
  reduceMotion: boolean | null,
  offset: [string, string] = ['start end', 'end start']
) {
  const { scrollYProgress } = useScroll({
    target,
    offset: offset as ['start end', 'end start']
  });
  return useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 500 : 90,
    damping: reduceMotion ? 50 : 28,
    restDelta: 0.001
  });
}

function ParallaxY({
  children,
  y,
  className = '',
  style
}: {
  children: React.ReactNode;
  y: MotionValue<number | string>;
  className?: string;
  style?: React.CSSProperties;
}): React.ReactElement {
  return (
    <motion.div className={className} style={{ y, ...style }}>
      {children}
    </motion.div>
  );
}

const CHAPTERS = [
  {
    id: 'substrate',
    index: '01',
    label: 'Substrate',
    title: 'Walls are living fabric.',
    body: 'Before pigment, before sheen—sound masonry, breathable plaster, and substrate honesty. The field where every finish begins.',
    detail:
      'Victorian lath, Edwardian brick, coastal render: each fabric asks for a different reading. We strip failing films, repair with lime-compatible mortars, and leave vapor pathways open so Melbourne humidity moves through the wall—not into blistered paint.',
    notes: [
      'Sound substrate before colour',
      'Breathable repair protocols',
      'Zero plastic-trap primers on heritage planes'
    ],
    cta: 'Explore finishes',
    experience: 'finishes' as PageExperience,
    image: '/hero-melbourne-inner-north.jpg',
    accent: 'Seed'
  },
  {
    id: 'mineral',
    index: '02',
    label: 'Mineral',
    title: 'Chemistry you can touch.',
    body: 'Slaked lime, Carrara dust, Roman clay—mineral coats that petrify into the wall instead of sealing it under plastic film.',
    detail:
      'Limewash carbonates with air. Marmorino burnishes into translucent stone. Clay softens acoustics. These are not decorative skins—they are mineral architectures that age with the building and invite the hand.',
    notes: [
      FINISHES_DATA[0].name,
      FINISHES_DATA[1].name,
      FINISHES_DATA[2]?.name ?? 'Roman Clay'
    ],
    cta: 'Open finishes lab',
    experience: 'finishes' as PageExperience,
    image: '/hero-melbourne-mineral.jpg',
    accent: 'Science'
  },
  {
    id: 'light',
    index: '03',
    label: 'Light',
    title: 'Melbourne daylight, held still.',
    body: 'Southern skylight, golden hour, evening lamp—surfaces that bloom, soften, and cocoon as the day turns.',
    detail:
      'Trade acrylic reflects hard and flattens. Mineral peaks catch rake light; chalky matte scatters midday glare; evening 2700K sinks into velvet depth. We tune finishes to the light your rooms already own.',
    notes: [
      'Morning mist on limewash',
      'Midday soft scatter',
      'Golden bloom · evening cocoon'
    ],
    cta: 'Enter light lab',
    experience: 'guidance' as PageExperience,
    image: '/hero-melbourne-bayside.jpg',
    accent: 'Growth'
  },
  {
    id: 'proof',
    index: '04',
    label: 'Proof',
    title: 'Rooms that keep the finish.',
    body: 'Directional narratives from Melbourne fabric—substrate, light rake, and finish choice, labeled honestly.',
    detail:
      'Gore Street leads with site photography in the verified-commission pattern. Other suburbs stay directional until authenticated client shoots land.',
    notes: REAL_PROJECTS.slice(0, 3).map((p) => `${p.suburb} · ${p.title}`),
    cta: 'View project proof',
    experience: 'case-study' as PageExperience,
    image: '/hero-melbourne-terrace.jpg',
    accent: 'Harvest'
  }
] as const;

const FIELD_CONTRAST = [
  {
    side: 'Trade paint',
    tone: 'muted' as const,
    lines: [
      'Plastic film over masonry',
      'Hard specular bounce',
      'Traps moisture in heritage fabric',
      'Colour that looks the same at noon and night'
    ]
  },
  {
    side: 'Mineral finish',
    tone: 'alive' as const,
    lines: [
      'Petrifies into the wall',
      'Soft scatter under southern light',
      'Breathable vapor pathways',
      'Surface that changes with the day'
    ]
  }
];

const PROTOCOL = [
  {
    index: '01',
    title: 'Read the field',
    body: 'Substrate survey, moisture map, and daylight rake across the primary planes—before a single coat is specified.'
  },
  {
    index: '02',
    title: 'Sample in situ',
    body: 'Physical mineral boards in your rooms. Morning, midday, golden, evening—the only light that matters is yours.'
  },
  {
    index: '03',
    title: 'Prepare without theatre',
    body: 'Clean-room protection where spray is required. Breathable repairs where heritage fabric must stay alive.'
  },
  {
    index: '04',
    title: 'Finish by hand',
    body: 'Cross-hatch limewash, burnished plaster, clay depth—coats that earn permanence, not a plastic seal.'
  }
];

function MineralDust({ reduceMotion }: { reduceMotion: boolean | null }) {
  if (reduceMotion) return null;
  return (
    <div className="pr-dust" aria-hidden>
      {Array.from({ length: 22 }).map((_, i) => (
        <span
          key={i}
          className="pr-dust-particle"
          style={{
            left: `${4 + ((i * 19) % 90)}%`,
            top: `${6 + ((i * 27) % 86)}%`,
            animationDelay: `${(i % 10) * 0.4}s`,
            animationDuration: `${8 + (i % 6) * 1.5}s`,
            width: `${1.5 + (i % 4)}px`,
            height: `${1.5 + (i % 4)}px`,
            opacity: 0.12 + (i % 5) * 0.05
          }}
        />
      ))}
    </div>
  );
}

type Chapter = (typeof CHAPTERS)[number];

interface ChapterSceneProps {
  chapter: Chapter;
  onNavigate: (exp: PageExperience) => void;
  reduceMotion: boolean | null;
  reverse?: boolean;
}

function ChapterScene({
  chapter,
  onNavigate,
  reduceMotion,
  reverse = false
}: ChapterSceneProps): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: false });
  const progress = useSmoothProgress(ref, reduceMotion, ['start end', 'end start']);

  const imgY = useTransform(
    progress,
    [0, 1],
    reduceMotion ? ['0%', '0%'] : ['-14%', '16%']
  );
  const imgScale = useTransform(
    progress,
    [0, 0.45, 1],
    reduceMotion ? [1, 1, 1] : [1.14, 1.02, 1.1]
  );
  const wash = useTransform(progress, [0, 0.35, 0.55, 1], [0.82, 0.38, 0.4, 0.76]);
  const contentY = useTransform(
    progress,
    [0, 1],
    reduceMotion ? [0, 0] : reverse ? [56, -40] : [48, -32]
  );
  const titleY = useTransform(
    progress,
    [0.12, 0.5],
    reduceMotion ? [0, 0] : [48, 0]
  );
  const titleOpacity = useTransform(
    progress,
    [0.15, 0.38, 0.72, 0.92],
    reduceMotion ? [1, 1, 1, 1] : [0.05, 1, 1, 0.35]
  );
  const titleClip = useTransform(
    progress,
    [0.14, 0.4],
    reduceMotion
      ? ['inset(0% 0 0 0)', 'inset(0% 0 0 0)']
      : ['inset(100% 0 0 0)', 'inset(0% 0 0 0)']
  );
  const watermarkX = useTransform(
    progress,
    [0, 1],
    reduceMotion ? [0, 0] : reverse ? [60, -36] : [-60, 36]
  );
  const watermarkY = useTransform(
    progress,
    [0, 1],
    reduceMotion ? [0, 0] : [40, -50]
  );
  const grainOpacity = useTransform(
    progress,
    [0, 0.45, 1],
    reduceMotion ? [0.4, 0.4, 0.4] : [0.55, 0.28, 0.5]
  );

  return (
    <section
      ref={ref}
      id={`pr-${chapter.id}`}
      data-pr-chapter={chapter.id}
      className="pr-chapter relative"
    >
      <div className="pr-chapter-sticky">
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src={chapter.image}
            alt=""
            style={{ y: imgY, scale: imgScale }}
            className="absolute inset-0 h-[130%] w-full object-cover object-center will-change-transform"
          />
          <motion.div className="absolute inset-0 bg-[#f2f5f3]" style={{ opacity: wash }} />
          <div className={`absolute inset-0 ${reverse ? 'pr-chapter-veil-rev' : 'pr-chapter-veil'}`} />
          <div className="absolute inset-0 pr-chapter-vignette" />
          <motion.div
            className="absolute inset-0 mineral-grain pointer-events-none"
            style={{ opacity: grainOpacity }}
          />
        </div>

        <motion.span
          aria-hidden
          style={{ opacity: titleOpacity, x: watermarkX, y: watermarkY }}
          className={`pr-chapter-watermark pointer-events-none select-none ${
            reverse ? 'right-2 sm:right-6 text-right' : 'left-2 sm:left-6'
          }`}
        >
          {chapter.index}
        </motion.span>

        <div
          className={`relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 min-h-svh flex flex-col justify-end pb-20 sm:pb-28 pt-28 ${
            reverse ? 'items-end' : 'items-start'
          }`}
        >
          <motion.div
            style={{ y: contentY, opacity: titleOpacity }}
            className={`max-w-xl lg:max-w-2xl ${reverse ? 'text-right' : ''}`}
          >
            <motion.div
              initial={false}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.2, y: 12 }}
              transition={{ duration: 0.55, ease: EASE }}
              className={`flex items-center gap-3 mb-6 ${reverse ? 'justify-end' : ''}`}
            >
              <span className="pr-chapter-kicker">{chapter.accent}</span>
              <motion.span
                initial={false}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="h-px w-10 bg-[#8fb8a8]/80 origin-left"
              />
              <span className="font-mono-spec text-[10px] tracking-[0.26em] uppercase text-[#5a6660]">
                {chapter.label}
              </span>
            </motion.div>

            <motion.h2
              style={{ clipPath: titleClip, y: titleY }}
              className="font-editorial font-light text-[clamp(2.5rem,7.5vw,5.5rem)] leading-[0.9] tracking-tight text-[#16191c]"
            >
              {chapter.title}
            </motion.h2>

            <motion.div
              initial={false}
              animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
              className={`mt-7 h-px w-24 bg-linear-to-r from-[#4a6b5e] to-transparent origin-left ${
                reverse ? 'ml-auto origin-right bg-linear-to-l' : ''
              }`}
            />

            <motion.p
              initial={false}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.65, delay: 0.12, ease: EASE }}
              className="mt-6 max-w-md text-sm sm:text-[0.95rem] text-[#3f4a45] font-light leading-relaxed"
            >
              {chapter.body}
            </motion.p>

            <motion.p
              initial={false}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
              className={`mt-4 max-w-lg text-xs sm:text-sm text-[#6a736e] font-light leading-relaxed ${
                reverse ? 'ml-auto' : ''
              }`}
            >
              {chapter.detail}
            </motion.p>

            <ul className={`mt-7 space-y-2.5 max-w-md ${reverse ? 'ml-auto' : ''}`}>
              {chapter.notes.map((note, i) => (
                <motion.li
                  key={note}
                  initial={false}
                  animate={
                    inView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: reverse ? 18 : -18 }
                  }
                  transition={{ duration: 0.5, delay: 0.22 + i * 0.07, ease: EASE }}
                  className={`flex items-start gap-3 ${reverse ? 'flex-row-reverse' : ''}`}
                >
                  <motion.span
                    initial={false}
                    animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.45, delay: 0.26 + i * 0.07, ease: EASE }}
                    className="mt-2 h-px w-5 shrink-0 bg-[#8fb8a8] origin-left"
                  />
                  <span className="text-xs sm:text-[13px] text-[#4a524e] font-light leading-snug">
                    {note}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              type="button"
              onClick={() => onNavigate(chapter.experience)}
              initial={false}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.55, delay: 0.4, ease: EASE }}
              className={`pr-cta group mt-9 inline-flex items-center gap-3 ${
                reverse ? 'flex-row-reverse' : ''
              }`}
            >
              <span className="pr-cta-line" />
              <span>{chapter.cta}</span>
              <ArrowRight
                className={`w-4 h-4 transition-transform duration-300 ${
                  reverse ? 'group-hover:-translate-x-1.5 rotate-180' : 'group-hover:translate-x-1.5'
                }`}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SpecimenCard({
  finish,
  index,
  image,
  reduceMotion,
  onNavigate
}: {
  finish: (typeof FINISHES_DATA)[number];
  index: number;
  image: string;
  reduceMotion: boolean | null;
  onNavigate: (exp: PageExperience) => void;
}): React.ReactElement {
  const ref = useRef<HTMLButtonElement>(null);
  const progress = useSmoothProgress(ref, reduceMotion, ['start end', 'end start']);
  const imgY = useTransform(
    progress,
    [0, 1],
    reduceMotion ? ['0%', '0%'] : ['-12%', '12%']
  );
  const imgScale = useTransform(
    progress,
    [0, 0.5, 1],
    reduceMotion ? [1.05, 1.05, 1.05] : [1.16, 1.04, 1.12]
  );

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => onNavigate('finishes')}
      className="pr-specimen group text-left"
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 40, clipPath: 'inset(12% 12% 12% 12%)' }
      }
      whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.95,
        delay: reduceMotion ? 0 : index * 0.1,
        ease: EASE
      }}
    >
      <div className="relative aspect-4/5 overflow-hidden mb-5">
        <motion.img
          src={image}
          alt={finish.name}
          style={{ y: imgY, scale: imgScale }}
          className="absolute inset-0 h-[120%] w-full object-cover will-change-transform transition-transform duration-[1.4s] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#f2f5f3] via-[#f2f5f3]/20 to-transparent opacity-90" />
        <div className="absolute inset-0 mineral-grain opacity-30 pointer-events-none" />
        <div className="absolute inset-0 ring-1 ring-inset ring-[#16191c]/08" />
        <span className="absolute top-4 left-4 font-mono-spec text-[10px] tracking-[0.2em] text-[#f2f5f3]/95 mix-blend-difference">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="absolute bottom-4 left-4 right-4 font-mono-spec text-[9px] uppercase tracking-[0.2em] text-[#2d453c] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          Open laboratory →
        </span>
      </div>
      <p className="font-mono-spec text-[10px] uppercase tracking-[0.2em] text-[#8fb8a8]">
        {finish.category.split(' ')[0]}
      </p>
      <h3 className="mt-2 font-editorial text-xl sm:text-[1.35rem] font-light text-[#16191c] leading-snug group-hover:text-[#2d453c] transition-colors">
        {finish.name}
      </h3>
      <p className="mt-2 text-xs text-[#5a6660] font-light leading-relaxed line-clamp-2">
        {finish.tagline}
      </p>
      <motion.div
        className="mt-4 h-1 w-full max-w-18 opacity-80 origin-left"
        style={{ backgroundColor: finish.accentHex }}
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 + index * 0.08, ease: EASE }}
      />
    </motion.button>
  );
}

export default function PaintRevolutionExperience({
  onNavigateExperience,
  onOpenAtelier
}: PaintRevolutionExperienceProps) {
  const reduceMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLElement>(null);
  const protocolRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLElement>(null);
  const suburbRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string>(CHAPTERS[0].id);
  const featured = REAL_PROJECTS[0];
  const specimens = FINISHES_DATA.slice(0, 4);
  const specimenImages = [
    '/hero-melbourne-mineral.jpg',
    '/hero-melbourne-clay.jpg',
    '/hero-melbourne-terrace.jpg',
    '/hero-melbourne-bayside.jpg'
  ] as const;
  const harvestImage = '/hero-painter-melbourne.jpg';

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end']
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const heroProgress = useSmoothProgress(heroRef, reduceMotion, ['start start', 'end start']);
  const heroTitleY = useTransform(
    heroProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 64]
  );
  const heroLine1Y = useTransform(
    heroProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 16]
  );
  const heroLine2Y = useTransform(
    heroProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 28]
  );
  const heroFade = useTransform(
    heroProgress,
    [0, 0.75, 1],
    reduceMotion ? [1, 1, 1] : [1, 0.9, 0.45]
  );
  const heroImgY = useTransform(
    heroProgress,
    [0, 1],
    reduceMotion ? ['0%', '0%'] : ['0%', '18%']
  );
  const heroImgScale = useTransform(
    heroProgress,
    [0, 1],
    reduceMotion ? [1.06, 1.06] : [1.06, 1.14]
  );
  const heroMeshY = useTransform(
    heroProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 48]
  );
  const heroWashOpacity = useTransform(
    heroProgress,
    [0, 0.7],
    reduceMotion ? [1, 1] : [1, 0.7]
  );

  const manifestoProgress = useSmoothProgress(
    manifestoRef,
    reduceMotion,
    ['start end', 'end start']
  );
  const manifestoOrbY = useTransform(
    manifestoProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [40, -60]
  );
  const manifestoOrbX = useTransform(
    manifestoProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [20, -28]
  );
  const manifestoTextY = useTransform(
    manifestoProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [24, -12]
  );
  const manifestoOpacity = useTransform(
    manifestoProgress,
    [0, 0.15, 0.85, 1],
    reduceMotion ? [1, 1, 1, 1] : [0.55, 1, 1, 0.85]
  );
  const manifestoScale = useTransform(
    manifestoProgress,
    [0, 0.3, 1],
    reduceMotion ? [1, 1, 1] : [0.99, 1, 1]
  );

  const fieldProgress = useSmoothProgress(fieldRef, reduceMotion, ['start end', 'end start']);
  const fieldLeftY = useTransform(
    fieldProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [20, -12]
  );
  const fieldRightY = useTransform(
    fieldProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [28, -16]
  );
  const fieldOpacity = useTransform(
    fieldProgress,
    [0, 0.15, 0.85, 1],
    reduceMotion ? [1, 1, 1, 1] : [0.6, 1, 1, 0.88]
  );
  const fieldHeadY = useTransform(
    fieldProgress,
    [0, 0.35],
    reduceMotion ? [0, 0] : [20, 0]
  );

  const specimensRef = useRef<HTMLElement>(null);
  const specimensProgress = useSmoothProgress(
    specimensRef,
    reduceMotion,
    ['start end', 'end start']
  );
  const specimensOpacity = useTransform(
    specimensProgress,
    [0, 0.15, 0.85, 1],
    reduceMotion ? [1, 1, 1, 1] : [0.6, 1, 1, 0.9]
  );
  const specimensY = useTransform(
    specimensProgress,
    [0, 0.3, 1],
    reduceMotion ? [0, 0, 0] : [24, 0, -12]
  );
  const specimensScale = useTransform(
    specimensProgress,
    [0, 0.3, 1],
    reduceMotion ? [1, 1, 1] : [0.99, 1, 1]
  );

  const protocolProgress = useSmoothProgress(
    protocolRef,
    reduceMotion,
    ['start end', 'end start']
  );
  const protocolTrack = useTransform(
    protocolProgress,
    [0.15, 0.75],
    reduceMotion ? ['0%', '0%'] : ['0%', '100%']
  );
  const protocolOpacity = useTransform(
    protocolProgress,
    [0, 0.15, 0.85, 1],
    reduceMotion ? [1, 1, 1, 1] : [0.65, 1, 1, 0.9]
  );
  const protocolY = useTransform(
    protocolProgress,
    [0, 0.3, 1],
    reduceMotion ? [0, 0, 0] : [20, 0, -10]
  );

  const quoteProgress = useSmoothProgress(quoteRef, reduceMotion, ['start end', 'end start']);
  const quoteY = useTransform(
    quoteProgress,
    [0, 1],
    reduceMotion ? ['0%', '0%'] : ['-8%', '8%']
  );
  const quoteScale = useTransform(
    quoteProgress,
    [0, 0.5, 1],
    reduceMotion ? [1, 1, 1] : [1.08, 1.02, 1.05]
  );
  const quoteTextY = useTransform(
    quoteProgress,
    [0.15, 0.55],
    reduceMotion ? [0, 0] : [36, 0]
  );
  const quoteTextOpacity = useTransform(
    quoteProgress,
    [0.2, 0.45, 0.9],
    reduceMotion ? [1, 1, 1] : [0.55, 1, 1]
  );
  const quoteMarkY = useTransform(
    quoteProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [20, -28]
  );

  const suburbProgress = useSmoothProgress(suburbRef, reduceMotion, ['start end', 'end start']);
  const suburbWashX = useTransform(
    suburbProgress,
    [0, 1],
    reduceMotion ? ['0%', '0%'] : ['-4%', '6%']
  );
  const suburbOpacity = useTransform(
    suburbProgress,
    [0, 0.2, 0.85, 1],
    reduceMotion ? [1, 1, 1, 1] : [0.7, 1, 1, 0.92]
  );
  const suburbY = useTransform(
    suburbProgress,
    [0, 0.35, 1],
    reduceMotion ? [0, 0, 0] : [16, 0, -8]
  );

  const closeProgress = useSmoothProgress(closeRef, reduceMotion, ['start end', 'end start']);
  const closeOrbY = useTransform(
    closeProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [48, -64]
  );
  const closeOrbScale = useTransform(
    closeProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [0.94, 1.06]
  );
  const closeTextY = useTransform(
    closeProgress,
    [0.15, 0.5],
    reduceMotion ? [0, 0] : [28, 0]
  );
  const closeOpacity = useTransform(
    closeProgress,
    [0, 0.2, 0.9, 1],
    reduceMotion ? [1, 1, 1, 1] : [0.5, 1, 1, 1]
  );
  const closeScale = useTransform(
    closeProgress,
    [0, 0.35, 1],
    reduceMotion ? [1, 1, 1] : [0.99, 1, 1]
  );

  useEffect(() => {
    const nodes = CHAPTERS.map((c) => document.getElementById(`pr-${c.id}`)).filter(
      Boolean
    ) as HTMLElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top?.target.id) {
          setActiveId(top.target.id.replace('pr-', ''));
        }
      },
      { threshold: [0.35, 0.55, 0.7] }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef} className="pr-page relative text-[#16191c] pb-0">
      <MineralDust reduceMotion={reduceMotion} />

      <div className="pr-progress" aria-hidden>
        <motion.div className="pr-progress-bar" style={{ width: progressWidth }} />
      </div>

      {/* Desktop chapter rail */}
      <aside className="pr-rail hidden xl:flex" aria-label="Chapters">
        {CHAPTERS.map((ch) => (
          <a
            key={ch.id}
            href={`#pr-${ch.id}`}
            className={`pr-rail-item ${activeId === ch.id ? 'is-active' : ''}`}
          >
            <span className="pr-rail-dot" />
            <span className="pr-rail-index">{ch.index}</span>
            <span className="pr-rail-label">{ch.label}</span>
          </a>
        ))}
      </aside>

      {/* Mobile chapter dots */}
      <nav className="pr-mobile-rail xl:hidden" aria-label="Chapters">
        {CHAPTERS.map((ch) => (
          <a
            key={ch.id}
            href={`#pr-${ch.id}`}
            className={`pr-mobile-dot ${activeId === ch.id ? 'is-active' : ''}`}
            aria-label={ch.label}
          />
        ))}
      </nav>

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-svh flex flex-col justify-end overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src="/hero-painter-melbourne.jpg"
            alt="Mineral walls in Melbourne daylight"
            style={{ y: heroImgY, scale: heroImgScale }}
            className="absolute inset-0 w-full h-[125%] object-cover object-center will-change-transform"
          />
          <motion.div
            className="absolute inset-0 pr-hero-wash"
            style={{ opacity: heroWashOpacity }}
          />
          <motion.div
            className="absolute inset-0 pr-hero-mesh"
            aria-hidden
            style={{ y: heroMeshY }}
          />
          <div className="absolute inset-0 mineral-grain opacity-40 pointer-events-none" />
        </div>

        <motion.div
          style={{ y: heroTitleY, opacity: heroFade }}
          className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-20 sm:pb-28"
        >
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18, clipPath: 'inset(100% 0 0 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
            transition={{ duration: 1, ease: EASE }}
            className="font-editorial font-light tracking-tight text-[#12110f] text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.92] max-w-4xl"
          >
            Painter Melbourne
          </motion.p>

          <h1 className="mt-5 font-editorial font-light tracking-tight leading-[0.92]">
            <motion.span
              style={{ y: heroLine1Y }}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, clipPath: 'inset(100% 0 0 0)' }
              }
              animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 1.05, delay: 0.08, ease: EASE }}
              className="block text-[#3f4a45] text-[clamp(1.85rem,5.5vw,3.4rem)] will-change-transform"
            >
              Paint.
            </motion.span>
            <motion.span
              style={{ y: heroLine2Y }}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, clipPath: 'inset(100% 0 0 0)' }
              }
              animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 1.1, delay: 0.16, ease: EASE }}
              className="block italic text-[#4a6b5e] text-[clamp(1.85rem,5.5vw,3.4rem)] mt-1 will-change-transform"
            >
              Revolutionized.
            </motion.span>
          </h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-7 max-w-md text-sm sm:text-[0.95rem] text-[#3f4a45] font-light leading-relaxed"
          >
            Mineral finishes for Melbourne rooms—substrate, daylight, and proof on one continuous
            field.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={onOpenAtelier}
              className="pm-cta inline-flex items-center gap-2 px-6 py-3.5 bg-[#16191c] text-sm font-semibold tracking-wide text-[#f2f5f3]"
            >
              Request swatch box
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#pr-substrate"
              className="group inline-flex items-center gap-3 font-mono-spec text-[10px] uppercase tracking-[0.28em] text-[#2d453c]"
            >
              Enter the field
              <ArrowDown
                className={`w-3.5 h-3.5 ${reduceMotion ? '' : 'animate-pr-bob'}`}
              />
            </a>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#4a6b5e]/35 to-transparent" />
      </section>

      {/* ── Premise ── */}
      <section
        ref={manifestoRef}
        className="pr-manifesto relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <motion.div
          className="pr-manifesto-orb"
          aria-hidden
          style={{ y: manifestoOrbY, x: manifestoOrbX }}
        />
        <motion.div
          style={{ y: manifestoTextY, opacity: manifestoOpacity, scale: manifestoScale }}
          className="max-w-7xl mx-auto relative will-change-transform"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end">
            <div className="lg:col-span-8">
              <Reveal reduceMotion={reduceMotion} y={20}>
                <p className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-[#4a6b5e] mb-7">
                  The premise
                </p>
              </Reveal>
              <h2 className="font-editorial font-light text-[clamp(2rem,5.2vw,3.85rem)] leading-[1.08] text-[#16191c]">
                <RevealWords
                  text="Trade paint coats. Mineral paint"
                  reduceMotion={reduceMotion}
                />{' '}
                <span className="italic text-[#4a6b5e]">
                  <RevealWords text="becomes" reduceMotion={reduceMotion} delay={0.35} />
                </span>{' '}
                <RevealWords
                  text="the wall—and Melbourne light finally has something to move through."
                  reduceMotion={reduceMotion}
                  delay={0.45}
                />
              </h2>
            </div>
            <RevealLine
              className="lg:col-span-4"
              reduceMotion={reduceMotion}
              from="right"
              delay={0.15}
            >
              <motion.div
                initial={reduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
                className="h-px w-12 bg-[#8fb8a8] mb-5 origin-left"
              />
              <p className="text-sm text-[#5a6660] font-light leading-relaxed">
                This chapter maps the revolution the way a field grows: seed the
                substrate, apply mineral science, let daylight raise the surface,
                harvest rooms that keep their finish.
              </p>
            </RevealLine>
          </div>

          <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#c9d4ce]/80 pt-8">
            {CHAPTERS.map((ch, i) => (
              <motion.a
                key={ch.id}
                href={`#pr-${ch.id}`}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 24, clipPath: 'inset(100% 0 0 0)' }
                }
                whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, delay: i * 0.09, ease: EASE }}
                className="group"
              >
                <p className="font-mono-spec text-[10px] tracking-[0.2em] text-[#9aaba3] group-hover:text-[#4a6b5e] transition-colors">
                  {ch.index}
                </p>
                <p className="mt-2 font-editorial text-lg sm:text-xl font-light text-[#16191c] group-hover:text-[#2d453c] transition-colors">
                  {ch.label}
                </p>
                <p className="mt-1 font-mono-spec text-[9px] uppercase tracking-[0.18em] text-[#8a918c]">
                  {ch.accent}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Chapters ── */}
      {CHAPTERS.map((chapter, i) => (
        <div key={chapter.id}>
          <ChapterScene
            chapter={chapter}
            onNavigate={onNavigateExperience}
            reduceMotion={reduceMotion}
            reverse={i % 2 === 1}
          />
        </div>
      ))}

      {/* ── Field contrast ── */}
      <section
        ref={fieldRef}
        className="relative border-t border-[#c9d4ce] bg-[#e8eeea] px-4 sm:px-6 lg:px-8 py-24 sm:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 mineral-grain opacity-25 pointer-events-none" />
        <motion.div
          style={{ opacity: fieldOpacity }}
          className="max-w-7xl mx-auto relative will-change-transform"
        >
          <motion.div style={{ y: fieldHeadY }}>
            <Reveal reduceMotion={reduceMotion}>
              <p className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-[#4a6b5e] mb-4">
                Field notes
              </p>
              <h2 className="font-editorial font-light text-[clamp(2.1rem,5.2vw,3.75rem)] leading-[1.02] tracking-tight text-[#16191c] max-w-2xl">
                <RevealWords
                  text="What changes when paint stops being a film."
                  reduceMotion={reduceMotion}
                  delay={0.08}
                />
              </h2>
            </Reveal>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {FIELD_CONTRAST.map((col, ci) => (
              <div key={col.side}>
                <ParallaxY
                  y={ci === 0 ? fieldLeftY : fieldRightY}
                  className={col.tone === 'alive' ? 'pr-contrast-alive' : 'pr-contrast-muted'}
                >
                  <RevealLine
                    reduceMotion={reduceMotion}
                    from={ci === 0 ? 'left' : 'right'}
                    delay={0.05}
                  >
                    <p
                      className={`font-mono-spec text-[10px] uppercase tracking-[0.26em] mb-6 ${
                        col.tone === 'alive' ? 'text-[#2d453c]' : 'text-[#8a918c]'
                      }`}
                    >
                      {col.side}
                    </p>
                  </RevealLine>
                  <ul className="space-y-0 border-t border-[#c9d4ce]">
                    {col.lines.map((line, li) => (
                      <motion.li
                        key={line}
                        initial={
                          reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                x: ci === 0 ? -24 : 24,
                                clipPath: 'inset(0 100% 0 0)'
                              }
                        }
                        whileInView={{
                          opacity: 1,
                          x: 0,
                          clipPath: 'inset(0 0% 0 0)'
                        }}
                        viewport={{ once: true, margin: '-5% 0px', amount: 0.55 }}
                        transition={{
                          duration: 0.75,
                          delay: 0.08 + li * 0.1,
                          ease: EASE
                        }}
                        className={`py-4 border-b border-[#c9d4ce]/70 font-editorial text-xl sm:text-2xl font-light leading-snug ${
                          col.tone === 'muted'
                            ? 'text-[#7a857f] line-through decoration-[#c9d4ce] decoration-1'
                            : 'text-[#16191c]'
                        }`}
                      >
                        {line}
                      </motion.li>
                    ))}
                  </ul>
                </ParallaxY>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Specimens ── */}
      <section
        ref={specimensRef}
        className="relative px-4 sm:px-6 lg:px-8 py-24 sm:py-32 border-t border-[#c9d4ce]"
      >
        <motion.div
          style={{ opacity: specimensOpacity, y: specimensY, scale: specimensScale }}
          className="max-w-7xl mx-auto will-change-transform"
        >
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <Reveal reduceMotion={reduceMotion}>
              <p className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-[#8fb8a8] mb-3">
                Mineral specimens
              </p>
              <h2 className="font-editorial font-light text-[clamp(2rem,4.2vw,3.25rem)] text-[#16191c] leading-tight">
                Chemistry in the hand.
              </h2>
            </Reveal>
            <RevealLine reduceMotion={reduceMotion} from="right" delay={0.1}>
              <button
                type="button"
                onClick={() => onNavigateExperience('finishes')}
                className="pr-cta group inline-flex items-center gap-3"
              >
                <span className="pr-cta-line" />
                Full finishes lab
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </RevealLine>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-5">
            {specimens.map((finish, i) => (
              <div key={finish.id}>
                <SpecimenCard
                  finish={finish}
                  index={i}
                  image={specimenImages[i] ?? finish.macroImage}
                  reduceMotion={reduceMotion}
                  onNavigate={onNavigateExperience}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Protocol ── */}
      <section
        ref={protocolRef}
        className="pr-manifesto relative border-t border-[#c9d4ce] px-4 sm:px-6 lg:px-8 py-24 sm:py-32"
      >
        <motion.div
          style={{ opacity: protocolOpacity, y: protocolY }}
          className="max-w-7xl mx-auto will-change-transform"
        >
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <Reveal reduceMotion={reduceMotion}>
              <p className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-[#4a6b5e] mb-4">
                Protocol
              </p>
              <h2 className="font-editorial font-light text-[clamp(2rem,4.2vw,3.25rem)] text-[#16191c] max-w-xl leading-tight">
                How the field is worked.
              </h2>
            </Reveal>
            <RevealLine reduceMotion={reduceMotion} from="right" delay={0.12}>
              <p className="max-w-xs text-xs font-light text-[#6a736e] leading-relaxed">
                A quiet sequence—daylight first, then craft—so every wall earns permanence.
              </p>
            </RevealLine>
          </div>

          <div className="relative mb-2 h-px w-full bg-[#c9d4ce]/80 overflow-hidden" aria-hidden>
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#4a6b5e]"
              style={{ width: protocolTrack }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[#c9d4ce]">
            {PROTOCOL.map((step, i) => (
              <motion.div
                key={step.index}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 32, clipPath: 'inset(20% 0 0 0)' }
                }
                whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                className="pr-protocol-step border-b sm:border-b-0 sm:border-r border-[#c9d4ce] last:border-r-0 px-0 sm:px-6 py-10 first:sm:pl-0 last:sm:pr-0 group"
              >
                <motion.span
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: EASE }}
                  className="block font-editorial text-5xl font-light text-[#d0d8d3] leading-none group-hover:text-[#8fb8a8] transition-colors duration-500"
                >
                  {step.index}
                </motion.span>
                <motion.div
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: EASE }}
                  className="mt-6 h-px w-8 bg-[#8fb8a8] origin-left group-hover:w-14 transition-all duration-300"
                />
                <h3 className="mt-5 font-editorial text-xl font-light text-[#16191c]">
                  {step.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-[#5a6660] font-light leading-relaxed">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Harvest quote ── */}
      <section
        ref={quoteRef}
        className="relative min-h-[80svh] flex items-end overflow-hidden border-t border-[#c9d4ce]"
      >
        <motion.img
          src={harvestImage}
          alt=""
          style={{ y: quoteY, scale: quoteScale }}
          className="absolute inset-0 w-full h-[130%] object-cover object-center will-change-transform"
        />
        <div className="absolute inset-0 pr-harvest-wash" />
        <div className="absolute inset-0 mineral-grain opacity-35 pointer-events-none" />

        <motion.div
          style={{ y: quoteTextY, opacity: quoteTextOpacity }}
          className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 pt-36"
        >
          <p className="font-mono-spec text-[10px] uppercase tracking-[0.28em] text-[#4a6b5e] mb-8">
            Harvest · {featured.suburb} · Directional narrative
          </p>
          <motion.span
            aria-hidden
            style={{ y: quoteMarkY }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="block font-editorial text-[clamp(4rem,12vw,8rem)] leading-none text-[#8fb8a8]/45 -mb-4 sm:-mb-8 will-change-transform"
          >
            “
          </motion.span>
          <blockquote className="font-editorial font-light text-[clamp(1.7rem,4.4vw,3.15rem)] leading-[1.18] text-[#16191c] max-w-3xl">
            <RevealWords text={featured.homeownerQuote.quote} reduceMotion={reduceMotion} />
          </blockquote>
          <motion.div
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="mt-8 h-px w-16 bg-[#4a6b5e]/50 origin-left"
          />
          <p className="mt-6 text-xs text-[#5a6660] font-light max-w-md leading-relaxed">
            {featured.homeownerQuote.author}
          </p>
          <p className="mt-2 font-mono-spec text-[10px] uppercase tracking-[0.18em] text-[#8a918c]">
            {featured.title} · {featured.timeline}
          </p>
          <button
            type="button"
            onClick={() => onNavigateExperience('case-study')}
            className="pr-cta group mt-10 inline-flex items-center gap-3"
          >
            <span className="pr-cta-line" />
            Read project proof
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </motion.div>
      </section>

      {/* ── Suburb cue ── */}
      <section
        ref={suburbRef}
        className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-[#c9d4ce] overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 pr-suburb-wash pointer-events-none"
          style={{ x: suburbWashX }}
        />
        <motion.div
          style={{ opacity: suburbOpacity, y: suburbY }}
          className="max-w-7xl mx-auto relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 py-4 will-change-transform"
        >
          <Reveal reduceMotion={reduceMotion} className="max-w-xl">
            <p className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-[#8fb8a8] mb-3">
              Local climate
            </p>
            <h2 className="font-editorial font-light text-2xl sm:text-3xl lg:text-[2.15rem] text-[#16191c] leading-snug">
              Formulated for Bayside salt, Inner North brick, and canopy-filtered east.
            </h2>
          </Reveal>
          <RevealLine reduceMotion={reduceMotion} from="right" delay={0.1}>
            <button
              type="button"
              onClick={() => onNavigateExperience('suburbs')}
              className="pr-cta group inline-flex items-center gap-3 shrink-0"
            >
              <span className="pr-cta-line" />
              Explore suburb fabric
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </RevealLine>
        </motion.div>
      </section>

      {/* ── Close ── */}
      <section
        ref={closeRef}
        id="pr-enquire"
        className="pr-close relative min-h-[80svh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-28 border-t border-[#c9d4ce] overflow-hidden"
      >
        <motion.div
          className="pr-close-orb"
          aria-hidden
          style={{ y: closeOrbY, scale: closeOrbScale }}
        />
        <motion.div
          style={{ y: closeTextY, opacity: closeOpacity, scale: closeScale }}
          className="max-w-7xl mx-auto w-full relative will-change-transform"
        >
          <Reveal reduceMotion={reduceMotion} y={36}>
            <p className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-[#8fb8a8] mb-5">
              Enquire
            </p>
            <h2 className="font-editorial font-light text-[clamp(2.75rem,8.5vw,5.5rem)] leading-[0.92] tracking-tight text-[#16191c] max-w-4xl">
              Request boards for{' '}
              <span className="italic text-[#4a6b5e]">your</span> daylight.
            </h2>
            <p className="mt-7 max-w-lg text-sm sm:text-base text-[#5a6660] font-light leading-relaxed">
              Limewash, plaster, clay, microcement—sampled under the light that hits your rooms.
              Decide with your hands, not a screen.
            </p>
            <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={onOpenAtelier}
                className="pm-cta inline-flex w-full sm:w-auto items-center justify-center gap-3 px-8 py-4 bg-[#16191c] text-base font-semibold text-[#f2f5f3]"
              >
                Open Material Atelier
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigateExperience('finishes')}
                className="pr-cta group inline-flex items-center justify-center gap-3 px-2 py-3 sm:justify-start"
              >
                <span className="pr-cta-line" />
                Or browse finishes first
              </button>
            </div>
            <p className="mt-8 font-mono-spec text-[10px] uppercase tracking-[0.2em] text-[#8a918c]">
              Swatch box · preferred date · suburb fabric
            </p>
          </Reveal>
        </motion.div>
      </section>
    </div>
  );
}
