/* eslint-disable react/no-unknown-property */
import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
export const Dancer = () => {
  const dancerRef = useRef(null);
  const { scene, animations } = useGLTF("/models/dancer.glb"); // useGLTF Hook으로 모델링 로드
  const { actions } = useAnimations(animations, dancerRef); // useAnimations Hook으로 애니메이션 로드
  console.log(actions);

  useEffect(() => {
    actions["wave"].play(); // 'wave'라는 이름의 애니메이션 재생
  }, [actions]);

  return (
    <>
      <ambientLight intensity={2} />
      <primitive ref={dancerRef} object={scene} scale={0.05} />
    </>
  );
};
