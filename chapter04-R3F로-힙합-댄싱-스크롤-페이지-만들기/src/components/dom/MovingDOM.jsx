/* eslint-disable react/no-unescaped-entities */
import { Scroll } from "@react-three/drei";
import { useRef } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IsEnteredAtom } from "../../stores";
// eslint-disable-next-line no-unused-vars
import React from "react";

export const MovingDOM = () => {
  const isEntered = useRecoilValue(IsEnteredAtom);
  // ! 이 부분을 고치지 않으면 에러가 납니다.
  const article01Ref = useRef(null);
  const article02Ref = useRef(null);
  const article03Ref = useRef(null);
  const article04Ref = useRef(null);
  const article05Ref = useRef(null);
  const article06Ref = useRef(null);
  const article07Ref = useRef(null);
  const article08Ref = useRef(null);

  if (!isEntered) return null;
  return (
    <Scroll html>
      <ArticleWrapper ref={article01Ref}></ArticleWrapper>
      <ArticleWrapper ref={article02Ref}></ArticleWrapper>
      <ArticleWrapper ref={article03Ref}></ArticleWrapper>
      <ArticleWrapper ref={article04Ref}></ArticleWrapper>
      <ArticleWrapper ref={article05Ref}></ArticleWrapper>
      <ArticleWrapper ref={article06Ref}></ArticleWrapper>
      <ArticleWrapper ref={article07Ref}></ArticleWrapper>
      <ArticleWrapper ref={article08Ref}></ArticleWrapper>
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
  background-color: transparent;
  color: #ffffff;
  font-size: 24px;
  padding: 40px;
`;
