// Create an array that lists out all of the options




window.onload = function()
{
    



//var options = [	"geography", "cat", "yesterday", "java"];



var options = ["Skynet", "survivor", "combat", "extinction", "resistance", "cyborg"];
var alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
var userGuess = '';
var gameInPlay = true;
var guesses = 0;
var wins = 0;
var losses = 0;
var ties = 0;
var letterPresent = false;
var backgroundAudio = new Audio('assets/audio/TERMINATOR.mp3');
var goodGuessAudio = new Audio('assets/audio/t1_excellent.mp3');
var badGuessAudio = new Audio('assets/audio/t2_no_problemo.mp3');
var winAudio = new Audio('assets/audio/t2_hasta_la_vista.mp3');
var loseAudio = new Audio('assets/audio/t3_terminated.mp3');
var usedLetters = [];
var targetWord, targetLetters,resultArray  ;
var maxMistakes = 6;

generateArrays();
// Start background music
backgroundAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
backgroundAudio.play();


goodGuessAudio.loop = false;
// Load additional audio here <<<<<<<<<<<<<<<<
//goodGuessAudio.addEventListener('ended', function() {
    //this.currentTime = 0;
//    this.play();
//}, false);

//var audio = new Audio('audio_file.mp3');
//audio.play();



badGuessAudio.addEventListener('ended', function() {
    //this.currentTime = 0;
    this.play();
}, false);

// This section for debug only
document.getElementById("alphabet").innerHTML= alphabet.join(" ");
//document.getElementById("revealedWord").innerHTML= resultArray.join(" ");
document.getElementById("hiddenWord").innerHTML= resultArray.join(" ");

console.log("Hidden word: " + targetLetters);
console.log("Revealed word: " + resultArray);




// Captures Key Clicks
document.onkeyup = function(event) 
{

document.getElementById("welcome").innerHTML= " ";



	// Determines which exact key was selected. Make it lowercase
	userGuess = String.fromCharCode(event.keyCode).toLowerCase();

	// Check if user input is letter.  If not alert.
	if (/^[a-zA-Z]*$/g.test(userGuess) && gameInPlay)   {


//      starting here move code to object

// call isLetterPresent(userGuess)


		// Check array to see if character is present
		letterPresent = targetLetters.some(checkLetter);



		if (letterPresent ==  true) {

			// If letter is preset search array and remove.
			for (var i = targetLetters.length - 1; i >= 0; i--) {		
				if (targetLetters[i] == userGuess) {
				// update guess array	
					resultArray[i] = userGuess;
					targetLetters[i] = '';
				}// if 	(targetLetter
			}// for (var i = targetLetters
			document.getElementById("hiddenWord").innerHTML= resultArray.join(" ");

		//	goodGuessAudio.play();
		}//  (letterPresent 
		else{
			// Increment the guess counter
			guesses++;
		//	badGuessAudio.play();
			//badGuessAudio.pause();
		}// else
		// Remove letter from alphabet array and replace with space
		for (var i = alphabet.length - 1; i >= 0; i--) {		
			if (alphabet[i] == userGuess) {	
				alphabet[i] = '-';
			}// if	
		}// for (var i =

		// add letter to used array
		usedLetters.push(userGuess);

		document.getElementById("alphabet").innerHTML = alphabet.join(" ");
		//document.getElementById("revealedWord").innerHTML= resultArray.join(" ");
		document.getElementById("usedLetters").innerHTML = usedLetters.join(" ");
		document.getElementById("guessRemaining").innerHTML = ("Guesses remaining: "+ (maxMistakes - guesses));
		document.getElementById("guessUsed").innerHTML = ("Guesses used: " + guesses);


	}// if (/^[a-zA-Z]*$/g.






	else{
		alert(userGuess + "Is not a valid entry.  Please try again");
	}// else



	///////////////////////////////////////////////////////////////////////////////


	// Check if user wins
	if (resultArray.join("") == targetWord){
		wins++;
		alert('You win!!!')
			// Reset with new word
			gameInPlay = true;
			guesses = 0;
			generateArrays();
	}// if
	else if (guesses > maxMistakes) {
		losses++;
		alert('You lose');
		guesses = 0;
		generateArrays();
	}// else if

	///////////////////////////////////////////////////////////////////////////////
}



function generateArrays(){
	targetWord = options[Math.floor(Math.random()*options.length)];
	// Convert sting to char array 
	targetLetters = targetWord.split("");
	resultArray = targetWord.split("");
	alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
	// fill results array with "_" as placeholders
	resultArray.forEach(clearResultArray);
	usedLetters.length = 0;

	// This section for debug only
	document.getElementById("alphabet").innerHTML= alphabet.join(" ");
	document.getElementById("hiddenWord").innerHTML= resultArray.join(" ");

	document.getElementById("usedLetters").innerHTML= usedLetters.join(" ");
	document.getElementById("wins").innerHTML= ("Skynet Defeated: " + wins);
	document.getElementById("losses").innerHTML= ("Rise of the Machines: " + losses);
	}


	function checkLetter(targetLetters) {
    	return targetLetters == userGuess;
	}

function clearResultArray( item, index, arr) {
    arr[index] = "_";
}// clearResultArray




var hangMan = {

	options: ["Skynet", "survivor", "combat", "extinction", "resistance", "cyborg"],
	alphabet : "abcdefghijklmnopqrstuvwxyz".split(''),
	userGuess : '',
	gameInPlay : true,
	guesses : 0,
	wins : 0,
	losses : 0,
	ties : 0,
	letterPresent : false,
	backgroundAudio : new Audio('assets/audio/TERMINATOR.mp3'),
	goodGuessAudio : new Audio('assets/audio/t1_excellent.mp3'),
	badGuessAudio : new Audio('assets/audio/t2_no_problemo.mp3'),
	winAudio : new Audio('assets/audio/t2_hasta_la_vista.mp3'),
	loseAudio : new Audio('assets/audio/t3_terminated.mp3'),
	usedLetters :[],
	targetWord, targetLetters,resultArray,
	maxMistakes : 6,






	generateArrays: function (){
		targetWord = options[Math.floor(Math.random()*options.length)];
		// Convert sting to char array 
		targetLetters = targetWord.split("");
		resultArray = targetWord.split("");
		alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
		// fill results array with "_" as placeholders
		resultArray.forEach(clearResultArray);
		usedLetters.length = 0;

		// This section for debug only
		document.getElementById("alphabet").innerHTML= alphabet.join(" ");
		document.getElementById("hiddenWord").innerHTML= resultArray.join(" ");

		document.getElementById("usedLetters").innerHTML= usedLetters.join(" ");
		document.getElementById("wins").innerHTML= ("Skynet Defeated: " + wins);
		document.getElementById("losses").innerHTML= ("Rise of the Machines: " + losses);
	},


	checkLetter: function (targetLetters) {
  	  	return targetLetters == userGuess;
	},

	clearResultArray: function ( item, index, arr) {
    arr[index] = "_";
}



}



}// window on_load



