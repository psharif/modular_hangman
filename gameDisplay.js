var Letter = require("./Letter.js");
var Word = require("./Word.js");
var GameEngine = require("./gameEngine.js");

function GameDisplay(word){

	this.gameEngine = new GameEngine(word);

	this.display = function(){
		var displayString = [];
		
		word[i].forEach(function(el){
			if(el === " "){
				displayString.push(" ");
			}else{
				displayString.push("_");
			}
		});

		this.gameEngine.getCorrectGuesses().forEach(function(el){
			displayString[el.position] = el.charValue; 
		});

		return displayString.join("");
	}

}

module.exports = GameDisplay; 