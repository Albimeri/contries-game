import Countries from "./Countries.jsx";
const App = () => {
  const countries = {
    Germany: "Berlin",
    Kosovo: "Prishtina",
    Albania: "Tirana",
    Spain: "Madrid",
    Denmark: "Copenhagen",
    Netherlands: "Amsterdam",
    Sweeden: "Stockholm",
    Austria: "Vienna",
    France: "Paris",
    Italy: "Rome",
    Hungary: "Budapest",
    Irland: "Dublin",
    Bucharest: "Romania",
    Belgium: "Brussels",
    Slovakia: "Bratislava",
    Switzerland: "Bern",
    Greece: "Athens",
    Finland: "Helsinki",
  };
  return (
    <>
      <Countries data={countries} />
    </>
  );
};

export default App;
