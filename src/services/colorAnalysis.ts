import { UserProfile } from '../types';

export async function analyzeSkinTone(file: File): Promise<UserProfile> {
  try {
    const imageUrl = await readFileAsDataURL(file);
    const colors = await extractDominantColors(imageUrl);
    
    const skinTone = colors[0] || '#E5B887';
    const undertone = analyzeSkinUndertone(colors);

    return {
      skinTone,
      colorPalette: colors,
      undertone,
    };
  } catch (error) {
    console.error('Color analysis error:', error);
    throw error;
  }
}

async function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function extractDominantColors(imageUrl: string): Promise<string[]> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(['#E5B887', '#D4A373', '#C68B59']);
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const centerX = Math.floor(img.width / 2);
      const centerY = Math.floor(img.height / 2);
      const samplePoints = [
        { x: centerX, y: centerY },
        { x: centerX - 50, y: centerY },
        { x: centerX + 50, y: centerY },
        { x: centerX, y: centerY - 50 },
        { x: centerX, y: centerY + 50 },
      ];

      const colors = samplePoints
        .map(point => {
          const pixel = ctx.getImageData(point.x, point.y, 1, 1).data;
          return rgbToHex(pixel[0], pixel[1], pixel[2]);
        })
        .filter((color, index, self) => self.indexOf(color) === index)
        .slice(0, 3);

      resolve(colors);
    };

    img.onerror = () => {
      resolve(['#E5B887', '#D4A373', '#C68B59']);
    };

    img.src = imageUrl;
  });
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return '#' + toHex(r) + toHex(g) + toHex(b);
}

function analyzeSkinUndertone(colors: string[]): 'warm' | 'cool' | 'neutral' {
  const mainColor = colors[0] || '';
  const r = parseInt(mainColor.slice(1, 3), 16);
  const g = parseInt(mainColor.slice(3, 5), 16);
  const b = parseInt(mainColor.slice(5, 7), 16);

  const redGreenRatio = r / g;
  const blueGreenRatio = b / g;

  if (redGreenRatio > 1.1 && blueGreenRatio < 0.9) return 'warm';
  if (redGreenRatio < 0.9 && blueGreenRatio > 1.1) return 'cool';
  return 'neutral';
}