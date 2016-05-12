
//window.onload = function()

window.onload = function()
{

	var firstTime = true;
	var options = ["Skynet", "survivor", "combat", "extinction", "resistance", "cyborg"];
	var alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
	var userGuess = '';
	var gameInPlay = true;
	var guesses = 0;
	var wins = 0;
	var losses = 0;
	var letterPresent = false;
	var backgroundAudio = new Audio('assets/audio/TERMINATOR.mp3');
	var goodGuessAudio = new Audio('assets/audio/t1_excellent.mp3');
	var badGuessAudio = new Audio('assets/audio/t2_no_problemo.mp3');
	var winAudio = new Audio('assets/audio/terminator.wav');
	var loseAudio = new Audio('assets/audio/t3_terminated.mp3');
	var usedLetters = [];
	var duplicateEntry;
	var targetWord, targetLetters,resultArray  ;
	var maxMistakes = 6;
	backgroundAudio.addEventListener('ended', function() {
   	 	this.currentTime = 0;
    	this.play();
	}, false);


	generateArrays();
	updateDisplay();



	document.onkeyup = function(event) 
	{
	if (firstTime) {
		firstTime = false;
		backgroundAudio.play();
		//$("#winLoseMessage").fadeOut( );
		//$("#winLoseMessage").html( "");
		$("#welcome").fadeOut("slow");
		guesses = 0;
		generateArrays();
	}
	else
		$("#welcome").html("");
	{
		// Determines which exact key was selected. Make it lowercase
		userGuess = String.fromCharCode(event.keyCode).toLowerCase();

		if (/^[a-zA-Z]*$/g.test(userGuess))   {

			// check used letter array for duplicate entry

			if (usedLetters.some(checkLetter)) {
				$("#welcome").html(userGuess + " Has alread been selected.  Please try again");

			}
			else{
				$("#welcome").html("");

			// Check array to see if character is present
			letterPresent = targetLetters.some(checkLetter);
			if (letterPresent ==  true) {
				// If letter is preset search array and remove.
				for (var i = targetLetters.length - 1; i >= 0; i--) {		
					if (targetLetters[i] == userGuess) {
						// update guess array	
						resultArray[i] = userGuess;
						targetLetters[i] = '';
					}
				}

				updateDisplay();

			}
			else{
				// Increment the guess counter
				guesses++;
			}
			// Remove letter from alphabet array and replace with space
			for (var i = alphabet.length - 1; i >= 0; i--) {		
				if (alphabet[i] == userGuess) {	
					alphabet[i] = "";
				}
			}
			// add letter to used array
			usedLetters.push(userGuess);
			updateDisplay();
		}
	}
		else{
		//	$("#welcome").html("Is not a valid entry.  Please try again");
		}

		// Check if user wins
		if (resultArray.join("") == targetWord){
			wins++;
			backgroundAudio.pause();
			winAudio.play();
			firstTime = true;
			$("#welcome").html("Press any key to continue.");
			$("#welcome").fadeIn("slow");
		}
		else if (guesses >= maxMistakes) {
			losses++;
			backgroundAudio.pause();
			loseAudio.play();
			firstTime = true;
			$("#welcome").html("Press any key to continue.");
			$("#welcome").fadeIn("slow");
		}
	}
}

function updateDisplay(){
	$("#alphabet").html(alphabet.join(" "));
	$("#hiddenWord").html(resultArray.join(" "));
	$("#usedLetters").html(usedLetters.join(" "));
	$("#wins").html("    " + wins);
	$("#losses").html("   " + losses);
	$("#guessRemaining").html(maxMistakes - guesses);
	$("#guessUsed").html( guesses);
}

function generateArrays(){
	targetWord = options[Math.floor(Math.random()*options.length)];
	targetLetters = targetWord.split("");
	resultArray = targetWord.split("");
	alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
	// fill results array with "_" as placeholders
	resultArray.forEach(clearResultArray);
	usedLetters.length = 0;
	updateDisplay();
}

function checkLetter(targetLetters) {
    return targetLetters == userGuess;
}

function clearResultArray( item, index, arr) {
    arr[index] = "_";
}

}// window on_load
