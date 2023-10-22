/* eslint-disable react/no-unknown-property */
import { Plane, TorusKnot } from "@react-three/drei";

export const Meshes = () => {
  return (
    <>
      {/* Plane형태를 구현하고자 할 때 bufferGeometry를 활용하여 만들어진 컴포넌트 */}
      <Plane args={[40, 40]} rotation-x={-Math.PI / 2} receiveShadow>
        <meshStandardMaterial />
      </Plane>

      {/* TorusKnot */}
      <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        position={[0, 1.6, 0]}
        material-color={"teal"}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={0xff0000} />
      </TorusKnot>
    </>
  );
};
