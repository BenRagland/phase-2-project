import React from 'react';

function MealCard({ meal }) {



    return (
        <li className="card">
        <img src={meal.image} alt={meal.name} />
        <h4>{meal.name}</h4>
        <p>{meal.calories}</p>  
        <p>{meal.description}</p>
        </li>

    )
}


export default MealCard;

//need to include more data on card from API. 