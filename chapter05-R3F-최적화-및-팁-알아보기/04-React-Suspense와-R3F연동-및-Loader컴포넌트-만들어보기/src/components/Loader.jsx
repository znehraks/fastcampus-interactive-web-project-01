import { useProgress } from "@react-three/drei";

export const Loader = () => {
  const progress = useProgress();
  console.log(progress);
  return <progress value={progress.progress}></progress>;
};
