import { useState } from 'react';
import CleanRoomProtocol from '../CleanRoomProtocol';
import { HelpCircle, Sun, Shield, Layers, DollarSign, Check, X, ArrowRight, Droplets, Wind } from 'lucide-react';

interface DecisionGuidanceProps {
  onOpenAtelier: () => void;
}

export default function DecisionGuidanceExperience({ onOpenAtelier }: DecisionGuidanceProps) {
  const [activeTab, setActiveTab] = useState<'light' | 'chemistry' | 'sheen' | 'investment'>('light');
  const [selectedOrientation, setSelectedOrientation] = useState<'south' | 'north' | 'east' | 'west'>('south');

  const orientationGuide = {
    south: {
      title: 'South-Facing Rooms (Cool, Diffused Melbourne Skylight)',
      characteristics: 'Southern daylight is constant, indirect, and heavily tinted with cool blue skylight wavelengths. It casts gentle, soft shadows and never receives harsh direct sun rays.',
      pitfall: 'Applying cool blue-gray or cold stark whites will make south-facing rooms feel clinical, gloomy, and depressing in Melbourne winters.',
      prescription: 'Choose warm-based mineral limewashes and Roman clays with subtle yellow ochre, warm linen, or terracotta undertones. They neutralize cool skylight and create a welcoming, sun-kissed cocoon.',
      recommendedColors: ['Warm Linen (#E5DFD4)', 'Raw Chalk (#ECE7DF)', 'Ochre Blush (#DACDBA)']
    },
    north: {
      title: 'North-Facing Rooms (Bright, Warm All-Day Solar Gain)',
      characteristics: 'Bathed in abundant, warm daylight throughout the entire day. Illuminates spaces with high intensity and sharp architectural shadows.',
      pitfall: 'Ultra-warm creams or yellow-based paints can appear excessively yellow and hot under midday Australian sun.',
      prescription: 'Opt for muted greiges, balanced mineral whites, or cool plaster tones with delicate green, stone, or charcoal undertones that absorb intense solar glare.',
      recommendedColors: ['Bluestone Silt (#CDC7BE)', 'Mineral Misted White (#ECEAE5)', 'Eucalyptus Grey (#B5BCB6)']
    },
    east: {
      title: 'East-Facing Rooms (Gentle Morning Sun, Shaded Afternoons)',
      characteristics: 'Glorious golden, energizing light at breakfast, fading into calm, cool shadows by 2 PM as the sun crosses over.',
      pitfall: 'Failing to consider how the room feels when you return home in the evening under artificial lighting.',
      prescription: 'Mineral finishes that transition gracefully: soft chalky limewash or clay that feels radiant in the morning and deeply restful at twilight.',
      recommendedColors: ['Chalk Sand (#E2DBD0)', 'Warm Biscuit (#D7C8B3)', 'Marmorino Travertine (#C5B7A1)']
    },
    west: {
      title: 'West-Facing Rooms (Cool Mornings, Blazing Golden Afternoon Heat)',
      characteristics: 'Subtle light in the morning followed by intense, high-temperature amber sun and deep dramatic raking shadows from 3 PM to 8 PM.',
      pitfall: 'Highly reflective glossy paints will cause blinding specular glare in Melbourne summer afternoons.',
      prescription: 'Dead-flat matte limewashes and suede Roman clays that scatter harsh late-afternoon glare and absorb the golden glow into a gentle bloom.',
      recommendedColors: ['Velvet Bone (#E7E1D8)', 'Dusted Greige (#BDB4A5)', 'Earthen Suede (#A89A86)']
    }
  };

  const activeLight = orientationGuide[selectedOrientation];

  return (
    <div className="min-h-screen text-[#16191c] py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Eyebrow & Title */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1C18] border border-[#c9d4ce] text-xs text-[#8fb8a8] mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span className="font-mono-spec uppercase tracking-wider text-[11px]">
            Experience 05 · Homeowner Decision Guidance
          </span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-light text-[#16191c]">
          The Light & Shadow Lab: Architectural Decision Guidance
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#849994] max-w-2xl font-light leading-relaxed">
          Demystifying the science of Melbourne daylight, mineral substrate breathability, and sheen acoustics so you can make confident, permanent design decisions.
        </p>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#2B2721] pb-4 mb-8 overflow-x-auto">
        {[
          { id: 'light', label: '1. Daylight Orientation Diagnostic', icon: Sun },
          { id: 'chemistry', label: '2. Mineral Lime vs Plastic Acrylic', icon: Shield },
          { id: 'sheen', label: '3. Sheen & Scrub Matrix', icon: Layers },
          { id: 'investment', label: '4. The 4 Cost Levers of Quality', icon: DollarSign }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-full text-xs font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? 'bg-[#4a6b5e] text-[#f4f6f4] font-semibold shadow-md'
                  : 'bg-[#141C1E] border border-[#2A2621] text-[#849994] hover:text-[#16191c]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Daylight Orientation Diagnostic */}
      {activeTab === 'light' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Orientation Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(['south', 'north', 'east', 'west'] as const).map((orient) => (
              <button
                key={orient}
                onClick={() => setSelectedOrientation(orient)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedOrientation === orient
                    ? 'bg-[#1E282A] border-[#8fb8a8] shadow-lg'
                    : 'bg-[#121A1C] border-[#292520] hover:border-[#38332B]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono-spec uppercase text-[#8fb8a8]">
                    Orientation
                  </span>
                  <span className={`w-2 h-2 rounded-full ${selectedOrientation === orient ? 'bg-[#8fb8a8]' : 'bg-[#3D4B4D]'}`} />
                </div>
                <h4 className="font-editorial text-xl capitalize text-[#16191c]">
                  {orient}-Facing
                </h4>
                <p className="text-[11px] text-[#6a7a74] mt-0.5">
                  {orient === 'south' ? 'Cool Indirect Light' : orient === 'north' ? 'Abundant Warm Sun' : orient === 'east' ? 'Morning Golden Hour' : 'Late Afternoon Heat'}
                </p>
              </button>
            ))}
          </div>

          {/* Orientation Deep Guidance Card */}
          <div className="bg-[#141C1E] rounded-2xl border border-[#354345] p-8 lg:p-10 space-y-6">
            <h3 className="font-editorial text-3xl text-[#16191c] font-light">
              {activeLight.title}
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h4 className="text-xs font-mono-spec uppercase text-[#5A716C] tracking-wider mb-1">
                    Light Behavior in Melbourne
                  </h4>
                  <p className="text-sm text-[#c5d0cb] leading-relaxed font-light">
                    {activeLight.characteristics}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#231E19] border border-[#3D3126]">
                  <h4 className="text-xs font-mono-spec uppercase text-[#D48954] tracking-wider mb-1">
                    The Common Mistake
                  </h4>
                  <p className="text-xs text-[#C4B29E] leading-relaxed">
                    {activeLight.pitfall}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono-spec uppercase text-[#82C982] tracking-wider mb-1">
                    The Painter Melbourne Prescription
                  </h4>
                  <p className="text-sm text-[#c5d0cb] leading-relaxed font-light">
                    {activeLight.prescription}
                  </p>
                </div>
              </div>

              {/* Right: Curated swatches for this light condition */}
              <div className="lg:col-span-5 bg-[#0F1719] p-6 rounded-xl border border-[#2B2721] space-y-4">
                <span className="text-xs font-mono-spec uppercase text-[#8fb8a8] block">
                  Harmonized Mineral Recommendations
                </span>
                <div className="space-y-3">
                  {activeLight.recommendedColors.map((color, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#1D1B18] border border-[#2E2822]">
                      <div 
                        className="w-10 h-10 rounded-md border border-white/20 shrink-0 shadow-sm"
                        style={{ backgroundColor: color.match(/#([a-fA-F0-9]{6})/)?.[0] || '#8fb8a8' }}
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#16191c] truncate">{color.split(' (')[0]}</p>
                        <p className="text-[10px] font-mono-spec text-[#6a7a74]">{color.match(/\(#.*\)/)?.[0]}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={onOpenAtelier}
                  className="w-full mt-4 py-2.5 rounded-lg bg-[#8fb8a8] hover:bg-[#6a9484] text-xs font-semibold text-[#16191c] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Order Physical Samples For This Room</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Mineral Lime vs Plastic Acrylic */}
      {activeTab === 'chemistry' && (
        <div className="bg-[#141C1E] rounded-2xl border border-[#354345] p-8 lg:p-10 space-y-8 animate-fadeIn">
          <div>
            <span className="text-xs font-mono-spec uppercase tracking-wider text-[#8fb8a8]">Substrate Chemistry</span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#16191c] mt-1 font-light">
              Why Standard Acrylic Paint Suffocates Australian Masonry
            </h3>
            <p className="text-sm text-[#849994] mt-2 max-w-2xl font-light">
              Standard retail paint is essentially liquid plastic (polymers and acrylic resin) that wraps your walls in an impermeable cling-wrap. Mineral finishes become part of the stone itself.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1: Standard Acrylic */}
            <div className="p-6 rounded-xl bg-[#1C1816] border border-[#352520] space-y-4">
              <div className="flex items-center justify-between border-b border-[#30231E] pb-3">
                <span className="text-xs font-mono-spec text-[#D4706A] uppercase">Standard Trade Formulation</span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#35201D] text-[#D4706A]">Synthetic Acrylic</span>
              </div>
              <h4 className="font-editorial text-2xl text-[#E8C5C2]">Polymer Plastic Emulsion</h4>
              <ul className="space-y-3 text-xs text-[#BFA8A5] leading-relaxed">
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-[#D4706A] shrink-0 mt-0.5" />
                  <span><strong>Zero Vapor Permeability:</strong> Traps trapped moisture inside Victorian lath & double brick, causing peeling paint blisters.</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-[#D4706A] shrink-0 mt-0.5" />
                  <span><strong>Flat Light Reflection:</strong> Artificial titanium dioxide reflects light with a clinical glare or dead chalky shadow.</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-[#D4706A] shrink-0 mt-0.5" />
                  <span><strong>High Chemical VOCs:</strong> Off-gasses micro-plastics and synthetic petrochemical odors into living spaces for months.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Artisanal Mineral */}
            <div className="p-6 rounded-xl bg-[#172018] border border-[#273B29] space-y-4">
              <div className="flex items-center justify-between border-b border-[#243325] pb-3">
                <span className="text-xs font-mono-spec text-[#82C982] uppercase">Painter Melbourne Standard</span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#1F3321] text-[#82C982]">Mineral & Lime</span>
              </div>
              <h4 className="font-editorial text-2xl text-[#CDE6CE]">Petrifying Slaked Lime & Marble</h4>
              <ul className="space-y-3 text-xs text-[#A8C7AA] leading-relaxed">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#82C982] shrink-0 mt-0.5" />
                  <span><strong>98% Vapor Permeability:</strong> Naturally breathes, petrifying into the plaster over decades and preventing toxic black mold.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#82C982] shrink-0 mt-0.5" />
                  <span><strong>Micro-Crystalline Refraction:</strong> Calcite crystals scatter daylight in 360 degrees, creating an ethereal, luminous room glow.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#82C982] shrink-0 mt-0.5" />
                  <span><strong>Zero VOC & Hypoallergenic:</strong> Pure natural earth pigments, zero petrochemical odor, naturally antibacterial.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Sheen & Scrub Matrix */}
      {activeTab === 'sheen' && (
        <div className="bg-[#141C1E] rounded-2xl border border-[#354345] p-8 lg:p-10 space-y-8 animate-fadeIn">
          <div>
            <span className="text-xs font-mono-spec uppercase tracking-wider text-[#8fb8a8]">Optical Sheen Dynamics</span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#16191c] mt-1 font-light">
              Selecting the Optimal Sheen for Every Living Zone
            </h3>
            <p className="text-sm text-[#849994] mt-2 max-w-2xl font-light">
              Higher gloss reflects more imperfections on plaster; lower gloss creates velvety depth. Here is our calibrated architectural sheen matrix.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#2C3A3C] text-[#5A716C] font-mono-spec uppercase">
                  <th className="pb-3 pl-2">Sheen Level</th>
                  <th className="pb-3">Gloss Units</th>
                  <th className="pb-3">Visual Quality</th>
                  <th className="pb-3">Cleanability</th>
                  <th className="pb-3">Best Melbourne Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#223032]">
                <tr className="hover:bg-[#1A2426]">
                  <td className="py-3.5 pl-2 font-semibold text-[#16191c]">Ultra-Matte Mineral</td>
                  <td className="py-3.5 font-mono-spec text-[#8fb8a8]">&lt; 2%</td>
                  <td className="py-3.5 text-[#5a6660]">Chalky, zero reflection, hides wall flaws completely</td>
                  <td className="py-3.5 text-[#5a6660]">Light wiping only; naturally self-healing</td>
                  <td className="py-3.5 text-[#c5d0cb]">Limewashed master bedrooms, historic formal ceilings</td>
                </tr>
                <tr className="hover:bg-[#1A2426]">
                  <td className="py-3.5 pl-2 font-semibold text-[#16191c]">Roman Suede Eggshell</td>
                  <td className="py-3.5 font-mono-spec text-[#8fb8a8]">5% - 8%</td>
                  <td className="py-3.5 text-[#5a6660]">Soft suede touch with delicate tactile bloom</td>
                  <td className="py-3.5 text-[#5a6660]">Washable with micro-fiber cloth</td>
                  <td className="py-3.5 text-[#c5d0cb]">Living rooms, libraries, home office sanctuaries</td>
                </tr>
                <tr className="hover:bg-[#1A2426]">
                  <td className="py-3.5 pl-2 font-semibold text-[#16191c]">Burnished Marmorino</td>
                  <td className="py-3.5 font-mono-spec text-[#8fb8a8]">20% - 40%</td>
                  <td className="py-3.5 text-[#5a6660]">Translucent stone luster, silky cool to palm</td>
                  <td className="py-3.5 text-[#5a6660]">High scrub resistance; petrified limestone</td>
                  <td className="py-3.5 text-[#c5d0cb]">Entry foyers, curved galleries, powder room features</td>
                </tr>
                <tr className="hover:bg-[#1A2426]">
                  <td className="py-3.5 pl-2 font-semibold text-[#16191c]">Seamless Microcement</td>
                  <td className="py-3.5 font-mono-spec text-[#8fb8a8]">10% - 25%</td>
                  <td className="py-3.5 text-[#5a6660]">Smooth stone monolith, zero grout lines</td>
                  <td className="py-3.5 text-[#5a6660]">100% waterproof, heavy scrub resistance</td>
                  <td className="py-3.5 text-[#c5d0cb]">Ensuite wet areas, kitchen splashbacks, coastal floors</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: The 4 Cost Levers of Quality */}
      {activeTab === 'investment' && (
        <div className="bg-[#141C1E] rounded-2xl border border-[#354345] p-8 lg:p-10 space-y-8 animate-fadeIn">
          <div>
            <span className="text-xs font-mono-spec uppercase tracking-wider text-[#8fb8a8]">Investment Transparency</span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#16191c] mt-1 font-light">
              The 4 Levers That Determine What Painting Truly Costs
            </h3>
            <p className="text-sm text-[#849994] mt-2 max-w-2xl font-light">
              Why do two painters quote $8,000 and $22,000 for the exact same home? It comes down to invisible substrate prep and artisanal formulation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-[#1C1A17] border border-[#2D2721] space-y-2">
              <span className="font-mono-spec text-xs text-[#8fb8a8]">LEVER 01 (60% OF VALUE)</span>
              <h4 className="font-editorial text-xl text-[#16191c]">Substrate Preparation</h4>
              <p className="text-xs text-[#7A8F8A] leading-relaxed">
                Standard painters skim over cracks with soft drywall filler. We use dustless Festool rotary sanders, mesh reinforcement, and breathable lime mortar.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#1C1A17] border border-[#2D2721] space-y-2">
              <span className="font-mono-spec text-xs text-[#8fb8a8]">LEVER 02</span>
              <h4 className="font-editorial text-xl text-[#16191c]">Material Chemistry</h4>
              <p className="text-xs text-[#7A8F8A] leading-relaxed">
                Commercial bulk plastic paint costs $14/Litre. Aged Italian lime putty, Carrara marble dust, and ceramic coatings cost up to $95/Litre, but last 3x longer.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#1C1A17] border border-[#2D2721] space-y-2">
              <span className="font-mono-spec text-xs text-[#8fb8a8]">LEVER 03</span>
              <h4 className="font-editorial text-xl text-[#16191c]">Artisanal Labor Time</h4>
              <p className="text-xs text-[#7A8F8A] leading-relaxed">
                A roller coats a wall in 4 minutes. Hand-troweling three micro-layers of Marmorino and burnishing with Japanese steel spatulas requires 6 hours of master craft.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#1C1A17] border border-[#2D2721] space-y-2">
              <span className="font-mono-spec text-xs text-[#8fb8a8]">LEVER 04</span>
              <h4 className="font-editorial text-xl text-[#16191c]">Clean Room Protocols</h4>
              <p className="text-xs text-[#7A8F8A] leading-relaxed">
                Full electrostatic air scrubbers, Ram-board floor protection, negative-pressure barriers for spray rooms, and zero dust in your living quarters.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <CleanRoomProtocol />
      </div>
    </div>
  );
}
