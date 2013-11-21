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
		$.mobile.allowCrossDomainPages = true;
		$.support.cors = true;
		
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
	
	/**
	 * Channel Guide Init Functions
	 */
	init.getCategories = function( type )
	{		
		var pageSelector = app.ui.toCamelCase(type + " Channels");
		if($("#" + pageSelector).length == 0) {
			app.ui.createPage(
				type + " Channels",
				pageSelector,
				'<ul class="categories" data-role="listview" data-filter="true" data-split-icon="plus" data-split-theme="a">' +
					'<li>Loading...</li>' +
				'</ul>' +
				'<div data-role="footer" data-id="footer" data-position="fixed">' +
					'<div data-role="navbar">' +
						'<ul>' +
							'<li><a onclick="app.guide.ui.navChange(this);" ' +
							((type == 'Private') ? 'class="ui-btn-active ui-state-persist"' : '') +
							'data-nav="Private">Private</a></li>' +
							'<li><a onclick="app.guide.ui.navChange(this);" ' +
							((type == 'Public') ? 'class="ui-btn-active ui-state-persist"' : '') +
							'data-nav="Public">Public</a></li>' +
							'<li><a onclick="app.guide.ui.navChange(this);" ' +
							((type == 'All') ? 'class="ui-btn-active ui-state-persist"' : '') +
							'data-nav="All">Combined</a></li>' +
						'</ul>' +
					'</div>' +
				'</div>'
			);
			app.guide.getCatagories( type, function(type, data) {
				app.guide.ui.showCategories(type, data);
			});
		};
		app.ui.showPage(pageSelector, {transition : 'flip'});
	};
	init.getChannels = function( catID, type )
	{
		var pageSelector = "category-" + catID + "-" + type;
		if($("#" + pageSelector).length == 0) {
			app.guide.getChannels( catID, type, function(type, data) {
				app.guide.ui.showChannels(type, data);
			});
		}
		app.ui.showPage(pageSelector, {transition : 'flip'});
	};
	init.getChannel = function ( chanID, chanName )
	{
		var pageSelector = "channel-" + chanID;
		if($("#" + pageSelector).length == 0) {
			app.guide.getChannel( chanID, function(data) {
				app.guide.ui.showChannel(data);
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