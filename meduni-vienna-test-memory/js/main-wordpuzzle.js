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
				 Me.doTimer($("a.check"), TestData.wordpuzzletime);
			 }
		}
	});
	
	
	var starttestgroup = function() {
		var testgroup = new Words(); 
		$("a.check").toggle(true);
		$("#result").toggle(false);
		
		
		var $div=$("div#words");
		testgroup.selectWords($div);
		
		$("a.check").click(function(){
			$(".restarttest").toggle(false);
			$("a.check").toggle(false);
			$("#runner").runner('stop');
			var max=TestData.wordpuzzlesize;
			var count=Words.countCorrectWords($("div#words input"));
			$("#result").append("<p>Du hast " + count +" von " + max +" Fragen richtig beantwortet.</p>")
			.append("<p>Bei allen Fragen wurde die korrekte Antwort unter das Eingabefeld geschrieben.</p>")
			.append("<p>Lade die HTML Seite im Browser einfach neu um den Test nochmals zu versuchen.</p>")
			.toggle(true);
			return false;
		});
			
//		var text= "<p>Allergiepässe: " + JSON.stringify(testgroup.allergypasses)+"</p>";
//		text= text+ "<p>Fragen: " + JSON.stringify(testgroup.questions)+"</p>";
//		$debug.html(text);
	};
	
	starttestgroup();
	
	$("a.restarttest").click(function(){
		
		$("div#words").empty();
		$("div#result").empty();
		$("div#result").append("<h2>Dein Ergebnis:</h2>");
		starttestgroup();
		$("#runner").runner('reset');
		//$("#runner").runner('start');
		return true;
	});
	
	
	Me.doTimer($("a.startquestion"), TestData.wordpuzzletime);
}); 