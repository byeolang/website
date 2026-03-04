import { Scene } from "./scene.mjs"

class Scene2 extends Scene {
  _onAnimate(tl) {
    return tl.to('div#rect2', {
      x: 750,
      duration: 2,
    }).to('div#rect2', {
      y: 500,
      duration: 1,
    }).duration(10)
  }
}

class TakeOff extends Scene {
  constructor() {
    super(1.5);
  }
  _onAnimate(tl) {
    return tl.to('div#rect2', {
      x: 550,
    }).duration(5)
  }
}

export class Scener {
  constructor() {
    this.scenes = [
      new TakeOff(), new Scene2()
    ]
  }

  init() {
    gsap.registerPlugin(ScrollTrigger)

    var masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: 'div#main-content',
        start: 0,
        end: 'bottom bottom',
        scrub: true,
        markers: true,
        onUpdate(self) {
          masterTl.progress(1 - self.progress)
        }
      }
    })
    this.masterTl = masterTl

    for(const s of this.scenes) {
      let tl = s.init()
      this.masterTl.addLabel(s.getName()).add(tl)
    }
    this._jumpToBottom()
  }

  _jumpToBottom() {
    window.scrollTo({ top: document.documentElement.scrollHeight, left: 0, behavior: "auto" });
  }
}

var scener = new Scener()

$(function() {
  scener.init()
})