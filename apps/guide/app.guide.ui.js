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
						'<a onclick="app.init.getChannels(' + data.id + ', \'' + type + '\')">' + 
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
	ui.showChannels = function(type, json)
	{		
		var results = "";
		if ((!json) || (!json.channels))
		{
			results = "<li>No content found.</li>";
		} else {
			$.each(json.channels, function(i, data){
				results += 
					'<li>' +
						'<a onclick="app.init.getChannel(' + data.id + ', \'' + data.title + '\');">' +
							'<img src="' + data.image + '" />' +
							'<h3>' + data.title + '</h3>' +
							'<p>' + data.description + '</p>' +
						'</a>' +
						'<a onclick="window.open(\'https://owner.roku.com/Add/' + data.roku_id + '\', \'_blank\', \'location=no\');">Add Channel</a>' +
					'</li>';
			});
		}
		
		app.ui.createPage( 
			json.category.name, 
			"category-" + json.category.id + "-" + type,
			'<ul class="channels" data-role="listview" data-filter="true" data-split-icon="plus" data-autodividers="true" data-split-theme="a">' +
				results +
			'</ul>' +
			((json.category.id) ? 
			'<div data-role="footer" data-id="footer" data-position="fixed">' +
				'<div data-role="navbar">' +
					'<ul>' +
						'<li><a onclick="app.guide.ui.navChange(this);" ' +
							((type == 'Private') ? 'class="ui-btn-active ui-state-persist"' : '') +
							'data-nav="Private" data-category="' + json.category.id + '">Private</a></li>' +
						'<li><a onclick="app.guide.ui.navChange(this);" ' +
							((type == 'Public') ? 'class="ui-btn-active ui-state-persist"' : '') +
							'data-nav="Public" data-category="' + json.category.id + '">Public</a></li>' +
						'<li><a onclick="app.guide.ui.navChange(this);" ' +
							((type == 'All') ? 'class="ui-btn-active ui-state-persist"' : '') +
							'data-nav="All" data-category="' + json.category.id + '">Combined</a></li>' +
					'</ul>' +
				'</div>' +
			'</div>'
			: '' )
		);
	}; 
	ui.navChange = function (target)
	{
		if($(target).attr('data-category'))
		{
			app.init.getChannels($(target).attr('data-category'), $(target).attr('data-nav'));
		}
		else
		{
			app.init.getCategories($(target).attr('data-nav'));
		};
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
				'<a data-role="button" onclick="window.open(\'https://owner.roku.com/Add/' + json.roku_id + '\', \'_blank\', \'location=no\');">Add Channel</a>' +
			'</div>'
		);
	}; 
	ui.search = function(json)
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
						'<a onclick="app.init.getChannel(' + data.id + ', \'' + data.title + '\');">' +
							'<img src="' + data.image + '" />' +
							'<h3>' + data.title + '</h3>' +
							'<p>' + data.description + '</p>' +
						'</a>' +
						'<a onclick="window.open(\'https://owner.roku.com/Add/' + data.roku_id + '\', \'_blank\', \'location=no\');">Add Channel</a>' +
					'</li>';
			});
		}
		$("#search-results").html(results);
		$("#search-results").listview("refresh");
	};
	
	return ui;
})();