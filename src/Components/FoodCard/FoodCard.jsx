import React from 'react'
import styles from "./FoodCard.module.css"


const FoodCard = ({recipeObj}) => {
  console.log(recipeObj, "food card")
  return (
    <div className={styles.foodCardContainer}>
        <h3> {recipeObj.recipe.label} </h3>
        <img 
        src= {recipeObj.recipe.images.REGULAR.url}
        
        alt={recipeObj.recipe.label}
        />
        
        {/* Details */}
        <p>calories : " "</p>
        <p>Diet : " "</p>
        <p>Cuisine : " "</p>
        {/* <img src = {props.recipe.image} />
                <h2>{props.recipe.label}</h2>
                <h3>{props.recipe.dietLabels}</h3>
                <h3>{props.recipe.healthLabels}</h3>
                <h3>{props.recipe.cuisineType}</h3> */}
    </div>



  )
}

export default FoodCard