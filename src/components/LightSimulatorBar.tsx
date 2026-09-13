import { Compass } from 'lucide-react';
import { TimeOfDay } from '../types';
import { TIME_CONFIGS } from '../data/timeConfigs';

interface LightSimulatorBarProps {
  currentTime: TimeOfDay;
  onTimeChange: (time: TimeOfDay) => void;
  className?: string;
}

export default function LightSimulatorBar({ currentTime, onTimeChange, className = '' }: LightSimulatorBarProps) {
  const current = TIME_CONFIGS[currentTime];

  return (
    <div
      className={`w-full bg-[#ffffff]/92 backdrop-blur-xl border-b border-[#c9d4ce] px-3 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-2 sm:gap-4 ${className}`}
    >
      <div className="flex items-center gap-2 pr-2 sm:pr-3 border-r border-[#c9d4ce] shrink-0 min-w-0">
        <Compass className="w-3.5 h-3.5 text-[#4a6b5e] shrink-0" />
        <div className="min-w-0">
          <p className="text-[9px] uppercase tracking-[0.15em] font-mono-spec text-[#5a6660]">Daylight</p>
          <p className="text-[11px] sm:text-xs font-semibold text-[#16191c] leading-tight tabular-nums">
            {current.timeString}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-0.5 sm:gap-1 flex-1 overflow-x-auto">
        {(Object.keys(TIME_CONFIGS) as TimeOfDay[]).map((timeKey) => {
          const cfg = TIME_CONFIGS[timeKey];
          const Icon = cfg.icon;
          const isActive = currentTime === timeKey;

          return (
            <button
              key={timeKey}
              type="button"
              onClick={() => onTimeChange(timeKey)}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-[#4a6b5e] text-[#f4f6f4] font-semibold'
                  : 'text-[#5a6660] hover:text-[#16191c] hover:bg-[#e8eeea]'
              }`}
              title={`${cfg.label} — ${cfg.description}`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#f4f6f4]' : 'text-[#8fb8a8]'}`} />
              <span className="hidden sm:inline">{cfg.label}</span>
            </button>
          );
        })}
      </div>

      <p className="hidden md:block text-[10px] sm:text-[11px] font-mono-spec text-[#4a6b5e] shrink-0 max-w-44 lg:max-w-56 truncate pl-2 sm:pl-3 border-l border-[#c9d4ce] text-right">
        {current.kelvin}
      </p>
    </div>
  );
}
