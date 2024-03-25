import React, { useState } from 'react';

function MealFilterForm() {
    const [calorieMin, setCalorieMin] = useState('');
    const [calorieMax, setCalorieMax] = useState('');
    const [selectedMealType, setSelectedMealType] = useState('');
    const [selectedCuisineType, setSelectedCuisineType] = useState('');
    const [selectedDiet, setSelectedDiet] = useState('');
    const [selectedHealth, setSelectedHealth] = useState('');

    const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
    const cuisineTypes = ['Asian', 'American', 'Caribbean', 'Central Europe', 'Chinese', 'Eastern Europe', 'French', 'Indian', 'Italian', 'Japanese', 'Kosher', 'Mediterranean', 'Mexican', 'Middle Eastern', 'South American', 'South East Asian'];
    const diets = ['balanced', 'high-fiber', 'high-protein', 'low-carb', 'low-fat', 'low-sodium'];
    const healthOptions = ['dairy-free', 'egg-free', 'gluten-free', 'keto-friendly', 'low-sugar', 'peanut-free', 'vegan', 'vegetarian'];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Filters submitted:", { calorieMin, calorieMax, selectedMealType, selectedCuisineType, selectedDiet, selectedHealth });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ maxWidth: '900px' }}>
                <h4>Diet Options</h4>
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    <div>
                        <label>
                            Min Cal:
                            <input type="number" style={{ width: '70px' }} value={calorieMin} onChange={e => setCalorieMin(e.target.value)} />
                        </label>
                        <label>
                            Max Cal:
                            <input type="number" style={{ width: '100px' }} value={calorieMax} onChange={e => setCalorieMax(e.target.value)} />
                        </label>
                        <label>
                            Meal Type:
                            <input list="mealTypes" value={selectedMealType} onChange={e => setSelectedMealType(e.target.value)} />
                            <datalist id="mealTypes">
                                {mealTypes.map((type, index) => (
                                    <option key={index} value={type} />
                                ))}
                            </datalist>
                        </label>
                        <label>
                            Cuisine Type:
                            <input list="cuisineTypes" value={selectedCuisineType} onChange={e => setSelectedCuisineType(e.target.value)} />
                            <datalist id="cuisineTypes">
                                {cuisineTypes.map((type, index) => (
                                    <option key={index} value={type} />
                                ))}
                            </datalist>
                        </label>
                    </div>
                    <div>
                        <label>
                            Diet:
                            <input list="diets" value={selectedDiet} onChange={e => setSelectedDiet(e.target.value)} />
                            <datalist id="diets">
                                {diets.map((type, index) => (
                                    <option key={index} value={type} />
                                ))}
                            </datalist>
                        </label>
                        <label>
                            Health Preferences:
                            <input list="healthOptions" value={selectedHealth} onChange={e => setSelectedHealth(e.target.value)} />
                            <datalist id="healthOptions">
                                {healthOptions.map((type, index) => (
                                    <option key={index} value={type} />
                                ))}
                            </datalist>
                        </label>
                        <button type="submit">Apply Filters</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default MealFilterForm;