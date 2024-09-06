import React from 'react';
import useAudioRecorder from '../../Utils/CustomHooks/useAudioRecorder2';

const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const AudioRecorderComponent: React.FC = () => {
  const {
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
  } = useAudioRecorder();

  const handleDownload = async () => {
    const audioFile = await getAudioFile();
    if (audioFile) {
      const url = URL.createObjectURL(audioFile);
      const link = document.createElement('a');
      link.href = url;
      link.download = audioFile.name;
      link.click();
    }
  };
  if (hasPermission === false) {
    return <p>Microphone access denied. Please allow mic permissions to record audio.</p>;
  }
  return (
    <div>
      <h2>Audio Recorder</h2>
      <p>Elapsed Time: {formatTime(elapsedTime)}</p>

      {!isRecording && !audioUrl && <button onClick={startRecording}>Start Recording</button>}
      {isRecording && !isPaused && <button onClick={pauseRecording}>Pause Recording</button>}
      {isRecording && isPaused && <button onClick={resumeRecording}>Resume Recording</button>}
      {isRecording && <button onClick={stopRecording}>Stop Recording</button>}

      {audioUrl && (
        <div>
          <audio controls src={audioUrl}></audio>
          <button onClick={deleteRecording}>Delete Recording</button>
          <button onClick={handleDownload}>Download MP3</button>
        </div>
      )}
    </div>
  );
};


export default AudioRecorderComponent;
