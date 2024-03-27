import React from 'react';

function ExerciseCard({ exercise, isFavorite, onToggleFavorite }) {
    const toggleFavorite = () => {
        // Call the onToggleFavorite function passed from the parent component
        onToggleFavorite(exercise);
    };
    //hides video url in link named Video Search
    const handleVideoClick = () => {
        window.open(exercise.Video, '_blank');
    };

    return (
        <div className="card" style={{ position: 'relative', maxWidth: '100%', maxHeight: '350px'}}>
            <div className="card-content" style={{ width: '250px', maxHeight: '250px'}}>
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
                <p style={{ lineHeight: '.5'}}>Beg: {exercise['Beginner Sets']}</p>
                <p style={{ lineHeight: '.5'}}>Int: {exercise['Intermediate Sets']}</p>
                <p style={{ lineHeight: '.5'}}>Exp: {exercise['Expert Sets']}</p>
                <p style={{ lineHeight: '1.0'}}>{exercise.Explaination}</p>
                <p
                    style={{ lineHeight: '1.0', cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={handleVideoClick}
                >
                    Video Search
                </p>
                {/* Hide the actual link */}
                <span style={{ display: 'none' }}>{exercise.Video}</span>
            </div>
        </div>
    );
}

export default ExerciseCard;
