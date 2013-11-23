/*
* @file app.remote.js
* @author Isaac Jessup
*
* Code for the application layer. The app is divided into
* separate objects for the application logic (the app object)
* and the user interface (the app.remote.ui object).
*/

/**
 * Application layer (non-UI code).
 */

    
app.remote = (function()
{
	var remote = {};
	remote.ip = '192.168.2.35';
	
	remote.press = function ( key ) 
	{	
		remote.send("keydown", key);
	};
	remote.release = function ( key ) 
	{	
		remote.send("keyup", key);
	};
	remote.click = function ( key )
	{
		remote.send("keypress", key);
	}
	
	remote.send = function ( action, command ) {
		$.post("http://" + remote.ip + ":8060/" + action + "/" + command);
	};
	
	remote.getChannels = function () 
	{	
		$.ajax({
			url: "http://" + remote.ip + ":8060/query/apps",
			dataType: "xml",
			crossDomain: true
		})
		.done(function(data){
			$('pre').html(data);
		})
		.fail(function( jqXHR, textStatus ) {
			$('pre').html(jqXHR.status);
		});
	};
	
	return remote;
})();
