import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [noPos, setNoPos] = useState({ top: "250px", left: "250px" });
  const boxRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const handleNoHover = () => {
    const box = boxRef.current;
    const btn = noBtnRef.current;
    if (!box || !btn) return;

    const boxRect = box.getBoundingClientRect();
    const maxTop = boxRect.height - btn.offsetHeight - 20;
    const maxLeft = boxRect.width - btn.offsetWidth - 20;

    const newTop = Math.max(10, Math.random() * maxTop);
    const newLeft = Math.max(10, Math.random() * maxLeft);

    setNoPos({ top: `${newTop}px`, left: `${newLeft}px` });
  };

  return (
    <div className="container">

      {showIntro && (
        <div className="popup-overlay">
          <div className="popup intro-popup">
            <h2>Hi Beautiful,</h2>
            <p>Get ready for the biggest challenge of your life, choosing your valentine.</p>
            <p>You'll be asked a question and aapne No press krna hai, if you are successfull in doing that toh whatever you'll say, i'll do it (that toh i'll do regardless bhi) Hihihi</p>
            <p>Pretty difficult decision, lets make it happen !!</p>
            <button className="close-btn" onClick={() => setShowIntro(false)}>
              OK! I'm Ready 🚀
            </button>
          </div>
        </div>
      )}

      {/* Background Hearts */}
      {[...Array(15)].map((_, i) => (
        <div 
          key={i} 
          className="heart" 
          style={{ 
            left: `${Math.random() * 100}%`, 
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${Math.random() * 20 + 10}px` 
          }}
        >
          ❤️
        </div>
      ))}

      <div className="box" ref={boxRef}>
        <h1 className="valentine-text">Will you be my Valentine? ❤️</h1>

        <button className="yes-btn" onClick={() => setShowPopup(true)}>
          Yes 💖
        </button>

        <button
          className="no-btn"
          ref={noBtnRef}
          style={{ 
            top: noPos.top, 
            left: noPos.left, 
            position: "absolute",
            transition: "all 0.2s ease-out"
          }}
          onMouseEnter={handleNoHover}
        >
          No 😢
        </button>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h2>🎉 YAY! 🎉</h2>
              <p>You are Noman's Valentine! ❤️</p>
              <p>Love you so much sweetheart!!</p>
              <button className="close-btn" onClick={() => setShowPopup(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;