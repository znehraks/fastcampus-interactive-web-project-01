import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IsEnteredAtom } from "../../stores";

export const MovingDOM = () => {
  const isEntered = useRecoilValue(IsEnteredAtom);
  const fixed = document.getElementById("fixed");
  const scroll = useScroll();
  const article01Ref = useRef(null);
  const article02Ref = useRef(null);
  const article03Ref = useRef(null);
  const article04Ref = useRef(null);
  const article08Ref = useRef(null);

  useFrame(() => {
    if (
      !isEntered ||
      !fixed ||
      !article01Ref.current ||
      !article02Ref.current ||
      !article03Ref.current ||
      !article04Ref.current ||
      !article08Ref.current
    )
      return;

    article01Ref.current.style.opacity = `${1 - scroll.range(0, 1 / 8)}`;
    article02Ref.current.style.opacity = `${1 - scroll.range(1 / 8, 1 / 8)}`;
    article03Ref.current.style.opacity = `${scroll.curve(2 / 8, 1 / 8)}`;
    article04Ref.current.style.opacity = `${scroll.curve(3 / 8, 1 / 8)}`;
    if (scroll.visible(4 / 8, 3 / 8)) {
      fixed.style.display = "flex";
      fixed.style.opacity = `${scroll.curve(4 / 8, 3 / 8)}`;
    } else {
      fixed.style.display = "none";
    }
    article08Ref.current.style.opacity = `${scroll.range(7 / 8, 1 / 8)}`;
  });
  if (!isEntered) return null;
  return (
    <Scroll html>
      <ArticleWrapper ref={article01Ref}>
        <LeftBox>
          <span>FastCampus InteracTive Web Lecture</span>
          <span>FastCampus iNteracTive Web Lecture</span>
          <span>FastCampus inTeracTive Web Lecture</span>
          <span>FastCampus iNtEracTive Web Lecture</span>
          <span>FastCampus iNteRacTive Web Lecture</span>
        </LeftBox>
      </ArticleWrapper>
      <ArticleWrapper ref={article02Ref}>
        <RightBox>
          <span>FastCampus InteracTive Web Lecture</span>
          <span>FastCampus iNteracTive Web Lecture</span>
          <span>FastCampus inTeracTive Web Lecture</span>
          <span>FastCampus iNtEracTive Web Lecture</span>
          <span>FastCampus iNteRacTive Web Lecture</span>
        </RightBox>
      </ArticleWrapper>
      <ArticleWrapper ref={article03Ref}>
        Threejs R3F Drei Cannon
      </ArticleWrapper>
      <ArticleWrapper className="height-4" ref={article04Ref}>
        <RightBox className="fixed">
          <span>FastCampus InteracTive Web Lecture</span>
          <span>FastCampus iNteracTive Web Lecture</span>
          <span>FastCampus inTeracTive Web Lecture</span>
          <span>FastCampus iNtEracTive Web Lecture</span>
          <span>FastCampus iNteRacTive Web Lecture</span>
          4번
        </RightBox>
      </ArticleWrapper>
      <ArticleWrapper ref={article08Ref}>
        {`You've mastered the basics of R3F.`}
        <Footer>
          {`You've mastered the basics of R3F.You've mastered the basics of`}
          {`R3F.You've mastered the basics of R3F.You've mastered the basics of`}
          {`R3F.You've mastered the basics of R3F.You've mastered the basics of`}
          {`R3F.`}
        </Footer>
      </ArticleWrapper>
    </Scroll>
  );
};

const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  width: 100vw;
  height: 100vh;
  &.height-4 {
    height: 400vh;
  }

  background-color: transparent;
  color: #ffffff;
  font-size: 24px;
  padding: 40px;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  min-width: fit-content;
  height: 400px;
  & > span:nth-of-type(1) {
    font-size: 32px;
  }
  & > span:nth-of-type(2) {
    font-size: 48px;
  }
  & > span:nth-of-type(3) {
    font-size: 16px;
  }
  & > span:nth-of-type(4) {
    font-size: 24px;
  }
  & > span:nth-of-type(5) {
    font-size: 28px;
  }
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  min-width: fit-content;
  height: 400px;
  & > span:nth-of-type(1) {
    font-size: 32px;
    font-weight: 400;
  }
  & > span:nth-of-type(2) {
    font-size: 32px;
    font-weight: 500;
  }
  & > span:nth-of-type(3) {
    font-size: 32px;
    font-weight: 600;
  }
  & > span:nth-of-type(4) {
    font-size: 32px;
    font-weight: 700;
  }
  & > span:nth-of-type(5) {
    font-size: 32px;
    font-weight: 800;
  }
`;

const Footer = styled.div`
  position: absolute;
  bottom: 10px;
  font-size: 8px;
`;
