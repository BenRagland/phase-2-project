// import React, { useEffect } from 'react';


// const SearchBar = () => {
//     const APP_ID = "5218fd09";
//     const APP_KEY = "6f026eb8600d0aae8b2a2639aa0e6ec5"; 
//     const [query, setQuery] = useState("")
//     const [recipes, setRecipes] = useState([])

//     useEffect(() => {
//       fetch(`https://api.edamam.com/api/recipes/v2?type=any&beta=true&q=${query}
//       &app_id=${APP_ID}
//       &app_key=${APP_KEY}
//       &diet=high-protein
//       &health=gluten-free
//       &cuisineType=American
//       &mealType=Breakfast
//       &calories=calories%3D100-1200
//       &random=true&field=
//       `)
//         .then(response => {
//           if (response.ok) {
//             return response.json();
//           } else {
//             console.error('Could not fetch data');
//           }
//         })
//         .then(data => {
//           console.log(data);
//           setRecipes(result.data.hits)
//           setQuery("");//reset search bar after submit
//         });
//     }, []);

//     const onChange = (e) => {
//         console.log(e.target.value)
//         setQuery(e.target.value)
//     }
  
//     return null;//JSX
//   };

//   export default SearchBar;