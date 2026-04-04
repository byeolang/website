import { Scene } from "./scene.mjs"
import { Scene1IgnitionLight } from "./scene1-ignition-light.mjs"
import { Scene1SparkLayer } from "./scene1-sparks.mjs"

class UprisingRocket extends Scene {
  constructor() {
    super(13);
  }

  _onAnimate(tl) {
    const sceneEl = document.querySelector(`#${this.getName()}`);
    const copyEl = document.querySelector("#scene2-copy");
    const gradientEl = copyEl?.querySelector(".scene2-copy__gradient");
    const eyebrowEl = copyEl?.querySelector(".scene2-copy__eyebrow");
    const titleLines = copyEl ? gsap.utils.toArray(copyEl.querySelectorAll(".scene2-copy__title-line")) : [];
    const descLines = copyEl ? gsap.utils.toArray(copyEl.querySelectorAll(".scene2-copy__description-line")) : [];
    const panelEl = copyEl?.querySelector(".scene2-copy__panel");
    const flowColumns = copyEl ? gsap.utils.toArray(copyEl.querySelectorAll(".scene2-copy__flow-column")) : [];
    const flowItems = copyEl ? gsap.utils.toArray(copyEl.querySelectorAll(".scene2-copy__flow-column li")) : [];

    const rocketEl = sceneEl?.querySelector(".scene2-shell__rocket-wrap");
    const rocketFlameEl = sceneEl?.querySelector(".scene2-shell__rocket-flame-inner");
    const farLayer = sceneEl?.querySelector(".scene2-shell__image--far");
    const deckLayer = sceneEl?.querySelector(".scene2-shell__image--deck-band");
    const softLayer = sceneEl?.querySelector(".scene2-shell__image--deck-soft");
    const foreLayer = sceneEl?.querySelector(".scene2-shell__image--foreground");
    const frameLayer = sceneEl?.querySelector(".scene2-shell__image--frame");
    const mistLayer = sceneEl?.querySelector(".scene2-shell__image--mist");
    const sunDisc = sceneEl?.querySelector(".scene2-shell__sun-disc");

    const capturePose = (el, props) =>
      el
        ? props.reduce((acc, prop) => {
            acc[prop] = gsap.getProperty(el, prop);
            return acc;
          }, {})
        : null;

    const layerMid = {
      far: capturePose(farLayer, ["xPercent", "yPercent", "scale", "autoAlpha"]),
      deck: capturePose(deckLayer, ["xPercent", "yPercent", "scale", "autoAlpha"]),
      soft: capturePose(softLayer, ["xPercent", "yPercent", "autoAlpha"]),
      foreground: capturePose(foreLayer, ["xPercent", "yPercent", "scale", "autoAlpha"]),
      frame: capturePose(frameLayer, ["yPercent", "autoAlpha"]),
      mist: capturePose(mistLayer, ["yPercent", "autoAlpha"]),
      sun: capturePose(sunDisc, ["autoAlpha"]),
    };

    const sceneWidth = sceneEl?.clientWidth ?? window.innerWidth;
    const sceneHeight = sceneEl?.clientHeight ?? window.innerHeight;
    const rocketMid = {
      x: gsap.getProperty(rocketEl, "x") || 0,
      y: gsap.getProperty(rocketEl, "y") || 0,
      scale: gsap.getProperty(rocketEl, "scaleX") || 1,
      rotation: gsap.getProperty(rocketEl, "rotation") || 0,
    };
    const rocketVector = {
      x: sceneWidth * 0.9,
      y: -sceneHeight * 0.28,
    };
    const scaleDelta = rocketMid.scale * 0.5;
    const rotationDelta = 7;
    const rocketStart = {
      x: rocketMid.x + rocketVector.x * 0.2,
      y: rocketMid.y - rocketVector.y * 0.4,
      scale: rocketMid.scale + scaleDelta,
      rotation: rocketMid.rotation - rotationDelta,
    };
    const rocketEnd = {
      x: rocketMid.x + rocketVector.x * 0.75,
      y: rocketMid.y + rocketVector.y * 0.2,
      scale: Math.max(0.1, rocketMid.scale - scaleDelta - 0.5),
      rotation: rocketMid.rotation + rotationDelta,
    };

    if (copyEl) {
      gsap.set(copyEl, { autoAlpha: 0, yPercent: 10 });
    }
    if (gradientEl) {
      gsap.set(gradientEl, { autoAlpha: 0 });
    }
    if (eyebrowEl) {
      gsap.set(eyebrowEl, { autoAlpha: 0, yPercent: 26 });
    }
    if (titleLines.length) {
      gsap.set(titleLines, { autoAlpha: 0, yPercent: 24 });
    }
    if (descLines.length) {
      gsap.set(descLines, { autoAlpha: 0, yPercent: 18 });
    }
    if (panelEl) {
      gsap.set(panelEl, { autoAlpha: 0, yPercent: 14 });
    }
    if (flowColumns.length) {
      gsap.set(flowColumns, { autoAlpha: 0, yPercent: 18 });
    }
    if (flowItems.length) {
      gsap.set(flowItems, { autoAlpha: 0, scale: 0.94 });
    }

    if (farLayer) {
      gsap.set(farLayer, {
        xPercent: (layerMid.far?.xPercent ?? 0) - 4,
        yPercent: (layerMid.far?.yPercent ?? 0) + 14,
        scale: (layerMid.far?.scale ?? 1) + 0.08,
        autoAlpha: (layerMid.far?.autoAlpha ?? 1) + 0.18,
      });
    }
    if (deckLayer) {
      gsap.set(deckLayer, {
        xPercent: (layerMid.deck?.xPercent ?? 0) - 6,
        yPercent: (layerMid.deck?.yPercent ?? 0) + 22,
        scale: (layerMid.deck?.scale ?? 1.5) + 0.06,
        autoAlpha: (layerMid.deck?.autoAlpha ?? 1) + 0.12,
      });
    }
    if (softLayer) {
      gsap.set(softLayer, {
        xPercent: (layerMid.soft?.xPercent ?? 0) - 4,
        yPercent: (layerMid.soft?.yPercent ?? 0) + 18,
        autoAlpha: (layerMid.soft?.autoAlpha ?? 0.5) + 0.18,
      });
    }
    if (foreLayer) {
      gsap.set(foreLayer, {
        xPercent: (layerMid.foreground?.xPercent ?? 0) - 4,
        yPercent: (layerMid.foreground?.yPercent ?? 0) + 18,
        scale: (layerMid.foreground?.scale ?? 1.2) + 0.06,
        autoAlpha: (layerMid.foreground?.autoAlpha ?? 1),
      });
    }
    if (frameLayer) {
      gsap.set(frameLayer, {
        yPercent: (layerMid.frame?.yPercent ?? 0) + 12,
        autoAlpha: (layerMid.frame?.autoAlpha ?? 0.8) + 0.1,
      });
    }
    if (mistLayer) {
      gsap.set(mistLayer, {
        yPercent: (layerMid.mist?.yPercent ?? 0) + 10,
        autoAlpha: (layerMid.mist?.autoAlpha ?? 0.2) + 0.2,
      });
    }
    if (sunDisc) {
      gsap.set(sunDisc, { autoAlpha: (layerMid.sun?.autoAlpha ?? 0.5) - 0.2 });
    }

    if (rocketEl) {
      gsap.set(rocketEl, {
        x: rocketStart.x,
        y: rocketStart.y,
        scale: rocketStart.scale,
        rotation: rocketStart.rotation,
        transformOrigin: "31% 77%",
      });
    }
    if (rocketFlameEl) {
      gsap.set(rocketFlameEl, {
        autoAlpha: 0.7,
        scaleY: 0.68,
        transformOrigin: "30% 18%",
      });
    }

    const sceneTl = tl;

    if (rocketEl) {
      sceneTl.to(
        rocketEl,
        {
          x: rocketEnd.x,
          y: rocketEnd.y,
          scale: rocketEnd.scale,
          rotation: rocketEnd.rotation,
          duration: 1.3,
          ease: "linear",
        },
        0,
      );
    }

    if (rocketFlameEl) {
      sceneTl.to(
        rocketFlameEl,
        {
          autoAlpha: layerMid.flame?.autoAlpha ?? 0.92,
          scaleY: (layerMid.flame?.scaleY ?? 1) * 1.05,
          duration: 0.5,
          ease: "power1.out",
        },
        0,
      );
      sceneTl.to(
        rocketFlameEl,
        {
          autoAlpha: 0.5,
          scaleY: 1.5,
          duration: 0.46,
          ease: "power1.in",
        },
        0.54,
      );
    }

    const parallax = [
      {
        element: farLayer,
        mid: layerMid.far,
        start: { xPercent: -4, yPercent: 14, scale: 0.08, autoAlpha: 0.12 },
        end: { xPercent: 4, yPercent: -36, scale: -0.14, autoAlpha: 0.3 },
      },
      {
        element: deckLayer,
        mid: layerMid.deck,
        start: { xPercent: -6, yPercent: 20, scale: 0.06, autoAlpha: 0.1 },
        end: { xPercent: 6, yPercent: -64, scale: -0.32, autoAlpha: -0.4 },
      },
      {
        element: softLayer,
        mid: layerMid.soft,
        start: { xPercent: -4, yPercent: 18, autoAlpha: 0.18 },
        end: { xPercent: 4, yPercent: -48, autoAlpha: -0.22 },
      },
      {
        element: foreLayer,
        mid: layerMid.foreground,
        start: { xPercent: -4, yPercent: 16, scale: 0.06, autoAlpha: 0.08 },
        end: { xPercent: 4, yPercent: -44, scale: -0.3, autoAlpha: -0.4 },
      },
      {
        element: frameLayer,
        mid: layerMid.frame,
        start: { yPercent: 10, autoAlpha: 0.08 },
        end: { yPercent: -32, autoAlpha: -0.24 },
      },
      {
        element: mistLayer,
        mid: layerMid.mist,
        start: { yPercent: 10, autoAlpha: 0.18 },
        end: { yPercent: -28, autoAlpha: -0.28 },
      },
      {
        element: sunDisc,
        mid: layerMid.sun,
        start: { autoAlpha: -0.2 },
        end: { autoAlpha: 0.3 },
      },
    ];

    parallax.forEach(({ element, mid, start, end }) => {
      if (!element || !mid) return;
      const startProps = {};
      const midProps = {};
      const endProps = {};
      Object.keys(mid).forEach((prop) => {
        const base = mid[prop] ?? 0;
        startProps[prop] = base + (start[prop] ?? 0);
        midProps[prop] = base;
        endProps[prop] = base + (end[prop] ?? 0);
      });
      gsap.set(element, startProps);
      sceneTl.to(element, { ...midProps, duration: 0.5, ease: "power2.out" }, 0);
      sceneTl.to(element, { ...endProps, duration: 0.5, ease: "power2.in" }, 0.5);
    });

    if (copyEl) {
      sceneTl.to(copyEl, { autoAlpha: 1, yPercent: 0, duration: 0.4, ease: "power2.out" }, 0.12);
      sceneTl.to(copyEl, { autoAlpha: 0, yPercent: -6, duration: 0.32, ease: "power2.in" }, 0.72);
    }
    if (gradientEl) {
      sceneTl.to(gradientEl, { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, 0.1);
      sceneTl.to(gradientEl, { autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 0.72);
    }
    if (eyebrowEl) {
      sceneTl.to(eyebrowEl, { autoAlpha: 1, yPercent: 0, duration: 0.32, ease: "power2.out" }, 0.18);
      sceneTl.to(eyebrowEl, { autoAlpha: 0, yPercent: -8, duration: 0.28, ease: "power2.in" }, 0.74);
    }
    if (titleLines.length) {
      sceneTl.to(titleLines, { autoAlpha: 1, yPercent: 0, duration: 0.34, ease: "power2.out", stagger: 0.08 }, 0.24);
      sceneTl.to(titleLines, { autoAlpha: 0, yPercent: -10, duration: 0.24, ease: "power2.in", stagger: 0.06 }, 0.72);
    }
    if (descLines.length) {
      sceneTl.to(descLines, { autoAlpha: 1, yPercent: 0, duration: 0.32, ease: "power2.out", stagger: 0.06 }, 0.36);
      sceneTl.to(descLines, { autoAlpha: 0, yPercent: -8, duration: 0.22, ease: "power2.in", stagger: 0.04 }, 0.68);
    }
    if (panelEl) {
      sceneTl.to(panelEl, { autoAlpha: 1, yPercent: 0, duration: 0.36, ease: "power2.out" }, 0.48);
      sceneTl.to(panelEl, { autoAlpha: 0, yPercent: -8, duration: 0.28, ease: "power2.in" }, 0.7);
    }
    if (flowColumns.length) {
      sceneTl.to(flowColumns, { autoAlpha: 1, yPercent: 0, duration: 0.36, ease: "power2.out", stagger: 0.08 }, 0.52);
      sceneTl.to(flowColumns, { autoAlpha: 0, yPercent: -8, duration: 0.26, ease: "power2.in", stagger: 0.06 }, 0.72);
    }
    if (flowItems.length) {
      sceneTl.to(flowItems, { autoAlpha: 1, scale: 1, duration: 0.2, ease: "power1.out", stagger: 0.02 }, 0.56);
      sceneTl.to(flowItems, { autoAlpha: 0, scale: 0.92, duration: 0.18, ease: "power1.in", stagger: 0.02 }, 0.72);
    }

    return sceneTl;
  }
}

class TakeOff extends Scene {
  constructor() {
    super(13);
  }

  _onAnimate(tl) {
    const splitMultilineText = (element, lineClass) => {
      if (!element) {
        return [];
      }

      const htmlSource = element.dataset.splitSourceHtml ?? null;
      const source = (htmlSource ?? element.dataset.splitSource ?? element.textContent ?? "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      if (!source.length) {
        return [];
      }

      if (htmlSource !== null) {
        element.dataset.splitSourceHtml = source.join("\n");
      } else {
        element.dataset.splitSource = source.join("\n");
      }
      element.replaceChildren();

      return source.map((line, index) => {
        const span = document.createElement("span");
        span.className = lineClass;
        if (htmlSource !== null) {
          span.innerHTML = line;
        } else {
          span.textContent = line;
        }
        span.style.setProperty("--line-index", index);
        element.appendChild(span);
        return span;
      });
    };

    const stage = "#scene1-stage";
    const smokeStage = "#scene1-smoke-stage";
    const smokeLeftSelector = `${smokeStage} .scene1-stage__smoke-wrap--left`;
    const smokeRightSelector = `${smokeStage} .scene1-stage__smoke-wrap--right`;
    const rocketSelector = ".scene1-stage__rocket";
    const fireSelector = ".scene1-stage__fire";
    const initialLiftY = () => -window.innerHeight * 0.07;
    const ascentY = () => -window.innerHeight * 1.16;
    const smokeTargets = `${smokeLeftSelector}, ${smokeRightSelector}`;
    const smokeGroundedYPercent = (scale, extra = 0) => (scale - 1) * 8 + extra;
    const stageEl = document.querySelector(stage);
    const fireEl = document.querySelector(fireSelector);
    const flareEl = stageEl?.querySelector(".scene1-stage__flare");
    const glowEl = stageEl?.querySelector(".scene1-stage__ground-glow");
    const hazeEl = stageEl?.querySelector(".scene1-stage__heat-haze");
    const trailEl = stageEl?.querySelector(".scene1-stage__trail");
    const shockwaveEl = stageEl?.querySelector(".scene1-stage__shockwave");
    const gustFrontEl = stageEl?.querySelector(".scene1-stage__gust-front");
    const heroHeaderEl = document.querySelector("#main-content-header");
    const heroNaviEl = document.querySelector("#main-content-navi");
    const copyEl = document.querySelector("#scene1-copy");
    const copyEyebrowEl = copyEl?.querySelector(".scene1-copy__eyebrow");
    const copyTitleEl = copyEl?.querySelector(".scene1-copy__title");
    const copyDescEl = copyEl?.querySelector(".scene1-copy__description");
    const copyKeywordEl = copyEl?.querySelector(".scene1-copy__keyword-card");
    const copyCodeEl = copyEl?.querySelector(".scene1-copy__code-card");
    const titleLines = splitMultilineText(copyTitleEl, "scene1-copy__title-line");
    const descriptionLines = splitMultilineText(copyDescEl, "scene1-copy__description-line");
    const titleTargets = titleLines.length ? titleLines : [copyTitleEl].filter(Boolean);
    const descriptionTargets = descriptionLines.length ? descriptionLines : [copyDescEl].filter(Boolean);
    const ignitionLight = new Scene1IgnitionLight({
      hostSelector: `${stage} .scene1-stage__light3d`,
      stageSelector: stage,
      fireSelector,
      rocketSelector,
    });
    const sparks = new Scene1SparkLayer({
      hostSelector: `${stage} .scene1-stage__fx`,
      fireSelector,
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

    if (glowEl) {
      gsap.set(glowEl, {
        autoAlpha: 0,
        scaleX: 0.74,
        scaleY: 0.56,
        yPercent: 6,
      });
    }

    if (hazeEl) {
      gsap.set(hazeEl, {
        autoAlpha: 0,
        scaleX: 0.7,
        scaleY: 0.5,
        yPercent: 4,
      });
    }

    if (trailEl) {
      gsap.set(trailEl, {
        autoAlpha: 0,
        scaleX: 0.42,
        scaleY: 0.22,
        yPercent: 8,
      });
    }

    if (shockwaveEl) {
      gsap.set(shockwaveEl, {
        autoAlpha: 0,
        scaleX: 0.08,
        scaleY: 0.18,
        yPercent: 4,
      });
    }

    if (gustFrontEl) {
      gsap.set(gustFrontEl, {
        autoAlpha: 0,
        scaleX: 0.12,
        scaleY: 0.66,
        xPercent: -4,
        yPercent: 8,
      });
    }

    if (heroHeaderEl) {
      gsap.set(heroHeaderEl, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
      });
    }

    if (heroNaviEl) {
      gsap.set(heroNaviEl, {
        autoAlpha: 1,
        y: 0,
      });
    }

    if (copyEl) {
      gsap.set(copyEl, {
        autoAlpha: 0,
        xPercent: 0,
        yPercent: 2,
      });
    }

    if (copyEyebrowEl) {
      gsap.set(copyEyebrowEl, {
        autoAlpha: 0,
        yPercent: 30,
      });
    }

    if (titleTargets.length) {
      gsap.set(titleTargets, {
        autoAlpha: 0,
        x: 0,
        yPercent: (index) => 26 + index * 8,
        rotate: 0,
        transformOrigin: "50% 100%",
      });
    }

    if (descriptionTargets.length) {
      gsap.set(descriptionTargets, {
        autoAlpha: 0,
        x: (index) => 14 + index * 8,
        y: (index) => 18 + index * 6,
      });
    }

    if (copyKeywordEl) {
      gsap.set(copyKeywordEl, {
        autoAlpha: 0,
        y: 16,
      });
    }

    if (copyCodeEl) {
      gsap.set(copyCodeEl, {
        autoAlpha: 0,
        y: 20,
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
      .to(glowEl, {
        autoAlpha: 0.34,
        scaleX: 0.88,
        scaleY: 0.72,
        yPercent: 2,
        duration: 0.34,
      }, 0.14)
      .to(hazeEl, {
        autoAlpha: 0.2,
        scaleX: 0.86,
        scaleY: 0.78,
        yPercent: 0,
        duration: 0.26,
      }, 0.18)
      .to(fireSelector, {
        autoAlpha: 0.22,
        scaleX: 0.7,
        scaleY: 0.34,
        yPercent: -2,
        duration: 0.18,
      }, 0.28)
      .to(heroHeaderEl, {
        autoAlpha: 0,
        y: -26,
        scale: 0.96,
        duration: 0.42,
      }, 0.16)
      .to(heroNaviEl, {
        autoAlpha: 0,
        y: -18,
        duration: 0.32,
      }, 0.22)
      .to(copyEl, {
        autoAlpha: 1,
        xPercent: 0,
        yPercent: 0,
        duration: 0.42,
      }, 0.36)
      .to(copyEyebrowEl, {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.28,
      }, 0.42)
      .to(titleTargets, {
        autoAlpha: 1,
        x: 0,
        yPercent: 0,
        duration: 0.38,
      }, 0.52)
      .to(descriptionTargets, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration: 0.28,
        stagger: 0.08,
      }, 0.74)
      .to(copyKeywordEl, {
        autoAlpha: 1,
        y: 0,
        duration: 0.32,
      }, 0.98)
      .to(copyCodeEl, {
        autoAlpha: 1,
        y: 0,
        duration: 0.38,
      }, 1.1)
      .to([rocketSelector, fireSelector], {
        x: -1.2,
        y: 0.7,
        duration: 0.07,
      }, 0.34)
      .to([rocketSelector, fireSelector], {
        x: 1.5,
        y: -0.5,
        duration: 0.07,
      }, 0.41)
      .to([rocketSelector, fireSelector], {
        x: -0.8,
        y: 1,
        duration: 0.07,
      }, 0.48)
      .to([rocketSelector, fireSelector], {
        x: 0.9,
        y: -0.4,
        duration: 0.07,
      }, 0.55)
      .to([rocketSelector, fireSelector], {
        x: 0,
        y: 0,
        duration: 0.12,
      }, 0.62)
      .to(smokeLeftSelector, {
        autoAlpha: 0.48,
        scale: 1.04,
        xPercent: -6,
        yPercent: smokeGroundedYPercent(1.04, 0),
        duration: 0.52,
      }, 0.08)
      .to(smokeRightSelector, {
        autoAlpha: 0.48,
        scale: 1.04,
        xPercent: 6,
        yPercent: smokeGroundedYPercent(1.04, 0),
        duration: 0.52,
      }, 0.08)
      .to(fireSelector, {
        autoAlpha: 0.86,
        scaleX: 0.94,
        scaleY: 1.18,
        yPercent: 10,
        duration: 0.22,
      }, 0.69)
      .to(glowEl, {
        autoAlpha: 0.92,
        scaleX: 1.08,
        scaleY: 1.02,
        yPercent: -4,
        duration: 0.3,
      }, 0.72)
      .to(hazeEl, {
        autoAlpha: 0.6,
        scaleX: 1.02,
        scaleY: 1.08,
        yPercent: -8,
        duration: 0.28,
      }, 0.74)
      .to(shockwaveEl, {
        autoAlpha: 0.88,
        scaleX: 1.22,
        scaleY: 0.88,
        yPercent: 0,
        duration: 0.1,
      }, 1.12)
      .to(gustFrontEl, {
        autoAlpha: 0.4,
        scaleX: 0.56,
        scaleY: 0.84,
        xPercent: 6,
        yPercent: 2,
        duration: 0.14,
      }, 1.16)
      .to(flareEl, {
        autoAlpha: 1,
        scale: 1.34,
        duration: 0.1,
      }, 1.18)
      .to(shockwaveEl, {
        autoAlpha: 0,
        scaleX: 4.8,
        scaleY: 1.86,
        yPercent: -10,
        duration: 0.52,
      }, 1.2)
      .to(flareEl, {
        autoAlpha: 0.52,
        scale: 0.96,
        duration: 0.14,
      }, 1.26)
      .to(gustFrontEl, {
        autoAlpha: 0.18,
        scaleX: 1.02,
        scaleY: 1.04,
        xPercent: 24,
        yPercent: -2,
        duration: 0.42,
      }, 1.28)
      .to(flareEl, {
        autoAlpha: 0,
        scale: 1.96,
        duration: 0.32,
      }, 1.34)
      .to(smokeLeftSelector, {
        autoAlpha: 0.8,
        scale: 1.34,
        xPercent: -22,
        yPercent: smokeGroundedYPercent(1.34, 0.4),
        duration: 1.18,
      }, 0.27)
      .to(smokeRightSelector, {
        autoAlpha: 0.8,
        scale: 1.34,
        xPercent: 22,
        yPercent: smokeGroundedYPercent(1.34, 0.8),
        duration: 1.18,
      }, 0.27)
      .to(trailEl, {
        autoAlpha: 0.4,
        scaleX: 0.76,
        scaleY: 0.86,
        yPercent: -8,
        duration: 0.36,
      }, 1.16)
      .to(rocketSelector, {
        y: initialLiftY,
        scale: 0.98,
        duration: 0.16,
      }, 1.25)
      .to(fireSelector, {
        y: initialLiftY,
        duration: 0.16,
      }, 1.25)
      .to(rocketSelector, {
        y: ascentY,
        xPercent: 0,
        scale: 0.9,
        duration: 0.92,
      }, 1.41)
      .to(fireSelector, {
        y: ascentY,
        xPercent: 0,
        scaleX: 0.74,
        scaleY: 1.12,
        duration: 0.92,
      }, 1.41)
      .to(hazeEl, {
        autoAlpha: 0.36,
        scaleX: 0.88,
        scaleY: 1.18,
        yPercent: -18,
        duration: 0.82,
      }, 1.32)
      .to(trailEl, {
        autoAlpha: 0.64,
        scaleX: 1.02,
        scaleY: 1.22,
        yPercent: -28,
        duration: 0.92,
      }, 1.38)
      .to(gustFrontEl, {
        autoAlpha: 0,
        scaleX: 1.22,
        scaleY: 1.1,
        xPercent: 38,
        yPercent: -5,
        duration: 0.34,
      }, 1.56)
      .to(fireSelector, {
        autoAlpha: 0.03,
        scaleX: 0.52,
        scaleY: 0.28,
        yPercent: 0,
        duration: 0.34,
      }, 1.63)
      .to(glowEl, {
        autoAlpha: 0.22,
        scaleX: 1.12,
        scaleY: 1.16,
        yPercent: -8,
        duration: 0.56,
      }, 1.56)
      .to(smokeLeftSelector, {
        autoAlpha: 0.46,
        scale: 1.5,
        xPercent: -32,
        yPercent: smokeGroundedYPercent(1.5, 0.8),
        duration: 0.74,
      }, 1.29)
      .to(smokeRightSelector, {
        autoAlpha: 0.46,
        scale: 1.5,
        xPercent: 32,
        yPercent: smokeGroundedYPercent(1.5, 1.2),
        duration: 0.74,
      }, 1.29)
      .to(smokeLeftSelector, {
        autoAlpha: 0,
        scale: 1.64,
        xPercent: -40,
        yPercent: smokeGroundedYPercent(1.64, 1.4),
        duration: 0.5,
      }, 1.89)
      .to(smokeRightSelector, {
        autoAlpha: 0,
        scale: 1.64,
        xPercent: 40,
        yPercent: smokeGroundedYPercent(1.64, 1.8),
        duration: 0.5,
      }, 1.89)
      .to(glowEl, {
        autoAlpha: 0,
        scaleX: 1.18,
        scaleY: 1.22,
        yPercent: -12,
        duration: 0.36,
      }, 1.96)
      .to(hazeEl, {
        autoAlpha: 0,
        scaleX: 0.72,
        scaleY: 1.1,
        yPercent: -26,
        duration: 0.4,
      }, 1.92)
      .to(trailEl, {
        autoAlpha: 0.08,
        scaleX: 1.08,
        scaleY: 1.34,
        yPercent: -34,
        duration: 0.48,
      }, 1.96)
      .to(copyEl, {
        autoAlpha: 0.24,
        yPercent: -3,
        duration: 0.36,
      }, 1.96);

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
    this._didUserInteractDuringBoot = false;
    this._teardownBootInteractionGuard = null;
  }

  init() {
    history.scrollRestoration = "manual";
    ScrollTrigger.clearScrollMemory();
    gsap.registerPlugin(ScrollTrigger);
    this._installBootInteractionGuard();

    for(const s of this.scenes)
      s.init()

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      this._jumpToBottom();
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        if (!this._didUserInteractDuringBoot) {
          this._jumpToBottom();
        }
        ScrollTrigger.update();
        this._teardownBootInteractionGuard?.();
        this._teardownBootInteractionGuard = null;
      });
    });
  }

  _installBootInteractionGuard() {
    this._didUserInteractDuringBoot = false;

    const markInteraction = () => {
      this._didUserInteractDuringBoot = true;
    };

    const listenerOptions = { passive: true };
    window.addEventListener("wheel", markInteraction, listenerOptions);
    window.addEventListener("touchstart", markInteraction, listenerOptions);
    window.addEventListener("pointerdown", markInteraction, listenerOptions);
    window.addEventListener("keydown", markInteraction);

    this._teardownBootInteractionGuard = () => {
      window.removeEventListener("wheel", markInteraction, listenerOptions);
      window.removeEventListener("touchstart", markInteraction, listenerOptions);
      window.removeEventListener("pointerdown", markInteraction, listenerOptions);
      window.removeEventListener("keydown", markInteraction);
    };
  }

  _jumpToBottom() {
    const maxScrollTop = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      0,
    );
    window.scrollTo({ top: maxScrollTop, left: 0, behavior: "auto" });
  }
}

var scener = new Scener()

$(function() {
  scener.init()
})