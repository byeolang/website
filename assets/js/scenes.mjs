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
    const initialLiftY = () => -window.innerHeight * 0.07;
    const ascentY = () => -window.innerHeight * 1.16;

    return tl
      .to(`${smokeStage} .scene1-stage__smoke-left`, {
        autoAlpha: 0.48,
        scale: 1.04,
        xPercent: -6,
        yPercent: -2,
        duration: 0.2,
      }, 0.06)
      .to(`${smokeStage} .scene1-stage__smoke-right`, {
        autoAlpha: 0.48,
        scale: 1.04,
        xPercent: 6,
        yPercent: -2,
        duration: 0.2,
      }, 0.06)
      .to(`${stage} .scene1-stage__fire`, {
        autoAlpha: 0.86,
        scaleX: 0.94,
        scaleY: 1.18,
        yPercent: 10,
        duration: 0.16,
      }, 0.16)
      .to(`${smokeStage} .scene1-stage__smoke-left`, {
        autoAlpha: 0.76,
        scale: 1.28,
        xPercent: -18,
        yPercent: -12,
        duration: 0.38,
      }, 0.18)
      .to(`${smokeStage} .scene1-stage__smoke-right`, {
        autoAlpha: 0.76,
        scale: 1.28,
        xPercent: 18,
        yPercent: -14,
        duration: 0.38,
      }, 0.18)
      .to(`${stage} .scene1-stage__rocket`, {
        y: initialLiftY,
        scale: 0.98,
        duration: 0.12,
      }, 0.28)
      .to(`${stage} .scene1-stage__fire`, {
        y: initialLiftY,
        duration: 0.12,
      }, 0.28)
      .to(`${stage} .scene1-stage__rocket`, {
        y: ascentY,
        xPercent: 0,
        rotation: 0,
        scale: 0.9,
        duration: 1.04,
      }, 0.4)
      .to(`${stage} .scene1-stage__fire`, {
        y: ascentY,
        xPercent: 0,
        scaleX: 0.74,
        scaleY: 1.12,
        duration: 1.04,
      }, 0.4)
      .to(`${stage} .scene1-stage__fire`, {
        autoAlpha: 0.03,
        scaleX: 0.52,
        scaleY: 0.28,
        yPercent: 0,
        duration: 0.34,
      }, 0.9)
      .to(`${smokeStage} .scene1-stage__smoke-left`, {
        autoAlpha: 0.05,
        scale: 1.56,
        xPercent: -34,
        yPercent: -24,
        duration: 0.48,
      }, 0.64)
      .to(`${smokeStage} .scene1-stage__smoke-right`, {
        autoAlpha: 0.05,
        scale: 1.56,
        xPercent: 34,
        yPercent: -26,
        duration: 0.48,
      }, 0.64);
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
