import React, { useState } from 'react';
import Header from "./Header/Header";
import ExerciseFilterForm from "./ExerciseFilterForm/ExerciseFilterForm";
import DietJournal from "./DietJournal/DietJournal";
import ExerciseJournal from './ExerciseJournal/ExerciseJournal';
import ExerciseList from './ExerciseList/ExerciseList';
import MealFilterForm from './MealFilterForm';
import MealList from './MealList/MealList';

const App = () => {
  // State for exercise filters
  const [exerciseFilters, setExerciseFilters] = useState({
    Muscles: '',
    Equipment: '',
    Intensity_Level: ''
  });

  // Handler for updating exercise filters
  const handleExerciseFilterChange = (filterName, value) => {
    setExerciseFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };


  const [mealFilters, setMealFilters] = useState({
    calorieMin: '',
    calorieMax: '',
    selectedMealType: '',
    selectedCuisineType: '',
    selectedDiets: [],
    selectedHealth: []
  });

  // Function to update filter options
  const handleFilterChange = (newFilters) => {
    setMealFilters(newFilters);
  };
  

  return (
    <div className="app">
      <Header/>   
      <DietJournal/>
      <ExerciseJournal
      onFilterChange={handleExerciseFilterChange}
      />
      
      
      {/* Pass exercise filters to ExerciseList */}
      <ExerciseList
      selectedMuscle={exerciseFilters.Muscles}
      selectedEquipment={exerciseFilters.Equipment}
      selectedIntensity={exerciseFilters.Intensity_Level}
      exerciseFilters={exerciseFilters}
      setExerciseFilters={setExerciseFilters}
      handleExerciseFilterChange={handleExerciseFilterChange} // Pass the function as a prop
/>
      <MealFilterForm onFilterChange={handleFilterChange} />
      <MealList mealFilters={mealFilters} />
    </div>
  );
}

export default App;
