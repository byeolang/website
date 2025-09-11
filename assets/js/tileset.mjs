export class layer {
  constructor(map) {
    this.map = map;
  }

  layoutTiles(parentElem, zIndex) {
    const layerElem = document.createElement('div');
    layerElem.classList.add("layer");
    layerElem.style.height = `${4 * this.map.length}dvh`;
    layerElem.style.zIndex = zIndex;

    parentElem.appendChild(layerElem);

    for(let y = 0; y < this.map.length; y++) {
      const rowMap = this.map[y];

      for(let x = 0; x < rowMap.length; x++) {
        const tileId = rowMap[x];
        if(tileId == undefined) continue;

        const tile = this._makeTile(tileId, x, y);
        if(tile != null)
          layerElem.appendChild(tile);
      }
    }
  }

  _makeTile(tileId, x, y) {
    if(tileId < 0) return null;

    const tile = document.createElement('img');
    tile.classList.add('tile');
    tile.style.left = `${x * 4}dvw`;
    tile.style.top = `${y * 4}dvw`;
    tile.src = `../assets/images/tile/${tileId}.png`;

    return tile
  }
}

export class worldMap {
  constructor(name, layers, baseZIndex) {
    this.name = name;
    this.layers = layers;
    this.baseZIndex = baseZIndex;
  }

  layoutTiles(elem) {
    this.layers.forEach((l, index) => {
      l.layoutTiles(elem, this.baseZIndex + index);
    });
  }
}