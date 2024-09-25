import { useState, useRef } from "react";
import { Mp3Encoder } from "@breezystack/lamejs";

interface UseAudioRecorder {
  isRecording: boolean;
  isPaused: boolean;
  hasPermission: boolean | null;
  startRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  stopRecording: () => void;
  deleteRecording: () => void;
  getAudioFile: () => Promise<File | null>;
  formatTime: (timeInSeconds: number) => string;
  audioUrl: string | null;
  elapsedTime: number;
}

const useAudioRecorder = (): UseAudioRecorder => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const audioChunks = useRef<Blob[]>([]);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null); // Store audio blob

  // useEffect(() => {
  //   navigator.mediaDevices.getUserMedia({ audio: true })
  //     .then((stream) => {
  //       setHasPermission(true);
  //       stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately after getting permission
  //     })
  //     .catch(() => {
  //       setHasPermission(false);
  //     });

  //   return () => {
  //     if (timerInterval.current) clearInterval(timerInterval.current);
  //   };
  // }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setAudioStream(stream);
      audioChunks.current = [];

      recorder.start();
      recorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      setIsRecording(true);
      setIsPaused(false);
      startTimer();
    } catch (error) {
      setHasPermission(false);
      console.error("Error accessing the microphone:", error);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.pause();
      setIsPaused(true);
      stopTimer();
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "paused") {
      mediaRecorder.resume();
      setIsPaused(false);
      startTimer();
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: "audio/wav" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setAudioBlob(blob);

        if (audioStream) {
          audioStream.getTracks().forEach((track) => track.stop());
          setAudioStream(null);
        }
        stopTimer();
      };
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const deleteRecording = () => {
    setAudioUrl(null);
    setAudioBlob(null);
    setElapsedTime(0);
    audioChunks.current = [];
  };

  const startTimer = () => {
    timerInterval.current = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }
  };

  const getAudioFile = async (): Promise<File | null> => {
    if (audioBlob) {
      // Convert to MP3 or return the existing WAV file
      const mp3Blob = await convertBlobToMp3(audioBlob); // This function converts to MP3
      return new File([mp3Blob], "recording.mp3", { type: "audio/mp3" });
    }
    return null;
  };

  const convertBlobToMp3 = async (blob: Blob): Promise<Blob> => {
    const arrayBuffer = await blob.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const mp3Data = encodeWavToMp3(audioBuffer);
    return new Blob([new Uint8Array(mp3Data)], { type: "audio/mp3" });
  };

  const float32ToInt16 = (samples: Float32Array): Int16Array => {
    const int16Samples = new Int16Array(samples.length);
    for (let i = 0; i < samples.length; i++) {
      int16Samples[i] = Math.max(-1, Math.min(1, samples[i])) * 0x7fff;
    }
    return int16Samples;
  };

  const encodeWavToMp3 = (audioBuffer: AudioBuffer): Array<number> => {
    const samples = float32ToInt16(audioBuffer.getChannelData(0));
    const sampleRate = audioBuffer.sampleRate;
    const bitRate = 128;

    const mp3Encoder = new Mp3Encoder(1, sampleRate, bitRate);
    const mp3Data: number[] = [];
    const blockSize = 1152;

    let sampleIndex = 0;
    while (sampleIndex < samples.length) {
      const sampleChunk = samples.slice(sampleIndex, sampleIndex + blockSize);
      const mp3Buffer = mp3Encoder.encodeBuffer(sampleChunk);
      if (mp3Buffer.length > 0) {
        mp3Data.push(...mp3Buffer);
      }
      sampleIndex += blockSize;
    }

    const flushBuffer = mp3Encoder.flush(); // Finish encoding
    if (flushBuffer.length > 0) {
      mp3Data.push(...flushBuffer);
    }

    return mp3Data;
  };
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };
  return {
    isRecording,
    isPaused,
    hasPermission,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    deleteRecording,
    getAudioFile,
    audioUrl,
    elapsedTime,
    formatTime,
  };
};

export default useAudioRecorder;
