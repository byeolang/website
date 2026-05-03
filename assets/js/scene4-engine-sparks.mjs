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

export class Scene4EngineSparks {
  constructor({ host, fire }) {
    this.host = host;
    this.fire = fire;
    this.enabled = false;
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
      console.warn("Scene4EngineSparks disabled", error);
      this.destroy();
    }
  }

  _initParticles() {
    this.count = window.innerWidth <= 760 ? 280 : 560;
    this.positions = new Float32Array(this.count * 3);
    this.colors = new Float32Array(this.count * 3);
    this.sizes = new Float32Array(this.count);
    this.trails = new Float32Array(this.count * 3);
    this.seeds = Array.from({ length: this.count }, (_, index) => ({
      gate: pseudo(index + 0.29),
      phase: pseudo(index + 1.91),
      spread: pseudo(index + 3.43),
      speed: pseudo(index + 5.17),
      curl: pseudo(index + 6.71),
      heat: pseudo(index + 8.11),
      size: pseudo(index + 9.67),
    }));
  }

  _initCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.className = "scene4-shell__spark-canvas";
    this.ctx = this.canvas.getContext("2d");

    if (!this.ctx) {
      throw new Error("2D canvas context unavailable");
    }

    this.host.replaceChildren(this.canvas);

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

  _emissionStrength(time) {
    const firstBurn = smoothstep(0.2, 0.34, time) * (1 - smoothstep(0.56, 0.7, time)) * 0.56;
    const brakingBurn = smoothstep(0.5, 0.66, time) * (1 - smoothstep(1.02, 1.24, time));
    return clamp(Math.max(firstBurn, brakingBurn) * 1.18);
  }

  _getEmitterPoint() {
    const hostRect = this.host.getBoundingClientRect();
    const fireRect = this.fire.getBoundingClientRect();

    return {
      x: fireRect.left - hostRect.left + fireRect.width * 0.5,
      y: fireRect.top - hostRect.top + fireRect.height * 0.12,
    };
  }

  _getSparkTier(seedValue) {
    if (seedValue < 0.74) {
      const t = seedValue / 0.74;
      return {
        sizeMul: 0.42 + t * 0.28,
        trailLengthMul: 0.72 + t * 0.3,
        trailWidthMul: 0.72 + t * 0.24,
        brightnessMul: 0.88 + t * 0.1,
      };
    }

    if (seedValue < 0.94) {
      const t = (seedValue - 0.74) / 0.2;
      return {
        sizeMul: 0.9 + t * 0.38,
        trailLengthMul: 1.1 + t * 0.34,
        trailWidthMul: 1 + t * 0.32,
        brightnessMul: 1 + t * 0.12,
      };
    }

    const t = (seedValue - 0.94) / 0.06;
    return {
      sizeMul: 1.52 + t * 0.68,
      trailLengthMul: 1.46 + t * 0.5,
      trailWidthMul: 1.28 + t * 0.42,
      brightnessMul: 1.1 + t * 0.12,
    };
  }

  setPhase(time) {
    if (!this.enabled) {
      return;
    }

    this.time = Math.max(0, time);
    const intensity = this._emissionStrength(this.time);
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

      const age = (this.time * (1.9 + seed.speed * 1.4) + seed.phase) % 1;
      const plumeStrength = 0.75 + intensity * 1.2;
      const downwardTravel = age * age * (22 + seed.speed * 86) * plumeStrength;
      const lateralSpread = (seed.spread - 0.5) * (12 + age * 46) * plumeStrength;
      const curl = Math.sin(age * 9 + seed.curl * Math.PI * 2) * (2.4 + 7.4 * (1 - age));
      const shimmer = Math.cos(age * 17 + seed.phase * Math.PI * 2) * (1.2 + 3.4 * age);
      const tier = this._getSparkTier(seed.size);

      this.positions[offset] = emitter.x + lateralSpread + curl + shimmer;
      this.positions[offset + 1] = emitter.y + downwardTravel;
      this.positions[offset + 2] = 0;

      const driftVelocity = (seed.spread - 0.5) * (14 + age * 24) + Math.cos(age * 8 + seed.curl * 5.4) * 3.8;
      const dropVelocity = 18 + seed.speed * 30 + age * 48;
      const velocityLength = Math.hypot(driftVelocity, dropVelocity) || 1;
      const responsive = window.innerWidth <= 760 ? 0.82 : 1;
      const trailLength = (6 + (1 - age) * 9 + intensity * 7.8) * tier.trailLengthMul * responsive;
      const trailWidth = Math.max(0.72, (0.68 + (1 - age) * 0.82 + intensity * 0.48) * tier.trailWidthMul * responsive);

      this.trails[offset] = (driftVelocity / velocityLength) * trailLength;
      this.trails[offset + 1] = (dropVelocity / velocityLength) * trailLength;
      this.trails[offset + 2] = trailWidth;

      const brightness = (1 - age * 0.76) * (0.72 + intensity * 1.05) * tier.brightnessMul;
      const heatMix = 1 - age * (0.84 + seed.heat * 0.08);

      this.colors[offset] = (0.96 + heatMix * 0.04) * brightness;
      this.colors[offset + 1] = (0.28 + heatMix * 0.56) * brightness;
      this.colors[offset + 2] = (0.03 + heatMix * 0.04) * brightness;
      this.sizes[index] = (0.78 + (1 - age) * 1.15 + intensity * 0.78) * tier.sizeMul * responsive;
    }

    this.render();
  }

  setProgress(progress) {
    this.setPhase(progress);
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
      const alpha = clamp(Math.max(r * 0.78, g * 0.86), 0, 0.88);
      const trailX = this.trails[offset];
      const trailY = this.trails[offset + 1];
      const trailWidth = this.trails[offset + 2];
      const tailX = x - trailX;
      const tailY = y - trailY;

      const streakGradient = this.ctx.createLinearGradient(x, y, tailX, tailY);
      streakGradient.addColorStop(0, `rgba(255, 248, 232, ${alpha})`);
      streakGradient.addColorStop(0.22, `rgba(255, 214, 128, ${alpha * 0.78})`);
      streakGradient.addColorStop(0.58, `rgba(255, 132, 42, ${alpha * 0.28})`);
      streakGradient.addColorStop(1, "rgba(255, 110, 30, 0)");

      this.ctx.strokeStyle = streakGradient;
      this.ctx.lineWidth = trailWidth;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(tailX, tailY);
      this.ctx.stroke();

      const glowGradient = this.ctx.createRadialGradient(x, y, 0, x, y, size * 1.2);
      glowGradient.addColorStop(0, `rgba(255, 248, 236, ${Math.min(alpha, 0.9)})`);
      glowGradient.addColorStop(0.25, `rgba(${Math.round(r * 255)}, ${Math.round(g * 238)}, ${Math.round((b + 0.02) * 160)}, ${alpha * 0.68})`);
      glowGradient.addColorStop(0.62, `rgba(255, 150, 44, ${alpha * 0.16})`);
      glowGradient.addColorStop(1, "rgba(255, 120, 32, 0)");

      this.ctx.fillStyle = glowGradient;
      this.ctx.beginPath();
      this.ctx.arc(x, y, size * 1.2, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.globalCompositeOperation = "source-over";
  }
}
