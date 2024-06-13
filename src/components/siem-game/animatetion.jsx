import React, { useState } from "react";
import SoundButton from "./SoundButton";

function Animatetion() {
  const [animateCard, setAnimateCard] = useState(false);

  const handleAnimate = (delay) => {
    setAnimateCard(true);

    setTimeout(() => {
      setAnimateCard(false);
    }, delay);
  };

  return (
    <div className=" h-screen flex justify-center items-center bg-[#ece9e0] ">
      <div>
        {/* <div
          onClick={() => handleAnimate(1000)}
          className={` ${
            animateCard ? "flip-scale-2-hor-top  " : ""
          } w-[100px] h-[100px] bg-red-500 hover:rotate `}
        >
          container
          <p className={`transform rotate-180`}>A</p>
        </div> */}

        <img
          onClick={() => handleAnimate(1000)}
          className={` ${animateCard ? "flip-scale-2-hor-top " : ""} w-52 `}
          src="./images/medal3d.png"
          alt=""
        />

        <SoundButton
          label="Play Sound"
          soundSrc="./sounds/correct-answer-sound.mp3"
          onSoundEnd={() => handleAnimate(1000)}
          buttonStyles={{
            paddingInline: "20px",
            paddingBlock: "4px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>
    </div>
  );
}

export default Animatetion;
