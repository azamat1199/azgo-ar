import React, { useEffect } from "react";

const ArCapture = () => {
  useEffect(() => {
    // Inject A-Frame and AR.js scripts into the page
    const aframeScript = document.createElement("script");
    aframeScript.src = "https://aframe.io/releases/1.2.0/aframe.min.js";
    aframeScript.async = true;
    document.body.appendChild(aframeScript);

    const arScript = document.createElement("script");
    arScript.src =
      "https://cdn.rawgit.com/jeromeetienne/ar.js/2.0.1/aframe/build/aframe-ar.min.js";
    arScript.async = true;
    document.body.appendChild(arScript);

    return () => {
      // Cleanup scripts when component unmounts
      document.body.removeChild(aframeScript);
      document.body.removeChild(arScript);
    };
  }, []);

  return (
    <div>
      <a-scene
        embedded
        arjs="sourceType: webcam;"
        style={{ position: "relative", width: "100vw", height: "100vh" }}
      >
        {/* Default 3D Object */}
        <a-entity
          gltf-model="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
          scale="0.5 0.5 0.5"
          position="0 0 0"
          rotation="0 45 0"
        ></a-entity>

        {/* Camera */}
        <a-camera position="0 0 0" look-controls-enabled="true"></a-camera>
      </a-scene>

      <button
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 20px",
          fontSize: "16px",
          zIndex: 10,
        }}
        onClick={() => {
          const scene = document.querySelector("a-scene");
          const canvas = scene?.renderer?.domElement;

          if (canvas) {
            const imgData = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = "ar-capture.png";
            link.href = imgData;
            link.click();
          }
        }}
      >
        Capture Object
      </button>
    </div>
  );
};

export default ArCapture;
