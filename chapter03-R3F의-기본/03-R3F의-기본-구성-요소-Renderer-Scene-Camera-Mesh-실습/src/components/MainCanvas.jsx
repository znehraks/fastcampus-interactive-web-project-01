/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { Color } from "three";

export const MainCanvas = () => {
  return (
    <Canvas
      gl={{ antialias: true }}
      camera={{
        fov: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100,
        position: [5, 5, 5],
      }}
      scene={{ background: new Color(0x000000) }} // 매번 리렌더되므로, 지양해야할 패턴
      onCreated={(state) => {
        console.log(state);
      }}
    >
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={0xff0000} />
      </mesh>
    </Canvas>
  );
};

// 아래 코드와 동일

// // Threejs의 기본 구성 요소(Renderer, Scene, Camera, Mesh)개념
// import "./style.css";
// import * as THREE from "three";

// // renderer(송출 기계)
// const renderer = new THREE.WebGLRenderer();

// // renderer 크기 설정
// renderer.setSize(window.innerWidth, window.innerHeight);

// // renderer의 캔버스를 body에 추가
// document.body.appendChild(renderer.domElement);

// // scene(촬영 장소)
// const scene = new THREE.Scene();

// // camera(촬영 카메라)
// const camera = new THREE.PerspectiveCamera(
//   60, // fov(시야각)
//   window.innerWidth / window.innerHeight, // 카메라가 담을 가로 세로 비율
//   0.1, // 카메라가 피사체를 담을 수 있는 범위의 하한
//   100 // 카메라가 피사체를 담을 수 있는 범위의 상한
// );

// // geometry(mesh의 뼈대)
// const geometry = new THREE.BoxGeometry(1, 1, 1);

// // material(mesh의 껍데기)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// // mesh(촬영물에 담길 오브젝트)
// const mesh = new THREE.Mesh(geometry, material);

// // 카메라 위치의 z 좌표 변경
// camera.position.z = 5;

// // scene에 mesh를 추가
// scene.add(mesh);

// // 화면 사이즈가 변경될 때
// window.addEventListener("resize", () => {
//   // 카메라의 가로세로 비율을 바뀐 비율로 재설정
//   camera.aspect = window.innerWidth / window.innerHeight;

//   // 위에서 바뀐 속성 정보 적용
//   camera.updateProjectionMatrix();

//   // renderer에도 바뀐 가로 세로 사이즈 적용
//   renderer.setSize(window.innerWidth, window.innerHeight);

//   // 바뀐 상태로 리랜더
//   renderer.render(scene, camera);
// });

// // renderer로 scene과 camera를 받아 render(캔버스에 송출)
// renderer.render(scene, camera);
