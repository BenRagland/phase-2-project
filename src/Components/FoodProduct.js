import React, { useState, useEffect } from 'react';

const FoodProduct = () => {
  const [productData, setProductData] = useState(null);
  const [calories, setCalories] = useState('');
  const [diet, setDiet] = useState('');
  const [cuisine, setCuisine] = useState('');

  useEffect(() => {
    // API
    fetch('API')
      .then(response => response.json())
      .then(data => setProductData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="food-product">
      {productData && (
        <div className="square-template">
          <div className="product-info">
            <h2>{productData.name}</h2>
            <p>{productData.description}</p>
            <p>Price: ${productData.price}</p>
          </div>
          <div className="input-categories">
            <input
              type="text"
              placeholder="Calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
            <input
              type="text"
              placeholder="Diet"
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
            />
            <input
              type="text"
              placeholder="Cuisine"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodProduct;
