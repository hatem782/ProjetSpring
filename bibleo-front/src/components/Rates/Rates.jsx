import React from "react";
import styles from "./Rates.module.css";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const MakeArray = (rates) => {
  let arr = [];
  for (let i = 0; i < rates; i++) {
    arr.push(true);
  }

  for (let i = 0; i < 5 - rates; i++) {
    arr.push(false);
  }

  return arr;
};

function Rates({ number = 5, className = "" }) {
  return (
    <div className={`${styles.rates} ${className}`}>
      {MakeArray(number).map((item, index) => {
        return item ? (
          <StarIcon
            style={{ fontSize: "50px" }}
            className={styles.rate}
            key={index}
          />
        ) : (
          <StarBorderIcon
            style={{ fontSize: "50px" }}
            className={styles.rate}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default Rates;
