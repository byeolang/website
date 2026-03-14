export class Scene {
  constructor(heightRatio) {
    const scrollSection = document.querySelector('div#scroll-section');
    const scene = document.querySelector(`section#${this.getName()}`);
    scene.style.height = `${Math.round(heightRatio * 100)}vh`;
  }

  getName() {
    return this.constructor.name;
  }

  init() {
    let tl = gsap.timeline({ paused: true });
    tl.progress(0);

    const scene = document.querySelector(`section#${this.getName()}`);
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

    return this._onAnimate(tl);
  }

  _onAnimate(tl) {}
}