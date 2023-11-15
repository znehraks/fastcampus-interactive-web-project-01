/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { Color } from "three";
import { InstancedBoxes } from "./InstancedBoxes";
import { OrbitControls } from "@react-three/drei";
// import { MergedMesh } from "./MergedMesh";

export const MainCanvas = () => {
  return (
    <Canvas
      gl={{ antialias: true }}
      camera={{
        fov: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100000,
        position: [5, 5, 5],
      }}
      scene={{ background: new Color(0x000000) }} // 매번 리렌더되므로, 지양해야할 패턴
    >
      <ambientLight intensity={2} />
      <directionalLight position={[100, 100, 100]} intensity={2} />
      <OrbitControls />
      <InstancedBoxes />
      {/* <MergedMesh /> */}
    </Canvas>
  );
};
