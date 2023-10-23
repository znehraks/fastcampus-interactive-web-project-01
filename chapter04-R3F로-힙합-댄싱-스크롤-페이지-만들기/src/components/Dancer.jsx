/* eslint-disable react/no-unknown-property */
import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
export const Dancer = () => {
  const dancerRef = useRef(null);
  const { scene, animations } = useGLTF("/models/dancer.glb"); // useGLTF Hook으로 모델링 로드
  const { actions } = useAnimations(animations, dancerRef); // useAnimations Hook으로 애니메이션 로드
  console.log(actions);

  const scroll = useScroll(); // ScrollControls 하위에 있는 컴포넌트가 사용 가능한 hook
  useFrame(() => {
    console.log(scroll.offset); // scroll.offset을 통해, 현재 스크롤된 offset을 알 수 있다.(스크롤을 하나도 안하면 0, 끝까지 하면 1)
  });

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
