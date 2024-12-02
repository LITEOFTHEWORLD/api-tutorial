"use client";
import { useState, useRef } from "react";
import axios from "axios";
import Link from "next/link";

const Page = () => {
  const videoRef = useRef(null);
  const screenVideoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isScreenRecording, setIsScreenRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [botCreated, setBotCreated] = useState(false);

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.srcObject = stream;
      }

      setIsStreaming(true);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopStream = () => {
    const videoElement = videoRef.current;
    if (videoElement && videoElement.srcObject) {
      videoElement.srcObject.getTracks().forEach((track) => track.stop());
      videoElement.srcObject = null;
      setIsStreaming(false);
    }
  };

  const startScreenRecording = async (createBot = false) => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      if (createBot) {
        const meetingUrl = prompt("Enter your meeting URL:");
        if (meetingUrl) {
          await createRecallBot(meetingUrl);
        }
      }

      const screenVideoElement = screenVideoRef.current;
      if (screenVideoElement) {
        screenVideoElement.srcObject = screenStream;
      }

      const chunks = [];
      const mediaRecorder = new MediaRecorder(screenStream, {
        mimeType: "video/webm",
      });

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        setRecordedBlob(blob);

        screenStream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsScreenRecording(true);

      screenStream.getVideoTracks()[0].onended = () => {
        stopScreenRecording();
      };
    } catch (error) {
      console.error("Screen recording error:", error);
    }
  };

  const stopScreenRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();

      const screenVideoElement = screenVideoRef.current;
      if (screenVideoElement && screenVideoElement.srcObject) {
        screenVideoElement.srcObject
          .getTracks()
          .forEach((track) => track.stop());
        screenVideoElement.srcObject = null;
      }

      setIsScreenRecording(false);
    }
  };

  const createRecallBot = async (meetingUrl) => {
    try {
      const response = await axios.post(
        `https://${config.recallRegion}.recall.ai/api/v1/bot`,
        {
          bot_name: "ZoomBot",
          meeting_url: meetingUrl,
          transcription_options: {
            provider: "meeting_captions",
          },
        },
        {
          headers: {
            Authorization: `Token ${config.recallApiKey}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setBotCreated(true);
      return response.data;
    } catch (error) {
      console.error("Error creating Recall AI bot:", error);
      alert("Failed to create bot");
      return null;
    }
  };

  return (
    <div>
      <h1>Media Streaming & Screen Recording</h1>

      {/* Camera Stream Section */}
      <div>
        <h2>Camera Stream</h2>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          width="640"
          height="480"
          style={{ display: isStreaming ? "block" : "none" }}
        />
        {!isStreaming ? (
          <button onClick={startStream}>Start Camera</button>
        ) : (
          <button onClick={stopStream}>Stop Camera</button>
        )}
      </div>

      {/* Screen Recording Section */}
      <div>
        <h2>Screen Recording</h2>
        <video
          ref={screenVideoRef}
          autoPlay
          playsInline
          width="640"
          height="480"
          style={{ display: isScreenRecording ? "block" : "none" }}
        />
        {!isScreenRecording ? (
          <>
            <button onClick={() => startScreenRecording()}>
              Start Screen Recording
            </button>
            <button onClick={() => startScreenRecording(true)}>
              Start Recording with Recall AI Bot (with Transcription)
            </button>
          </>
        ) : (
          <button onClick={stopScreenRecording}>Stop Screen Recording</button>
        )}
      </div>

      {/* Bot Creation Confirmation */}
      {botCreated && (
        <div style={{ color: "green", margin: "10px 0" }}>
          Recall AI Bot Created Successfully with Transcription!
        </div>
      )}

      {/* Download Section */}
      {recordedBlob && downloadUrl && (
        <div style={{ marginTop: "20px" }}>
          <a href={downloadUrl} download="recorded-video.webm">
            <button>Download Recording</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default Page;
