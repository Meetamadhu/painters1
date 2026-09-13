import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent
} from 'react';
import { useReducedMotion } from 'motion/react';
import { PageExperience, TimeOfDay } from '../types';
import { lightingFilterFor, lightingWashFor } from '../data/timeConfigs';

export type Destination = {
  id: string;
  title: string;
  place: string;
  region: string;
  n: string;
  image: string;
  thumb: string;
  lede: string;
  panelIntro: string;
  panelBody: string;
  panelBody2: string;
  moreExperience: PageExperience;
};

const DESTINATIONS: Destination[] = [
  {
    id: 'melbourne',
    title: 'Painter Melbourne',
    place: 'Victoria',
    region: 'Painter Melbourne · Victoria',
    n: '01',
    image: '/hero-painter-melbourne.jpg',
    thumb: '/hero-painter-melbourne.jpg',
    lede: 'Mineral light for rooms — south morning to lamp hour, on one continuous plane.',
    panelIntro:
      'A Melbourne interior is never one light. The finish has to hold south morning, west rake, and lamp hour without collapsing into flat acrylic.',
    panelBody:
      'Gore Street and Carlton terraces teach the same lesson as any destination landscape: orientation first, then substrate, then the mineral coat that scatters rather than mirrors.',
    panelBody2:
      'Site photography leads the verified-pattern case. Directional stills stay labelled until authenticated client credit is on file.',
    moreExperience: 'case-study'
  },
  {
    id: 'inner-north',
    title: 'Inner North',
    place: 'Fitzroy',
    region: 'Painter Melbourne · Inner North',
    n: '02',
    image: '/hero-melbourne-inner-north.jpg',
    thumb: '/hero-melbourne-inner-north.jpg',
    lede: 'Victorian brick, narrow light, breathable coats — mineral finishes for terrace fabric.',
    panelIntro:
      'Inner North terraces ask for vapor-open systems. Plastic latex traps Melbourne humidity in the masonry; lime and clay let the wall breathe.',
    panelBody:
      'From Gore Street to Carlton, the brief is the same: read the substrate, protect heritage planes, and choose finishes that hold southern skylight without going flat.',
    panelBody2:
      'See the verified Gore Street narrative, then open the finishes lab for limewash and clay that belong on these walls.',
    moreExperience: 'case-study'
  },
  {
    id: 'bayside',
    title: 'Bayside',
    place: 'Brighton',
    region: 'Painter Melbourne · Bayside',
    n: '03',
    image: '/hero-melbourne-bayside.jpg',
    thumb: '/hero-melbourne-bayside.jpg',
    lede: 'Salt air, high UV, and rooms that still feel soft — coastal protocols for Port Phillip light.',
    panelIntro:
      'Bayside houses take marine salt and hard reflection. Ordinary trade films chalk early; mineral and elastomeric systems are specified for the bay.',
    panelBody:
      'Living rooms along Beach Road need depth that survives noon bleach and evening lamp — microcement, clay, and tuned sheens that stay honest under coastal daylight.',
    panelBody2:
      'Explore suburb fabric for Bayside protocols, then request boards to sample under your own west-facing light.',
    moreExperience: 'suburbs'
  }
];

const STRIP_N = 16;
const TRANSITION_MS = 1100;
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

interface DestinationWorldProps {
  onNavigateExperience: (exp: PageExperience) => void;
  onOpenAtelier: () => void;
  currentTime?: TimeOfDay;
}

