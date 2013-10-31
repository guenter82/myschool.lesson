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

    $(".hide").toggle(false);
    $("#tabs").tabs();
    $(".accordion").accordion({collapsible:true, active:false, heightStyle: "content"});
}); 