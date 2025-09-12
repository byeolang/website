export class layer {
  constructor(map) {
    this.map = map;
  }

  getHeight() {
  }

  layoutTiles(parentElem, height, zIndex) {
    const layerElem = document.createElement('div');
    layerElem.classList.add("layer");
    layerElem.style.height = height;
    layerElem.style.zIndex = zIndex;

    parentElem.appendChild(layerElem);

    this.onLayoutTiles(layerElem)
  }

  onLayoutTiles(layerElem) {
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
    tile.src = `../assets/images/tile/${tileId}.png`;
    tile.style.left = `${x * 4}dvw`;
    tile.style.top = `${y * 4}dvw`;
    return tile
  }
}

export class character {
  constructor(name, animId, description, x, y, height) {
    this.name = name;
    this.animId = animId;
    this.description = description;
    this.x = x;
    this.y = y;
    this.height = height;
  }

  layout(layerElem) {
    const elem = document.createElement('div');
    layerElem.appendChild(elem);
    elem.classList.add('character');
    elem.style.animationName = this.animId;
    elem.style.left = `${this.x * 4}dvw`;
    elem.style.top = `calc(${this.y * 4}dvh - calc(${this.height} - 4dvh))`;
    elem.style.height = this.height;

    this.addEvent(elem);
  }

  addEvent(elem) {
    const jq = $(elem);
    jq.hover(function() {
      elem.style.filter = 'brightness(1.5) saturate(2.5)';
    }, function() {
      elem.style.filter = '';
    });

    jq.click(function() {
      console.log("click");
    });
  }
}

export class characterLayer extends layer {
  constructor(characterMap) {
    super(characterMap)
  }

  onLayoutTiles(layerElem) {
    for(let n = 0; n < this.map.length; n++) {
      const chr = this.map[n];
      chr.layout(layerElem);
    }
  }
}

export class worldMap {
  constructor(name, layers, baseZIndex) {
    this.name = name;
    this.layers = layers;
    this.baseZIndex = baseZIndex;
  }

  layoutTiles(elem) {
    const height = `${4 * this.layers[0].map.length}dvh`;
    this.layers.forEach((l, index) => {
      l.layoutTiles(elem, height, this.baseZIndex + index);
    });
  }
}