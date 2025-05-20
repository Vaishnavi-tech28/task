import React, { useEffect } from "react";

export const VoiceRecorder = ({ onRecord, setShowRecorder }) => {
  useEffect(() => {
    let mediaRecorder;
    let chunks = [];
    let stream;

    const startRecording = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/webm" });
          onRecord(blob);
          stream.getTracks().forEach((track) => track.stop());
          setShowRecorder(false);
        };

        mediaRecorder.start();
        setTimeout(() => mediaRecorder.stop(), 30000);
      } catch (err) {
        console.error("Recording failed:", err);
        setShowRecorder(false);
      }
    };

    startRecording();

    return () => {
      if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
      }
    };
  }, []);

  return (
    <div className="absolute bottom-20 right-6 bg-gray-800 px-3 py-1 rounded-full text-white animate-pulse">
      Recording<span className="ml-1 animate-bounce">...</span>
    </div>
  );
};
