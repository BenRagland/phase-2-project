import React, { useState, useEffect } from "react";
import styles from './Header.module.css';
import Popup from '../Popup/Popup';

function Header() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Initialize selectedDate to today's date
  const [exerciseJournalEntries, setExerciseJournalEntries] = useState([]);
  const [dietJournalEntries, setDietJournalEntries] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

 // Function to fetch exercise journal entries
const fetchExerciseJournalEntries = async () => {
  try {
    const response = await fetch(`http://localhost:3000/exerciseJournalEntries`);
    if (!response.ok) {
      throw new Error('Failed to fetch exercise journal entries');
    }
    const data = await response.json();
    // Filter entries based on the selected date
    const filteredEntries = data.filter(entry => {
      if (entry.timestamp && typeof entry.timestamp === 'string') {
        return entry.timestamp.split('T')[0] === selectedDate;
      }
      return false;
    });
    setExerciseJournalEntries(filteredEntries);
  } catch (error) {
    console.error('Error fetching exercise journal entries:', error.message);
  }
};

// Function to fetch diet journal entries
const fetchDietJournalEntries = async () => {
  try {
    const response = await fetch(`http://localhost:3000/dietJournalEntries`);
    if (!response.ok) {
      throw new Error('Failed to fetch diet journal entries');
    }
    const data = await response.json();
    // Filter entries based on the selected date
    const filteredEntries = data.filter(entry => {
      if (entry.timestamp && typeof entry.timestamp === 'string') {
        return entry.timestamp.split('T')[0] === selectedDate;
      }
      return false;
    });
    setDietJournalEntries(filteredEntries);
  } catch (error) {
    console.error('Error fetching diet journal entries:', error.message);
  }
};

  // Function to handle date change
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
  

    setShowPopup(true);
  };

  useEffect(() => {
    fetchExerciseJournalEntries();
    fetchDietJournalEntries();
    console.log("Exercise Entries:", exerciseJournalEntries); // Log exercise entries

  }, [selectedDate]); // Fetch journal entries whenever selectedDate changes
  

  return (
    <header>
      <div className={styles.titleContainer}>
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
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      {/* Popup window */}
      {showPopup && (
        <Popup
          exerciseEntries={exerciseJournalEntries}
          dietEntries={dietJournalEntries}
          onClose={() => setShowPopup(false)}
        />
      )}
    </header>
  );
}

export default Header;