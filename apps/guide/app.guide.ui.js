/*
* @file app.guide.ui.js
* @author Isaac Jessup
*
* This file contains UI code at a more abstract level.
* The intention is to make it easier to switch UI libraries
* without having to update/rewrite all the UI code.
*/
app.guide.ui = (function()
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
	
	return ui;
})();