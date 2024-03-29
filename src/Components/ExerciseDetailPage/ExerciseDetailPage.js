import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ExerciseDetailPage() {
  const { workoutName } = useParams(); // Get the workoutName from the URL params
  const [exerciseDetails, setExerciseDetails] = useState(null);
  console.log(workoutName)

  useEffect(() => {
    // Fetch exercise details based on the workoutName
    fetchExerciseDetails(workoutName);
  }, [workoutName]);

  const fetchExerciseDetails = async (name) => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'ada19aed84mshe7a269ed4737e51p108edcjsn0b3063e0b099',
        'X-RapidAPI-Host': 'work-out-api1.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(`https://work-out-api1.p.rapidapi.com/search`, options);
      if (!response.ok) {
        throw new Error('Failed to fetch exercise details');
      }
      const exerciseData = await response.json();
      setExerciseDetails(exerciseData);
    } catch (error) {
      console.error('Error fetching exercise details:', error);
    }
  };

  if (!exerciseDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{exerciseDetails.WorkOut}</h2>
      <p>Beg: {exerciseDetails['Beginner Sets']}</p>
      <p>Int: {exerciseDetails['Intermediate Sets']}</p>
      <p>Exp: {exerciseDetails['Expert Sets']}</p>
      <p>{exerciseDetails.Explanation}</p>
      <p>Video: <a href={exerciseDetails.Video} target="_blank" rel="noopener noreferrer">Watch Video</a></p>
    </div>
  );
}

export default ExerciseDetailPage;