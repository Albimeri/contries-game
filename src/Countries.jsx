import { useState, useEffect } from "react";

const Contries = ({ data }) => {
  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
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
  const [contries, setContries] = useState(
    shuffle(Object.entries(data).flat())
  );

  useEffect(() => {
    if (contries.length === 0) {
      setIsFinished(true);
    }
  }, [contries]);

  const handleClick = (item) => {
    if (selectedItem === item) {
      return;
    }
    if (selectedItem) {
      let isWrong = true;
      Object.entries(data).forEach((pair) => {
        const [key, value] = pair;
        pair = pair.filter((x) => x !== selectedItem && x !== item);
        if (pair.length === 0) {
          isWrong = false;
          setContries((prevState) =>
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

  return (
    <>
      {contries.map((item) => (
        <button
          type="button"
          style={{ backgroundColor: selectedItem === item ? "lightgrey" : "" }}
          key={item}
          onClick={() => handleClick(item)}
        >
          {item}
        </button>
      ))}
      {errorCount.length > 0 && (
        <p style={{ margin: "10px" }}>
          <span className="error">Error count: {errorCount}</span>
        </p>
      )}
      {isFinished && <div>Congratiulations</div>}
    </>
  );
};

export default Contries;
