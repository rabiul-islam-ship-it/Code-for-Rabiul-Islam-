// Select elements once instead of querying repeatedly
const numbersHours = document.querySelector(".numbers_Hours"); // Container for hour numbers
const barSeconds = document.querySelector(".bar-seconds"); // Container for second bars
const handHours = document.querySelector(".hand.hours"); // Hour hand element
const handMinutes = document.querySelector(".hand.minutes"); // Minute hand element
const handSeconds = document.querySelector(".hand.seconds"); // Second hand element
const wrapper = document.querySelector(".wrapper"); // Wrapper element for the clock

// Generate hour numbers (0 to 12) dynamically and efficiently
const NumberElement = Array.from(
  { length: 13 },
  (_, i) => `<span style="--index:${i};"><p>${i}</p></span>` // Each hour number has a custom CSS variable for positioning
).join(""); // Join the array into a single HTML string

// Generate second bars (0 to 60) dynamically
const barElement = Array.from(
  { length: 61 },
  (_, i) => `<span style="--index:${i};"><p></p></span>` // Each bar also uses a CSS variable for positioning
).join(""); // Join the array into a single HTML string

// Insert the generated hour numbers and second bars into the respective containers
numbersHours.innerHTML = NumberElement; // Add hour numbers to the DOM
barSeconds.innerHTML = barElement; // Add second bars to the DOM

// Function to update the clock hands based on the current time
function updateClock() {
  const now = new Date(); // Get the current date and time
  const hours = now.getHours(); // Current hour (0-23)
  const minutes = now.getMinutes(); // Current minute (0-59)
  const seconds = now.getSeconds(); // Current second (0-59)

  // Calculate the rotation angle for each hand and apply it
  handHours.style.transform = `rotate(${hours * 30 + minutes / 2}deg)`; // Each hour is 30 degrees, add offset for minutes
  handMinutes.style.transform = `rotate(${minutes * 6}deg)`; // Each minute is 6 degrees
  handSeconds.style.transform = `rotate(${seconds * 6}deg)`; // Each second is 6 degrees
}

// Function to change the clock background color
function changeClockBackground(color) {
  wrapper.style.backgroundColor = color; // Apply the selected background color to the wrapper
}

// Example: Allow user to change background color via input
const colorInput = document.createElement("input"); // Create an input element
colorInput.type = "color"; // Set input type to color picker
colorInput.addEventListener("input", (e) =>
  changeClockBackground(e.target.value)
); // Listen for color changes

// Append the color picker to the body
document.body.appendChild(colorInput);

// Initialize the clock hands to the current time
updateClock();

// Update the clock hands every second
setInterval(updateClock, 1000);
