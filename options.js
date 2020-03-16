// Saves options to chrome.storage
function save_options() {
  var node = document.getElementById('node').value;
  var random_node = document.getElementById('random_node').checked;
  var mainnet = document.getElementById('mainnet').checked;
  chrome.storage.sync.set({
    custom_node: node,
    mainnet: mainnet,
    random_node: random_node
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value custom_node = '' and random_node = true.
  chrome.storage.sync.get({
    custom_node: '',
    mainnet: true,
    random_node: true
  }, function(items) {
    document.getElementById('node').value = items.custom_node;
    document.getElementById('mainnet').checked = items.mainnet;
    document.getElementById('random_node').checked = items.random_node;
    random_changed();
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);


function random_changed(){
  var randomCheckBox = document.getElementById('random_node').checked;console.log(randomCheckBox);
  //If the checkbox has been checked
  if(randomCheckBox){
      document.getElementById("node").disabled = true;
      document.getElementById("mainnet").disabled = false;
  } else{
      document.getElementById("node").disabled = false;
      document.getElementById("mainnet").disabled = true;
  }
}

document.getElementById('random_node').addEventListener('click',
    random_changed);