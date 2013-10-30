$(document).ready(function() {
	$.datepicker.setDefaults( $.datepicker.regional[ 'de' ] );
	var $debug=$(".debug");
	$debug.toggle(false);
    $( "#dlg" ).dialog({
		modal: true,
		autoOpen: false,
		buttons: {
			 Ok: function() {
				 $( this ).dialog( "close" );
				 Me.doTimer($("a.check"), 20);
			 }
		}
	});
	
	
	var starttestgroup = function() {
		var testgroup = new MemoryTest(); 
		$("a.check").toggle(false);
		$("#h-questions").toggle(false);
		$("#result").toggle(false);
		var $passes=$("div.pass");
		Me.createLayout($passes);
		Me.fillPasses($passes,testgroup);
		
		$("a.startquestion").click(function(){
			$("#runner").runner('stop');
			$("#tabs").slideUp();
			$("#dlg").dialog( "open" );
			$("a.restarttest").toggle(false);
			$("a.startquestion").toggle(false);
			$("#h-passes").toggle(false);
			$("a.check").toggle(true);
			$("#h-questions").text("Die "+ QuestionData.questioncount + " Fragen:").toggle(true);
			Me.layoutQuestions(testgroup);
			return false;
		});
		
		$("a.check").click(function(){
			$("a.check").toggle(false);
			$("#runner").runner('stop');
			var max=QuestionData.questioncount;
			var count=Me.countCorrectFields($("div.answer input"));
			$("#result").append("<p>Du hast " + count +" von " + max +" Fragen richtig beantwortet.</p>")
			.append("<p>Bei allen Fragen wurde die korrekte Antwort unter das Eingabefeld geschrieben.</p>")
			.append("<p>Lade die HTML Seite im Browser einfach neu um den Test nochmals zu versuchen.</p>")
			.toggle(true);
			return false;
		});
			
		var text= "<p>Allergiepässe: " + JSON.stringify(testgroup.allergypasses)+"</p>";
		text= text+ "<p>Fragen: " + JSON.stringify(testgroup.questions)+"</p>";
		$debug.html(text);
	};
	
	starttestgroup();
	$("#tabs").tabs();
	
	
	$("a.restarttest").click(function(){
		$("div.pass").empty();
		$("div#questions").empty();
		starttestgroup();
		$("#runner").runner('reset');
		return true;
	});
	
	
	Me.doTimer($("a.startquestion"), 8);
}); 