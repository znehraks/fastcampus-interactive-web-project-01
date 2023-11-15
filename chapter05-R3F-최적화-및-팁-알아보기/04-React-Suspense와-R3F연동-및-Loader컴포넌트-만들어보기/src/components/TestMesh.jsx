/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei";
import {} from "react";
export const TestMesh = () => {
  const gltfs = useGLTF(["/dancer01.glb"]);
  return (
    <>
      {gltfs.map((gltf, idx) => (
        <primitive
          key={gltf.scene.id}
          object={gltf.scene}
          scale={0.1}
          rotation-y={(Math.PI / 5) * idx}
        />
      ))}
    </>
  );
};
