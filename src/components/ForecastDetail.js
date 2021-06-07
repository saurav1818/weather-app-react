import styles from "./ForecastDetail.module.css";
const ForecastDetail = (props) => {
  return (
    <div className={styles.main_container}>
      <h1 className={styles.day}>{props.day}</h1>
      <p
        className={styles.time}
      >{`${props.month} ${props.date}, ${props.time}pm`}</p>
      <img src={props.image} alt="weather icon" />
      <h1 className={styles.temp}>{`${props.temp}°C`}</h1>
      <h4 className={styles.description}>{props.description}</h4>
    </div>
  );
};

export default ForecastDetail;
