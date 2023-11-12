/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useRef } from "react";

export const Lights = () => {
  const lightRef = useRef(null);

  return (
    <>
      {/* directionalLight 및 간단한 그림자 설정 */}
      <directionalLight
        ref={lightRef}
        args={[0xffffff, 5]}
        position={[4, 4, 4]}
        castShadow
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.1}
        shadow-camera-far={1000}
        shadow-mapSize-width={8192}
        shadow-mapSize-height={8192}
      />
    </>
  );
};
