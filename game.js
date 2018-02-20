var Letter = require("./Letter.js");
var Word = require("./Word.js");
var gameWords = require("./gameWords.js");
var drawings = require("./drawing.js");

function Game(){ 
	this.guesses = 0; 
	this.incorrectGuesses = [];
	this.gameWord = "";

	this.won = function(){
		return !this.gameWord.wordToString().includes("_");
	}

	this.startGame = function(){
		console.log("Welcome Let's Play a Game of Hangman.\n");
		this.correctGuesses = [];
		this.incorrectGuesses = [];
		this.guesses = 0; 
		this.gameWord = this.getWord();
	}

	this.getGameWord = function(){
		var str = "";
		for(var i = 0; i < this.gameWord.letters.length; i++){
			str += this.gameWord.letters[i].charValue;
		}
		return str;
	}

}

Game.prototype.getWord = function(){
	var randomNum = Math.floor(Math.random() * 50); 
	return new Word(gameWords[randomNum]);
}

module.exports = Game;