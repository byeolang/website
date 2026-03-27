import { Scene } from "./scene.mjs"
import { Scene1SparkLayer } from "./scene1-sparks.mjs"

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
    const smokeTargets = `${smokeStage} .scene1-stage__smoke-left, ${smokeStage} .scene1-stage__smoke-right`;
    const sparks = new Scene1SparkLayer({
      hostSelector: `${stage} .scene1-stage__fx`,
      fireSelector: `${stage} .scene1-stage__fire`,
    });

    gsap.set(smokeTargets, {
      autoAlpha: 0,
      scale: 0.82,
      xPercent: 0,
      yPercent: 0,
    });

    const sceneTl = tl
      .to(`${smokeStage} .scene1-stage__smoke-left`, {
        autoAlpha: 0.48,
        scale: 1.04,
        xPercent: -6,
        yPercent: -2,
        duration: 0.52,
      }, 0.08)
      .to(`${smokeStage} .scene1-stage__smoke-right`, {
        autoAlpha: 0.48,
        scale: 1.04,
        xPercent: 6,
        yPercent: -2,
        duration: 0.52,
      }, 0.08)
      .to(`${stage} .scene1-stage__fire`, {
        autoAlpha: 0.86,
        scaleX: 0.94,
        scaleY: 1.18,
        yPercent: 10,
        duration: 0.22,
      }, 0.69)
      .to(`${smokeStage} .scene1-stage__smoke-left`, {
        autoAlpha: 0.8,
        scale: 1.34,
        xPercent: -22,
        yPercent: -14,
        duration: 1.18,
      }, 0.27)
      .to(`${smokeStage} .scene1-stage__smoke-right`, {
        autoAlpha: 0.8,
        scale: 1.34,
        xPercent: 22,
        yPercent: -16,
        duration: 1.18,
      }, 0.27)
      .to(`${stage} .scene1-stage__rocket`, {
        y: initialLiftY,
        scale: 0.98,
        duration: 0.16,
      }, 1.25)
      .to(`${stage} .scene1-stage__fire`, {
        y: initialLiftY,
        duration: 0.16,
      }, 1.25)
      .to(`${stage} .scene1-stage__rocket`, {
        y: ascentY,
        xPercent: 0,
        rotation: 0,
        scale: 0.9,
        duration: 0.92,
      }, 1.41)
      .to(`${stage} .scene1-stage__fire`, {
        y: ascentY,
        xPercent: 0,
        scaleX: 0.74,
        scaleY: 1.12,
        duration: 0.92,
      }, 1.41)
      .to(`${stage} .scene1-stage__fire`, {
        autoAlpha: 0.03,
        scaleX: 0.52,
        scaleY: 0.28,
        yPercent: 0,
        duration: 0.34,
      }, 1.63)
      .to(`${smokeStage} .scene1-stage__smoke-left`, {
        autoAlpha: 0.46,
        scale: 1.5,
        xPercent: -32,
        yPercent: -22,
        duration: 0.74,
      }, 1.29)
      .to(`${smokeStage} .scene1-stage__smoke-right`, {
        autoAlpha: 0.46,
        scale: 1.5,
        xPercent: 32,
        yPercent: -24,
        duration: 0.74,
      }, 1.29)
      .to(`${smokeStage} .scene1-stage__smoke-left`, {
        autoAlpha: 0.05,
        scale: 1.64,
        xPercent: -40,
        yPercent: -30,
        duration: 0.5,
      }, 1.89)
      .to(`${smokeStage} .scene1-stage__smoke-right`, {
        autoAlpha: 0.05,
        scale: 1.64,
        xPercent: 40,
        yPercent: -32,
        duration: 0.5,
      }, 1.89);

    if (sparks.enabled) {
      const syncSparks = () => sparks.setProgress(sceneTl.progress());
      gsap.ticker.add(syncSparks);
      syncSparks();
    }

    return sceneTl;
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
