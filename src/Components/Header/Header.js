import React from "react";
import styles from './Header.module.css'

function Header() {
  // Get today's date in the format YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  return (
    <header>
      <div className={styles.titleContainer } >
        <h1 className={styles.title}>Diet Pal</h1>
        <h2 className={styles.subTitle}>Diet and Exercise Journal</h2>
      </div>
      <div className={styles.dateContainer}>
        <label className={styles.dateLabel} htmlFor="dateInput">Date:</label>
        <input
          className={styles.dateInput}
          type="date"
          id="dateInput"
          name="date"
          defaultValue={today} // Set the default value to today's date
        />
      </div>
    </header>
  );
}

export default Header;