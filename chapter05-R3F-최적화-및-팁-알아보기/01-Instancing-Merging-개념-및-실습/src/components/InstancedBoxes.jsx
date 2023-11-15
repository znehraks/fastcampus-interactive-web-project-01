/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const object3D = new THREE.Object3D(); // 개별 instancedMesh의 회전 및 위치 값 계산을 위해 사용할 temp Object3D
const color = new THREE.Color(); // 색상 저장을 위해 사용할 temp Color
const boxCount = 1000000; // instancedMesh의 총 개수
const boxSize = [0.2, 0.2, 0.2]; // instancedMesh의 width, height, depth

const colorPalettes = ["#00a0b0", "#6a4a3c", "#cc333f", "#eb6841", "#edc951"];
export const InstancedBoxes = () => {
  const ref = useRef(null);

  //  색상값을 컬러 팔레트 중 랜덤으로 선택해서 Float32Array 형태로 저장
  const colors = useMemo(
    () =>
      new Float32Array(
        Array.from({ length: boxCount }, () =>
          color.set(colorPalettes[Math.floor(Math.random() * 5)]).toArray()
        ).flat()
      ),
    []
  );

  //
  useEffect(() => {
    let i = 0;
    const spaceWidth = Math.round(Math.pow(boxCount, 1 / 3));
    const halfOfSpaceWidth = spaceWidth / 2;
    for (let x = 0; x < spaceWidth; x += 1) {
      for (let y = 0; y < spaceWidth; y += 1) {
        for (let z = 0; z < spaceWidth; z += 1) {
          const id = i++;
          object3D.rotation.set(Math.random(), Math.random(), Math.random());
          object3D.position.set(
            halfOfSpaceWidth - x + Math.random(),
            halfOfSpaceWidth - y + Math.random(),
            halfOfSpaceWidth - z + Math.random()
          );
          object3D.updateMatrix(); // 위에서 변환한 rotation, position 속성을 matrix에 반영함
          ref.current.setMatrixAt(id, object3D.matrix);
        }
      }
    }
    ref.current.instanceMatrix.needsUpdate = true; // 현재 instancedMesh의 matrix가 update 되었음을 알려주는 코드
  }, []);
  return (
    // 세번째 args는 인스턴싱할 메시의 개수
    <instancedMesh ref={ref} args={[null, null, boxCount]}>
      <boxGeometry args={boxSize}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </boxGeometry>
      {/* vertexColors 가 true로 설정됨으로써, 위의 instancedBufferAttribute의 color가 사용될 수 있도록 설정함 */}
      <meshLambertMaterial vertexColors />
    </instancedMesh>
  );
};
