import type { Pattern } from '../types';

export const musicPatterns: Pattern[] = [
  {
    name: 'Peaceful Melody',
    description: 'A gentle, calming sequence perfect for relaxation',
    notes: [
      { pitch: 'C4', duration: '4n', timing: 0 },
      { pitch: 'E4', duration: '4n', timing: 0.5 },
      { pitch: 'G4', duration: '4n', timing: 1 },
      { pitch: 'C5', duration: '2n', timing: 1.5 },
      { pitch: 'B4', duration: '4n', timing: 2.5 },
      { pitch: 'A4', duration: '4n', timing: 3 },
      { pitch: 'G4', duration: '2n', timing: 3.5 }
    ]
  },
  {
    name: 'Upbeat Rhythm',
    description: 'An energetic pattern with a positive vibe',
    notes: [
      { pitch: 'E4', duration: '8n', timing: 0 },
      { pitch: 'G4', duration: '8n', timing: 0.25 },
      { pitch: 'A4', duration: '8n', timing: 0.5 },
      { pitch: 'B4', duration: '8n', timing: 0.75 },
      { pitch: 'C5', duration: '4n', timing: 1 },
      { pitch: 'B4', duration: '8n', timing: 1.5 },
      { pitch: 'A4', duration: '8n', timing: 1.75 },
      { pitch: 'G4', duration: '2n', timing: 2 }
    ]
  },
  {
    name: 'Jazz Progression',
    description: 'A smooth jazz-inspired chord progression',
    notes: [
      { pitch: 'D4', duration: '4n', timing: 0 },
      { pitch: 'F#4', duration: '4n', timing: 0.25 },
      { pitch: 'A4', duration: '4n', timing: 0.5 },
      { pitch: 'C5', duration: '4n', timing: 1 },
      { pitch: 'B4', duration: '4n', timing: 1.5 },
      { pitch: 'G4', duration: '4n', timing: 2 },
      { pitch: 'E4', duration: '2n', timing: 2.5 }
    ]
  }
];