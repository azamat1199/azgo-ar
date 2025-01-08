import React, { useRef, useState } from "react";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";

const ArObjectScanner = ({ onModelReady }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [images, setImages] = useState([]);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => console.error("Error accessing camera:", err));
  };

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setImages((prev) => [...prev, imageData]);
    }
  };

  const stopCapture = () => {
    if (images.length > 0) {
      // Simulate creating a 3D model
      const geometry = new THREE.BoxGeometry(1, 1, 1); // Placeholder geometry
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
      });
      const mesh = new THREE.Mesh(geometry, material);

      // Convert to GLTF (for storage or further processing)
      const gltfExporter = new GLTFExporter();
      gltfExporter.parse(
        mesh,
        (result) => {
          const gltfBlob = new Blob([JSON.stringify(result)], {
            type: "application/json",
          });
          const modelUrl = URL.createObjectURL(gltfBlob);
          onModelReady(modelUrl);
        },
        { binary: false }
      );
    }
  };

  //   const stopCapture = () => {
  //     if (images.length > 0) {
  //       // Simulate creating a 3D model
  //       const geometry = new THREE.BoxGeometry(1, 1, 1); // Placeholder geometry
  //       const material = new THREE.MeshBasicMaterial({
  //         color: 0x00ff00,
  //         wireframe: true,
  //       });
  //       const mesh = new THREE.Mesh(geometry, material);

  //       // Convert to GLTF
  //       const gltfExporter = new THREE.GLTFExporter();
  //       gltfExporter.parse(
  //         mesh,
  //         (result) => {
  //           const gltfBlob = new Blob([JSON.stringify(result)], {
  //             type: 'application/json',
  //           });

  //           // Create a download link
  //           const link = document.createElement('a');
  //           link.href = URL.createObjectURL(gltfBlob);
  //           link.download = 'scanned-object.gltf';
  //           link.click();

  //           // Optional: Pass the URL to a parent component
  //           const modelUrl = URL.createObjectURL(gltfBlob);
  //           onModelReady(modelUrl);
  //         },
  //         { binary: false }
  //       );
  //     }
  //   };

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%", height: "auto" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div>
        <button onClick={startVideo}>Start Camera</button>
        <button onClick={captureFrame}>Capture Frame</button>
        <button onClick={stopCapture}>Stop & Save</button>
      </div>
      <div>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Captured Frame ${index}`}
            style={{ width: "100px", height: "100px", margin: "5px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default ArObjectScanner;
