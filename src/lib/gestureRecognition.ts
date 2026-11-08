import type { NormalizedLandmark } from '@mediapipe/tasks-vision';

export type GestureName = 'OPEN PALM' | 'FIST' | 'PEACE' | 'ONE' | 'THREE' | 'FOUR' | 'THUMBS UP' | 'OK' | 'UNKNOWN';
export interface GesturePrediction {
  name: GestureName;
  confidence: number;
  fingers: { thumb: boolean; index: boolean; middle: boolean; ring: boolean; pinky: boolean };
}

const distance = (a: NormalizedLandmark, b: NormalizedLandmark) =>
  Math.hypot(a.x - b.x, a.y - b.y, ((a.z ?? 0) - (b.z ?? 0)) * 0.25);

/**
 * Lightweight heuristic classifier for a small set of static, one-hand gestures.
 * It is deliberately not presented as a complete sign-language translator.
 */
export function classifyHand(landmarks: NormalizedLandmark[]): GesturePrediction {
  if (landmarks.length < 21) {
    return { name: 'UNKNOWN', confidence: 0, fingers: { thumb: false, index: false, middle: false, ring: false, pinky: false } };
  }

  const wrist = landmarks[0];
  const palmWidth = Math.max(distance(landmarks[5], landmarks[17]), 0.001);
  const fingerExtended = (tip: number, pip: number, mcp: number) => {
    const tipReach = distance(landmarks[tip], wrist);
    const pipReach = distance(landmarks[pip], wrist);
    const mcpReach = distance(landmarks[mcp], wrist);
    return tipReach > pipReach * 1.08 && tipReach > mcpReach * 1.28;
  };

  const index = fingerExtended(8, 6, 5);
  const middle = fingerExtended(12, 10, 9);
  const ring = fingerExtended(16, 14, 13);
  const pinky = fingerExtended(20, 18, 17);
  const thumbTip = landmarks[4];
  const thumbIp = landmarks[3];
  const thumbMcp = landmarks[2];
  const thumb = distance(thumbTip, landmarks[5]) > distance(thumbIp, landmarks[5]) * 1.12 &&
    distance(thumbTip, thumbMcp) > palmWidth * 0.55;

  const fingers = { thumb, index, middle, ring, pinky };
  const count = Object.values(fingers).filter(Boolean).length;
  const thumbIndexGap = distance(thumbTip, landmarks[8]) / palmWidth;

  let name: GestureName = 'UNKNOWN';
  let confidence = 0.55;
  if (thumbIndexGap < 0.22 && middle && ring && pinky) {
    name = 'OK'; confidence = Math.min(0.96, 0.78 + (0.22 - thumbIndexGap) * 0.7);
  } else if (count === 5) {
    name = 'OPEN PALM'; confidence = 0.94;
  } else if (count === 0) {
    name = 'FIST'; confidence = 0.91;
  } else if (!thumb && index && middle && !ring && !pinky) {
    name = 'PEACE'; confidence = 0.93;
  } else if (!thumb && index && !middle && !ring && !pinky) {
    name = 'ONE'; confidence = 0.88;
  } else if (!thumb && index && middle && ring && !pinky) {
    name = 'THREE'; confidence = 0.86;
  } else if (!thumb && index && middle && ring && pinky) {
    name = 'FOUR'; confidence = 0.84;
  } else if (thumb && !index && !middle && !ring && !pinky && thumbTip.y < landmarks[0].y) {
    name = 'THUMBS UP'; confidence = 0.82;
  }

  return { name, confidence: name === 'UNKNOWN' ? 0 : confidence, fingers };
}

export function stabilizeGesture(history: GestureName[], next: GestureName, windowSize = 7): GestureName {
  const recent = [...history, next].slice(-windowSize);
  const counts = new Map<GestureName, number>();
  recent.forEach((item) => counts.set(item, (counts.get(item) ?? 0) + 1));
  const winner = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  return winner && winner[1] >= Math.ceil(windowSize * 0.55) ? winner[0] : 'UNKNOWN';
}
