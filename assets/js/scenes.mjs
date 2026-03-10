import { Scene } from "./scene.mjs"

class Scene2 extends Scene {
  _onAnimate(masterTl, tl) {
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
    history.scrollRestoration = "manual";
    ScrollTrigger.clearScrollMemory();
    gsap.registerPlugin(ScrollTrigger)

    var tl = gsap.timeline({ paused: true})
    tl.pause(0);

    const scene = document.querySelector("section#scene1");
    const startAt = () =>
      scene.getBoundingClientRect().top +
      window.scrollY +
      (scene.offsetHeight - window.innerHeight) - 60;

    ScrollTrigger.create({
      trigger: 'section#scene1',
      scroller: 'div#scroll-section',
      start: 'top top',
      end: 'bottom botttom',
      //start: startAt,
      //end: '+=200%',
      //start: 'bottom bottom-=60',
      //end: () => "+=" + scene.offsetHeight - window.innerHeight + 60,
      pin: 'section#scene1 .pin-bg',
      anticipatePin: 1,
      invalidateOnRefresh: true,
      markers: true,
      pinSpacing: false,
      scrub: true,
      onUpdate(self) {
        tl.progress(1 - self.progress);
      }
    });
    tl.to('div#rect2', {
      x: 550,
      y: 500
    });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();

      requestAnimationFrame(() => {
        /*window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "auto"
        });*/
        this._jumpToBottom()

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