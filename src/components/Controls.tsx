// Controls Component
// Start/Stop camera and Enable/Disable speech synthesis

import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface ControlsProps {
  isActive: boolean;
  isSpeechEnabled: boolean;
  onToggleCamera: () => void;
  onToggleSpeech: () => void;
}

export default function Controls({
  isActive,
  isSpeechEnabled,
  onToggleCamera,
  onToggleSpeech
}: ControlsProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Camera Control */}
          <button
            onClick={onToggleCamera}
            className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
              isActive
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-6 h-6" />
                Stop Detection
              </>
            ) : (
              <>
                <Play className="w-6 h-6" />
                Start Detection
              </>
            )}
          </button>

          {/* Speech Control */}
          <button
            onClick={onToggleSpeech}
            disabled={!isActive}
            className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
              !isActive
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : isSpeechEnabled
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
                : 'bg-gray-600 hover:bg-gray-700 text-white shadow-lg'
            }`}
          >
            {isSpeechEnabled ? (
              <>
                <Volume2 className="w-6 h-6" />
                Speech On
              </>
            ) : (
              <>
                <VolumeX className="w-6 h-6" />
                Speech Off
              </>
            )}
          </button>
        </div>

        {/* Status Indicators */}
        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
            <span className={isActive ? 'text-green-600 font-medium' : 'text-gray-500'}>
              {isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isSpeechEnabled && isActive ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`}></div>
            <span className={isSpeechEnabled && isActive ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              {isSpeechEnabled && isActive ? 'Audio Enabled' : 'Audio Disabled'}
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 rounded-xl p-4 text-sm text-gray-700">
          <p className="font-semibold mb-2 text-blue-900">Instructions:</p>
          <ol className="space-y-1 list-decimal list-inside">
            <li>Click "Start Detection" to activate the camera</li>
            <li>Position your hand within the detection area</li>
            <li>Enable speech to hear the recognized gestures</li>
            <li>Practice different gestures to see real-time recognition</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
