import { useEffect, useRef, useState } from 'react';
import ReactWebcam from 'react-webcam';
import { HandLandmarker, FilesetResolver, Landmark } from '@mediapipe/tasks-vision';
import io from 'socket.io-client';

// --- Constants ---
const BACKEND_URL = 'http://10.1.72.194:5000';
const WEBCAM_WIDTH = 640;
const WEBCAM_HEIGHT = 480;
const SEND_INTERVAL = 50; // Send data every 50ms

// --- WebSocket Setup ---
const socket = io(BACKEND_URL, {
  transports: ['websocket'],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});

// --- Speech Synthesis Setup ---
const speech = new SpeechSynthesisUtterance();
speech.lang = 'en-US';

function GestureComponent() {
  const webcamRef = useRef<ReactWebcam>(null);
  const [predictedText, setPredictedText] = useState('...');
  const [isConnected, setIsConnected] = useState(socket.connected);

  // --- Refs for internal logic (non-UI state) ---
  const handLandmarkerRef = useRef<HandLandmarker | undefined>(undefined);
  const lastVideoTimeRef = useRef(-1);
  const lastSentTimeRef = useRef(0);
  const lastSpokenRef = useRef('');

  // --- Setup MediaPipe HandLandmarker ---
  const setupHandLandmarker = async () => {
    try {
      console.log('--- 1. Setting up HandLandmarker...');
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      );

      handLandmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-tasks/hand_landmarker/hand_landmarker.task',
        },
        runningMode: 'VIDEO',
        numHands: 1,
        minHandDetectionConfidence: 0.5, // Confidence from test.py
      });

      console.log('--- ✅ 2. HandLandmarker setup complete.');
      requestAnimationFrame(predictWebcam);
    } catch (error) {
      console.error('--- ❌❌❌ CRITICAL ERROR: Error setting up HandLandmarker: ---', error);
      setPredictedText('Model loading failed (Check console)');
    }
  };

  // --- Prediction Loop ---
  const predictWebcam = () => {
    // Check if component is still mounted and refs are set
    if (!webcamRef.current || !webcamRef.current.video || !handLandmarkerRef.current) {
      requestAnimationFrame(predictWebcam);
      return;
    }

    const video = webcamRef.current.video;

    // Skip if video isn't ready or frame hasn't changed
    if (video.readyState < 2 || video.currentTime === lastVideoTimeRef.current) {
      requestAnimationFrame(predictWebcam);
      return;
    }
    lastVideoTimeRef.current = video.currentTime;

    try {
      // --- 3. RUNNING DETECTION ---
      const results = handLandmarkerRef.current.detectForVideo(video, Date.now());

      // --- 4. LOGGING RESULTS (This is the most important log) ---
      // This will run every frame. Check if 'landmarks' is empty [].
      console.log('Detection results:', results.landmarks);

      if (results.landmarks && results.landmarks.length > 0) {
        
        // --- 5. HAND DETECTED! ---
        console.log('--- ✅ HAND DETECTED! Sending to backend. ---');

        // --- Throttling Logic ---
        if (Date.now() - lastSentTimeRef.current > SEND_INTERVAL) {
          lastSentTimeRef.current = Date.now(); 

          const hand = results.landmarks[0];
          const pixelLandmarks = hand.map((lm: Landmark) => [
            lm.x * WEBCAM_WIDTH,
            lm.y * WEBCAM_HEIGHT,
          ]);

          if (socket.connected) {
                    console.log('Emitting gesture_data');
                    socket.emit('gesture_data', { landmarks: pixelLandmarks });
                  } else {
                    console.log('Socket not connected');
                  }        }
      }
    } catch (err) {
      console.error('--- ❌ ERROR during detection loop: ---', err);
    }

    requestAnimationFrame(predictWebcam);
  };

  // --- Setup useEffect Hooks (Component Mount/Unmount) ---
  useEffect(() => {
    setupHandLandmarker();

    socket.on('connect', () => {
      console.log('--- 🟢 Connected to backend ---');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('--- 🔴 Disconnected from backend ---');
      setIsConnected(false);
    });

    socket.on('prediction_result', (data: { text: string; confidence: number }) => {
      
      // --- 6. PREDICTION RECEIVED! ---
      console.log('--- ✅✅✅ Prediction received from backend: ---', data.text);

      setPredictedText(data.text);

      if (data.text !== lastSpokenRef.current) {
        lastSpokenRef.current = data.text;
        window.speechSynthesis.cancel(); 
        speech.text = data.text;
        window.speechSynthesis.speak(speech);
      }
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('prediction_result');
    };
  }, []); 

  // --- UI ---
  return (
    <div className="flex flex-col items-center px-4">
      <div className="mb-4 text-center p-4 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-lg text-gray-300">
          Status: {isConnected ? 'Connected 🟢' : 'Disconnected 🔴'}
        </p>
        <h2 className="text-3xl font-bold text-white">
          Last Gesture: {predictedText}
        </h2>
      </div>

      <ReactWebcam
        ref={webcamRef}
        width={WEBCAM_WIDTH}
        height={WEBCAM_HEIGHT}
        mirrored
        className="rounded-lg border-4 border-gray-700 shadow-lg"
      />
    </div>
  );
}

export default GestureComponent;