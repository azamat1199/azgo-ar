import React, { useRef, useState, useEffect } from "react";

const ObjectScannerAR = () => {
  const videoRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [modelUrl, setModelUrl] = useState(null); // Replace with generated 3D model URL

  // Initialize Webcam
  useEffect(() => {
    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (error) {
        console.error("Camera access denied:", error);
      }
    }
    initCamera();
  }, []);

  // Capture Image
  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");
    setCapturedImages((prev) => [...prev, imageData]);
  };

  // Simulate Sending to Backend
  const generate3DModel = async () => {
    alert("Sending images to backend for 3D reconstruction...");
    // Replace this with actual backend API logic to process images
    setTimeout(() => {
      setModelUrl("/src/assets/car.glb"); // Replace with the backend-generated 3D model URL
    }, 2000);
  };

  return (
    <div>
      <h1>AR Object Scanner</h1>

      {/* Webcam View */}
      <video
        ref={videoRef}
        style={{ width: "100%", maxWidth: "500px" }}
      ></video>
      <button onClick={captureImage} style={{ margin: "10px" }}>
        Capture Image
      </button>
      <button onClick={generate3DModel} disabled={capturedImages.length === 0}>
        Generate 3D Model
      </button>

      {/* Display Captured Images */}
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
        {capturedImages?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Captured ${index}`}
            style={{ width: "100px", margin: "5px" }}
          />
        ))}
      </div>

      {/* AR Visualization */}
      {modelUrl && (
        <a-scene embedded arjs="sourceType: webcam;">
          <a-marker preset="hiro">
            <a-entity
              gltf-model={modelUrl}
              scale="0.5 0.5 0.5"
              position="0 0 0"
            ></a-entity>
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      )}
    </div>
  );
};

export default ObjectScannerAR;
