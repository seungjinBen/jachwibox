import type { SeasonalTip, Season } from '@/types';
import { getSeasonColor } from '@/lib/season';
import { IconLeaf, IconSun, IconTree, IconSnowflake } from '@tabler/icons-react';

interface TipCardProps {
  tip: SeasonalTip;
  season: Season;
}

const SEASON_ICONS: Record<Season, React.ReactNode> = {
  spring: <IconLeaf size={16} />,
  summer: <IconSun size={16} />,
  fall: <IconTree size={16} />,
  winter: <IconSnowflake size={16} />,
};

export default function TipCard({ tip, season }: TipCardProps) {
  const color = getSeasonColor(season);

  return (
    <div className="bg-surface border border-border rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color }} className="flex-shrink-0">
          {SEASON_ICONS[season]}
        </span>
        <h3 className="font-semibold text-text-primary text-sm">{tip.title}</h3>
      </div>
      <p className="text-text-muted text-sm leading-relaxed">{tip.content}</p>
    </div>
  );
}
