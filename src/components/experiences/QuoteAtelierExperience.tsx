import { useState } from 'react';
import { FinishItem } from '../../types';
import { FINISHES_DATA } from '../../data/finishesData';
import { SUBURBS_DATA } from '../../data/suburbsData';
import { Send, CheckCircle2, Package, ArrowRight, ArrowLeft, X } from 'lucide-react';

interface QuoteAtelierProps {
  swatchList: FinishItem[];
  onRemoveSwatch?: (id: string) => void;
}

export default function QuoteAtelierExperience({ swatchList, onRemoveSwatch }: QuoteAtelierProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedSuburb, setSelectedSuburb] = useState<string>(SUBURBS_DATA[0].name);
  const [architecturalEra, setArchitecturalEra] = useState<string>('Victorian Terrace');
  const [selectedSpaces, setSelectedSpaces] = useState<string[]>(['Living & Dining Salon']);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>(
    swatchList.length > 0 ? swatchList.map(s => s.id) : ['limewash', 'venetian-plaster']
  );
  const [daylightOrientation, setDaylightOrientation] = useState<string>('South-Facing (Cool/Shaded)');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: '',
    streetAddress: '',
    preferredDate: '',
    specialNotes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const toggleSpace = (space: string) => {
    setSelectedSpaces(prev =>
      prev.includes(space) ? prev.filter(s => s !== space) : [...prev, space]
    );
  };

  const toggleFinish = (id: string) => {
    setSelectedFinishes(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // Ballpark investment estimation based on selections
  const calculateEstimate = () => {
    const basePerSpace = 3200;
    const finishMultiplier = selectedFinishes.length * 1200;
    const spaceTotal = selectedSpaces.length * basePerSpace;
    const low = spaceTotal + finishMultiplier;
    const high = Math.round(low * 1.35);
    return { low, high };
  };

  const estimate = calculateEstimate();

  return (
    <div className="min-h-screen pm-section-light text-[#16191c] py-12 pb-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#16191c]/08 border border-[#a8c0b6] text-xs text-[#4a6b5e] mb-3">
          <Package className="w-3.5 h-3.5" />
          <span className="font-mono-spec uppercase tracking-wider text-[11px]">
            Experience 06 · The Material Atelier Consultation
          </span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-light text-[#16191c]">
          Curate Your Bespoke In-Home Material Swatch Box
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#4a5f56] max-w-xl mx-auto font-light leading-relaxed">
          Not a high-pressure trade quote. We deliver 30cm hand-crafted physical plaster and mineral sample boards to your home, accompanied by our master artisan substrate diagnostic.
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-between max-w-xl mx-auto mb-10 text-xs font-mono-spec">
        {[
          { num: 1, label: 'Architecture' },
          { num: 2, label: 'Spaces' },
          { num: 3, label: 'Finishes' },
          { num: 4, label: 'Consultation' }
        ].map((s) => (
          <div key={s.num} className="flex flex-col items-center gap-1.5 flex-1 relative">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
              step >= s.num
                ? 'bg-[#4a6b5e] text-[#f4f6f4] shadow-md'
                : 'bg-[#D8E8E3] border border-[#b8c9c0] text-[#5a7268]'
            }`}>
              {step > s.num ? '✓' : s.num}
            </div>
            <span className={`text-[10px] uppercase ${step >= s.num ? 'text-[#4a6b5e]' : 'text-[#6a7a74]'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Main Form Container */}
      <div className="pm-section-light-soft border border-[#b8c9c0] p-6 sm:p-10 shadow-[0_20px_60px_rgba(11,18,20,0.12)] text-[#16191c]">
        {isSubmitted ? (
          <div className="text-center py-12 space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#1F2B1F] border border-[#3A5E3A] text-[#82C982] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#16191c]">
              Your Material Atelier Box is Being Prepared
            </h2>
            <p className="text-sm text-[#4a5f56] max-w-md mx-auto leading-relaxed">
              Thank you, {contactInfo.name || 'valued client'}. Our Fitzroy studio will hand-prepare your curated 30cm mineral finish boards and dispatch them to {contactInfo.streetAddress || selectedSuburb}.
            </p>
            <div className="p-4 rounded-xl bg-[#D8E8E3] border border-[#a8c0b6] max-w-md mx-auto text-xs text-left space-y-2">
              <p className="text-[#8fb8a8] font-mono-spec font-semibold">Included in your Atelier Box:</p>
              <p className="text-[#1E2E1C]">✓ Hand-troweled physical plaster & limewash sample boards</p>
              <p className="text-[#1E2E1C]">✓ Melbourne daylight undertone guide</p>
              <p className="text-[#1E2E1C]">✓ Substrate diagnostic booking confirmation</p>
            </div>
          </div>
        ) : (
          <div>
            {/* Step 1: Architectural Fabric */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#16191c]">
                    Step 1: Your Home’s Architectural Typology
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4a5f56] mt-1">
                    Every Melbourne architectural period requires distinct substrate preparation and vapor permeability.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono-spec text-[#4a5f56] uppercase block mb-1.5">
                      Melbourne Suburb / Region
                    </label>
                    <select
                      value={selectedSuburb}
                      onChange={(e) => setSelectedSuburb(e.target.value)}
                      className="w-full bg-white/80 border border-[#a8c0b6] rounded-xl px-4 py-3 text-sm text-[#16191c] focus:outline-none focus:border-[#8fb8a8]"
                    >
                      {SUBURBS_DATA.map((s) => (
                        <option key={s.id} value={s.name}>{s.name} · {s.region}</option>
                      ))}
                      <option value="Other Melbourne suburb">Other Melbourne suburb</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono-spec text-[#4a5f56] uppercase block mb-1.5">
                      Architectural Era
                    </label>
                    <select
                      value={architecturalEra}
                      onChange={(e) => setArchitecturalEra(e.target.value)}
                      className="w-full bg-white/80 border border-[#a8c0b6] rounded-xl px-4 py-3 text-sm text-[#16191c] focus:outline-none focus:border-[#8fb8a8]"
                    >
                      <option>Victorian Terrace (1870–1901)</option>
                      <option>Edwardian / Federation Villa (1901–1915)</option>
                      <option>Californian Bungalow (1920–1935)</option>
                      <option>Mid-Century Modern (1950–1975)</option>
                      <option>Modernist Architectural Extension</option>
                      <option>Coastal Weatherboard / Pavilion</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 rounded-lg bg-[#8fb8a8] hover:bg-[#6a9484] text-xs font-semibold text-[#16191c] flex items-center gap-2 transition-all shadow-md"
                  >
                    <span>Proceed to Spaces</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Spaces to Transform */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#16191c]">
                    Step 2: Living Spaces Scheduled for Transformation
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4a5f56] mt-1">
                    Select all rooms you wish to include in your in-home sample box and diagnostic review.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    'Living & Dining Salon',
                    'Master Bedroom Sanctuary',
                    'Kitchen Cabinet Spray Refinish',
                    'Ensuite / Bathroom Microcement',
                    'Entry Foyer & Curved Gallery',
                    'Full Exterior Weatherboard / Masonry'
                  ].map((space) => {
                    const isSelected = selectedSpaces.includes(space);
                    return (
                      <div
                        key={space}
                        onClick={() => toggleSpace(space)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#C5D9D3] border-[#8fb8a8] text-[#16191c]'
                            : 'bg-white/70 border-[#b8c9c0] text-[#4a5f56] hover:border-[#4a6b5e]'
                        }`}
                      >
                        <span className="text-xs font-medium">{space}</span>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isSelected ? 'bg-[#8fb8a8] border-[#8fb8a8] text-[#16191c]' : 'border-[#415150]'
                        }`}>
                          {isSelected && <span className="text-[10px] font-bold">✓</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-lg bg-[#D8E8E3] hover:bg-[#C5D9D3] text-xs font-medium text-[#4a5f56] flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 rounded-lg bg-[#8fb8a8] hover:bg-[#6a9484] text-xs font-semibold text-[#16191c] flex items-center gap-2 transition-all shadow-md"
                  >
                    <span>Choose Finishes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Finishes & Daylight */}
            {step === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#16191c]">
                    Step 3: Finishes & Daylight Dynamics
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4a5f56] mt-1">
                    Select the specialist finishes to include as physical 30cm swatch boards in your consultation box.
                  </p>
                </div>

                {/* Swatch cart from exploration */}
                {swatchList.length > 0 && (
                  <div className="p-4 border border-[#b8c9c0] bg-white/70">
                    <p className="text-[10px] font-mono-spec uppercase text-[#8fb8a8] mb-2">
                      Swatches from your exploration ({swatchList.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {swatchList.map((s) => (
                        <span
                          key={s.id}
                          className="inline-flex items-center gap-2 text-xs px-2.5 py-1 border border-[#c9d4ce] text-[#16191c]"
                        >
                          {s.name}
                          {onRemoveSwatch && (
                            <button
                              type="button"
                              onClick={() => onRemoveSwatch(s.id)}
                              className="text-[#5a7268] hover:text-[#16191c]"
                              aria-label={`Remove ${s.name}`}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Finishes Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {FINISHES_DATA.map((finish) => {
                    const isSelected = selectedFinishes.includes(finish.id);
                    return (
                      <div
                        key={finish.id}
                        onClick={() => toggleFinish(finish.id)}
                        className={`p-3 border cursor-pointer transition-all overflow-hidden ${
                          isSelected
                            ? 'bg-[#C5D9D3] border-[#8fb8a8]'
                            : 'bg-white/70 border-[#b8c9c0] hover:border-[#4a6b5e]'
                        }`}
                      >
                        <img src={finish.macroImage} alt="" className="h-12 w-full object-cover mb-2" />
                        <h4 className="text-xs font-semibold text-[#16191c] truncate">{finish.name}</h4>
                        <span className="text-[10px] text-[#5a7268] font-mono-spec">{finish.sheenLevel.split(' ')[0]}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Daylight orientation question */}
                <div>
                  <label className="text-xs font-mono-spec text-[#4a5f56] uppercase block mb-1.5">
                    Primary Natural Window Daylight Angle
                  </label>
                  <select
                    value={daylightOrientation}
                    onChange={(e) => setDaylightOrientation(e.target.value)}
                    className="w-full bg-white/80 border border-[#a8c0b6] rounded-xl px-4 py-3 text-sm text-[#16191c] focus:outline-none focus:border-[#8fb8a8]"
                  >
                    <option>South-Facing (Cool, soft, consistent Melbourne skylight)</option>
                    <option>North-Facing (Bright, warm all-day solar exposure)</option>
                    <option>East-Facing (Gentle morning sunrise, shaded afternoon)</option>
                    <option>West-Facing (Intense late afternoon sun & raking shadows)</option>
                  </select>
                </div>

                {/* Estimate Preview Strip */}
                <div className="p-4 rounded-xl bg-[#D8E8E3] border border-[#b8c9c0] flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono-spec uppercase text-[#5a7268] block">
                      Estimated Artisanal Commission Range
                    </span>
                    <p className="text-sm font-semibold text-[#8fb8a8]">
                      ${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()} AUD
                    </p>
                    <p className="text-[10px] text-[#5a7268]">Includes substrate prep, master application & clean-room protocols</p>
                  </div>
                  <span className="text-xs text-[#82C982] font-mono-spec">Sample Box: Complimentary</span>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-lg bg-[#D8E8E3] hover:bg-[#C5D9D3] text-xs font-medium text-[#4a5f56] flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="px-6 py-2.5 rounded-lg bg-[#8fb8a8] hover:bg-[#6a9484] text-xs font-semibold text-[#16191c] flex items-center gap-2 transition-all shadow-md"
                  >
                    <span>Finalize Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Contact & In-Home Booking */}
            {step === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#16191c]">
                    Step 4: Delivery & On-Site Substrate Consultation
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4a5f56] mt-1">
                    Where should we deliver your physical swatch sample box and perform your lighting check?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono-spec text-[#4a5f56] uppercase block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                      placeholder="e.g. Clare & Timothy Miller"
                      className="w-full bg-white/80 border border-[#a8c0b6] rounded-xl px-4 py-2.5 text-sm text-[#16191c] focus:outline-none focus:border-[#8fb8a8]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono-spec text-[#4a5f56] uppercase block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      placeholder="0400 000 000"
                      className="w-full bg-white/80 border border-[#a8c0b6] rounded-xl px-4 py-2.5 text-sm text-[#16191c] focus:outline-none focus:border-[#8fb8a8]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono-spec text-[#4a5f56] uppercase block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      placeholder="you@domain.com.au"
                      className="w-full bg-white/80 border border-[#a8c0b6] rounded-xl px-4 py-2.5 text-sm text-[#16191c] focus:outline-none focus:border-[#8fb8a8]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono-spec text-[#4a5f56] uppercase block mb-1">Street Address</label>
                    <input
                      type="text"
                      value={contactInfo.streetAddress}
                      onChange={(e) => setContactInfo({ ...contactInfo, streetAddress: e.target.value })}
                      placeholder="e.g. 142 Gore Street, Fitzroy"
                      className="w-full bg-white/80 border border-[#a8c0b6] rounded-xl px-4 py-2.5 text-sm text-[#16191c] focus:outline-none focus:border-[#8fb8a8]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono-spec text-[#4a5f56] uppercase block mb-1">Preferred consultation date</label>
                    <input
                      type="date"
                      value={contactInfo.preferredDate}
                      onChange={(e) => setContactInfo({ ...contactInfo, preferredDate: e.target.value })}
                      className="w-full bg-white/80 border border-[#a8c0b6] rounded-xl px-4 py-2.5 text-sm text-[#16191c] focus:outline-none focus:border-[#8fb8a8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono-spec text-[#4a5f56] uppercase block mb-1">
                    Special Substrate Notes or Pinterest Inspiration Link (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={contactInfo.specialNotes}
                    onChange={(e) => setContactInfo({ ...contactInfo, specialNotes: e.target.value })}
                    placeholder="Tell us about existing cracks, prior acrylic peeling, or specific mood boards..."
                    className="w-full bg-white/80 border border-[#a8c0b6] rounded-xl px-4 py-2 text-sm text-[#16191c] focus:outline-none focus:border-[#8fb8a8]"
                  />
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 rounded-lg bg-[#D8E8E3] hover:bg-[#C5D9D3] text-xs font-medium text-[#4a5f56] flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setIsSubmitted(true)}
                    className="px-8 py-3 rounded-full bg-linear-to-r from-[#8fb8a8] to-[#4A8376] hover:brightness-110 text-xs font-semibold text-[#16191c] flex items-center gap-2 transition-all shadow-xl"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Request Swatch Box & Book Consultation</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
