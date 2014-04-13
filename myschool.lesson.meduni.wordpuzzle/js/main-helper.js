function Me () {};

Me.imgPathPrefix = "./../resources/testdata/Fotos/";

Me.doTimer = function ($link , min) {
	$('#runner').runner({
		autostart: true,
	    countdown: true,
	    startAt: min * 60000, // 8 minutes
	    stopAt: 0
	}).on('runnerFinish', function(eventObject, info) {
		$link.click();
	});
	
	
	
};

Me.formatDate = function (someDate) {
	var formattedDate = $.datepicker.formatDate('dd. MM', someDate
		//,{monthNames: $.datepicker.regional[ "de-de" ].monthNames}
	);
	return formattedDate;
};

Me.getBirthdate = function (allergypass) {
	var days=allergypass.birthday;
	var dummydate=new Date();
	var date=new Date(dummydate.getFullYear()-30, dummydate.getMonth(), dummydate.getDate()+days);
	return date;
};

Me.createLayout = function ($passes) {
	$passes.append("<div class='pass-header'>Allergieausweis</div>");
	$passes.append("<div class='pass-data'><img src='./../resources/testdata/Fotos/1.jpg' alt='Kein Bild Gefunden'></img></div>");
};


Me.fillPasses = function ($passes, memorytest) {
	var $passdatas=$passes.find("div.pass-data");
	$passdatas.each(function (index){
		var $this=$(this);
		var allergypass=memorytest.allergypasses[index];
		
		$this.append("<p><span class='bold'>Name:</span> " + allergypass.name+"</p>");
		
		var formattedBirthday = allergypass.getFormattedBirthday();
		$this.append("<p><span class='bold'>Geburtstag:</span> " + formattedBirthday+"</p>");
		
		var formattedMedicin=allergypass.getFormattedMedicin("ja", "nein");
		$this.append("<p><span class='bold'>Medikamenteneinnahme:</span> " + formattedMedicin+"</p>");
		
		$this.append("<p><span class='bold'>Blutgruppe:</span> " + allergypass.bloodgroup+"</p>");
		
		var formattedAllergies=allergypass.getFormattedAllergies();
		
		$this.append("<p><span class='bold'>Bekannte Allergien:</span> " + formattedAllergies+"</p>");
		
		$this.append("<p><span class='bold'>Ausweisnummer:</span> <span class='spacing'>" + allergypass.passnumber+"</span></p>");
		
		$this.append("<p><span class='bold'>Ausstellungsland:</span> " + allergypass.country+"</p>");
		
		var $img = $this.find("img");
		var imgPath = Me.imgPathPrefix + allergypass.picturenumber +".jpg";
		$img.prop("src", imgPath);
	});
};

Me.layoutQuestions = function(testgroup) {
	var $parent=$("div#questions");
	for (var i=0; i< testgroup.questions.length; i++) {
		var q = testgroup.questions[i];
		//header
		var $h2=$("<h2>"+q.questiontext+"</h2>");
				
		//content
		var $div=$("<div class='content'></div>");
		//picture needed?
		if (q.questiondata.identifyingfields[0] === "picturenumber") {
			var imgpath=Me.imgPathPrefix + q.value1 +".jpg";
			$div.append("<img src='"+imgpath+"' alt='Bild nicht gefunden' class='layout-right'></img>");
		}
		
		//create ol with possible answers
		var $ol=$("<ol class='answers' type='a'></ol>");
		for (var j=0; j<q.possibleanswers.length; j++) {
			var a=q.possibleanswers[j];
			$ol.append("<li>"+a+"</li>");
		}
		$div.append($ol);
		
		var correctchar=q.getCorrectChar();;
		
		$div.append("<div class='answer'>Antwort Buchstabe: <input type='text' class='"+correctchar+"'></input></div>");
		//$div.append("<div class='answer'>Antwort Buchstabe: <input type='text' class='"+correctchar+"' value='"+correctchar+"'></input></div>");
		//create accordion
		var $accordion=$("<div class='accordion'></div>");
		$accordion.append($h2);
		$accordion.append($div);
		
		//add accordion to a parent
		$parent.append($accordion);
		
				
	}
	
	$parent.find("div.accordion").accordion({collapsible:true, active:false, heightStyle: "content"});
};

Me.countCorrectFields = function($inputs) {
	var cnt=0;
	$inputs.each(function () {
		var $this=$(this);
		if ($this.val() === $this.attr("class")) {
			cnt++;
		} else {
			$this.css("background-color", "rgb(240,215,210)");
		}
		$this.parent().append("<p>Die richtige Antwort ist: "+$this.attr("class")+".</p>");
	});
	
	return cnt;
}; 

