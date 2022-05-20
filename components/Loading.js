import React from "react";
import styles from "@/styles/spinner.module.css";

export default function Loading() {
  return (
    <>
      <div className={styles.spinnerContainer}>
        <p>Loading... {"  "}</p>

        <div className={styles.loadingSpinner}></div>
      </div>
    </>
  );
}
