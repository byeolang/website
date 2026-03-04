export class Scene {
  constructor() {
    this.timeToScroll = (masterTl, t) => {
      let st = masterTl.scrollTrigger
      return st.start + (masterTl / masterTl.duration()) * (st.end - st.start)
    }
  }

  getName() {
    return this.constructor.name
  }

  init(masterTl) {
    return this._onAnimate(masterTl, gsap.timeline())
  }
  _onAnimate(masterTl, tl) {}
}