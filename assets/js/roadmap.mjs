class layer {
  constructor(map, zIndex) {
    this.map = map;
    this.zIndex = zIndex;
  }

  layoutTiles(elem) {
    for(let y = 0; y < this.map.length; y++) {
      const rowMap = this.map[y];
      const row = this._makeRow();
      elem.appendChild(row);

      for(let x = 0; x < rowMap.length; x++) {
        const tileId = rowMap[x];
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
    tile.style.zIndex = this.zIndex;

    ///////////////////////////////////
    //// replace this to actual sprite:
    if(tileId == 0) {
      tile.style.backgroundColor = 'transparent';
    } else if(tileId == 1) {
      tile.style.backgroundColor = 'red';
    } else if(tileId == 2) {
      tile.style.backgroundColor = 'blue';
    }
    //////////////////////////////////

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
      elem.appendChild(layerElem);
      l.layoutTiles(layerElem);
    });
  }
}

window.addEventListener('load', function() {
  // Layer1:
  const layer1 = new layer(
    [
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
    ],
    1
  );

  const layer2 = new layer(
    [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 0, 2],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 0, 2],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 0, 2],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    2
  );

  const map = new worldMap("Roadmap", [
    layer1, layer2
  ]);
  const main = document.getElementById('main');
  if(main == undefined) return;

  map.layoutTiles(main);

  // extend body's height up to our worldMap's height:
  const mapHeight = `${main.scrollHeight}px`;
  const mainBg = document.getElementById('main-bg');

  document.body.style.minHeight = mapHeight;
  mainBg.style.minHeight = mapHeight;
});