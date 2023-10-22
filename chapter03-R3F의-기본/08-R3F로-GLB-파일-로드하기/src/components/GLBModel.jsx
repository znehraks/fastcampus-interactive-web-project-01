/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export const GLBModel = () => {
  const { scene } = useGLTF("/dancer.glb");

  useEffect(() => {
    scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive scale={0.01} object={scene} position-y={0.8} />;
};
