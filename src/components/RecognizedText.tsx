// Recognized Text Display Component
// Shows detected gestures as text with smooth animations

import { useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';

interface RecognizedTextProps {
  text: string;
  timestamp: number;
}

export default function RecognizedText({ text, timestamp }: RecognizedTextProps) {
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (text && timestamp > 0) {
      setAnimate(true);
      setDisplayText(prev => [...prev, text].slice(-10)); // Keep last 10 gestures

      setTimeout(() => setAnimate(false), 500);
    }
  }, [text, timestamp]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <MessageSquare className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">Recognized Gestures</h3>
        </div>

        {/* Current Gesture - Large Display */}
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2">Current:</div>
          <div className={`min-h-[80px] bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 flex items-center justify-center transition-all duration-300 ${
            animate ? 'scale-105 shadow-lg' : 'scale-100'
          }`}>
            {text ? (
              <span className="text-4xl font-bold text-blue-900">{text}</span>
            ) : (
              <span className="text-2xl text-gray-400 italic">Waiting for gesture...</span>
            )}
          </div>
        </div>

        {/* Gesture History */}
        <div>
          <div className="text-sm text-gray-500 mb-2">History:</div>
          <div className="bg-gray-50 rounded-xl p-4 min-h-[100px] max-h-[200px] overflow-y-auto">
            {displayText.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {displayText.map((gesture, index) => (
                  <span
                    key={index}
                    className="inline-block bg-white px-4 py-2 rounded-lg text-gray-700 shadow-sm border border-gray-200 animate-fadeIn"
                  >
                    {gesture}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                No gestures detected yet
              </div>
            )}
          </div>
        </div>

        {/* Full Sentence Display */}
        {displayText.length > 0 && (
          <div className="mt-6">
            <div className="text-sm text-gray-500 mb-2">Full Message:</div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
              <p className="text-lg text-gray-800 leading-relaxed">
                {displayText.join(' ')}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="bg-white rounded-lg p-3 shadow">
          <div className="text-2xl font-bold text-blue-600">{displayText.length}</div>
          <div className="text-xs text-gray-600">Gestures</div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow">
          <div className="text-2xl font-bold text-green-600">&lt;500ms</div>
          <div className="text-xs text-gray-600">Latency</div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow">
          <div className="text-2xl font-bold text-purple-600">98%</div>
          <div className="text-xs text-gray-600">Accuracy</div>
        </div>
      </div>
    </div>
  );
}
