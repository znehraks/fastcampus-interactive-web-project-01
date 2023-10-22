// Threejs의 기본 구성 요소(Light, Shadow, Controls)실습
// https://threejs.org/docs/#api/en/geometries/torusKnotGeometry

// TODO Material Side 다루기
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
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);

const frontSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const frontSideMaterial = new THREE.MeshStandardMaterial({
  // wireframe: true,
  color: 0x00ffff,
  side: THREE.FrontSide,
  // wireframe: true,
});
const frontSideMesh = new THREE.Mesh(frontSideGeometry, frontSideMaterial);
frontSideMesh.position.set(0, 0.5, 4);
frontSideMesh.receiveShadow = true;
frontSideMesh.castShadow = true;
scene.add(frontSideMesh);

const backSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const backSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  side: THREE.BackSide,
});
const backSideMesh = new THREE.Mesh(backSideGeometry, backSideMaterial);
backSideMesh.position.set(2, 0.51, 4);
backSideMesh.receiveShadow = true;
// backSideMesh.castShadow = true;
scene.add(backSideMesh);

const doubleSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const doubleSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide,
  shadowSide: THREE.BackSide, // 그림자를 만들 머터리얼 지정
});
const doubleSideMesh = new THREE.Mesh(doubleSideGeometry, doubleSideMaterial);
doubleSideMesh.position.set(4, 0.5, 4);
doubleSideMesh.receiveShadow = true;
doubleSideMesh.castShadow = true; // 그림자가 이상하게 동작할 수 있음.
scene.add(doubleSideMesh);

// Geometry
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 20);

// ===========================================================================
// MeshStandardMaterial
const torusKnotStandardMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
});
torusKnotStandardMaterial.roughness = 0.5; // 표면의 거친 정도(매끈하지 않은 정도)
torusKnotStandardMaterial.metalness = 1; // 표면의 금속성 정도
const torusKnotStandardMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotStandardMaterial
);
torusKnotStandardMesh.castShadow = true;
torusKnotStandardMesh.receiveShadow = true;
torusKnotStandardMesh.position.set(-4, 1, 0);
scene.add(torusKnotStandardMesh);

// ===========================================================================
// MeshLambertMaterial
const torusKnotLambertMaterial = new THREE.MeshLambertMaterial({
  color: 0xff0000,
});
torusKnotLambertMaterial.emissive = new THREE.Color(0x00ff00); // 빛의 영향을 받지 않는 자체 발광 색
torusKnotLambertMaterial.emissiveIntensity = 0.2; // 자체발광 세기
const torusKnotLambertMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotLambertMaterial
);
torusKnotLambertMesh.castShadow = true;
torusKnotLambertMesh.receiveShadow = true;
torusKnotLambertMesh.position.set(-2, 1, 0);
scene.add(torusKnotLambertMesh);

// ===========================================================================
// MeshPhongMaterial
const torusKnotPhongMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
torusKnotPhongMaterial.emissive = new THREE.Color(0x00ff00); // 자체발광(빛이 닫지 않는 부분의 색상)
torusKnotPhongMaterial.emissiveIntensity = 0.2; // 자체발광 세기
torusKnotPhongMaterial.specular = new THREE.Color(0x0000ff); // 빛이 직접 닿아 반사되는 부분의 색상
torusKnotPhongMaterial.shininess = 100; // specular의 강도
const torusKnotPhongMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotPhongMaterial
);
torusKnotPhongMesh.castShadow = true;
torusKnotPhongMesh.receiveShadow = true;
torusKnotPhongMesh.position.set(0, 1, 0);
scene.add(torusKnotPhongMesh);

// ===========================================================================
// MeshBasicMaterial
const torusKnotBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const torusKnotBasicMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotBasicMaterial
);
torusKnotBasicMesh.castShadow = true;
torusKnotBasicMesh.receiveShadow = true;
torusKnotBasicMesh.position.set(2, 1, 0);
scene.add(torusKnotBasicMesh);

// ===========================================================================
// MeshDepthMaterial
const torusKnotDepthMaterial = new THREE.MeshDepthMaterial({ color: 0xffffff }); // 카메라와의 거리에 따라 색이 달라짐
torusKnotDepthMaterial.opacity = 0.5; // 투명도
const torusKnotDepthMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotDepthMaterial
);
torusKnotDepthMesh.castShadow = true;
torusKnotDepthMesh.receiveShadow = true;
torusKnotDepthMesh.position.set(4, 1, 0);
scene.add(torusKnotDepthMesh);

// ===========================================================================
// 이미지파일을 texture로 불러오도록 하는 textureLoader
const textureLoader = new THREE.TextureLoader();
// load 함수와 콜백 이용
// textureLoader.load("/threejs.webp", (texture) => {
//   console.log(texture);
//   const texturetorusKnotGeometry = new THREE.torusKnotGeometry(1, 1, 1);
//   const textureMaterial = new THREE.MeshStandardMaterial({ map: texture });
//   const textureMesh = new THREE.Mesh(texturetorusKnotGeometry, textureMaterial);
//   textureMesh.castShadow = true;
//   textureMesh.receiveShadow = true;
//   textureMesh.position.z = 2;
//   scene.add(textureMesh);
// });

// loadAsync 함수 이용
const texture = await textureLoader.loadAsync("/threejs.webp");
const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const textureMaterial = new THREE.MeshStandardMaterial({ map: texture });
const textureMesh = new THREE.Mesh(textureBoxGeometry, textureMaterial);
textureMesh.castShadow = true;
textureMesh.receiveShadow = true;
textureMesh.position.set(0, 0.5, 2);
scene.add(textureMesh);

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

  torusKnotStandardMesh.rotation.y += 0.01;
  torusKnotLambertMesh.rotation.y += 0.01;
  torusKnotPhongMesh.rotation.y += 0.01;
  torusKnotDepthMesh.rotation.y += 0.01;
  torusKnotBasicMesh.rotation.y += 0.01;
  textureMesh.rotation.y += 0.01;
  // 애니메이션 프레임 루프에서 재귀적으로 계속 렌더함수를 호출하여 애니메이션 처리
  requestAnimationFrame(render);
};
// renderer로 scene과 camera를 받아 render(캔버스에 송출)
render();
