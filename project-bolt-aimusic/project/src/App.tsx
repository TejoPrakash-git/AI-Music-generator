import React, { useState, useCallback, useEffect } from 'react';
import * as Tone from 'tone';
import { Music, Wand2 } from 'lucide-react';
import type { Composition, InstrumentType } from './types';
import MusicPlayer from './components/MusicPlayer';
import { musicPatterns } from './utils/patterns';
import { generateMusicPattern } from './utils/musicGeneration';

function App() {
  const [selectedPattern, setSelectedPattern] = useState('');
  const [composition, setComposition] = useState<Composition | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [instrument, setInstrument] = useState<InstrumentType>('synth');
  const [synth, setSynth] = useState<any>(null);
  const [mood, setMood] = useState('peaceful');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Initialize the synthesizer
    const initSynth = async () => {
      await Tone.start();
      const newSynth = new Tone.PolySynth().toDestination();
      setSynth(newSynth);
    };
    initSynth();

    return () => {
      if (synth) {
        synth.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (!synth) return;

    // Update synth settings based on selected instrument
    switch (instrument) {
      case 'piano':
        synth.set({
          oscillator: { type: 'triangle' },
          envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 1 }
        });
        break;
      case 'strings':
        synth.set({
          oscillator: { type: 'sine' },
          envelope: { attack: 0.1, decay: 0.3, sustain: 0.4, release: 2 }
        });
        break;
      case 'bass':
        synth.set({
          oscillator: { type: 'square' },
          envelope: { attack: 0.05, decay: 0.2, sustain: 0.4, release: 0.8 }
        });
        break;
      case 'marimba':
        synth.set({
          oscillator: { type: 'sine' },
          envelope: { attack: 0.001, decay: 0.3, sustain: 0, release: 0.1 }
        });
        break;
      default:
        synth.set({
          oscillator: { type: 'sine' },
          envelope: { attack: 0.05, decay: 0.2, sustain: 0.2, release: 0.5 }
        });
    }
  }, [instrument, synth]);

  const generateMusic = () => {
    if (!selectedPattern) return;
    
    let pattern;
    if (selectedPattern === 'ai-generated') {
      setIsGenerating(true);
      pattern = generateMusicPattern(mood, 0.7);
      setIsGenerating(false);
    } else {
      pattern = musicPatterns.find(p => p.name === selectedPattern);
    }
    
    if (!pattern) return;

    const newComposition: Composition = {
      notes: pattern.notes,
      tempo: 120,
      key: 'C Major',
      instrument
    };
    
    setComposition(newComposition);
  };

  const playComposition = useCallback(() => {
    if (!composition || !synth) return;

    Tone.Transport.cancel();
    Tone.Transport.stop();
    Tone.Transport.bpm.value = composition.tempo;

    const now = Tone.now();
    composition.notes.forEach(note => {
      synth.triggerAttackRelease(note.pitch, note.duration, now + note.timing);
    });

    setIsPlaying(true);
  }, [composition, synth]);

  const stopPlaying = useCallback(() => {
    Tone.Transport.stop();
    setIsPlaying(false);
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      stopPlaying();
    } else {
      playComposition();
    }
  };

  const handleReset = () => {
    stopPlaying();
    Tone.Transport.position = 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-4xl font-bold text-indigo-900 mb-2">
            <Music size={40} />
            <h1>AI Music Generator</h1>
          </div>
          <p className="text-gray-600">Create beautiful melodies with AI assistance</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="pattern" className="block text-sm font-medium text-gray-700 mb-2">
                Select a Pattern
              </label>
              <select
                id="pattern"
                value={selectedPattern}
                onChange={(e) => setSelectedPattern(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Choose a pattern...</option>
                <option value="ai-generated">AI Generated Pattern</option>
                {musicPatterns.map(pattern => (
                  <option key={pattern.name} value={pattern.name}>
                    {pattern.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedPattern === 'ai-generated' && (
              <div>
                <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Mood
                </label>
                <select
                  id="mood"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="peaceful">Peaceful</option>
                  <option value="happy">Happy</option>
                  <option value="melancholic">Melancholic</option>
                  <option value="jazzy">Jazzy</option>
                </select>
              </div>
            )}

            <div>
              <label htmlFor="instrument" className="block text-sm font-medium text-gray-700 mb-2">
                Choose Instrument
              </label>
              <select
                id="instrument"
                value={instrument}
                onChange={(e) => setInstrument(e.target.value as InstrumentType)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="synth">Synth</option>
                <option value="piano">Piano</option>
                <option value="strings">Strings</option>
                <option value="bass">Bass</option>
                <option value="marimba">Marimba</option>
              </select>
            </div>
          </div>

          {selectedPattern && selectedPattern !== 'ai-generated' && (
            <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
              <p>{musicPatterns.find(p => p.name === selectedPattern)?.description}</p>
            </div>
          )}

          <button
            onClick={generateMusic}
            disabled={!selectedPattern || isGenerating}
            className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              'Generating...'
            ) : (
              <>
                <Wand2 size={20} />
                {selectedPattern === 'ai-generated' ? 'Generate AI Music' : 'Generate Music'}
              </>
            )}
          </button>
        </div>

        {composition && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <MusicPlayer
              composition={composition}
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onReset={handleReset}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;