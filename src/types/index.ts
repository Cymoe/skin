export type Undertone = 'warm' | 'cool' | 'neutral';
export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface UserProfile {
  colorPalette?: string[];
  skinTone: string;
  undertone?: Undertone;
  season: Season;
}