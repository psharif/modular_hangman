var Letter = require("./Letter.js");
var Word = require("./Word.js");
var inquirer = require("inquirer");

function Game(){ 

	this.guesses = 10; 
	this.correctGuesses = [];
	this.incorrectGuesses = [];
	this.gameWord = "";

	this.guessesLeft = function(){
		return this.guesses - this.incorrectGuesses.length;
	}

	this.won = function(){
		return this.correctGuesses.join("") === this.gameWord.wordToString();
	}

	this.alreadyGuessed = function(ch){
		return (correctGuesses.includes(ch) || incorrectGuesses.includes(ch));
	}
	//Probably Won't Use
	this.userGuess = function(ch){
		this.gameWord.checkGuess(ch);
		return "guessed";
	}

	this.correctGuess = function(ch){
		return this.gameWord.wordToString().includes(ch);
	}

	this.startGame = function(){
		console.log("Welcome Let's Play a Game of Hangman.\n");
		this.gameWord = this.getWord();
		this.getUserGuess();
	}

}

GameEngine.prototype.getWord = function(string){
	//Get random word from dictionary
	return new Word("Guessing This Stuff Over Again");
}

GameEngine.prototype.getUserGuess = function(){
	inquirer.prompt([
	{
		type: "input", 
		message: "Guess a Letter: ", 
		name: "letterGuess"
	}
	]).then(function(response){
		if(this.guesses > 0 && !this.won()){
			var userInput = response.letterGuess;
			if(correctGuesses.includes(userInput) || incorrectGuesses.includes(userInput)){
				conosole.log("That Letter Has Been Guessed Already.");
			}

			this.gameWord.checkGuess(userInput);

			if(this.gameWord.wordToString().includes(ch)){
				console.log("Correct!\n");
				this.correctGuesses.push(ch);
				console.log(this.Word.wordToString());
				console.log("Wrong Guesses So Far:\n" + incorrectGuesses.join("") + "\n");
				//console.log(this.Word.wordToString());
			}else{
				console.log("Incorrect!\n");
				this.incorrectGuesses.push(ch);
				console.log(this.Word.wordToString());
				console.log("Wrong Guesses So Far:\n" + incorrectGuesses.join("") + "\n");
				//console.log(this.Word.wordToString());
			}
			//Recursive Call
			this.getUserGuess();
		}
		else {
			if(this.won()){
				console.log("You Won!\n");
				this.startOver();
			}
			else{
				console.log("Sorry You Lost.\n");
				this.startOver();
			}
		}

});

GameEngine.prototype.getUserGuess = function(){
	inquirer.prompt([
	{
		type: "list", 
		message: "Would You like to Play Again?", 
		choices: ["Yes", "No"],
		name: "playAgain"
	}
	]).then(function(response){
		if(response.playAgain === "Yes"){
			this.startGame();
		}
		else{
			console.log("Thanks For Playing.");
		}
	});
}

module.exports = GameEngine;