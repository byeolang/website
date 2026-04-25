import { Scene } from "./scene.mjs"
import { Scene1IgnitionLight } from "./scene1-ignition-light.mjs"
import { Scene1SparkLayer } from "./scene1-sparks.mjs"
import { Scene3SpaceField } from "./scene3-space-field.mjs"

class DreamLanding extends Scene {
  constructor() {
    super(11);
  }

  _onAnimate(tl) {
    const sceneEl = document.querySelector(`#${this.getName()}`);

    if (!sceneEl) {
      return tl;
    }

    const skyEl = sceneEl.querySelector(".scene4-shell__image--sky");
    const glowEl = sceneEl.querySelector(".scene4-shell__image--horizon-glow");
    const ridgeEl = sceneEl.querySelector(".scene4-shell__image--horizon-ridge");
    const surfaceEl = sceneEl.querySelector(".scene4-shell__image--surface");
    const rearCrystalEl = sceneEl.querySelector(".scene4-shell__crystal--rear");
    const frontCrystalEl = sceneEl.querySelector(".scene4-shell__crystal--front");
    const rocketGroupEl = sceneEl.querySelector(".scene4-shell__rocket-group");
    const rocketFireEl = sceneEl.querySelector(".scene4-shell__rocket-fire");
    const dustEl = sceneEl.querySelector(".scene4-shell__landing-dust");

    gsap.set(skyEl, {
      scale: 1.04,
      xPercent: 0,
      yPercent: 0,
      autoAlpha: 1,
      transformOrigin: "50% 50%",
    });

    gsap.set(glowEl, {
      scale: 1.02,
      yPercent: 2,
      autoAlpha: 0.24,
      transformOrigin: "50% 58%",
    });

    gsap.set(ridgeEl, {
      scale: 1.03,
      yPercent: 4,
      autoAlpha: 0.42,
      transformOrigin: "50% 64%",
    });

    gsap.set(surfaceEl, {
      scale: 1.02,
      yPercent: 2,
      autoAlpha: 1,
      transformOrigin: "50% 74%",
    });

    gsap.set(rearCrystalEl, {
      xPercent: 4,
      yPercent: 4,
      autoAlpha: 0.72,
      scale: 0.94,
      transformOrigin: "50% 100%",
    });

    gsap.set(frontCrystalEl, {
      xPercent: -5,
      yPercent: 5,
      autoAlpha: 0.82,
      scale: 0.98,
      transformOrigin: "50% 100%",
    });

    gsap.set(rocketGroupEl, {
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: "-62vh",
      scale: 0.64,
      rotation: -1,
      autoAlpha: 0,
      transformOrigin: "50% 78%",
    });

    gsap.set(rocketFireEl, {
      autoAlpha: 0,
      scaleX: 0.28,
      scaleY: 0.22,
      yPercent: -4,
      transformOrigin: "50% 8%",
    });

    gsap.set(dustEl, {
      xPercent: -50,
      yPercent: -50,
      autoAlpha: 0,
      scaleX: 0.22,
      scaleY: 0.22,
      transformOrigin: "50% 50%",
    });

    tl.to(skyEl, {
      scale: 1.01,
      yPercent: -1,
      duration: 1.4,
      ease: "none",
    }, 0);

    tl.to(glowEl, {
      autoAlpha: 0.58,
      yPercent: 0,
      scale: 1,
      duration: 0.42,
      ease: "power2.out",
    }, 0.02);

    tl.to(glowEl, {
      autoAlpha: 0.5,
      scale: 1.015,
      duration: 0.72,
      ease: "sine.inOut",
    }, 0.56);

    tl.to(ridgeEl, {
      autoAlpha: 0.72,
      yPercent: 0,
      scale: 1,
      duration: 0.46,
      ease: "power2.out",
    }, 0.06);

    tl.to(surfaceEl, {
      yPercent: 0,
      scale: 1,
      duration: 0.42,
      ease: "power2.out",
    }, 0.04);

    tl.to(rearCrystalEl, {
      xPercent: 0,
      yPercent: 0,
      autoAlpha: 0.78,
      scale: 1,
      duration: 1.2,
      ease: "none",
    }, 0);

    tl.to(frontCrystalEl, {
      xPercent: 0,
      yPercent: 0,
      autoAlpha: 0.9,
      scale: 1,
      duration: 1.2,
      ease: "none",
    }, 0);

    tl.to(rocketGroupEl, {
      autoAlpha: 1,
      y: "-42vh",
      scale: 0.72,
      rotation: 0.6,
      duration: 0.2,
      ease: "power2.out",
    }, 0.08);

    tl.to(rocketGroupEl, {
      y: "-16vh",
      scale: 0.88,
      rotation: -0.3,
      duration: 0.46,
      ease: "sine.inOut",
    }, 0.28);

    tl.to(rocketGroupEl, {
      y: "0vh",
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: "power2.out",
    }, 0.72);

    tl.to(rocketFireEl, {
      autoAlpha: 0.2,
      scaleX: 0.42,
      scaleY: 0.34,
      yPercent: -2,
      duration: 0.24,
      ease: "power2.out",
    }, 0.26);

    tl.to(rocketFireEl, {
      autoAlpha: 0.66,
      scaleX: 0.58,
      scaleY: 0.7,
      yPercent: 0,
      duration: 0.24,
      ease: "power2.out",
    }, 0.68);

    tl.to(rocketFireEl, {
      autoAlpha: 0.08,
      scaleX: 0.26,
      scaleY: 0.2,
      yPercent: -8,
      duration: 0.22,
      ease: "power2.in",
    }, 0.98);

    tl.to(dustEl, {
      autoAlpha: 0.64,
      scaleX: 0.92,
      scaleY: 0.34,
      duration: 0.16,
      ease: "power2.out",
    }, 0.94);

    tl.to(dustEl, {
      autoAlpha: 0.34,
      scaleX: 1.2,
      scaleY: 0.38,
      duration: 0.32,
      ease: "sine.out",
    }, 1.1);

    tl.to(rocketGroupEl, {
      y: "0.8vh",
      duration: 0.1,
      ease: "power1.out",
    }, 0.98);

    tl.to(rocketGroupEl, {
      y: "0vh",
      duration: 0.14,
      ease: "power1.inOut",
    }, 1.08);

    return tl;
  }
}

