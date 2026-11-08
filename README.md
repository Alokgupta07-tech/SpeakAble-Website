# SpeakAble

SpeakAble is an accessibility-focused **gesture-to-phrase and text-to-speech prototype** built with React, TypeScript, Vite and MediaPipe Tasks Vision.

> **Important limitation:** the current browser demo recognizes a small set of static hand shapes using geometric heuristics. It is not a full sign-language recognition or translation system. Sign languages include movement, facial expression, grammar and regional variation that this prototype does not model. Do not use it as a replacement for a qualified interpreter or for safety-critical communication.

## What changed in this version

- **Browser-side hand tracking:** MediaPipe Hand Landmarker detects up to two hands and provides 21 landmarks per hand. The current phrase classifier evaluates the first detected hand.
- **More stable recognition:** normalized landmark geometry, palm-relative measurements, a rolling vote over recent frames and a commit cooldown reduce flicker and duplicate phrase insertion.
- **Expanded gesture vocabulary:** open palm, fist, peace, one, three, four, thumbs up and OK map to editable starter phrases.
- **Message composer:** edit recognized phrases, add common words, clear the message and copy it.
- **Speech controls:** enable/disable speech, adjust speaking rate and manually speak the complete message.
- **Recognition history and confidence display:** recent committed gestures are visible, while the score is explicitly labelled as a heuristic score rather than measured accuracy.
- **No hard-coded backend address:** the demo does not depend on a developer's private LAN IP or a running Socket.IO server.
- **Honest product claims:** the UI no longer claims unmeasured accuracy, latency or privacy guarantees.

## Run locally

### Requirements

- Node.js 18 or newer
- npm
- A modern browser with camera access and WebAssembly support
- Internet access on first load to download the MediaPipe WASM runtime and hand-landmarker model

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Use HTTPS or localhost for camera access, allow camera permission, and provide good lighting with one hand clearly visible.

## Available scripts

```bash
npm run dev        # Start Vite development server
npm run build      # Create production build in dist/
npm run preview    # Preview the production build
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript checks
```

## Gesture mapping

| Detected hand shape | Suggested phrase |
|---|---|
| Open palm | Hello |
| Fist | Thank you |
| Peace sign | Peace |
| Index finger | I need help |
| Three fingers | I am okay |
| Four fingers | Please wait |
| Thumbs up | Yes |
| OK sign | Okay |

These are demo mappings, not universal sign-language meanings. Users can edit all generated text before speaking it.

## Recognition design

`src/lib/gestureRecognition.ts` contains the local classifier. It uses distances between MediaPipe landmarks, scaled against palm width where appropriate, to estimate finger extension and distinguish a few static configurations. `stabilizeGesture` applies a rolling majority vote before a gesture is committed.

The current heuristic has known limitations:

- Finger extension depends on camera angle, hand rotation, occlusion and individual anatomy.
- The classifier does not use temporal motion sequences, facial landmarks or body pose.
- It currently classifies only the first detected hand even though the detector is configured for two.
- Its displayed confidence is a rule-based score, not a calibrated probability or benchmark accuracy.

### Recommended next research steps

1. Collect consented, diverse samples across lighting, skin tones, left/right hands, camera angles and distances.
2. Label short landmark sequences rather than isolated frames for dynamic gestures.
3. Train and evaluate a temporal model on held-out participants; report per-class precision, recall, confusion matrix and latency.
4. Add user-specific calibration and an explicit low-confidence/unknown state.
5. Co-design vocabulary and phrase mappings with Deaf and hard-of-hearing users and sign-language experts.

## Privacy

Camera frames are read locally by the browser-based MediaPipe pipeline and are not sent to an application backend by this demo. The MediaPipe WASM files and model are downloaded from their configured public CDNs. Browser speech synthesis is used for audio output. Review third-party CDN policies before deploying in a setting with strict data requirements.

## Project structure

```text
src/
  components/       React UI components, including the live demo
  hooks/            Shared browser hooks
  lib/
    gestureRecognition.ts  Landmark-based static gesture classifier
  App.tsx
  main.tsx
```

## License

MIT. See the repository's license file if one is added to the distribution.
