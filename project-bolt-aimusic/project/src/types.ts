export interface Note {
  pitch: string;
  duration: string;
  timing: number;
}

export interface Composition {
  notes: Note[];
  tempo: number;
  key: string;
  instrument: string;
}

export type InstrumentType = 'synth' | 'piano' | 'bass' | 'strings' | 'marimba';

export interface Pattern {
  name: string;
  notes: Note[];
  description: string;
}