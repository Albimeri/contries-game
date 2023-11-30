import { useState, useEffect, useRef } from "react";

const Contries = ({ data }) => {
  const interval = useRef();
  const [timer, setTimer] = useState(0);
  const [isGameOn, setIsGameOn] = useState(false);

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  const [errorCount, setErrorCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [countries, setCountries] = useState(
    shuffle(Object.entries(data).flat())
  );

  useEffect(() => {
    clearInterval(interval.current);
  }, [isFinished]);

  useEffect(() => {
    if (countries.length === 0) {
      setIsFinished(true);
    }
  }, [countries]);

  const handleClick = (item) => {
    if (selectedItem === item) {
      setSelectedItem(null);
      return;
    }
    if (selectedItem) {
      let isWrong = true;
      Object.entries(data).forEach((pair) => {
        const [key, value] = pair;
        pair = pair.filter((x) => x !== selectedItem && x !== item);
        if (pair.length === 0) {
          isWrong = false;
          setCountries((prevState) =>
            prevState.filter((item) => ![key, value].includes(item))
          );
        }
        setSelectedItem(null);
      });
      setErrorCount((prevState) => (isWrong ? prevState + 1 : prevState));
    } else {
      setSelectedItem(item);
    }
  };

  const startGame = () => {
    setIsGameOn(true);
    interval.current = setInterval(() => {
      setTimer((prevState) => prevState + 1);
    }, 1000);
  };

  return (
    <>
      {!isGameOn && (
        <div>
          <button onClick={startGame}>Start the game</button>
        </div>
      )}
      {isGameOn && (
        <div>
          {!isFinished && <p>Timer: {timer}</p>}
          {countries.map((item) => (
            <button
              type="button"
              style={{
                backgroundColor: selectedItem === item ? "lightgrey" : "",
              }}
              key={item}
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          ))}
          {errorCount > 0 && (
            <p style={{ margin: "10px" }}>
              <span className="error">Error count: {errorCount}</span>
            </p>
          )}
          {isFinished && (
            <div style={{ margin: "10px" }}>
              Congratiulations! It took you {timer} seconds to finish.
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Contries;
