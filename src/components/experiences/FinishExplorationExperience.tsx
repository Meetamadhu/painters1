import { useState } from 'react';
import { TimeOfDay, FinishItem } from '../../types';
import { FINISHES_DATA } from '../../data/finishesData';
import { REAL_PROJECTS } from '../../data/projectsData';
import { TIME_CONFIGS, lightingFilterFor, lightingWashFor } from '../../data/timeConfigs';
import ProofBadge from '../ProofBadge';
import { Sparkles, Sun, Check, Plus, Layers, Compass, ArrowRight, Eye, ZoomIn } from 'lucide-react';

interface FinishExplorationProps {
  currentTime: TimeOfDay;
  onTimeChange: (time: TimeOfDay) => void;
  selectedFinish: FinishItem | null;
  onSelectFinish: (finish: FinishItem) => void;
  onAddSwatch: (finish: FinishItem) => void;
  swatchList: FinishItem[];
  onOpenAtelier: () => void;
  onOpenCaseStudy?: (projectId: string) => void;
}

export default function FinishExplorationExperience({
  currentTime,
  onTimeChange,
  selectedFinish,
  onSelectFinish,
  onAddSwatch,
  swatchList,
  onOpenAtelier,
  onOpenCaseStudy
}: FinishExplorationProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeFinishId, setActiveFinishId] = useState<string>(
    selectedFinish ? selectedFinish.id : FINISHES_DATA[0].id
  );
  const [viewMode, setViewMode] = useState<'room' | 'macro'>('room');

  const activeFinish = FINISHES_DATA.find(f => f.id === activeFinishId) || FINISHES_DATA[0];
  const timeInfo = TIME_CONFIGS[currentTime];

  const categories = ['All', 'Mineral & Lime', 'Plaster & Clay', 'Textured & Concrete', 'Architectural & Spray'];

  const filteredFinishes = activeCategory === 'All'
    ? FINISHES_DATA
    : FINISHES_DATA.filter(f => f.category === activeCategory);

  const isAlreadyInCart = swatchList.some(s => s.id === activeFinish.id);
  const relatedProjects = REAL_PROJECTS.filter(p => p.relatedFinishIds.includes(activeFinish.id));

  const getLightingFilter = () => lightingFilterFor(currentTime);

  return (
    <div className="min-h-screen text-[#16191c] py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
      {/* Header & Subtitle */}
      <div className="mb-10 space-y-3">
        <ProofBadge kind="studio-specimen" />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A2426] border border-[#c9d4ce] text-xs text-[#8fb8a8]">
          <Layers className="w-3.5 h-3.5" />
          <span className="font-mono-spec uppercase tracking-wider text-[11px]">Experience 02 · Material Library</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-light text-[#16191c]">
          The Specialist Finishes & Tactile Surface Lab
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#849994] max-w-2xl font-light leading-relaxed">
          Explore the mineral science, light response, and tactile character of eight master-crafted wall and joinery coatings. Change Melbourne daylight conditions in real-time.
        </p>
      </div>

      {/* Category Pills & Daylight Switcher Strip */}
      <div className="bg-[#141C1E] p-4 rounded-xl border border-[#2B2721] mb-8 flex flex-wrap items-center justify-between gap-4">
        {/* Category filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#4a6b5e] text-[#f4f6f4] font-semibold'
                  : 'bg-[#1E282A] text-[#849994] hover:text-[#16191c]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Daylight Quick Selector */}
        <div className="flex items-center gap-2 text-xs font-mono-spec">
          <span className="text-[#5D746F] hidden sm:inline">Melbourne Daylight:</span>
          {(['morning', 'midday', 'golden', 'evening'] as TimeOfDay[]).map((t) => (
            <button
              key={t}
              onClick={() => onTimeChange(t)}
              className={`px-2.5 py-1 rounded-md transition-all uppercase text-[10px] ${
                currentTime === t
                  ? 'bg-[#4a6b5e] text-[#f4f6f4] font-bold'
                  : 'bg-[#10181A] text-[#6a7a74] hover:text-[#16191c]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Finish Selector Cards (Left) & Deep Macro Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Finish Thumbnails with Real Photos */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono-spec text-[#5D746F] uppercase tracking-wider mb-2">
            Select Specimen ({filteredFinishes.length} Finishes Available)
          </div>

          <div className="space-y-2.5 max-h-175 overflow-y-auto pr-1">
            {filteredFinishes.map((finish) => {
              const isSelected = finish.id === activeFinish.id;
              return (
                <div
                  key={finish.id}
                  onClick={() => {
                    setActiveFinishId(finish.id);
                    onSelectFinish(finish);
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${
                    isSelected
                      ? 'bg-[#1C2628] border-[#8fb8a8] shadow-lg -translate-x-0.5'
                      : 'bg-[#10181A] border-[#292520] hover:border-[#435352] hover:bg-[#162022]'
                  }`}
                >
                  {/* Photo Thumbnail */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-white/10 relative">
                    <img 
                      src={finish.roomImage} 
                      alt={finish.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                  </div>

                  <div className="grow min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-semibold truncate ${isSelected ? 'text-[#8fb8a8]' : 'text-[#16191c]'}`}>
                        {finish.name}
                      </h4>
                      <span className="text-[10px] font-mono-spec text-[#5D746F] uppercase">
                        {finish.category.split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-xs text-[#6a7a74] truncate mt-0.5">
                      {finish.tagline}
                    </p>
                    <span className="text-[10px] font-mono-spec text-[#8fb8a8]/80 mt-1 inline-block">
                      {finish.sheenLevel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Architectural Finish Laboratory & Macro View */}
        <div className="lg:col-span-7">
          <div className="bg-[#141C1E] rounded-2xl border border-[#354345] overflow-hidden shadow-2xl sticky top-24">
            
            {/* Viewport Header with Room vs Macro Mode Toggle */}
            <div className="bg-[#1C1A17] px-6 py-3 border-b border-[#2C3A3C] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8fb8a8]" />
                <span className="text-xs font-mono-spec uppercase text-[#c5d0cb]">
                  {activeFinish.name} Specimen Viewport
                </span>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-[#16191c] p-1 rounded-lg border border-[#2B2721]">
                <button
                  onClick={() => setViewMode('room')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    viewMode === 'room'
                      ? 'bg-[#4a6b5e] text-[#f4f6f4]'
                      : 'text-[#6a7a74] hover:text-[#16191c]'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Room Context</span>
                </button>
                <button
                  onClick={() => setViewMode('macro')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    viewMode === 'macro'
                      ? 'bg-[#4a6b5e] text-[#f4f6f4]'
                      : 'text-[#6a7a74] hover:text-[#16191c]'
                  }`}
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>5x Mineral Macro</span>
                </button>
              </div>
            </div>

            {/* Visual Surface Viewport */}
            <div className="relative h-72 sm:h-96 overflow-hidden bg-[#16191c]">
              <img 
                src={viewMode === 'room' ? activeFinish.roomImage : activeFinish.macroImage}
                alt={activeFinish.name}
                className="w-full h-full object-cover transition-all duration-500"
                style={{ filter: getLightingFilter() }}
              />

              {/* Ambient Rake Gradient */}
              <div
                className="absolute inset-0 pointer-events-none transition-[background,opacity] duration-700 opacity-70 mix-blend-soft-light"
                style={{ background: lightingWashFor(currentTime) }}
              />

              {/* Viewport Info Floating Bar */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#eef3f0]/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#3A342C] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-[#8fb8a8]" />
                  <div>
                    <span className="text-[10px] font-mono-spec uppercase text-[#5A716C] block">Daylight Simulation</span>
                    <span className="text-xs font-semibold text-[#16191c]">{timeInfo.label} ({timeInfo.kelvin})</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono-spec uppercase text-[#5A716C] block">Sheen Profile</span>
                  <span className="text-xs font-mono-spec text-[#8fb8a8]">{activeFinish.sheenLevel}</span>
                </div>
              </div>
            </div>

            {/* Detailed Specimen Attributes */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Title & Cart Action */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-[#292520]">
                <div>
                  <span className="text-xs font-mono-spec text-[#8fb8a8] uppercase">{activeFinish.category}</span>
                  <h3 className="font-editorial text-3xl text-[#16191c] font-normal mt-1">{activeFinish.name}</h3>
                  <p className="text-xs sm:text-sm text-[#849994] mt-1.5 leading-relaxed font-light">{activeFinish.description}</p>
                </div>

                <button
                  onClick={() => onAddSwatch(activeFinish)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all shadow-md ${
                    isAlreadyInCart
                      ? 'bg-[#1F2B1F] border border-[#3A5E3A] text-[#82C982]'
                      : 'bg-[#8fb8a8] hover:bg-[#6a9484] text-[#16191c]'
                  }`}
                >
                  {isAlreadyInCart ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>In Swatch Box</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to In-Home Swatch Box</span>
                    </>
                  )}
                </button>
              </div>

              {/* Daylight Response Narrative */}
              <div className="p-4 rounded-xl bg-[#1E1B18] border border-[#354345] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-spec text-[#8fb8a8]">
                  <Sun className="w-3.5 h-3.5" />
                  <span className="uppercase">Reaction Under {timeInfo.label} ({timeInfo.timeString})</span>
                </div>
                <p className="text-xs sm:text-sm text-[#c5d0cb] leading-relaxed">
                  {activeFinish.lightResponse[currentTime]}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-lg bg-[#0F1719] border border-[#26221D] space-y-1">
                  <span className="font-mono-spec uppercase text-[#5A716C] text-[10px]">Mineral & Raw Origin</span>
                  <p className="text-[#C4BCB1] leading-relaxed">{activeFinish.mineralOrigin}</p>
                </div>
                <div className="p-3.5 rounded-lg bg-[#0F1719] border border-[#26221D] space-y-1">
                  <span className="font-mono-spec uppercase text-[#5A716C] text-[10px]">Tactile Texture</span>
                  <p className="text-[#C4BCB1] leading-relaxed">{activeFinish.tactileFeel}</p>
                </div>
                <div className="p-3.5 rounded-lg bg-[#0F1719] border border-[#26221D] space-y-1">
                  <span className="font-mono-spec uppercase text-[#5A716C] text-[10px]">Durability & Health</span>
                  <p className="text-[#C4BCB1] leading-relaxed">{activeFinish.durabilityRating}</p>
                </div>
                <div className="p-3.5 rounded-lg bg-[#0F1719] border border-[#26221D] space-y-1">
                  <span className="font-mono-spec uppercase text-[#5A716C] text-[10px]">Application Method</span>
                  <p className="text-[#C4BCB1] leading-relaxed">{activeFinish.depthSpec}</p>
                </div>
              </div>

              {/* Best Melbourne Spaces */}
              <div>
                <span className="text-[10px] font-mono-spec uppercase text-[#5A716C] block mb-2">
                  Recommended Melbourne Architecture
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeFinish.idealMelbourneSpaces.map((space, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-[#1A2426] border border-[#354345] text-xs text-[#5a6660]"
                    >
                      {space}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related proof narratives */}
              {relatedProjects.length > 0 && onOpenCaseStudy && (
                <div className="pt-2">
                  <span className="text-[10px] font-mono-spec uppercase text-[#5A716C] block mb-2">
                    Related case narratives
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {relatedProjects.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => onOpenCaseStudy(p.id)}
                        className="text-xs px-3 py-1.5 border border-[#c9d4ce] text-[#16191c] hover:border-[#8fb8a8] transition-colors"
                      >
                        {p.suburb} · {p.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Quick Order Box CTA */}
              <div className="pt-4 flex items-center justify-between border-t border-[#243033]">
                <span className="text-xs text-[#6a7a74] font-mono-spec">{activeFinish.quoteEstimateHint}</span>
                <button
                  onClick={onOpenAtelier}
                  className="text-xs font-semibold text-[#8fb8a8] hover:text-[#9DCEC3] flex items-center gap-1.5 transition-colors"
                >
                  <span>Schedule Atelier Diagnostic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
