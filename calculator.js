var input = document.querySelector("#input");
var numberBtns = document.querySelectorAll(".number");
var operatorBtns = document.querySelectorAll(".operator");
var calChain = document.querySelector("#calChain"); // show calculation chain on screen
var inputLog = ""; // keep track of the calculation
var ans = ""; //stores answer for the next calculation
var operatorList = ["+", "-", "/", "×", "*"];


init();

function init() {
	displayNumbers();
	displayDecimal();
	displayOperator();
	displayResult();
	clearAll();
	clearEntry();
}

// AC button event handler
function clearAll() {
	document.querySelector("#AC").addEventListener("click", function() {
		input.textContent = "0";
		inputLog = "";
		ans = "";
		calChain.textContent = "0";
	});
}

// CE button event handler
function clearEntry() {
	document.querySelector("#CE").addEventListener("click", function() {
		if (inputLog !== "" + ans) {
			inputLog = inputLog.slice(0, inputLog.length - 1);
			input.textContent = "0";
			calChain.textContent = inputLog;
		} else {
			input.textContent = "0";
			inputLog = "";
			calChain.textContent = "0";
		}		
	});
}

function displayNumbers() {
	for (var i = 0; i < numberBtns.length; i++) {
		numberBtns[i].addEventListener("click", function() {
			// after the oprator button is clicked, hide the operator and display the number
			if (operatorList.indexOf(input.textContent[0]) !== -1) {
				input.textContent = input.textContent.slice(1, input.textContent.length);
			}

			// if input.textContent or inputLog is 0 or equal to answer (when the equal button clicked), then overwrite it with the button value; otherwise concatenate the new value
			input.textContent === "0" || input.textContent === "" + ans ? input.textContent = this.value: input.textContent += this.value;
			inputLog === "0" || inputLog === "" + ans ? inputLog = this.value: inputLog += this.value;
			calChain.textContent = inputLog;
			displayMultiplicationSymbol();
			maxDigitControl();
			console.log(inputLog);
		});
	}
}

// prevents more than one decimal mark
function displayDecimal() {
	document.querySelector("#decimal").addEventListener("click", function() {
		if (input.textContent.indexOf(".") === -1) {
			if (input.textContent === "" + ans && inputLog === "" + ans) {
				input.textContent = "0";
				inputLog = "0";
			} 
			input.textContent += ".";
			inputLog += ".";
		} 
	});
}

// replace the × with * when display on screen
function displayMultiplicationSymbol() {
	if (calChain.textContent.indexOf("*") !== -1) {
		calChain.textContent = calChain.textContent.replace("*", "×");
	}
}

function displayOperator() {
	for (var i = 0; i < operatorBtns.length; i++) {
		operatorBtns[i].addEventListener("click", function() {
			if ( operatorCheck(inputLog) ) {
				inputLog += this.value;
				input.textContent = this.textContent;
				calChain.textContent = inputLog;
				displayMultiplicationSymbol();
				// console.log("input text content: " + input.textContent);
				// console.log("input log: " + inputLog);
			}			
		});
	}
}

// prevents more than one operator appear next to each other
function operatorCheck(str) {
	// if the last character of inputLog is NOT an operator, return true to allow user to click on any operator button
	// otherwise, disable all operator buttons  
	var lastCharacter = str[str.length - 1];

	if (lastCharacter !== "-" && lastCharacter !== "+" && lastCharacter !== "*" && lastCharacter !== "/") {
		return true;
	}
}

// rounds the float number to the maximum decimal places that the screen digit limit allows
function round(str) {
	var maxDecimalPlaces = 9 - str.indexOf(".") - 1;
	var num = Number(str);
	return num.toFixed(maxDecimalPlaces);
}

// control maximum digit displayed on screeen
function maxDigitControl() {
	if (input.textContent.length > 9 || ans.toString().length > 9) {
		calChain.textContent = "DIGIT LIMIT MET";
		input.textContent = input.textContent.slice(0, 9);
		inputLog = input.textContent;

	}
}

function displayResult() {
	document.querySelector("#equal").addEventListener("click", function() {
		ans = eval(inputLog); // calculate the inputLog, assign it to ans
		// if ans is a float number and its length is greater than 9, then convert it to a string and pass it to the round function
		if (ans.toString().length > 9) { 
			ans = round("" + ans);
		}

		input.textContent = ans;
		calChain.textContent = inputLog + "=" + ans;
		inputLog = "" + ans;
		
		maxDigitControl();
		console.log("inputLog:" + inputLog);
		console.log("calChain: " + calChain.textContent);
	});
}
