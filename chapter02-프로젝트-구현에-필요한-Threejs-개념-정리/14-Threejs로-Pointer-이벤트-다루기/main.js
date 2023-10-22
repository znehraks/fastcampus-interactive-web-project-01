// Threejs로 Pointer 이벤트 다루기

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
floor.name = "floor";
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
// gltfLoader를 이용해서 glb파일 모델링을 로드함
const gltf = await gltfLoader.loadAsync("/dancer.glb");
const character = gltf.scene; // 모델링의 골격과 옷
const animationClips = gltf.animations; // 모델링의 애니메이션[]

character.position.y = 0.8; // 높이 조정
character.position.x = 1;
character.position.z = 1;
character.scale.set(0.01, 0.01, 0.01); // 크기 조정

// character는 여러개의 부품 메시로 이루어져 있으므로, 각각의 메시에 대하여 그림자 설정을 모두 해주어야 정상적으로 그림자 효과를 낼 수 있다.
character.traverse((mesh) => {
  if (mesh.isMesh) {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  }
});

// 애니메이션 클립을 관리하는 믹서
const mixer = new THREE.AnimationMixer(character);
console.log("animationClips", animationClips);

// 믹서에 animation 클립을 지정하고 재생
const action = mixer.clipAction(animationClips[3]);

// action.setLoop(THREE.LoopOnce); // 한번만 재생
// action.setLoop(THREE.LoopRepeat);
action.setLoop(THREE.LoopPingPong); // 처음 -> 끝 -> 처음 ... 무한 재생
// action.setDuration(10); // 애니메이션 재생에 걸리는 속력 조정
// action.setEffectiveTimeScale(2); // 액션의 재생 속력 비율(2일 경우, 2배가 빠름)
// action.setEffectiveWeight(0.5); // 액션이 분명한 정도(수치가 낮을수록 모델이 춤을 대충 추는 느낌)
action.play();

// 5초 후 애니메이션 일시정지
// setTimeout(() => {
//   mixer.clipAction(animationClips[3]).paused = true;
// }, 5000);

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

const newPosition = new THREE.Vector3(0, 1, 0); // 클릭된 3D 상의 좌표를 저장할 벡터
const rayCaster = new THREE.Raycaster();

renderer.domElement.addEventListener("pointerdown", (e) => {
  // client좌표를 threejs 평면상의 좌표로 환산
  const x = (e.clientX / window.innerWidth) * 2 - 1; // 화면 상 가장 왼쪽이 -1, 중심이 0, 오른쪽이 1이 되도록 환산
  const y = -((e.clientY / window.innerHeight) * 2 - 1); // 화면 상 가장 위쪽이 1, 중심이 0, 아래쪽이 -1이 되도록 환산

  rayCaster.setFromCamera(new THREE.Vector2(x, y), camera); // rayCaster에 환산된 좌표와 카메라를 넘겨줌
  const intersects = rayCaster.intersectObjects(scene.children); // scene의 children 오브젝트들 중 현재 rayCaster가 관통한 오브젝트들을 받음
  console.log(intersects);
  const intersectFloor = intersects.find((i) => i.object.name === "floor"); // 관통한 오브젝트들 중 이름이 'floor'인 객체를 찾음
  newPosition.copy(intersectFloor.point); // 캐릭터가 이동할 위치벡터인 newPosition에 현재 클릭된 위치 좌표로 설정함
  newPosition.y = 1;
});

const clock = new THREE.Clock();
const targetVector = new THREE.Vector3();
const render = () => {
  orbitControls.update(); // OrbitControls의 enableDamping 효과를 적용하려면 애니메이션 루프 안에서 update 메소드를 실행해야함

  character.lookAt(newPosition); // 우선 캐릭터가 클릭된 위치를 바라보도록 설정
  targetVector
    .subVectors(newPosition, character.position)
    .normalize()
    .multiplyScalar(0.01); // 캐릭터가 목적지로 이동하기 위한 가이드 벡터( 목적지 - 캐릭터의 현재 위치 로 구한 벡터를 정규화(크기를 1로 만들기) 한 후, 0.01배의 크기로 줄임)

  // 캐릭터가 목표한 위치로 도달하도록 계속해서 위치를 업데이트함
  if (
    Math.abs(character.position.x - newPosition.x) >= 1 ||
    Math.abs(character.position.z - newPosition.z) >= 1
  ) {
    character.position.x += targetVector.x;
    character.position.z += targetVector.z;
    action.stop();
  }
  action.play();

  // 믹서 업데이트
  if (mixer) {
    mixer.update(clock.getDelta());
  }
  renderer.render(scene, camera);
  // 애니메이션 프레임 루프에서 재귀적으로 계속 렌더함수를 호출하여 애니메이션 처리
  requestAnimationFrame(render);
};
// renderer로 scene과 camera를 받아 render(캔버스에 송출)
render();
