import React from 'react';

function ExerciseCard({ exercise }) {



    return (
        <li className="card">
        <img src={exercise.video} alt={exercise.workOut} />
        <h4>{exercise.WorkOut}</h4>
        <p>{exercise.Intensity_Level}</p> <p>{exercise.SetsInfo}</p>  
        <p>{exercise.Explaination}</p>
        </li>

    )
}


export default ExerciseCard;


//need to include more data on card from API.   