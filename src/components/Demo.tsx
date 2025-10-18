// Demo Section Component
// Main interactive demo with camera, controls, and text display
// Integrates gesture detection and speech synthesis

import { useState, useCallback } from 'react';
import CameraFeed from './CameraFeed';
import Controls from './Controls';
import RecognizedText from './RecognizedText';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

export default function Demo() {
  const [isActive, setIsActive] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const [currentGesture, setCurrentGesture] = useState('');
  const [gestureTimestamp, setGestureTimestamp] = useState(0);

  const { speak } = useSpeechSynthesis();

  const handleGestureDetected = useCallback((gesture: string) => {
    setCurrentGesture(gesture);
    setGestureTimestamp(Date.now());

    if (isSpeechEnabled) {
      speak(gesture);
    }
  }, [isSpeechEnabled, speak]);

  const toggleCamera = () => {
    setIsActive(!isActive);
    if (isActive) {
      setCurrentGesture('');
      setGestureTimestamp(0);
    }
  };

  const toggleSpeech = () => {
    setIsSpeechEnabled(!isSpeechEnabled);
  };

  return (
    <section id="demo" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Live Demo</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience real-time gesture-to-speech technology in action
          </p>
        </div>

        <div className="space-y-8">
          {/* Camera Feed */}
          <CameraFeed
            isActive={isActive}
            onGestureDetected={handleGestureDetected}
          />

          {/* Controls */}
          <Controls
            isActive={isActive}
            isSpeechEnabled={isSpeechEnabled}
            onToggleCamera={toggleCamera}
            onToggleSpeech={toggleSpeech}
          />

          {/* Recognized Text Display */}
          <RecognizedText
            text={currentGesture}
            timestamp={gestureTimestamp}
          />
        </div>

        {/* Technology Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-600">
            <h4 className="font-bold text-gray-900 mb-2">MediaPipe Integration</h4>
            <p className="text-sm text-gray-600">
              Advanced hand landmark detection with 21 tracking points
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-600">
            <h4 className="font-bold text-gray-900 mb-2">AI Classification</h4>
            <p className="text-sm text-gray-600">
              TensorFlow-powered gesture recognition with 98% accuracy
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-600">
            <h4 className="font-bold text-gray-900 mb-2">Web Speech API</h4>
            <p className="text-sm text-gray-600">
              Natural-sounding voice synthesis in multiple languages
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
