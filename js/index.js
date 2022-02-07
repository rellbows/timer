// Description: Handles basic setup of the html page for the timer.
// Date: 2/6/22
// Author: Ryan Ellis

// Automatically fills in the specified dropdown box (based off id) with a
// sequential series of numbers up to the number specified. 
function autoFillDropdown(id, num) {
	
	// Target the dropdown we want to auto fill
	parentNode = document.getElementById(id);

	// Create and append the specified number of dropdown options to parent node
	for (var i = 0; i < num; i++) {
		
		// Making option element...
		var newOpt = document.createElement('option');

		// Appending the number for the option
		var optNum = document.createTextNode(i);

		newOpt.appendChild(optNum);

		parentNode.appendChild(newOpt);
	}
}

// Filling out the hour, min and second dropdowns.
autoFillDropdown('hrs-dropdown', 24);
autoFillDropdown('min-dropdown', 60);
autoFillDropdown('sec-dropdown', 60);