/* eslint-disable react/no-unknown-property */
import {
  Box,
  Circle,
  Cone,
  Cylinder,
  Plane,
  Sphere,
  Torus,
  TorusKnot,
} from "@react-three/drei";

import * as THREE from "three";

export const Meshes = () => {
  return (
    <>
      {/* Plane형태를 구현하고자 할 때 bufferGeometry를 활용하여 만들어진 컴포넌트 */}
      <Plane args={[40, 40]} rotation-x={-Math.PI / 2} receiveShadow>
        <meshStandardMaterial />
      </Plane>

      {/* Box형태를 구현하고자 할 때 bufferGeometry를 활용하여 만들어진 컴포넌트, 기본 material은 meshBasicMaterial */}
      <Box args={[1, 2, 1]} material-color={0x00ff00} position={[2, 1, 0]} />
      <mesh position-y={0.5} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={0xff0000} />
      </mesh>

      {/* Sphere */}
      <Sphere args={[1]} position={[0, 1, 3]} material-color={0xffff00} />

      {/* Circle */}
      {/* 아래 두 코드는 동일하다 */}
      <Circle
        args={[1]}
        position={[0, 1, -3]}
        material-color={"violet"}
        material-side={THREE.DoubleSide}
      />
      {/* <Circle
        args={[1]}
        position={[0, 1, -3]}
        // material-color={"violet"}
        // material-side={THREE.DoubleSide}
      >
        <meshBasicMaterial color={"violet"} side={THREE.DoubleSide} />
      </Circle> */}

      {/* Cone */}
      <Cone args={[1, 2]} position={[3, 1, 3]} material-color={"brown"} />

      {/* Cylinder */}
      <Cylinder
        args={[2, 1, 2]}
        position={[3, 1, -3]}
        material-color={"pink"}
      />

      {/* Torus */}
      <Torus
        args={[1, 0.2]}
        position={[-3, 1.2, -3]}
        material-color={"hotpink"}
      />

      {/* TorusKnot */}
      <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        position={[-3, 1.6, 0]}
        material-color={"teal"}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={0xff0000} roughness={0.5} metalness={1} />
      </TorusKnot>
      <TorusKnot
        args={[1, 0.2]}
        position={[-7, 1.6, 0]}
        material-color={"teal"}
        castShadow
        receiveShadow
      >
        <meshLambertMaterial
          color={0x0abff0}
          emissive={0xff0000}
          emissiveIntensity={0.5}
        />
      </TorusKnot>
      <TorusKnot
        args={[1, 0.2]}
        position={[-11, 1.6, 0]}
        material-color={"teal"}
        castShadow
        receiveShadow
      >
        <meshPhongMaterial
          color={0xff0000}
          emissive={0x00ff00}
          emissiveIntensity={0.2}
          specular={0x0000ff}
          shininess={100}
        />
      </TorusKnot>
      <TorusKnot
        args={[1, 0.2]}
        position={[-15, 1.6, 0]}
        material-color={"teal"}
        castShadow
        receiveShadow
      >
        <meshDepthMaterial opacity={0.5} />
      </TorusKnot>
    </>
  );
};
