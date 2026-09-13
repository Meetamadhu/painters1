import { useState } from 'react';
import { SUBURBS_DATA } from '../../data/suburbsData';
import { PageExperience } from '../../types';
import { MapPin, ArrowRight, Wind, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface SuburbExperienceProps {
  onOpenAtelier: () => void;
  onNavigateExperience: (exp: PageExperience) => void;
  onOpenCaseStudy?: (projectId: string) => void;
}

export default function SuburbExperience({ onOpenAtelier, onNavigateExperience, onOpenCaseStudy }: SuburbExperienceProps) {
  const [selectedSuburbId, setSelectedSuburbId] = useState<string>(SUBURBS_DATA[0].id);

  const activeSuburb = SUBURBS_DATA.find(s => s.id === selectedSuburbId) || SUBURBS_DATA[0];

  return (
    <div className="min-h-screen text-[#16191c] pb-28">
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Eyebrow & Title */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1C18] border border-[#c9d4ce] text-xs text-[#8fb8a8] mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span className="font-mono-spec uppercase tracking-wider text-[11px]">
            Experience 04 · Melbourne Architectural Atlas
          </span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-light text-[#16191c]">
          Melbourne Architectural Fabric & Micro-Climate Coating Protocols
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#849994] max-w-2xl font-light leading-relaxed">
          Melbourne’s micro-climates vary wildly: a Victorian party wall in Fitzroy has vastly different moisture dynamics than a coastal weatherboard on Brighton’s Golden Mile. We tailor our chemistries accordingly.
        </p>
      </div>
      </div>

      {/* Suburb Selector — light band */}
      <div className="pm-section-light py-10 mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SUBURBS_DATA.map((suburb) => {
          const isSelected = suburb.id === activeSuburb.id;
          return (
            <div
              key={suburb.id}
              onClick={() => setSelectedSuburbId(suburb.id)}
              className={`p-5 border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#16191c] border-[#16191c] text-[#16191c] shadow-lg'
                  : 'bg-[#f2f6f4]/80 border-[#b8c9c0] text-[#16191c] hover:border-[#4a6b5e]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono-spec uppercase tracking-wider ${isSelected ? 'text-[#8fb8a8]' : 'text-[#4a6b5e]'}`}>
                  {suburb.region}
                </span>
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#8fb8a8]' : 'bg-[#a8c0b6]'}`} />
              </div>
              <h3 className={`font-editorial text-2xl ${isSelected ? 'text-[#16191c]' : 'text-[#16191c]'}`}>
                {suburb.name}
              </h3>
              <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${isSelected ? 'text-[#5a6660]' : 'text-[#5a7268]'}`}>
                {suburb.housingType}
              </p>
            </div>
          );
        })}
      </div>
        </div>
      </div>

      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Selected Suburb Deep Architectural Dossier */}
      <div className="pm-section-light-soft border border-[#b8c9c0] p-6 sm:p-10 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#b8c9c0] pb-6">
          <div>
            <span className="text-xs font-mono-spec uppercase tracking-widest text-[#4a6b5e]">
              Architectural Profile · {activeSuburb.region}
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#16191c] mt-1 font-light">
              {activeSuburb.name} Substrate Diagnostics
            </h2>
          </div>

          <button
            onClick={onOpenAtelier}
            className="px-4 py-2.5 bg-[#16191c] hover:bg-[#143D38] text-xs font-semibold text-[#16191c] transition-colors flex items-center gap-2"
          >
            <span>Book In-Home Substrate Assessment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Narrative & Micro-Climate Diagnostics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h4 className="text-xs font-mono-spec uppercase text-[#5a7268] tracking-wider mb-2">
                Architectural Typology & Micro-Climate Dynamics
              </h4>
              <p className="text-sm text-[#1E2E1C] leading-relaxed font-light">
                {activeSuburb.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white/70 border border-[#b8c9c0]">
                <div className="flex items-center gap-2 text-xs font-mono-spec uppercase text-[#4a6b5e] mb-2">
                  <Wind className="w-4 h-4" />
                  <span>Climate Stress Factors</span>
                </div>
                <p className="text-xs text-[#4a5f56] leading-relaxed">
                  {activeSuburb.climateFactors}
                </p>
              </div>

              <div className="p-4 bg-white/70 border border-[#b8c9c0]">
                <div className="flex items-center gap-2 text-xs font-mono-spec uppercase text-[#4a6b5e] mb-2">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Heritage Overlay & Covenants</span>
                </div>
                <p className="text-xs text-[#4a5f56] leading-relaxed">
                  {activeSuburb.heritageCovenants}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 bg-white/80 p-6 border border-[#b8c9c0]">
            <div>
              <h4 className="text-xs font-mono-spec uppercase text-[#5a7268] tracking-wider mb-3">
                Recommended Coating Formulations
              </h4>
              <div className="space-y-2">
                {activeSuburb.recommendedFinishes.map((finish, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#16191c]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4a6b5e]" />
                    <span>{finish}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono-spec uppercase text-[#5a7268] tracking-wider mb-3">
                Curated Suburb Color Tones
              </h4>
              <div className="space-y-2.5">
                {activeSuburb.suburbPalette.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 bg-[#EEF4F1] border border-[#C5D9D3]">
                    <div
                      className="w-8 h-8 border border-[#a8c0b6] shrink-0"
                      style={{ backgroundColor: item.hex }}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#16191c] truncate">{item.name}</p>
                      <p className="text-[10px] text-[#5a7268] truncate">{item.inspiration} ({item.hex})</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onOpenCaseStudy) {
                  onOpenCaseStudy(activeSuburb.localCaseStudyId);
                } else {
                  onNavigateExperience('case-study');
                }
              }}
              className="w-full py-2.5 bg-[#16191c] hover:bg-[#143D38] text-xs font-medium text-[#16191c] transition-colors text-center inline-flex items-center justify-center gap-2"
            >
              View matching case narrative
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
