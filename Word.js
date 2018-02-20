var Letter = require("./Letter.js");

function Word(string){

	this.wordLength = string.length; 
	this.letters = []; 
	this.createWord(string);

	this.wordToString = function(){
		var str = "";
		for(var i = 0; i < this.letters.length; i++){
			str += this.letters[i].getValue();
		}
		return str;
	}

	this.checkGuess = function(ch){
		for(var i =0; i < this.letters.length; i++){
			this.letters[i].guess(ch);
		}
	}
}

Word.prototype.createWord = function(string){
	for(var i =0; i < this.wordLength; i++){
		this.letters.push(new Letter(string[i], i));
	}

}

module.exports = Word; 