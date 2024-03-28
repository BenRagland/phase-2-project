import React from 'react';
import styles from './Popup.module.css';

function Popup({ exerciseEntries, dietEntries, onClose }) {
  // Function to calculate total calories from diet entries
  const calculateTotalCalories = () => {
    return dietEntries.reduce((total, entry) => total + parseInt(entry.calories), 0);
  };

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
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Exercise</th>
                    <th>Weight</th>
                    <th>Sets</th>
                    <th>Reps</th>
                    <th>AM/PM</th>
                  </tr>
                </thead>
                <tbody>
                  {exerciseEntries.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.exercise}</td>
                      <td>{entry.weight}</td>
                      <td>{entry.sets}</td>
                      <td>{entry.reps}</td>
                      <td>{entry.ampm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No exercise journal entries for selected date.</p>
            )}
          </div>
          <div className={styles.section}>
            <h4>Diet Journal Entries</h4>
            {dietEntries.length > 0 ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Meal</th>
                    <th>Food</th>
                    <th>Calories</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {dietEntries.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.meal}</td>
                      <td>{entry.food}</td>
                      <td>{entry.calories}</td>
                      <td>{entry.time}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="2"><strong>Total Calories</strong></td>
                    <td colSpan="2">{calculateTotalCalories()}</td>
                  </tr>
                </tbody>
              </table>
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