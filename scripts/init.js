/*
* @file init.js
* @author Isaac Jessup
*
* Code for the initialization of the application. The app is divided into
* separate objects for the application logic (the app object)
* and the user interface (the app.ui object).
*/

/**
 * Here we add jQuery Mobile specific code.
 */
app.init = (function()
{
	var init = {};
	/**
	 * Called by framework when document has loaded.
	 */
	init.initializeFramework = function()
	{	
		$(document).bind("backbutton", function(e){
		    if($.mobile.activePage.is('#home')){
		        e.preventDefault();
		        navigator.app.exitApp();
		    }
		    else {
		        app.ui.showPrevious();
		    }
		});
		
		//$('#home').append(app.ui.elements.popups.howTo.element);
	};
	
	
	init.getCategories = function( type )
	{		
		var pageSelector = app.ui.toCamelCase(type + " Channels");
		if($("#" + pageSelector).length == 0) {
			app.ui.createPage(
				type + " Channels",
				pageSelector,
				'<ul class="categories" data-role="listview" data-filter="true" data-split-icon="plus" data-split-theme="a">' +
					'<li>Loading...</li>' +
				'</ul>'
			);
			app.getCatagories( type, function(type, data) {
				app.ui.showCategories(type, data);
			});
		};
		app.ui.showPage(pageSelector, {transition : 'flip'});
	};
	init.getChannels = function( catID )
	{
		var pageSelector = "category-" + catID;
		if($("#" + pageSelector).length == 0) {
			app.getChannels( catID, function(data) {
				app.ui.showChannels(data);
			});
		}
		app.ui.showPage(pageSelector, {transition : 'flip'});
	};
	init.getChannel = function ( chanID, chanName )
	{
		var pageSelector = "channel-" + chanID;
		if($("#" + pageSelector).length == 0) {
			app.getChannel( chanID, function(data) {
				app.ui.showChannel(data);
			});
		}
		app.ui.showPage(pageSelector, {transition : 'flip'});
	};
	
	return init;
})();


// Call app.ui.initialize when document has loaded.
$(window).load(function () {
	app.init.initializeFramework();
});