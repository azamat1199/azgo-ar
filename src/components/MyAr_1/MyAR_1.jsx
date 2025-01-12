import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { USDZExporter } from "three/examples/jsm/exporters/USDZExporter";

const ArObjectCapture = () => {
  const [model, setModel] = useState(null);
  const [exportUrl, setExportUrl] = useState(null);
  const sceneRef = useRef();

  const generateModel = () => {
    // Create a sample 3D object for demonstration
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: "orange" });
    const mesh = new THREE.Mesh(geometry, material);

    if (sceneRef.current) {
      sceneRef.current.clear();
      sceneRef.current.add(mesh);
    }

    setModel(mesh);
    console.log("3D Model generated!");
  };

  const exportToUSDZ = () => {
    if (!model) {
      console.log("No model to export!");
      return;
    }

    const exporter = new USDZExporter();
    exporter.parse(
      sceneRef.current,
      (usdzFile) => {
        const blob = new Blob([usdzFile], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        setExportUrl(url);
        console.log("USDZ file generated:", url);

        // Optional: Trigger download
        const link = document.createElement("a");
        link.href = url;
        link.download = "scanned-object.usdz";
        link.click();
      },
      { binary: true }
    );
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1>AR Object Capture</h1>
      <Canvas style={{ height: 400, background: "#ddd" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <OrbitControls />
        <scene ref={sceneRef} />
      </Canvas>
      <div>
        <button
          onClick={generateModel}
          style={{ margin: "10px", padding: "10px" }}
        >
          Generate 3D Model
        </button>
        <button
          onClick={exportToUSDZ}
          style={{ margin: "10px", padding: "10px" }}
        >
          Export to USDZ
        </button>
      </div>
      {exportUrl && (
        <div>
          <p>
            Download the USDZ file:{" "}
            <a href={exportUrl} download="scanned-object.usdz">
              Click here
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default ArObjectCapture;
