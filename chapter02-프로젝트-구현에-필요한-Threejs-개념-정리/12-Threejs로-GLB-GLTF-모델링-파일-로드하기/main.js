// Threejs로 GLB(GLTF) 모델링 파일 로드하기

import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// renderer(송출 기계)
const renderer = new THREE.WebGLRenderer({ antialias: true });

// renderer가 그림자를 나타낼 수 있도록 함
renderer.shadowMap.enabled = true;

// renderer의 shadowMap 종류
// renderer.shadowMap.type = THREE.BasicShadowMap; // 품질은 가장 낮고, 성능은 가장 좋음
// renderer.shadowMap.type = THREE.PCFShadowMap; // 품질은 중간, 성능도 중간
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 품질은 가장 좋음, 성능은 가장 낮음

// renderer 크기 설정
renderer.setSize(window.innerWidth, window.innerHeight);

// renderer의 캔버스를 body에 추가
document.body.appendChild(renderer.domElement);

// scene(촬영 장소)
const scene = new THREE.Scene();

// camera(촬영 카메라)
const camera = new THREE.PerspectiveCamera(
  60, // fov(시야각)
  window.innerWidth / window.innerHeight, // 카메라가 담을 가로 세로 비율
  0.1, // 카메라가 피사체를 담을 수 있는 범위의 하한
  1000 // 카메라가 피사체를 담을 수 있는 범위의 상한
);

// 바닥 만들기
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xbbbbbb });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = 0;
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);

// 화면 사이즈가 변경될 때
window.addEventListener("resize", () => {
  // 카메라의 가로세로 비율을 바뀐 비율로 재설정
  camera.aspect = window.innerWidth / window.innerHeight;

  // 위에서 바뀐 속성 정보 적용
  camera.updateProjectionMatrix();

  // renderer에도 바뀐 가로 세로 사이즈 적용
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 바뀐 상태로 리랜더
  renderer.render(scene, camera);
});

const gltfLoader = new GLTFLoader();
// gltfLoader.load("/dancer.glb", (data) => {
//   console.log(data);
//   scene.add(data.scene);
// });

const gltf = await gltfLoader.loadAsync("/dancer.glb");
const character = gltf.scene;
character.position.y = 0.8;
character.scale.set(0.01, 0.01, 0.01);
character.traverse((mesh) => {
  if (mesh.isMesh) {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  }
});
scene.add(character);

camera.position.set(1, 2, 2);
// AmbientLight
// ==> 모든 장면에 동일한 밝기를 제공함
// ==> 그림자 X
// const ambientLight = new THREE.AmbientLight(0xff0000);
// scene.add(ambientLight);

// DirectionalLight
// ==> 직사광선(태양 빛을 연상하면 됨)
// ==> 그림자 O
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true; // 빛이 그림자를 만들 수 있게 함
directionalLight.position.set(3, 4, 5); // 빛의 위치 설정
directionalLight.lookAt(0, 0, 0); // 빛이 향하는 방향 설정

directionalLight.shadow.mapSize.width = 4096; // 그림자 맵의 너비
directionalLight.shadow.mapSize.height = 4096; // 그림자 맵의 높이
directionalLight.shadow.camera.near = 0.1; // 그림자가 그려질 수 있는 빛과의 최소 거리
directionalLight.shadow.camera.far = 500; // 그림자가 그려질 수 있는 빛과의 최대 거리
scene.add(directionalLight);

// 마우스로 카메라 시점을 조작함
// OrbitControls;
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true; // 기본값: false, 카메라 시점을 돌릴 때, 바로 멈추는게 아닌, 좀 더 진행방향으로 이동 후 멈추는 효과 (update 메소드를 애니메이션 프레임 안에서 실행해야 정상적으로 동작함)
orbitControls.dampingFactor = 0.03; // 기본값: 0.05, enableDamping이 true일 때, 값이 작아질수록 더욱 부드럽게 정지됨
// orbitControls.enableZoom = true; // 기본값: true, 스크롤을 이용하여 카메라 줌 활성화 여부
// orbitControls.enableRotate = true; // 기본값: true, 마우스 클릭 드래그를 통해 카메라 회전 활성화 여부
// orbitControls.enablePan = false; // 기본값: true, 마우스 우클릭 드래그를 통해 카메라 위치 이동 활성화 여부
// orbitControls.autoRotate = false; // 기본값: false, 자동 회전 기능 활성화 여부 (update 메소드를 애니메이션 프레임 안에서 실행해야 정상적으로 동작함)
// orbitControls.autoRotateSpeed = 1; // 기본값: 2, autoRotate가 true일 때, 회전 속력 설정, 클수록 빠름
// orbitControls.maxPolarAngle = Math.PI / 2; // 수직 회전의 최댓값
// orbitControls.minPolarAngle = Math.PI / 4; // 수직 회전의 최솟값
// orbitControls.maxAzimuthAngle = Math.PI / 2; // 수평 회전의 최댓값
// orbitControls.minAzimuthAngle = -Math.PI / 2; // 수평 회전의 최솟값

const render = () => {
  orbitControls.update(); // OrbitControls의 enableDamping 효과를 적용하려면 애니메이션 루프 안에서 update 메소드를 실행해야함

  renderer.render(scene, camera);
  // 애니메이션 프레임 루프에서 재귀적으로 계속 렌더함수를 호출하여 애니메이션 처리
  requestAnimationFrame(render);
};
// renderer로 scene과 camera를 받아 render(캔버스에 송출)
render();
