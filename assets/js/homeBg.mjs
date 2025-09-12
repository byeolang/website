import * as NightBg from './nightSkyBg.mjs'
import * as LightBg from './lightSkyBg.mjs'
import { DoxygenAwesomeDarkModeToggle, setBg } from './doxygen-awesome-darkmode-toggle.mjs'
import { animateNaviIcon } from './masthead-icon-animation.mjs'

var nightBg = new NightBg.NightSkyBackGrounder("div#main-bg", 60);
var lightBg = new LightBg.LightSkyBackGrounder("div#main-bg", false, 20);
setBg(nightBg, lightBg);

window.addEventListener('load', function(event) {
	updateWindow();
  var bg = DoxygenAwesomeDarkModeToggle.darkModeEnabled ? nightBg : lightBg;
	bg.initialize();
  setTimeout(animateNaviIcon, 3000);
});

window.addEventListener('resize', function(event) {
	updateWindow();
});

function updateWindow() {
	let vh = window.innerHeight * 0.01
	var vheader = document.getElementById('masthead').clientHeight;
	var vfooter = document.getElementById('footer').clientHeight;
	document.documentElement.style.setProperty("--vh", `${vh}px`);
	document.documentElement.style.setProperty("--vfooter", `${vfooter}px`);
	document.documentElement.style.setProperty("--vheader", `${vheader}px`);
}