function Util () {
}

Util.randomIndex = function(min, max) {
	min = parseInt(min);
	max = parseInt(max);
    return Math.round( Math.random() * (max - min) ) + min;
};

Util.randomArrayPreventDoubles = function(target, source) {
	var usedIndices=new Array(target.length);
	for (var i=0; i<target.length; i++) {
		var indexUsed=false;
		for (var j=0; j<100; j++){ //instead of a while not true to make sure no deadlock
			index=Util.randomIndex(0, source.length-1);
			for (var k=0; k<i; k++) {
				if (usedIndices[k]===index) {
					indexUsed=true;
					break;
				}
			}
			if (indexUsed === false) break;
		}
		usedIndices[i]=index;
		target[i]=source[index];
	}
};

Util.formatDate = function (someDate) {
	var formattedDate = $.datepicker.formatDate('dd. MM', someDate);
	return formattedDate;
};

Util.getBirthdate = function (allergypass) {
	var days=allergypass.birthday;
	var dummydate=new Date();
	var date=new Date(dummydate.getFullYear()-30, dummydate.getMonth(), dummydate.getDate()+days);
	return date;
};

Util.loadFormattedPropertyValue = function(pass, property, type) {
	var value;
	if (type === 1) {
		if (property === "allergies") {
			var helparr=pass["allergies"];
			if (helparr.length>0) {
				index=Util.randomIndex(0, helparr.length-1);
				value = helparr[index];
			} else {
				value = "keine";
			};
		} else if (property === "birthday") { 
			value = pass.getFormattedBirthday();
		} else {
			value = pass[property];
		};
	} else if (type === 2) {
		if (property === "medicin") {
			value = pass.getFormattedMedicin("", "keine");
		} else {
			value = pass[property];
		};
		
	} else value = "";
	
	return value;
};

Util.getAllWithValues = function(passes, property1, property2, value1, value2) {
	var arr=new Array();
	
	for (var i=0;i<passes.length; i++) {
		var help1=Util.loadFormattedPropertyValue(passes[i], property1, 1);
		var help2=null;
		if (property2 !== null) {
			help2=Util.loadFormattedPropertyValue(passes[i], property2, 2);
		}
		if (help1 === value1 && help2 === value2) {
			arr.push(passes[i]);
		}
	}
	return arr;
};



function AllergyPass () {
	//public
	this.name="";
	this.birthday=1;
	this.medicin=false;
	this.bloodgroup="";
	this.passnumber=1;
	this.country="";
	this.picturenumber=1;
	//allergies
	this.hasallergies=false;
	this.allergycount=0;
	this.allergies=new Array();
	
	//constructor
	var index=Util.randomIndex(0, TestData.names.length-1); 
	this.name=TestData.names[index];
	
	index=Util.randomIndex(1, 365); 
	this.birthday=index;
	
	index=Util.randomIndex(0, 1);
	if (index === 0) this.medicin = false;
	else this.medicin = true;
	
	index=Util.randomIndex(0, TestData.bloodgroup.length-1); 
	this.bloodgroup=TestData.bloodgroup[index];
	
	index=Util.randomIndex(0, TestData.numbers.length-1); 
	this.passnumber=TestData.numbers[index];
	
	index=Util.randomIndex(0, TestData.countries.length-1); 
	this.country=TestData.countries[index];
	
	index=Util.randomIndex(1, 111); 
	this.picturenumber=index;
	
	index=Util.randomIndex(1, 7); //give it a chance of one to 6 to have no allergies
	if (index === 1) this.hasallergies = false;
	else {
		this.hasallergies = true;
		var r=Util.randomIndex(1, 9);
		if (r < 5) this.allergycount = 1;
		else if (r < 8) this.allergycount = 2;
		else this.allergycount = 3;
		
		this.allergies.length=this.allergycount; //length of array increased
		Util.randomArrayPreventDoubles(this.allergies, TestData.allergies); 
	}
	
};

AllergyPass.prototype.getFormattedBirthday = function () {
	var birthdate = Util.getBirthdate(this);
	var formattedBirthday = Util.formatDate(birthdate);
	return formattedBirthday;
};

AllergyPass.prototype.getFormattedMedicin = function ( yes, no) {
	var formattedMedicin;
	if (this.medicin === true) formattedMedicin=yes;
	else formattedMedicin=no;
	return formattedMedicin;
};

AllergyPass.prototype.getFormattedAllergies = function () {
	var formattedAllergies;
	if (this.hasallergies === false) formattedAllergies="keine";
	else {
		formattedAllergies=this.allergies.toString().replace(/[\[\]]/g).replace(/,/g,", ");
	}
	return formattedAllergies;
};

