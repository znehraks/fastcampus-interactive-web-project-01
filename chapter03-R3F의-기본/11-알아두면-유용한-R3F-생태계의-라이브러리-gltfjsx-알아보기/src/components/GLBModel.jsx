/* eslint-disable react/no-unknown-property */
import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

export const GLBModel = () => {
  const { scene, animations } = useGLTF("/dancer.glb");
  const ref = useRef(null);
  const { actions } = useAnimations(animations, ref);
  const [currentAnimation, setCurrentAnimation] = useState("wave");

  useEffect(() => {
    scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [actions, currentAnimation, scene]);

  useEffect(() => {
    actions[currentAnimation].fadeIn(0.5).play();
    return () => {
      actions[currentAnimation].fadeOut(0.5).stop();
    };
  }, [actions, currentAnimation]);
  return (
    <primitive
      onClick={() => {
        setCurrentAnimation((prev) => {
          if (prev === "wave") return "windmill";
          return "wave";
        });
      }}
      onPointerUp={() => {
        console.log("onPointerUp");
      }}
      onPointerDown={() => {
        console.log("onPointerDown");
      }}
      // 성능문제가 발생할 수 있음
      //   onPointerMove={() => {
      //     console.log("onPointerMove");
      //   }}

      // 그 외 다른 이벤트도 사용 가능함
      ref={ref}
      scale={0.01}
      object={scene}
      position-y={0.8}
    />
  );
};
