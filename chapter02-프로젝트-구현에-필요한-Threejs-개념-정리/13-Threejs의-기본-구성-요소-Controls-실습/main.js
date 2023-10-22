// Threejs의 기본 구성 요소(Light, Shadow, Controls)실습
// https://threejs.org/docs/#api/en/geometries/torusKnotGeometry

import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FlyControls } from "three/examples/jsm/controls/FlyControls";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

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

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true; // 빛이 그림자를 만들 수 있게 함
directionalLight.position.set(3, 4, 5); // 빛의 위치 설정
directionalLight.lookAt(0, 0, 0); // 빛이 향하는 방향 설정

directionalLight.shadow.mapSize.width = 4096; // 그림자 맵의 가로 퀄리티
directionalLight.shadow.mapSize.height = 4096; // 그림자 맵의 세로 퀄리티

// directionalLight.shadow.camera.top = 0.5; // 그림자가 그려질 수 있는 위쪽 경계
// directionalLight.shadow.camera.bottom = -0.5; // 그림자가 그려질 수 있는 아래쪽 경계
// directionalLight.shadow.camera.left = -0.5; // 그림자가 그려질 수 있는 왼쪽 경계
// directionalLight.shadow.camera.right = 0.5; // 그림자가 그려질 수 있는 오른쪽 경계

directionalLight.shadow.camera.near = 0.1; // 그림자가 그려질 수 있는 빛과의 최소 거리
directionalLight.shadow.camera.far = 100; // 그림자가 그려질 수 있는 빛과의 최대 거리
scene.add(directionalLight);

// // 마우스로 카메라 시점을 조작함
// // OrbitControls;
// const orbitControls = new OrbitControls(camera, renderer.domElement);
// orbitControls.enableDamping = true; // 기본값: false, 카메라 시점을 돌릴 때, 바로 멈추는게 아닌, 좀 더 진행방향으로 이동 후 멈추는 효과 (update 메소드를 애니메이션 프레임 안에서 실행해야 정상적으로 동작함)
// orbitControls.dampingFactor = 0.03; // 기본값: 0.05, enableDamping이 true일 때, 값이 작아질수록 더욱 부드럽게 정지됨
// orbitControls.enableZoom = true; // 기본값: true, 스크롤을 이용하여 카메라 줌 활성화 여부
// orbitControls.enableRotate = true; // 기본값: true, 마우스 클릭 드래그를 통해 카메라 회전 활성화 여부
// orbitControls.enablePan = false; // 기본값: true, 마우스 우클릭 드래그를 통해 카메라 위치 이동 활성화 여부
// orbitControls.autoRotate = true; // 기본값: false, 자동 회전 기능 활성화 여부 (update 메소드를 애니메이션 프레임 안에서 실행해야 정상적으로 동작함)
// orbitControls.autoRotateSpeed = 1; // 기본값: 2, autoRotate가 true일 때, 회전 속력 설정, 클수록 빠름
// orbitControls.maxPolarAngle = Math.PI / 2; // 수직 회전의 최댓값
// orbitControls.minPolarAngle = Math.PI / 4; // 수직 회전의 최솟값
// orbitControls.maxAzimuthAngle = Math.PI / 2; // 수평 회전의 최댓값
// orbitControls.minAzimuthAngle = -Math.PI / 2; // 수평 회전의 최솟값

// // FlyControls 날고있는 새의 시점
// const flyControls = new FlyControls(camera, renderer.domElement);
// flyControls.movementSpeed = 1; // WASD 키로 이동하는 카메라 속력
// flyControls.rollSpeed = Math.PI / 10; // 마우스키로 조작하는 카메라의 회전 속력
// flyControls.autoForward = false; // 자동으로 카메라가 앞으로 나아가는 기능 활성화 여부

// // FirstPersonControls 1인칭 시점
// camera.position.set(0, 1, 5);
// const firstPersonControls = new FirstPersonControls(
//   camera,
//   renderer.domElement
// );
// firstPersonControls.lookSpeed = 0.1; // 시선 변경 속력
// firstPersonControls.movementSpeed = 1; // 이동 속력
// firstPersonControls.lookVertical = true; // 카메라의 수직 시선 이동 활성화 여부

// // PointerLockControls FPS게임 시점
// const pointerLockControls = new PointerLockControls(
//   camera,
//   renderer.domElement
// );
// window.addEventListener("click", () => {
//   pointerLockControls.lock();
// });

// TrackballControls
const trackballControls = new TrackballControls(camera, renderer.domElement);
trackballControls.rotateSpeed = 2; // 회전 속력
trackballControls.zoomSpeed = 1.5; // 줌 속력
trackballControls.panSpeed = 0.5; // 화면 마우스 드래그 속력
trackballControls.noRotate = false; // 회전 활성화 여부
trackballControls.noZoom = false; // 줌 활성화 여부
trackballControls.noPan = false; // 화면 마우스 드래그 활성화 여부
trackballControls.staticMoving = false; // 정적인 움직임(damping이 없는 움직임) 활성화 여부
trackballControls.dynamicDampingFactor = 0.05; // orbitControls의 dampingFactor와 유사
const target = new THREE.Mesh(
  new THREE.SphereGeometry(0.5),
  new THREE.MeshStandardMaterial({ color: 0x0000ff })
);
target.position.set(4, 0.5, 0);
scene.add(target);
trackballControls.target = target.position; // trackballControls의 시점의 중심점을 설정
const clock = new THREE.Clock();
const render = () => {
  // orbitControls.update(); // OrbitControls의 enableDamping 효과, autoRotate를 적용하려면 애니메이션 루프 안에서 update 메소드를 실행해야함
  // flyControls.update(clock.getDelta()); // FlyControls의 효과를 적용하려면 애니메이션 루프 안에서 update 메소드를 실행해야함
  // firstPersonControls.update(clock.getDelta()); // firstPersonControls의 효과를 적용하려면 애니메이션 루프 안에서 update 메소드를 실행해야함
  trackballControls.update();
  renderer.render(scene, camera);
  // 애니메이션 프레임 루프에서 재귀적으로 계속 렌더함수를 호출하여 애니메이션 처리
  requestAnimationFrame(render);
};
// renderer로 scene과 camera를 받아 render(캔버스에 송출)
render();
