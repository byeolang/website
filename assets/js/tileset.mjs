export class layer {
  constructor(map) {
    this.map = map;
    this.zIndex = 0;
  }

  layoutTiles(elem, zIndex) {
    this.zIndex = zIndex;

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
    tile.classList.add('tile');
    tile.style.zIndex = this.zIndex;
    if(tileId < 0)
      tile.style.visibility = "hidden";
    else
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
      const layerElem = document.createElement('div');
      layerElem.classList.add("layer");
      elem.appendChild(layerElem);
      l.layoutTiles(layerElem, this.baseZIndex + index);
    });
  }
}