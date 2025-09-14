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
    const leftPadding = `((100dvw - ${20 * 4}dvw) / 2)`;
    tile.style.left = `calc(${x * 4}dvw + ${leftPadding})`;
    tile.style.top = `${y * 4}dvw`;
    return tile
  }
}

export class character {
  constructor(name, animId, description, x, y, width, height, classes) {
    this.name = name;
    this.animId = animId;
    this.description = description;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.classes = classes;
  }

  layout(layerElem) {
    const elem = document.createElement('div');
    layerElem.appendChild(elem);

    const clsList = elem.classList;
    clsList.add('character');
    const cls = this.classes;
    if(cls != null)
      for(let n = 0; n < cls.length; n++)
        clsList.add(cls[n]);

    elem.style.animationName = this.animId;
    const leftPadding = `calc((100dvw - ${20 * 4}dvw) / 2)`;
    elem.style.left = `calc(${this.x * 4}dvw - (${this.width} - 4dvw) / 2 + ${leftPadding})`;
    elem.style.top = `calc(${this.y * 4}dvh - (${this.height} - 4dvh))`;
    elem.style.width = this.width;
    elem.style.height = this.height;

    this.addEvent(elem);
  }

  addEvent(elem) {
    if(this.description == null) return;

    const jq = $(elem);
    jq.hover(function() {
      elem.style.filter = 'brightness(1.5) saturate(2.5)';
    }, function() {
      elem.style.filter = '';
    });

    const ch = this;
    jq.click(function() {
      const elem = document.getElementById("description-window");
      const handleElem = document.getElementById("description-window-handle");
      ch.adjustDescriptionWindowPos(elem, handleElem);

      setTimeout(() => {
        document.addEventListener('click', onClickGlobal);
      }, 500);
    });
  }

  adjustDescriptionWindowPos(elem, handleElem) {
    // window:
    const leftPadding = `calc((100dvw - ${20 * 4}dvw) / 2)`;
    const characterLeft = `calc(${this.x * 4}dvw - (${this.width} - 4dvw) / 2 + ${leftPadding})`;
    const characterTop = `calc(${this.y * 4}dvh - (${this.height} - 4dvh))`;

    const isFacingRight = this.x <= 10;
    elem.style.visibility = "visible";
    elem.style.left = isFacingRight ?
      `calc(${characterLeft} + 4dvw + 25px)` :
      `calc(${characterLeft} - 40vw - 25px)`;
    const newTop = this.y > 15 ?
      `calc(${characterTop} - 20dvh)` :
      `50px`;
    elem.style.top = newTop;

    // handle:
    handleElem.style.visibility = 'visible';
    handleElem.style.left = isFacingRight ? `calc(${elem.style.left} - 25px)` : `calc(${elem.style.left} + 40dvw)`;
    handleElem.style.top = `${(this.y - 1) * 4}dvh`;
  }
}

function onClickGlobal(e) {
    const popup = document.getElementById("description-window");
    if(popup == null) return;
    const handle = document.getElementById('description-window-handle');
    if(handle == null) return;

    if(!popup.contains(e.target) && !handle.contains(e.target)) {
      popup.style.visibility = 'hidden';
      handle.style.visibility = 'hidden';
      document.removeEventListener('click', onClickGlobal);
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