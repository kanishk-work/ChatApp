import React, { useRef, useState } from 'react';

export const useAudioRecorder = () => {
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [audioURL, setAudioURL] = useState<string>("");
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = useState<number>(0); // Elapsed time in milliseconds

    const startTimeRef = useRef<number>(0);
    const pauseStartTimeRef = useRef<number>(0); // To track when the recording was paused
    const pauseDurationRef = useRef<number>(0); // To track the total duration of pauses
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const streamRef = useRef<MediaStream | null>(null); // Ref to keep track of the media stream

    const requestMicAccess = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);
            streamRef.current = stream; // Store the media stream

            recorder.ondataavailable = (event: BlobEvent) => {
                const blob = event.data;
                setAudioBlob(blob);
                const url = URL.createObjectURL(blob);
                setAudioURL(url);
            };

            recorder.onstart = () => {
                startTimeRef.current = Date.now() - elapsedTime; // Adjust start time to account for any previous elapsed time
                pauseStartTimeRef.current = 0;
                pauseDurationRef.current = 0;
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                intervalRef.current = setInterval(() => {
                    if (!isPaused) {
                        setElapsedTime(Date.now() - startTimeRef.current - pauseDurationRef.current);
                    }
                }, 100);
            };

            recorder.onstop = () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                intervalRef.current = null;
                setIsRecording(false);
                setIsPaused(false);

                
            };
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const startRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.start();
            setIsRecording(true);
            setIsPaused(false);
            startTimeRef.current = Date.now() - elapsedTime - pauseDurationRef.current; // Adjust start time to account for any previous elapsed time
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            intervalRef.current = setInterval(() => {
                if (!isPaused) {
                    setElapsedTime(Date.now() - startTimeRef.current - pauseDurationRef.current);
                }
            }, 100);
        }
    };

    const pauseRecording = () => {
        if (mediaRecorder && isRecording && !isPaused) {
            mediaRecorder.pause();
            setIsPaused(true);
            pauseStartTimeRef.current = Date.now(); // Record the time when pause occurs
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    };

    const resumeRecording = () => {
        if (mediaRecorder && isRecording && isPaused) {
            mediaRecorder.resume();
            setIsPaused(false);
            const pauseEndTime = Date.now();
            const pauseDuration = pauseEndTime - pauseStartTimeRef.current;
            pauseDurationRef.current += pauseDuration;
            startTimeRef.current += pauseDuration; // Adjust start time to account for pause duration
            intervalRef.current = setInterval(() => {
                if (!isPaused) {
                    setElapsedTime(Date.now() - startTimeRef.current - pauseDurationRef.current);
                }
            }, 100);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
    };

    const deleteRecording = () => {
        setAudioBlob(null);
        setAudioURL("");
        setElapsedTime(0); // Reset elapsed time
        pauseDurationRef.current = 0; // Reset pause duration
    };

    const clearAudioFile = () => {
        setAudioBlob(null);
    };

    const getAudioFile = (): File | null => {
        if (audioBlob) {
            return new File([audioBlob], "recording.mp3", { type: "audio/mp3" });
        }
        return null;
    };

    // Format elapsed time as mm:ss
    const formatTime = (milliseconds: number): string => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return {
        isRecording,
        isPaused,
        audioURL,
        elapsedTime,
        formatTime,
        requestMicAccess,
        startRecording,
        pauseRecording,
        resumeRecording,
        stopRecording,
        deleteRecording,
        clearAudioFile,
        getAudioFile,
    };
};
