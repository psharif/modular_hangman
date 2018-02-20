function Letter(charValue, position){
	this.charValue = charValue;
	this.position = position;
	this.guessValue = false; 

	this.getValue = function(){
		if(charValue == " "){
			return " ";
		}else if(this.guessValue){
			return this.charValue;
		}else{
			return "_";
		}
	}

	this.guess = function(charValue){
		if(charValue == this.charValue){
			this.guessValue = true;
		}
	}
}

module.exports = Letter; 