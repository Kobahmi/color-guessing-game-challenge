import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

const generateColor = () => {
  const r = Math.floor(Math.random() * 255 + 1);
  const g = Math.floor(Math.random() * 255 + 1);
  const b = Math.floor(Math.random() * 255 + 1);

  const color = `rgb(${r}, ${g}, ${b})`;
  return color;
};

function App() {
  const [colorSolution, setColorSolution] = useState();
  const [choices, setChoices] = useState([]);
  const [isRight, setIsRight] = useState();

  const pickColor = () => {
    const answer = generateColor();
    setColorSolution(answer);
    setChoices(
      [answer, generateColor(), generateColor()].sort(() => 0.5 - Math.random())
    );
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    pickColor();
  }, []);

  const handleClick = (button) => {
    if (button === colorSolution) {
      setIsRight(true);
      pickColor();
    } else {
      setIsRight(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center text-center">
      <Header />
      <div
        data-aos="fade-zoom-in"
        data-aos-easing="ease-in-back"
        data-aos-delay="500"
        data-aos-offset="0"
        className="box rounded-3xl"
        style={{ background: colorSolution }}
      ></div>
      <div className="flex flex-col md:flex-row gap-3">
        {choices.map((choice) => (
          <button
            data-aos="flip-up"
            data-aos-duration="1000"
            data-aos-delay="300"
            className="bg-slate-300 rounded-3xl hover:scale-105 active:bg-slate-400"
            onClick={() => handleClick(choice)}
            key={choice}
          >
            {choice}
          </button>
        ))}
      </div>
      {isRight === true && (
        <div data-aos="flip-up" className="text-4xl">
          Correct!
        </div>
      )}
      {isRight === false && (
        <div data-aos="flip-up" className="text-4xl">
          Wrong!
        </div>
      )}
    </div>
  );
}

export default App;
