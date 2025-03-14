import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import type { Composition } from '../types';

interface MusicPlayerProps {
  composition: Composition | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onReset: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  composition,
  isPlaying,
  onPlayPause,
  onReset,
}) => {
  if (!composition) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
        <button
          onClick={onPlayPause}
          className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={onReset}
          className="p-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
        >
          <RotateCcw size={24} />
        </button>
        <div className="flex flex-col">
          <div className="text-sm text-gray-600">
            Tempo: {composition.tempo} BPM | Key: {composition.key}
          </div>
          <div className="text-sm text-gray-600">
            Instrument: {composition.instrument}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;