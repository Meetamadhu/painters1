import { useEffect, useRef, useState } from 'react';
import { PageExperience, ContestSection, TimeOfDay } from '../types';
import { FileText, X, ArrowRight, Menu } from 'lucide-react';
import LightSimulatorBar from './LightSimulatorBar';

interface NavigationProps {
  currentMode: 'prototype' | 'contest';
  onModeChange: (mode: 'prototype' | 'contest') => void;
  currentExperience: PageExperience;
  onExperienceChange: (exp: PageExperience) => void;
  currentContestSection: ContestSection;
  onContestSectionChange: (section: ContestSection) => void;
  swatchCartCount: number;
  onOpenAtelier: () => void;
  currentTime: TimeOfDay;
  onTimeChange: (time: TimeOfDay) => void;
}

export default function Navigation({
  currentMode,
  onModeChange,
  currentExperience,
  onExperienceChange,
  currentContestSection,
  onContestSectionChange,
  swatchCartCount,
  onOpenAtelier,
  currentTime,
  onTimeChange
}: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuWrapRef = useRef<HTMLDivElement>(null);

  const experiences: { id: PageExperience; label: string; index: string }[] = [
    { id: 'homepage', label: 'Brand World', index: '01' },
    { id: 'finishes', label: 'Finish Exploration', index: '02' },
    { id: 'case-study', label: 'Project Proof', index: '03' },
    { id: 'suburbs', label: 'Suburb Fabric', index: '04' },
    { id: 'guidance', label: 'Decision Lab', index: '05' },
    { id: 'quote-flow', label: 'Material Atelier', index: '06' },
  ];

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (menuWrapRef.current && !menuWrapRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
    };
  }, [menuOpen]);

  const go = (exp: PageExperience) => {
    onModeChange('prototype');
    onExperienceChange(exp);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#f2f5f3]/90 backdrop-blur-xl border-b border-[#c9d4ce]">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
          <button
            type="button"
            onClick={() => go('homepage')}
            className="group text-left"
          >
            <span className="font-editorial text-lg sm:text-xl tracking-[0.12em] text-[#16191c] group-hover:text-[#4a6b5e] transition-colors">
              PAINTER MELBOURNE
            </span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onOpenAtelier}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-[11px] font-mono-spec uppercase tracking-wider text-[#16191c]/80 hover:text-[#8fb8a8] transition-colors"
            >
              Atelier
              {swatchCartCount > 0 && (
                <span className="text-[#8fb8a8]">{swatchCartCount}</span>
              )}
            </button>

            <div ref={menuWrapRef} className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="pm-menu-curtain"
                className={`inline-flex items-center gap-2 px-4 py-2 text-[11px] font-mono-spec uppercase tracking-[0.18em] transition-colors ${
                  menuOpen
                    ? 'bg-[#1a1f1c] text-[#f4f6f4]'
                    : 'text-[#16191c] bg-[#8fb8a8] hover:bg-[#a8c9bb]'
                }`}
              >
                {menuOpen ? (
                  <>
                    Close
                    <X className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    Open Menu
                    <Menu className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {/* Curtain panel — draws down from the menu button */}
              {menuOpen && (
                <div
                  id="pm-menu-curtain"
                  role="menu"
                  className="pm-menu-curtain absolute top-full right-0 mt-2 w-[min(88vw,16rem)] sm:w-64 max-h-[min(78vh,36rem)] overflow-y-auto border border-[#c9d4ce] bg-[#ffffff] shadow-[0_18px_40px_rgba(22,25,28,0.14)]"
                >
                  {/* Fabric folds cue */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-linear-to-b from-[#8fb8a8]/15 to-transparent"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 w-px bg-linear-to-b from-[#8fb8a8]/50 via-transparent to-transparent"
                  />

                  <div className="relative px-4 sm:px-5 pt-4 pb-2">
                    <p className="font-mono-spec text-[10px] uppercase tracking-[0.22em] text-[#8fb8a8]">
                      Navigate the experience
                    </p>
                  </div>

                  <nav className="relative px-2 sm:px-3 pb-2">
                    {experiences.map((item, i) => {
                      const active = currentMode === 'prototype' && currentExperience === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="menuitem"
                          onClick={() => go(item.id)}
                          className={`pm-menu-curtain-item group w-full flex items-baseline gap-2.5 px-2 py-2.5 border-b border-[#c9d4ce] text-left transition-colors ${
                            active ? 'border-[#8fb8a8]' : 'hover:border-[#8fb8a8]/45'
                          }`}
                          style={{ animationDelay: `${0.18 + i * 0.055}s` }}
                        >
                          <span className="font-mono-spec text-[10px] text-[#8fb8a8] w-5 shrink-0">
                            {item.index}
                          </span>
                          <span
                            className={`font-editorial text-lg sm:text-xl font-light tracking-tight transition-transform duration-300 group-hover:translate-x-1 ${
                              active
                                ? 'text-[#8fb8a8]'
                                : 'text-[#16191c] group-hover:text-[#8fb8a8]'
                            }`}
                          >
                            {item.label}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 ml-auto text-[#8fb8a8] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                        </button>
                      );
                    })}
                  </nav>

                  <div className="relative px-4 sm:px-5 py-4 border-t border-[#c9d4ce] flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onModeChange('prototype');
                        setMenuOpen(false);
                      }}
                      className={`pm-menu-curtain-item px-3 py-2 text-[10px] font-mono-spec uppercase tracking-wider transition-colors ${
                        currentMode === 'prototype'
                          ? 'bg-[#4a6b5e] text-[#f4f6f4]'
                          : 'border border-[#9aaba3] text-[#16191c] hover:border-[#8fb8a8]'
                      }`}
                      style={{ animationDelay: '0.52s' }}
                    >
                      Prototype
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onModeChange('contest');
                        setMenuOpen(false);
                      }}
                      className={`pm-menu-curtain-item px-3 py-2 text-[10px] font-mono-spec uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors ${
                        currentMode === 'contest'
                          ? 'bg-[#4a6b5e] text-[#f4f6f4]'
                          : 'border border-[#9aaba3] text-[#16191c] hover:border-[#8fb8a8]'
                      }`}
                      style={{ animationDelay: '0.58s' }}
                    >
                      <FileText className="w-3 h-3" />
                      Dossier
                    </button>

                    {currentMode === 'contest' && (
                      <select
                        value={currentContestSection}
                        onChange={(e) => onContestSectionChange(e.target.value as ContestSection)}
                        className="pm-menu-curtain-item w-full mt-1 bg-transparent border-b border-[#9aaba3] text-[#16191c] text-[11px] py-2 focus:outline-none focus:border-[#8fb8a8]"
                        style={{ animationDelay: '0.64s' }}
                      >
                        <option value="all">Complete dossier</option>
                        <option value="visual-direction">01. Visual Direction</option>
                        <option value="walkthrough-video">02. Walkthrough</option>
                        <option value="design-system">03. Design System</option>
                        <option value="transformation-engine">04. Transformation</option>
                        <option value="performance-mobile">05. Performance</option>
                        <option value="proof-vs-inspiration">06. Proof vs Inspiration</option>
                        <option value="homeowner-psychology">07. Psychology</option>
                        <option value="past-work">08. Past Work</option>
                        <option value="figma-tokens">09. Source Files</option>
                      </select>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {currentMode === 'prototype' && (
          <LightSimulatorBar currentTime={currentTime} onTimeChange={onTimeChange} />
        )}
      </header>

      {/* Soft page dim while curtain is open */}
      {menuOpen && (
        <div
          className="pm-menu-backdrop fixed inset-0 z-40 bg-[#16191c]/20 backdrop-blur-[2px]"
          aria-hidden
        />
      )}
    </>
  );
}
