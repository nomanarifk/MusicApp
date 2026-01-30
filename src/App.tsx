import { useState, useRef, useEffect } from "react";
import "./App.css";
import personImg from "./assets/person.jpg";
import songFile from "./assets/tere-hawale-kar-diya.mp3"; // your audio file
import { FaPause, FaHeadphones } from "react-icons/fa";

function App() {
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // start as playing
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play().catch(() => {
      // autoplay might be blocked by browser
      setIsPlaying(false);
    });

    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("timeupdate", updateTime);

    return () => audio.removeEventListener("timeupdate", updateTime);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="container">
      <div className="box">
        {1 && (
          <>
            <div className="circle-container" onClick={() => setOpen(true)}>
              <img
                src={personImg}
                className={`circle-image ${isPlaying ? "spin" : ""}`}
              />
            </div>

            <div className="music-info">
              <div className="music-text">
                <div className="music-left" onClick={togglePlay}>
                  <FaHeadphones className="music-icon" />
                </div>
                <div className="artist">Arijit Singh</div>
                <div className="title">Tere Hawale Kardiya</div>
                <div className="music-time">
                  {formatTime(currentTime)} / 05:20
                </div>
              </div>

            </div>

            <audio ref={audioRef} src={songFile}></audio>
          </>
        )}

        {open && (
          <div className="image-cover" onClick={() => setOpen(false)}>
            <img src={personImg} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;