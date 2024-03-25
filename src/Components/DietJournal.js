import React, { useState, useEffect } from 'react';

function DietJournal() {
    const [entries, setEntries] = useState([{ meal: '', calories: '', category: '' }, { meal: '', calories: '', category: '' }]);
    const [allMeals, setAllMeals] = useState([]);
    const [showEntries, setShowEntries] = useState(false);
    const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

    // Fetch all meals from the API
    useEffect(() => {
        fetchAllMeals();
    }, []);

    const fetchAllMeals = async () => {
        try {
            const response = await fetch('https://api.edamam.com/api/recipes/v2?type=any&beta=true&app_id=d0e6a50c&app_key=4039c21decd06beb5d8e7382c1d3dde0%09%E2%80%94%09');
            if (!response.ok) {
                throw new Error('Failed to fetch meals');
            }
            const data = await response.json();
            const meals = data.hits.map(hit => hit.recipe.label);
            setAllMeals(meals);
        } catch (error) {
            console.error('Error fetching meals:', error.message);
        }
    };

    const handleEntrySubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const newEntry = {};
        formData.forEach((value, key) => {
            newEntry[key] = value;
        });
        newEntry.dateSubmitted = new Date().toLocaleDateString();
        newEntry.timeSubmitted = new Date().toLocaleTimeString();

        try {
            const response = await fetch('http://localhost:3000/dietJournalEntries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEntry),
            });

            if (!response.ok) {
                throw new Error('Failed to submit entry');
            }

            console.log('Entry submitted successfully');
            setEntries([...entries, newEntry]);
            form.reset(); // Clear input fields after submission
        } catch (error) {
            console.error('Error submitting entry:', error.message);
        }
    };

    const toggleShowEntries = () => {
        setShowEntries(prevState => !prevState);
    };

    return (
        <div style={{ maxWidth: '650px' }}>
            <h5>
                <button onClick={toggleShowEntries}>Diet Journal</button>
            </h5>
            {showEntries && (
                <div>
                    <form onSubmit={handleEntrySubmit}>
                        <div style={{ marginBottom: '10px' }}>
                            <input type="text" name="meal" placeholder="Meal" list="mealSuggestions" required />
                            <datalist id="mealSuggestions">
                                {allMeals.map((meal, i) => (
                                    <option key={i} value={meal} />
                                ))}
                            </datalist>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <input type="number" name="calories" placeholder="Calories" required />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <select name="category" required>
                                <option value="">Select Category</option>
                                {categories.map((category, i) => (
                                    <option key={i} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                    {entries.length > 0 && (
                        <div>
                            <h6>Today's Entries:</h6>
                            <ul>
                                {entries.map((entry, index) => (
                                    <li key={index}>
                                        {entry.meal} - {entry.calories} calories - {entry.category}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default DietJournal;