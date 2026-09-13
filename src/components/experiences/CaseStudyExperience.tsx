import { useEffect, useState } from 'react';
import { REAL_PROJECTS } from '../../data/projectsData';
import { FINISHES_DATA } from '../../data/finishesData';
import { PageExperience } from '../../types';
import ProofBadge from '../ProofBadge';
import CleanRoomProtocol from '../CleanRoomProtocol';
import { Calendar, Clock, MapPin, ArrowRight, Layers } from 'lucide-react';

interface CaseStudyExperienceProps {
  onOpenAtelier: () => void;
  initialProjectId?: string | null;
  onNavigateExperience?: (exp: PageExperience) => void;
  onSelectFinishId?: (finishId: string) => void;
}

export default function CaseStudyExperience({
  onOpenAtelier,
  initialProjectId,
  onNavigateExperience,
  onSelectFinishId
}: CaseStudyExperienceProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    initialProjectId && REAL_PROJECTS.some(p => p.id === initialProjectId)
      ? initialProjectId
      : REAL_PROJECTS[0].id
  );
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  useEffect(() => {
    if (initialProjectId && REAL_PROJECTS.some(p => p.id === initialProjectId)) {
      setSelectedProjectId(initialProjectId);
      setSliderPosition(50);
    }
  }, [initialProjectId]);

  const activeProject = REAL_PROJECTS.find(p => p.id === selectedProjectId) || REAL_PROJECTS[0];
  const relatedFinishes = FINISHES_DATA.filter(f => activeProject.relatedFinishIds.includes(f.id));

  return (
    <div className="min-h-screen text-[#16191c] py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
      <div className="mb-10 space-y-4">
        <div className="flex flex-wrap gap-2">
          <ProofBadge kind="verified-commission" compact />
          <ProofBadge kind="directional-narrative" compact />
        </div>
        <div>
          <p className="font-mono-spec text-[11px] uppercase tracking-[0.18em] text-[#8fb8a8] mb-2">
            Experience 03 · Project proof
          </p>
          <h1 className="font-editorial text-4xl sm:text-5xl font-light text-[#16191c]">
            Melbourne commissions, substrate stories, and honest imagery labels
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#849994] max-w-2xl font-light leading-relaxed">
            Gore Street leads as a verified-pattern case with site photography. Other suburbs stay
            directional narratives until authenticated client shoots replace Unsplash placeholders.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
        {REAL_PROJECTS.map((proj) => (
          <button
            key={proj.id}
            type="button"
            onClick={() => {
              setSelectedProjectId(proj.id);
              setSliderPosition(50);
            }}
            className={`px-4 py-2 text-xs font-medium transition-all whitespace-nowrap flex items-center gap-2 border ${
              selectedProjectId === proj.id
                ? 'bg-[#4a6b5e] text-[#f4f6f4] font-semibold border-[#8fb8a8]'
                : 'bg-[#141C1E] border-[#2C3A3C] text-[#849994] hover:text-[#16191c]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{proj.suburb} · {proj.title}</span>
          </button>
        ))}
      </div>

      <div className="bg-[#141C1E] border border-[#354345] overflow-hidden mb-10">
        <div className="bg-[#121A1C] border-b border-[#2C3A3C] px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <ProofBadge kind={activeProject.proofStatus} compact />
          <div className="flex items-center gap-4 text-xs font-mono-spec text-[#849994]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#8fb8a8]" />
              {activeProject.completionYear}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#8fb8a8]" />
              {activeProject.timeline}
            </span>
          </div>
        </div>

        <div
          className="relative h-[420px] sm:h-[520px] select-none cursor-ew-resize overflow-hidden bg-[#16191c]"
          onMouseMove={(e) => {
            if (e.buttons === 1) {
              const rect = e.currentTarget.getBoundingClientRect();
              setSliderPosition(((e.clientX - rect.left) / rect.width) * 100);
            }
          }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setSliderPosition(((e.clientX - rect.left) / rect.width) * 100);
          }}
          onTouchMove={(e) => {
            if (e.touches[0]) {
              const rect = e.currentTarget.getBoundingClientRect();
              setSliderPosition(((e.touches[0].clientX - rect.left) / rect.width) * 100);
            }
          }}
        >
          <img src={activeProject.afterImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-y-0 left-0 overflow-hidden border-r border-[#8fb8a8]" style={{ width: `${sliderPosition}%` }}>
            <div className="absolute inset-y-0 left-0 h-full" style={{ width: `${100 / Math.max(sliderPosition, 1) * 100}%` }}>
              <img src={activeProject.beforeImage} alt="" className="h-full w-full object-cover" style={{ width: '100vw', maxWidth: 'none' }} />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] font-mono-spec uppercase tracking-wider">
            <span className="bg-[#ffffff]/90 px-2 py-1 text-[#16191c]">Before</span>
            <span className="bg-[#ffffff]/90 px-2 py-1 text-[#8fb8a8]">After</span>
          </div>
          <p className="absolute top-4 left-4 right-4 text-[11px] text-[#c5d0cb] bg-[#16191c]/75 px-3 py-2 max-w-lg">
            {activeProject.imageSourceNote}
          </p>
        </div>

        <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-editorial text-3xl sm:text-4xl font-light text-[#16191c]">{activeProject.title}</h2>
            <p className="text-xs font-mono-spec text-[#8fb8a8]">
              {activeProject.suburb} · {activeProject.architectureEra}
            </p>
            <p className="text-sm text-[#5a6660] font-light leading-relaxed">{activeProject.transformationStory}</p>
            <blockquote className="border-l border-[#8fb8a8] pl-5 font-editorial italic text-[#d5e0db]">
              “{activeProject.homeownerQuote.quote}”
              <span className="block not-italic font-mono-spec text-xs text-[#6a7a74] mt-2">
                — {activeProject.homeownerQuote.author}
              </span>
            </blockquote>
            <p className="text-xs text-[#849994] leading-relaxed">
              <span className="text-[#8fb8a8] font-mono-spec uppercase tracking-wider mr-2">Substrate</span>
              {activeProject.architecturalNotes}
            </p>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <div>
              <p className="text-[10px] font-mono-spec uppercase tracking-wider text-[#5A716C] mb-2">Finishes used</p>
              <ul className="space-y-1.5 text-xs text-[#c5d0cb]">
                {activeProject.finishesUsed.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#8fb8a8] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeProject.colorPalette.map((c) => (
                <div key={c.hex} className="flex items-center gap-2 text-[11px] text-[#849994]">
                  <span className="w-4 h-4 border border-[#c9d4ce]" style={{ backgroundColor: c.hex }} />
                  {c.name}
                </div>
              ))}
            </div>
            {relatedFinishes.length > 0 && onNavigateExperience && (
              <div className="pt-2 border-t border-[#2C3A3C]">
                <p className="text-[10px] font-mono-spec uppercase tracking-wider text-[#5A716C] mb-2">
                  Explore related finishes
                </p>
                <div className="flex flex-wrap gap-2">
                  {relatedFinishes.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => {
                        onSelectFinishId?.(f.id);
                        onNavigateExperience('finishes');
                      }}
                      className="text-xs px-3 py-1.5 border border-[#c9d4ce] text-[#16191c] hover:border-[#8fb8a8] transition-colors"
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-3 pt-2">
              {onNavigateExperience && (
                <button
                  type="button"
                  onClick={() => onNavigateExperience('suburbs')}
                  className="text-xs px-4 py-2.5 border border-[#c9d4ce] text-[#16191c] hover:border-[#8fb8a8]"
                >
                  Suburb fabric
                </button>
              )}
              <button
                type="button"
                onClick={onOpenAtelier}
                className="pm-cta text-xs px-5 py-2.5 bg-[#8fb8a8] font-semibold text-[#16191c] inline-flex items-center gap-2"
              >
                Request atelier consult
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <CleanRoomProtocol />
    </div>
  );
}
