import type { Season } from '@/types';

export function getCurrentSeason(): Season {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'fall';
  return 'winter';
}

export function getSeasonLabel(season: Season): string {
  const labels: Record<Season, string> = {
    spring: '봄',
    summer: '여름',
    fall: '가을',
    winter: '겨울',
  };
  return labels[season];
}

export function getSeasonColor(season: Season): string {
  const colors: Record<Season, string> = {
    spring: '#7DC48A',
    summer: '#E8826A',
    fall: '#C4884A',
    winter: '#4A7CB0',
  };
  return colors[season];
}
