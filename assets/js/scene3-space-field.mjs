import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";

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
    this.width = 0;
    this.height = 0;
    this.progress = 0;
    this.enabled = false;

    if (!this.host || prefersReducedMotion) {
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
    this.camera = new THREE.PerspectiveCamera(42, 1, 0.1, 160);
    this.camera.position.set(0, 0, 24);

    const ambient = new THREE.AmbientLight(0x8ab6ff, 1.35);
    const rimLight = new THREE.DirectionalLight(0xa8d7ff, 1.8);
    rimLight.position.set(-6, 4, 12);
    const fillLight = new THREE.DirectionalLight(0xffd29e, 0.75);
    fillLight.position.set(8, -2, 10);

    this.scene.add(ambient, rimLight, fillLight);

    this.root = new THREE.Group();
    this.scene.add(this.root);

    this._createPreviewPlanet();
    this._createAsteroidSprites();
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

  _createPreviewPlanet() {
    const textureLoader = new THREE.TextureLoader();
    this.previewPlanetTexture = textureLoader.load("assets/images/scenes/scene3-target-planet-surface-texture.png");
    this.previewPlanetAtmosphereTexture = textureLoader.load("assets/images/scenes/scene3-target-planet-atmosphere.png");

    this.previewPlanetTexture.colorSpace = THREE.SRGBColorSpace;
    this.previewPlanetTexture.wrapS = THREE.RepeatWrapping;
    this.previewPlanetTexture.wrapT = THREE.ClampToEdgeWrapping;
    this.previewPlanetTexture.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy?.() || 1);

    this.previewPlanetAtmosphereTexture.colorSpace = THREE.SRGBColorSpace;
    this.previewPlanetAtmosphereTexture.wrapS = THREE.RepeatWrapping;
    this.previewPlanetAtmosphereTexture.wrapT = THREE.ClampToEdgeWrapping;
    this.previewPlanetAtmosphereTexture.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy?.() || 1);

    this.previewPlanetGeometry = new THREE.SphereGeometry(4.1, 64, 64);

    this.previewPlanetMaterial = new THREE.MeshStandardMaterial({
      map: this.previewPlanetTexture,
      color: 0xffffff,
      roughness: 0.82,
      metalness: 0.01,
      emissive: 0x6f58d8,
      emissiveIntensity: 0.38,
      transparent: true,
      opacity: 1,
    });

    this.previewPlanetAtmosphereMaterial = new THREE.MeshBasicMaterial({
      map: this.previewPlanetAtmosphereTexture,
      color: 0xcbd9ff,
      transparent: true,
      opacity: 0.82,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.previewPlanetCloudMaterial = new THREE.MeshBasicMaterial({
      map: this.previewPlanetAtmosphereTexture,
      color: 0xf4f7ff,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.previewPlanetRingGeometry = new THREE.RingGeometry(5.9, 7.6, 96);
    this.previewPlanetRingMaterial = new THREE.MeshBasicMaterial({
      color: 0xf2dfbf,
      transparent: true,
      opacity: 0.52,
      side: THREE.DoubleSide,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
    });

    this.previewPlanetGroup = new THREE.Group();
    this.previewPlanetMesh = new THREE.Mesh(
      this.previewPlanetGeometry,
      this.previewPlanetMaterial,
    );
    this.previewPlanetAtmosphere = new THREE.Mesh(
      this.previewPlanetGeometry,
      this.previewPlanetAtmosphereMaterial,
    );
    this.previewPlanetAtmosphere.scale.setScalar(1.14);

    this.previewPlanetClouds = new THREE.Mesh(
      this.previewPlanetGeometry,
      this.previewPlanetCloudMaterial,
    );
    this.previewPlanetClouds.scale.setScalar(1.045);

    this.previewPlanetRing = new THREE.Mesh(
      this.previewPlanetRingGeometry,
      this.previewPlanetRingMaterial,
    );
    this.previewPlanetRing.rotation.x = Math.PI * 0.47;
    this.previewPlanetRing.rotation.y = -0.16;
    this.previewPlanetRing.position.set(0, 0.08, 0);

    this.previewPlanetGroup.add(this.previewPlanetRing, this.previewPlanetMesh, this.previewPlanetClouds, this.previewPlanetAtmosphere);
    this.root.add(this.previewPlanetGroup);
  }

  _createAsteroidSprites() {
    const textureLoader = new THREE.TextureLoader();
    const asteroidSources = [
      "assets/images/scenes/scene3-asteroid-small-01.png",
      "assets/images/scenes/scene3-asteroid-small-03.png",
      "assets/images/scenes/scene3-asteroid-small-05.png",
    ].map((path) => {
      const texture = textureLoader.load(path);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    });

    this.asteroidTextures = asteroidSources;
    this.asteroidGroup = new THREE.Group();
    this.root.add(this.asteroidGroup);
    this.asteroidSprites = [];

    const depthBands = {
      far: {
        count: 18,
        base: [0.1, 0.18],
        boost: [0.08, 0.18],
        opacity: [0.34, 0.52],
        z: [-42, -30],
        endZ: [-24, -16],
        speed: [0.22, 0.34],
        drift: [0.01, 0.03],
        radial: [3.2, 5.8],
      },
      mid: {
        count: 22,
        base: [0.14, 0.24],
        boost: [0.16, 0.32],
        opacity: [0.42, 0.64],
        z: [-30, -20],
        endZ: [-14, -8],
        speed: [0.3, 0.48],
        drift: [0.015, 0.05],
        radial: [4.8, 8.4],
      },
      near: {
        count: 12,
        base: [0.2, 0.34],
        boost: [0.24, 0.48],
        opacity: [0.56, 0.78],
        z: [-20, -14],
        endZ: [-6, -2],
        speed: [0.42, 0.62],
        drift: [0.02, 0.07],
        radial: [6.4, 11.2],
      },
    };

    const makeEntry = (bandName) => {
      const band = depthBands[bandName];
      const texture = asteroidSources[Math.floor(Math.random() * asteroidSources.length)];
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 1,
        depthWrite: false,
        depthTest: true,
        toneMapped: false,
        color: bandName == 'near' ? 0xefe6d8 : bandName == 'mid' ? 0xe8dfd2 : 0xe1d8ca,
      });
      const sprite = new THREE.Sprite(material);
      this.asteroidGroup.add(sprite);

      const startRadius = randomBetween(1.4, 5.4);
      const startAngle = randomBetween(0, Math.PI * 2);
      const endAngle = startAngle + randomBetween(-0.42, 0.42);
      const endRadius = randomBetween(band.radial[0], band.radial[1]);
      const centerX = randomBetween(-0.8, 1.2);
      const centerY = randomBetween(-0.6, 0.4);

      return {
        sprite,
        band: bandName,
        startX: centerX + Math.cos(startAngle) * startRadius,
        startY: centerY + Math.sin(startAngle) * startRadius,
        endX: centerX + Math.cos(endAngle) * endRadius,
        endY: centerY + Math.sin(endAngle) * endRadius,
        baseZ: randomBetween(band.z[0], band.z[1]),
        endZ: randomBetween(band.endZ[0], band.endZ[1]),
        scaleBase: randomBetween(band.base[0], band.base[1]),
        scaleBoost: randomBetween(band.boost[0], band.boost[1]),
        drift: randomBetween(band.drift[0], band.drift[1]),
        spin: randomBetween(-0.35, 0.35),
        phase: Math.random(),
        speed: randomBetween(band.speed[0], band.speed[1]),
        opacityMax: randomBetween(band.opacity[0], band.opacity[1]),
      };
    };

    Object.keys(depthBands).forEach((bandName) => {
      for (let index = 0; index < depthBands[bandName].count; index += 1) {
        this.asteroidSprites.push(makeEntry(bandName));
      }
    });
  }

  _createParticleField({ count, color, size, opacity, xRange, yRange, zRange, travel, sway, rotationScale }) {
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

  _updatePreviewPlanet(progress) {
    const visibility = 1 - smoothstep(0.995, 1, progress) * 0.16;
    const travel = smoothstep(0.1, 1, progress);

    this.previewPlanetGroup.visible = visibility > 0.01;
    this.previewPlanetGroup.position.set(
      mix(9.6, 8.1, travel),
      mix(4.6, 3.8, travel),
      mix(-36, -1.4, travel),
    );

    const scale = mix(0.68, 7.4, travel);
    this.previewPlanetGroup.scale.setScalar(scale);
    this.previewPlanetGroup.rotation.z = mix(-0.02, 0.03, travel);
    this.previewPlanetMesh.rotation.y = mix(0.16, 0.92, travel);
    this.previewPlanetMesh.rotation.x = mix(0.08, 0.18, travel);
    this.previewPlanetClouds.rotation.y = mix(0.24, 1.36, travel);
    this.previewPlanetClouds.rotation.x = mix(0.04, 0.12, travel);
    this.previewPlanetRing.rotation.z = mix(0.04, 0.16, travel);
    this.previewPlanetTexture.offset.x = progress * 0.01;
    this.previewPlanetAtmosphereTexture.offset.x = progress * 0.016;

    this.previewPlanetMaterial.opacity = visibility;
    this.previewPlanetMaterial.emissiveIntensity = mix(0.28, 0.44, travel) * visibility;
    this.previewPlanetCloudMaterial.opacity = mix(0.14, 0.28, travel) * visibility;
    this.previewPlanetAtmosphereMaterial.opacity = 0.88 * visibility;
    this.previewPlanetRingMaterial.opacity = 0.28 * visibility;
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

  _updateAsteroidSprites(progress) {
    if (!this.asteroidSprites?.length) {
      return;
    }

    const fieldVisibility = 1 - smoothstep(0.9, 0.985, progress);
    this.asteroidGroup.visible = fieldVisibility > 0.01;

    this.asteroidSprites.forEach((entry, index) => {
      const cycle = (progress * entry.speed + entry.phase) % 1;
      const approach = smoothstep(0, 0.98, cycle);
      const x = mix(entry.startX, entry.endX, approach);
      const y = mix(entry.startY, entry.endY, approach) + Math.sin(progress * 3.8 + index) * entry.drift;
      const z = mix(entry.baseZ, entry.endZ, approach);
      const scale = entry.scaleBase + approach * entry.scaleBoost;

      entry.sprite.position.set(x, y, z);
      entry.sprite.scale.set(scale, scale, 1);
      entry.sprite.material.opacity = entry.opacityMax * fieldVisibility;
      entry.sprite.material.rotation = entry.spin + approach * 0.32;
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
    const cameraDrift = smoothstep(0.08, 0.9, this.progress);

    this.camera.position.x = mix(0.4, -0.35, cameraDrift);
    this.camera.position.y = mix(-0.45, 0.15, cameraDrift);
    this.camera.lookAt(mix(-1.2, 1.5, cameraDrift), mix(-0.6, 0.15, cameraDrift), -10);

    this._updatePreviewPlanet(this.progress);
    this._updateAsteroidSprites(this.progress);
    this._updateParticleField(this.farDust, this.progress, farOpacity);
    this._updateParticleField(this.midParticles, this.progress, midOpacity * 1.08);
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
    this.asteroidSprites?.forEach(({ sprite }) => {
      sprite.material?.dispose?.();
    });
    this.streakTexture?.dispose?.();
    this.asteroidTextures?.forEach((texture) => texture?.dispose?.());
    this.farDust?.geometry?.dispose?.();
    this.farDust?.material?.dispose?.();
    this.midParticles?.geometry?.dispose?.();
    this.midParticles?.material?.dispose?.();
    this.earthMaterial?.dispose?.();
    this.atmosphereMaterial?.dispose?.();
    this.earthTexture?.dispose?.();
    this.previewPlanetTexture?.dispose?.();
    this.previewPlanetAtmosphereTexture?.dispose?.();
    this.previewPlanetGeometry?.dispose?.();
    this.previewPlanetRingGeometry?.dispose?.();
    this.previewPlanetMaterial?.dispose?.();
    this.previewPlanetCloudMaterial?.dispose?.();
    this.previewPlanetAtmosphereMaterial?.dispose?.();
    this.previewPlanetRingMaterial?.dispose?.();
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
