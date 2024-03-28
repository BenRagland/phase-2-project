import React, { useState, useEffect } from 'react';
import styles from "./ExerciseJournal.module.css"

function ExerciseJournal() {
    const [entry, setEntry] = useState({ exercise: '', weight: '', sets: '', reps: '', ampm: 'AM', favorite: false, submitted: false });
    const [submittedEntries, setSubmittedEntries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleEntryChange = (event) => {
        const { name, value } = event.target;
        setEntry({ ...entry, [name]: value });
    };

    const handleSubmitEntry = () => {
        const currentDate = new Date().toISOString();
        const newEntry = { ...entry, timestamp: currentDate };
        setSubmittedEntries([...submittedEntries, newEntry]);
        setEntry({ exercise: '', weight: '', sets: '', reps: '', ampm: 'AM', favorite: false, submitted: false });
    };

    const handleRemoveEntry = (index) => {
        const newEntries = submittedEntries.filter((_, i) => i !== index);
        setSubmittedEntries(newEntries);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredSubmittedEntries = submittedEntries.filter(entry =>
        new Date(entry.timestamp).toDateString() === new Date().toDateString()
    );

    return (
        <div style={{ maxWidth: '45%' }}>
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
                                />
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
            <h5>Today's Exercises</h5>
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
                        {filteredSubmittedEntries.map((entry, index) => (
                            <tr key={index}>
                                <td style={{ padding: '5px' }}>{entry.exercise}</td>
                                <td style={{ padding: '5px' }}>{entry.weight}</td>
                                <td style={{ padding: '5px' }}>{entry.sets}</td>
                                <td style={{ padding: '5px' }}>{entry.reps}</td>
                                <td style={{ padding: '5px' }}>
                                    <button onClick={() => handleRemoveEntry(index)}>X</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ExerciseJournal;

