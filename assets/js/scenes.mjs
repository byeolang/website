import { Scene } from "./scene.mjs"

class Scene2 extends Scene {
  _onAnimate(masterTl, tl) {
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
  constructor() {
    super(1.5);
  }
  _onAnimate(tl) {
    ScrollTrigger.create({
      trigger: 'section#scene1',
      start: 'top top',
      end: 'bottom bottom',
      pin: 'section#scene1',
      pinSpacing: false,
      invalidateOnRefresh: true,
    })

    return tl.to('div#rect2', {
      x: 550,
    }).duration(5);
  }
}

export class Scener {
  constructor() {
    this.scenes = [
      new TakeOff(), new Scene2()
    ];
  }

  init() {
    history.scrollRestoration = "manual";
    ScrollTrigger.clearScrollMemory();
    gsap.registerPlugin(ScrollTrigger);

    var tl = gsap.timeline({ paused: true})
    tl.progress(0);
    tl.to('div#rect2', {
      x: 550,
      y: 500
    });

    const scene = document.querySelector("section#scene1");
    const pinWrap = scene.querySelector(".pin-bg");

    ScrollTrigger.create({
      trigger: scene,
      start: 'top top',
      end: 'bottom botttom',
      invalidateOnRefresh: true,
      anticipatePin: 1,
      markers: true,
      pin: pinWrap,
      pinSpacing: false,
      scrub: 1,
      onUpdate(self) {
        tl.progress(1 - self.progress);
      }
    });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();

      this._jumpToBottom();
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        ScrollTrigger.update();
      });
    });

    /*for(const s of this.scenes) {
      let tl = s.init(this.masterTl)
      this.masterTl.addLabel(s.getName()).add(tl)
    }*/
  }

  _jumpToBottom() {
    window.scrollTo({ top: document.documentElement.scrollHeight, left: 0, behavior: "auto" });
  }
}

var scener = new Scener()

$(function() {
  scener.init()
})