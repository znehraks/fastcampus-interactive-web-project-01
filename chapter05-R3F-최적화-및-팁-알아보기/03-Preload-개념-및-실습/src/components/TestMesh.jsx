/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei";
import {} from "react";
export const TestMesh = () => {
  const gltfs = useGLTF([
    "/dancer01.glb",
    "/dancer02.glb",
    "/dancer03.glb",
    "/dancer04.glb",
    "/dancer05.glb",
    "/dancer06.glb",
    "/dancer07.glb",
    "/dancer08.glb",
    "/dancer09.glb",
    "/dancer10.glb",
    "/dancer11.glb",
    "/dancer12.glb",
    "/dancer13.glb",
    "/dancer14.glb",
    "/dancer15.glb",
    "/dancer16.glb",
    "/dancer17.glb",
    "/dancer18.glb",
    "/dancer19.glb",
    "/dancer20.glb",
    "/dancer21.glb",
  ]);
  console.log(gltfs);
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
