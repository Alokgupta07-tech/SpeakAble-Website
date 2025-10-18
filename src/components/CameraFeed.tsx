// Camera Feed Component
// Simulates webcam feed with gesture detection overlay
// In production, this would use MediaPipe Hands for real gesture detection

import { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff } from 'lucide-react';

interface CameraFeedProps {
  isActive: boolean;
  onGestureDetected: (gesture: string) => void;
}

export default function CameraFeed({ isActive, onGestureDetected }: CameraFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Simulated gestures for demo purposes
  const gestureLibrary = [
    'Hello', 'Thank you', 'Yes', 'No', 'Help', 'Please',
    'Good', 'Bad', 'Water', 'Food', 'Happy', 'Sorry'
  ];

  useEffect(() => {
    if (isActive) {
      startCamera();
      startGestureSimulation();
    } else {
      stopCamera();
      stopGestureSimulation();
    }

    return () => {
      stopCamera();
      stopGestureSimulation();
    };
  }, [isActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasPermission(true);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      setHasPermission(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const startGestureSimulation = () => {
    setIsSimulating(true);

    const interval = setInterval(() => {
      const randomGesture = gestureLibrary[Math.floor(Math.random() * gestureLibrary.length)];
      onGestureDetected(randomGesture);
    }, 3000);

    (window as any).gestureInterval = interval;
  };

  const stopGestureSimulation = () => {
    setIsSimulating(false);
    if ((window as any).gestureInterval) {
      clearInterval((window as any).gestureInterval);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl aspect-video">
        {isActive && hasPermission === true ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover mirror"
            />

            {/* Gesture Detection Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Corner Markers */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-green-400"></div>
              <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-green-400"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-green-400"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-green-400"></div>

              {/* Detection Status */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Detecting Gestures
              </div>

              {/* Hand Landmark Simulation */}
              {isSimulating && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    {[...Array(21)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.05}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : isActive && hasPermission === false ? (
          <div className="flex flex-col items-center justify-center h-full text-white p-8 text-center">
            <CameraOff className="w-16 h-16 mb-4 text-red-400" />
            <h3 className="text-xl font-semibold mb-2">Camera Access Denied</h3>
            <p className="text-gray-400">Please enable camera permissions to use gesture detection</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-white">
            <Camera className="w-16 h-16 mb-4 text-gray-500" />
            <p className="text-gray-400">Camera Inactive</p>
          </div>
        )}
      </div>

      {/* Privacy Notice */}
      <div className="mt-4 text-center text-sm text-gray-600">
        <Shield className="inline w-4 h-4 mr-1" />
        All processing happens locally - no video data is stored
      </div>
    </div>
  );
}

// Import Shield icon
import { Shield } from 'lucide-react';
