/*
* @file app.ui.js
* @author Isaac Jessup
*
* This file contains UI code at a more abstract level.
* The intention is to make it easier to switch UI libraries
* without having to update/rewrite all the UI code.
*/
app.ui = (function()
{
	var ui = {};
	
	ui.toCamelCase = function(TEXT)
	{
		TEXT = TEXT.toLowerCase();
		var words = TEXT.split(" ");
		for(var i=1;i<words.length; i++){
			words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
		}
		TEXT = words.join("");
		return TEXT;
	};
	
	ui.createPage = function ( pageName, pageSelector, innerContent, options )
	{
		$('body')
			.append(
				'<div id="' + pageSelector + '" data-role="page" data-theme="a">' +
					'<div data-role="header" data-position="fixed" class="ui-grid-b my-header-grid">' +
						'<div data-role="controlgroup" data-type="horizontal" data-mini="true" class="ui-block-a">' +
							ui.elements.buttons.back.button +
							ui.elements.buttons.home.button +
						'</div>' +
						'<div class="ui-block-b" style="margin-top:10px; padding-bottom:10px; text-align:center;">' +
							pageName + 
						'</div>' +
						'<div data-role="controlgroup" data-type="horizontal" data-mini="true" class="ui-block-c" style="text-align:right">' +
							ui.elements.popups.howTo.button +
						'</div>' +
					'</div>' +
					
					'<div data-role="content" data-theme="a">' +
						innerContent +
					'</div>' +
					ui.elements.popups.howTo.element +
				'</div>'
			);
		if(typeof options === 'undefined'){
		   options = {transition : 'none'};
		};
		app.ui.showPage(pageSelector, options);
	};
	ui.showPage = function(page, options)
	{
		$.mobile.changePage( "#"+page, options );
	};
	ui.showPrevious = function() 
	{
		history.back();
	};
	ui.goHome = function()
	{
		ui.showPage('home');
	};
	
	ui.elements = {};
	
	ui.elements.buttons = {};
	ui.elements.buttons.back = {};
		ui.elements.buttons.back.button =  
			'<a data-role="button" data-icon="back" data-iconpos="notext" onclick="app.ui.showPrevious();">Back</a>';
	ui.elements.buttons.home = {};
		ui.elements.buttons.home.button =  
			'<a data-role="button" data-icon="home" data-iconpos="notext" onclick="app.ui.goHome();">Home</a>';
	
	ui.elements.popups = {};
	ui.elements.popups.howTo = {};
		ui.elements.popups.howTo.id = "howTo";
		ui.elements.popups.howTo.element = 
			'<div data-role="popup" id="' + ui.elements.popups.howTo.id + '" data-overlay-theme="a">' +
				'<div data-role="content">' +
					'<p>This Application makes it very easy to find and add independent/private channels to your Roku Device. To add the selection to your Roku Device simply locate the desired channel and click the plus sign "+" on the right side of the screen. Once you have pressed the button it will bring you into your Roku Account. You must log into the Roku Account affiliated with the Roku Device you would like to see the channel appear on. Once logged in simply click "Yes, Add Channel". It should add the channel to your Roku Device within the next few minutes.</p>' +
					'<p>If you would like to instantly have the channel update go to the settings tab on the left side of the Roku Menu. From there click "System Update". This will update any new channels you have selected.</p>' +
				'</div>' +
			'</div>';
		ui.elements.popups.howTo.button = 
			'<a href="#' + ui.elements.popups.howTo.id + '" data-icon="info" data-iconpos="notext" data-rel="popup" data-role="button" data-inline="true">How To</a>';

	ui.loader = {};
		ui.loader.show = function()
		{
			// Do AJAX call to get an array of channels.
			$.mobile.loading( 'show', {
				text: "Loading...",
				textVisible: true,
				theme: "b",
				textonly: false,
				html: ""
			});
		};
		ui.loader.hide = function()
		{
			$.mobile.loading( 'hide' );
		};
		
	
	return ui;
})();