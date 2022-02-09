// Description: Handles timer functionality.
// Date: 2/6/22
// Author: Ryan Ellis
// Notes: Used the below timer as reference for the timer functionality.
// Especially how the timer keeps track, and helper functions for handling
// the different time formats (converting back and forth between milliseconds
// and HH:MM:SS).
// https://www.timer.net/

/--TIMER LOGIC--/

class Timer{
	constructor(hrs, min, sec, silent) {
		this.hrs = hrs;
		this.min = min;
		this.sec = sec;
		this.silent = silent;
	}
	start() {
		var startTime = new Date();
		var endTime = toMilliseconds(this.hrs, this.min, this.sec, 0);

		// Note: Still not 100% on how the setInterval method works,
		// tried with 'this.XXXXXX' variables, and it does not work.
		// Due to something about what scope the setInterval method
		// is executed in - different from the scope, so
		// the data in the scope this object exists in isn't avaiable...
		var timeInterval = setInterval(function() {
			var elapsedTime = new Date() - startTime;
			document.getElementById('timer-display').innerHTML = (toHrsMinSec(endTime - elapsedTime + 1000));
			if(elapsedTime >= endTime) {
				// There's a little slop between exactly when interval executes and the
				// exact time. Can result in elapsed time being over just a bit,
				// and displaying a negative time (-1 hr, 59 min, 60 sec).
				document.getElementById('timer-display').innerHTML = '00:00:00';
				console.log('timer done!!!');
				clearInterval(timeInterval);
			}
		}, 0);
	}
}

// Helper function that converts HH, MM, and SS to milliseconds.
function toMilliseconds(hrs, min, sec, mSec) {
	var totalMilliseconds = 0;

	totalMilliseconds = hrs * 3600000;
	totalMilliseconds += min * 60000;
	totalMilliseconds += sec * 1000;
	totalMilliseconds += mSec

	return totalMilliseconds;
}

// Helper function to convert millisenconds to HH:MM:SS time format.
function toHrsMinSec(milliseconds) {
	var hrs = 0;
	var min = 0;
	var sec = 0;
	var strDigit = '';

	// Add leading 0 to single digit numbers
	function add0Digit(digit) {

		var tempStrDigit = '';

		if(digit < 10){
			tempStrDigit = '0' + digit.toString();
		}
		else {
			tempStrDigit = digit.toString();
		}

		return tempStrDigit;
	}

	// Get hours
	hrs = Math.floor(milliseconds / 3600000);
	milliseconds -= hrs * 3600000; // pull out time already calculated	
	strDigit = add0Digit(hrs) + ':';

	// Get minutes
	min = Math.floor(milliseconds / 60000);
	milliseconds -= min * 60000;
	strDigit += add0Digit(min) + ':';

	// Get seconds
	sec = Math.floor(milliseconds / 1000);
	milliseconds -= sec * 1000;
	strDigit += add0Digit(sec);

	return strDigit;
}

/-TIMER INTERACTION-/

var curTimer = document.getElementById('start-button');

curTimer.addEventListener('click', function() {

	//console.log("in listener...");
	
	// Getting time from dropdowns
	var curHrs = document.getElementById('hrs-dropdown').selectedIndex;

	var curMin = document.getElementById('min-dropdown').selectedIndex;

	var curSec = document.getElementById('sec-dropdown').selectedIndex;

	// TODO: have silent set to default to true for now, need to update once funct. implemented.
	timer = new Timer(curHrs, curMin, curSec, true);
	timer.start();
}, false)