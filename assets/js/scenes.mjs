import { Scene } from "./scene.mjs"
import { Scene1IgnitionLight } from "./scene1-ignition-light.mjs"
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
    const stageEl = document.querySelector(stage);
    const fireEl = stageEl?.querySelector(".scene1-stage__fire");
    const flareEl = stageEl?.querySelector(".scene1-stage__flare");
    const ignitionLight = new Scene1IgnitionLight({
      hostSelector: `${stage} .scene1-stage__light3d`,
      stageSelector: stage,
      fireSelector: `${stage} .scene1-stage__fire`,
      rocketSelector: `${stage} .scene1-stage__rocket`,
    });
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

    if (flareEl) {
      gsap.set(flareEl, {
        autoAlpha: 0,
        scale: 0.42,
      });
    }

    const syncFlare = () => {
      if (!stageEl || !fireEl || !flareEl) {
        return;
      }

      const stageRect = stageEl.getBoundingClientRect();
      const fireRect = fireEl.getBoundingClientRect();
      const x = fireRect.left - stageRect.left + fireRect.width * 0.5;
      const y = fireRect.top - stageRect.top + fireRect.height * 0.18;
      const centerX = stageRect.width * 0.5;
      const centerY = stageRect.height * 0.42;
      const axisX = centerX - x;
      const axisY = centerY - y;
      const axisAngle = Math.atan2(axisY, axisX) * (180 / Math.PI);

      gsap.set(flareEl, {
        x,
        y,
      });
      flareEl.style.setProperty("--flare-axis-x", `${axisX}px`);
      flareEl.style.setProperty("--flare-axis-y", `${axisY}px`);
      flareEl.style.setProperty("--flare-axis-angle", `${axisAngle}deg`);
    };

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
      .to(flareEl, {
        autoAlpha: 1,
        scale: 1.34,
        duration: 0.1,
      }, 1.18)
      .to(flareEl, {
        autoAlpha: 0.52,
        scale: 0.96,
        duration: 0.14,
      }, 1.26)
      .to(flareEl, {
        autoAlpha: 0,
        scale: 1.96,
        duration: 0.32,
      }, 1.34)
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

    if (sparks.enabled || ignitionLight.enabled) {
      const syncSceneOneFx = () => {
        if (sparks.enabled) {
          sparks.setProgress(sceneTl.progress());
        }

        if (ignitionLight.enabled) {
          ignitionLight.setPhase(sceneTl.time(), sceneTl.duration());
        }

        syncFlare();
      };
      gsap.ticker.add(syncSceneOneFx);
      syncSceneOneFx();
    } else {
      syncFlare();
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
