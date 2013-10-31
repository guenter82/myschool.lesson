function Util () {
}


Util.loadScript = function(scriptURL, done, fail) {
	$.getScript( scriptURL)
		.done(function (script, textStatus) {
			done( script, textStatus );
		})
		.fail(function( jqxhr, settings, exception ) {
			fail( jqxhr, settings, exception );
		});
};
