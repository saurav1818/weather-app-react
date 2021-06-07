import { useRef } from "react";
import styles from "./InputForm.module.css";
import SearchIcon from "@material-ui/icons/Search";
const InputForm = (props) => {
  const inputRef = useRef();

  const clickHandler = () => {
    const cityName = inputRef.current.value;
    inputRef.current.value = "";
    props.onGetCityName(cityName);
  };

  return (
    <div className={styles.main_container}>
      <h1 className={styles.heading}>Check Weather</h1>
      <div className={styles.input_container}>
        <input
          type="text"
          className={styles.input}
          ref={inputRef}
          placeholder="Search..."
        />

        <SearchIcon onClick={clickHandler} style={{ fontSize: 20 }} />
      </div>
    </div>
  );
};

export default InputForm;
