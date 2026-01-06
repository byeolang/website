var statusElement = document.getElementById('status');
var progressElement = document.getElementById('progress');

// Initialize arguments from sessionStorage before byeol.js loads
var code = sessionStorage.getItem('byeol_code');
var verbose = sessionStorage.getItem('byeol_verbose') === 'true';
var args = code ? (verbose ? ["--show-structure", "-v", "-s", code] : ["-s", code]) : [];

// Clear sessionStorage after reading
if (code) {
    sessionStorage.removeItem('byeol_code');
    sessionStorage.removeItem('byeol_verbose');
}

var Module = {
  arguments: args,  // This will be used by byeol.js to set arguments_
  preRun: [],
  postRun: [],
  print: (function() {
    var element = document.getElementById('output');
    if (element) element.value = ''; // clear browser cache
    return function(text) {
      if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
      if (element) {
        element.value += text + "\n";
        element.scrollTop = element.scrollHeight; // focus on bottom
      }
    };
  })(),
  setStatus: function(text) {
    if (!Module.setStatus.last) Module.setStatus.last = { time: Date.now(), text: '' };
    if (text === Module.setStatus.last.text) return;
    var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
    var now = Date.now();
    if (m && now - Module.setStatus.last.time < 30) return; // if this is a progress update, skip it if too soon
    Module.setStatus.last.time = now;
    Module.setStatus.last.text = text;
    if (m) {
      text = m[1];
      progressElement.value = parseInt(m[2])*100;
      progressElement.max = parseInt(m[4])*100;
      progressElement.hidden = false;
    } else {
      progressElement.value = null;
      progressElement.max = null;
      progressElement.hidden = true;
    }
    statusElement.innerHTML = text;
  },
  totalDependencies: 0,
  monitorRunDependencies: function(left) {
    this.totalDependencies = Math.max(this.totalDependencies, left);
    Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies-left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
  }
};
Module.setStatus('click to run');

// Show output area if we have code to run
if (code) {
    var playbt = document.getElementById('playbt');
    var output = document.getElementById('output');
    if (output) output.style.display = 'block';
    if (playbt) playbt.style.display = 'none';
}

window.onerror = function(event) {
  // TODO: do not warn on ok events like simulating an infinite loop or exitStatus
  Module.setStatus('Exception thrown, see JavaScript console');
  Module.setStatus = function(text) {
    if (text) console.error('[post-exception status] ' + text);
  };
};