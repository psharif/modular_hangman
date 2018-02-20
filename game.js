var Letter = require("./Letter.js");
var Word = require("./Word.js");
var inquirer = require("inquirer");

function Game(){ 

	this.guesses = 10; 
	this.correctGuesses = [];
	this.incorrectGuesses = [];
	this.gameWord = "";

	this.won = function(){
		return !this.gameWord.wordToString().includes("_");
	}

	this.startGame = function(){
		console.log("Welcome Let's Play a Game of Hangman.\n");
		this.gameWord = this.getWord();

		this.getUserGuess();
	}

}

Game.prototype.getWord = function(){
	//Get random word from dictionary
	return new Word("Guessing This Stuff Over Again");
}

Game.prototype.getUserGuess = function(){
	var tempGame = this; 
	inquirer.prompt([
	{
		type: "input", 
		message: "Guess a Letter: ", 
		name: "letterGuess"
	}
	]).then(function(response){
		if(tempGame.guesses > 0 && !tempGame.won()){
			var userInput = response.letterGuess;
			if(tempGame.correctGuesses.includes(userInput) || tempGame.incorrectGuesses.includes(userInput)){
				console.log("That Letter Has Been Guessed Already.");
				tempGame.getUserGuess();
			}

			tempGame.gameWord.checkGuess(userInput);

			if(tempGame.gameWord.wordToString().includes(userInput)){
				console.log("Correct!\n");
				tempGame.correctGuesses.push(userInput);
				console.log(tempGame.gameWord.wordToString());
				console.log("Wrong Guesses So Far:\n" + tempGame.incorrectGuesses.join("") + "\n");
				//console.log(this.Word.wordToString());
			}else{
				console.log("Incorrect!\n");
				tempGame.incorrectGuesses.push(userInput);
				console.log(tempGame.gameWord.wordToString());
				console.log("Wrong Guesses So Far:\n" + tempGame.incorrectGuesses.join("") + "\n");
				tempGame.guesses--;
				//console.log(this.Word.wordToString());
			}
			//Recursive Call
			tempGame.getUserGuess();
		}
		else {
			if(tempGame.won()){
				console.log("You Won!\n");
				tempGame.startOver();
			}
			else{
				console.log("Sorry You Lost.\n");
				tempGame.startOver();
			}
		}

	});
}

Game.prototype.startOver = function(){
	var tempGame = this; 
	inquirer.prompt([
	{
		type: "list", 
		message: "Would You like to Play Again?", 
		choices: ["Yes", "No"],
		name: "playAgain"
	}
	]).then(function(response){
		if(response.playAgain === "Yes"){
			tempGame.startGame();
		}
		else{
			console.log("Thanks For Playing.");
		}
	});
}

module.exports = Game;