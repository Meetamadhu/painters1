import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { PageExperience } from '../../types';
import { FINISHES_DATA } from '../../data/finishesData';
import { REAL_PROJECTS } from '../../data/projectsData';

interface AtelierWorldExperienceProps {
  onNavigateExperience: (exp: PageExperience) => void;
  onOpenAtelier: () => void;
}

const CHAPTERS = [
  {
    id: 'limewash',
    index: '01',
    label: 'Lime',
    title: 'Breathable mineral bloom for living walls',
    body: 'Slaked lime that petrifies into masonry—cloud-soft depth for Melbourne terraces and quiet bedrooms.',
    cta: 'See Limewash',
    image: FINISHES_DATA[0].roomImage,
    experience: 'finishes' as PageExperience
  },
  {
    id: 'marmorino',
    index: '02',
    label: 'Plaster',
    title: 'Burnished marble permanence under daylight',
    body: 'Hand-troweled Carrara dust and aged lime—cool stone touch for parlours, stairs, and feature planes.',
    cta: 'See Marmorino',
    image: FINISHES_DATA[1].roomImage,
    experience: 'finishes' as PageExperience
  },
  {
    id: 'clay',
    index: '03',
    label: 'Clay',
    title: 'Roman clay for heritage fabric and soft light',
    body: 'Earthen mineral coats that move with the building—tuned to bungalows, brick, and coastal humidity.',
    cta: 'See Roman Clay',
    image: FINISHES_DATA[2]?.roomImage ?? FINISHES_DATA[0].roomImage,
    experience: 'finishes' as PageExperience
  },
  {
    id: 'proof',
    index: '04',
    label: 'Proof',
    title: 'Directional narratives from Melbourne rooms',
    body: 'Gore Street leads with site photography; other stories stay directional until authenticated client shoots land.',
    cta: 'View Project Proof',
    image: REAL_PROJECTS[0].afterImage,
    experience: 'case-study' as PageExperience
  },
  {
    id: 'suburbs',
    index: '05',
    label: 'Suburb',
    title: 'Formulated for local climate and fabric',
    body: 'From Bayside salt to Fitzroy double-brick—protocols that respect micro-climate and heritage covenants.',
    cta: 'Explore Suburbs',
    image: FINISHES_DATA[3]?.roomImage ?? FINISHES_DATA[0].roomImage,
    experience: 'suburbs' as PageExperience
  }
];

const PROCESS = [
  {
    title: 'We sample',
    body: 'Physical mineral boards in your own daylight—before a brush touches the wall.'
  },
  {
    title: 'We prepare',
    body: 'Substrate reading, clean-room protection, and breathability checks for Melbourne masonry.'
  },
  {
    title: 'We finish',
    body: 'Hand-applied coats that endure—crafted walls that feel alive, not coated.'
  }
];

