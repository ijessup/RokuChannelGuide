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
	guide.getCatagories = function( type, callbackFun ) 
	{		
		app.ui.loader.show();
		$.getJSON(dataURL + "categories", {'type' : type})
		.done( function(data) {
			callbackFun(type, data);
			app.ui.loader.hide();
		})
		.error( function( err ) {
			app.ui.loader.hide();
			alert( err.status );
		});
	};
	/**
	 * Downloads channels.
	 */
	guide.getChannels = function( catID, type, callbackFun ) 
	{	
		app.ui.loader.show();
		$.getJSON(dataURL + "channels", {'category' : catID, 'type' : type, 'sort' : 'title'})
		.done( function(data) {
			callbackFun(type, data);
			app.ui.loader.hide();
		})
		.error( function( err ) {
			app.ui.loader.hide();
			alert( err.status );
		});
	};
	/**
	 * Downloads channel.
	 */
	guide.getChannel = function( chanID, callbackFun ) 
	{		
		app.ui.loader.show();
		$.getJSON(dataURL + "channels", {'channel' : chanID})
		.done( function(data) {
			callbackFun(data);
			app.ui.loader.hide();
		})
		.error( function( err ) {
			app.ui.loader.hide();
			alert( err.status );
		});
	};
	/**
	 * Search Channels
	 */
	guide.search = function( query )
	{
		app.ui.loader.show();
		$.getJSON(dataURL + "search", {'query' : query})
		.done( function(data) {
			app.guide.ui.search(data);
			app.ui.loader.hide();
		})
		.error( function( err ) {
			app.ui.loader.hide();
			alert( err.status );
		});
	};
	
	return guide;
})();