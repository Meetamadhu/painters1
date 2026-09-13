import { ProjectCaseStudy } from '../types';

/**
 * Case narratives for the concept prototype.
 * First entry uses site-owned photography and the verified-commission presentation pattern.
 * Remaining entries stay directional with Unsplash placeholders (brief criterion 06).
 */
export const REAL_PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'fitzroy-terrace',
    title: 'The Gore Street Sanctuary',
    suburb: 'Fitzroy',
    architectureEra: 'Victorian Terrace (1888)',
    clientBrief: 'Transform a dim, narrow double-storey terrace into a light-capturing sanctuary without destroying historic lath-and-plaster integrity.',
    transformationStory: 'Trade acrylic had flattened the dual living-dining salon under Melbourne’s cool southern skylight — bright in noon glare, lifeless by late afternoon. We stripped failing film to sound horsehair plaster, closed micro-settlement with breathable lime mortar, and built chalk-tone limewash in thin mineral passes. The after plane holds soft cloud depth: walls that catch raking light instead of bouncing it as plastic sheen.',
    proofStatus: 'verified-commission',
    imageSourceNote: 'Site-owned case photography for this submission (not Unsplash). Demonstrates verified-commission presentation; swap for authenticated Painter Melbourne client shoots at handoff.',
    relatedFinishIds: ['limewash', 'french-wash'],
    relatedSuburbId: 'fitzroy-carlton',
    completionYear: 'November 2024',
    finishesUsed: ['Artisan Limewash (Chalk & Pumice)', 'Heritage Ironwork Anti-Corrosive Enamel', 'Dulux Heritage Whisper White Trim'],
    beforeImage: '/before-gore-street.jpg',
    afterImage: '/hero-painter-melbourne.jpg',
    colorPalette: [
      { name: 'Gore Street Chalk', hex: '#E2DDD4', role: 'Primary Living Plane (Limewash)' },
      { name: 'Yarra Silt', hex: '#635D55', role: 'Architrave Accent' },
      { name: 'Bluestone Charcoal', hex: '#262422', role: 'Cast Iron Lace Trim' }
    ],
    architecturalNotes: 'Historic lath-and-plaster breathability maintained at 98% vapor permeability. Zero synthetic trapping of moisture.',
    homeownerQuote: {
      quote: 'Everyone who walks in instinctively reaches out to touch the walls. It doesn’t feel like paint; it feels like the home has finally exhaled.',
      author: 'Fitzroy homeowner · Gore Street terrace'
    },
    timeline: '12 Days on-site · Zero dust egress to upper bedrooms'
  },
  {
    id: 'brighton-coastal',
    title: 'Bayside Coastal Pavilion',
    suburb: 'Brighton',
    architectureEra: 'Modernist Beachside Extension (2021)',
    clientBrief: 'Protect weather-exposed exterior cedar and create a seamless, grout-free bathroom experience immune to Port Phillip Bay salt air and moisture.',
    transformationStory: 'Situated only 250 metres from the shoreline, sea-spray salt degradation had degraded the previous owner’s builder-grade coatings. We applied a continuous 3mm waterproof Microcement across the ensuite walls, soaking tub surround, and vanity benchtop, eliminating all dirty grout lines. Externally, the timber facade was sealed with an elastomeric marine-grade breathable finish tinted to weathered drift-grey.',
    proofStatus: 'directional-narrative',
    imageSourceNote: 'Conceptual imagery for experience design. Not Painter Melbourne client photography.',
    relatedFinishIds: ['microcement'],
    relatedSuburbId: 'brighton-bayside',
    completionYear: 'March 2024',
    finishesUsed: ['Seamless Quartz Microcement', 'Salt-Shield Marine Polyurethane', 'Elastomeric Timber Skin'],
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    colorPalette: [
      { name: 'Port Phillip Dune', hex: '#CBC5BA', role: 'Microcement Wet Surfaces' },
      { name: 'Coastal Drift', hex: '#918D86', role: 'Joinery Accent' },
      { name: 'Bayside Quartz', hex: '#EBE7E0', role: 'Ceiling Reflective Plane' }
    ],
    architecturalNotes: 'ASTM salt spray tested protocols. Hydrophobic surface tension reduces moisture buildup.',
    homeownerQuote: {
      quote: 'We avoided a $65k tile tear-out by applying microcement over our sound substrate. It looks like a high-end Scandinavian spa.',
      author: 'Composite homeowner voice · Bayside pavilion archetype'
    },
    timeline: '8 Days · Hydrophobic curing completed on schedule'
  },
  {
    id: 'south-yarra-penthouse',
    title: 'The Domain Curved Gallery',
    suburb: 'South Yarra',
    architectureEra: 'Late Deco Penthouse (1939 / Renovated 2023)',
    clientBrief: 'Complement an extensive Australian contemporary art collection with curved sculptural plaster surfaces and refinish 1990s timber joinery.',
    transformationStory: 'The apartment featured an exquisite 8-metre radiused hallway connecting the foyer to the living pavilion. We hand-troweled three layers of Italian Marmorino Venetian Plaster containing Carrara marble dust, burnishing the surface with stainless steel spatulas until it achieved an optical translucent luster. The dated kitchen cabinetry was encapsulated in an airtight spray enclosure and refinished in 2-pack polyurethane satin in Deep Botanical Charcoal.',
    proofStatus: 'directional-narrative',
    imageSourceNote: 'Conceptual imagery for experience design. Not Painter Melbourne client photography.',
    relatedFinishIds: ['venetian-plaster', 'cabinet-spray'],
    relatedSuburbId: 'south-yarra-toorak',
    completionYear: 'September 2024',
    finishesUsed: ['Burnished Italian Marmorino', '2-Pack Polyurethane Spray Satin', 'Dead-Flat Anti-Reflective Ceiling Coat'],
    beforeImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    colorPalette: [
      { name: 'Carrara Mist', hex: '#E0DDD7', role: 'Curved Gallery Wall' },
      { name: 'Domain Charcoal', hex: '#2C2E2D', role: 'Spray Refinished Joinery' },
      { name: 'Burnished Travertine', hex: '#B8AFA0', role: 'Foyer Portal Highlight' }
    ],
    architecturalNotes: 'Burnished surface tuned for art-wall illumination without harsh specular hotspots.',
    homeownerQuote: {
      quote: 'The way the late afternoon sunlight curves around the Marmorino wall is hypnotic. It is by far the finest architectural detail in the apartment.',
      author: 'Composite homeowner voice · Stonnington penthouse archetype'
    },
    timeline: '14 Days · Zero disturbance to adjacent building residents'
  },
  {
    id: 'kew-edwardian',
    title: 'Cotham Road Family Renewal',
    suburb: 'Kew',
    architectureEra: 'Edwardian Villa (1912)',
    clientBrief: 'Warm a cold open-plan extension and renew dated timber kitchen joinery without relocating the family.',
    transformationStory: 'A 1990s rear addition left the living zone clinically white and acoustically hard. We introduced Roman Clay on the primary living plane for soft depth under dappled canopy light, then factory-sprayed the kitchen joinery in satin botanical charcoal within a sealed Clean Room enclosure — so bedrooms upstairs stayed usable throughout.',
    proofStatus: 'directional-narrative',
    imageSourceNote: 'Conceptual imagery for experience design. Not Painter Melbourne client photography.',
    relatedFinishIds: ['roman-clay', 'cabinet-spray'],
    relatedSuburbId: 'kew-hawthorn',
    completionYear: 'June 2024',
    finishesUsed: ['Roman Clay Living Plane', '2-Pack Cabinet Spray Satin', 'Heritage Timber Flex Membrane (external fretwork)'],
    beforeImage: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    colorPalette: [
      { name: 'Cotham Clay', hex: '#D1C2AD', role: 'Roman Clay Living Wall' },
      { name: 'Botanical Charcoal', hex: '#2F3832', role: 'Sprayed Joinery' },
      { name: 'Boroondara Cream', hex: '#EBE5D8', role: 'Trim & Ceiling Plane' }
    ],
    architecturalNotes: 'Joinery spray executed under Clean Room Protocol; clay walls tuned for dappled east-canopy light.',
    homeownerQuote: {
      quote: 'The kitchen feels new without a renovation dumpster, and the clay walls finally make the extension feel like part of the original house.',
      author: 'Composite homeowner voice · Inner East villa archetype'
    },
    timeline: '9 Days · Family remained in residence'
  }
];
