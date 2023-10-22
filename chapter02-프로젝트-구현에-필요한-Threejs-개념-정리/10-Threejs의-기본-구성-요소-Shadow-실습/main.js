// Threejs의 기본 구성 요소(Light, Shadow, Controls)실습
// https://threejs.org/docs/#api/en/geometries/torusKnotGeometry

import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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
  100 // 카메라가 피사체를 담을 수 있는 범위의 상한
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

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.castShadow = true;
boxMesh.receiveShadow = true;
boxMesh.position.y = 0.5;
scene.add(boxMesh);

// 카메라 위치의 z 좌표 변경
// camera.position.z = 5;
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

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
directionalLight.shadow.camera.far = 100; // 그림자가 그려질 수 있는 빛과의 최대 거리
scene.add(directionalLight);

// HemisphereLight
// ==> 반구 모양의 조명(노을을 연상하면 됨)
// ==> 그림자 X
// const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xf00ff0, 5); // 위쪽 색, 아래쪽 색, 강도
// hemisphereLight.position.set(0, 0, 0);
// hemisphereLight.lookAt(0, 0, 0);
// scene.add(hemisphereLight);

// PointLight
// ==> 점 모양의 조명(구 모양의 무드등을 연상하면 됨)
// ==> 그림자 O
// const pointLight = new THREE.PointLight(0xffffff, 5, 4); // 색상, 강도, 거리에 따라 희미해지는 정도
// pointLight.castShadow = true;
// pointLight.position.set(1, 1, 1); // 빛의 위치를 설정
// scene.add(pointLight);

// RectAreaLight
// ==> 사각형 판 모양의 조명(빛이 나는 네모난 모양의 간판을 연상하면 됨)
// ==> 그림자 X
// ==> MeshStandardMaterial과 MeshPhysicalMaterial만 이 빛의 영향을 받음
// const rectAreaLight = new THREE.RectAreaLight(0xffffff, 5, 2, 2); // 색상, 강도, 조명의 가로 너비, 조명의 세로 길이
// // rectAreaLight.rotation.x = -Math.PI / 2;
// rectAreaLight.position.set(0, 1, 2); // 위치 설정
// scene.add(rectAreaLight);

// SpotLight
// ==> 스포트라이트(공연 무대에서 주인공을 비추는 조명을 연상하면 됨)
// ==> 그림자 O
// ==> 빛의 방향을 조정하려면 scene 상의 오브젝트를 이 조명의 target으로 삼고, 해당 조명의 위치를 통해 조정함
// const targetObj = new THREE.Object3D();
// scene.add(targetObj);
// const spotLight = new THREE.SpotLight(0xffffff, 10, 100, Math.PI / 4, 1, 1);
// spotLight.castShadow = true;
// spotLight.target = targetObj;
// spotLight.position.set(0, 3, 0);
// spotLight.target.position.set(1, 0, 2);
// scene.add(spotLight);

// 마우스로 카메라 시점을 조작함
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();

const render = () => {
  renderer.render(scene, camera);
  // 애니메이션 프레임 루프에서 재귀적으로 계속 렌더함수를 호출하여 애니메이션 처리
  requestAnimationFrame(render);
};
// renderer로 scene과 camera를 받아 render(캔버스에 송출)
render();
