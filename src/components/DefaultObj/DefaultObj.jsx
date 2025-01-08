import React, { useState, useRef } from "react";
import { Scene, Entity } from "aframe-react"; // Correct imports

const DefaultObj = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [modelUrl, setModelUrl] = useState(""); // Store the URL of the model
  const modelRef = useRef(null);

  // Function to load the default GLB model
  const loadDefaultModel = () => {
    setModelUrl("/src/assets/car.glb"); // Replace with your model's path
    setIsModelLoaded(true); // Flag to show the model after the button is clicked
  };

  // Function to show the default model
  const showDefaultModel = () => {
    setIsModelLoaded(true); // Display the model when this button is clicked
  };

  console.log(isModelLoaded);
  return (
    <div>
      Button to load the default 3D model
      <button onClick={loadDefaultModel}>Load Default Model Obj</button>
      {/* Button to show the default model */}
      <button onClick={showDefaultModel}>Show Default Model</button>
      {/* A-Frame Scene for AR content */}
      <Scene embedded>
        {/* Marker for scanning (you can customize the marker) */}
        <Entity markerhandler preset="hiro">
          {/* If modelUrl is set, display the default model */}
          {isModelLoaded && (
            <Entity
              gltf-model={`url(${modelUrl})`} // Dynamically load the model
              scale="0.5 0.5 0.5"
              position="0 0 0"
              rotation="0 0 0"
            />
          )}
        </Entity>

        {/* Camera to view AR content */}
        <Entity camera></Entity>
      </Scene>
    </div>
  );
};

export default DefaultObj;
