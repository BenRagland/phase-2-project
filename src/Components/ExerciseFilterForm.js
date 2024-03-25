import React, { useState } from 'react';

function ExerciseFilterForm() {
    const [selectedMuscle, setSelectedMuscle] = useState('');
    const [selectedEquipment, setSelectedEquipment] = useState('');
    const [selectedIntensity, setSelectedIntensity] = useState('');

    const muscles = ['Biceps', 'Triceps', 'Chest', 'Back', 'Legs', 'Abs', 'Stretching', 'Warm Up', 'Lats', 'Hamstring', 'Calves', 'Quadriceps', 'Trapezius', 'Shoulders', 'Glutes'];
    const equipment = ['Barbell', 'Dumbbells', 'EZ-bar', 'Kettlebell', 'Bench', 'Chest press machine'];
    const intensityLevels = ['Beginner', 'Intermediate', 'Expert'];

    const handleMuscleChange = (e) => {
        setSelectedMuscle(e.target.value);
    };

    const handleEquipmentChange = (e) => {
        setSelectedEquipment(e.target.value);
    };

    const handleIntensityChange = (e) => {
        setSelectedIntensity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        //filter options will persist  so they can be used for searchability
        console.log("Filters submitted:")

    };

    return (
        <form onSubmit={handleSubmit}>
        <div style={{ maxWidth: '900px' }}>
            <h4>Exercise Options</h4>
            <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
            <div>
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
                <button type="submit">Apply Filters</button>
            </div>
            </div>
            </div>
        </form>
    );
                                }

export default ExerciseFilterForm;