import React, { useState } from 'react';
import ExerciseCard from './ExerciseCard';
import ExerciseFilterForm from './ExerciseFilterForm';

function ExerciseList() {
    const [exercises, setExercises] = useState(Array.from({ length: 20 }, () => ({ name: 'Exercise', duration: '30 min' })));
    const [filteredExercises, setFilteredExercises] = useState([...exercises]);
    const [searchTerm, setSearchTerm] = useState('');

   
    const handleFavorites = () => {
        // Implement logic to filter favorite exercises
        // Update filteredExercises state accordingly
    };

    const handleTodaysItems = () => {
        // Implement logic to filter exercises for today
        // Update filteredExercises state accordingly
    };

    const handleRandomExercises = () => {
        // Implement logic to fetch new random exercises
        // Update exercises state accordingly
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        filterExercises(event.target.value);
    };

    const filterExercises = (searchTerm) => {
        const filtered = exercises.filter(exercise => {
            return exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredExercises(filtered);
    };

    return (
        <div style={{ maxWidth: '900px'}}>
            <div>
                <p>
                    <input 
                        type="text" 
                        placeholder="Search by name" 
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                    />
                    <button onClick={handleFavorites}>Favorites</button>
                    <button onClick={handleTodaysItems}>Today's Items</button>
                    <button onClick={handleRandomExercises}>Random Exercises</button>
                </p>
            </div>
            <div style={{ display: 'flex', overflowX: 'auto', maxWidth: '100%' }}>
                {filteredExercises.map((exercise, index) => (
                    <ExerciseCard key={index} exercise={exercise} name={exercise.workout} />
                ))}
            </div>
        </div>
    );
}

export default ExerciseList;