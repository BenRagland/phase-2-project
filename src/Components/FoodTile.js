import React, { useState } from 'react';

function FoodTile({props}){
console.log("FoodTile test", props)
const test= props.recipe && props.recipe.label
console.log("return value", props)
    return (
        <span>{test}
        <div></div>
        <img src = {props.recipe.image} />
        <h2>{props.recipe.label}</h2>
        <h3>{props.recipe.dietLabels}</h3>
        <h3>{props.recipe.healthLabels}</h3>
        <h3>{props.recipe.cuisineType}</h3>
        </span>

    
          
    )
}

export default FoodTile;