/* eslint-disable no-unused-vars */
import {
  Bloom,
  BrightnessContrast,
  DepthOfField,
  DotScreen,
  EffectComposer,
  Glitch,
  Grid,
  HueSaturation,
  Pixelation,
  Sepia,
} from "@react-three/postprocessing";

export const PostProcessor = () => {
  return (
    <EffectComposer disableNormalPass>
      {/* 후광효과 */}
      {/* <Bloom
        intensity={0.5} // 강도
        mipmapBlur // mipMap(3D표면에 텍스쳐를 입히는 기술 정도로 이해하면됨) + Blur(흐리게 만드는 기능)
        luminanceThreshold={1} // 밝기가 이 값보다 높은 픽셀만 이 Bloom 효과를 갖도록 함
        luminanceSmoothing={0.02} // Bloom효과를 부드럽게 갖도록 하는 설정값 (최소 0, 최대 1)
      /> */}

      {/* 색 대조 처리 */}
      {/* <BrightnessContrast
        brightness={-0.2} // 밝기, 0보다 크면 더 밝게, 작으면 더 어둡게 (최소 -1, 최대 1)
        contrast={0.8} // 대조, 0보다 크면 색 대비를 더 크게, 작으면 더 작게 (최소 -1, 최대 1)
      /> */}

      {/*  팝아트 같이, 점 무늬를 추가함 */}
      {/* <DotScreen
        angle={Math.PI / 6} // 점 무늬 판의 회전 각
        scale={1} // 점의 크기
      /> */}

      {/* 지지직 거리는 효과 */}
      {/* <Glitch
        delay={[1.5, 3.5]} // 글리치 기능의 시간 지연의 최솟 최댓 값
        duration={[0.5, 1.0]} // 글리치 기능이 일어나는 시간의 최솟 최댓 값
        strength={[0.01, 1.0]} // 글리치 기능의 강도의 최솟 최댓 값
        ratio={0.5} // 강한 강도의 글리치가 일어나는 비율(0에 가까울 수록 강한 강도의 글리치가 일어날 확률이 커지고, 1에 가까울수록 약한 강도의 글리치기 일어날 확률이 커짐)
      /> */}

      {/* 그리드(격자무늬) 효과 */}
      {/* <Grid
        scale={0.1} // 그리드 네모 하나의 사이즈
        lineWidth={0.1} // 그리드 경계의 선 굵기
      /> */}

      {/* 색 상환에서의 색조와 채도를 조작함 */}
      {/* <HueSaturation
        hue={Math.PI / 2} // 색조
        saturation={0.4} // 채도
      /> */}

      {/* 모자이크처럼 픽셀화 */}
      {/* <Pixelation
        granularity={10} // 픽셀화 강도
      /> */}

      {/* 세피아(빛이 바랜 것 같은) 효과 */}
      {/* <Sepia intensity={0.5} /> */}
    </EffectComposer>
  );
};
