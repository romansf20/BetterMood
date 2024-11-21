import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from "expo-speech-recognition";
import debounce from 'lodash.debounce';

interface InputModuleProps {
  onTextChangeComplete: (text: string) => void;
  isLoadingChat: boolean;
}

const InputModule: React.FC<InputModuleProps> = ({ onTextChangeComplete, isLoadingChat }) => {
	// isLoadingChat = true
  const [transcript, setTranscript] = useState<string>("");
  const [recognizing, setRecognizing] = useState(false);
  const isSpeechInput = useRef(false);
  const previousTranscript = useRef<string>("");

  const doSend = (inText: string) => {
    onTextChangeComplete(inText);
    ExpoSpeechRecognitionModule.stop();
  };

  const debouncedInputComplete = useCallback(
    debounce((text: string) => {
      doSend(text);
    }, 2000),
    []
  );

  useEffect(() => {
    return () => {
      debouncedInputComplete.cancel();
    };
  }, [debouncedInputComplete]);

  useSpeechRecognitionEvent("start", () => setRecognizing(true));
  useSpeechRecognitionEvent("end", () => setRecognizing(false));
  useSpeechRecognitionEvent("result", (event) => {
    const recognizedText = event.results[0]?.transcript || "";
    setTranscript(recognizedText);
    isSpeechInput.current = true;

    if (recognizedText !== previousTranscript.current) {
      debouncedInputComplete(recognizedText);
    }
    previousTranscript.current = recognizedText;
  });

  const handleStart = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }

    setTranscript("");
    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      interimResults: true,
      maxAlternatives: 1,
      continuous: false,
      requiresOnDeviceRecognition: false,
      addsPunctuation: false,
    });
  };

  const handleClear = () => {
    setTranscript("");
  };

  const handleSend = () => {
    doSend(transcript);
  };

  return (
    <View>
			<View>
      <TextInput
        placeholder="Enter Text"
        value={transcript}
        onChangeText={(text) => setTranscript(text)}
        multiline
        numberOfLines={3}
        // style={[styles.input, { backgroundColor: isLoadingChat ? '#F0F0F0' : 'white' }]}
				style={[styles.input, { color: isLoadingChat ? '#D0D0D0' : 'black' }]}
      />
			{isLoadingChat && (
				<ActivityIndicator 
					style={styles.activityIndicator} 
					size="small" 
					color="blue" 
				/>
			)}
			</View>
      <View style={styles.buttonsWrapper}>
        <Button
          color={recognizing ? "red" : undefined}
          title={recognizing ? "Stop Mic" : "Start Mic"}
          onPress={recognizing ? ExpoSpeechRecognitionModule.stop : handleStart}
        />
        <Button title="Send" onPress={handleSend} />
        <Button title="Clear" onPress={handleClear} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
		marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    fontSize: 15,
    minHeight: 80,
    maxHeight: 220,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    textAlignVertical: 'top',
    backgroundColor: 'white',
  },
  activityIndicator: {
    position: 'absolute',
    left: '50%',
    top: '50%',
		transform: [
      { translateX: -14 }, // Half of the ActivityIndicator's width
      { translateY: -14 }, // Adjust this value to center vertically
    ],

  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 0,
  },
});

export default InputModule;
