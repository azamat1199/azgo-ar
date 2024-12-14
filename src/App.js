import React, { useState } from "react";
import ObjectScannerAR from "./components/ObjectScannerAR/ObjectScannerAR";

const App = () => {
  return (
    <div>
      <h1>3D Image Viewer</h1>
      <a-scene embedded arjs="sourceType: webcam;">
        {/* Marker for AR */}
        <a-marker preset="hiro">
          {/* Replace the model path with your 3D model file */}
          <a-entity
            gltf-model="https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models/2.0/Duck/glTF/Duck.gltf"
            scale="0.5 0.5 0.5"
            position="0 0 0"
          ></a-entity>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
      <div style={{ height: "100vh" }}></div>
      <ObjectScannerAR />
    </div>
  );
};

export default App;
