import React, { useState, useEffect } from 'react';

function ExerciseJournal() {
    const [entries, setEntries] = useState(() => {
        const storedEntries = localStorage.getItem('exerciseEntries');
        return storedEntries ? JSON.parse(storedEntries) : Array.from({ length: 20 }, () => ({ exercise: '', sets: '', reps: '', ampm: '', favorite: false, submitted: false }));
    });
    const [exerciseList, setExerciseList] = useState([]);

    useEffect(() => {
        fetchExerciseList();
    }, []);

    useEffect(() => {
        localStorage.setItem('exerciseEntries', JSON.stringify(entries));
    }, [entries]);

    useEffect(() => {
        const currentDate = new Date();
        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
        const millisecondsUntilEndOfDay = endOfDay - currentDate;
        const timeoutId = setTimeout(() => {
            const updatedEntries = entries.map(entry => ({
                ...entry,
                submitted: false // Reset submitted status at the end of the day
            }));
            setEntries(updatedEntries);
        }, millisecondsUntilEndOfDay);
        
        return () => clearTimeout(timeoutId);
    }, [entries]); // Add entries to the dependency array to ensure this effect runs whenever entries change

    const fetchExerciseList = async () => {
        try {
            const response = await fetch('https://work-out-api1.p.rapidapi.com/search', {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '53b8ecad31mshd3ead90d923490bp17852ajsnb678a1515e7c',
                    'X-RapidAPI-Host': 'work-out-api1.p.rapidapi.com'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch exercise data');
            }

            const data = await response.json();
            setExerciseList(data.exercises);
        } catch (error) {
            console.error('Error fetching exercise data:', error.message);
        }
    };

    const handleEntryChange = (index, event) => {
        const { name, value } = event.target;
        const newEntries = [...entries];
        newEntries[index] = { ...newEntries[index], [name]: value };
        setEntries(newEntries);
    };

    const filterExerciseList = (inputValue) => {
        return exerciseList.filter(exercise => exercise.workout.toLowerCase().includes(inputValue.toLowerCase()));
    };

    const handleSubmitEntry = (index) => {
        // Mark the entry as submitted
        const newEntries = [...entries];
        newEntries[index].submitted = true;
        setEntries(newEntries);
        // Other submission logic
        console.log("Submitting entry at index:", index);
    };
    
    const handleRemoveEntry = (index) => {
        const newEntries = [...entries];
        newEntries.splice(index, 1);
        setEntries(newEntries);
    };

    return (
        <div style={{ maxWidth: '750px' }}>
            <h5>Exercise Journal</h5>
            <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: '0' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '5px' }}>Exercise</th>
                            <th style={{ padding: '5px', maxWidth: '25px' }}>Weight</th>
                            <th style={{ padding: '5px', maxWidth: '25px' }}>Sets</th>
                            <th style={{ padding: '5px', width: '25px'  }}>Reps</th>
                            <th style={{ padding: '5px' }}></th>
                            <th style={{ padding: '5px' }}></th>
                            <th style={{ padding: '5px' }}>     </th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((entry, index) => (
                            <tr key={index}>
                                <td style={{ padding: '5px' }}>
                                    <input
                                        type="text"
                                        name="exercise"
                                        value={entry.exercise}
                                        onChange={(event) => handleEntryChange(index, event)}
                                        list="exerciseList"
                                    />
                                    <datalist id="exerciseList">
                                        {exerciseList && filterExerciseList(entry.exercise).map((exercise, i) => (
                                            <option key={i} value={exercise.workout} />
                                        ))}
                                    </datalist>
                                </td>
                                
                                <td style={{ padding: '5px' }}>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={entry.sets}
                                        onChange={(event) => handleEntryChange(index, event)}
                                    />
                                </td>    
                                <td style={{ padding: '5px' }}>
                                    <input
                                        type="number"
                                        name="sets"
                                        value={entry.sets}
                                        onChange={(event) => handleEntryChange(index, event)}
                                    />
                                </td>
                                <td style={{ padding: '5px' }}>
                                    <input
                                        type="number"
                                        name="reps"
                                        value={entry.reps}
                                        onChange={(event) => handleEntryChange(index, event)}
                                    />
                                </td>
                                <td style={{ padding: '5px' }}>
                                    <select
                                        name="ampm"
                                        value={entry.ampm}
                                        onChange={(event) => handleEntryChange(index, event)}
                                    >
                                        <option value="AM">AM</option>
                                        <option value="PM">PM</option>
                                    </select>
                                </td>
                                <td style={{ padding: '5px' }}>
                                    {entry.submitted ? "Submitted" : <button onClick={() => handleSubmitEntry(index)} disabled={entry.submitted}>Submit</button>}
                                </td>
                                <td style={{ padding: '5px' }}>
                                    <button onClick={() => handleRemoveEntry(index)}> X </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button>Exercise Data </button> 
        </div>
    );
}

export default ExerciseJournal;