import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";

const prefersReducedMotion = typeof window !== "undefined"
  && typeof window.matchMedia === "function"
  && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp01 = (value) => Math.max(0, Math.min(1, value));
const mix = (from, to, amount) => from + (to - from) * amount;
const smoothstep = (edge0, edge1, value) => {
  if (edge0 === edge1) return value >= edge1 ? 1 : 0;

  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

const randomBetween = (min, max) => min + Math.random() * (max - min);

export class Scene4AtmosphereField {
  constructor({ host }) {
    this.host = host;
    this.width = 0;
    this.height = 0;
    this.progress = 0;
    this.time = 0;
    this.enabled = false;

    if (!this.host || prefersReducedMotion) {
      return;
    }

    try {
      this._init();
    } catch (error) {
      console.warn("Scene4AtmosphereField WebGL disabled:", error);
      this.destroy();
    }
  }

  _init() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      premultipliedAlpha: true,
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    this.renderer.domElement.setAttribute("aria-hidden", "true");
    this.renderer.domElement.style.width = "100%";
    this.renderer.domElement.style.height = "100%";
    this.renderer.domElement.style.display = "block";
    this.host.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-50, 50, 50, -50, 0.1, 10);
    this.camera.position.z = 4;

    this._createAtmosphereParticles();
    this._createSparkleStars();
    this._createHorizonShimmer();
    this._createMotes();
    this._createFireGlow();

    this.enabled = true;
    this.resize();
    this._animate();

    window.addEventListener("resize", () => this.resize(), { passive: true });
  }

  _createAtmosphereParticles() {
    const count = 260;
    this.atmosphereSeeds = Array.from({ length: count }, () => ({
      x: randomBetween(-54, 54),
      y: randomBetween(-48, 52),
      drift: randomBetween(-4, 4),
      speed: randomBetween(12, 32),
      phase: Math.random() * Math.PI * 2,
    }));

    this.atmospherePositions = new Float32Array(count * 3);
    this.atmosphereGeometry = new THREE.BufferGeometry();
    this.atmosphereGeometry.setAttribute("position", new THREE.BufferAttribute(this.atmospherePositions, 3));

    this.atmosphereMaterial = new THREE.PointsMaterial({
      color: 0xbdd7ef,
      size: 2.2,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
      blending: THREE.NormalBlending,
      sizeAttenuation: false,
    });

    this.atmospherePoints = new THREE.Points(this.atmosphereGeometry, this.atmosphereMaterial);
    this.scene.add(this.atmospherePoints);
  }

  _createSparkleStars() {
    const count = 90;
    this.sparkleSeeds = Array.from({ length: count }, () => {
      let x = randomBetween(-64, 64);
      let y = randomBetween(-43, 46);

      if (Math.abs(x) < 13 && y > -25 && y < 18) {
        x += x < 0 ? -18 : 18;
      }

      return {
        x,
        y,
        size: randomBetween(2.2, 4.6),
        phase: Math.random(),
        rate: randomBetween(0.16, 0.34),
        strength: randomBetween(0.35, 0.95),
      };
    });

    this.sparklePositions = new Float32Array(count * 3);
    this.sparkleSizes = new Float32Array(count);
    this.sparkleAlphas = new Float32Array(count);

    this.sparkleSeeds.forEach((seed, index) => {
      const i = index * 3;
      this.sparklePositions[i] = seed.x;
      this.sparklePositions[i + 1] = seed.y;
      this.sparklePositions[i + 2] = 0;
      this.sparkleSizes[index] = seed.size;
      this.sparkleAlphas[index] = 0;
    });

    this.sparkleGeometry = new THREE.BufferGeometry();
    this.sparkleGeometry.setAttribute("position", new THREE.BufferAttribute(this.sparklePositions, 3));
    this.sparkleGeometry.setAttribute("particleSize", new THREE.BufferAttribute(this.sparkleSizes, 1));
    this.sparkleGeometry.setAttribute("particleAlpha", new THREE.BufferAttribute(this.sparkleAlphas, 1));

    this.sparkleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: {
        color: { value: new THREE.Color(0xdbe7ff) },
      },
      vertexShader: `
        attribute float particleSize;
        attribute float particleAlpha;
        varying float vAlpha;

        void main() {
          vAlpha = particleAlpha;
          gl_PointSize = particleSize;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying float vAlpha;

        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          float core = smoothstep(0.5, 0.0, dist);
          float cross = max(
            smoothstep(0.5, 0.0, abs(center.x)) * smoothstep(0.08, 0.0, abs(center.y)),
            smoothstep(0.5, 0.0, abs(center.y)) * smoothstep(0.08, 0.0, abs(center.x))
          );
          float alpha = max(core * 0.72, cross) * vAlpha;

          gl_FragColor = vec4(color, alpha);
        }
      `,
    });

    this.sparklePoints = new THREE.Points(this.sparkleGeometry, this.sparkleMaterial);
    this.scene.add(this.sparklePoints);
  }

  _createHorizonShimmer() {
    const count = 72;
    this.horizonSeeds = Array.from({ length: count }, (_, index) => ({
      x: mix(-48, 48, index / Math.max(count - 1, 1)) + randomBetween(-0.6, 0.6),
      y: randomBetween(-24, -18),
      phase: Math.random() * Math.PI * 2,
    }));

    this.horizonPositions = new Float32Array(count * 3);
    this.horizonGeometry = new THREE.BufferGeometry();
    this.horizonGeometry.setAttribute("position", new THREE.BufferAttribute(this.horizonPositions, 3));

    this.horizonMaterial = new THREE.PointsMaterial({
      color: 0xd9cfff,
      size: 1.8,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: false,
    });

    this.horizonPoints = new THREE.Points(this.horizonGeometry, this.horizonMaterial);
    this.scene.add(this.horizonPoints);
  }

  _createMotes() {
    const count = 54;
    this.moteSeeds = Array.from({ length: count }, () => ({
      x: randomBetween(-45, 45),
      y: randomBetween(-44, -22),
      speed: randomBetween(1, 4),
      phase: Math.random() * Math.PI * 2,
    }));

    this.motePositions = new Float32Array(count * 3);
    this.moteGeometry = new THREE.BufferGeometry();
    this.moteGeometry.setAttribute("position", new THREE.BufferAttribute(this.motePositions, 3));

    this.moteMaterial = new THREE.PointsMaterial({
      color: 0xb9cfd2,
      size: 1.7,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: false,
    });

    this.motePoints = new THREE.Points(this.moteGeometry, this.moteMaterial);
    this.scene.add(this.motePoints);
  }

  _createFireGlow() {
    const texture = this._createGlowTexture();

    this.fireGlowMaterial = new THREE.SpriteMaterial({
      map: texture,
      color: 0xffb46b,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.fireGlow = new THREE.Sprite(this.fireGlowMaterial);
    this.fireGlow.position.set(0, -27.5, 0);
    this.fireGlow.scale.set(13, 7.5, 1);
    this.scene.add(this.fireGlow);
  }

  _createGlowTexture() {
    const canvas = document.createElement("canvas");
    const size = 128;
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255, 232, 176, 0.86)");
    gradient.addColorStop(0.35, "rgba(255, 161, 94, 0.34)");
    gradient.addColorStop(1, "rgba(255, 126, 64, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  resize() {
    if (!this.enabled) return;

    const rect = this.host.getBoundingClientRect();
    this.width = Math.max(1, Math.round(rect.width));
    this.height = Math.max(1, Math.round(rect.height));

    this.renderer.setSize(this.width, this.height, false);

    const aspect = this.width / this.height;
    this.camera.left = -50 * aspect;
    this.camera.right = 50 * aspect;
    this.camera.top = 50;
    this.camera.bottom = -50;
    this.camera.updateProjectionMatrix();
  }

  setPhase(time, duration) {
    if (!this.enabled) return;

    this.progress = duration > 0 ? clamp01(time / duration) : 0;
    this._update();
  }

  _animate() {
    if (!this.enabled) return;

    this.time += 0.016;
    this._update();
    this.renderer.render(this.scene, this.camera);
    this.frame = requestAnimationFrame(() => this._animate());
  }

  _update() {
    const p = this.progress;
    const descent = 1 - smoothstep(0.34, 0.76, p);
    const surfaceArrival = smoothstep(0.18, 0.68, p);
    const fire = smoothstep(0.34, 0.52, p) * (1 - smoothstep(0.68, 0.82, p));
    const motes = smoothstep(0.68, 0.9, p);

    this._updateAtmosphere(descent);
    this._updateSparkles(descent);
    this._updateHorizon(surfaceArrival);
    this._updateFireGlow(fire);
    this._updateMotes(motes);
  }

  _updateAtmosphere(amount) {
    const yTravel = mix(4, 38, this.progress);

    this.atmosphereSeeds.forEach((seed, index) => {
      const i = index * 3;
      const sway = Math.sin(this.time * 0.65 + seed.phase) * 0.8;
      const y = seed.y + yTravel + this.time * seed.speed * 0.08;

      this.atmospherePositions[i] = seed.x + sway + seed.drift * this.progress;
      this.atmospherePositions[i + 1] = ((y + 58) % 110) - 55;
      this.atmospherePositions[i + 2] = 0;
    });

    this.atmosphereGeometry.attributes.position.needsUpdate = true;
    this.atmosphereMaterial.opacity = 0.42 * amount + 0.08;
    this.atmospherePoints.visible = this.atmosphereMaterial.opacity > 0.02;
  }

  _updateSparkles(amount) {
    const sceneFade = 0.35 + 0.65 * amount;

    this.sparkleSeeds.forEach((seed, index) => {
      const flashCycle = (this.time * seed.rate + seed.phase) % 1;
      const flash = smoothstep(0.02, 0.045, flashCycle) * (1 - smoothstep(0.045, 0.085, flashCycle));
      const afterglow = smoothstep(0.085, 0.12, flashCycle) * (1 - smoothstep(0.12, 0.2, flashCycle)) * 0.18;
      const breathe = 0.18 + Math.sin(this.time * 0.55 + seed.phase * Math.PI * 2) * 0.04;

      this.sparkleAlphas[index] = Math.min(0.95, (breathe + flash * seed.strength + afterglow) * sceneFade);
      this.sparkleSizes[index] = seed.size * (1 + flash * 1.35);
    });

    this.sparkleGeometry.attributes.particleAlpha.needsUpdate = true;
    this.sparkleGeometry.attributes.particleSize.needsUpdate = true;
  }

  _updateHorizon(amount) {
    this.horizonSeeds.forEach((seed, index) => {
      const i = index * 3;
      const wave = Math.sin(this.time * 0.9 + seed.phase) * 0.45;

      this.horizonPositions[i] = seed.x + wave;
      this.horizonPositions[i + 1] = seed.y + Math.sin(this.time * 0.45 + seed.phase) * 0.2;
      this.horizonPositions[i + 2] = 0;
    });

    this.horizonGeometry.attributes.position.needsUpdate = true;
    this.horizonMaterial.opacity = 0.26 * amount;
  }

  _updateFireGlow(amount) {
    const pulse = 1 + Math.sin(this.time * 8) * 0.06;

    this.fireGlowMaterial.opacity = 0.58 * amount;
    this.fireGlow.scale.set(18 * pulse * mix(0.7, 1.18, amount), 11 * pulse * mix(0.6, 1.1, amount), 1);
    this.fireGlow.visible = amount > 0.02;
  }

  _updateMotes(amount) {
    this.moteSeeds.forEach((seed, index) => {
      const i = index * 3;
      const rise = (this.time * seed.speed + seed.phase * 2) % 9;

      this.motePositions[i] = seed.x + Math.sin(this.time * 0.4 + seed.phase) * 1.2;
      this.motePositions[i + 1] = seed.y + rise;
      this.motePositions[i + 2] = 0;
    });

    this.moteGeometry.attributes.position.needsUpdate = true;
    this.moteMaterial.opacity = 0.28 * amount;
  }

  destroy() {
    this.enabled = false;

    if (this.frame) cancelAnimationFrame(this.frame);
    if (this.renderer?.domElement?.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }

    this.renderer?.dispose();
    this.atmosphereGeometry?.dispose();
    this.horizonGeometry?.dispose();
    this.moteGeometry?.dispose();
    this.sparkleGeometry?.dispose();
    this.atmosphereMaterial?.dispose();
    this.horizonMaterial?.dispose();
    this.moteMaterial?.dispose();
    this.sparkleMaterial?.dispose();
    this.fireGlowMaterial?.map?.dispose();
    this.fireGlowMaterial?.dispose();
  }
}
