// const TILE_WIDTH = 32; // No longer needed for JS positioning
const MAX_X = 5;
const MAX_Y = 5;

class layer {
  constructor(map, zIndex) {
    this.map = map;
    this.zIndex = zIndex;
  }

  layoutTiles(elem) {
    for(let y = 0; y < MAX_Y; y++) {
      const row = this._makeRow();
      elem.appendChild(row);

      for(let x = 0; x < MAX_X; x++) {
        const tileId = this.map[y][x];
        if(tileId == undefined) continue;

        row.appendChild(this._makeTile(tileId, x, y));
      }
    }
  }

  _makeRow() {
    const row = document.createElement('div');
    row.classList.add('layer-row');
    return row;
  }

  _makeTile(tileId, x, y) {
    const tile = document.createElement('img');
    // tile.src = `../assets/images/tile${tileId}.png`; // Keep for when you have actual images
    tile.classList.add('tile');
    // Positioning and dimensions are now handled by CSS
    // tile.style.width = `${TILE_WIDTH}px`;
    // tile.style.height = `${TILE_WIDTH}px`;
    // tile.style.left = `${x * TILE_WIDTH}px`;
    // tile.style.top = `${y * TILE_WIDTH}px`;
    tile.style.zIndex = this.zIndex; // z-index can still be useful if tiles within a layer overlap

    if(tileId == 0) {
      tile.style.backgroundColor = 'transparent';
    } else if(tileId == 1) {
      tile.style.backgroundColor = 'red';
    } else if(tileId == 2) {
      tile.style.backgroundColor = 'blue';
    }

    return tile
  }
}

class worldMap {
  constructor(name, layers) {
    this.name = name;
    this.layers = layers;
  }

  layoutTiles(elem) {
    this.layers.forEach((l, index) => {
      const layerElem = document.createElement('div');
      layerElem.classList.add("layer");
      // Positioning for the layer container is now handled by CSS
      // layerElem.style.position = 'absolute';
      // const width = (MAX_X * TILE_WIDTH) / 2;
      // layerElem.style.left = `calc(50dvh - ${width}px)`;

      // We can add a data attribute for layer index if needed for specific CSS targeting
      layerElem.dataset.layerIndex = index;
      elem.appendChild(layerElem);
      l.layoutTiles(layerElem);
    });
  }
}

window.addEventListener('load', function() {
  // Layer1:
  const layer1 = new layer(
    [
      [1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1],
    ],
    1
  );

  const layer2 = new layer(
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 2, 0, 2],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    2
  );

  const map = new worldMap("Roadmap", [
    layer1, layer2
  ]);
  const main = document.getElementById('main');
  if(main == undefined) return;

  map.layoutTiles(main);
});