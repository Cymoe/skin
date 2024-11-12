import { HSL, Undertone, Season } from '../types';

export function hexToHSL(hex: string): HSL {
  // Remove the hash if present
  hex = hex.replace(/^#/, '');

  // Parse the hex values
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

export function HSLToHex({ h, s, l }: HSL): string {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function generateHarmonizedPalette(baseColor: string): string[] {
  const baseHSL = hexToHSL(baseColor);
  const palette: HSL[] = [];

  // Analogous colors
  palette.push(
    { h: (baseHSL.h + 30) % 360, s: baseHSL.s, l: baseHSL.l },
    { h: (baseHSL.h - 30 + 360) % 360, s: baseHSL.s, l: baseHSL.l }
  );

  // Complementary color
  palette.push({ h: (baseHSL.h + 180) % 360, s: baseHSL.s, l: baseHSL.l });

  // Triadic colors
  palette.push(
    { h: (baseHSL.h + 120) % 360, s: baseHSL.s, l: baseHSL.l },
    { h: (baseHSL.h + 240) % 360, s: baseHSL.s, l: baseHSL.l }
  );

  return palette.map(HSLToHex);
}

export function generateFashionColorPalette(baseColor: string, undertone: Undertone, season: Season) {
  const baseHSL = hexToHSL(baseColor);
  
  return {
    primary: generatePrimaryColors(baseHSL, undertone, season),
    accent: generateAccentColors(baseHSL, undertone, season),
    neutral: generateNeutralColors(baseHSL, undertone)
  };
}

function generatePrimaryColors(baseHSL: HSL, undertone: Undertone, season: Season): string[] {
  const colors: HSL[] = [];
  
  switch (undertone) {
    case 'warm':
      colors.push(
        { h: 20, s: 70, l: 55 },
        { h: 35, s: 85, l: 50 },
        { h: 15, s: 75, l: 45 }
      );
      break;
    case 'cool':
      colors.push(
        { h: 220, s: 60, l: 45 },
        { h: 340, s: 50, l: 50 },
        { h: 180, s: 45, l: 45 }
      );
      break;
    case 'neutral':
      colors.push(
        { h: 15, s: 30, l: 50 },
        { h: 200, s: 30, l: 55 },
        { h: 150, s: 25, l: 45 }
      );
      break;
  }

  if (season === 'summer' || season === 'spring') {
    colors.forEach(color => {
      color.l += 10;
      color.s -= 10;
    });
  }

  return colors.map(HSLToHex);
}

function generateAccentColors(baseHSL: HSL, undertone: Undertone, season: Season): string[] {
  const colors: HSL[] = [];
  
  switch (undertone) {
    case 'warm':
      colors.push(
        { h: 45, s: 90, l: 65 },
        { h: 15, s: 80, l: 65 },
        { h: 30, s: 85, l: 60 }
      );
      break;
    case 'cool':
      colors.push(
        { h: 280, s: 50, l: 65 },
        { h: 200, s: 55, l: 70 },
        { h: 320, s: 45, l: 65 }
      );
      break;
    case 'neutral':
      colors.push(
        { h: 45, s: 40, l: 65 },
        { h: 330, s: 35, l: 65 },
        { h: 200, s: 35, l: 70 }
      );
      break;
  }

  if (season === 'autumn' || season === 'winter') {
    colors.forEach(color => {
      color.s += 10;
      color.l -= 5;
    });
  }

  return colors.map(HSLToHex);
}

function generateNeutralColors(baseHSL: HSL, undertone: Undertone): string[] {
  const colors: HSL[] = [];
  
  switch (undertone) {
    case 'warm':
      colors.push(
        { h: 30, s: 15, l: 90 },
        { h: 25, s: 20, l: 30 },
        { h: 35, s: 15, l: 60 }
      );
      break;
    case 'cool':
      colors.push(
        { h: 220, s: 15, l: 90 },
        { h: 240, s: 15, l: 25 },
        { h: 200, s: 10, l: 65 }
      );
      break;
    case 'neutral':
      colors.push(
        { h: 0, s: 0, l: 95 },
        { h: 0, s: 0, l: 20 },
        { h: 0, s: 0, l: 60 }
      );
      break;
  }

  return colors.map(HSLToHex);
}