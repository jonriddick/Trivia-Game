$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initScreen() {
	startScreen = "<p class='text-center introText'>Through this trivia game you'll test your knowledge about Jon,<br> and perhaps learn a thing or three.<a class='btn btn-danger btn-lg btn-block start-button' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initScreen();

//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  // added line to test issue on GitHub Viewer
	generateHTML();

	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function generateHTML() {
	gameHTML = "<p class='text-center'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-danger btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

//reset the game
function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

//variables list
var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["Where was Jon born?", "What is Jon's least favorite food?", "Who are Jon's favorite 2 super heros?", "What is Jon's favorite hobby that doesn't involve guns or his pitbull?", "Which college did Jon graduate from?", "What is the name of Jon's pitbull?", "Which branch did Jon serve in?", "Why did Jon decide to get into web development?"];
var answerArray = [["Georgia", "North Carolina", "Ohio", "Colorado"], ["Broccoli","Olives","Pop Corn","Mango"], ["Captain America & Iron Man", "Dr Strange & Thor", "Deadpool & The Hulk", "Wolverine & Magneto"], ["Bike Riding","Hiking","Going to the Gym","Going to the Shooting Range"], ["He flunked out :(", "University of Georgia", "UNC Chapel Hill", "NC State"], ["Dallas Bro Pitbull","Austin Farts Alot","Jason Vorhizzle","Edward Scissorpaws"], ["Army", "Navy", "Marines", "Air Force"], ["He enjoys the challenges of web development","He believes there is a lot of opportunity in web development","He's wanted to make the change for a while now","All the above"]];
var imageArray = ["<img class='center-block img-center' src='assets/images/georgia.jpg'>", "<img class='center-block img-right' src='assets/images/olives.jpg'>", "<img class='center-block img-right' src='assets/images/hulkpool.jpg'>", "<img class='center-block img-right' src='assets/images/gym.jpg'>", "<img class='center-block img-right' src='assets/images/ncstate.jpg'>", "<img class='center-block img-right' src='assets/images/dallas.jpg'>", "<img class='center-block img-right' src='assets/images/usarmy.png'>", "<img class='center-block img-right' src='assets/images/all.jpg'>"];
var correctAnswers = ["A. Georgia", "B. Olives", "C. Deadpool & The Hulk", "C. Going to the Gym", "D. NC State", "A. Dallas Bro Pitbull", "A. Army", "D. All the above"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("sound/button-click.mp3");