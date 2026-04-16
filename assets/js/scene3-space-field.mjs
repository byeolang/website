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
    this._trailSourceWorld = new THREE.Vector3();
    this._trailPlanetEdgeWorld = new THREE.Vector3();
    this._trailHeadWorld = new THREE.Vector3();
    this._trailTailWorld = new THREE.Vector3();
    this._trailMidWorld = new THREE.Vector3();
    this._trailSourceScreen = new THREE.Vector3();
    this._trailPlanetEdgeScreen = new THREE.Vector3();
    this._trailHeadScreen = new THREE.Vector3();
    this._trailTailScreen = new THREE.Vector3();

    this._createPreviewPlanet();
    // Asteroid sprites are temporarily disabled while the particle-only belt
    // pass is tuned.
    // this._createAsteroidSprites();
    this.farDust = this._createParticleField({
      count: 760,
      color: 0xd8e8ff,
      size: 0.14,
      opacity: 0.3,
      xRange: 13,
      yRange: 8,
      zRange: [-54, -24],
      zEndRange: [18, 30],
      travel: 1.85,
      sway: 0.12,
      expandStart: 0.64,
      expandEnd: 1.56,
      rotationScale: 0.05,
    });
    this.midParticles = this._createParticleField({
      count: 260,
      color: 0xf3f7ff,
      size: 0.22,
      opacity: 0.48,
      xRange: 8.8,
      yRange: 5.6,
      zRange: [-34, -12],
      zEndRange: [24, 38],
      travel: 2.65,
      sway: 0.16,
      expandStart: 0.72,
      expandEnd: 1.86,
      rotationScale: -0.04,
    });
    this._createStreaks(0);

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
      depthWrite: true,
      depthTest: true,
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
    this.previewPlanetMesh.renderOrder = 31;
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
    this.previewPlanetClouds.renderOrder = 32;

    this.previewPlanetRing = new THREE.Mesh(
      this.previewPlanetRingGeometry,
      this.previewPlanetRingMaterial,
    );
    this.previewPlanetRing.rotation.x = Math.PI * 0.47;
    this.previewPlanetRing.rotation.y = -0.16;
    this.previewPlanetRing.position.set(0, 0.08, 0);
    this.previewPlanetRing.renderOrder = 30;
    this.previewPlanetAtmosphere.renderOrder = 33;

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
      texture.minFilter = THREE.NearestFilter;
      texture.magFilter = THREE.NearestFilter;
      texture.generateMipmaps = false;
      return texture;
    });

    this.asteroidTextures = asteroidSources;
    this.asteroidGroup = new THREE.Group();
    this.root.add(this.asteroidGroup);
    this.asteroidSprites = [];

    const depthBands = {
      far: {
        count: 56,
        base: [0.16, 0.24],
        boost: [0.04, 0.08],
        opacity: [0.18, 0.3],
        z: [-56, -42],
        endZ: [-10, -2],
        speed: [0.16, 0.24],
        laneX: [-0.7, 0.7],
        laneY: [-0.56, 0.56],
        laneDrift: [1.04, 1.12],
        wobbleX: [0.006, 0.018],
        wobbleY: [0.008, 0.024],
        stretch: [1.04, 1.18],
        squash: [0.86, 0.98],
        rotation: [-0.16, 0.16],
        color: 0xded8cf,
      },
      mid: {
        count: 34,
        base: [0.22, 0.34],
        boost: [0.06, 0.12],
        opacity: [0.24, 0.4],
        z: [-42, -28],
        endZ: [-4, 4],
        speed: [0.24, 0.34],
        laneX: [-0.62, 0.62],
        laneY: [-0.5, 0.5],
        laneDrift: [1.08, 1.18],
        wobbleX: [0.012, 0.03],
        wobbleY: [0.016, 0.038],
        stretch: [0.98, 1.12],
        squash: [0.9, 1.02],
        rotation: [-0.12, 0.12],
        color: 0xe6dfd3,
      },
      near: {
        count: 18,
        base: [0.32, 0.46],
        boost: [0.08, 0.16],
        opacity: [0.34, 0.52],
        z: [-30, -18],
        endZ: [6, 14],
        speed: [0.32, 0.44],
        laneX: [-0.48, 0.48],
        laneY: [-0.4, 0.4],
        laneDrift: [1.14, 1.26],
        wobbleX: [0.018, 0.042],
        wobbleY: [0.022, 0.05],
        stretch: [0.94, 1.08],
        squash: [0.92, 1.04],
        rotation: [-0.08, 0.08],
        color: 0xefe8de,
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
        color: 0xffffff,
      });
      const sprite = new THREE.Sprite(material);
      this.asteroidGroup.add(sprite);

      const laneStartX = randomBetween(band.laneX[0], band.laneX[1]);
      const laneStartY = randomBetween(band.laneY[0], band.laneY[1]);
      const laneEndX = laneStartX * randomBetween(band.laneDrift[0], band.laneDrift[1]);
      const laneEndY = laneStartY * randomBetween(band.laneDrift[0], band.laneDrift[1]);

      return {
        sprite,
        band: bandName,
        laneStartX,
        laneStartY,
        laneEndX,
        laneEndY,
        baseZ: randomBetween(band.z[0], band.z[1]),
        endZ: randomBetween(band.endZ[0], band.endZ[1]),
        scaleBase: randomBetween(band.base[0], band.base[1]),
        scaleBoost: randomBetween(band.boost[0], band.boost[1]),
        wobbleX: randomBetween(band.wobbleX[0], band.wobbleX[1]),
        wobbleY: randomBetween(band.wobbleY[0], band.wobbleY[1]),
        spin: randomBetween(-0.04, 0.04),
        stretch: randomBetween(band.stretch[0], band.stretch[1]),
        squash: randomBetween(band.squash[0], band.squash[1]),
        rotationBase: randomBetween(band.rotation[0], band.rotation[1]),
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

  _createParticleField({ count, color, size, opacity, xRange, yRange, zRange, zEndRange, travel, sway, expandStart, expandEnd, rotationScale }) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const data = [];
    const centerExclusion = 0.18;

    for (let index = 0; index < count; index += 1) {
      const angle = randomBetween(0, Math.PI * 2);
      const radialX = Math.cos(angle);
      const radialY = Math.sin(angle);
      const drift = randomBetween(0.6, 1.4);
      const edgeBias = randomBetween(centerExclusion, 1.16);
      const targetX = radialX * xRange * expandEnd * edgeBias;
      const targetY = radialY * yRange * expandEnd * edgeBias;
      const forwardDepth = randomBetween(
        Math.abs(zRange[0]) * 0.62,
        Math.abs(zRange[0]) * 0.92 + zEndRange[1] * 0.14,
      );
      const endDistance = Math.hypot(targetX, targetY, forwardDepth);
      const startDistance = Math.max(0.85, endDistance * randomBetween(0.022, 0.058));
      const point = {
        phase: randomBetween(0, Math.PI * 2),
        drift,
        dirX: targetX / endDistance,
        dirY: targetY / endDistance,
        dirZ: forwardDepth / endDistance,
        startDistance,
        endDistance,
      };

      data.push(point);
      positions[index * 3] = point.dirX * point.startDistance;
      positions[index * 3 + 1] = point.dirY * point.startDistance;
      positions[index * 3 + 2] = point.dirZ * point.startDistance;
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

    if (!this.streakTexture) {
      this.streakTexture = this._createStreakTexture();
    }

    const trailGroup = new THREE.Group();
    this.root.add(trailGroup);
    const trails = [];

    for (let index = 0; index < count; index += 1) {
      const trailMaterial = new THREE.SpriteMaterial({
        map: this.streakTexture,
        color,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        depthTest: true,
        toneMapped: false,
        blending: THREE.AdditiveBlending,
      });
      const trailSprite = new THREE.Sprite(trailMaterial);
      trailSprite.renderOrder = 5;
      trailGroup.add(trailSprite);
      trails.push({
        sprite: trailSprite,
        baseLength: randomBetween(size * 6.5, size * 11.5),
        baseThickness: randomBetween(size * 0.42, size * 0.7),
        lag: randomBetween(0.048, 0.088),
      });
    }

    return {
      data,
      geometry,
      material,
      points,
      trailGroup,
      trails,
      positions,
      size,
      xRange,
      yRange,
      travel,
      sway,
      opacity,
      expandStart,
      expandEnd,
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
      const rawLaneX = randomBetween(-0.46, 0.46);
      const rawLaneY = randomBetween(-0.34, 0.34);
      const laneX = Math.abs(rawLaneX) < 0.12
        ? (rawLaneX < 0 ? -0.12 : 0.12)
        : rawLaneX;
      const laneY = Math.abs(rawLaneY) < 0.08
        ? (rawLaneY < 0 ? -0.08 : 0.08)
        : rawLaneY;

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
        laneX,
        laneY,
        driftX: randomBetween(1.04, 1.22),
        driftY: randomBetween(1.02, 1.16),
        z: randomBetween(-40, -18),
        endZ: randomBetween(14, 22),
        scaleX: randomBetween(0.9, 1.6),
        scaleY: randomBetween(0.045, 0.08),
        phase: randomBetween(0, 1),
        speed: randomBetween(1.8, 2.8),
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
    const sourceX = this.previewPlanetGroup?.position.x ?? 9.6;
    const sourceY = this.previewPlanetGroup?.position.y ?? 4.6;
    const sourceZ = (this.previewPlanetGroup?.position.z ?? -36) - 0.9;
    const sourceWorld = this._trailSourceWorld.set(sourceX, sourceY, sourceZ);
    const sourceScreen = this._trailSourceScreen.copy(sourceWorld).project(this.camera);
    const planetRadiusWorld = 4.1 * (this.previewPlanetGroup?.scale.x ?? 1);
    const planetEdgeWorld = this._trailPlanetEdgeWorld.set(sourceX + planetRadiusWorld, sourceY, sourceZ);
    const planetEdgeScreen = this._trailPlanetEdgeScreen.copy(planetEdgeWorld).project(this.camera);
    const planetRadiusPx = Math.max(
      1,
      Math.hypot(
        (planetEdgeScreen.x - sourceScreen.x) * this.width * 0.5,
        (planetEdgeScreen.y - sourceScreen.y) * this.height * 0.5,
      ),
    );

    field.points.rotation.z = progress * field.rotationScale;
    field.material.opacity = field.opacity * opacityBoost;
    field.points.visible = false;
    if (field.trailGroup) {
      field.trailGroup.visible = field.material.opacity > 0.01;
    }

    for (let index = 0; index < field.data.length; index += 1) {
      const point = field.data[index];
      const trail = field.trails?.[index];
      const cycle = (progress * field.travel * point.drift + point.phase / (Math.PI * 2)) % 1;
      const approach = smoothstep(0, 0.985, cycle);
      const maxDistance = Math.max(
        point.startDistance + 0.2,
        (this.camera.position.z - 2.2 - sourceZ) / Math.max(0.08, point.dirZ),
      );
      const headDistance = Math.min(mix(point.startDistance, point.endDistance, approach), maxDistance);
      const headX = sourceX + point.dirX * headDistance;
      const headY = sourceY + point.dirY * headDistance;
      const headZ = sourceZ + point.dirZ * headDistance;

      positions[index * 3] = headX;
      positions[index * 3 + 1] = headY;
      positions[index * 3 + 2] = headZ;

      if (trail) {
        const tailApproach = Math.max(0, approach - trail.lag);
        const tailDistance = Math.min(mix(point.startDistance, point.endDistance, tailApproach), headDistance);
        const tailX = sourceX + point.dirX * tailDistance;
        const tailY = sourceY + point.dirY * tailDistance;
        const tailZ = sourceZ + point.dirZ * tailDistance;
        const headWorld = this._trailHeadWorld.set(headX, headY, headZ);
        const tailWorld = this._trailTailWorld.set(tailX, tailY, tailZ);
        const midWorld = this._trailMidWorld.copy(headWorld).lerp(tailWorld, 0.5);
        const headScreen = this._trailHeadScreen.copy(headWorld).project(this.camera);
        const tailScreen = this._trailTailScreen.copy(tailWorld).project(this.camera);
        const dx = (headScreen.x - sourceScreen.x) * this.width * 0.5;
        const dy = (headScreen.y - sourceScreen.y) * this.height * 0.5;
        const trailDx = (headScreen.x - tailScreen.x) * this.width * 0.5;
        const trailDy = (headScreen.y - tailScreen.y) * this.height * 0.5;
        const screenDistance = Math.hypot(dx, dy);
        const alignmentVisibility = smoothstep(3, 14, screenDistance);
        const planetExitVisibility = smoothstep(
          planetRadiusPx + 10,
          planetRadiusPx + 34,
          screenDistance,
        );
        const length = Math.max(
          trail.baseLength * mix(0.82, 1.94, approach),
          headWorld.distanceTo(tailWorld) * 1.1,
        );

        trail.sprite.position.copy(midWorld);
        trail.sprite.scale.set(
          length,
          trail.baseThickness + approach * field.size * 0.34,
          1,
        );
        trail.sprite.material.rotation = Math.atan2(dy, dx);
        trail.sprite.material.opacity = field.material.opacity
          * mix(0.22, 0.78, approach)
          * alignmentVisibility
          * planetExitVisibility
          * smoothstep(2, 12, Math.hypot(trailDx, trailDy));
      }
    }

    field.geometry.attributes.position.needsUpdate = true;
  }

  _updateStreaks(progress) {
    const visibility = smoothstep(0.08, 0.2, progress) * (1 - smoothstep(0.92, 1, progress) * 0.08);
    const cameraDrift = smoothstep(0.08, 0.9, progress);
    const focusX = mix(-1.2, 1.5, cameraDrift);
    const focusY = mix(-0.6, 0.15, cameraDrift);
    const halfFovTan = Math.tan((this.camera.fov * Math.PI) / 360);

    this.streakGroup.visible = visibility > 0.01;

    this.streaks.forEach((streak) => {
      const sprite = streak.sprite;
      const cycle = (progress * streak.speed + streak.phase) % 1;
      const approach = smoothstep(0, 0.992, cycle);
      const tailApproach = Math.max(0, approach - 0.12);

      const projectPose = (sampleApproach) => {
        const z = mix(streak.z, streak.endZ, sampleApproach);
        const distance = Math.max(1, this.camera.position.z - z);
        const halfHeight = halfFovTan * distance * 1.06;
        const halfWidth = halfHeight * this.camera.aspect * 1.06;
        const laneX = streak.laneX * mix(1, streak.driftX, sampleApproach);
        const laneY = streak.laneY * mix(1, streak.driftY, sampleApproach);

        return {
          x: focusX + laneX * halfWidth,
          y: focusY + laneY * halfHeight,
          z,
        };
      };

      const head = projectPose(approach);
      const tail = projectPose(tailApproach);
      const dx = head.x - tail.x;
      const dy = head.y - tail.y;
      const trailLength = Math.max(streak.scaleX, Math.hypot(dx, dy) * 1.28);

      sprite.position.set(
        (head.x + tail.x) * 0.5,
        (head.y + tail.y) * 0.5,
        (head.z + tail.z) * 0.5,
      );
      sprite.scale.set(
        trailLength,
        streak.scaleY + approach * 0.06,
        1,
      );
      sprite.material.rotation = Math.atan2(dy, dx);
      sprite.material.opacity = visibility * mix(0.12, 0.48, approach);
    });
  }

  _updateAsteroidSprites(progress) {
    if (!this.asteroidSprites?.length) {
      return;
    }

    const cameraDrift = smoothstep(0.08, 0.9, progress);
    const focusX = mix(-1.2, 1.5, cameraDrift);
    const focusY = mix(-0.6, 0.15, cameraDrift);
    const halfFovTan = Math.tan((this.camera.fov * Math.PI) / 360);

    this.asteroidGroup.visible = true;

    this.asteroidSprites.forEach((entry, index) => {
      const cycle = (progress * entry.speed + entry.phase) % 1;
      const approach = smoothstep(0, 0.98, cycle);
      const z = mix(entry.baseZ, entry.endZ, approach);
      const scale = entry.scaleBase + approach * entry.scaleBoost;
      const distance = Math.max(1, this.camera.position.z - z);
      const halfHeight = halfFovTan * distance * 1.08;
      const halfWidth = halfHeight * this.camera.aspect * 1.08;
      const laneX = mix(entry.laneStartX, entry.laneEndX, approach);
      const laneY = mix(entry.laneStartY, entry.laneEndY, approach);
      const flowJitterX = Math.sin(progress * 4.8 + index * 0.61 + entry.phase * Math.PI * 2) * entry.wobbleX;
      const flowJitterY = Math.cos(progress * 5.6 + index * 0.47 + entry.phase * Math.PI * 2) * entry.wobbleY;
      const x = focusX + (laneX + flowJitterX) * halfWidth;
      const y = focusY + (laneY + flowJitterY) * halfHeight;

      entry.sprite.position.set(x, y, z);
      entry.sprite.scale.set(scale * entry.stretch, scale * entry.squash, 1);
      entry.sprite.material.opacity = entry.opacityMax;
      entry.sprite.material.rotation = entry.rotationBase + entry.spin * approach;
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
    this.camera.updateMatrixWorld();

    this._updatePreviewPlanet(this.progress);
    // Asteroid sprites are temporarily disabled while the particle-only belt
    // pass is tuned.
    // this._updateAsteroidSprites(this.progress);
    if (this.asteroidGroup) {
      this.asteroidGroup.visible = false;
    }
    this._updateParticleField(this.farDust, this.progress, farOpacity);
    this._updateParticleField(this.midParticles, this.progress, midOpacity * 1.08);
    if (this.streakGroup) {
      this.streakGroup.visible = false;
    }
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
