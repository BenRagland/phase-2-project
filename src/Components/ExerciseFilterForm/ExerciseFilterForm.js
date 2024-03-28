import React, { useState } from 'react';
import styles from "./ExerciseFilterForm.module.css"

function ExerciseFilterForm({ onSubmit }) {
    const [selectedMuscle, setSelectedMuscle] = useState('');
    const [selectedEquipment, setSelectedEquipment] = useState('');
    const [selectedIntensity, setSelectedIntensity] = useState('');

    const muscles = ['Biceps', 'Triceps', 'Chest', 'Back', 'Legs', 'Abs', 'Stretching', 'Warm Up', 'Lats', 'Hamstring', 'Calves', 'Quadriceps', 'Trapezius', 'Shoulders', 'Glutes'];
    const equipment = ['Barbell', 'Dumbbells', 'EZ-bar', 'Kettlebell', 'Bench', 'Chest press machine'];
    const intensityLevels = ['Beginner', 'Intermediate', 'Expert'];
    //sets the values from the filter form
    const handleMuscleChange = (e) => {
        setSelectedMuscle(e.target.value);
    };

    const handleEquipmentChange = (e) => {
        setSelectedEquipment(e.target.value);
    };

    const handleIntensityChange = (e) => {
        setSelectedIntensity(e.target.value);
    };
    //submits form values to the exercise list
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            selectedMuscle,
            selectedEquipment,
            selectedIntensity
        });
    };

    return (
        <form onSubmit={handleSubmit}>
        <div className={styles.exerciseOptionsContainer}>
            <h4 className={styles.sectionTitle}>Exercise Options</h4>
            <div >
            <div className={styles.exerciseFilters}>
                <label>Muscle:</label>
                <input list="muscles" value={selectedMuscle} onChange={handleMuscleChange} />
                <datalist id="muscles">
                    {muscles.map((muscle, index) => (
                        <option key={index} value={muscle} />
                    ))}
                </datalist>
            
                <label>Equipment:</label>
                <input list="equipment" value={selectedEquipment} onChange={handleEquipmentChange} />
                <datalist id="equipment">
                    {equipment.map((item, index) => (
                        <option key={index} value={item} />
                    ))}
                </datalist>
            
                <label>Intensity Level:</label>
                <input list="intensityLevels" value={selectedIntensity} onChange={handleIntensityChange} />
                <datalist id="intensityLevels">
                    {intensityLevels.map((level, index) => (
                        <option key={index} value={level} />
                    ))}
                </datalist>
                <button type="submit" onSubmit={onSubmit}>Apply Filters</button>
            </div>
            </div>
            </div>
        </form>
    );
                                }

export default ExerciseFilterForm;

