chrome.webRequest.onBeforeRequest.addListener(
  function(details) { 
  	var domain = /:\/\/([^\/]+)/.exec(details['url'])[1];
  	var subdomain = domain.split('.')[0]
		chrome.tabs.update(
			{
        url: "index.html?id="+subdomain,
      }
    );
  },
  {urls: ['*://*.ardor/*',]}
  );

chrome.browserAction.onClicked.addListener(function(details) { 
		chrome.tabs.create(
			{
        url: "index.html?id=dnethome",
      }
    );
  }
  );