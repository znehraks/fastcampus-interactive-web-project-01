import { Merged } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export const MergedMesh = () => {
  const three = useThree();
  console.log(three.scene.children); // Merged된 instancedMesh가 group으로 한번에 나타남 (즉, 개별 mesh가 아닌, 하나의 Mesh로 취급됨)
  const ref = useRef(null);
  useFrame(() => {
    ref.current.rotation.y += 0.01;
  });
  return (
    <Merged
      ref={ref}
      position={[1, 1, 1]}
      meshes={[
        new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshStandardMaterial({ color: 0xffff00 })
        ),
        new THREE.Mesh(
          new THREE.SphereGeometry(1),
          new THREE.MeshStandardMaterial({ color: 0xff0000 })
        ),
      ]}
    >
      {(Box, Sphere) => (
        <>
          <Box position={[-1, -2, 0]} />
          <Sphere position={[1, -1, 0]} />
          <Box position={[-3, -3, 0]} />
          <Box position={[-3, -5, 0]} />
        </>
      )}
    </Merged>
  );
};
