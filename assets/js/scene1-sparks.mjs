const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const smoothstep = (edge0, edge1, value) => {
  if (edge0 === edge1) {
    return value < edge0 ? 0 : 1;
  }

  const t = clamp((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

const pseudo = (seed) => {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453123;
  return value - Math.floor(value);
};

export class Scene1SparkLayer {
  constructor({ hostSelector, fireSelector }) {
    this.host = document.querySelector(hostSelector);
    this.fire = document.querySelector(fireSelector);
    this.enabled = false;
    this.mode = "canvas";
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);

    if (!this.host || !this.fire) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    try {
      this._initParticles();
      this._initCanvas();
      this.enabled = true;
      this.setProgress(0);
    } catch (error) {
      console.warn("Scene1SparkLayer disabled", error);
      this.destroy();
    }
  }

  _initParticles() {
    this.count = window.innerWidth <= 760 ? 192 : 360;
    this.positions = new Float32Array(this.count * 3);
    this.colors = new Float32Array(this.count * 3);
    this.sizes = new Float32Array(this.count);
    this.trails = new Float32Array(this.count * 3);
    this.seeds = Array.from({ length: this.count }, (_, index) => ({
      gate: pseudo(index + 0.11),
      phase: pseudo(index + 1.73),
      spread: pseudo(index + 3.19),
      speed: pseudo(index + 4.61),
      curl: pseudo(index + 6.07),
      heat: pseudo(index + 7.57),
      size: pseudo(index + 9.13),
    }));
  }

  _initCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.className = "scene1-stage__fx-canvas";
    this.ctx = this.canvas.getContext("2d");

    if (!this.ctx) {
      throw new Error("2D canvas context unavailable");
    }

    this.host.replaceChildren(this.canvas);
    this.host.dataset.sparkRenderer = "canvas";

    this._handleResize = () => this.resize();
    window.addEventListener("resize", this._handleResize);

    if ("ResizeObserver" in window) {
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(this.host);
    }

    this.resize();
  }

  resize() {
    if (!this.canvas || !this.ctx || !this.host) {
      return;
    }

    const rect = this.host.getBoundingClientRect();
    this.width = Math.max(1, Math.round(rect.width));
    this.height = Math.max(1, Math.round(rect.height));

    this.canvas.width = Math.max(1, Math.round(this.width * this.pixelRatio));
    this.canvas.height = Math.max(1, Math.round(this.height * this.pixelRatio));
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
    this.render();
  }

  destroy() {
    window.removeEventListener("resize", this._handleResize);
    this.resizeObserver?.disconnect();
    this.host?.replaceChildren();
    this.enabled = false;
  }

  _emissionStrength(progress) {
    const ignition = smoothstep(0.22, 0.34, progress) * 0.7;
    const sustained = smoothstep(0.48, 0.6, progress);
    const fade = 1 - smoothstep(0.9, 0.985, progress);
    return clamp(Math.max(ignition, sustained) * fade);
  }

  _getEmitterPoint() {
    const hostRect = this.host.getBoundingClientRect();
    const fireRect = this.fire.getBoundingClientRect();

    return {
      x: fireRect.left - hostRect.left + fireRect.width * 0.5,
      y: fireRect.top - hostRect.top + Math.min(8, fireRect.height * 0.16),
    };
  }

  _getSparkTier(seedValue) {
    if (seedValue < 0.7) {
      const t = seedValue / 0.7;
      return {
        sizeMul: 0.24 + t * 0.22,
        trailLengthMul: 0.56 + t * 0.2,
        trailWidthMul: 0.5 + t * 0.18,
        brightnessMul: 0.92 + t * 0.1,
      };
    }

    if (seedValue < 0.93) {
      const t = (seedValue - 0.7) / 0.23;
      return {
        sizeMul: 0.72 + t * 0.3,
        trailLengthMul: 0.94 + t * 0.24,
        trailWidthMul: 0.84 + t * 0.2,
        brightnessMul: 1.02 + t * 0.1,
      };
    }

    const t = (seedValue - 0.93) / 0.07;
    return {
      sizeMul: 1.28 + t * 0.62,
      trailLengthMul: 1.26 + t * 0.38,
      trailWidthMul: 1.14 + t * 0.32,
      brightnessMul: 1.14 + t * 0.1,
    };
  }

  setProgress(progress) {
    if (!this.enabled) {
      return;
    }

    this.progress = clamp(progress);
    const intensity = this._emissionStrength(this.progress);
    const emitter = this._getEmitterPoint();

    for (let index = 0; index < this.count; index += 1) {
      const offset = index * 3;
      const seed = this.seeds[index];
      const active = seed.gate < intensity;

      if (!active) {
        this.positions[offset] = emitter.x;
        this.positions[offset + 1] = emitter.y;
        this.positions[offset + 2] = 0;
        this.colors[offset] = 0;
        this.colors[offset + 1] = 0;
        this.colors[offset + 2] = 0;
        this.sizes[index] = 0;
        this.trails[offset] = 0;
        this.trails[offset + 1] = 0;
        this.trails[offset + 2] = 0;
        continue;
      }

      const age = (this.progress * (2.9 + seed.speed * 1.7) + seed.phase) % 1;
      const plumeStrength = 0.7 + intensity * 1.05;
      const downwardTravel = age * age * (38 + seed.speed * 152) * plumeStrength;
      const lateralSpread = (seed.spread - 0.5) * (14 + age * 54) * plumeStrength;
      const curl = Math.sin(age * 10 + seed.curl * Math.PI * 2) * (2.4 + 8 * (1 - age));
      const shimmer = Math.cos(age * 15 + seed.phase * Math.PI * 2) * (1 + 3 * age);
      const tier = this._getSparkTier(seed.size);

      this.positions[offset] = emitter.x + lateralSpread + curl + shimmer;
      this.positions[offset + 1] = emitter.y + downwardTravel;
      this.positions[offset + 2] = 0;

      const driftVelocity = (seed.spread - 0.5) * (14 + age * 22) + Math.cos(age * 9 + seed.curl * 5.4) * 3.2;
      const dropVelocity = 18 + seed.speed * 26 + age * 56;
      const velocityLength = Math.hypot(driftVelocity, dropVelocity) || 1;
      const trailLength = (4.8 + (1 - age) * 7.2 + intensity * 5.4) * tier.trailLengthMul * (window.innerWidth <= 760 ? 0.84 : 1);
      const trailWidth = Math.max(0.42, (0.42 + (1 - age) * 0.7 + intensity * 0.34) * tier.trailWidthMul * (window.innerWidth <= 760 ? 0.86 : 1));

      this.trails[offset] = (driftVelocity / velocityLength) * trailLength;
      this.trails[offset + 1] = (dropVelocity / velocityLength) * trailLength;
      this.trails[offset + 2] = trailWidth;

      const brightness = (1 - age * 0.76) * (0.58 + intensity * 0.82) * tier.brightnessMul;
      const heatMix = 1 - age * (0.84 + seed.heat * 0.08);

      this.colors[offset] = (0.96 + heatMix * 0.04) * brightness;
      this.colors[offset + 1] = (0.3 + heatMix * 0.58) * brightness;
      this.colors[offset + 2] = (0.03 + heatMix * 0.04) * brightness;
      this.sizes[index] = (0.42 + (1 - age) * 0.86 + intensity * 0.54) * tier.sizeMul * (window.innerWidth <= 760 ? 0.84 : 1);
    }

    this.render();
  }

  render() {
    if (!this.ctx) {
      return;
    }

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.globalCompositeOperation = "lighter";
    this.ctx.lineCap = "round";

    for (let index = 0; index < this.count; index += 1) {
      const size = this.sizes[index];

      if (size <= 0) {
        continue;
      }

      const offset = index * 3;
      const x = this.positions[offset];
      const y = this.positions[offset + 1];
      const r = clamp(this.colors[offset], 0, 1.5);
      const g = clamp(this.colors[offset + 1], 0, 1.5);
      const b = clamp(this.colors[offset + 2], 0, 1.1);
      const alpha = clamp(Math.max(r * 0.84, g * 0.88), 0, 0.94);
      const trailX = this.trails[offset];
      const trailY = this.trails[offset + 1];
      const trailWidth = this.trails[offset + 2];
      const tailX = x - trailX;
      const tailY = y - trailY;

      const streakGradient = this.ctx.createLinearGradient(x, y, tailX, tailY);
      streakGradient.addColorStop(0, `rgba(255, 248, 232, ${alpha})`);
      streakGradient.addColorStop(0.2, `rgba(255, 214, 128, ${alpha * 0.82})`);
      streakGradient.addColorStop(0.58, `rgba(255, 132, 42, ${alpha * 0.3})`);
      streakGradient.addColorStop(1, "rgba(255, 110, 30, 0)");

      this.ctx.strokeStyle = streakGradient;
      this.ctx.lineWidth = trailWidth;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(tailX, tailY);
      this.ctx.stroke();

      const glowGradient = this.ctx.createRadialGradient(x, y, 0, x, y, size * 1.18);
      glowGradient.addColorStop(0, `rgba(255, 248, 236, ${Math.min(alpha, 0.92)})`);
      glowGradient.addColorStop(0.25, `rgba(${Math.round(r * 255)}, ${Math.round(g * 238)}, ${Math.round((b + 0.02) * 160)}, ${alpha * 0.72})`);
      glowGradient.addColorStop(0.62, `rgba(255, 150, 44, ${alpha * 0.18})`);
      glowGradient.addColorStop(1, "rgba(255, 120, 32, 0)");

      this.ctx.fillStyle = glowGradient;
      this.ctx.beginPath();
      this.ctx.arc(x, y, size * 1.18, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.globalCompositeOperation = "source-over";
  }
}
