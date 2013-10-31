$(document).ready(function() {
	$(".checkjava").click(function (evt) {
		evt.preventDefault(); //called by link
		CheckJava.checkJava();
	});
	
	$(".jreupdate").click(function (evt) {
		evt.preventDefault(); //called by link
		CheckJava.jreUpdate();
	});
});


function CheckJava () {}

CheckJava.version = '1.6+';

CheckJava.checkJava = function() {    
    // check if current JRE version is greater than 1.6.0
    var javaValid = deployJava.versionCheck(CheckJava.version);
    if (javaValid) {
    	$(".javaactive").toggle(true);
    } else {
    	$(".javamissing").toggle(true);
    }
    var jres = deployJava.getJREs();
	$(".logjre").text(jres);
};


CheckJava.jreUpdate = function() {
	              
    // Set deployJava.returnPage to make sure user comes back to 
    // your web site after installing the JRE
    deployJava.returnPage = location.href;
    
    // Install latest JRE or redirect user to another page to get JRE
    deployJava.installLatestJRE(); 
   
};