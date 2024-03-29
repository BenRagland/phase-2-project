import React, { useState } from 'react';
import Header from "./Header/Header";
import DietJournal from "./DietJournal/DietJournal";
import ExerciseJournal from './ExerciseJournal/ExerciseJournal';
import ExerciseList from './ExerciseList/ExerciseList';
import MealFilterForm from './MealFilterForm/MealFilterForm';
import MealList from './MealList/MealList';
import styles from './App.module.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import FoodProduct from './FoodProduct/FoodProduct';
import ExerciseDetailPage from './ExerciseDetailPage/ExerciseDetailPage'; // Import ExerciseDetailPage



const App = () => {
  // State for exercise filters
  const [exerciseFilters, setExerciseFilters] = useState({
    Muscles: '',
    Equipment: '',
    Intensity_Level: ''
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>
    }, 
    {
      path: "/FoodProduct",
      element: <FoodProduct/>
    },
    {
      path: "/MealFilterForm",
      element: <MealFilterForm/>
    },
    {
        path: "/ExerciseDetailPage",
        element: <ExerciseDetailPage/>
      },
  ])



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
    
      <div className={styles.appContainer}>
        <Header/>
        <div className={styles.journalsContainer}>
          <DietJournal/>
          <ExerciseJournal onFilterChange={handleExerciseFilterChange} />
        </div>
        {/* Pass exercise filters to ExerciseList */}
        <ExerciseList
          selectedMuscle={exerciseFilters.Muscles}
          selectedEquipment={exerciseFilters.Equipment}
          selectedIntensity={exerciseFilters.Intensity_Level}
          exerciseFilters={exerciseFilters}
          setExerciseFilters={setExerciseFilters}
          handleExerciseFilterChange={handleExerciseFilterChange}
        />
        <MealFilterForm onFilterChange={handleFilterChange} />
        <MealList />
        
      </div>
      
    
  );
}

export default App;