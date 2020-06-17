var test_nodes = ["testnode2.ardor.tools","testnode7.ardor.tools","testnode8.ardor.tools"];
var main_nodes = ["node1.ardor.tools","node2.ardor.tools","node3.ardor.tools","node4.ardor.tools","node5.ardor.tools","node6.ardor.tools"];

var node = "testnode7.ardor.tools";

function restore_options() {
  chrome.storage.sync.get({
    custom_node: '',
    mainnet: true,
    random_node: true
  }, function(items) {
  	if (items.random_node) {
  		if (!items.mainnet) {
  			node = test_nodes[Math.floor(Math.random() * test_nodes.length)];
  		} else {
  			node = main_nodes[Math.floor(Math.random() * main_nodes.length)];
  		}
  	} else if (items.custom_node.length > 3) {
  		node = items.custom_node;
  	}

  	get_page();
  });
}

document.addEventListener('DOMContentLoaded', restore_options);


function get_page() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const site = urlParams.get('id')

	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://'+node+'/nxt?requestType=getAlias&chain=2&aliasName='+site, true);
	xhr.responseType = 'json';

	xhr.onreadystatechange=function() {
    if (xhr.readyState === 4){   //if complete
        if(xhr.status === 200){  //check if "OK" (200)
            xhr.onload = function(e) {
							if (this.response['aliasURI']) {
								var webpage_files = this.response['aliasURI'].split("|");

								var xhr_html = new XMLHttpRequest();
								xhr_html.open('GET', 'https://'+node+'/nxt?requestType=getTaggedData&chain=2&transactionFullHash='+webpage_files[0], true);
								xhr_html.responseType = 'json';
								xhr_html.onload = function(e) {
									document.body.innerHTML = this.response['data'];
								};
								xhr_html.send();

								if (webpage_files[1]) {
									var xhr_css = new XMLHttpRequest();
									xhr_css.open('GET', 'https://'+node+'/nxt?requestType=getTaggedData&chain=2&transactionFullHash='+webpage_files[1], true);
									xhr_css.responseType = 'json';
									xhr_css.onload = function(e) {
										var styleSheet = document.createElement("style");
										styleSheet.type = "text/css";
										styleSheet.innerText = this.response['data'];
										document.head.appendChild(styleSheet);
									};
									xhr_css.send();
								}
							} else {
								document.body.innerHTML = "<h1>Could not locate website</h1>";
							}
						};
        } else {
           document.body.innerHTML = "<h1>Could not communicate with node</h1>";
        }
    } 
	}

	xhr.send();
}