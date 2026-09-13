import { Sun, Sunset, Moon, Sunrise } from 'lucide-react';
import { TimeOfDay } from '../types';

export const TIME_CONFIGS: Record<TimeOfDay, {
  label: string;
  timeString: string;
  kelvin: string;
  sunAngle: string;
  ambientHex: string;
  description: string;
  icon: typeof Sun;
}> = {
  morning: {
    label: 'Morning',
    timeString: '08:15 AM',
    kelvin: '4200K Soft Daylight',
    sunAngle: '28° Low East Angle',
    ambientHex: '#E8F2EF',
    description: 'Crisp, misted cool daylight revealing subtle surface striae and delicate mineral peaks.',
    icon: Sunrise
  },
  midday: {
    label: 'Midday',
    timeString: '12:45 PM',
    kelvin: '5800K Crisp Sun',
    sunAngle: '68° Overhead Zenith',
    ambientHex: '#f2f6f4',
    description: 'Direct high-noon Melbourne summer light testing sheen scatter and surface glare.',
    icon: Sun
  },
  golden: {
    label: 'Golden',
    timeString: '05:40 PM',
    kelvin: '2800K Amber Glow',
    sunAngle: '16° Low West Rake',
    ambientHex: '#D8E8E3',
    description: 'Deep amber rake that grazes undulating lime peaks and ignites warm mineral undertones.',
    icon: Sunset
  },
  evening: {
    label: 'Evening',
    timeString: '09:10 PM',
    kelvin: '2400K Warm Tungsten',
    sunAngle: 'Ambient Lamplight',
    ambientHex: '#25211D',
    description: 'Intimate 2700K sconce & downlight illumination turning textures into velvety sanctuaries.',
    icon: Moon
  }
};

/** CSS filter for photography under each daylight preset — differences are intentional and visible. */
export function lightingFilterFor(time: TimeOfDay): string {
  switch (time) {
    case 'morning':
      return 'brightness(1.08) contrast(1.04) saturate(0.88) hue-rotate(-12deg)';
    case 'midday':
      return 'brightness(1.22) contrast(1.12) saturate(1.12)';
    case 'golden':
      return 'brightness(1.1) contrast(1.14) sepia(0.42) saturate(1.45)';
    case 'evening':
      return 'brightness(0.58) contrast(1.18) sepia(0.55) saturate(0.75)';
    default:
      return 'none';
  }
}

/** Colour wash layered over media so the hour reads even without staring at filters. */
export function lightingWashFor(time: TimeOfDay): string {
  switch (time) {
    case 'morning':
      return 'linear-gradient(115deg, rgba(180, 210, 220, 0.38) 0%, transparent 48%, rgba(238, 245, 242, 0.28) 100%)';
    case 'midday':
      return 'linear-gradient(180deg, rgba(255, 252, 240, 0.22) 0%, transparent 45%, rgba(255, 255, 255, 0.12) 100%)';
    case 'golden':
      return 'linear-gradient(125deg, rgba(220, 140, 60, 0.32) 0%, rgba(180, 90, 40, 0.12) 40%, transparent 70%)';
    case 'evening':
      return 'linear-gradient(180deg, rgba(20, 16, 28, 0.45) 0%, rgba(60, 35, 20, 0.35) 55%, rgba(30, 22, 18, 0.55) 100%)';
    default:
      return 'none';
  }
}

/** Accent chip colour for the daylight rail. */
export function lightingAccentFor(time: TimeOfDay): string {
  switch (time) {
    case 'morning':
      return '#9eb8c4';
    case 'midday':
      return '#e8d9a8';
    case 'golden':
      return '#d4894a';
    case 'evening':
      return '#6b4a6e';
    default:
      return '#8fb8a8';
  }
}
