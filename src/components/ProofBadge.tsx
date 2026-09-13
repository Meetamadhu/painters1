import { ShieldCheck, Sparkles, FlaskConical } from 'lucide-react';

export type ProofKind = 'verified-commission' | 'directional-narrative' | 'studio-specimen' | 'conceptual-device';

const PROOF_META: Record<ProofKind, {
  label: string;
  detail: string;
  className: string;
  Icon: typeof ShieldCheck;
}> = {
  'verified-commission': {
    label: 'Verified Melbourne commission',
    detail: 'Authenticated client project with suburb, timeline, and substrate notes.',
    className: 'bg-[#1A2A1C] border-[#3A5A3C] text-[#9ED99E]',
    Icon: ShieldCheck
  },
  'directional-narrative': {
    label: 'Directional case narrative',
    detail: 'Commission-shaped story for experience design. Imagery is conceptual placeholder, not client photography.',
    className: 'bg-[#1A2428] border-[#3A5058] text-[#8BC4B6]',
    Icon: Sparkles
  },
  'studio-specimen': {
    label: 'Studio material specimen',
    detail: 'Finish chemistry and light response study — not a finished home claim.',
    className: 'bg-[#1C2220] border-[#c9d4ce] text-[#8fb8a8]',
    Icon: FlaskConical
  },
  'conceptual-device': {
    label: 'Conceptual transformation device',
    detail: 'Interactive inspiration to explore light and surface. Separate from verified proof.',
    className: 'bg-[#1C2220] border-[#c9d4ce] text-[#A8BDA3]',
    Icon: Sparkles
  }
};

interface ProofBadgeProps {
  kind: ProofKind;
  compact?: boolean;
  className?: string;
}

export default function ProofBadge({ kind, compact = false, className = '' }: ProofBadgeProps) {
  const meta = PROOF_META[kind];
  const Icon = meta.Icon;

  return (
    <div
      className={`inline-flex ${compact ? 'items-center gap-1.5 px-2.5 py-1' : 'flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5 px-3 py-2'} border text-left ${meta.className} ${className}`}
      title={meta.detail}
    >
      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono-spec uppercase tracking-wider font-semibold">
        <Icon className="w-3.5 h-3.5 shrink-0" />
        {meta.label}
      </span>
      {!compact && (
        <span className="text-[11px] opacity-80 font-light leading-snug max-w-xl">
          {meta.detail}
        </span>
      )}
    </div>
  );
}
