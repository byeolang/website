import { Scene } from "./scene.mjs"

class UprisingRocket extends Scene {
  _onAnimate(tl) {
    return tl.to('div#rect2', {
      x: 750,
      duration: 2,
    }).to('div#rect2', {
      y: 500,
      duration: 1,
    }).duration(10);
  }
}

class TakeOff extends Scene {
  _onAnimate(tl) {
    return tl.fromTo('div#rect2', {
      x: 0,
      y: 0,
    }, {
      x: 450,
      y: 400,
    });
  }
}

export class Scener {
  constructor() {
    this.scenes = [
      new TakeOff(), new UprisingRocket()
    ];
  }

  init() {
    history.scrollRestoration = "manual";
    ScrollTrigger.clearScrollMemory();
    gsap.registerPlugin(ScrollTrigger);

    for(const s of this.scenes)
      s.init()

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();

      this._jumpToBottom();
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        ScrollTrigger.update();
      });
    });
  }

  _jumpToBottom() {
    window.scrollTo({ top: document.documentElement.scrollHeight, left: 0, behavior: "auto" });
  }
}

var scener = new Scener()

$(function() {
  scener.init()
})