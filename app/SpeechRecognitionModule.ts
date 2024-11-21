// SpeechRecognitionModule.ts
import { ExpoSpeechRecognitionModule } from 'expo-speech-recognition';

export const startSpeechRecognition = async () => {
  const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
  if (!result.granted) {
    console.warn('Permissions not granted', result);
    return;
  }

  ExpoSpeechRecognitionModule.start({
    lang: 'en-US',
    interimResults: true,
    maxAlternatives: 1,
    continuous: false,
    requiresOnDeviceRecognition: false,
    addsPunctuation: false,
  });
};

export const stopSpeechRecognition = () => {
  ExpoSpeechRecognitionModule.stop();
};
