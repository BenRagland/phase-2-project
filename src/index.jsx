import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import ExerciseDetailPage from './Components/ExerciseDetailPage/ExerciseDetailPage'; // Import ExerciseDetailPage
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import FoodProduct from './Components/FoodProduct/FoodProduct';

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
        path: "/ExerciseDetailPage",
        element: <ExerciseDetailPage/>
      },
  ])
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<RouterProvider router={router} />);

createRoot(root).render(
  <Router>
    <Navigate>
        <Route path="/FoodProduct" element={FoodProduct} />
        <Route path="/exercise/:workoutName" >
               <ExerciseDetailPage /> 

        </Route>
        <Route path="/" element={<App />} />
    </Navigate>
  </Router>
);