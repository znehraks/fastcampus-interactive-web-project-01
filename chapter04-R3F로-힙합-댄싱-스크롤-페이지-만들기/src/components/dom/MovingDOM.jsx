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
  const article01Ref = useRef < HTMLDivElement > null;
  const article02Ref = useRef < HTMLDivElement > null;
  const article03Ref = useRef < HTMLDivElement > null;
  const article04Ref = useRef < HTMLDivElement > null;
  const article05Ref = useRef < HTMLDivElement > null;
  const article06Ref = useRef < HTMLDivElement > null;
  const article07Ref = useRef < HTMLDivElement > null;
  const article08Ref = useRef < HTMLDivElement > null;

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
