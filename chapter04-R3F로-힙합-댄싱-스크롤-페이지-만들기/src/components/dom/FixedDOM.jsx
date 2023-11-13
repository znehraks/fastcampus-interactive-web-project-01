import styled from "styled-components";

export const FixedDOM = () => {
  return (
    <FixedDOMWrapper id="fixed">
      <span>
        Interesting Threejs Interesting Threejs Interesting Threejs Interesting
        Threejs Interesting Threejs Interesting Threejs Interesting Threejs
        Interesting Threejs Interesting Threejs Interesting Threejs Interesting
        Threejs Interesting Threejs Interesting Threejs Interesting Threejs
        Interesting Threejs Interesting Threejs Interesting Threejs Interesting
        Threejs Interesting Threejs Interesting Threejs Interesting Threejs
        Interesting Threejs Interesting Threejs Interesting ThreejsInteresting
        Threejs Interesting Threejs Interesting ThreejsInteresting Threejs
        Interesting Threejs Interesting ThreejsInteresting Threejs Interesting
        Threejs Interesting ThreejsInteresting Threejs Interesting Threejs
        Interesting ThreejsInteresting Threejs Interesting Threejs Interesting
        ThreejsInteresting Threejs Interesting Threejs Interesting
        ThreejsInteresting Threejs Interesting Threejs Interesting
        ThreejsInteresting Threejs Interesting Threejs Interesting
        ThreejsInteresting Threejs Interesting Threejs Interesting
        ThreejsInteresting Threejs Interesting Threejs Interesting
        ThreejsInteresting Threejs Interesting Threejs Interesting Threejs
        Interesting Threejs Interesting Threejs Interesting Threejs
      </span>
      <img src="/threejs.png" alt="threejs-logo"></img>{" "}
      <span>
        Interesting Threejs Interesting Threejs Interesting Threejs Interesting
        Threejs Interesting Threejs Interesting Threejs Interesting Threejs
        Interesting Threejs Interesting Threejs Interesting Threejs Interesting
        Threejs Interesting Threejs Interesting Threejs Interesting Threejs
        Interesting Threejs Interesting Threejs Interesting Threejs Interesting
        Threejs Interesting Threejs Interesting Threejs Interesting Threejs
        Interesting Threejs Interesting Threejs Interesting Threejs Interesting
        Threejs Interesting Threejs Interesting Threejs Threejs Interesting
        Threejs Interesting Threejs Interesting Threejs Interesting Threejs
        Interesting Threejs Interesting Threejs Interesting Threejs Interesting
        Threejs Interesting Threejs Threejs Interesting Threejs Interesting
        Threejs Threejs Interesting Threejs Interesting Threejs Interesting
        Threejs Interesting Threejs Interesting Threejs Interesting Threejs
        Interesting Threejs Interesting Threejs Interesting Threejs Threejs
        Interesting Threejs Interesting Threejs Threejs Interesting Threejs
        Interesting Threejs Interesting Threejs Interesting Threejs Interesting
        Threejs Interesting Threejs Interesting Threejs Interesting Threejs
        Interesting Threejs
      </span>
    </FixedDOMWrapper>
  );
};

const FixedDOMWrapper = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 400px;
  position: fixed;
  font-size: 8px;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
  display: none;
  color: #fff;
  z-index: 0;
  pointer-events: none;
  img {
    width: 100%;
  }
`;
