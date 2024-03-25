// import React, { useState } from 'react';

// //this is not finished. need handleDropDown button
// function App() {
//   const [inputText, setInputText] = useState('');
//   const [items, setItems] = useState([]);
// const [isDropped, setIsDropped] = useState(false)
  
// const handleInputChange = (event) => {
//     setInputText(event.target.value);
//   };

//   const handleSubmit = () => {
//     if (inputText.trim() !== '') {
//       setItems([...items, inputText]);
//       setInputText('');
//     }
//   };
// function handleDropDown() {
//     setIsDropped(!isDropped)

// }
//   return (
//     <div>
//       <input
//         type="text"
//         value={inputText}
//         onChange={handleInputChange}
//         placeholder="Enter item"
//       />
//       <button onClick={handleSubmit}>Submit</button>
//     {isDropped ? <div>Meal Plan</div> : ''}
//       <ul>
//         {items.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;