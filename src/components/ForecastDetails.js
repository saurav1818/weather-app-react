import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ForecastDetail from "./ForecastDetail";
import styles from "./ForecastDetails.module.css";

const ForecastDetails = (props) => {
  const [forecastDetails, setForecastDetails] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const { cityName: city } = props;

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString(undefined, { weekday: "long" });
    return day;
  };

  const getTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    return hours;
  };

  const getMonth = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString(undefined, { month: "long" });
    return month;
  };

  const getDay = (dateString) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString(undefined, { day: "numeric" });
    return day;
  };

  const getImage = (icon) => {
    const src = " http://openweathermap.org/img/wn/";
    const imgSrc = `${src}${icon}@2x.png`;
    return imgSrc;
  };

  const getTempDetails = useCallback(async () => {
    try {
      setLoading("Loading...");
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}be&units=metric`;
      const response = await axios.get(url);

      const transformedDetails = response.data.list.map((detail) => ({
        id: detail.dt,
        temp: detail.main.temp,
        description: detail.weather[0].description,
        dayName: getDayName(detail.dt_txt),
        time: getTime(detail.dt_txt),
        month: getMonth(detail.dt_txt),
        date: getDay(detail.dt_txt),
        image: getImage(detail.weather[0].icon),
      }));

      const actualDetails = transformedDetails.filter(
        (detail) => detail.time === 12
      );
      setForecastDetails(actualDetails);
      setLoading("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  }, [city]);

  useEffect(() => {
    if (city.length > 0) {
      getTempDetails();
    }
  }, [city.length, getTempDetails]);

  return (
    <div className={styles.main_container}>
      {loading.length > 0 && error.length === 0 && (
        <h1 className={styles.error}>Loading...</h1>
      )}
      {error.length > 0 && <h1 className={styles.error}>No Data Found.</h1>}
      {error.length === 0 &&
        forecastDetails.map((detail) => (
          <ForecastDetail
            key={detail.id}
            day={detail.dayName}
            date={detail.date}
            month={detail.month}
            time={detail.time}
            temp={detail.temp}
            description={detail.description}
            image={detail.image}
          />
        ))}
    </div>
  );
};

export default React.memo(ForecastDetails);
