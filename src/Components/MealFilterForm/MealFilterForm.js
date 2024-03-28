import React, { useState, useEffect } from 'react';
import FoodCard from '../FoodCard/FoodCard';
import styles from "./MealFilterForm.module.css"

function MealFilterForm() {
    const APP_ID = "5218fd09";
    const APP_KEY = "6f026eb8600d0aae8b2a2639aa0e6ec5"; 
    const [searchTerm, setSearchTerm] = useState('')
    const [calorieMin, setCalorieMin] = useState('');
    const [calorieMax, setCalorieMax] = useState('');
    const [selectedMealType, setSelectedMealType] = useState('');
    const [selectedCuisineType, setSelectedCuisineType] = useState('');
    const [selectedDiet, setSelectedDiet] = useState('');
    const [selectedHealth, setSelectedHealth] = useState('');
    const [recipes, setRecipes] = useState([]);

    const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
    const cuisineTypes = ['Asian', 'American', 'Caribbean', 'Chinese', 'French', 'Indian', 'Italian', 'Japanese', 'Kosher', 'Mediterranean', 'Mexican'];
    // const cuisineTypes = ['Asian', 'American', 'Caribbean', 'Central Europe', 'Chinese', 'Eastern Europe', 'French', 'Indian', 'Italian', 'Japanese', 'Kosher', 'Mediterranean', 'Mexican', 'Middle Eastern', 'South American', 'South East Asian'];
    const diets = ['balanced', 'high-fiber', 'high-protein', 'low-carb', 'low-fat', 'low-sodium'];
    const healthOptions = ['dairy-free', 'egg-free', 'gluten-free', 'keto-friendly', 'low-sugar', 'peanut-free', 'vegan', 'vegetarian'];
    console.log(recipes, "line 21 recipes")

    const fetchRecipes = async () => {
        try {
            const paramsObject = {
                type: 'any',
                beta: true,
                q: searchTerm,
                app_id: APP_ID,
                app_key: APP_KEY,
                ...(calorieMin && { calories: `${calorieMin}-${calorieMax}` }),
                ...(selectedMealType && { mealType: selectedMealType }),
                ...(selectedCuisineType && { cuisineType: selectedCuisineType }),
                ...(selectedDiet && { diet: selectedDiet }),
                ...(selectedHealth && { health: selectedHealth })
            };
    
            const params = []
    
            for (const [label, value] of Object.entries(paramsObject)) {
                params.push(`${label}=${value}`)
            }

            const fetchUrl = `https://api.edamam.com/api/recipes/v2?${params.join('&')}`;
    
            fetch(fetchUrl)
            .then( res => {
                    return res.json()
            })
            .then( data => {
                setRecipes(data.hits);
                console.log("Fetched recipes:", data.hits);
            })
    
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    // useEffect(() => {
        
        
    //     fetchRecipes();
    // }, [searchTerm, calorieMin, calorieMax, selectedMealType, selectedCuisineType, selectedDiet, selectedHealth]);

    const handleSubmit = (e) => {
        fetchRecipes();
        e.preventDefault();
        console.log("Filters submitted:", { calorieMin, calorieMax, selectedMealType, selectedCuisineType, selectedDiet, selectedHealth });
        setSearchTerm('')
        setCalorieMin('')
        setCalorieMax('') 
        setSelectedMealType('')   
        setSelectedCuisineType('')    
        setSelectedDiet('')    
        setSelectedHealth('')
        //clear all input states
    };
    // // const generateFoodTile = () => {
    // //     return recipes.map( (data) => {return <FoodTile props={data}></FoodTile>} )
    // }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <div className={styles.mealFiltersContainer}>
                <h4 className={styles.sectionTitle} >Diet Options</h4>
                <div className={styles.mealFilters}>
                    <div>
                        <label style={{marginRight:"1em"}}>
                            <span> Min Cal: </span>
                            <input type="number" style={{ width: '70px' }} value={calorieMin} onChange={e => setCalorieMin(e.target.value)} />
                        </label>
                        <label style={{marginRight:"1em"}}>
                            Max Cal:
                            <input type="number" style={{ width: '100px' }} value={calorieMax} onChange={e => setCalorieMax(e.target.value)} />
                        </label>
                        <label style={{marginRight:"1em"}}>
                            Meal Type:
                            <input list="mealTypes" value={selectedMealType} onChange={e => setSelectedMealType(e.target.value)} />
                            <datalist id="mealTypes">
                                {mealTypes.map((type, index) => (
                                    <option key={index} value={type} />
                                ))}
                            </datalist>
                        </label>
                        <label style={{marginRight:"1em"}}>
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
                        <label style={{marginRight:"1em"}}>
                            Diet:
                            <input list="diets" value={selectedDiet} onChange={e => setSelectedDiet(e.target.value)} />
                            <datalist id="diets">
                                {diets.map((type, index) => (
                                    <option key={index} value={type} />
                                ))}
                            </datalist>
                        </label>
                        <label style={{marginRight:"1em"}}>
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
        {/* {generateFoodTile} */}
        {
        recipes.length > 0 ? recipes.map((recipe) => <FoodCard recipeObj={recipe}/>) : ""
        
    
        }
        
        </div>
    );
}

export default MealFilterForm;