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
    let tl = gsap.timeline({
      paused: true,
      defaults: { ease: "none" }
    });
    tl.progress(0);

    const scene = document.querySelector(`section#${this.getName()}`);
    const pinWrap = scene.querySelector(".pin-bg");
    const pinDistance = () => Math.max(scene.offsetHeight - window.innerHeight + 1, 1);

    ScrollTrigger.create({
      trigger: scene,
      start: 'top top',
      end: () => `+=${pinDistance()}`,
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
