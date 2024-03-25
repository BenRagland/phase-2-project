import React from "react";

function Header() {
  // Get today's date in the format YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  return (
    <header>
      <h1>Diet and Exercise Journal</h1>
      <div>
        <label htmlFor="dateInput">Date:</label>
        <input
          type="date"
          id="dateInput"
          name="date"
          defaultValue={today} // Set the default value to today's date
        />
      </div>
    </header>
  );
}

export default Header;