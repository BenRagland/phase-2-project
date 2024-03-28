import React, { useState, useEffect } from 'react';
import styles from "./ExerciseJournal.module.css";

function ExerciseJournal() {
    const [entry, setEntry] = useState({ exercise: '', weight: '', sets: '', reps: '', submitted: false });
    const [submittedEntries, setSubmittedEntries] = useState([]);
    const [workoutNames, setWorkoutNames] = useState([]);
    const [filteredWorkoutNames, setFilteredWorkoutNames] = useState([]);

    useEffect(() => {
        fetchWorkoutNames();
        loadSubmittedEntries();
    }, []);

    const fetchWorkoutNames = async () => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'ada19aed84mshe7a269ed4737e51p108edcjsn0b3063e0b099',
                'X-RapidAPI-Host': 'work-out-api1.p.rapidapi.com'
            }
        };
    
        try {
            const response = await fetch('https://work-out-api1.p.rapidapi.com/search', options);
            if (!response.ok) {
                throw new Error('Failed to fetch workout names');
            }
            const data = await response.json();
            const names = data.map(item => item.WorkOut);
            setWorkoutNames(names);
        } catch (error) {
            console.error('Error fetching workout names:', error.message);
        }
    };

    const loadSubmittedEntries = () => {
        const storedEntries = JSON.parse(localStorage.getItem('exerciseEntries'));
        const today = new Date().toDateString();
        if (storedEntries && storedEntries.date === today) {
            setSubmittedEntries(storedEntries.entries);
        } else {
            localStorage.removeItem('exerciseEntries');
        }
    };

    const saveSubmittedEntries = (entries) => {
        const currentDate = new Date().toDateString();
        localStorage.setItem('exerciseEntries', JSON.stringify({ date: currentDate, entries: entries }));
    };

    const handleEntryChange = (event) => {
        const { name, value } = event.target;
        setEntry({ ...entry, [name]: value });

        // Filter workout names based on user input
        const filtered = workoutNames.filter(name => name.toLowerCase().includes(value.toLowerCase()));
        setFilteredWorkoutNames(filtered);
    };

    const handleSubmitEntry = async () => {
        const currentDate = new Date().toISOString();
        const newEntry = { ...entry, timestamp: currentDate };
        
        // Submit entry to exerciseJournalEntries
        try {
            const response = await fetch('http://localhost:3000/exerciseJournalEntries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newEntry)
            });
            
            if (!response.ok) {
                throw new Error('Failed to submit entry');
            }

            // Add entry to submittedEntries
            const updatedEntries = [...submittedEntries, newEntry];
            setSubmittedEntries(updatedEntries);
            saveSubmittedEntries(updatedEntries);
        } catch (error) {
            console.error('Error submitting entry:', error.message);
        }

        // Reset entry fields
        setEntry({ exercise: '', weight: '', sets: '', reps: '', submitted: false });
    };

    const handleRemoveEntry = async (index) => {
        // Remove entry from submittedEntries
        const newEntries = submittedEntries.filter((_, i) => i !== index);
        setSubmittedEntries(newEntries);
        saveSubmittedEntries(newEntries);
    };

    return (
        <div style={{ maxWidth: '60%' }}>
            <h5 className={styles.title}>Exercise Journal</h5>
            <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: '0' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '5px' }}>Exercise</th>
                            <th style={{ padding: '5px', maxWidth: '25px' }}>Weight</th>
                            <th style={{ padding: '5px', maxWidth: '25px' }}>Sets</th>
                            <th style={{ padding: '5px', width: '15px' }}>Reps</th>
                            <th style={{ padding: '5px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: '5px' }}>
                                <input
                                    type="text"
                                    name="exercise"
                                    value={entry.exercise}
                                    onChange={handleEntryChange}
                                    list="workoutNames"
                                    placeholder="Enter exercise"
                                />
                                <datalist id="workoutNames">
                                    {filteredWorkoutNames.map((name, index) => (
                                        <option key={index} value={name} />
                                    ))}
                                </datalist>
                            </td>

                            <td style={{ padding: '5px' }}>
                                <input
                                    type="number"
                                    name="weight"
                                    value={entry.weight}
                                    onChange={handleEntryChange}
                                />
                            </td>
                            <td style={{ padding: '5px' }}>
                                <input
                                    type="number"
                                    name="sets"
                                    value={entry.sets}
                                    onChange={handleEntryChange}
                                />
                            </td>
                            <td style={{ padding: '5px' }}>
                                <input
                                    type="number"
                                    name="reps"
                                    value={entry.reps}
                                    onChange={handleEntryChange}
                                />
                            </td>
                            <td style={{ padding: '5px' }}>
                                <button onClick={handleSubmitEntry}>Submit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {submittedEntries.length > 0 && (
                <>
                    <h5>Today's Entries</h5>
                    <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: '0' }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '5px' }}>Exercise</th>
                                    <th style={{ padding: '5px', maxWidth: '25px' }}>Weight</th>
                                    <th style={{ padding: '5px', maxWidth: '25px' }}>Sets</th>
                                    <th style={{ padding: '5px', width: '15px' }}>Reps</th>
                                    <th style={{ padding: '5px' }}>Time</th>
                                    <th style={{ padding: '5px' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {submittedEntries.map((entry, index) => (
                                    <tr key={index}>
                                        <td style={{ padding: '5px' }}>{entry.exercise}</td>
                                        <td style={{padding: '5px' }}>{entry.weight}</td>
                                        <td style={{ padding: '5px' }}>{entry.sets}</td>
                                        <td style={{ padding: '5px' }}>{entry.reps}</td>
                                        <td style={{ padding: '5px' }}>{new Date(entry.timestamp).toLocaleTimeString()}</td>
                                        <td style={{ padding: '5px' }}>
                                            <button onClick={() => handleRemoveEntry(index)}>Remove</button>
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

export default ExerciseJournal;