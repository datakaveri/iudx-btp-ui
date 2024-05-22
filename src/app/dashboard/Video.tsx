"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

interface Props {
  src: string;
  title: string;
}

const Video = ({ src, title }: Props) => {
  const [videoSrc, setVideoSrc] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get("https://file.cos.iudx.org.in/iudx/v1/download?file-id=3ef0cd1f-5690-46cc-9b78-35e3b5f4791d/754484c2-489d-4192-b990-27f6fb67c5e4.mp4", {
          responseType: "blob",
          headers: {
            token: `eyJpc3MiOiJjb3MuaXVkeC5vcmcuaW4iLCJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJzdWIiOiI0NzI3ZTI0Yy0wZDkzLTQ1NDUtYjdiNC1lYTNlZTI5ZjYwODYiLCJpc3MiOiJjb3MuaXVkeC5vcmcuaW4iLCJhdWQiOiJycy5jb3MuaXVkeC5vcmcuaW4iLCJleHAiOjE3MTY0MTE3MjAsImlhdCI6MTcxNjM2ODUyMCwiaWlkIjoicmk6M2VmMGNkMWYtNTY5MC00NmNjLTliNzgtMzVlM2I1ZjQ3OTFkIiwicm9sZSI6ImNvbnN1bWVyIiwiY29ucyI6eyJhY2Nlc3MiOlsiYXBpIiwic3ViIiwiZmlsZSIsImFzeW5jIl19LCJyZyI6ImJhN2IxNWQ0LTYzNmUtNGIxNi04YmI0LTM2M2Y2ZWQ5ODk4MCJ9.SLhJ0noZVcnSGASMapSWqXjiyfyyPwaJI9oQkWjCdeEYHE9m6XHTDGASXDA4oX6cB4tJKBeJgE-gS50p9Mmatw`,
            Accept: "video/mp4;charset=UTF-8",
          },
        });

        const videoBlob = new Blob([response.data], { type: "video/mp4" });
        const videoObjectUrl = URL.createObjectURL(videoBlob);

        setVideoSrc(videoObjectUrl);
      } catch (error) {
        console.error("Error fetching the video", error);
      }
    };

    fetchVideo();

    return () => {
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [videoSrc]);

  return (
    <div>
      {videoSrc ? (
        <video width={400} ref={videoRef} controls>
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <p>Downloading...</p>
      )}
    </div>
  );
};

export default Video;
