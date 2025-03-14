import type { Note, Pattern } from '../types';

// Musical scales for different moods
const scales = {
  happy: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
  melancholic: ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'],
  jazzy: ['D4', 'F4', 'A4', 'C5', 'E5', 'G5'],
  peaceful: ['G3', 'B3', 'D4', 'G4', 'B4', 'D5'],
};

type ScaleType = keyof typeof scales;

// Duration patterns
const durations = ['8n', '4n', '2n'];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateTimingPattern(length: number): number[] {
  const timings: number[] = [];
  let currentTime = 0;
  
  for (let i = 0; i < length; i++) {
    timings.push(currentTime);
    currentTime += Math.random() < 0.3 ? 0.25 : 0.5;
  }
  
  return timings;
}

export function generateMusicPattern(mood: string = 'peaceful', complexity: number = 0.5): Pattern {
  const scale = scales[mood as ScaleType] || scales.peaceful;
  const noteCount = Math.floor(8 + complexity * 8); // 8-16 notes based on complexity
  
  const notes: Note[] = [];
  const timings = generateTimingPattern(noteCount);
  
  for (let i = 0; i < noteCount; i++) {
    const pitch = getRandomElement(scale);
    const duration = getRandomElement(durations);
    
    notes.push({
      pitch,
      duration,
      timing: timings[i]
    });
  }
  
  // Sort notes by timing
  notes.sort((a, b) => a.timing - b.timing);
  
  return {
    name: `${mood.charAt(0).toUpperCase() + mood.slice(1)} Generation`,
    notes,
    description: `An AI-generated ${mood} melody pattern`
  };
}