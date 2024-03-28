import React from 'react';
import styles from './Popup.module.css';

function Popup({ exerciseEntries, dietEntries, onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h3>Journal Entries for Selected Date</h3>
          <button className={styles.closeBtn} onClick={onClose}>Close</button>
        </div>
        <div className={styles.content}>
          <div className={styles.section}>
            <h4>Exercise Journal Entries</h4>
            {exerciseEntries.length > 0 ? (
              <ul>
                {exerciseEntries.map((entry, index) => (
                  <li key={index}>
                    <p><strong>Exercise:</strong> {entry.exercise}</p>
                    <p><strong>Weight:</strong> {entry.weight}</p>
                    <p><strong>Sets:</strong> {entry.sets}</p>
                    <p><strong>Reps:</strong> {entry.reps}</p>
                    <p><strong>AM/PM:</strong> {entry.ampm}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No exercise journal entries for selected date.</p>
            )}
          </div>
          <div className={styles.section}>
            <h4>Diet Journal Entries</h4>
            {dietEntries.length > 0 ? (
              <ul>
                {dietEntries.map((entry, index) => (
                  <li key={index}>
                    <p><strong>Meal:</strong> {entry.meal}</p>
                    <p><strong>Food:</strong> {entry.food}</p>
                    <p><strong>Calories:</strong> {entry.calories}</p>
                    <p><strong>Time:</strong> {entry.time}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No diet journal entries for selected date.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;