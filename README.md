# phase-2-project

Project Description -

An app that records your current daily exercises/diet intake and gives suggestions for both exercises and diet per parameters while also providing historical data.

Wireframe - See wireframe.drawio

User Stories - A user will see a header with the title of the page accompanied by date that will have a default of 'today' but they will be able to put in any date upon click.  They will be able to track and record daily meal intake and exercise routine through two separate journal components on page.  These components will be recorded by entry date.  These journal components will have input fields that will be populated with available meals/exercises from their relative APIs.  When the page loads, the user will see two separate columns displaying random indexes of meals/exercises based on parameters from the mealPlanning form and exercisePlanning form respectively.  The parameters will persist in state.  The user can select a button to view another random index of meals/exercises respectively.  At the bottom of the page, their will be two forms, one for mealPlanning and the other for ExercisePlanning.    The forms options will be empty upon initial render, but selected changes will persist.   The user will have the ability to see a graph upon click displaying previous exercise/calorie frequency upon click in the journal component.   

CRUD API routes -


Component Diagram - 


Example Data db.json - 

example of data for Exercises - should match Exercise API

example of date for Meals - should match Meals API


Stretch Goals - 

- set 3 daily initial exercises based on day of week.  First 3 input fields hold this as a placeholder.   User can add exercises.   
- set meals initially based on day.  This is done through the mealPlanningForm and will persist.   Initially all options set to false.    
- only offer meals/snacks based on time of day while using app
- let previous daily meals/exercises persist so the user can simply choose to re-select last weeks meal/exercises.   


Kanban Board - We should do this in Trello.