class AsteroidBelt extends Scene {
  constructor() {
    super(14);
  }

  _onAnimate(tl) {
    const sceneEl = document.querySelector(`#${this.getName()}`);
    const shellEl = sceneEl?.querySelector(".scene3-shell");

    if (!sceneEl || !shellEl) {
      return tl;
    }

    const sceneWidth = sceneEl.clientWidth || window.innerWidth;
    const sceneHeight = sceneEl.clientHeight || window.innerHeight;
    const density = window.innerWidth < 500 ? 0.74 : window.innerWidth < 900 ? 0.9 : 1;
    const vw = sceneWidth / 100;
    const vh = sceneHeight / 100;

    const copyEl = sceneEl.querySelector("#scene3-copy");
    const gradientEl = copyEl?.querySelector(".scene3-copy__gradient");
    const eyebrowEl = copyEl?.querySelector(".scene3-copy__eyebrow");
    const titleLines = copyEl ? gsap.utils.toArray(copyEl.querySelectorAll(".scene3-copy__title-line")) : [];
    const descLines = copyEl ? gsap.utils.toArray(copyEl.querySelectorAll(".scene3-copy__description-line")) : [];
    const cards = copyEl ? gsap.utils.toArray(copyEl.querySelectorAll(".scene3-copy__card")) : [];
    const errorItems = copyEl ? gsap.utils.toArray(copyEl.querySelectorAll(".scene3-copy__error-list li")) : [];

    const backdropEl = sceneEl.querySelector(".scene3-shell__image--backdrop");
    const nebulaEl = sceneEl.querySelector(".scene3-shell__image--nebula");
    const fallbackEarthEl = sceneEl.querySelector(".scene3-shell__earth-fallback");
    const fallbackPlanetEl = sceneEl.querySelector(".scene3-shell__planet");
    const fallbackPlanetGlowEl = fallbackPlanetEl?.querySelector(".scene3-shell__planet-glow");
    const fallbackPlanetCoreEl = fallbackPlanetEl?.querySelector(".scene3-shell__planet-core");
    const rocketEl = sceneEl.querySelector(".scene3-shell__rocket");
    const rocketGlowEl = sceneEl.querySelector(".scene3-shell__rocket-glow");
    const rocketTrailEl = sceneEl.querySelector(".scene3-shell__rocket-trail");

    const asteroidById = (id) => sceneEl.querySelector(`[data-asteroid="${id}"]`);
    const clusterById = (id) => sceneEl.querySelector(`[data-cluster="${id}"]`);
    const blurById = (id) => sceneEl.querySelector(`[data-blur="${id}"]`);
    const warningById = (id) => sceneEl.querySelector(`[data-warning="${id}"]`);

    const setBox = (element, width, height = width) => {
      if (!element) return;
      element.style.width = `${Math.round(width)}px`;
      element.style.height = `${Math.round(height)}px`;
    };

    const setFlightSize = (element, width) => {
      if (!element) return;
      element.style.width = `${Math.round(width)}px`;
    };

    const addFlight = (element, config) => {
      if (!element || !config?.start || !config?.mid || !config?.end) return;

      if (config.width) {
        setFlightSize(element, config.width);
      }

      gsap.set(element, {
        x: config.start.x,
        y: config.start.y,
        rotation: config.start.rotation ?? 0,
        scale: config.start.scale ?? 1,
        autoAlpha: config.start.autoAlpha ?? 1,
        force3D: true,
        transformOrigin: config.transformOrigin ?? "50% 50%",
      });

      tl.to(
        element,
        {
          x: config.mid.x,
          y: config.mid.y,
          rotation: config.mid.rotation ?? config.start.rotation ?? 0,
          scale: config.mid.scale ?? config.start.scale ?? 1,
          autoAlpha: config.mid.autoAlpha ?? 1,
          force3D: true,
          duration: Math.max(0.01, config.midAt - (config.startAt ?? 0)),
          ease: config.easeIn ?? "power1.out",
        },
        config.startAt ?? 0,
      );

      tl.to(
        element,
        {
          x: config.end.x,
          y: config.end.y,
          rotation: config.end.rotation ?? config.mid.rotation ?? 0,
          scale: config.end.scale ?? config.mid.scale ?? 1,
          autoAlpha: config.end.autoAlpha ?? config.mid.autoAlpha ?? 1,
          force3D: true,
          duration: Math.max(0.01, config.endAt - config.midAt),
          ease: config.easeOut ?? "power2.in",
        },
        config.midAt,
      );
    };

    const spaceField = new Scene3SpaceField({
      host: sceneEl.querySelector(".scene3-shell__three"),
      shell: shellEl,
    });

    const syncSpaceField = () => {
      const sceneProgress = tl.progress();
      const fieldProgress = sceneProgress * 0.78;
      spaceField.setProgress(fieldProgress);
    };

    window.addEventListener("resize", () => {
      spaceField.resize();
    }, { passive: true });

    tl.eventCallback("onUpdate", syncSpaceField);
    syncSpaceField();

    gsap.set(shellEl, { transformPerspective: 1200 });

    if (backdropEl) {
      gsap.set(backdropEl, {
        scale: 1.02,
        xPercent: 0,
        yPercent: 0,
        autoAlpha: 0.78,
        transformOrigin: "50% 50%",
      });
      tl.to(backdropEl, { scale: 1.04, xPercent: 0, yPercent: 0, autoAlpha: 0.9, duration: 0.24, ease: "power2.out" }, 0);
      tl.to(backdropEl, { scale: 1.08, xPercent: 0, yPercent: 0, autoAlpha: 0.92, duration: 0.84, ease: "none" }, 0.24);
    }

    if (nebulaEl) {
      gsap.set(nebulaEl, {
        scale: 1.03,
        xPercent: 0,
        yPercent: 0,
        autoAlpha: 0.44,
        transformOrigin: "50% 50%",
      });
      tl.to(nebulaEl, { scale: 1.05, xPercent: 0, yPercent: 0, autoAlpha: 0.58, duration: 0.28, ease: "power2.out" }, 0.04);
      tl.to(nebulaEl, { scale: 1.1, xPercent: 0, yPercent: 0, autoAlpha: 0.62, duration: 0.8, ease: "none" }, 0.28);
    }

    if (fallbackEarthEl) {
      gsap.set(fallbackEarthEl, {
        x: 0,
        y: sceneHeight * 0.04,
        scale: 1.18,
        autoAlpha: 0,
        transformOrigin: "50% 50%",
      });
      tl.to(fallbackEarthEl, { x: 0, y: sceneHeight * 0.01, scale: 1.05, autoAlpha: 0.96, duration: 0.14, ease: "power2.out" }, 0);
      tl.to(fallbackEarthEl, { x: 0, y: sceneHeight * 0.16, scale: 0.8, autoAlpha: 0, duration: 0.32, ease: "power2.in" }, 0.12);
    }

    if (rocketEl) {
      gsap.set(rocketEl, {
        x: vw * 0.2,
        y: vh * 1.8,
        scale: 1.08 * density,
        rotation: -7,
        autoAlpha: 1,
        transformOrigin: "34% 54%",
      });

      tl.to(rocketEl, { x: vw * 1.4, y: vh * 1.2, scale: 1.08 * density, rotation: -5, duration: 0.18, ease: "power1.out" }, 0);
      tl.to(rocketEl, { x: vw * 2.1, y: vh * 1.7, scale: 1.07 * density, rotation: -8, duration: 0.18, ease: "sine.inOut" }, 0.18);
      tl.to(rocketEl, { x: vw * 2.9, y: vh * 0.9, scale: 1.06 * density, rotation: -4, duration: 0.14, ease: "sine.inOut" }, 0.36);
      tl.to(rocketEl, { x: vw * 3.8, y: vh * 1.5, scale: 1.05 * density, rotation: -7, duration: 0.18, ease: "sine.inOut" }, 0.5);
      tl.to(rocketEl, { x: vw * 4.4, y: vh * 0.8, scale: 1.03 * density, rotation: -5, duration: 0.14, ease: "sine.inOut" }, 0.68);
      tl.to(rocketEl, { x: vw * 5.2, y: vh * 1.2, scale: 1.01 * density, rotation: -6, duration: 0.24, ease: "power2.inOut" }, 0.82);
    }

    if (rocketGlowEl) {
      gsap.set(rocketGlowEl, { autoAlpha: 0.52, scale: 0.96 });
      tl.to(rocketGlowEl, { autoAlpha: 0.86, scale: 1.1, duration: 0.24, ease: "power1.out" }, 0.14);
      tl.to(rocketGlowEl, { autoAlpha: 0.56, scale: 0.98, duration: 0.3, ease: "power2.inOut" }, 0.72);
    }

    if (rocketTrailEl) {
      gsap.set(rocketTrailEl, { autoAlpha: 0.5, scaleX: 0.92, transformOrigin: "100% 50%" });
      tl.to(rocketTrailEl, { autoAlpha: 0.9, scaleX: 1.24, duration: 0.24, ease: "power1.out" }, 0.14);
      tl.to(rocketTrailEl, { autoAlpha: 0.46, scaleX: 1.02, duration: 0.28, ease: "power2.inOut" }, 0.76);
    }

    const isFallbackPlanetVisible = shellEl.classList.contains("scene3-shell--fallback");
    const useDomAsteroids = isFallbackPlanetVisible;

    if (fallbackPlanetEl && isFallbackPlanetVisible) {
      gsap.set(fallbackPlanetEl, {
        x: 0,
        y: 0,
        scale: 0.52,
        autoAlpha: 0,
        transformOrigin: "50% 50%",
      });
      tl.to(
        fallbackPlanetEl,
        {
          x: 0,
          y: 0,
          scale: 1.9,
          autoAlpha: 0.98,
          duration: 0.84,
          ease: "none",
        },
        0.22,
      );
    }

    if (fallbackPlanetGlowEl && isFallbackPlanetVisible) {
      gsap.set(fallbackPlanetGlowEl, { scale: 1.12, autoAlpha: 0, transformOrigin: "50% 50%" });
      tl.to(fallbackPlanetGlowEl, { scale: 1.68, autoAlpha: 0.82, duration: 0.84, ease: "none" }, 0.22);
    }

    if (fallbackPlanetCoreEl && isFallbackPlanetVisible) {
      gsap.set(fallbackPlanetCoreEl, { scale: 0.98, autoAlpha: 0, transformOrigin: "50% 50%" });
      tl.to(fallbackPlanetCoreEl, { scale: 1.12, autoAlpha: 1, duration: 0.84, ease: "none" }, 0.22);
    }

    if (useDomAsteroids) {
      [
        {
          element: asteroidById("large-a"),
          width: Math.min(sceneWidth * 0.4, 520) * density,
          startAt: 0,
          midAt: 0.18,
          endAt: 0.44,
          start: { x: sceneWidth * 0.88, y: sceneHeight * 0.18, rotation: -12, scale: 0.56, autoAlpha: 0.28 },
          mid: { x: sceneWidth * 0.58, y: sceneHeight * 0.24, rotation: 18, scale: 1.32, autoAlpha: 1 },
          end: { x: sceneWidth * 0.02, y: sceneHeight * 0.62, rotation: 84, scale: 3.1, autoAlpha: 0 },
        },
        {
          element: asteroidById("large-b"),
          width: Math.min(sceneWidth * 0.34, 440) * density,
          startAt: 0.04,
          midAt: 0.24,
          endAt: 0.5,
          start: { x: sceneWidth * 0.92, y: sceneHeight * 0.04, rotation: 8, scale: 0.44, autoAlpha: 0.24 },
          mid: { x: sceneWidth * 0.64, y: sceneHeight * 0.14, rotation: -16, scale: 1.08, autoAlpha: 1 },
          end: { x: sceneWidth * 0.14, y: sceneHeight * 0.3, rotation: -64, scale: 2.5, autoAlpha: 0 },
        },
        {
          element: asteroidById("medium-a"),
          width: Math.min(sceneWidth * 0.2, 260) * density,
          startAt: 0.04,
          midAt: 0.24,
          endAt: 0.48,
          start: { x: vw * 104, y: vh * 30, rotation: -20, scale: 0.34, autoAlpha: 0.18 },
          mid: { x: vw * 64, y: vh * 34, rotation: 22, scale: 0.98, autoAlpha: 1 },
          end: { x: vw * 18, y: vh * 48, rotation: 72, scale: 1.98, autoAlpha: 0 },
        },
        {
          element: asteroidById("medium-b"),
          width: Math.min(sceneWidth * 0.18, 230) * density,
          startAt: 0.12,
          midAt: 0.3,
          endAt: 0.54,
          start: { x: vw * 102, y: vh * 56, rotation: -8, scale: 0.28, autoAlpha: 0.16 },
          mid: { x: vw * 68, y: vh * 52, rotation: -24, scale: 0.88, autoAlpha: 0.96 },
          end: { x: vw * 20, y: vh * 62, rotation: -82, scale: 1.82, autoAlpha: 0 },
        },
        {
          element: asteroidById("medium-c"),
          width: Math.min(sceneWidth * 0.115, 156) * density,
          startAt: 0.42,
          midAt: 0.58,
          endAt: 0.78,
          start: { x: vw * 98, y: vh * 14, rotation: 6, scale: 0.16, autoAlpha: 0 },
          mid: { x: vw * 68, y: vh * 18, rotation: 24, scale: 0.62, autoAlpha: 0.88 },
          end: { x: vw * 26, y: vh * 24, rotation: 72, scale: 1.52, autoAlpha: 0 },
        },
        {
          element: asteroidById("medium-d"),
          width: Math.min(sceneWidth * 0.118, 164) * density,
          startAt: 0.48,
          midAt: 0.62,
          endAt: 0.82,
          start: { x: vw * 104, y: vh * 68, rotation: -14, scale: 0.18, autoAlpha: 0 },
          mid: { x: vw * 78, y: vh * 58, rotation: -36, scale: 0.66, autoAlpha: 0.86 },
          end: { x: vw * 42, y: vh * 66, rotation: -84, scale: 1.58, autoAlpha: 0 },
        },
        {
          element: asteroidById("medium-e"),
          width: Math.min(sceneWidth * 0.11, 150) * density,
          startAt: 0.52,
          midAt: 0.68,
          endAt: 0.88,
          start: { x: vw * 92, y: vh * 2, rotation: -18, scale: 0.14, autoAlpha: 0 },
          mid: { x: vw * 68, y: vh * 8, rotation: 16, scale: 0.56, autoAlpha: 0.84 },
          end: { x: vw * 38, y: vh * 14, rotation: 54, scale: 1.34, autoAlpha: 0 },
        },
        {
          element: asteroidById("medium-f"),
          width: Math.min(sceneWidth * 0.116, 160) * density,
          startAt: 0.58,
          midAt: 0.74,
          endAt: 0.94,
          start: { x: vw * 94, y: vh * 40, rotation: 14, scale: 0.14, autoAlpha: 0 },
          mid: { x: vw * 70, y: vh * 36, rotation: -18, scale: 0.52, autoAlpha: 0.78 },
          end: { x: vw * 40, y: vh * 28, rotation: -58, scale: 1.28, autoAlpha: 0 },
        },
      ].forEach((config) => {
        addFlight(config.element, config);
      });

      [
        {
          element: clusterById("alpha"),
          width: Math.min(sceneWidth * 0.26, 320) * density,
          height: Math.min(sceneWidth * 0.2, 250) * density,
          startAt: 0.12,
          midAt: 0.32,
          endAt: 0.56,
          start: { x: sceneWidth * 0.86, y: sceneHeight * 0.28, rotation: -10, scale: 0.52, autoAlpha: 0.18 },
          mid: { x: sceneWidth * 0.56, y: sceneHeight * 0.34, rotation: 10, scale: 1.08, autoAlpha: 1 },
          end: { x: sceneWidth * 0.08, y: sceneHeight * 0.6, rotation: 30, scale: 1.86, autoAlpha: 0 },
        },
        {
          element: clusterById("beta"),
          width: Math.min(sceneWidth * 0.22, 280) * density,
          height: Math.min(sceneWidth * 0.18, 220) * density,
          startAt: 0.08,
          midAt: 0.24,
          endAt: 0.44,
          start: { x: sceneWidth * 0.92, y: sceneHeight * 0.1, rotation: 12, scale: 0.42, autoAlpha: 0.14 },
          mid: { x: sceneWidth * 0.62, y: sceneHeight * 0.18, rotation: -10, scale: 0.92, autoAlpha: 0.96 },
          end: { x: sceneWidth * 0.16, y: sceneHeight * 0.32, rotation: -34, scale: 1.62, autoAlpha: 0 },
        },
        {
          element: clusterById("gamma"),
          width: Math.min(sceneWidth * 0.14, 184) * density,
          height: Math.min(sceneWidth * 0.12, 150) * density,
          startAt: 0.54,
          midAt: 0.7,
          endAt: 0.9,
          start: { x: vw * 92, y: vh * 58, rotation: -18, scale: 0.24, autoAlpha: 0 },
          mid: { x: vw * 68, y: vh * 50, rotation: 8, scale: 0.66, autoAlpha: 0.74 },
          end: { x: vw * 30, y: vh * 64, rotation: 28, scale: 1.3, autoAlpha: 0 },
        },
      ].forEach((config) => {
        if (config.element) {
          setBox(config.element, config.width, config.height);
        }
        addFlight(config.element, config);
      });

      [
        {
          element: blurById("alpha"),
          width: Math.min(sceneWidth * 0.34, 420) * density,
          height: Math.min(sceneWidth * 0.34, 420) * density,
          startAt: 0.06,
          midAt: 0.22,
          endAt: 0.4,
          start: { x: sceneWidth * 0.9, y: sceneHeight * 0.14, rotation: -18, scale: 0.74, autoAlpha: 0.18 },
          mid: { x: sceneWidth * 0.58, y: sceneHeight * 0.18, rotation: -42, scale: 1.42, autoAlpha: 0.98 },
          end: { x: sceneWidth * 0.12, y: sceneHeight * 0.24, rotation: -78, scale: 2.44, autoAlpha: 0 },
        },
        {
          element: blurById("beta"),
          width: Math.min(sceneWidth * 0.28, 340) * density,
          height: Math.min(sceneWidth * 0.28, 340) * density,
          startAt: 0.16,
          midAt: 0.32,
          endAt: 0.5,
          start: { x: sceneWidth * 0.84, y: sceneHeight * 0.56, rotation: -10, scale: 0.62, autoAlpha: 0.14 },
          mid: { x: sceneWidth * 0.54, y: sceneHeight * 0.5, rotation: -34, scale: 1.18, autoAlpha: 0.9 },
          end: { x: sceneWidth * 0.08, y: sceneHeight * 0.38, rotation: -60, scale: 2.08, autoAlpha: 0 },
        },
      ].forEach((config) => {
        if (config.element) {
          setBox(config.element, config.width, config.height);
        }
        addFlight(config.element, config);
      });
    }

    [
      {
        element: warningById("type"),
        width: Math.min(sceneWidth * 0.12, 160) * density,
        height: Math.min(sceneWidth * 0.09, 120) * density,
        startAt: 0.46,
        midAt: 0.56,
        endAt: 0.66,
        start: { x: sceneWidth * 0.6, y: sceneHeight * 0.13, rotation: -4, scale: 0.9, autoAlpha: 0 },
        mid: { x: sceneWidth * 0.53, y: sceneHeight * 0.17, rotation: -2, scale: 1, autoAlpha: 1 },
        end: { x: sceneWidth * 0.5, y: sceneHeight * 0.19, rotation: 2, scale: 1.08, autoAlpha: 0 },
      },
      {
        element: warningById("call"),
        width: Math.min(sceneWidth * 0.11, 150) * density,
        height: Math.min(sceneWidth * 0.085, 110) * density,
        startAt: 0.54,
        midAt: 0.64,
        endAt: 0.74,
        start: { x: sceneWidth * 0.64, y: sceneHeight * 0.33, rotation: 8, scale: 0.9, autoAlpha: 0 },
        mid: { x: sceneWidth * 0.58, y: sceneHeight * 0.32, rotation: 4, scale: 1, autoAlpha: 0.98 },
        end: { x: sceneWidth * 0.54, y: sceneHeight * 0.29, rotation: -2, scale: 1.08, autoAlpha: 0 },
      },
    ].forEach((config) => {
      if (config.element) {
        setBox(config.element, config.width, config.height);
      }
      addFlight(config.element, config);
    });

    if (copyEl) {
      gsap.set(copyEl, { autoAlpha: 0, y: 26 });
      tl.to(copyEl, { autoAlpha: 1, y: 0, duration: 0.24, ease: "power2.out" }, 0.2);
      tl.to(copyEl, { autoAlpha: 0, y: -18, duration: 0.18, ease: "power2.in" }, 0.88);
    }

    if (gradientEl) {
      gsap.set(gradientEl, { autoAlpha: 0 });
      tl.to(gradientEl, { autoAlpha: 1, duration: 0.26, ease: "power2.out" }, 0.16);
      tl.to(gradientEl, { autoAlpha: 0, duration: 0.18, ease: "power2.in" }, 0.88);
    }

    if (eyebrowEl) {
      gsap.set(eyebrowEl, { autoAlpha: 0, yPercent: 24 });
      tl.to(eyebrowEl, { autoAlpha: 1, yPercent: 0, duration: 0.22, ease: "power2.out" }, 0.22);
      tl.to(eyebrowEl, { autoAlpha: 0, yPercent: -10, duration: 0.16, ease: "power2.in" }, 0.86);
    }

    if (titleLines.length) {
      gsap.set(titleLines, { autoAlpha: 0, yPercent: 20 });
      tl.to(titleLines, { autoAlpha: 1, yPercent: 0, duration: 0.24, ease: "power2.out", stagger: 0.06 }, 0.26);
      tl.to(titleLines, { autoAlpha: 0, yPercent: -10, duration: 0.18, ease: "power2.in", stagger: 0.04 }, 0.84);
    }

    if (descLines.length) {
      gsap.set(descLines, { autoAlpha: 0, yPercent: 16 });
      tl.to(descLines, { autoAlpha: 1, yPercent: 0, duration: 0.22, ease: "power2.out", stagger: 0.04 }, 0.34);
      tl.to(descLines, { autoAlpha: 0, yPercent: -8, duration: 0.16, ease: "power2.in", stagger: 0.04 }, 0.84);
    }

    if (cards.length) {
      gsap.set(cards, { autoAlpha: 0, yPercent: 12, scale: 0.96 });
      tl.to(cards, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.26, ease: "power2.out", stagger: 0.08 }, 0.44);
      tl.to(cards, { autoAlpha: 0, yPercent: -8, scale: 0.96, duration: 0.16, ease: "power2.in", stagger: 0.04 }, 0.86);
    }

