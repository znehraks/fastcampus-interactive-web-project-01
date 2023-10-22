// Threejs의 기본 구성 요소(Geometry)실습
// https://threejs.org/docs/#api/en/geometries/BoxGeometry

import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// renderer(송출 기계)
const renderer = new THREE.WebGLRenderer({ antialias: true });

// renderer가 그림자를 나타낼 수 있도록 함
renderer.shadowMap.enabled = true;

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
floor.name = "floor";
scene.add(floor);

// geometry(mesh의 뼈대)
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

// material(mesh의 껍데기) -> MeshStandardMaterial은 빛과 그림자의 영향을 받음
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

// mesh(촬영물에 담길 오브젝트)
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.castShadow = true;
boxMesh.receiveShadow = true;
boxMesh.position.y = 0.5;
// scene에 mesh를 추가
scene.add(boxMesh);

// 캡슐 메시 만들기
const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 20, 30);
const capsuleMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const capsuleMesh = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
capsuleMesh.position.set(3, 1.75, 0);
capsuleMesh.castShadow = true;
capsuleMesh.receiveShadow = true;
scene.add(capsuleMesh);

// 원기둥 메시 만들기
const cylinderGeometry = new THREE.CylinderGeometry(
  1,
  1,
  2,
  // 16,
  // 32,
  64
);
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinderMesh.position.set(-3, 1, 0);
cylinderMesh.castShadow = true;
cylinderMesh.receiveShadow = true;
scene.add(cylinderMesh);

const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
torusMesh.position.set(0, 0.5, 1);
torusMesh.castShadow = true;
torusMesh.receiveShadow = true;
scene.add(torusMesh);

// 별모양 만들기
const starShape = new THREE.Shape();
starShape.moveTo(0, 1);
starShape.lineTo(0.2, 0.2);
starShape.lineTo(1, 0.2);
starShape.lineTo(0.4, -0.1);
starShape.lineTo(0.6, -1);
starShape.lineTo(0, -0.5);
starShape.lineTo(-0.6, -1);
starShape.lineTo(-0.4, -0.1);
starShape.lineTo(-1, 0.2);
starShape.lineTo(-0.2, 0.2);

const shapeGeometry = new THREE.ShapeGeometry(starShape);
const shapeMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff });
const shapeMesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
shapeMesh.position.set(0, 1, 2);
scene.add(shapeMesh);

// 위에서 만든 별모양 shape를 3D 오브젝트로 만들기 위한 세팅
const extrudeSettings = {
  steps: 1, // 모양 확장에 있어서 값이 클수록 부드러운 형태가됨
  depth: 0.1, // shape를 입체로 만들때의 두께
  bevelEnabled: true, // 모서리를 둥글게 만들지 여부
  bevelThickness: 0.1, // bevelEnabled: true일 경우, 모서리 바벨링의 두께
  bevelSize: 0.3, // bevelEnabled: true일 경우, 모서리의 크기
  bevelSegments: 100, // bevelEnabled: true일 경우, 바벨링된 모서리를 얼마나 매끄럽게 나눌지 설정하는 값
};

const extrudeGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
const extrudeMaterial = new THREE.MeshStandardMaterial({ color: 0x0ddaaf });
const extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
extrudeMesh.position.set(2, 1.3, 2);
extrudeMesh.castShadow = true;
extrudeMesh.receiveShadow = true;
scene.add(extrudeMesh);

const numPoints = 1000; // 포인트의 수
const positions = new Float32Array(numPoints * 3); // 각 포인트의 3D 위치 (x, y, z)

for (let i = 0; i < numPoints; i++) {
  const x = (Math.random() - 0.5) * 1; // X 좌표를 무작위로 생성
  const y = (Math.random() - 0.5) * 1; // Y 좌표를 무작위로 생성
  const z = (Math.random() - 0.5) * 1; // Z 좌표를 무작위로 생성

  positions[i * 3] = x;
  positions[i * 3 + 1] = y;
  positions[i * 3 + 2] = z;
}

const bufferGeometry = new THREE.BufferGeometry();
bufferGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
const pointsMaterial = new THREE.PointsMaterial({
  color: 0xffff00,
  size: 0.05,
});

const point = new THREE.Points(bufferGeometry, pointsMaterial);
point.position.set(0, 0, -5);
scene.add(point);

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphere = new THREE.Points(sphereGeometry, pointsMaterial);
sphere.position.z = -3;
sphere.position.y = 1;
scene.add(sphere);

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

// 직사광선 만들기
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true;
directionalLight.position.set(3, 4, 5);
directionalLight.lookAt(0, 0, 0);
scene.add(directionalLight);

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
