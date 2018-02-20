var Letter = require("./Letter.js");
var Word = require("./Word.js");
var Game = require("./game.js");
var drawings = require("./drawing.js");
const chalk = require('chalk');
var inquirer = require("inquirer");
var newGame = new Game();

newGame.startGame();
getUserGuess();

function getUserGuess(){
	inquirer.prompt([
	{
		type: "input", 
		message: "Guess a Letter: ", 
		name: "letterGuess"
	}
	]).then(function(response){
		var userInput = response.letterGuess;
		if(newGame.incorrectGuesses.includes(userInput.toUpperCase()) || newGame.correctGuesses.includes(userInput.toUpperCase())){
			console.log(chalk.blue("That Letter Has Been Guessed Already.\n"));
			console.log(newGame.gameWord.wordToString());
			console.log(chalk.blue("Wrong Guesses So Far:\n") + newGame.incorrectGuesses.join(" ") + "\n");
			getUserGuess();
			return; 
		}

		newGame.gameWord.checkGuess(userInput);

		if(newGame.gameWord.wordToString().includes(userInput.toUpperCase())){
			console.log(chalk.green("Correct!\n"));
			newGame.correctGuesses.push(userInput.toUpperCase());
			console.log(newGame.gameWord.wordToString());
			console.log(chalk.green("Wrong Guesses So Far:\n") + newGame.incorrectGuesses.join(" ") + "\n");
		}else{
			console.log(chalk.red("Incorrect!\n"));
			newGame.incorrectGuesses.push(userInput.toUpperCase());
			console.log(newGame.gameWord.wordToString());
			console.log(chalk.red("Wrong Guesses So Far:\n") + newGame.incorrectGuesses.join(" ") + "\n");
			console.log(chalk.red(drawings[newGame.guesses++]) + "\n");
		}
		//Recursive Call
		if(newGame.guesses < 9 && !newGame.won()){
			getUserGuess();
		}

		else {
			if(newGame.won()){
				console.log(chalk.green("You Won!\n"));
				startOver();
			}
			else{
				console.log(chalk.red("Sorry You Lost."));
				console.log("The Word Was: " +  newGame.getGameWord() + "\n");
				startOver();
			}
		}

	});
}

function startOver(){
	inquirer.prompt([
	{
		type: "list", 
		message: "Would You like to Play Again?", 
		choices: ["Yes", "No"],
		name: "playAgain"
	}
	]).then(function(response){
		if(response.playAgain === "Yes"){
			newGame.startGame();
			getUserGuess();

		}
		else{
			console.log("Thanks For Playing.");
		}
	});
}

