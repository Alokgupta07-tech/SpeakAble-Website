import { useCallback, useEffect, useRef, useState } from 'react';
import ReactWebcam from 'react-webcam';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
import { Camera, CameraOff, Volume2, VolumeX, Trash2, Copy, Hand, CircleHelp } from 'lucide-react';
import { classifyHand, stabilizeGesture, type GestureName } from '../lib/gestureRecognition';

const MODEL_VERSION = '0.10.22';
const GESTURE_PHRASES: Record<Exclude<GestureName, 'UNKNOWN'>, string> = {
  'OPEN PALM': 'Hello', FIST: 'Thank you', PEACE: 'Peace', ONE: 'I need help',
  THREE: 'I am okay', FOUR: 'Please wait', 'THUMBS UP': 'Yes', OK: 'Okay',
};

type HistoryItem = { gesture: GestureName; phrase: string; time: string };

export default function Demo() {
  const webcamRef = useRef<ReactWebcam>(null);
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const rafRef = useRef<number | null>(null);
  const historyRef = useRef<GestureName[]>([]);
  const lastCommitRef = useRef<{ gesture: GestureName; at: number }>({ gesture: 'UNKNOWN', at: 0 });
  const [cameraOn, setCameraOn] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [modelError, setModelError] = useState('');
  const [cameraError, setCameraError] = useState('');
  const [gesture, setGesture] = useState<GestureName>('UNKNOWN');
  const [confidence, setConfidence] = useState(0);
  const [phrase, setPhrase] = useState('');
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [voiceRate, setVoiceRate] = useState(1);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loadModel = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MODEL_VERSION}/wasm`,
        );
        const options = {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-tasks/hand_landmarker/hand_landmarker.task',
          },
          runningMode: 'VIDEO' as const,
          numHands: 2,
          minHandDetectionConfidence: 0.55,
          minHandPresenceConfidence: 0.55,
          minTrackingConfidence: 0.55,
        };
        let landmarker: HandLandmarker;
        try {
          landmarker = await HandLandmarker.createFromOptions(vision, {
            ...options, baseOptions: { ...options.baseOptions, delegate: 'GPU' },
          });
        } catch (gpuError) {
          console.warn('GPU delegate unavailable; retrying with CPU.', gpuError);
          landmarker = await HandLandmarker.createFromOptions(vision, {
            ...options, baseOptions: { ...options.baseOptions, delegate: 'CPU' },
          });
        }
        if (cancelled) { landmarker.close(); return; }
        landmarkerRef.current = landmarker;
        setModelReady(true);
      } catch (error) {
        console.error('MediaPipe initialization failed:', error);
        if (!cancelled) setModelError('Could not load the hand-tracking model. Check your internet connection and reload.');
      }
    };
    void loadModel();
    return () => { cancelled = true; landmarkerRef.current?.close(); landmarkerRef.current = null; };
  }, []);

  const speak = useCallback((text: string) => {
    if (!speechEnabled || !('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = voiceRate;
    window.speechSynthesis.speak(utterance);
  }, [speechEnabled, voiceRate]);

  const stopCamera = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    const stream = webcamRef.current?.video?.srcObject as MediaStream | null;
    stream?.getTracks().forEach((track) => track.stop());
    setCameraOn(false);
    historyRef.current = [];
    window.speechSynthesis?.cancel();
  }, []);

  const predictFrame = useCallback(() => {
    const video = webcamRef.current?.video;
    const landmarker = landmarkerRef.current;
    if (cameraOn && video && landmarker && video.readyState >= 2 && video.videoWidth > 0) {
      try {
        const result = landmarker.detectForVideo(video, performance.now());
        if (result.landmarks.length > 0) {
          const prediction = classifyHand(result.landmarks[0]);
          const stable = stabilizeGesture(historyRef.current, prediction.name);
          historyRef.current = [...historyRef.current, prediction.name].slice(-7);
          setGesture(stable);
          setConfidence(prediction.confidence);
          const now = Date.now();
          if (stable !== 'UNKNOWN' && stable !== lastCommitRef.current.gesture && now - lastCommitRef.current.at > 900) {
            const nextPhrase = GESTURE_PHRASES[stable];
            lastCommitRef.current = { gesture: stable, at: now };
            setPhrase(nextPhrase);
            setHistory((items) => [{ gesture: stable, phrase: nextPhrase, time: new Date().toLocaleTimeString() }, ...items].slice(0, 12));
            setMessage((current) => current ? `${current} ${nextPhrase}.` : `${nextPhrase}.`);
            speak(nextPhrase);
          }
        } else {
          historyRef.current = [];
          setGesture('UNKNOWN');
          setConfidence(0);
          lastCommitRef.current = { gesture: 'UNKNOWN', at: 0 };
        }
      } catch (error) {
        console.error('Frame detection error:', error);
      }
    }
    if (cameraOn) rafRef.current = requestAnimationFrame(predictFrame);
  }, [cameraOn, speak]);

  useEffect(() => {
    if (cameraOn) rafRef.current = requestAnimationFrame(predictFrame);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [cameraOn, predictFrame]);

  useEffect(() => () => { window.speechSynthesis?.cancel(); }, []);

  const startCamera = () => {
    setCameraError('');
    if (!modelReady) return;
    setCameraOn(true);
  };
  const appendWord = (word: string) => setMessage((current) => current ? `${current} ${word}` : word);
  const clearMessage = () => { setMessage(''); setHistory([]); setPhrase(''); lastCommitRef.current = { gesture: 'UNKNOWN', at: 0 }; };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700"><Hand size={16} /> Interactive gesture studio</span>
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">Try SpeakAble</h2>
        <p className="text-lg leading-relaxed text-gray-600">Turn a small set of hand gestures into editable phrases and spoken output. Processing runs in your browser after the model loads.</p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 text-white">
            <div className="flex items-center gap-2 font-semibold"><span className={`h-2.5 w-2.5 rounded-full ${cameraOn ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} /> Camera preview</div>
            <span className="text-xs text-slate-400">{modelReady ? 'Hand model ready' : modelError ? 'Model unavailable' : 'Loading model…'}</span>
          </div>
          <div className="relative aspect-[4/3] bg-slate-900">
            {cameraOn ? <ReactWebcam ref={webcamRef} audio={false} mirrored screenshotFormat="image/jpeg" videoConstraints={{ width: 960, height: 720, facingMode: 'user' }} onUserMediaError={(error) => { setCameraError(error instanceof Error ? error.message : 'Camera permission was denied or unavailable.'); setCameraOn(false); }} className="h-full w-full object-cover" /> : (
              <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center text-slate-400"><Camera size={54} strokeWidth={1.2} /><p className="text-lg font-medium text-white">Your camera preview will appear here</p><p className="max-w-sm text-sm">Allow camera access, keep one hand visible and use a well-lit background.</p></div>
            )}
            {cameraOn && <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">LIVE · {gesture === 'UNKNOWN' ? 'Looking for a gesture' : gesture}</div>}
          </div>
          <div className="flex flex-wrap items-center gap-3 border-t border-white/10 p-4">
            {!cameraOn ? <button onClick={startCamera} disabled={!modelReady} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"><Camera size={18} />{modelReady ? 'Start camera' : 'Preparing model…'}</button> : <button onClick={stopCamera} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-500 px-5 py-3 font-semibold text-white transition hover:bg-rose-400"><CameraOff size={18} />Stop camera</button>}
            <button onClick={() => setShowGuide((value) => !value)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm font-medium text-white hover:bg-white/10"><CircleHelp size={17} /> Gesture guide</button>
          </div>
          {(cameraError || modelError) && <p role="alert" className="px-5 pb-4 text-sm text-rose-300">{cameraError || modelError}</p>}
          {showGuide && <div className="grid grid-cols-2 gap-2 border-t border-white/10 p-4 sm:grid-cols-4">{Object.entries(GESTURE_PHRASES).map(([key, value]) => <div key={key} className="rounded-xl bg-white/5 p-3 text-white"><div className="text-sm font-bold">{key}</div><div className="mt-1 text-xs text-slate-400">“{value}”</div></div>)}</div>}
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="mb-5 flex items-center justify-between"><h3 className="text-lg font-bold text-gray-900">Live recognition</h3><span className={`rounded-full px-3 py-1 text-xs font-semibold ${gesture === 'UNKNOWN' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-700'}`}>{gesture === 'UNKNOWN' ? 'No stable gesture' : 'Recognized'}</span></div>
            <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-100 p-6 text-center"><div className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-500">Current gesture</div><div aria-live="polite" className="min-h-10 text-3xl font-extrabold text-indigo-950">{gesture === 'UNKNOWN' ? '—' : gesture}</div><div className="mt-3 h-2 overflow-hidden rounded-full bg-indigo-200"><div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${Math.round(confidence * 100)}%` }} /></div><div className="mt-2 text-xs text-indigo-700">Heuristic score: {Math.round(confidence * 100)}% · Not a validated accuracy score</div></div>
            <div className="mt-4 flex items-center justify-between text-sm"><span className="text-gray-500">Suggested phrase</span><span className="font-semibold text-gray-900">{phrase || 'Waiting for input'}</span></div>
            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4"><button onClick={() => setSpeechEnabled((value) => !value)} className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">{speechEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}{speechEnabled ? 'Speech enabled' : 'Speech muted'}</button><label className="flex items-center gap-2 text-xs text-gray-500">Voice speed <input aria-label="Voice speed" type="range" min="0.7" max="1.3" step="0.1" value={voiceRate} onChange={(event) => setVoiceRate(Number(event.target.value))} /></label></div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="mb-3 flex items-center justify-between"><h3 className="text-lg font-bold text-gray-900">Build your message</h3><button onClick={clearMessage} className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700"><Trash2 size={14} />Clear</button></div>
            <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Recognized phrases will appear here. You can edit this message…" rows={4} className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
            <div className="mt-3 flex flex-wrap gap-2">{['Hello', 'Please', 'Help me', 'Thank you', 'Yes', 'No'].map((word) => <button key={word} onClick={() => appendWord(word)} className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100">+ {word}</button>)}</div>
            <div className="mt-4 flex gap-2"><button onClick={() => speak(message)} disabled={!message.trim()} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-40"><Volume2 size={16} />Speak message</button><button onClick={() => { void navigator.clipboard?.writeText(message); }} disabled={!message.trim()} aria-label="Copy message" className="rounded-xl border border-gray-200 px-4 text-gray-600 hover:bg-gray-50 disabled:opacity-40"><Copy size={17} /></button></div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between"><h3 className="font-bold text-gray-900">Recent gesture history</h3><span className="text-xs text-gray-500">{history.length} / 12 events</span></div>
        {history.length ? <div className="divide-y divide-gray-100">{history.map((item, index) => <div key={`${item.time}-${index}`} className="flex items-center justify-between gap-4 py-3"><div><span className="font-semibold text-gray-800">{item.gesture}</span><span className="ml-3 text-sm text-gray-500">{item.phrase}</span></div><time className="text-xs text-gray-400">{item.time}</time></div>)}</div> : <p className="py-6 text-center text-sm text-gray-400">Your recognized gestures will be listed here.</p>}
      </div>
      <p className="mx-auto mt-5 max-w-4xl text-center text-xs leading-relaxed text-gray-500">Accessibility note: this prototype recognizes a limited set of static hand shapes using geometric heuristics. It is not a certified sign-language translation system. Real sign languages use movement, facial expression, grammar and regional variations; use this demo as an assistive prototype, not as a replacement for a qualified interpreter.</p>
    </div>
  );
}
