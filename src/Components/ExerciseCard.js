import React from 'react';

function ExerciseCard({ exercise, isFavorite, onToggleFavorite }) {
    const toggleFavorite = () => {
        // Call the onToggleFavorite function passed from the parent component
        onToggleFavorite(exercise);
    };

    return (
        <div className="card" style={{ position: 'relative', width: '300px' }}>
            <div className="card-content">
                <button
                    className="favorite-button"
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: isFavorite ? 'yellow' : 'black'
                    }}
                    onClick={toggleFavorite}
                >
                    &#9733;
                </button>
                <h4>{exercise.WorkOut}</h4>
                <p style={{ lineHeight: '.5' }}>Beg: {exercise['Beginner Sets']}</p>
                <p style={{ lineHeight: '.5' }}>Int: {exercise['Intermediate Sets']}</p>
                <p style={{ lineHeight: '.5' }}>Exp: {exercise['Expert Sets']}</p>
                <p style={{ lineHeight: '1.0' }}>{exercise.Explaination}</p>
                <p style={{ lineHeight: '1.0' }}>Video: {exercise.Video} </p>
            </div>
        </div>
    );
}

export default ExerciseCard;
