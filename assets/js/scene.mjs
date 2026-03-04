export class Scene {
  getName() {
    return this.constructor.name
  }

  init() {
    return this._onAnimate(gsap.timeline())
  }
  _onAnimate(tl) {}
}