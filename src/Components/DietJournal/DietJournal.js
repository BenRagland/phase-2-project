import React, { useState, useEffect } from 'react';
import styles from "./Dietjournal.module.css"

function DietJournal() {
    const [mealFormState, setMealFormState] = useState({
        meal: "",
        calories: "", 
        category: "", 
        submitted: false,
    });
    const [todaysEntries, setTodaysEntries] = useState([]);

    const handleEntryChange = (event) => {
        setMealFormState({
            ...mealFormState,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmitEntry = async () => {
        const currentDate = new Date().toISOString();
        const newEntry = { ...mealFormState, dateStamp: new Date().toLocaleDateString(), timestamp: currentDate };

        // Submit entry to both Todays Meals and dietJournalEntries
        try {
            // Submit to Todays Meals
            setTodaysEntries([...todaysEntries, newEntry]);

            // Submit to dietJournalEntries
            const response = await fetch('http://localhost:3000/dietJournalEntries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newEntry)
            });
            
            if (!response.ok) {
                throw new Error('Failed to submit entry to dietJournalEntries');
            }
        } catch (error) {
            console.error('Error submitting entry:', error.message);
        }

        // Reset entry fields
        setMealFormState({ meal: "", calories: "", category: "", submitted: false });
    };

    const handleDeleteEntry = (index) => {
        const newEntries = [...todaysEntries];
        newEntries.splice(index, 1);
        setTodaysEntries(newEntries);
    };

    useEffect(() => {
        fetchTodaysEntries();
    }, []);

    const fetchTodaysEntries = async () => {
        try {
            const response = await fetch('http://localhost:3000/dietJournalEntries');
            if (!response.ok) {
                throw new Error('Failed to fetch daily meal entries');
            }
            const allEntries = await response.json();
            const todaysList = allEntries.filter(entry => entry.dateStamp === new Date().toLocaleDateString());
            setTodaysEntries(todaysList);
        } catch (error) {
            console.error('Error fetching daily meal entries:', error.message);
        }
    };

    return (
        <div style={{ maxWidth: '45%' }}>
            <h5 className={styles.title}>Diet Journal</h5>
            <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Meal</th>
                            <th>Calories</th>
                            <th>Category</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    name="meal"
                                    value={mealFormState.meal}
                                    onChange={handleEntryChange}
                                    placeholder="Enter meal"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="calories"
                                    value={mealFormState.calories}
                                    onChange={handleEntryChange}
                                    placeholder="Enter calories"
                                />
                            </td>
                            <td>
                                <select
                                    name="category"
                                    value={mealFormState.category}
                                    onChange={handleEntryChange}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                    <option value="Snack">Snack</option>
                                </select>
                            </td>
                            <td>
                                <button onClick={handleSubmitEntry}>Submit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {todaysEntries.length > 0 && (
                <>
                    <h5>Today's Meals</h5>
                    <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Meal</th>
                                    <th>Calories</th>
                                    <th>Category</th>
                                    <th>Time Submitted</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {todaysEntries.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{entry.meal}</td>
                                        <td>{entry.calories}</td>
                                        <td>{entry.category}</td>
                                        <td>{new Date(entry.timestamp).toLocaleTimeString()}</td>
                                        <td>
                                            <button onClick={() => handleDeleteEntry(index)}>X</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}

export default DietJournal;