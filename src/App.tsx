import { useState } from 'react';
import { PageExperience, ContestSection, TimeOfDay, FinishItem } from './types';
import Navigation from './components/Navigation';
import ContestLandingPage from './components/experiences/ContestLandingPage';
import HomepageExperience from './components/experiences/HomepageExperience';
import PaintRevolutionExperience from './components/experiences/PaintRevolutionExperience';
import FinishExplorationExperience from './components/experiences/FinishExplorationExperience';
import CaseStudyExperience from './components/experiences/CaseStudyExperience';
import SuburbExperience from './components/experiences/SuburbExperience';
import DecisionGuidanceExperience from './components/experiences/DecisionGuidanceExperience';
import QuoteAtelierExperience from './components/experiences/QuoteAtelierExperience';
import ContestDossierView from './components/contest/ContestDossierView';
import { FINISHES_DATA } from './data/finishesData';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentMode, setCurrentMode] = useState<'prototype' | 'contest'>('prototype');
  const [currentExperience, setCurrentExperience] = useState<PageExperience>('homepage');
  const [currentContestSection, setCurrentContestSection] = useState<ContestSection>('all');
  const [currentTime, setCurrentTime] = useState<TimeOfDay>('golden');
  const [selectedFinish, setSelectedFinish] = useState<FinishItem | null>(FINISHES_DATA[0]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [swatchList, setSwatchList] = useState<FinishItem[]>([FINISHES_DATA[0], FINISHES_DATA[1]]);

  const navigate = (exp: PageExperience) => {
    setCurrentExperience(exp);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddSwatch = (finish: FinishItem) => {
    if (!swatchList.some(s => s.id === finish.id)) {
      setSwatchList(prev => [...prev, finish]);
    }
  };

  const handleRemoveSwatch = (id: string) => {
    setSwatchList(prev => prev.filter(s => s.id !== id));
  };

  const handleOpenAtelier = () => {
    setCurrentMode('prototype');
    navigate('quote-flow');
  };

  const handleOpenCaseStudy = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentMode('prototype');
    navigate('case-study');
  };

  return (
    <div className="min-h-screen bg-[#f2f5f3] text-[#16191c] flex flex-col font-sans selection:bg-[#8fb8a8] selection:text-[#16191c]">
      <Navigation
        currentMode={currentMode}
        onModeChange={(mode) => {
          setCurrentMode(mode);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentExperience={currentExperience}
        onExperienceChange={(exp) => navigate(exp)}
        currentContestSection={currentContestSection}
        onContestSectionChange={(sec) => {
          setCurrentContestSection(sec);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        swatchCartCount={swatchList.length}
        onOpenAtelier={handleOpenAtelier}
        currentTime={currentTime}
        onTimeChange={setCurrentTime}
      />

      <main key={`${currentMode}-${currentExperience}`} className="grow animate-pm-speed">
        {currentMode === 'prototype' ? (
          <div>
            {currentExperience === 'homepage' && (
              <ContestLandingPage
                currentTime={currentTime}
                onTimeChange={setCurrentTime}
                onSelectFinish={(finish) => {
                  setSelectedFinish(finish);
                  handleAddSwatch(finish);
                }}
                onNavigateExperience={navigate}
                onOpenAtelier={handleOpenAtelier}
                onOpenContest={() => {
                  setCurrentMode('contest');
                  setCurrentContestSection('all');
                }}
              />
            )}

            {currentExperience === 'atelier-world' && (
              <HomepageExperience
                currentTime={currentTime}
                onSelectFinish={(finish) => {
                  setSelectedFinish(finish);
                  handleAddSwatch(finish);
                }}
                onNavigateExperience={navigate}
                onOpenAtelier={handleOpenAtelier}
              />
            )}

            {currentExperience === 'paint-revolution' && (
              <PaintRevolutionExperience
                onNavigateExperience={navigate}
                onOpenAtelier={handleOpenAtelier}
              />
            )}

            {currentExperience === 'finishes' && (
              <FinishExplorationExperience
                currentTime={currentTime}
                onTimeChange={setCurrentTime}
                selectedFinish={selectedFinish}
                onSelectFinish={setSelectedFinish}
                onAddSwatch={handleAddSwatch}
                swatchList={swatchList}
                onOpenAtelier={handleOpenAtelier}
                onOpenCaseStudy={handleOpenCaseStudy}
              />
            )}

            {currentExperience === 'case-study' && (
              <CaseStudyExperience
                onOpenAtelier={handleOpenAtelier}
                initialProjectId={selectedProjectId}
                onNavigateExperience={navigate}
                onSelectFinishId={(id) => {
                  const finish = FINISHES_DATA.find(f => f.id === id);
                  if (finish) setSelectedFinish(finish);
                }}
              />
            )}

            {currentExperience === 'suburbs' && (
              <SuburbExperience
                onOpenAtelier={handleOpenAtelier}
                onNavigateExperience={navigate}
                onOpenCaseStudy={handleOpenCaseStudy}
              />
            )}

            {currentExperience === 'guidance' && (
              <DecisionGuidanceExperience onOpenAtelier={handleOpenAtelier} />
            )}

            {currentExperience === 'quote-flow' && (
              <QuoteAtelierExperience
                swatchList={swatchList}
                onRemoveSwatch={handleRemoveSwatch}
              />
            )}
          </div>
        ) : (
          <ContestDossierView
            currentSection={currentContestSection}
            onSelectSection={setCurrentContestSection}
            onSwitchToPrototype={() => {
              setCurrentMode('prototype');
              navigate('homepage');
            }}
          />
        )}
      </main>

      <footer className="bg-[#e8eeea] border-t border-[#c9d4ce] pt-16 pb-12 text-xs text-[#5a6660] mineral-grain">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#c9d4ce]">
            <div className="space-y-3 md:col-span-1">
              <span className="font-editorial text-2xl text-[#16191c] tracking-[0.06em] block">
                PAINTER MELBOURNE
              </span>
              <p className="text-xs text-[#5a6660] leading-relaxed font-light">
                Architectural painting and decorative finishing. Paint as transformation, not transaction.
              </p>
              <div className="pt-1 flex items-center gap-2 text-[11px] font-mono-spec text-[#8fb8a8]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Fitzroy · Greater Melbourne</span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-mono-spec uppercase text-[#8fb8a8] tracking-[0.15em] block">
                Experiences
              </span>
              <ul className="space-y-2 text-xs text-[#5a6660]">
                <li><button type="button" onClick={() => { setCurrentMode('prototype'); navigate('homepage'); }} className="hover:text-[#16191c] transition-colors">01 Brand world</button></li>
                <li><button type="button" onClick={() => { setCurrentMode('prototype'); navigate('finishes'); }} className="hover:text-[#16191c] transition-colors">02 Finishes lab</button></li>
                <li><button type="button" onClick={() => { setCurrentMode('prototype'); navigate('case-study'); }} className="hover:text-[#16191c] transition-colors">03 Project proof</button></li>
                <li><button type="button" onClick={() => { setCurrentMode('prototype'); navigate('suburbs'); }} className="hover:text-[#16191c] transition-colors">04 Suburb fabric</button></li>
                <li><button type="button" onClick={() => { setCurrentMode('prototype'); navigate('guidance'); }} className="hover:text-[#16191c] transition-colors">05 Decision lab</button></li>
                <li><button type="button" onClick={() => { setCurrentMode('prototype'); navigate('quote-flow'); }} className="hover:text-[#16191c] transition-colors">06 Material atelier</button></li>
                <li><button type="button" onClick={() => { setCurrentMode('prototype'); navigate('atelier-world'); }} className="hover:text-[#16191c] transition-colors">Alt · Immersive home</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-mono-spec uppercase text-[#8fb8a8] tracking-[0.15em] block">
                Contest dossier
              </span>
              <ul className="space-y-2 text-xs text-[#5a6660]">
                <li><button type="button" onClick={() => { setCurrentMode('contest'); setCurrentContestSection('visual-direction'); }} className="hover:text-[#16191c] transition-colors">Visual direction</button></li>
                <li><button type="button" onClick={() => { setCurrentMode('contest'); setCurrentContestSection('walkthrough-video'); }} className="hover:text-[#16191c] transition-colors">Walkthrough</button></li>
                <li><button type="button" onClick={() => { setCurrentMode('contest'); setCurrentContestSection('design-system'); }} className="hover:text-[#16191c] transition-colors">Design system</button></li>
                <li><button type="button" onClick={() => { setCurrentMode('contest'); setCurrentContestSection('transformation-engine'); }} className="hover:text-[#16191c] transition-colors">Light & surface</button></li>
                <li><button type="button" onClick={() => { setCurrentMode('contest'); setCurrentContestSection('proof-vs-inspiration'); }} className="hover:text-[#16191c] transition-colors">Proof vs inspiration</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-mono-spec uppercase text-[#8fb8a8] tracking-[0.15em] block">
                Material atelier
              </span>
              <p className="text-xs text-[#5a6660] leading-relaxed font-light">
                Hand-crafted mineral plaster and limewash boards for your home.
              </p>
              <button
                type="button"
                onClick={handleOpenAtelier}
                className="pm-cta inline-flex items-center gap-2 px-4 py-2.5 bg-[#8fb8a8] text-xs font-semibold text-[#16191c]"
              >
                Request swatch box ({swatchList.length})
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono-spec">
            <p>© 2026 Painter Melbourne · Design concept submission</p>
            <p className="text-[#8fb8a8]">Immersive direction · Proof labels disclosed</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
