import React, { useState, useEffect } from 'react';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import ExerciseFilterForm from '../ExerciseFilterForm/ExerciseFilterForm';

function ExerciseList({ exerciseFilters, setExerciseFilters }) {
    const [exerciseList, setExerciseList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchExerciseList();
        fetchFavorites();
    }, []);

    const fetchExerciseList = async () => {
        const url = 'https://work-out-api1.p.rapidapi.com/search';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'ada19aed84mshe7a269ed4737e51p108edcjsn0b3063e0b099',
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
            setFilteredExercises(data);
        } catch (error) {
            console.error('Error fetching exercise data:', error.message);
        }
    };

    const fetchFavorites = async () => {
        try {
            const response = await fetch('http://localhost:3000/favorites');
            if (!response.ok) {
                throw new Error('Failed to fetch favorites');
            }
            const data = await response.json();
            setFavorites(data);
        } catch (error) {
            console.error('Error fetching favorites:', error.message);
        }
    };

    const toggleFavorite = async (exercise) => {
        try {
            const isFavorite = favorites.some((fav) => fav.WorkOut === exercise.WorkOut);
            
            if (isFavorite) {
                const updatedFavorites = favorites.filter((fav) => fav.WorkOut !== exercise.WorkOut);
                setFavorites(updatedFavorites);
    
                // Delete the favorite from the database using its unique identifier
                const favoriteToDelete = favorites.find((fav) => fav.WorkOut === exercise.WorkOut);
                const response = await fetch(`http://localhost:3000/favorites/${favoriteToDelete.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    throw new Error('Failed to delete favorite from the server');
                }
            } else {
                // Generate a unique identifier for the favorite
                const favoriteId = generateUniqueId();
                const favoriteWithId = { ...exercise, id: favoriteId };
    
                const updatedFavorites = [...favorites, favoriteWithId];
                setFavorites(updatedFavorites);
    
                // Add the favorite to the database
                const response = await fetch('http://localhost:3000/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(favoriteWithId),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to add favorite to the server');
                }
            }
        } catch (error) {
            console.error('Error toggling favorite:', error.message);
        }
    };
    
    const generateUniqueId = () => {
        // Generate a random string as a unique identifier
        return Math.random().toString(36).substr(2, 9);
    };

    const handleFavorites = () => {
        const favoriteExercises = exerciseList.filter(exercise => {
            return favorites.some(favorite => favorite.WorkOut === exercise.WorkOut);
        });
        setFilteredExercises(favoriteExercises);
    };

    const handleRandomExercises = () => {
        const shuffledExercises = shuffleArray(exerciseList);
        const subsetExercises = shuffledExercises.slice(0, 10);
        setFilteredExercises(subsetExercises);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        filterExercises(event.target.value);
    };

    const handleSubmit = (selectedFilters) => {
        setExerciseFilters({
            Muscles: selectedFilters.selectedMuscle,
            Equipment: selectedFilters.selectedEquipment,
            Intensity_Level: selectedFilters.selectedIntensity
        });
        fetchExercisesWithFilters(selectedFilters);
    };

    const filterExercises = (searchTerm) => {
        if (exerciseList) {
            const filtered = exerciseList.filter(exercise => {
                return Object.values(exercise).some(value =>
                    typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
                );
            });
            setFilteredExercises(filtered);
        }
    };

    const fetchExercisesWithFilters = async (filters) => {
        const { selectedMuscle, selectedEquipment, selectedIntensity } = filters;
        const url = `https://work-out-api1.p.rapidapi.com/search?Muscles=${selectedMuscle}&Equipment=${selectedEquipment}&Intensity_Level=${selectedIntensity}`;
        const headers = {
            'X-RapidAPI-Key': 'ada19aed84mshe7a269ed4737e51p108edcjsn0b3063e0b099',
            'X-RapidAPI-Host': 'work-out-api1.p.rapidapi.com'
        };
        try {
            const response = await fetch(url, { method: 'GET', headers });
            if (!response.ok) {
                throw new Error('Failed to fetch filtered exercise data');
            }
            const data = await response.json();
            setFilteredExercises(data);
        } catch (error) {
            console.error('Error fetching filtered exercise data:', error.message);
        }
    };

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

    return (
        <div style={{ maxWidth: '1360px'}}>
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
