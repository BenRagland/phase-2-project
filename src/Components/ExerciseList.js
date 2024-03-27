import React, { useState, useEffect } from 'react';
import ExerciseCard from './ExerciseCard';
import ExerciseFilterForm from './ExerciseFilterForm';

function ExerciseList({ onSubmit, exerciseFilters, setExerciseFilters }) {
    const [exerciseList, setExerciseList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchExerciseList();
        fetchFavorites();
    }, []); // Empty dependency array ensures this effect runs only once after initial render
    
    const fetchExerciseList = async () => {
        const url = 'https://work-out-api1.p.rapidapi.com/search';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '53b8ecad31mshd3ead90d923490bp17852ajsnb678a1515e7c',
                'X-RapidAPI-Host': 'work-out-api1.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Failed to fetch exercise data');
            }
            
            const data = await response.json();
            setExerciseList(data);
            setFilteredExercises(data); // Set filtered exercises initially to all exercises
        } catch (error) {
            console.error('Error fetching exercise data:', error.message);
        }
    };

  
    const fetchExercisesWithFilters = async (filters) => {
        const { selectedMuscle, selectedEquipment, selectedIntensity } = filters;
    
        const url = `https://work-out-api1.p.rapidapi.com/search?Muscles=${selectedMuscle}&Equipment=${selectedEquipment}&Intensity_Level=${selectedIntensity}`;
        // Set up the request headers
        const headers = {
            'X-RapidAPI-Key': '53b8ecad31mshd3ead90d923490bp17852ajsnb678a1515e7c',
            'X-RapidAPI-Host': 'work-out-api1.p.rapidapi.com'
        };
    
        try {
            // Make the fetch request
            const response = await fetch(url, { method: 'GET', headers });
    
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch filtered exercise data');
            }
    
            // Parse the JSON response
            const data = await response.json();
    
            // Update the filtered exercises state with the returned data
            setFilteredExercises(data);
        } catch (error) {
            console.error('Error fetching filtered exercise data:', error.message);
        }
    };
    
    const fetchFavorites = async () => {
        try {
            const response = await fetch('http://localhost:3000/favorites');
            if (!response.ok) {
                throw new Error('Failed to fetch favorites');
            }
            const data = await response.json();
            // Assuming each favorite has an 'id' property, set the favorites array directly
            setFavorites(data);
        } catch (error) {
            console.error('Error fetching favorites:', error.message);
        }
    };
    
    const toggleFavorite = async (exercise) => {
        try {
            const isFavorite = favorites.some((fav) => fav.WorkOut === exercise.WorkOut);
            if (isFavorite) {
                // Remove exercise from favorites
                const updatedFavorites = favorites.filter((fav) => fav.WorkOut !== exercise.WorkOut);
                setFavorites(updatedFavorites);
    
                // Remove exercise from server favorites
                const response = await fetch('http://localhost:3000/favorites', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(exercise),
                });
                if (!response.ok) {
                    throw new Error('Failed to update favorites on the server');
                }
            } else {
                // Add exercise to favorites
                const updatedFavorites = [...favorites, exercise];
                setFavorites(updatedFavorites);
    
                // Add exercise to server favorites
                const response = await fetch('http://localhost:3000/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(exercise),
                });
                if (!response.ok) {
                    throw new Error('Failed to update favorites on the server');
                }
            }
        } catch (error) {
            console.error('Error toggling favorite:', error.message);
        }
    };

    const handleFavorites = () => {
    const favoriteExercises = exerciseList.filter(exercise => {
        // Check if the exercise is in the favorites list
        return favorites.some(favorite => favorite.WorkOut === exercise.WorkOut);
    });
    setFilteredExercises(favoriteExercises);
};

    const handleRandomExercises = () => {
        // Shuffle the exercise list
        const shuffledExercises = shuffleArray(exerciseList);
    
        // Get a subset of shuffled exercises (e.g., first 10 exercises)
        const subsetExercises = shuffledExercises.slice(0, 10);
    
        // Set filtered exercises to the subset
        setFilteredExercises(subsetExercises);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        filterExercises(event.target.value);
    };

    const filterExercises = (searchTerm) => {
        // Check if exerciseList is defined before filtering.  use filter logic based exercise
        if (exerciseList) {
            const filtered = exerciseList.filter(exercise => {
                // Check if any property contains the search term
                return Object.values(exercise).some(value =>
                    typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
                );
            });
            setFilteredExercises(filtered);
        }
    };

    const handleSubmit = (selectedFilters) => {
        // Handle form submission
        setExerciseFilters({
            Muscles: selectedFilters.selectedMuscle,
            Equipment: selectedFilters.selectedEquipment,
            Intensity_Level: selectedFilters.selectedIntensity
        });
        fetchExercisesWithFilters(selectedFilters);
    };


    // Function to shuffle array
    const shuffleArray = (array) => {
        if (!Array.isArray(array) || array.length === 0) {
            console.error('Array is not valid or empty');
            return [];
        }

        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const handleTodaysItems = () => {
        // Implement the logic to get today's exercises
        // For example, you can fetch today's exercises from an API or use some local logic
        // Then, update the filtered exercises state accordingly
    };

    console.log('Exercise List:', exerciseList);
    console.log('Filtered Exercises:', filteredExercises);

    return (
        <div style={{ maxWidth: '900px'}}>
            <div>
            <ExerciseFilterForm
                    selectedMuscle={exerciseFilters.Muscles}
                    selectedEquipment={exerciseFilters.Equipment}
                    selectedIntensity={exerciseFilters.Intensity_Level}
                    onSubmit={handleSubmit}
                    />
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
            <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', maxWidth: '100%', maxHeight: '3250px' }}>
                {(filteredExercises || []).map((exercise, index) => (
                    <ExerciseCard 
                        key={index} 
                        exercise={exercise} 
                        name={exercise.workOut} 
                        video={exercise.video} 
                        intensity={exercise.intensity_Level}
                        description={exercise.explaination}
                        isFavorite={favorites.some((fav) => fav.WorkOut === exercise.WorkOut)}
                        onToggleFavorite={toggleFavorite}
                    />
                ))}
            </div>
            
        </div>
    );
}

export default ExerciseList;
