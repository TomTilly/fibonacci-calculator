// Declare and assign variables

var fibonacciInput = document.getElementById("fibonacciInput");
var submitButton = document.getElementById('submit');
var errorMsg = document.getElementById('errorMsg');
var fiboNumber = document.getElementById('fiboNumber');
var fiboSentence = document.getElementById('fiboSentence');
var extension;
var temp, n, nMinus1, i;						// Needed to calculate Fibonacci numbers

// Function called when DOM content loaded, puts input in focus

function putInFocus() {
	fibonacciInput.focus();
}

// Function to get current year and input it into copyright year in footer

function getYear() {
	var date = new Date();
	var currentYear = document.getElementsByClassName('currentYear')[0];
	currentYear.textContent = date.getFullYear();
}


// Add Event Listener to page that waits for the DOM Content to load and then calls putInFocus function

if (window.addEventListener) {
	window.addEventListener('DOMContentLoaded', putInFocus, false);
} else { // IE8 Fallback
	window.attachEvent('onDOMContentLoaded', putInFocus);
}

// Adds Event Listener to page that waits for the DOM Content to load and then loads current year in the footer

if (window.addEventListener) {
	window.addEventListener('DOMContentLoaded', getYear, false);
} else {
	window.attachEvent('onDOMContentLoaded', getYear);
}

// Find appropriate extension of numbers

function findExtension(formValue) {
	var indexOfLastNumber = (formValue.length - 1);
	var lastNumber = formValue.charAt(indexOfLastNumber);
	if (lastNumber == 1) {
		if (formValue.charAt(indexOfLastNumber - 1) == 1) {
			extension = 'th';
		} else {
			extension = 'st';
		}
	} else if (lastNumber == 2) {
		if (formValue.charAt(indexOfLastNumber - 1) == 1) {
			extension = 'th';
		} else {
			extension = 'nd';
		}
	} else if (lastNumber == 3) {
		if (formValue.charAt(indexOfLastNumber - 1) == 1) {
			extension = 'th';
		} else {
			extension = 'rd';
		}
	} else {
		extension = 'th';
	}
	return extension;
}
	
// Check for letters in form input

function checkInput(formValue) {
	if (formValue < 1) {
		errorMsg.textContent = "Please enter a number 1 or greater...";
		return false;
	}
	for (i = 0; i < formValue.length; i++) {
		if (formValue.charAt(i) != 0 && formValue.charAt(i) != 1 && formValue.charAt(i) != 2 && formValue.charAt(i) != 3 && formValue.charAt(i) != 4 && formValue.charAt(i) != 5 && formValue.charAt(i) != 6 && formValue.charAt(i) != 7 && formValue.charAt(i) != 8 && formValue.charAt(i) != 9) {
			errorMsg.textContent = 'Please enter numbers only';
			return false;
		}
	}
	if (formValue.length > 3) {
		errorMsg.textContent = 'Maximum 3 character limit';
		return false;
	}
	errorMsg.textContent = '';
	return true;
}

//	Click button event

function calculateFibo(e) {
	if (!e) {								// IE8 Event object check
		e = window.event;
	}
	
	// Prevent default action of click button
	
	if (e.preventDefault) {
		e.preventDefault();
	} else {
		e.returnValue = false;
	}
	
	// Check value from form input
	
	var formValue = fibonacciInput.value;
	
	// Display error if more than 4 characters are entered
	if (checkInput(formValue)) {
		if (formValue < 2) {
			n = 1;
		} else {
			n = 1;
			nMinus1 = 1;
			for (i = 2; i < formValue; i++) {
				temp = nMinus1 + n;
				nMinus1 = n;
				n = temp;
			}
		}	
		extension = findExtension(formValue);
		fiboNumber.textContent = n;
		fiboSentence.innerHTML = 'The <span class="bold number">' + formValue + extension + '</span> term in the Fibonacci Sequence is <span class="bold number">' + n + '</span>.';
	}
}
// Listen for click on form element
		
if (submitButton.addEventListener) {
	submitButton.addEventListener('click', calculateFibo, false);
} else {															// IE8 Fallback
	submitButton.attachEvent('onclick', calculateFibo);
}