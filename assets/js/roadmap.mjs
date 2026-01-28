import { layers } from './roadmap_maps.mjs'
import { worldMap } from './tileset.mjs'
import * as NightBg from './nightSkyBg.mjs'
import * as LightBg from './lightSkyBg.mjs'
import { DoxygenAwesomeDarkModeToggle, setBg } from './doxygen-awesome-darkmode-toggle.mjs'
import { animateNaviIcon } from './masthead-icon-animation.mjs'
import { enableDragScroll } from './drag-scroll.mjs'

var nightBg = new NightBg.NightSkyBackGrounder("div#main", 60);
var lightBg = new LightBg.LightSkyBackGrounder("div#main", false, 20);
setBg(nightBg, lightBg);

enableDragScroll();

const map = new worldMap("Roadmap", layers, 1);

window.addEventListener('load', function() {

  // Layer1:
  const main = document.getElementById('main');
  if(main == undefined) return;

  map.layoutTiles(main);

  // extend body's height up to our worldMap's height:
  const mapHeight = `${main.scrollHeight}px`;
  const mainBg = document.getElementById('main-bg');

  document.body.style.minHeight = mapHeight;
  mainBg.style.minHeight = mapHeight;

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