function Question(passes, questiondata2) {
	//public
	this.questiondata = questiondata2;
	this.questiontext = "";
	this.value1;
	this.value2=null;
	this.possibleanswers=new Array(5);
	this.correctindex=-1;
		
	//constructor
	var noanswercorrect="Keine Antwort ist richtig";
	var index;
	var max=passes.length-1;
	for (var i=0; i<this.possibleanswers.length; i++) {
		var answertext;
		var doublicated=false;
		do {
			index=Util.randomIndex(0, max);
			//special case name
			if (this.questiondata.answerfield === "name") { // ein oder zwei Namen möglich
				var dice=Util.randomIndex(1, 6);
				if (dice <= 3) { //nur ein name
					answertext=passes[index].name;
				} else {//zwei namen
					var index1=Util.randomIndex(0, max);
					var index2=index1;
					while (index2 === index1) index2=Util.randomIndex(0, max);
					if (index1>index2) { //garantiere das nicht "A und B" und "B und A" möglich sind.
						var help=index1;
						index1=index2;
						index2=help;
					}
					answertext=passes[index1].name + " und " + passes[index2].name;
				};
			} else if (this.questiondata.answerfield === "birthday") {
				answertext=passes[index].getFormattedBirthday();
			} else if (this.questiondata.answerfield === "allergies") {
				answertext=passes[index].getFormattedAllergies();
			} else {
				answertext=passes[index][this.questiondata.answerfield];
			}
			var oldindex=$.inArray(answertext, this.possibleanswers);
			doublicated = oldindex >- 1;
		} while (doublicated);
		
		this.possibleanswers[i] =  answertext;
		
	}
	
	//loading identifing properties
	var property1 = this.questiondata.identifyingfields[0];
	var property2 = null;
	if (this.questiondata.identifyingfields.length === 2) {
		property2 = this.questiondata.identifyingfields[1];
	}
	
	//load useful identifing values
	index=Util.randomIndex(0, passes.length-1);
	var pass=passes[index];
	this.value1=Util.loadFormattedPropertyValue( pass, property1, 1);
	this.questiontext = this.questiondata.text.replace(/\$value1/g, this.value1);
	if (property2 !== null) {
		this.value2=Util.loadFormattedPropertyValue(pass, property2, 2);
		this.questiontext = this.questiontext.replace(/\$value2/g, this.value2);
	}
	
	var correcttext="";
	
	if (this.questiondata.answerfield === "name") {
		var passArr=Util.getAllWithValues(passes, property1, property2, this.value1, this.value2);
		for (var i=0; i<passArr.length; i++) {
			var help=Util.loadFormattedPropertyValue( passArr[i], this.questiondata.answerfield , 1);
			if (i>0) correcttext=correcttext+" und "+help;
			else correcttext=help;
		}
	} else {
		correcttext=Util.loadFormattedPropertyValue(pass, this.questiondata.answerfield , 1);
	}
	
	
	var dice=Util.randomIndex(1, 5);
	if (dice === 3) { //keine Antwort soll richtig sein, ersetze gegebenfalls eine richtige
		this.correctindex=this.possibleanswers.length-1;
		var oldindex = $.inArray(correcttext, this.possibleanswers);
		if (oldindex > -1) {
			this.possibleanswers[oldindex]=this.possibleanswers[this.possibleanswers.length-1];
		}
	} else {
		var oldindex = $.inArray(correcttext, this.possibleanswers);
		if (oldindex > -1) {
			this.correctindex = oldindex;
		} else {
			this.correctindex=Util.randomIndex(0, this.possibleanswers.length-2);
			this.possibleanswers[this.correctindex]=correcttext;
		}
	}
	//letzte position ist immer "kein"
	this.possibleanswers[this.possibleanswers.length-1]=noanswercorrect;
	
	
}

Question.prototype.getCorrectChar = function() {
	switch (this.correctindex) {
	case 0: return 'a';
	case 1: return 'b'; 
	case 2: return 'c'; 
	case 3: return 'd'; 
	case 4: return 'e'; 
	}
};

function MemoryTest() {
	//public
	this.questions = new Array(QuestionData.questioncount);
	this.allergypasses = new Array(8);
	
	//private
	for (var i=0; i<this.allergypasses.length; i++) {
		this.allergypasses[i] = new AllergyPass();
	}
	
	var testdata = new TestData();
	
	for (var i=0; i<QuestionData.questioncount; i++) {
		var index=Util.randomIndex(0, testdata.questions.length-1);
		var questiondata=testdata.questions[index];
		var q=new Question(this.allergypasses, questiondata);
		this.questions[i]=q;
	}
		
	
};





