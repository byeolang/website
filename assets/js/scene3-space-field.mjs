const prefersReducedMotion = typeof window !== "undefined"
  && typeof window.matchMedia === "function"
  && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp01 = (value) => Math.max(0, Math.min(1, value));
const mix = (from, to, amount) => from + (to - from) * amount;

const smoothstep = (edge0, edge1, value) => {
  if (edge0 === edge1) {
    return value >= edge1 ? 1 : 0;
  }

  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

const wrapRange = (value, min, max) => {
  const span = max - min;

  if (!Number.isFinite(span) || span <= 0) {
    return value;
  }

  let wrapped = (value - min) % span;

  if (wrapped < 0) {
    wrapped += span;
  }

  return min + wrapped;
};

const randomBetween = (min, max) => min + Math.random() * (max - min);

export class Scene3SpaceField {
  constructor({ host, shell }) {
    this.host = host;
    this.shell = shell;
    this.THREE = window.THREE;
    this.width = 0;
    this.height = 0;
    this.progress = 0;
    this.enabled = false;

    if (!this.host || !this.THREE || prefersReducedMotion) {
      this._enableFallback();
      return;
    }

    try {
      this._init();
    } catch (error) {
      console.warn("Scene3SpaceField WebGL disabled:", error);
      this.destroy();
      this._enableFallback();
    }
  }

  _enableFallback() {
    this.shell?.classList.add("scene3-shell--fallback");
  }

  _disableFallback() {
    this.shell?.classList.remove("scene3-shell--fallback");
  }

  _init() {
    const THREE = this.THREE;

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
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 120);
    this.camera.position.set(0, 0, 24);

    const ambient = new THREE.AmbientLight(0x8ab6ff, 1.35);
    const rimLight = new THREE.DirectionalLight(0xa8d7ff, 1.8);
    rimLight.position.set(-6, 4, 12);
    const fillLight = new THREE.DirectionalLight(0xffd29e, 0.75);
    fillLight.position.set(8, -2, 10);

    this.scene.add(ambient, rimLight, fillLight);

    this.root = new THREE.Group();
    this.scene.add(this.root);

    this._createEarth();
    this.farDust = this._createParticleField({
      count: 620,
      color: 0xd8e8ff,
      size: 0.11,
      opacity: 0.24,
      xRange: 20,
      yRange: 12,
      zRange: [-28, -6],
      travel: 8.4,
      sway: 0.26,
      rotationScale: 0.05,
    });
    this.midParticles = this._createParticleField({
      count: 180,
      color: 0xf3f7ff,
      size: 0.18,
      opacity: 0.42,
      xRange: 18,
      yRange: 11,
      zRange: [-12, 2],
      travel: 12.8,
      sway: 0.4,
      rotationScale: -0.08,
    });
    this._createStreaks(26);

    this.enabled = true;
    this._disableFallback();
    this.resize();
    this.setProgress(0);
  }

  _createEarthTexture() {
    const THREE = this.THREE;
    const canvas = document.createElement("canvas");
    const size = 512;

    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    const fillGradient = ctx.createLinearGradient(0, 0, size, size);
    fillGradient.addColorStop(0, "#63b8ff");
    fillGradient.addColorStop(0.52, "#2d8ad1");
    fillGradient.addColorStop(1, "#0f4b8d");
    ctx.fillStyle = fillGradient;
    ctx.fillRect(0, 0, size, size);

    const glow = ctx.createRadialGradient(size * 0.44, size * 0.36, size * 0.04, size * 0.44, size * 0.36, size * 0.56);
    glow.addColorStop(0, "rgba(255,255,255,0.48)");
    glow.addColorStop(0.45, "rgba(255,255,255,0.08)");
    glow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = "rgba(101, 213, 154, 0.82)";
    ctx.beginPath();
    ctx.ellipse(size * 0.34, size * 0.4, size * 0.12, size * 0.08, -0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(size * 0.64, size * 0.58, size * 0.18, size * 0.09, 0.24, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(179, 244, 200, 0.48)";
    ctx.beginPath();
    ctx.ellipse(size * 0.5, size * 0.3, size * 0.08, size * 0.04, 0.4, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  _createEarth() {
    const THREE = this.THREE;
    const earthTexture = this._createEarthTexture();
    const geometry = new THREE.SphereGeometry(2.4, 48, 48);

    this.earthMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      color: 0xffffff,
      roughness: 0.94,
      metalness: 0,
      emissive: 0x184781,
      emissiveIntensity: 0.16,
      transparent: true,
      opacity: 1,
    });

    this.atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x9be0ff,
      transparent: true,
      opacity: 0.32,
      side: THREE.BackSide,
      depthWrite: false,
    });

    this.earthGroup = new THREE.Group();
    this.earthMesh = new THREE.Mesh(geometry, this.earthMaterial);
    this.earthAtmosphere = new THREE.Mesh(
      geometry.clone(),
      this.atmosphereMaterial,
    );
    this.earthAtmosphere.scale.setScalar(1.09);

    this.earthGroup.add(this.earthMesh, this.earthAtmosphere);
    this.root.add(this.earthGroup);
    this.earthTexture = earthTexture;
  }

  _createParticleField({ count, color, size, opacity, xRange, yRange, zRange, travel, sway, rotationScale }) {
    const THREE = this.THREE;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const data = [];

    for (let index = 0; index < count; index += 1) {
      const point = {
        x: randomBetween(-xRange, xRange),
        y: randomBetween(-yRange, yRange),
        z: randomBetween(zRange[0], zRange[1]),
        phase: randomBetween(0, Math.PI * 2),
        drift: randomBetween(0.6, 1.4),
      };

      data.push(point);
      positions[index * 3] = point.x;
      positions[index * 3 + 1] = point.y;
      positions[index * 3 + 2] = point.z;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color,
      size,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      toneMapped: false,
    });

    const points = new THREE.Points(geometry, material);
    this.root.add(points);

    return {
      data,
      geometry,
      material,
      points,
      positions,
      xRange,
      yRange,
      travel,
      sway,
      opacity,
      rotationScale,
    };
  }

  _createStreakTexture() {
    const THREE = this.THREE;
    const canvas = document.createElement("canvas");
    canvas.width = 192;
    canvas.height = 64;

    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, canvas.height * 0.5, canvas.width, canvas.height * 0.5);
    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.2, "rgba(233,244,255,0.08)");
    gradient.addColorStop(0.6, "rgba(233,244,255,0.84)");
    gradient.addColorStop(1, "rgba(233,244,255,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.46, canvas.height * 0.18, 0, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  _createStreaks(count) {
    const THREE = this.THREE;
    const texture = this._createStreakTexture();

    this.streakTexture = texture;
    this.streakGroup = new THREE.Group();
    this.root.add(this.streakGroup);
    this.streaks = [];

    for (let index = 0; index < count; index += 1) {
      const material = new THREE.SpriteMaterial({
        map: texture,
        color: 0xe9f5ff,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        depthTest: false,
        toneMapped: false,
        blending: THREE.AdditiveBlending,
        rotation: -0.2,
      });

      const sprite = new THREE.Sprite(material);
      this.streakGroup.add(sprite);
      this.streaks.push({
        sprite,
        x: randomBetween(-18, 18),
        y: randomBetween(-9.5, 9.5),
        z: randomBetween(-4, 4),
        scaleX: randomBetween(2.6, 4.4),
        scaleY: randomBetween(0.16, 0.24),
        phase: randomBetween(0, 1),
        speed: randomBetween(5.8, 8.8),
      });
    }
  }

  _updateEarth(progress) {
    const earthTravel = clamp01(progress / 0.34);
    const visibility = 1 - smoothstep(0.08, 0.38, progress);

    this.earthGroup.visible = visibility > 0.01;
    this.earthGroup.position.set(
      mix(-8.8, -14.2, earthTravel),
      mix(-6.4, -11.6, earthTravel),
      mix(-9.5, -11.5, earthTravel),
    );
    this.earthGroup.scale.setScalar(mix(1.92, 0.86, earthTravel));
    this.earthGroup.rotation.z = mix(0.18, 0.52, earthTravel);
    this.earthMesh.rotation.y = progress * 0.96;
    this.earthMaterial.opacity = visibility;
    this.atmosphereMaterial.opacity = 0.34 * visibility;
  }

  _updateParticleField(field, progress, opacityBoost = 1) {
    const positions = field.positions;

    field.points.rotation.z = progress * field.rotationScale;
    field.material.opacity = field.opacity * opacityBoost;

    for (let index = 0; index < field.data.length; index += 1) {
      const point = field.data[index];
      positions[index * 3] = wrapRange(
        point.x - progress * field.travel * point.drift,
        -field.xRange,
        field.xRange,
      );
      positions[index * 3 + 1] = wrapRange(
        point.y + Math.sin(progress * 7 + point.phase) * field.sway * point.drift,
        -field.yRange,
        field.yRange,
      );
      positions[index * 3 + 2] = point.z;
    }

    field.geometry.attributes.position.needsUpdate = true;
  }

  _updateStreaks(progress) {
    const visibility = smoothstep(0.16, 0.34, progress) * (1 - smoothstep(0.76, 0.94, progress));

    this.streakGroup.visible = visibility > 0.01;

    this.streaks.forEach((streak, index) => {
      const sprite = streak.sprite;
      const travel = progress * streak.speed * 8 + streak.phase * 14;

      sprite.position.set(
        wrapRange(streak.x - travel, -22, 22),
        wrapRange(streak.y + Math.sin(progress * 10 + streak.phase * 8) * 0.44, -11, 11),
        streak.z,
      );
      sprite.scale.set(
        streak.scaleX + visibility * 1.8,
        streak.scaleY + visibility * 0.08,
        1,
      );
      sprite.material.opacity = visibility * (0.12 + (index % 4) * 0.025);
    });
  }

  _resize() {
    if (!this.host || !this.renderer || !this.camera) {
      return;
    }

    const width = Math.max(1, Math.round(this.host.clientWidth));
    const height = Math.max(1, Math.round(this.host.clientHeight));

    if (width === this.width && height === this.height) {
      return;
    }

    this.width = width;
    this.height = height;

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  setProgress(progress) {
    this.progress = clamp01(progress);

    if (!this.enabled) {
      return;
    }

    this._resize();

    const spaceVisibility = smoothstep(0.02, 0.14, this.progress) * (1 - smoothstep(0.88, 1, this.progress) * 0.18);
    const farOpacity = mix(0.32, 1, spaceVisibility);
    const midOpacity = mix(0.18, 1, spaceVisibility);

    this._updateEarth(this.progress);
    this._updateParticleField(this.farDust, this.progress, farOpacity);
    this._updateParticleField(this.midParticles, this.progress, midOpacity);
    this._updateStreaks(this.progress);
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    this._resize();

    if (this.enabled) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  destroy() {
    this.enabled = false;

    this.streaks?.forEach(({ sprite }) => {
      sprite.material?.dispose?.();
    });
    this.streakTexture?.dispose?.();
    this.farDust?.geometry?.dispose?.();
    this.farDust?.material?.dispose?.();
    this.midParticles?.geometry?.dispose?.();
    this.midParticles?.material?.dispose?.();
    this.earthMaterial?.dispose?.();
    this.atmosphereMaterial?.dispose?.();
    this.earthTexture?.dispose?.();
    this.renderer?.dispose?.();

    if (this.renderer?.domElement?.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }

    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.root = null;
  }
}
