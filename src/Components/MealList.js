import React, { useState } from 'react';
import MealCard from './MealCard';
import MealFilterForm from './MealFilterForm/MealFilterForm';

//Added FootTile component, which generates in MealFilterForm JSX
function MealList() {
    const [meals, setMeals] = useState(Array.from({ length: 20 }, () => ({ id: Math.random(), name: 'Random Meal', isFavorite: false })));
    // const [displayedMeals, setDisplayedMeals] = useState([...meals]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCriteria, setFilterCriteria] = useState('name');
    const foodData = [{name:"fakeFood"}, {name:"fakeFood2"}]

    // const generateRandomMeals = () => {
    //     const newMeals = Array.from({ length: 20 }, () => ({ id: Math.random(), name: 'Random Meal', isFavorite: false }));
    //     setMeals(newMeals);
    //     setDisplayedMeals(newMeals);
    // };

    const filterMeals = () => {
        const filtered = meals.filter(meal => {
            if (filterCriteria === 'name') {
                return meal.name.toLowerCase().includes(searchTerm.toLowerCase());
            }
            // Add more filter criteria as needed
        });
        setDisplayedMeals(filtered);
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSelectChange = (event) => {
        setFilterCriteria(event.target.value);
    };

    const showFavoriteMeals = () => {
        const favoriteMeals = meals.filter(meal => meal.isFavorite);
        setDisplayedMeals(favoriteMeals);
    };

    const showTodaysMeals = () => {
        filterMeals(); // Placeholder for today's meals logic
    };

    return (
        <div style={{ maxWidth: '900px' }}>
            {/* Favorites and Find Random Meal Search  */}

            {/* <div>
              <p>  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Search by name...">
                    </input>
                
                <button onClick={showFavoriteMeals}>Favorite Meals</button>
                
                <button onClick={showTodaysMeals}>Today's Meals</button>
                <button onClick={generateRandomMeals}>Random Meals</button>
                </p>
            </div> */}
            {/* <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', maxWidth: '100%', maxHeight: '400px' }}>
                {
                    displayedMeals.map( (food => <FoodCard key={food.id} foodObj={food} />))
                }
            </div> */}
        </div>
    );
}

export default MealList;