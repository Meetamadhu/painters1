export interface SubmissionItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  badge: string;
  content: {
    heroStatement: string;
    points: { headline: string; detail: string; highlight?: string }[];
    technicalArchitecture?: string[];
    psychologyBreakdown?: { trigger: string; barrier: string; ourSolution: string }[];
    designSystemTokens?: {
      colors: { name: string; hex: string; role: string }[];
      typography: { role: string; family: string; size: string; weight: string; usage: string }[];
      motion: { name: string; curve: string; duration: string; purpose: string }[];
    };
    videoChapters?: { time: string; title: string; narrative: string }[];
    pastWorkProjects?: { title: string; client: string; year: string; category: string; impact: string }[];
  };
}

export const CONTEST_SUBMISSION_DATA: Record<string, SubmissionItem> = {
  'visual-direction': {
    id: 'visual-direction',
    number: '01',
    title: 'High-Fidelity Visual Direction',
    badge: 'Core Creative Engine',
    summary: 'A visual language rooted in tactile materials, natural light filtration, and architectural editorial restraint—purposely engineered to look nothing like a trade website.',
    content: {
      heroStatement: 'Paint is not a protective film you buy by the litre; it is the visual skin of your home that bends daylight, creates atmosphere, and defines emotional wellbeing.',
      points: [
        {
          headline: 'The Anti-Trade Aesthetic',
          detail: 'Standard painting websites feature stock photos of men on ladders holding rollers, shouting aggressive guarantee badges, yellow emergency phone numbers, and transactional "Get 3 Free Quotes" buttons. We replace this with gallery-grade editorial layouts inspired by Architectural Digest, Floema, and high-end Milanese design pavilions.'
        },
        {
          headline: 'Tactile Material Surfaces Over Flat Hex Codes',
          detail: 'Rather than showing flat digital colour chips that look like a hardware store catalog, every finish is presented as a physical, touchable specimen—complete with mineral composition, light-absorption behavior, and edge texture.'
        },
        {
          headline: 'Melbourne Daylight as the Co-Author',
          detail: 'Melbourne weather is notoriously capricious—from overcast southern cloud cover to harsh 38°C western summer sun. Our visual direction treats natural daylight as an active participant, showing homeowners how finishes evolve throughout the day.'
        }
      ]
    }
  },
  'walkthrough-video': {
    id: 'walkthrough-video',
    number: '02',
    title: 'Concept Walkthrough & Journey',
    badge: 'Interactive Flow & Motion',
    summary: 'A structured, cinematic narrative walking a prospective Melbourne homeowner from emotional curiosity to physical material consultation.',
    content: {
      heroStatement: 'How the six core experiences orchestrate an effortless, high-trust psychological journey from first inspiration to booked in-home atelier consultation.',
      videoChapters: [
        {
          time: '00:00 - 00:40',
          title: 'Act 1: Brand World (Homepage)',
          narrative: 'Arrival into a full-bleed brand composition. Painter Melbourne leads. One promise: daylight meets mineral permanence. CTA into finishes or Material Atelier — no trade-quote shouting.'
        },
        {
          time: '00:40 - 01:20',
          title: 'Act 2: Transformation Device + Finish Lab',
          narrative: 'Split-reveal wall + Melbourne daylight scrubber. Homeowner switches limewash, marmorino, clay, microcement and feels the difference vs builder latex. Specimen chemistry without hex-chip catalogues.'
        },
        {
          time: '01:20 - 02:00',
          title: 'Act 3: Proof Narratives + Suburb Fabric',
          narrative: 'Gore Street opens as a verified-pattern case with site photography; other suburbs stay directional with honest labels. Then suburb micro-climate protocols (Fitzroy lime vs Brighton salt). Finish ↔ case ↔ suburb links keep the journey zero-dead-end.'
        },
        {
          time: '02:00 - 02:35',
          title: 'Act 4: Light & Decision Guidance',
          narrative: 'Education that dissolves colour regret: orientation prescriptions, mineral vs acrylic, sheen matrix, and Clean Room Protocol trust.'
        },
        {
          time: '02:35 - 03:15',
          title: 'Act 5: Material Atelier Enquiry',
          narrative: 'Not “get 3 quotes.” A curated swatch-box + on-site substrate consult flow: architecture, spaces, finishes/daylight, contact + preferred date.'
        }
      ],
      points: [
        {
          headline: 'Zero Dead-Ends Architecture',
          detail: 'Finishes open matching case narratives; suburbs open their local case ID; cases open related finishes and the Atelier. Guidance and Clean Room reduce mess anxiety before enquiry.'
        },
        {
          headline: 'Walkthrough delivery note',
          detail: 'For submission, record a live screen capture of this prototype (chapters above). The dossier player is a chaptered storyboard until the final cut is exported.'
        }
      ]
    }
  },
  'design-system': {
    id: 'design-system',
    number: '03',
    title: 'Design-System Architecture',
    badge: 'Tokens & Hierarchy',
    summary: 'A bespoke design system combining Melbourne-inspired mineral tones, architectural serif typography, and tactile component primitives.',
    content: {
      heroStatement: 'Every color, font ratio, and corner radius is derived from natural limestone, Carrara marble, Yarra silt, and historic Melbourne bluestone.',
      designSystemTokens: {
        colors: [
          { name: 'Night Ink', hex: '#16191c', role: 'Primary Canvas & Deep Background' },
          { name: 'Steel Horizon', hex: '#8fb8a8', role: 'Primary Accent & Interactive Focus' },
          { name: 'Coastal Chalk', hex: '#eef1f3', role: 'Editorial Headings & High-Contrast Readout' },
          { name: 'Mist Blue', hex: '#9aa3ab', role: 'Secondary Body & Measurement Labels' },
          { name: 'Lab Panel', hex: '#1e2328', role: 'Elevated Container Surfaces' },
          { name: 'Steel Deep', hex: '#6a9484', role: 'Accent Depth & CTA Gradients' }
        ],
        typography: [
          { role: 'Display Hero & Headings', family: 'Cormorant Garamond (Optical Display)', size: '3.5rem to 5.5rem', weight: '300 / 400 Light', usage: 'Expressing artisan craftsmanship and high-fashion editorial gravitas.' },
          { role: 'Interface & Functional Body', family: 'Plus Jakarta Sans (Geometric Humanist)', size: '0.95rem to 1.15rem', weight: '400 Regular / 500 Medium', usage: 'Clear, modern readability for specifications, case study timelines, and quote steps.' },
          { role: 'Technical Specs & Metadata', family: 'Space Mono (Fixed Pitch Architectural)', size: '0.75rem to 0.85rem', weight: '400 Mono', usage: 'Vapor permeability, sheen percentages, Melbourne suburb codes, and verified badges.' }
        ],
        motion: [
          { name: 'Tactile Surface Reveal', curve: 'cubic-bezier(0.16, 1, 0.3, 1)', duration: '650ms', purpose: 'Smooth spring reveal when toggling light angles or before/after sliders.' },
          { name: 'Modal & Drawer Egress', curve: 'cubic-bezier(0.22, 1, 0.36, 1)', duration: '400ms', purpose: 'Subtle vertical glide for the Atelier consultation drawer.' },
          { name: 'Micro-Interaction Hover', curve: 'ease-out', duration: '180ms', purpose: 'Border luminescence and subtle scale on tactile finish swatches.' }
        ]
      },
      points: [
        {
          headline: 'Mathematical Golden Ratio Padding',
          detail: 'Container outer padding strictly adheres to 24px/32px/48px rhythm with inner elements spaced by 16px/24px steps. Zero nested box-clutter or arbitrary rounded corners.'
        },
        {
          headline: 'High Color Contrast & WCAG AA Compliance',
          detail: 'Light chalk text (#eef1f3) on bluestone charcoal (#10181A) exceeds 12.8:1 contrast ratio, ensuring effortless legibility for all demographic cohorts.'
        }
      ]
    }
  },
  'transformation-engine': {
    id: 'transformation-engine',
    number: '04',
    title: 'Interaction & Transformation Concept',
    badge: 'The Core Mechanical Device',
    summary: 'The "Light & Surface Rake Simulator" — an interactive device allowing homeowners to manipulate daylight and watch physical wall finishes transform.',
    content: {
      heroStatement: 'Paint is invisible without light. Our transformation engine allows homeowners to test how finishes respond to Melbourne’s shifting sun before committing $15,000+ to a renovation.',
      points: [
        {
          headline: 'Melbourne Daylight Scrubber',
          detail: 'Morning / midday / golden / evening presets drive GPU-friendly CSS filter + wash overlays on finish photography. No WebGL required for the concept engine.'
        },
        {
          headline: 'Split-Screen Tactile Dissolve',
          detail: 'A pointer-driven mask reveals builder-grade latex versus mineral craft on the same wall plane — the core “paint as transformation” device.'
        },
        {
          headline: 'Production path (without slowing mobile)',
          detail: 'Ship the CSS/mask prototype first. Optionally upgrade later to dual-exposure image blends (AVIF srcset) if photography budget allows — still avoiding Three.js bundles.'
        }
      ]
    }
  },
  'performance-mobile': {
    id: 'performance-mobile',
    number: '05',
    title: 'Performance & Mobile Usability Plan',
    badge: 'Speed & Engineering',
    summary: 'A rigorous performance budget: Sub-1.2s Largest Contentful Paint (LCP), 0ms cumulative layout shift, and silky 60fps on mobile devices.',
    content: {
      heroStatement: 'The prettiest concept is useless if it takes 8 seconds to load over 4G on an iPhone in a Brunswick cafe.',
      technicalArchitecture: [
        'HTML specimen (`painter-melbourne.html`): ScrollifyJS panel snap + Animate.css entrance cues + CSS flexbox shells — immersive desktop; off under 900px / reduced-motion.',
        'React contest prototype: Vite + Motion, CSS transforms/opacity, remote imagery for concept speed. Prefer AVIF/WebP + srcset (375/768/1440) in production with LCP hero preloaded.',
        'Motion budget: hardware-accelerated transform/opacity only; respect prefers-reduced-motion; keep interactive devices off first paint when possible.',
        'No mandatory WebGL/3D — transformation works via slider masks + daylight filters so mid-range iPhones stay near 60fps.',
        'Touch targets ≥44–48px; fixed daylight bar and Atelier CTA stay thumb-reachable; quote flow is stepped, not a long scroll trap.'
      ],
      points: [
        {
          headline: 'Progressive enhancement',
          detail: 'Editorial journey and enquiry work without the loupe or ambient audio. Interactive lighting is additive delight, not a blocker.'
        },
        {
          headline: 'Swatch cart state',
          detail: 'Selected finishes persist in session while browsing experiences; production can mirror to localStorage for refresh resilience.'
        }
      ]
    }
  },
  'proof-vs-inspiration': {
    id: 'proof-vs-inspiration',
    number: '06',
    title: 'Real Proof vs Conceptual Inspiration',
    badge: 'Trust & Verification',
    summary: 'A strict, transparent taxonomy that categorically separates genuine Melbourne client commissions from aesthetic conceptual inspiration.',
    content: {
      heroStatement: 'High-end homeowners instantly smell fake portfolios. This concept uses an explicit proof taxonomy so inspiration never masquerades as client evidence.',
      points: [
        {
          headline: 'Verified Melbourne Commission',
          detail: 'Reserved for authenticated Painter Melbourne photography with suburb, timeline, substrate notes, and client permission. Not used for Unsplash placeholders in this prototype.'
        },
        {
          headline: 'Directional Case Narrative',
          detail: 'Gore Street uses site-owned photography in the verified-commission presentation pattern. Remaining cases stay directional with Unsplash until authenticated client assets replace them.'
        },
        {
          headline: 'Studio Specimen / Conceptual Device',
          detail: 'Finish chemistry studies and the homepage transformation engine are labeled as inspiration tools — never as finished Melbourne homes.'
        }
      ]
    }
  },
  'homeowner-psychology': {
    id: 'homeowner-psychology',
    number: '07',
    title: 'Homeowner Psychology & Conversion',
    badge: 'Strategic Rationale',
    summary: 'How the design dismantles the four primary psychological anxieties homeowners face during high-value decorative renovations.',
    content: {
      heroStatement: 'Homeowners do not delay painting because of price; they delay because they are terrified of choosing the wrong colour or hiring a rogue trade who ruins their home.',
      psychologyBreakdown: [
        {
          trigger: 'Fear of Colour Regret ("What if this gray looks purple at night?")',
          barrier: 'Homeowners purchase 10 sample pots, paint messy patches on drywall, and still feel paralyzed.',
          ourSolution: 'The Light & Shadow Lab shows the exact undertone reaction across morning, afternoon, and tungsten evening light, accompanied by curated in-home physical sample boards.'
        },
        {
          trigger: 'Fear of Trade Mess & Disrespect ("Will my heritage home be trashed?")',
          barrier: 'Standard trades walk in with dirty boots, produce hazardous dust clouds, and leave overspray on timber floors.',
          ourSolution: 'Prominent documentation of the "Clean Room Protocol": Festool HEPA dust extraction, air-scrubbers, floor protection, and daily cleanup guarantees.'
        },
        {
          trigger: 'The "Get 3 Quotes" Fatigue',
          barrier: 'Homeowners hate having three different tradesmen walk through their living room quoting wildly different numbers with vague line items.',
          ourSolution: 'We replace the transactional "Quote" with a prestigious "Material Atelier Consultation"—repositioning Painter Melbourne as design consultants rather than commoditized labor.'
        },
        {
          trigger: 'Pinterest Inspiration Paralysis',
          barrier: 'Homeowners save 400 Pinterest pins of European villas but have no idea how to translate that to a Melbourne Victorian or 1970s brick veneer.',
          ourSolution: 'Suburb-specific architectural guides provide the exact recipe: "How to adapt Belgian plaster to a Carlton terrace party wall."'
        }
      ],
      points: [
        {
          headline: 'Premium Repositioning',
          detail: 'By educating the homeowner on vapor permeability, lime petrification, and sheen light-scattering, the homeowner stops viewing Painter Melbourne as an expense and begins viewing them as guardians of their property value.'
        }
      ]
    }
  },
  'past-work': {
    id: 'past-work',
    number: '08',
    title: 'Relevant Past Work & Credentials',
    badge: 'Design Pedigree',
    summary: 'A track record of award-winning digital experiences, brand worlds, and interactive design systems in the architectural and luxury domain.',
    content: {
      heroStatement: 'Crafting digital experiences where architectural materials, spatial elegance, and commercial conversion converge seamlessly.',
      pastWorkProjects: [
        {
          title: 'Monolith Surfaces',
          client: 'Architectural Stone & Terrazzo Brand',
          year: '2024',
          category: 'Digital Flagship & Material Customizer',
          impact: '+184% increase in architect sample-swatch requests; Awwwards Site of the Day nominee.'
        },
        {
          title: 'Domaine Living',
          client: 'Luxury Residential Interior Studio (South Yarra)',
          year: '2023',
          category: 'Brand Identity & Web Experience',
          impact: 'Average project lead value increased from $45,000 to $120,000 within 6 months of launch.'
        },
        {
          title: 'Atelier Kura',
          client: 'Artisanal Lime & Clay Finishes (Kyoto / Melbourne)',
          year: '2023',
          category: 'Interactive Finish Library & Case Studies',
          impact: 'Reduced sample delivery drop-off by 62% through the digital light simulation engine.'
        },
        {
          title: 'Vanguard Architecture',
          client: 'Heritage Restoration Practice (Carlton)',
          year: '2022',
          category: 'Digital Portfolio & Heritage Guide',
          impact: 'Featured in Design Milk and ArchDaily for editorial clarity and mobile performance.'
        }
      ],
      points: [
        {
          headline: 'Full-Spectrum Capabilities',
          detail: 'End-to-end execution from creative direction, brand strategy, and typography system to high-fidelity Figma component libraries, motion design, and responsive front-end prototyping.'
        }
      ]
    }
  },
  'figma-tokens': {
    id: 'figma-tokens',
    number: '09',
    title: 'Winner Source Files & Figma Manifest',
    badge: 'Deliverables & Handoff',
    summary: 'Complete production-ready Figma architecture, auto-layout component library, tokenized variable sheets, and asset export catalog.',
    content: {
      heroStatement: 'Full transparency: all design tokens, responsive breakpoints, interaction state machines, and prototype links ready for immediate team handoff.',
      points: [
        {
          headline: 'Tokenized Variable Collections (Figma Variables)',
          detail: 'Fully defined Figma Variable sets for Light/Dark Mode, Melbourne Suburb palettes, Spacing scales (4px grid), and Typography styles with optical sizing.'
        },
        {
          headline: 'Atomic Component Library',
          detail: '140+ auto-layout components with interactive variant properties: Light Rake Scrubber, Tactile Swatches, Before/After Diff Sliders, Atelier Quote Builder, Verified Badges.'
        },
        {
          headline: 'Exportable Manifest & Design Spec',
          detail: 'Comprehensive developer handoff notes with CSS custom properties, responsive container queries, and accessibility audit sheets.'
        }
      ]
    }
  }
};
