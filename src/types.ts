export type Undertone = 'warm' | 'cool' | 'neutral';

export interface UserProfile {
  colorPalette?: string[];
  skinTone: string;
  undertone?: Undertone;
}