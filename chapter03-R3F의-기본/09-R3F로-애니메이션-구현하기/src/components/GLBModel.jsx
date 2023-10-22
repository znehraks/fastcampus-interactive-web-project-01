/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export const GLBModel = () => {
  // const three = useThree();
  // console.log('three',three);
  const { scene, animations } = useGLTF("/dancer.glb");
  const ref = useRef(null);
  const { actions } = useAnimations(animations, ref);
  console.log("actions", actions);

  useEffect(() => {
    scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    actions["wave"].play();
  }, [actions, scene]);

  useFrame((state, delta) => {
    // console.log('state',state);
    // console.log('delta',delta);
    ref.current.rotation.y += 0.02;
  });

  return <primitive ref={ref} scale={0.01} object={scene} position-y={0.8} />;
};
