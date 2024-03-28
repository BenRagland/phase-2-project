# phase-2-project

Project Description -

An app that records your current daily exercises/diet intake and gives suggestions for both exercises and diet per parameters while also providing historical data.

Wireframe - See wireframe.drawio

User Stories - A useer will see a header with the title of the page, underneath which they will see a calendar which will have a default of 'today' but will be able to click on and select any date. On clicking a different date, all journal entries logged in their Exercise Journal and Diet Journals for that date will appear on the page. 
The Diet Journal and Exercise Journal will appear underneath this, side by side, both with input fields which will post to the page on submit as well as being recorded on our json server by entry date. The Exercise Options and Diet Options forms will display a random assortment of available exercses based on parameters from the MealFilterForm and ExerciseList respectively, both being able to take in multiple sets of parameters to filter through their databases. The forms will be empty upon initial render. 


<!-- User Stories - A user will see a header with the title of the page accompanied by date that will have a default of 'today' but they will be able to put in any date upon click.  They will be able to track and record daily meal intake and exercise routine through two separate journal components on page.  These components will be recorded by entry date.  These journal components will have input fields that will be populated with available meals/exercises from their relative APIs.  When the page loads, the user will see two separate columns displaying random indexes of meals/exercises based on parameters from the mealPlanning form and exercisePlanning form respectively.  The parameters will persist in state.  The user can select a button to view another random index of meals/exercises respectively.  At the bottom of the page, their will be two forms, one for mealPlanning and the other for ExercisePlanning.    The forms options will be empty upon initial render, but selected changes will persist.   The user will have the ability to see a graph upon click displaying previous exercise/calorie frequency upon click in the journal component.    -->

CRUD API routes -

Exercise API: `https://work-out-api1.p.rapidapi.com/search`

Diet API: `https://api.edamam.com/api/recipes/v2?`

Component Diagram - 


Example Data db.json - 

"dietJournalEntries": [
    {
      "meal": "french fries",
      "calories": 400,
      "category": "Lunch",
      "favorite": false,
      "period": "AM",
      "submitted": false,
      "dateStamp": "3/28/2024",
      "id": "f729"
    }
  ],

example of data for Exercises - should match Exercise API

{} 7keys
    Muscle:"Biceps"
    Work Out:"Barbell Curl"
    Sets:"3-4"
    Reps:"8-12"
    Breaks:1
    Equipments:"Barbell"
    Explaination:"Barbell Curl: Stand with feet shoulder-width apart, hold a barbell with an underhand grip and curl it towards your shoulders."

example of date for Meals - should match Meals API

"recipe": {
    "label": "Apple and Onion Chicken",
    "dietLabels": [
        "High-Protein",
        "Low-Sodium"
    ],
    "healthLabels": [
        "Mediterranean",
        "Dairy-Free",
    ],
    "cuisineType": [
    "american"
    ],
    "mealType": [
    "breakfast"
    ]
},
Stretch Goals - 

- favorite exercises which will persist
- favorite meals which will persist
<!-- ADD MORE -->

<!-- - set 3 daily initial exercises based on day of week.  First 3 input fields hold this as a placeholder.   User can add exercises.   
- set meals initially based on day.  This is done through the mealPlanningForm and will persist.   Initially all options set to false.    
- only offer meals/snacks based on time of day while using app
- let previous daily meals/exercises persist so the user can simply choose to re-select last weeks meal/exercises.    -->


<!-- Kanban Board - We should do this in Trello. -->
<!-- WAS THIS REQUIRED? ALSO, SHOULD WE LINK OUR FIGMA? -->