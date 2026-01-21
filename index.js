// Get the display input
const display = document.getElementById("display");

// Create a variable to store the calculation
let expression = "";

// Select all calculator buttons
document
  .querySelectorAll(".calculator-btn button")

  // Loop through all buttons
  .forEach((button) => {
    // Add a click event to each button
    button.addEventListener("click", () => {
      // Read the button’s value
      let value = button.getAttribute("data-value");

      // Handle CLEAR (C)
      if (value === "C") {
        // Removes everything stored
        expression = "";

        // Clears the screen
        display.value = "";

        // Runs when the delete button is clicked
      } else if (value === "DEL") {
        // Removes the last character
        expression = expression.slice(0, -1);

        // Updates the screen
        display.value = expression;

        // Runs when equals is clicked
      } else if (value === "=") {
        // Try to calculate safely
        try {
          // Replaces all ^ with **
          let safeExpression = expression.replace(/\^/g, "**");

          // Calculate the expression
          expression = eval(safeExpression).toString();

          // Displays the answer on the screen
          display.value = expression;

          // Runs if the calculation fails
        } catch (error) {
          // Shows error message
          display.value = "Error";

          // Resets calculator safely
          expression = "";
        }
      } else {
        // Handle normal input (numbers & operators)
        expression += value; // Adds the new value to the expression
        display.value = expression; // Updates the screen immediately
      }
    });
  });


/* =======Allow keyboard input for the calculator========= */

document.addEventListener("keydown", (event) => {
  // Listen to any key press on the keyboard / Fires everytime a key is pressed
  const key = event.key; // Stores the exact key pressed / JS need to know the exact key

  //Handles Numbers and Decimals
  if (!isNaN(key) || key === ".") {
    // Checks if the keys is a number (0-9)
    expression += key;
    display.value = expression;
  }

  // JS Operators
  else if (["+", "-", "*", "/", "%"].includes(key)) {
    // Checks if the key is one of the operators
    expression += key; // Adds operator tot the expression
    display.value = expression;
  }

  // Power Operator (^)
  else if (key === "^") {
    // This is seperate cos it is not a JS operator
    expression += "^";
    display.value = expression;
  }

  // Backspace (Delete) / Detect when user presses Backspace
  else if (key === "Backspace") {
    expression = expression.slice(0, -1); // Delete the last character
    display.value = expression;
  }

  // Clear All (Escape Key)
  else if (key === "Escape") {
    expression = "";
    display.value = "";
  }

  // Enter Key (=)
  else if (key === "Enter") {
    // Serves as =
    try {
      let safeExpression = expression.replace(/\^/g, "**");
      expression = eval(safeExpression).toString(); // Calculate Results
      display.value = expression; // Display Result
    } catch {
      // Prevents crashes from Invalid input
      expression = ""; // Keeps the calculator Usable
      display.value = "ERROR";
      return;
    }
  }
});

