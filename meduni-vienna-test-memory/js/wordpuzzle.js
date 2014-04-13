function Words () {
	//public
	this.size = TestData.wordpuzzlesize;
	this.origins = TestData.wordpuzzle;
	this.selected = new Array(this.size);
	this.mixed = new Array(this.size);
	this.mixedchanged = new Array(this.size);
	this.firstletter = new Array(this.size);
	this.puzzles=new Array(this.size);	
};

Words.prototype.fillWord = function ($div, word, riddle, options, firstletter, index) {
	var $new=$("<div><h2>Frage "+ (index+1) + "</h2><p>"+riddle.split('').join(' ')+"</p></div>");
	var $ol=$("<ol></ol>");
	
	var answer=TestData.answeroptions+1;
	for (var i=0; i<options.length; i++) {
		$ol.append("<li>Anfangsbuchstabe: "+ options[i]+"</li>");
		if (options[i] === firstletter) answer = i+1;
	}
	$ol.append("<li>Keine der Antwortmöglichkeiten ist richtig.</li>");
	$new.append($ol);
	
	$new.append("<p>Antwort-Nummer: <input id='"+index+"' class='"+answer+" "+ word +"'> </p>");
	$div.append($new);
};

Words.prototype.selectWords = function($div) {
	this.origins.sort(function(){return 0.5-Math.random();});
	this.selected=this.origins.slice(0,this.size);
	
	this.mixed = this.selected.slice();
	this.mixed.sort(function(){return 0.5-Math.random();});
	for (var i=0; i<this.size; i++) {
		this.firstletter[i] = this.mixed[i][0];
	}
	for (var i=0; i<this.size; i++) {
		this.mixedchanged[i] = this.mixed[i].split('').sort(function(){return 0.5-Math.random();}).join('');
		this.puzzles[i] = new Array(TestData.answeroptions);
		if (Math.random()<0.25) {
			this.puzzles[i][0] = this.firstletter[i];
		} else {
			this.puzzles[i][0] = this.mixed[i][Words.randomIndex(1,  this.mixed[i].length-1)];
		}
		var max=1000;
		for (var pos=1; pos<TestData.answeroptions && max>0; max--) {
			var index=Words.randomIndex(0,  this.mixed[i].length-1);
			var nextletter= this.mixed[i][index];
			var found=false;
			for (var n=0;n<pos && !found;n++) {
				if (this.puzzles[i][n] === nextletter) found = true;
			}
			if (!found) {
				this.puzzles[i][pos]=nextletter;
				pos++;
			}
		}
		this.puzzles[i].sort(function() {return 0.5-Math.random();});
		
	}
	for (var i=0; i<this.size; i++) {
		this.fillWord($div, this.mixed[i], this.mixedchanged[i], this.puzzles[i], this.firstletter[i], i);
	}
	
};


Words.countCorrectWords = function ($input) {
	var correct=0;
	$input.each(function() {
		var $this = $( this );
		var value=$this.val();
		var check=$this.prop("class");
		if (value !== check[0]) {
			$this.parent().append("</br>Falsch: Lösung ist " + check);
		} else {
			$this.parent().append("</br>Richtig: Lösung ist " + check);
			correct=correct+1;
		}
	});
	return correct;
};

Words.randomIndex = function(min, max) {
	min = parseInt(min);
	max = parseInt(max);
    return Math.round( Math.random() * (max - min) ) + min;
};











