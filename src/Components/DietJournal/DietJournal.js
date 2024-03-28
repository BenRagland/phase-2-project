import React, { useState, useEffect } from 'react';
import styles from "./Dietjournal.module.css"

function DietJournal() {
<<<<<<< HEAD
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
=======
    const [entries, setEntries] = useState(() => {});

    // list of meal Entries from DB
    const [dailyMealEntries, setDailyMealEntries ] = useState([])
    const [todaysEntries, setTodaysEntries ] = useState([])
    const [mealFormState, setMealFormState ] = useState(
        {
            meal: "",
            calories: "", 
            category: "", 
            favorite: false,
            period: "AM",
            submitted: false,
            dateStamp: "2024-03-27T17"
        },
       
    )

    // State to store all meals from the API
    const [allMeals, setAllMeals] = useState([]); 
>>>>>>> MealJournalFix
    const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

    useEffect(()=>{
        fetch('http://localhost:3001/dietJournalEntries')
           .then( response => response.json())
           
           .then( (allEntries) =>{
                let todaysDate = new Date().toLocaleDateString()
            
               console.log(allEntries, "daily Entries")
               console.log(todaysDate, "Todays date stamp from system")
                console.log(allEntries[0].dateStamp, "this is entry.dateStamp")
               const todaysList = allEntries.filter((entry)=>{
                    return entry.dateStamp === todaysDate ? true : false
               })
               console.log(todaysList, "todaysList")
               setTodaysEntries(todaysList)
           })
           .catch (error =>{
               console.error('Error submitting entry:', error.message);

            })
       
    },[])
    
    

    // Fetch all meals Raw Data from the API
    useEffect(() => {
        fetchAllMeals();
    }, []);

    const fetchAllMeals = async () => {
        try {
            const response = await fetch('https://api.edamam.com/api/recipes/v2?type=public&app_id=5218fd09&app_key=6f026eb8600d0aae8b2a2639aa0e6ec5');
            if (!response.ok) {
                throw new Error('Failed to fetch Daily Meals');
            }
            const data = await response.json();
            // Assuming data contains the recipes
            const meals = data.hits.map(hit => hit.recipe.label);
            setAllMeals(meals); // Set the retrieved meals in state
        } catch (error) {
            console.error('Error fetching Daily meals:', error.message);
        }
    };

    const handleEntryChange = (event) => {
        
    
        setMealFormState({
            ...mealFormState,
            [event.target.name] :event.target.value
        })

        console.log("Form state", mealFormState)
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
        <div className={styles.dietJournalContainer} style={{ maxWidth: '750px' }}>
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

                            <tr>
                                {/* Dish Name Input */}
                                <td style={{ padding: '5px'}}>
                                    <input
                                        type="text"
                                        name="meal"
                                        value={mealFormState.meal}
                                        onChange={(event) => handleEntryChange(event)}
                                        list="mealSuggestions"
                                    />
                                    {/* Display suggestions as the user types */}
                                    <datalist id="mealSuggestions">
                                        {allMeals.map((meal, i) => (
                                            <option key={i} value={meal} />
                                        ))}
                                    </datalist>
                                </td>


                                {/* Number of Calories Input */}
                                <td style={{ padding: '5px'}}>
                                    <input
                                        type="number"
                                        name="calories"
                                        value={mealFormState.calories}
                                        onChange={(event) => handleEntryChange(event)}
                                    />
                                </td>


                                {/* Dish Category Type Input */}
                                <td style={{ padding: '5px'}}>
                                    <select
                                        name="category"
                                        value={mealFormState.category}
                                        onChange={(event) => handleEntryChange(event)}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((category, i) => (
                                            <option key={i} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                {/* Submit & Delete */}
                                <td style={{ padding: '5px'}}>
                                {/* {entry.submitted ? "Submitted" : <button onClick={() => handleSubmitEntry(index)} disabled={entry.submitted}>Submit</button>}       */}
                                </td>
                                <td style={{ padding: '5px'}}>
                                    <button onClick={(e)=>{""}}> X </button>
                                </td>
                            </tr>

                            {
                                todaysEntries.length > 0 ? 
                                todaysEntries.map((mealObj)=>{
                                    return(
                                        <tr className ={styles.entryRenderRow}>
                                            <td> {mealObj.meal}</td>
                                            <td>{mealObj.calories}</td>
                                            <td>{mealObj.category}</td>
                                            <button> X</button>
                                        </tr>
                                    )
                                }) :" "
                            }
                        
                    </tbody>


                </table>
            </div>
              <button> Diet Data </button>                              
        </div>
    );
}

export default DietJournal;