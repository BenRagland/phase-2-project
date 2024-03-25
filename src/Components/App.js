import React, { useState } from 'react';
import Header from "./Header";
import ExerciseFilterForm from "./ExerciseFilterForm";
import DietJournal from "./DietJournal";
import ExerciseJournal from './ExerciseJournal';
import ExerciseList from './ExerciseList';
import MealFilterForm from './MealFilterForm';
import MealList from './MealList';


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
      <ExerciseJournal/>
      <ExerciseFilterForm
        selectedMuscle={exerciseFilters.Muscles}
        selectedEquipment={exerciseFilters.Equipment}
        selectedIntensity={exerciseFilters.Intensity_Level}
        onFilterChange={handleExerciseFilterChange}
      />
      {/* Pass exercise filters to ExerciseList */}
      <ExerciseList
        selectedMuscle={exerciseFilters.Muscles}
        selectedEquipment={exerciseFilters.Equipment}
        selectedIntensity={exerciseFilters.Intensity_Level}
      />
      <MealFilterForm onFilterChange={handleFilterChange} />
      <MealList mealFilters={mealFilters} />
     
    </div>
  );
}

export default App;