export default function DestinationWorld({
  onNavigateExperience,
  onOpenAtelier,
  currentTime = 'golden'
}: DestinationWorldProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [titleA, setTitleA] = useState(DESTINATIONS[0].title);
  const [titleB, setTitleB] = useState(DESTINATIONS[1].title);
  const [swapping, setSwapping] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [open, setOpen] = useState(false);
  const [hot, setHot] = useState(false);
  const [ledeOut, setLedeOut] = useState(false);
  const [copy, setCopy] = useState(DESTINATIONS[0]);
  const [incomingSrc, setIncomingSrc] = useState<string | null>(null);
  const [baseSrc, setBaseSrc] = useState(DESTINATIONS[0].image);
  const [cursor, setCursor] = useState({ x: -200, y: -200 });
  const [finePointer, setFinePointer] = useState(false);

  const busyRef = useRef(false);
  const indexRef = useRef(0);
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const didSwipeRef = useRef(false);
  const panelScrollRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const applyCopy = useCallback((d: Destination, instant: boolean) => {
    if (instant) {
      setCopy(d);
      setLedeOut(false);
      return;
    }
    setLedeOut(true);
    window.setTimeout(() => {
      setCopy(d);
      setLedeOut(false);
    }, 180);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (busyRef.current) return;
      if (next < 0 || next >= DESTINATIONS.length || next === indexRef.current) return;

      const d = DESTINATIONS[next];
      busyRef.current = true;
      setAnimating(true);
      setTitleB(d.title);
      setSwapping(true);
      applyCopy(d, false);

      if (reduceMotion) {
        setBaseSrc(d.image);
        setTitleA(d.title);
        setSwapping(false);
        setIndex(next);
        busyRef.current = false;
        setAnimating(false);
        return;
      }

      setIncomingSrc(d.image);
      setAnimating(false);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setAnimating(true);
        });
      });

      window.setTimeout(() => {
        setBaseSrc(d.image);
        setIncomingSrc(null);
        setTitleA(d.title);
        setSwapping(false);
        setIndex(next);
        busyRef.current = false;
        setAnimating(false);
      }, TRANSITION_MS);
    },
    [applyCopy, reduceMotion]
  );

  const openPanel = () => {
    setOpen(true);
    if (panelScrollRef.current) panelScrollRef.current.scrollTop = 0;
  };

  const closePanel = () => setOpen(false);

  const onStagePointerDown = (e: ReactPointerEvent) => {
    const t = e.target as HTMLElement;
    if (t.closest('.dw-thumbs, .dw-open, .dw-panel, a, button')) return;
    if (open) return;
    dragRef.current = { x: e.clientX, y: e.clientY };
    didSwipeRef.current = false;
    try {
      stageRef.current?.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const onStagePointerMove = (e: ReactPointerEvent) => {
    if (finePointer && !open && !animating) {
      setCursor({ x: e.clientX, y: e.clientY });
    }
    if (!dragRef.current || busyRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.15) {
      didSwipeRef.current = true;
      const next = dx < 0 ? indexRef.current + 1 : indexRef.current - 1;
      dragRef.current = null;
      goTo(next);
    }
  };

  const onStagePointerUp = (e: ReactPointerEvent) => {
    if (dragRef.current && !didSwipeRef.current && !open) {
      if (
        Math.abs(e.clientX - dragRef.current.x) < 8 &&
        Math.abs(e.clientY - dragRef.current.y) < 8
      ) {
        openPanel();
      }
    }
    dragRef.current = null;
    didSwipeRef.current = false;
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        closePanel();
        return;
      }
      if (open) return;
      if (e.key === 'ArrowRight') goTo(indexRef.current + 1);
      if (e.key === 'ArrowLeft') goTo(indexRef.current - 1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [goTo, open]);

  const active = DESTINATIONS[index];
  const heroLabel = (t: string) => (t === 'Painter Melbourne' ? '' : t);
  const labelA = heroLabel(titleA);
  const labelB = heroLabel(titleB);
  const showDestinationTitle = Boolean(labelA || (swapping && labelB));
  const lightFilter = lightingFilterFor(currentTime);
  const lightWash = lightingWashFor(currentTime);

  return (
    <section
      className={`dw-world${open ? ' is-open' : ''}${animating ? ' is-animating' : ''}${
        hot && !open ? ' is-hot' : ''
      }`}
      aria-label="Destination experience"
      data-daylight={currentTime}
    >
      <div
        ref={stageRef}
        className="dw-stage"
        onPointerDown={onStagePointerDown}
        onPointerMove={onStagePointerMove}
        onPointerUp={onStagePointerUp}
        onPointerCancel={() => {
          dragRef.current = null;
          didSwipeRef.current = false;
        }}
        onPointerEnter={() => finePointer && setHot(true)}
        onPointerLeave={() => setHot(false)}
      >
        <div className="dw-media" aria-hidden="true">
          <div className="dw-base">
            <img
              src={baseSrc}
              alt=""
              decoding="async"
              style={{ filter: lightFilter, transition: 'filter 0.7s ease' }}
            />
          </div>
          {incomingSrc && (
            <div className="dw-incoming">
              <div className="dw-strips" style={{ ['--n' as string]: STRIP_N }}>
                {Array.from({ length: STRIP_N }, (_, i) => (
                  <div
                    key={`${incomingSrc}-${i}`}
                    className="dw-strip"
                    style={
                      {
                        ['--i' as string]: i,
                        ['--n' as string]: STRIP_N,
                        animationTimingFunction: EASE
                      } as CSSProperties
                    }
                  >
                    <img
                      src={incomingSrc}
                      alt=""
                      decoding="async"
                      style={{ filter: lightFilter, transition: 'filter 0.7s ease' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="dw-grade" />
          <div
            className="dw-daylight-wash"
            style={{ background: lightWash, transition: 'background 0.7s ease, opacity 0.7s ease' }}
          />
        </div>

        <div className="dw-ui">
          <div className="dw-hero-copy">
            <h1 className="dw-brand">Painter Melbourne</h1>
            {showDestinationTitle && (
              <div className={`dw-title-mask${swapping ? ' is-swap' : ''}`}>
                <div className="dw-title-track">
                  <p className="dw-title">{labelA || '\u00a0'}</p>
                  <p className="dw-title" aria-hidden="true">
                    {labelB || '\u00a0'}
                  </p>
                </div>
              </div>
            )}
            <button type="button" className="dw-open" onClick={openPanel}>
              Explore <i aria-hidden="true" />
            </button>
          </div>
          <p className={`dw-lede${ledeOut ? ' is-out' : ''}`}>{copy.lede}</p>
          <p className="dw-place">{copy.place}</p>
        </div>

        <div className="dw-index">
          {active.n} — 0{DESTINATIONS.length}
        </div>

        <nav className="dw-thumbs" aria-label="Destinations">
          {DESTINATIONS.map((d, i) => (
            <button
              key={d.id}
              type="button"
              className={i === index ? 'is-on' : ''}
              aria-label={`Destination ${d.n}: ${d.title}`}
              onClick={() => {
                if (open) closePanel();
                goTo(i);
              }}
            >
              <img src={d.thumb} alt="" width={144} height={96} loading="lazy" decoding="async" />
              <span>{d.n}</span>
            </button>
          ))}
        </nav>

        {finePointer && (
          <div
            className="dw-cursor"
            aria-hidden="true"
            style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
          >
            Explore
          </div>
        )}
      </div>

      <aside className="dw-panel" aria-hidden={!open}>
        <div className="dw-panel__bar">
          <span className="dw-panel__label">
            {copy.place} · {copy.n}
          </span>
          <button type="button" className="dw-panel__close" onClick={closePanel}>
            Close
          </button>
        </div>
        <div className="dw-panel__scroll" ref={panelScrollRef}>
          <img className="dw-panel__shot" src={copy.image} alt="" width={900} height={560} />
          <p className="dw-panel__kicker">{copy.region}</p>
          <h2 className="dw-panel__title">{copy.title}</h2>
          <p className="dw-panel__body">{copy.panelIntro}</p>
          <p className="dw-panel__body">{copy.panelBody}</p>
          <p className="dw-panel__body">{copy.panelBody2}</p>
          <p className="dw-panel__credit">
            {copy.id === 'melbourne' || copy.id === 'inner-north' || copy.id === 'bayside'
              ? `Painter Melbourne · ${copy.place}`
              : 'Directional landscape · conceptual atmosphere'}
          </p>
          <button
            type="button"
            className="dw-panel__more"
            onClick={() => {
              closePanel();
              if (copy.moreExperience === 'quote-flow') onOpenAtelier();
              else onNavigateExperience(copy.moreExperience);
            }}
          >
            Discover More
          </button>
        </div>
      </aside>
    </section>
  );
}
