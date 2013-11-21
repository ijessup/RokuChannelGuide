/*
* @file app.js
* @author Isaac Jessup
*
* Code for the application layer. The app is divided into
* separate objects for the application logic (the app object)
* and the user interface (the app.ui object).
*/

/**
 * Application layer (non-UI code).
 */
app.guide = (function()
{
	var guide = {};
	var dataURL = "http://roku.cloud5studios.com/data/index.php/tools/packages/roku_channels/";

	/**
	 * Downloads categories.
	 */
	guide.getCatagories = function( type, callbackFun ) {		
		// Do AJAX call to get an array of categories.
		$.mobile.loading( 'show', {
			text: "Loading...",
			textVisible: true,
			theme: "b",
			textonly: false,
			html: ""
		});
		$.getJSON(dataURL + "categories", {'type' : type})
		.done( function(data) {
			callbackFun(type, data);
			$.mobile.loading( 'hide' );
		})
		.error( function( err ) {
			alert( err.status );
		});
	};
	/**
	 * Downloads channels.
	 */
	guide.getChannels = function( catID, type, callbackFun ) {		
		// Do AJAX call to get an array of channels.
		$.mobile.loading( 'show', {
			text: "Loading...",
			textVisible: true,
			theme: "b",
			textonly: false,
			html: ""
		});
		$.getJSON(dataURL + "channels", {'category' : catID, 'type' : type, 'sort' : 'title'})
		.done( function(data) {
			callbackFun(type, data);
			$.mobile.loading( 'hide' );
		})
		.error( function( err ) {
			alert( err.status );
		});
	};
	/**
	 * Downloads channel.
	 */
	guide.getChannel = function( chanID, callbackFun ) {		
		// Do AJAX call to get an array of channels.
		$.mobile.loading( 'show', {
			text: "Loading...",
			textVisible: true,
			theme: "b",
			textonly: false,
			html: ""
		});
		$.getJSON(dataURL + "channels", {'channel' : chanID})
		.done( function(data) {
			callbackFun(data);
			$.mobile.loading( 'hide' );
		})
		.error( function( err ) {
			alert( err.status );
		});
	};
	
	return guide;
})();