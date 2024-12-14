import React, { useState, useEffect } from "react";
import "aframe";
import "ar.js";

function ArBasic() {
  const [imageSrc, setImageSrc] = useState(null);

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = function (e) {
  //       console.log("Image URL:", e.target.result); // Log the image URL
  //       setImageSrc(e.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    };
    getUserMedia();
  }, []);

  return (
    <div>
      <h1>AR Image Viewer</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {imageSrc ? (
        <a-scene
          embedded
          arjs="sourceType: webcam; debugUIEnabled: false;"
          style={{ height: "100vh" }} // Ensure the scene fills the viewport
        >
          <a-marker preset="hiro">
            <a-image
              src={imageSrc}
              position="0 0.5 0"
              rotation="-90 0 0"
              width="1"
              height="1"
            ></a-image>
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      ) : (
        <div style={{ color: "red" }}>Image not loaded</div>
      )}
    </div>
  );
}

export default ArBasic;
