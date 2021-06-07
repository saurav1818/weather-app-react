import { useState } from "react";
import styles from "./App.module.css";
import ForecastDetails from "./components/ForecastDetails";
import InputForm from "./components/InputForm";

function App() {
  const [city, setCity] = useState("");

  const getCityName = (city) => {
    setCity(city);
  };

  return (
    <div className={styles.App}>
      <header>
        <InputForm onGetCityName={getCityName} />
      </header>
      <main>
        {city.length === 0 ? (
          <h1 className={styles.city}>Enter city please.</h1>
        ) : (
          <>
            <h1 className={styles.city}>{city}</h1>
            <ForecastDetails cityName={city} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
