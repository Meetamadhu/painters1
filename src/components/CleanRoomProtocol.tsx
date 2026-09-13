import { Wind, Shield, Sparkles } from 'lucide-react';

/** Trust module addressing mess/disrespect anxiety — brief criterion psychology. */
export default function CleanRoomProtocol({ className = '' }: { className?: string }) {
  return (
    <section className={`border border-[#c9d4ce] bg-[#121A1C] ${className}`}>
      <div className="px-5 sm:px-6 py-4 border-b border-[#2C3A3C] flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono-spec text-[10px] uppercase tracking-[0.18em] text-[#8fb8a8]">
            Clean Room Protocol
          </p>
          <h3 className="font-editorial text-2xl text-[#16191c] mt-1 font-light">
            Heritage homes stay livable while we work
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#2C3A3C]">
        {[
          {
            Icon: Wind,
            title: 'Festool HEPA extraction',
            copy: 'Dust controlled at source on sanding and prep — not blown into bedrooms.'
          },
          {
            Icon: Shield,
            title: 'Floor & joinery armour',
            copy: 'Full protection systems, edge masking, and daily reset of occupied zones.'
          },
          {
            Icon: Sparkles,
            title: 'Air scrubbing & exit clean',
            copy: 'Air scrubbers where needed; walk-away standard that respects family life.'
          }
        ].map(({ Icon, title, copy }) => (
          <div key={title} className="bg-[#0E1618] p-5">
            <Icon className="w-4 h-4 text-[#8fb8a8] mb-3" />
            <p className="text-sm font-medium text-[#16191c]">{title}</p>
            <p className="mt-1.5 text-xs text-[#5a6660] font-light leading-relaxed">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
