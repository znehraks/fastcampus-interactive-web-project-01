/* eslint-disable react/prop-types */
import { Html, useProgress } from "@react-three/drei";
import { useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { IsEnteredAtom } from "../stores";
// eslint-disable-next-line no-unused-vars
import React from "react";

export const Loader = ({ isCompleted }) => {
  const [isEntered, setIsEntered] = useRecoilState(IsEnteredAtom);
  const progress = useProgress();
  console.log("progress", progress);
  if (isEntered) return null;
  return (
    <Html center>
      <BlurredBackground />
      <Container>
        <ProgressBar>{isCompleted ? 100 : progress.progress}%</ProgressBar>
        {progress.progress === 100 && (
          <EnterBtn
            onClick={() => {
              setIsEntered(true);
            }}
          >
            Enter
          </EnterBtn>
        )}
      </Container>
    </Html>
  );
};
const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const BlurredBackground = styled.div`
  width: 400px;
  height: 400px;
  background-color: red;
  border-radius: 50%;
  filter: blur(300px);
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;
const ProgressBar = styled.div`
  font-size: 24px;
  color: #ccc;
`;

const EnterBtn = styled.button`
  animation: ${blink} 1.5s infinite;
  transition-duration: 0.4s;
  font-size: 16px;
  outline: none;
  border: 0.5px solid #999;
  padding: 8px 18px;
  background-color: transparent;
  color: #ccc;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
    color: #dc4f00;
  }
`;
