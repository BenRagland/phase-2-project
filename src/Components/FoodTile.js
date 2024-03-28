import React, { useState } from 'react';

function FoodTile({props}){
console.log("FoodTile test", props)
// const test= props.recipe && props.recipe.label
console.log("return value", props)
    return (
        <div style={
            {
                color: "red",
                // display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', maxWidth: '100%', maxHeight: '400px' 
                }}>
            <h1>This is food tile component </h1>
                {/* <img src = {props.recipe.image} />
                <h2>{props.recipe.label}</h2>
                <h3>{props.recipe.dietLabels}</h3>
                <h3>{props.recipe.healthLabels}</h3>
                <h3>{props.recipe.cuisineType}</h3> */}
        </div>

    
          
    )
}

export default FoodTile;