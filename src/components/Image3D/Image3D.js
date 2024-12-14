import React, { useRef } from "react";
import { TextureLoader } from "three";
import { BoxGeometry } from "three";
import { useLoader, extend } from "@react-three/fiber";
extend({ BoxGeometry });

const Image3D = ({ image }) => {
  const texture = useLoader(TextureLoader, image);
  const meshRef = useRef();

  return (
    <mesh ref={meshRef} position={[1, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
};

export default Image3D;