    if (errorItems.length) {
      gsap.set(errorItems, { autoAlpha: 0, x: 10 });
      tl.to(errorItems, { autoAlpha: 1, x: 0, duration: 0.18, ease: "power2.out", stagger: 0.04 }, 0.52);
      tl.to(errorItems, { autoAlpha: 0, x: 8, duration: 0.14, ease: "power2.in", stagger: 0.03 }, 0.86);
    }

    return tl;
  }
}

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
      sceneTl.to(copyEl, { autoAlpha: 1, yPercent: 0, duration: 0.32, ease: "power2.out" }, 0.02);
      sceneTl.to(copyEl, { autoAlpha: 0, yPercent: -6, duration: 0.22, ease: "power2.in" }, 0.86);
    }
    if (gradientEl) {
      sceneTl.to(gradientEl, { autoAlpha: 1, duration: 0.3, ease: "power2.out" }, 0.02);
      sceneTl.to(gradientEl, { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, 0.86);
    }
    if (eyebrowEl) {
      sceneTl.to(eyebrowEl, { autoAlpha: 1, yPercent: 0, duration: 0.28, ease: "power2.out" }, 0.04);
      sceneTl.to(eyebrowEl, { autoAlpha: 0, yPercent: -8, duration: 0.22, ease: "power2.in" }, 0.88);
    }
    if (titleLines.length) {
      sceneTl.to(titleLines, { autoAlpha: 1, yPercent: 0, duration: 0.28, ease: "power2.out", stagger: 0.06 }, 0.08);
      sceneTl.to(titleLines, { autoAlpha: 0, yPercent: -10, duration: 0.2, ease: "power2.in", stagger: 0.06 }, 0.84);
    }
    if (descLines.length) {
      sceneTl.to(descLines, { autoAlpha: 1, yPercent: 0, duration: 0.28, ease: "power2.out", stagger: 0.04 }, 0.14);
      sceneTl.to(descLines, { autoAlpha: 0, yPercent: -8, duration: 0.2, ease: "power2.in", stagger: 0.04 }, 0.84);
    }
    if (panelEl) {
      sceneTl.to(panelEl, { autoAlpha: 1, yPercent: 0, duration: 0.3, ease: "power2.out" }, 0.28);
      sceneTl.to(panelEl, { autoAlpha: 0, yPercent: -8, duration: 0.22, ease: "power2.in" }, 0.84);
    }
    if (flowColumns.length) {
      sceneTl.to(flowColumns, { autoAlpha: 1, yPercent: 0, duration: 0.3, ease: "power2.out", stagger: 0.06 }, 0.36);
      sceneTl.to(flowColumns, { autoAlpha: 0, yPercent: -8, duration: 0.22, ease: "power2.in", stagger: 0.06 }, 0.86);
    }
    if (flowItems.length) {
      sceneTl.to(flowItems, { autoAlpha: 1, scale: 1, duration: 0.16, ease: "power1.out", stagger: 0.02 }, 0.42);
      sceneTl.to(flowItems, { autoAlpha: 0, scale: 0.92, duration: 0.14, ease: "power1.in", stagger: 0.02 }, 0.86);
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
      new TakeOff(), new UprisingRocket(), new AsteroidBelt(), new DreamLanding()
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
