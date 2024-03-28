import React, { useState, useEffect } from 'react';

function ExerciseJournal({ filteredExerciseList }) {
    const [entries, setEntries] = useState(() => {
        const storedEntries = localStorage.getItem('exerciseEntries');
        return storedEntries ? JSON.parse(storedEntries) : Array.from({ length: 20 }, () => ({ exercise: '', sets: '', reps: '', ampm: 'AM', favorite: false, submitted: false }));
    });

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        localStorage.setItem('exerciseEntries', JSON.stringify(entries));
    }, [entries]);

    const handleEntryChange = (index, event) => {
        const { name, value } = event.target;
        const newEntries = [...entries];
        newEntries[index] = { ...newEntries[index], [name]: value };   ///there is something wrong here
        setEntries(newEntries);
    };

    const handleSubmitEntry = async (index) => {
        const entry = entries[index];
        const currentDate = new Date(); // Get current date and time
        entry.timestamp = currentDate.toISOString(); // Add timestamp to entry
        
        try {
            const response = await fetch('http://localhost:3000/exerciseJournalEntries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(entry)
            });
    
            if (!response.ok) {
                throw new Error('Failed to submit entry');
            }
    
            // Mark the entry as submitted if the POST request was successful
            const newEntries = [...entries];
            newEntries[index].submitted = true;
            setEntries(newEntries);
            console.log('Entry submitted successfully:', entry);
        } catch (error) {
            console.error('Error submitting entry:', error.message);
        }
    };
    
    const handleRemoveEntry = (index) => {
        const newEntries = [...entries];
        newEntries.splice(index, 1);
        setEntries(newEntries);
    };

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm); // Update searchTerm state
        filterExercises(searchTerm); // Call filterExercises with searchTerm
    };
    
    const filterExercises = (searchTerm) => {
        // Check if exerciseList is defined before filtering
        if (exerciseList) {
            const filtered = filteredExerciseList.filter(exercise => {
                // Check if any property contains the search term
                return Object.values(exercise).some(value =>
                    typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
                );
            });
            setFilteredExercises(filtered);
        }
    };

    return (
        <div style={{ maxWidth: '850px' }}>
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
                                        value={exercise.workOut} 
                                        onChange={handleSearchChange}
                                        list="exerciseList"
                                    />
                                    <datalist id="exerciseList">
                                    {filteredExerciseList && filteredExerciseList.map((exercise, i) => ( // Add a check here
                                    <option key={i} value={exercise.workOut} />
                                    ))}
                                    </datalist>
                                </td>
                                
                                <td style={{ padding: '5px' }}>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={entry.weight}
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

