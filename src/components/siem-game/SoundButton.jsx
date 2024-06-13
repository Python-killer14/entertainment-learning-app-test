import React, { useRef, useEffect } from "react";

const SoundButton = ({
  label,
  soundSrc,
  volume = 1.0,
  onSoundEnd,
  buttonStyles,
  labelStyles,
}) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.onended = onSoundEnd;
    }
  }, [volume, onSoundEnd]);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <button onClick={handleClick} style={buttonStyles}>
      <span style={labelStyles}>{label}</span>
      <audio ref={audioRef} src={soundSrc} />
    </button>
  );
};

export default SoundButton;
