import { SuburbProfile } from '../types';

export const SUBURBS_DATA: SuburbProfile[] = [
  {
    id: 'fitzroy-carlton',
    name: 'Fitzroy & Carlton',
    region: 'Inner North',
    housingType: 'Double & Single-Fronted Victorian Terraces (1870–1905)',
    climateFactors: 'Narrow allotment shading, low natural southern sunlight, damp masonry boundary walls.',
    heritageCovenants: 'City of Yarra & Melbourne Heritage Overlays: strict historical facade palettes and lime-compatible vapor specifications.',
    recommendedFinishes: ['Artisan Limewash', 'French Wash Glaze', 'Heritage Cast-Iron Preservation Enamels'],
    suburbPalette: [
      { name: 'Gore St Lime', hex: '#E4DFD5', inspiration: 'Lath-and-plaster breathable white' },
      { name: 'Carlton Lacework', hex: '#2B2B2B', inspiration: 'Historic Victorian iron balustrades' },
      { name: 'Brunswick Ochre', hex: '#C29A6B', inspiration: '19th-century pressed red-clay brickwork' }
    ],
    localCaseStudyId: 'fitzroy-terrace',
    description: 'Victorian terraces in the Inner North suffer when coated in plastic latex paints that trap moisture behind double-brick party walls. We formulate lime-based, micro-porous mineral systems that allow historic Australian masonry to breathe while bouncing daylight deep into long, narrow floor plans.'
  },
  {
    id: 'brighton-bayside',
    name: 'Brighton & Sandringham',
    region: 'Bayside',
    housingType: 'Coastal Weatherboards & Modern Architectural Pavilions',
    climateFactors: 'Persistent airborne marine salt, driving south-westerly squalls, high UV reflection off sand and water.',
    heritageCovenants: 'Bayside City Council coastal protection guidelines; exterior reflectivity restrictions.',
    recommendedFinishes: ['Quartz Microcement', 'Elastomeric Timber Skin', 'Marine-Grade Satin Polyurethane'],
    suburbPalette: [
      { name: 'Port Phillip Foam', hex: '#DFDDD7', inspiration: 'Bay salt-spray and sea foam' },
      { name: 'Bathing Box Charcoal', hex: '#3B4147', inspiration: 'Weathered coastal storm clouds' },
      { name: 'Coastal Dune Sand', hex: '#C8BFA8', inspiration: 'Native tea-tree coastal sand dunes' }
    ],
    localCaseStudyId: 'brighton-coastal',
    description: 'Properties along Beach Road and the Golden Mile experience up to 4x the atmospheric salinity of inland suburbs. Ordinary trade paints blister and chalk within 36 months. Our coastal protocols utilize UV-absorbing inorganic ceramic pigments and elastomeric primers that flex with coastal timber expansion.'
  },
  {
    id: 'south-yarra-toorak',
    name: 'Toorak & South Yarra',
    region: 'Heritage South',
    housingType: 'Italianate Mansions, Art Deco Apartments & Luxury Penthouses',
    climateFactors: 'Expansive glazed curtain walls requiring anti-glare finishes; high internal volume requiring acoustic dampening.',
    heritageCovenants: 'City of Stonnington strict significance registers; conservation guidelines for interior cornices and ceiling roses.',
    recommendedFinishes: ['Burnished Venetian Plaster', 'Roman Clay', 'Factory Cabinet Polyurethane Spray'],
    suburbPalette: [
      { name: 'Stonnington Travertine', hex: '#DDD6C9', inspiration: 'European limestone colonnades' },
      { name: 'Yarra Botanical Green', hex: '#39463F', inspiration: 'Royal Botanic Gardens foliage' },
      { name: 'Domain Slate', hex: '#303033', inspiration: 'Historic Welsh roofing slate' }
    ],
    localCaseStudyId: 'south-yarra-penthouse',
    description: 'Homeowners in Stonnington demand gallery-grade wall surfaces capable of showcasing million-dollar art collections without plastic sheen interference. Our Venetian and Roman Clay installations provide acoustic dampening and tactile luxury that standard painting firms cannot execute.'
  },
  {
    id: 'kew-hawthorn',
    name: 'Kew & Hawthorn',
    region: 'Inner East',
    housingType: 'Edwardian Villas, Queen Anne Homesteads & Mid-Century Modern',
    climateFactors: 'Dense tree canopy shading creating dappled light and seasonal lichen on external timber fretwork.',
    heritageCovenants: 'City of Boroondara heritage precincts; strict preservation of original external fretwork and joinery.',
    recommendedFinishes: ['Roman Clay', 'Cabinet Joinery Spraying', 'Heritage Timber Flex Membrane'],
    suburbPalette: [
      { name: 'Cotham Clay', hex: '#D1C2AD', inspiration: 'Warm earthen plaster warmth' },
      { name: 'Yarra Bend Bronze', hex: '#635340', inspiration: 'Dappled river red-gum bark' },
      { name: 'Boroondara Cream', hex: '#EBE5D8', inspiration: 'Classic Edwardian timber barge-board' }
    ],
    localCaseStudyId: 'kew-edwardian',
    description: 'In Kew and Hawthorn, expansive family floor plans often have dated 1990s timber kitchens and cold, sterile open-plan extensions. Our cabinet spraying techniques completely rejuvenate massive kitchen joinery in 4 days, paired with Roman clay living walls that create cozy family intimacy.'
  }
];
