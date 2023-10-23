import styled from "styled-components";
import { MainCanvas } from "./components/MainCanvas";
function App() {
  return (
    <Wrapper>
      <MainCanvas />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
export default App;