export default function AtelierWorldExperience({
  onNavigateExperience,
  onOpenAtelier
}: AtelierWorldExperienceProps) {
  const reduceMotion = useReducedMotion();
  const quoteRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: quoteRef,
    offset: ['start end', 'end start']
  });
  const quoteY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['-8%', '8%']);
  const quoteOverlay = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.4, 0.62]);

  return (
    <div className="aw-page min-h-screen text-[#1a1a18] pb-24">
      {/* Side chapter index */}
      <aside className="aw-rail hidden xl:flex">
        {CHAPTERS.map((ch) => (
          <a key={ch.id} href={`#aw-${ch.id}`} className="aw-rail-item group">
            <span className="aw-rail-index">{ch.index}</span>
            <span className="aw-rail-label">{ch.label}</span>
          </a>
        ))}
      </aside>

      {/* ── Hero ── */}
      <section className="relative min-h-svh flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hero-painter-melbourne.jpg"
            alt="Mineral walls in Melbourne daylight"
            className={`absolute inset-0 w-full h-full object-cover object-center ${reduceMotion ? '' : 'animate-pm-pan'}`}
          />
          <div className="absolute inset-0 aw-hero-wash" />
          <div className="absolute inset-0 mineral-grain opacity-40 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 pt-28">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-7"
          >
            <span className="h-px w-10 bg-[#2d453c]" />
            <p className="font-mono-spec text-[10px] uppercase tracking-[0.34em] text-[#2d453c]">
              Made to last
            </p>
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="font-editorial font-light text-[clamp(2.75rem,9vw,7rem)] leading-[0.9] tracking-tight text-[#12110f] max-w-5xl"
          >
            <span className="block">Surfaces for people,</span>
            <span className="block italic text-[#2d453c] mt-1 sm:mt-2">made for light.</span>
          </motion.h1>

          <motion.div
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 h-px w-28 origin-left bg-linear-to-r from-[#2d453c] to-transparent"
          />

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-7 max-w-lg text-base sm:text-lg font-light text-[#2f3632] leading-relaxed"
          >
            Mineral limewash, burnished plaster, and clay—crafted for Melbourne rooms that should feel lived-in, not coated.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <a
              href="#aw-chapters"
              className="group inline-flex items-center gap-3 font-mono-spec text-[10px] uppercase tracking-[0.28em] text-[#2d453c] hover:text-[#12110f] transition-colors"
            >
              Scroll to explore
              <span className="inline-flex h-8 w-8 items-center justify-center border border-[#2d453c]/35 group-hover:border-[#2d453c] transition-colors">
                <ArrowDown className="w-3.5 h-3.5 animate-pm-float" />
              </span>
            </a>
            <button
              type="button"
              onClick={onOpenAtelier}
              className="pm-cta inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a1a18] text-[11px] font-semibold tracking-wide text-[#f4f2ee]"
            >
              Request swatch box
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#2d453c]/35 to-transparent" />
      </section>

      {/* ── Chapters ── */}
      <section id="aw-chapters" className="pt-2">
        {CHAPTERS.map((ch, i) => {
          const reverse = i % 2 === 1;
          return (
            <article
              key={ch.id}
              id={`aw-${ch.id}`}
              className={`aw-chapter border-t border-[#d8d4cc] ${i % 2 === 0 ? 'bg-[#f4f2ee]' : 'bg-[#efece6]'}`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                    reverse ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <motion.div
                    className="lg:col-span-5 space-y-6"
                    initial={reduceMotion ? false : { opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-editorial text-5xl sm:text-6xl font-light text-[#c5c0b6] leading-none">
                        {ch.index}
                      </span>
                      <div>
                        <p className="font-mono-spec text-[10px] uppercase tracking-[0.3em] text-[#4a6b5e]">
                          {ch.label}
                        </p>
                        <div className="mt-2 h-px w-12 bg-[#4a6b5e]/50" />
                      </div>
                    </div>

                    <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[2.75rem] font-light leading-[1.1] text-[#12110f]">
                      {ch.title}
                    </h2>
                    <p className="text-sm sm:text-[0.95rem] font-light text-[#4a524e] leading-relaxed max-w-md">
                      {ch.body}
                    </p>
                    <button
                      type="button"
                      onClick={() => onNavigateExperience(ch.experience)}
                      className="aw-link group inline-flex items-center gap-3 pt-1 font-mono-spec text-[11px] uppercase tracking-[0.2em] text-[#2d453c]"
                    >
                      <span className="aw-link-line" />
                      {ch.cta}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </button>
                  </motion.div>

                  <motion.button
                    type="button"
                    onClick={() => onNavigateExperience(ch.experience)}
                    className="aw-media group lg:col-span-7 relative aspect-4/3 lg:aspect-5/4 overflow-hidden text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2d453c]"
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, clipPath: reverse ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }
                    }
                    whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img
                      src={ch.image}
                      alt={ch.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#12110f]/55 via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-[#12110f]/10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 flex items-end justify-between gap-4">
                      <p className="font-mono-spec text-[10px] uppercase tracking-[0.22em] text-[#f4f2ee]/90">
                        {ch.index} · {ch.label}
                      </p>
                      <span className="font-mono-spec text-[10px] uppercase tracking-[0.18em] text-[#f4f2ee] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        Open →
                      </span>
                    </div>
                  </motion.button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* ── Manifesto ── */}
      <section className="border-t border-[#d8d4cc] aw-manifesto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <motion.div
              className="lg:col-span-4"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-mono-spec text-[10px] uppercase tracking-[0.28em] text-[#4a6b5e]">
                Painter Melbourne · Est. atelier
              </p>
              <div className="mt-8 relative aspect-3/4 overflow-hidden max-w-sm aw-media group">
                <img
                  src={FINISHES_DATA[0].macroImage}
                  alt="Macro mineral surface"
                  className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-[#12110f]/10" />
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-8 lg:pt-6"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              <p className="font-mono-spec text-[10px] uppercase tracking-[0.28em] text-[#8a918c] mb-6">
                Our calling
              </p>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[2.85rem] font-light leading-[1.2] text-[#12110f] max-w-3xl">
                Going beyond the expected is our calling. True mineral craft demands patience aligned with daylight—and walls that keep the building on its side.
              </h2>
              <div className="mt-8 h-px w-20 bg-[#2d453c]/40" />
              <p className="mt-8 max-w-2xl text-sm sm:text-base font-light text-[#4a524e] leading-relaxed">
                We keep to a journey of careful preparation and hand application, meticulously crafting each room so Melbourne light can move through the surface—not bounce off a plastic film.
              </p>
              <button
                type="button"
                onClick={() => onNavigateExperience('finishes')}
                className="aw-link group mt-10 inline-flex items-center gap-3 font-mono-spec text-[11px] uppercase tracking-[0.2em] text-[#2d453c]"
              >
                <span className="aw-link-line" />
                Enter the finish library
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="border-t border-[#d8d4cc] bg-[#f4f2ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div>
              <p className="font-mono-spec text-[10px] uppercase tracking-[0.28em] text-[#4a6b5e]">
                How we work
              </p>
              <h2 className="mt-3 font-editorial text-3xl sm:text-4xl font-light text-[#12110f]">
                Sample. Prepare. Finish.
              </h2>
            </div>
            <p className="max-w-xs text-xs font-light text-[#6a736e] leading-relaxed">
              A quiet protocol—daylight first, then craft—so every wall earns permanence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 border-t border-[#c9c4ba]">
            {PROCESS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.12 }}
                className={`aw-process-step relative pt-10 pb-4 md:pr-10 ${
                  i < PROCESS.length - 1 ? 'md:border-r border-[#c9c4ba] border-b md:border-b-0 pb-10 md:pb-4' : ''
                }`}
              >
                <p className="font-editorial text-7xl sm:text-8xl font-light text-[#e0dbd2] leading-none select-none">
                  0{i + 1}
                </p>
                <h3 className="-mt-6 relative font-editorial text-2xl sm:text-3xl font-light text-[#12110f]">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm font-light text-[#4a524e] leading-relaxed max-w-xs">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section ref={quoteRef} className="relative min-h-[75svh] flex items-end overflow-hidden">
        <motion.img
          src={REAL_PROJECTS[0].afterImage}
          alt=""
          style={{ y: quoteY }}
          className="absolute inset-0 w-full h-[120%] object-cover will-change-transform"
        />
        <motion.div
          className="absolute inset-0 bg-[#12110f]"
          style={{ opacity: quoteOverlay }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#12110f]/80 via-transparent to-[#12110f]/20" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <motion.blockquote
            className="max-w-3xl"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <span className="font-editorial text-6xl text-[#8fb8a8]/50 leading-none">“</span>
            <p className="mt-2 font-editorial text-3xl sm:text-4xl lg:text-5xl font-light italic text-[#f4f2ee] leading-snug">
              We think walls should look and feel good while breathing with the building.
            </p>
            <footer className="mt-10 flex items-center gap-4">
              <span className="h-px w-10 bg-[#8fb8a8]/60" />
              <span className="font-mono-spec text-[10px] uppercase tracking-[0.24em] text-[#c9d4ce]">
                Painter Melbourne · Material atelier
              </span>
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="border-t border-[#d8d4cc] aw-close">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono-spec text-[10px] uppercase tracking-[0.28em] text-[#4a6b5e]">
              Made to last, designed for daylight
            </p>
            <h2 className="mt-5 font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-[#12110f] leading-[1.05]">
              Begin with a swatch
              <br />
              <span className="italic text-[#2d453c]">in your own light.</span>
            </h2>
            <div className="mx-auto mt-8 h-px w-16 bg-[#2d453c]/45" />
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={onOpenAtelier}
                className="pm-cta inline-flex items-center gap-2 px-8 py-4 bg-[#1a1a18] text-sm font-semibold text-[#f4f2ee] shadow-[0_16px_40px_rgba(18,17,15,0.18)]"
              >
                Request a swatch box
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigateExperience('guidance')}
                className="px-8 py-4 text-sm font-medium text-[#1a1a18] border border-[#1a1a18]/30 hover:bg-[#1a1a18]/05 transition-colors"
              >
                Test the daylight lab
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
