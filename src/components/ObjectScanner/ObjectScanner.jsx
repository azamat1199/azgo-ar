import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

const ObjectScanner = () => {
  const rendererRef = useRef();
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(
    new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
  );
  const videoRef = useRef();
  const modelRef = useRef();
  const [isScanning, setIsScanning] = useState(false);
  const [mesh, setMesh] = useState(null);

  useEffect(() => {
    const initThreeJS = () => {
      // Initialize Renderer
      rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(rendererRef.current.domElement);

      // Initialize Camera
      cameraRef.current.position.z = 3;

      // Add Lighting
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(0, 1, 1).normalize();
      sceneRef.current.add(light);

      // Render Loop
      const animate = () => {
        if (rendererRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
        requestAnimationFrame(animate);
      };
      animate();
    };

    const loadTensorFlowModel = async () => {
      modelRef.current = await cocoSsd.load();
      console.log("TensorFlow.js model loaded");
    };

    initThreeJS();
    loadTensorFlowModel();

    return () => {
      // Cleanup on unmount
      if (rendererRef.current) {
        rendererRef.current.domElement.remove();
        rendererRef.current.dispose();
      }
    };
  }, []);

  const loadDefaultModel = () => {
    // Load a simple 3D Box as a placeholder model
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    const box = new THREE.Mesh(geometry, material);
    sceneRef.current.add(box);
    setMesh(box);
  };

  const startScanning = async () => {
    // Enable object scanning using webcam
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;

    const video = videoRef.current;
    video.play();

    const detectObjects = async () => {
      if (!modelRef.current || !video || !isScanning) return;

      const predictions = await modelRef.current.detect(video);
      console.log("Predictions:", predictions);

      if (predictions.length > 0) {
        const obj = predictions[0]; // Use the first detected object
        if (!mesh) {
          const geometry = new THREE.BoxGeometry();
          const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
          const newMesh = new THREE.Mesh(geometry, material);
          sceneRef.current.add(newMesh);
          setMesh(newMesh);
        }

        // Update the mesh position and size based on detected object
        mesh.scale.set(1, obj.bbox[3] / 200, obj.bbox[2] / 200);
        mesh.position.set(obj.bbox[0] / 200 - 1.5, obj.bbox[1] / 200 - 1, -3);
      } else if (mesh) {
        mesh.visible = false; // Hide the mesh if no objects are detected
      }

      requestAnimationFrame(detectObjects);
    };

    setIsScanning(true);
    detectObjects();
  };

  const stopScanning = () => {
    setIsScanning(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    if (mesh) {
      mesh.visible = false;
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "auto",
          zIndex: -1,
        }}
      />
      <button
        onClick={loadDefaultModel}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1,
        }}
      >
        Load Default Model
      </button>
      <button
        onClick={isScanning ? stopScanning : startScanning}
        style={{
          position: "absolute",
          top: "60px",
          left: "20px",
          zIndex: 1,
        }}
      >
        {isScanning ? "Stop Scanning" : "Start Scanning"}
      </button>
    </div>
  );
};

export default ObjectScanner;
