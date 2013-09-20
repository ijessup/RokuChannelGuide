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
	
	/**
	 * Outputs the list of categories based on the supplied JSON.
	 */
	ui.showCategories = function(type, json)
	{
		var results = "";
		
		if ((!json) ||
			(json.length === 0) ||
			(json.error === "Not found"))
		{
			results = "<li>No content found.</li>";
		} else {
			$.each(json, function(i, data){
				results += 
					'<li>' +
						'<a onclick="app.init.getChannels(' + data.id + ')">' + 
							data.name + 
							'<span class="ui-li-count">' + data.count + '</span>' +
						'</a>' +
					'</li>';
			});
		}
		$("div#"+app.ui.toCamelCase(type + " Channels")+" div.ui-content ul.categories").html(results);
		$("div#"+app.ui.toCamelCase(type + " Channels")+" div.ui-content ul.categories").listview("refresh");
	}; 
	/**
	 * Outputs the list of channels based on the supplied JSON.
	 */
	ui.showChannels = function(json)
	{		
		var results = "";
		
		if ((!json) ||
			(json.length === 0) ||
			(json.error === "Not found"))
		{
			results = "<li>No content found.</li>";
		} else {
			$.each(json.channels, function(i, data){
				results += 
					'<li>' +
						'<a onclick="app.init.getChannel(' + data.id + ');">' +
							'<img src="' + data.image + '" />' +
							'<h3>' + data.title + '</h3>' +
							'<p>' + data.description + '</p>' +
						'</a>' +
						'<a onclick="window.open(\'' + data.add + '\', \'_blank\', \'location=no\');">Add Channel</a>' +
					'</li>';
			});
		}
		
		app.ui.createPage( 
			json.category.name, 
			"category-" + json.category.id,
			'<ul class="channels" data-role="listview" data-filter="true" data-split-icon="plus" data-split-theme="a">' +
				results +
			'</ul>'
		);
	}; 
	/**
	 * Outputs the list of channels based on the supplied JSON.
	 */
	ui.showChannel = function(json)
	{
		app.ui.createPage( 
			json.title, 
			"channel-" + json.id,
			'<div data-role="content">' +
				'<img src="' + json.image + '" style="width: 100%; max-width:250px; display:block; margin:auto"/>' +
				'<p>' + json.description + '</p>' +
				'<a data-role="button" onclick="window.open(\'' + json.add + '\', \'_blank\', \'location=no\');">Add Channel</a>' +
			'</div>'
		);
	}; 
	
	
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
	
	ui.createPage = function ( pageName, pageSelector, innerContent )
	{
		$('body')
			.append(
				'<div id="' + pageSelector + '" data-role="page">' +
					'<div data-role="header">' +
						ui.elements.buttons.back.button +
						'<h1>' + pageName + '</h1>' +
						ui.elements.popups.howTo.button +
					'</div>' +
					
					'<div data-role="content">' +
						innerContent +
					'</div>' +
					ui.elements.popups.howTo.element +
				'</div>'
			);
		
		app.ui.showPage(pageSelector, {transition : 'flip'});
	};
	ui.showPage = function(page, options)
	{
		$.mobile.changePage( "#"+page, options );
	};
	ui.showPrevious = function() 
	{
		history.back();
	};
	
	ui.elements = {};
	
	ui.elements.buttons = {};
	ui.elements.buttons.back = {};
		ui.elements.buttons.back.button =  
			'<a data-icon="back" data-iconpos="notext" onclick="app.ui.showPrevious();">Back</a>';
	
	ui.elements.popups = {};
	ui.elements.popups.howTo = {};
		ui.elements.popups.howTo.id = "howTo";
		ui.elements.popups.howTo.element = 
			'<div data-role="popup" id="' + ui.elements.popups.howTo.id + '" data-overlay-theme="a">' +
				'<div data-role="content">' +
					'<p>This Application makes it very easy to find and add independent/private channels to your Roku Device. To add the selection to your Roku Device simply locate the desired channel and click the plus sign "+" on the right side of the screen. Once you have pressed the button it will bring you into your Roku Account. You must log into the Roku Account affiliated with the Roku Device you would like to see the channel appear on. Once logged in simply click "Yes, Add Channel". It should add the channel to your Roku Device within the next few minutes.</p>' +
					'<p>If you would like to instantly have the channel update go to the setting tab on the left side of the Roku Menu. From there click "System Update". This will update any new channels you have selected.</p>' +
				'</div>' +
			'</div>';
		ui.elements.popups.howTo.button = 
			'<a href="#' + ui.elements.popups.howTo.id + '" data-icon="info" data-iconpos="notext" data-rel="popup" data-role="button" data-inline="true">How To</a>';

	ui.elements.popups.search = {};
		ui.elements.popups.search.id = "search"; 
		ui.elements.popups.search.element = 
			'<div data-role="popup" id="' + ui.elements.popups.search.id + '" data-overlay-theme="a">' +
				'<form action="#search">' +
			          '<input type="text" name="query" value="" placeholder="Search"/>' +
			    	  '<button type="submit" data-theme="b">Search</button>' +
					'</div>' +
				'</form>' +
			'</div>';
		ui.elements.popups.search.button = 
			'<a href="#' + ui.elements.popups.search.id + '" data-icon="search" data-iconpos="notext" data-rel="popup" data-role="button" data-inline="true">Search</a>';
		
	return ui;
})();