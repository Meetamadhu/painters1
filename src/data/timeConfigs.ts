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
