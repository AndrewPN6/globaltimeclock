// This is the main JavaScript file for the Timezone Clock application.
// It initializes the application, sets up the timezone functionality, and handles user interactions.

// Import necessary libraries and styles
const dayjs = require('dayjs'); 
const localizedFormat = require('dayjs/plugin/localizedFormat');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const { default: MicroModal } = require('micromodal');
MicroModal.init();

const ct = require("countries-and-timezones");
const timezones = ct.getAllTimezones();

// Select DOM elements for displaying time, date, and timezone
// Also select the dropdown menu and input field for timezone selection
const time = document.querySelector('#time');
const date = document.querySelector('#date');
const displayTimezone = document.querySelector('#timezone');
const timezoneInput = document.querySelector("#tz");
const dropdownMenu = document.querySelector(".dropdownmenu");
const dropdown = document.querySelector("#myDropdown");
let currentTimezone = dayjs.tz.guess(); // Guess the user's current timezone using dayjs (see dayjs documentation for more details)

displayTimezone.textContent = currentTimezone; // Display the guessed timezone on page load

// Set repeated time and date by calling the setInterval function which creates a continuous interval 
// Used the dayjs package to get date format. If you want to know more about dayjs, read the documentation
setInterval(function()
{
    const  tzLocalTime = dayjs.utc(dayjs().format()).tz(currentTimezone); // Get the current time in the user's timezone
    time.innerHTML = tzLocalTime.format('LTS'); // Format the time to display hours, minutes, and seconds (see dayjs documentation for more details)
    date.innerHTML = tzLocalTime.format('LL'); // Format the date to display the full date (see dayjs documentation for more details)

}, 1000); // Update every 1 second

// Populate the dropdown menu with timezones from the countries-and-timezones package (see the package documentation for more details)
//Object.keys(timezones) returns an array of all available timezones
for(let i=0; i<Object.keys(timezones).length; i++){
    const a = document.createElement('a'); // Create a new anchor element for each timezone
    a.innerHTML = Object.keys(timezones)[i]; // Set the inner HTML of the anchor to the timezone name
    dropdownMenu.appendChild(a); // Append the anchor to the dropdown menu

}

// Add event listeners to handle timezone selection from the dropdown menu
dropdownMenu.addEventListener('click',(e)=>{
    timezoneInput.value = e.target.innerHTML; // Update the timezone input field with the selected timezone
    document.querySelector(".dropdownmenu").classList.toggle("show"); // Toggle the visibility of the dropdown menu to hide it after selection
});

// Add event listener to the timezone input field to update the displayed timezone
document.querySelector('.input-caret').addEventListener('click', (e)=>{
    document.querySelector(".dropdownmenu").classList.toggle("show"); // Toggle the visibility of the dropdown menu when the caret span is clicked
});

// Add event listener to the close button to update the displayed timezone when the modal is closed
document.querySelector(".close-button").addEventListener('click', e=>{
    if(!timezoneInput.value) return; // If no timezone is selected, do nothing
    currentTimezone = timezoneInput.value; // Else, update the current timezone with the selected value
    displayTimezone.innerHTML = currentTimezone; // Update the displayed timezone
    
});



