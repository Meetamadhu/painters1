import { useState } from 'react';
import { ContestSection } from '../../types';
import { CONTEST_SUBMISSION_DATA } from '../../data/contestSubmissionData';
import { FileText, Play, Pause, CheckCircle2, Copy, Download, Sparkles, Smartphone, Monitor, Zap, Eye, ShieldCheck, ChevronRight, Sliders, Volume2 } from 'lucide-react';

interface ContestDossierViewProps {
  currentSection: ContestSection;
  onSelectSection: (section: ContestSection) => void;
  onSwitchToPrototype: () => void;
}

export default function ContestDossierView({
  currentSection,
  onSelectSection,
  onSwitchToPrototype
}: ContestDossierViewProps) {
  const [activeVideoChapter, setActiveVideoChapter] = useState<number>(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(true);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeDeviceMockup, setActiveDeviceMockup] = useState<'desktop' | 'mobile'>('desktop');

  const sectionsList: ContestSection[] = [
    'visual-direction',
    'walkthrough-video',
    'design-system',
    'transformation-engine',
    'performance-mobile',
    'proof-vs-inspiration',
    'homeowner-psychology',
    'past-work',
    'figma-tokens'
  ];

  const chapterImages = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
  ];

  const handleCopyTokens = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(label);
    setTimeout(() => setCopiedToken(null), 2500);
  };

  return (
    <div className="min-h-screen text-[#16191c] py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Contest Dossier Header */}
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-[#292520]">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1F1C18] border border-[#c9d4ce] text-xs text-[#8fb8a8] mb-3 shadow-sm">
            <FileText className="w-3.5 h-3.5 text-[#8fb8a8]" />
            <span className="font-mono-spec uppercase tracking-wider text-[11px]">
              Contest Submission Dossier · All 9 Criteria
            </span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-light text-[#16191c] tracking-tight">
            Painter Melbourne: Transformational Direction
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#5a6660] max-w-2xl font-light leading-relaxed">
            A comprehensive design system, tactile transformation engine, and homeowner journey engineered to redefine residential decorating in Melbourne.
          </p>
        </div>

        <button
          onClick={onSwitchToPrototype}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#8fb8a8] to-[#6a9484] hover:brightness-110 text-xs font-semibold text-[#16191c] transition-all flex items-center gap-2 shadow-xl"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Launch Live Interactive Prototype</span>
        </button>
      </div>

      {/* Navigation Pills for 9 Sections */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10">
        <button
          onClick={() => onSelectSection('all')}
          className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
            currentSection === 'all'
              ? 'bg-[#4a6b5e] text-[#f4f6f4] font-semibold shadow-md'
              : 'bg-[#141C1E] border border-[#2B2721] text-[#849994] hover:text-[#16191c]'
          }`}
        >
          View Full Dossier (All 9)
        </button>

        {sectionsList.map((secKey) => {
          const item = CONTEST_SUBMISSION_DATA[secKey];
          const isSelected = currentSection === secKey;
          return (
            <button
              key={secKey}
              onClick={() => onSelectSection(secKey)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#4a6b5e] text-[#f4f6f4] font-semibold shadow-md'
                  : 'bg-[#141C1E] border border-[#2B2721] text-[#849994] hover:text-[#16191c]'
              }`}
            >
              <span className="font-mono-spec text-[10px] opacity-75">{item.number}</span>
              <span>{item.title.split(' ')[0]} {item.title.split(' ')[1] || ''}</span>
            </button>
          );
        })}
      </div>

      {/* Content Rendering: Either All or Specific Section */}
      <div className="space-y-16">
        {(currentSection === 'all' ? sectionsList : [currentSection as string]).map((secKey) => {
          const item = CONTEST_SUBMISSION_DATA[secKey];
          if (!item) return null;

          return (
            <article 
              key={item.id}
              className="bg-[#141C1E] rounded-2xl border border-[#354345] p-8 lg:p-12 shadow-2xl space-y-8"
            >
              {/* Section Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#292520] pb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono-spec text-sm text-[#8fb8a8] font-bold">
                      CRITERION {item.number}
                    </span>
                    <span className="text-[10px] font-mono-spec uppercase px-2.5 py-0.5 rounded bg-[#25211D] text-[#849994] border border-[#384648]">
                      {item.badge}
                    </span>
                  </div>
                  <h2 className="font-editorial text-3xl sm:text-5xl text-[#16191c] mt-2 font-light">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#8fb8a8] mt-1 font-mono-spec">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Hero statement quote */}
              <blockquote className="p-6 rounded-xl bg-[#1E1B18] border-l-4 border-[#8fb8a8] text-sm sm:text-base italic text-[#EDE7DE] font-editorial leading-relaxed">
                "{item.content.heroStatement}"
              </blockquote>

              {/* Device Mockup Showcase for Item 01: Visual Direction */}
              {item.id === 'visual-direction' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-[#292520] pb-3">
                    <span className="text-xs font-mono-spec text-[#8fb8a8] uppercase">
                      High-Fidelity Architectural Device Previews
                    </span>
                    <div className="flex items-center gap-2 bg-[#16191c] p-1 rounded-lg border border-[#2B2721]">
                      <button
                        onClick={() => setActiveDeviceMockup('desktop')}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                          activeDeviceMockup === 'desktop'
                            ? 'bg-[#4a6b5e] text-[#f4f6f4]'
                            : 'text-[#6a7a74] hover:text-[#16191c]'
                        }`}
                      >
                        <Monitor className="w-3.5 h-3.5" />
                        <span>Desktop Canvas</span>
                      </button>
                      <button
                        onClick={() => setActiveDeviceMockup('mobile')}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                          activeDeviceMockup === 'mobile'
                            ? 'bg-[#4a6b5e] text-[#f4f6f4]'
                            : 'text-[#6a7a74] hover:text-[#16191c]'
                        }`}
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>Mobile Viewport</span>
                      </button>
                    </div>
                  </div>

                  {activeDeviceMockup === 'desktop' ? (
                    <div className="rounded-xl overflow-hidden border border-[#3D4B4D] bg-[#16191c] shadow-2xl">
                      {/* Browser header */}
                      <div className="bg-[#1C1A17] px-4 py-2.5 border-b border-[#2C3A3C] flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-[#E05B5B]" />
                          <div className="w-3 h-3 rounded-full bg-[#E0B85B]" />
                          <div className="w-3 h-3 rounded-full bg-[#5BE070]" />
                        </div>
                        <div className="bg-[#16191c] text-[#5A716C] text-[11px] font-mono-spec px-4 py-1 rounded-md max-w-sm mx-auto text-center truncate">
                          https://paintermelbourne.com.au/living-wall
                        </div>
                      </div>
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80" 
                          alt="Desktop visual concept"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                          <div>
                            <span className="text-xs font-mono-spec text-[#8fb8a8] uppercase">Desktop Canvas Rendering</span>
                            <h3 className="font-editorial text-3xl text-[#16191c]">The Architectural Paint Atelier</h3>
                            <p className="text-xs text-[#5a6660] mt-1 max-w-md">Split light-reflection comparison, 98% vapor breathability indicators, and real-time Kelvin adjustment.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center py-4">
                      <div className="w-[320px] rounded-[36px] border-4 border-[#3D4B4D] bg-[#16191c] overflow-hidden shadow-2xl p-2 relative">
                        <div className="w-24 h-4 bg-[#1C1A17] rounded-full mx-auto mb-2" />
                        <div className="relative aspect-[9/16] rounded-[24px] overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80" 
                            alt="Mobile visual concept"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-5">
                            <div>
                              <span className="text-[10px] font-mono-spec text-[#8fb8a8] uppercase">Thumb-Zone Touch Control</span>
                              <h4 className="font-editorial text-xl text-[#16191c]">Marmorino Plaster</h4>
                              <p className="text-[11px] text-[#849994] mt-1">One-thumb daylight scrub & sample booking.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Video Walkthrough Interactive Simulator for Item 02 */}
              {item.id === 'walkthrough-video' && item.content.videoChapters && (
                <div className="space-y-6">
                  <div className="relative rounded-2xl overflow-hidden bg-[#100F0E] border border-[#3D4B4D] aspect-video max-h-[500px] flex items-center justify-center shadow-2xl">
                    <img 
                      src={chapterImages[activeVideoChapter % chapterImages.length]}
                      alt="Walkthrough frame preview"
                      className="absolute inset-0 w-full h-full object-cover filter brightness-75 contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#100F0E] via-black/40 to-transparent z-10" />
                    
                    {/* Simulated Walkthrough Visual Screen */}
                    <div className="text-center p-8 z-20 space-y-3">
                      <button 
                        onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                        className="w-18 h-18 rounded-full bg-[#4a6b5e] text-[#f4f6f4] flex items-center justify-center mx-auto shadow-2xl hover:scale-105 transition-transform"
                      >
                        {isPlayingVideo ? (
                          <Pause className="w-8 h-8 fill-current" />
                        ) : (
                          <Play className="w-8 h-8 ml-1 fill-current" />
                        )}
                      </button>

                      {/* Equalizer simulation when playing */}
                      {isPlayingVideo && (
                        <div className="flex items-center justify-center gap-1 py-1">
                          {[40, 70, 30, 90, 60, 80, 45, 100, 35].map((h, i) => (
                            <span 
                              key={i} 
                              className="w-1 bg-[#8fb8a8] rounded-full animate-pulse"
                              style={{ height: `${h * 0.2}px`, animationDelay: `${i * 100}ms` }}
                            />
                          ))}
                        </div>
                      )}

                      <span className="text-xs font-mono-spec text-[#8fb8a8] uppercase tracking-widest block">
                        Interactive Concept Walkthrough Video Player
                      </span>
                      <h3 className="font-editorial text-2xl sm:text-3xl text-[#16191c] max-w-xl mx-auto drop-shadow-md">
                        {item.content.videoChapters[activeVideoChapter].title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#c5d0cb] max-w-lg mx-auto leading-relaxed drop-shadow">
                        {item.content.videoChapters[activeVideoChapter].narrative}
                      </p>
                    </div>

                    {/* Video Player Time Bar */}
                    <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-[11px] font-mono-spec text-[#8fb8a8] bg-[#ffffff]/90 backdrop-blur-md px-4 py-2 rounded-lg border border-[#3D4B4D]">
                      <span className="flex items-center gap-2">
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Chapter {activeVideoChapter + 1} of 4: {item.content.videoChapters[activeVideoChapter].time}</span>
                      </span>
                      <span>1080p 60FPS · Audio Narration Active</span>
                    </div>
                  </div>

                  {/* Chapter Selectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {item.content.videoChapters.map((chap, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveVideoChapter(idx);
                          setIsPlayingVideo(true);
                        }}
                        className={`p-3.5 rounded-xl text-left text-xs transition-all ${
                          activeVideoChapter === idx
                            ? 'bg-[#25211D] border-2 border-[#8fb8a8] text-[#16191c] shadow-lg'
                            : 'bg-[#10181A] border border-[#2B2721] text-[#6a7a74] hover:text-[#16191c]'
                        }`}
                      >
                        <span className="font-mono-spec text-[10px] text-[#8fb8a8] block">{chap.time}</span>
                        <span className="font-medium truncate block mt-0.5">{chap.title.split(': ')[1] || chap.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Design System Tokens View for Item 03 */}
              {item.id === 'design-system' && item.content.designSystemTokens && (
                <div className="space-y-8">
                  {/* Colors */}
                  <div>
                    <h4 className="text-xs font-mono-spec uppercase text-[#5A716C] tracking-wider mb-3">
                      Melbourne Mineral Color Tokens (Click to Copy HEX)
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      {item.content.designSystemTokens.colors.map((c, i) => (
                        <div 
                          key={i} 
                          onClick={() => handleCopyTokens(c.hex, c.name)}
                          className="p-3 rounded-lg bg-[#0F1719] border border-[#2B2721] cursor-pointer hover:border-[#8fb8a8] transition-colors group relative"
                        >
                          <div 
                            className="h-12 rounded mb-2 border border-white/10 shadow-sm"
                            style={{ backgroundColor: c.hex }}
                          />
                          <p className="text-xs font-semibold text-[#16191c] truncate">{c.name}</p>
                          <p className="text-[10px] font-mono-spec text-[#8fb8a8] flex items-center justify-between mt-0.5">
                            <span>{c.hex}</span>
                            <Copy className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100" />
                          </p>
                          {copiedToken === c.name && (
                            <span className="absolute -top-2 right-2 bg-[#4a6b5e] text-[#f4f6f4] text-[9px] font-mono-spec px-1.5 py-0.5 rounded font-bold shadow">
                              COPIED!
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Typography */}
                  <div>
                    <h4 className="text-xs font-mono-spec uppercase text-[#5A716C] tracking-wider mb-3">
                      Typographic Hierarchy & Character
                    </h4>
                    <div className="space-y-2.5">
                      {item.content.designSystemTokens.typography.map((t, i) => (
                        <div key={i} className="p-4 rounded-xl bg-[#0F1719] border border-[#2B2721] flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <span className="text-xs font-semibold text-[#16191c]">{t.role}</span>
                            <p className="text-xs text-[#6a7a74] font-mono-spec mt-0.5">{t.family} · {t.size} · {t.weight}</p>
                          </div>
                          <p className="text-xs text-[#5a6660] max-w-md">{t.usage}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Homeowner Psychology Breakdown for Item 07 */}
              {item.id === 'homeowner-psychology' && item.content.psychologyBreakdown && (
                <div className="space-y-4">
                  <h4 className="text-xs font-mono-spec uppercase text-[#5A716C] tracking-wider">
                    Dismantling the 4 Psychological Barriers to Renovation
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.content.psychologyBreakdown.map((p, i) => (
                      <div key={i} className="p-5 rounded-xl bg-[#0F1719] border border-[#2B2721] space-y-3 shadow-lg">
                        <div className="flex items-center gap-2 text-xs font-mono-spec text-[#D48954]">
                          <span>BARRIER 0{i + 1}:</span>
                          <span className="truncate">{p.trigger}</span>
                        </div>
                        <p className="text-xs text-[#7A8F8A] leading-relaxed">
                          <strong>Homeowner Anxiety:</strong> {p.barrier}
                        </p>
                        <div className="p-3.5 rounded-lg bg-[#1D1B18] border-l-3 border-[#82C982] text-xs text-[#C4DECE] leading-relaxed">
                          <strong>Our Architectural Solution:</strong> {p.ourSolution}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Past Work Projects for Item 08 */}
              {item.id === 'past-work' && item.content.pastWorkProjects && (
                <div className="space-y-4">
                  <h4 className="text-xs font-mono-spec uppercase text-[#5A716C] tracking-wider">
                    Creative Director Portfolio & Verified Architectural Work
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {item.content.pastWorkProjects.map((work, i) => (
                      <div key={i} className="p-5 rounded-xl bg-[#0F1719] border border-[#2B2721] space-y-2 shadow-lg">
                        <div className="flex items-center justify-between">
                          <h4 className="font-editorial text-2xl text-[#16191c]">{work.title}</h4>
                          <span className="text-[10px] font-mono-spec text-[#8fb8a8]">{work.year}</span>
                        </div>
                        <p className="text-xs font-mono-spec text-[#5A716C]">{work.client} · {work.category}</p>
                        <p className="text-xs text-[#5a6660] leading-relaxed pt-2 border-t border-[#1E282A]">
                          {work.impact}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Performance & Mobile Architecture for Item 05 */}
              {item.id === 'performance-mobile' && item.content.technicalArchitecture && (
                <div className="space-y-4">
                  <h4 className="text-xs font-mono-spec uppercase text-[#5A716C] tracking-wider">
                    Mobile Speed & 60FPS Performance Rationale
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {item.content.technicalArchitecture.map((tech, i) => (
                      <div key={i} className="p-4 rounded-xl bg-[#0F1719] border border-[#2B2721] flex items-start gap-3">
                        <Zap className="w-4 h-4 text-[#8fb8a8] flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-[#c5d0cb] leading-relaxed">
                          {tech}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Figma Tokens & Source Files for Item 09 */}
              {item.id === 'figma-tokens' && (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-[#0F1719] border border-[#2B2721] flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h4 className="text-base font-semibold text-[#16191c]">Figma Design Token Package & Variables</h4>
                      <p className="text-xs text-[#6a7a74] font-mono-spec mt-1">Ready for instant import into Figma Tokens Studio & CSS Variables</p>
                    </div>
                    <button
                      onClick={() => handleCopyTokens(JSON.stringify(CONTEST_SUBMISSION_DATA['design-system'].content.designSystemTokens, null, 2), 'JSON Tokens')}
                      className="px-5 py-2.5 rounded-lg bg-[#8fb8a8] hover:bg-[#6a9484] text-xs font-semibold text-[#16191c] flex items-center gap-1.5 shadow-md"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedToken === 'JSON Tokens' ? 'Copied JSON to Clipboard!' : 'Copy JSON Tokens'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Detailed Points Grid for all sections */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#243033]">
                {item.content.points.map((pt, i) => (
                  <div key={i} className="space-y-1.5">
                    <h4 className="text-xs font-mono-spec uppercase text-[#8fb8a8] tracking-wider">
                      {pt.headline}
                    </h4>
                    <p className="text-xs text-[#849994] leading-relaxed font-light">
                      {pt.detail}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
