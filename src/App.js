import React, { useState } from "react";
import DefaultObj from "./components/DefaultObj/DefaultObj";
import ObjectScanner from "./components/ObjectScanner/ObjectScanner";
import ArCapture from "./components/ArCapture/ArCapture";
import ArObjectScanner from "./components/ArObjectScanner/ArObjectScanner.jsx";
import ArViewer from "./components/ArViewer/ArViewer";

const App = () => {
  const [modelUrl, setModelUrl] = useState(null);

  return (
    <div>
      <h1>3D Image Viewer</h1>
      {/* <a-scene embedded arjs="sourceType: webcam;">
        <a-marker preset="hiro">
          <a-entity
            gltf-model="https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models/2.0/Duck/glTF/Duck.gltf"
            scale="0.5 0.5 0.5"
            position="0 0 0"
          ></a-entity>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene> */}
      <div style={{ height: "100vh" }}>
        {/* <DefaultObj /> */}
        {/* <ArCapture /> */}
      </div>
      {/* <ObjectScannerAR /> */}
      <div>
        {/* <ObjectScanner /> */}
        {!modelUrl ? (
          <ArObjectScanner onModelReady={setModelUrl} />
        ) : (
          <ArViewer modelUrl={modelUrl} />
        )}
      </div>
    </div>
  );
};

export default App;
