import { layers } from './roadmap_maps.mjs'
import { worldMap } from './tileset.mjs'

const map = new worldMap("Roadmap", layers);

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
});