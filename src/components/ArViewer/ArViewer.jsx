import React, { useEffect, useRef } from "react";

const ArViewer = ({ modelUrl }) => {
  useEffect(() => {
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
      document.body.removeChild(aframeScript);
      document.body.removeChild(arScript);
    };
  }, []);

  return (
    <a-scene embedded arjs="sourceType: webcam;">
      <a-entity
        gltf-model={modelUrl}
        position="0 0 0"
        scale="0.5 0.5 0.5"
        rotation="0 45 0"
      ></a-entity>
      <a-camera position="0 0 0"></a-camera>
    </a-scene>
  );
};

export default ArViewer;
