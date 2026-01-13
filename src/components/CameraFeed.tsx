import { useEffect, useRef, useState } from 'react';
import ReactWebcam from 'react-webcam';
import { HandLandmarker, FilesetResolver, Landmark } from '@mediapipe/tasks-vision';
import io from 'socket.io-client';

// --- 1. Connect to backend ---
const socket = io('http://10.1.72.194:5000'); // Replace with your backend IP

// --- 2. Speech synthesis ---
const speech = new SpeechSynthesisUtterance();
speech.lang = 'en-US';

// --- 3. Webcam size ---
const WEBCAM_WIDTH = 640;
const WEBCAM_HEIGHT = 480;

// --- 4. Send interval ---
const SEND_INTERVAL = 50; // ms

function GestureComponent() {
  const webcamRef = useRef<ReactWebcam>(null);
  const [predictedText, setPredictedText] = useState('...');
  const [isConnected, setIsConnected] = useState(socket.connected);

  // Refs for managing state inside requestAnimationFrame and socket listeners
  const lastSpokenRef = useRef('');
  const handLandmarkerRef = useRef<HandLandmarker | undefined>(undefined);
  const lastVideoTimeRef = useRef(-1);
  const lastSentTimeRef = useRef(0);

  const setupHandLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22-rc.20250304/wasm'
    );
    try {
      handLandmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-tasks/hand_landmarker/hand_landmarker.task',
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numHands: 1,
      });
      console.log('✅ HandLandmarker setup with GPU');
    } catch (gpuErr) {
      console.warn('⚠ GPU failed, falling back to CPU', gpuErr);
      handLandmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-tasks/hand_landmarker/hand_landmarker.task',
          delegate: 'CPU',
        },
        runningMode: 'VIDEO',
        numHands: 1,
      });
      console.log('✅ HandLandmarker setup with CPU');
    }
    // Start the prediction loop
    requestAnimationFrame(predictWebcam);
  };

  useEffect(() => {
    // Run setup only once
    setupHandLandmarker();

    // --- Socket Listeners ---
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('prediction_result', (data: { text: string; confidence: number }) => {
      // Update the UI
      setPredictedText(data.text);
      
      // Use ref to check if text is new, avoiding stale state in listener
      if (data.text !== lastSpokenRef.current) {
        speech.text = data.text;
        window.speechSynthesis.speak(speech);
        
        // Update ref for listener logic
        lastSpokenRef.current = data.text;
      }
    });

    // Cleanup listeners on component unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('prediction_result');
    };
  }, []); // <-- Empty array ensures this runs only once on mount

  const predictWebcam = () => {
    // Check if everything is ready
    if (!webcamRef.current || !webcamRef.current.video || !handLandmarkerRef.current) {
      requestAnimationFrame(predictWebcam);
      return;
    }

    const video = webcamRef.current.video;

    // Wait for video to be ready and have dimensions to prevent ROI error
    if (video.readyState < 2 || video.videoWidth === 0 || video.videoHeight === 0) {
      requestAnimationFrame(predictWebcam);
      return;
    }

    // Check if it's a new frame
    if (video.currentTime === lastVideoTimeRef.current) {
      requestAnimationFrame(predictWebcam);
      return;
    }
    lastVideoTimeRef.current = video.currentTime;

    let results;
    try {
      // Detect hands using the ref
      results = handLandmarkerRef.current.detectForVideo(video, Date.now());
    } catch (err) {
      console.error('HandLandmarker error:', err);
      requestAnimationFrame(predictWebcam);
      return;
    }

    // If hands are found
    if (results.landmarks && results.landmarks.length > 0) {
      const hand = results.landmarks[0];
      // Convert to pixel coordinates (as you had before)
      const pixelLandmarks = hand.map((lm: Landmark) => [
        lm.x * WEBCAM_WIDTH,
        lm.y * WEBCAM_HEIGHT,
      ]);
      
      // Throttle sending data to backend
      if (socket.connected && Date.now() - lastSentTimeRef.current > SEND_INTERVAL) {
        socket.emit('gesture_data', { landmarks: pixelLandmarks });
        lastSentTimeRef.current = Date.now();
      }
    }

    // Continue the loop
    requestAnimationFrame(predictWebcam);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-center p-4 bg-gray-800 rounded-lg shadow-lg">
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
        videoConstraints={{ facingMode: 'user' }}
        className="rounded-lg border-4 border-gray-700"
      />
    </div>
  );
}

export default GestureComponent;