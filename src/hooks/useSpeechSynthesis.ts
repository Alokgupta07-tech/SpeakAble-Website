// Custom Hook for Web Speech API
// Provides text-to-speech functionality

import { useCallback, useRef } from 'react';

export function useSpeechSynthesis() {
  const isSpeakingRef = useRef(false);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis || !text || isSpeakingRef.current) {
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Configure voice settings
    utterance.rate = 1.0; // Normal speed
    utterance.pitch = 1.0; // Normal pitch
    utterance.volume = 1.0; // Full volume
    utterance.lang = 'en-US'; // English language

    utterance.onstart = () => {
      isSpeakingRef.current = true;
    };

    utterance.onend = () => {
      isSpeakingRef.current = false;
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      isSpeakingRef.current = false;
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const cancel = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      isSpeakingRef.current = false;
    }
  }, []);

  return { speak, cancel };
}
