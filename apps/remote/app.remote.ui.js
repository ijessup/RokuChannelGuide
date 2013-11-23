/*
* @file app.remote.ui.js
* @author Isaac Jessup
*
* This file contains UI code at a more abstract level.
* The intention is to make it easier to switch UI libraries
* without having to update/rewrite all the UI code.
*/
app.remote.ui = (function()
{
	var ui = {};
	
	ui.remote = function ( options )
	{
		ui.getPage('Remote Control', 'rokuRemote', options);
		if(typeof app.remote.ip === 'undefined')
		{
			alert('You must first set up a connection with your Roku.');
			ui.settings();
		};
	};
	
	ui.channels = function ( options )
	{
		ui.getPage('My Roku Channels', 'rokuChannels', options, app.remote.getChannels);
		
		if(typeof app.remote.ip === 'undefined')
		{
			alert('You must first set up a connection with your Roku.');
			ui.settings();
		};
	};
	
	ui.settings = function ( options )
	{
		ui.getPage('Settings', 'rokuSettings', options);
	};
	
	ui.getPage = function (name, file, options, callback)
	{
		if(typeof options === 'undefined'){
		   options = {transition : 'slide'};
		};
		if($("#" + file).length == 0) {
			$.get('apps/remote/pages/' + file + '.html')
				.done(function (data) {
					app.ui.createPage(name, file, data, options);
				}
			);
		}
		if(typeof callback !== 'undefined'){
		   callback();
		};
		app.ui.showPage(file, options);
	};
	
	return ui;
})();