import { Scene } from "./scene.mjs"

class UprisingRocket extends Scene {
  constructor() {
    super(7);
  }

  _onAnimate(tl) {
    return tl;
  }
}

class TakeOff extends Scene {
  constructor() {
    super(17.5);
  }

  _onAnimate(tl) {
    const stage = "#scene1-stage";
    const smokeStage = "#scene1-smoke-stage";
    const ascentY = () => -window.innerHeight * 0.78;

    return tl
      .to(`${smokeStage} .scene1-stage__smoke-left`, {
        autoAlpha: 0.72,
        scale: 1.08,
        xPercent: -16,
        yPercent: -12,
        duration: 0.18,
      }, 0.06)
      .to(`${smokeStage} .scene1-stage__smoke-right`, {
        autoAlpha: 0.72,
        scale: 1.08,
        xPercent: 16,
        yPercent: -14,
        duration: 0.18,
      }, 0.06)
      .to(`${stage} .scene1-stage__fire`, {
        autoAlpha: 1,
        scaleX: 1.08,
        scaleY: 1.55,
        yPercent: 12,
        duration: 0.18,
      }, 0.16)
      .to(`${smokeStage} .scene1-stage__smoke-left`, {
        autoAlpha: 0.92,
        scale: 1.32,
        xPercent: -34,
        yPercent: -26,
        duration: 0.34,
      }, 0.18)
      .to(`${smokeStage} .scene1-stage__smoke-right`, {
        autoAlpha: 0.92,
        scale: 1.32,
        xPercent: 34,
        yPercent: -30,
        duration: 0.34,
      }, 0.18)
      .to(`${stage} .scene1-stage__rocket`, {
        y: ascentY,
        xPercent: 0,
        rotation: 0,
        scale: 1.08,
        duration: 0.9,
      }, 0.38)
      .to(`${stage} .scene1-stage__fire`, {
        y: ascentY,
        xPercent: 0,
        duration: 0.9,
      }, 0.38)
      .to(`${stage} .scene1-stage__fire`, {
        autoAlpha: 0.08,
        scaleX: 0.7,
        scaleY: 0.46,
        yPercent: 2,
        duration: 0.42,
      }, 0.82)
      .to(`${smokeStage} .scene1-stage__smoke-left`, {
        autoAlpha: 0.08,
        scale: 1.62,
        xPercent: -48,
        yPercent: -40,
        duration: 0.38,
      }, 0.78)
      .to(`${smokeStage} .scene1-stage__smoke-right`, {
        autoAlpha: 0.08,
        scale: 1.62,
        xPercent: 48,
        yPercent: -44,
        duration: 0.38,
      }, 0.78);
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
