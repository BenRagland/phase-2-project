import React, { useState, useEffect } from 'react';
import styles from "./Dietjournal.module.css"

function DietJournal() {
    const [entries, setEntries] = useState(() => {
        const storedEntries = localStorage.getItem('dietEntries');
        return storedEntries ? JSON.parse(storedEntries) : Array.from({ length: 15 }, () => ({ meal: '', calories: '', category: '', favorite: false, period: 'AM', submitted: false }));
    });

    // const [entries, setEntries ] = useState({
    //     meal: '',
    //      calories: '', 
    //      category: '', 
    //      favorite: false, 
    //      period: 'AM',
    //      submitted: false 
    // })

    console.log(entries, " entries state")
    const [allMeals, setAllMeals] = useState([]); // State to store all meals from the API
    const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

    // Fetch all meals from the API
    useEffect(() => {
        fetchAllMeals();
    }, []);

    const fetchAllMeals = async () => {
        try {
            const response = await fetch('https://api.edamam.com/api/recipes/v2?type=public&app_id=5218fd09&app_key=6f026eb8600d0aae8b2a2639aa0e6ec5');
            if (!response.ok) {
                throw new Error('Failed to fetch meals');
            }
            const data = await response.json();
            // Assuming data contains the recipes
            const meals = data.hits.map(hit => hit.recipe.label);
            setAllMeals(meals); // Set the retrieved meals in state
        } catch (error) {
            console.error('Error fetching meals:', error.message);
        }
    };

    const handleEntryChange = (index, event) => {
        const { name, value } = event.target;
        let updatedEntries = [...entries];
        if (name === "meal") {
            // Find the meal label in allMeals
            const selectedMeal = value;
            updatedEntries[index] = { ...updatedEntries[index], [name]: value };
            // Assuming there's no direct way to get calories from the API
            updatedEntries[index].calories = ''; // Clear calories for now
        } else {
            updatedEntries[index] = { ...updatedEntries[index], [name]: value };
        }
        setEntries(updatedEntries);
    };

    const handleSubmitEntry = async (index) => {
        const entry = { ...entries[index] };
        entry.dateSubmitted = new Date().toLocaleDateString(); // Current date
        entry.timeSubmitted = new Date().toLocaleTimeString(); // Current time
    
        try {
            const response = await fetch('http://localhost:3000/dietJournalEntries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entry),
            });
    
            if (!response.ok) {
                throw new Error('Failed to submit entry');
            }
    
            console.log('Entry submitted successfully');
            // Mark the entry as submitted
            setEntries(prevEntries => {
                const updatedEntries = [...prevEntries];
                updatedEntries[index].submitted = true;
                return updatedEntries;
            });
        } catch (error) {
            console.error('Error submitting entry:', error.message);
        }
    };

    const removeEntry = (index) => {
        setEntries(prevEntries => prevEntries.filter((_, i) => i !== index));
    };

    // Clear entries at the beginning of each day
    useEffect(() => {
        const currentDate = new Date();
        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
        const millisecondsUntilEndOfDay = endOfDay - currentDate;
        const timeoutId = setTimeout(() => {
            setEntries(Array.from({ length: 15 }, () => ({ meal: '', calories: '', category: '', favorite: false, period: 'AM', submitted: false })));
        }, millisecondsUntilEndOfDay);
        
        return () => clearTimeout(timeoutId);
    }, []);

    // Update localStorage whenever entries change
    useEffect(() => {
        localStorage.setItem('dietEntries', JSON.stringify(entries));
    }, [entries]);

    return (
        <div style={{ maxWidth: '750px' }}>
            <h5 className={styles.title}> Diet Journal</h5> 
        
            <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: '0' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '5px' }}>Meal</th>
                            <th style={{ padding: '5px' }}>Calories</th>
                            <th style={{ padding: '5px' }}>Category</th>
                            <th style={{ padding: '5px' }}></th>
                            <th style={{ padding: '5px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((entry, index) => (
                            <tr key={index}>
                                <td style={{ padding: '5px'}}>
                                    <input
                                        type="text"
                                        name="meal"
                                        value={entry.meal}
                                        onChange={(event) => handleEntryChange(index, event)}
                                        list="mealSuggestions"
                                    />
                                    {/* Display suggestions as the user types */}
                                    <datalist id="mealSuggestions">
                                        {allMeals.map((meal, i) => (
                                            <option key={i} value={meal} />
                                        ))}
                                    </datalist>
                                </td>
                                <td style={{ padding: '5px'}}>
                                    <input
                                        type="number"
                                        name="calories"
                                        value={entry.calories}
                                        onChange={(event) => handleEntryChange(index, event)}
                                    />
                                </td>
                                <td style={{ padding: '5px'}}>
                                    <select
                                        name="category"
                                        value={entry.category}
                                        onChange={(event) => handleEntryChange(index, event)}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((category, i) => (
                                            <option key={i} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                                         
                                <td style={{ padding: '5px'}}>
                                {entry.submitted ? "Submitted" : <button onClick={() => handleSubmitEntry(index)} disabled={entry.submitted}>Submit</button>}                                </td>
                                <td style={{ padding: '5px'}}>
                                    <button onClick={() => removeEntry(index)}> X </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
              <button> Diet Data </button>                              
        </div>
    );
}

export default DietJournal;