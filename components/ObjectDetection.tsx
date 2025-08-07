"use client";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as cocoSSd from "@tensorflow-models/coco-ssd";
import renderPredictions from "../utils/render.predictions";

interface Props {
  email: string;
  option: string;
  delay: string;
}

let detectInterval: ReturnType<typeof setInterval>;

const ObjectDetection = ({ email, option, delay }: Props) => {
  const webCamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(parseInt(delay) * 60);
  const [detectionStarted, setDetectionStarted] = useState(false);
  const alarmRef = useRef<HTMLAudioElement | null>(null);
  const personDetectedRef = useRef(false);
  let lastAlarmTime = 0;
  const cooldown = 3000;
  useEffect(() => {
    if (countdown <= 0) {
      setDetectionStarted(true);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const playAlarm = () => {
    personDetectedRef.current = false;
    console.log(`Play alarm get called}`);
    if (!alarmRef.current) {
      alarmRef.current = new Audio("/alarm.wav");
    }
    if (alarmRef.current.onplaying) {
      console.log(`On PLaying get called`);
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
      alarmRef.current.play().catch(console.error);
    } else {
      console.log(`Play get called}`);
      alarmRef.current.play().catch(console.error);
    }
  };

  const sendEmailWithScreenshot = () => {
    //
  };

  const runObjectDetection = async (net: cocoSSd.ObjectDetection) => {
    if (
      canvasRef.current &&
      webCamRef.current !== null &&
      webCamRef.current.video?.readyState === 4
    ) {
      canvasRef.current.width = webCamRef.current.video.videoWidth;
      canvasRef.current.height = webCamRef.current.video.videoHeight;

      const detectedObjects = await net.detect(
        webCamRef.current.video,
        undefined,
        0.6
      );

      const context = canvasRef.current.getContext("2d");
      renderPredictions(detectedObjects, context);

      const hasPerson = detectedObjects.some((obj) => obj.class === "person");

      if (hasPerson && !personDetectedRef.current) {
        //personDetectedRef.current = true;

        if (option === "alarm" || option === "both") {
          const now = Date.now();
          console.log(`Last alarm time: ${now - lastAlarmTime}`);
          if (now - lastAlarmTime >= cooldown) {
            playAlarm();
            lastAlarmTime = now;
          }
        }

        if (option === "email" || option === "both") {
          sendEmailWithScreenshot();
        }
      }
    }
  };

  useEffect(() => {
    const runCoco = async () => {
      try {
        setIsLoading(true);
        await tf.setBackend("webgl");
        await tf.ready();

        const net = await cocoSSd.load();
        setIsLoading(false);

        detectInterval = setInterval(() => {
          runObjectDetection(net);
        }, 100);
      } catch (err) {
        setIsLoading(false);
        console.log(`ERROR is ${err}`);
      }
    };

    if (detectionStarted) {
      runCoco();
    }

    return () => {
      if (detectInterval) clearInterval(detectInterval);
    };
  }, [detectionStarted]);

  return (
    <div className="mt-8 w-full">
      {isLoading || !detectionStarted ? (
        <div className="text-white text-center text-4xl font-bold mt-50">
          {countdown > 0
            ? `⏳ Starting in ${Math.floor(countdown / 60)
                .toString()
                .padStart(2, "0")}:${(countdown % 60)
                .toString()
                .padStart(2, "0")}`
            : "🔍 Starting Detection..."}
        </div>
      ) : (
        <div className="mt-20">
          {isLoading ? (
            <div className="gradient-text">Loading AI Model</div>
          ) : (
            <div className="flex flex-col mt-20 gap-4 items-center justify-center">
              <h1 className="text-white text-3xl font-bold text-center">
                Live Can View
              </h1>
              <div className="relative flex justify-center items-center p-1.5 rounded-md">
                <Webcam
                  ref={webCamRef}
                  className="rounded-md w-full h-[720px] lg:h-[720px]"
                  muted
                  videoConstraints={{
                    width: 1280,
                    height: 720,
                    facingMode: "user",
                  }}
                />

                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-[720px] lg:h-[720px] z-50"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;
