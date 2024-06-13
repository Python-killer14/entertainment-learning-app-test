import "./App.css";
import FullScreen from "./components/FullScreenTest";
import Animatetion from "./components/siem-game/animatetion";
import MultiSelect from "./components/multi-select/MultiSelect";
import ParallaxEffect from "./components/parallax-effect/ParallaxEffect";
import LetterDragAndDrop from "./components/siem-game/LetterDragAndDrop";

function App() {
  return (
    <div className="">
      {/* <MultiSelect /> */}
      {/* <FullScreen /> */}
      {/* <ParallaxEffect /> */}
      <LetterDragAndDrop />
      <Animatetion />
    </div>
  );
}

export default App;
