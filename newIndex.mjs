import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.162.0/build/three.module.js";

const { gsap } = window;
const { ScrollTrigger } = window;
gsap.registerPlugin(ScrollTrigger);

const SCENES = [
  {
    id: "launch",
    kicker: "Scene 01",
    title: "Ignition on Island",
    copy: "Start from the left island. This scene is pure DOM so content writers can draft copy first.",
    features: ["Core Message Slot", "Feature Badge Slot", "Image Slot"],
    image: "Replace with /assets/landing/scene-01.webp",
    mode: "dom",
    accent: "#ff7a1a",
    rocket: { xPercent: 0, yPercent: 0, rotation: -7, scale: 1.0 }
  },
  {
    id: "billboard-cloud",
    kicker: "Scene 02",
    title: "3D Billboard Cloud",
    copy: "Attach keyword sprites, docs snippets, or logos in a lightweight billboard setup.",
    features: ["threeFactory: billboard", "Per-Scene Progress Hook", "Crossfade Ready"],
    image: "Replace with /assets/landing/scene-02.webp",
    mode: "three",
    threeFactory: "billboard",
    accent: "#32d6ff",
    rocket: { xPercent: 130, yPercent: -150, rotation: -20, scale: 0.95 }
  },
  {
    id: "mesh-gateway",
    kicker: "Scene 03",
    title: "3D Mesh Corridor",
    copy: "Drop custom meshes or particle tunnels. This sample keeps one scene factory per type.",
    features: ["threeFactory: mesh", "Mesh/Material Swap", "Scene Group Isolation"],
    image: "Replace with /assets/landing/scene-03.webp",
    mode: "three",
    threeFactory: "mesh",
    accent: "#7fe36e",
    rocket: { xPercent: 250, yPercent: -330, rotation: -31, scale: 0.84 }
  },
  {
    id: "orbit",
    kicker: "Scene 04",
    title: "Orbit and Final CTA",
    copy: "Last scene can hold final message, CTA, or signup prompt while rocket exits to deep space.",
    features: ["Final Copy Slot", "Conversion CTA Slot", "Outro Visual Slot"],
    image: "Replace with /assets/landing/scene-04.webp",
    mode: "dom",
    accent: "#ffd15b",
    rocket: { xPercent: 330, yPercent: -520, rotation: -40, scale: 0.7 }
  }
];

const THREE_SCENE_FACTORIES = {
  billboard: (scene) => {
    const group = new THREE.Group();
    const sprites = [];
    const color = new THREE.Color(scene.accent);
    for (let i = 0; i < 18; i += 1) {
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          color,
          transparent: true,
          opacity: 0
        })
      );
      sprite.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        -2 - Math.random() * 7
      );
      sprite.userData.baseY = sprite.position.y;
      const scale = 0.18 + Math.random() * 0.38;
      sprite.scale.set(scale, scale, scale);
      sprites.push(sprite);
      group.add(sprite);
    }
    return {
      group,
      update({ elapsed, localProgress, weight }) {
        group.rotation.y = elapsed * 0.12;
        sprites.forEach((sprite, index) => {
          const wobble = Math.sin(elapsed * 0.8 + index * 0.45) * 0.08;
          sprite.position.y = sprite.userData.baseY + wobble;
          sprite.material.opacity = 0.72 * weight;
          sprite.scale.x = sprite.scale.y = 0.16 + localProgress * 0.45;
        });
      }
    };
  },
  mesh: (scene) => {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({
      color: scene.accent,
      wireframe: true,
      transparent: true,
      opacity: 0
    });
    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.15, 0.34, 180, 24), material);
    knot.position.z = -4.5;
    group.add(knot);

    const shellMaterial = new THREE.MeshStandardMaterial({
      color: "#f8ffff",
      metalness: 0.32,
      roughness: 0.38,
      transparent: true,
      opacity: 0
    });
    const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(0.45, 1), shellMaterial);
    shell.position.set(1.8, 0.2, -2.8);
    group.add(shell);

    return {
      group,
      update({ elapsed, localProgress, weight }) {
        knot.rotation.x = elapsed * 0.33;
        knot.rotation.y = elapsed * 0.51;
        knot.scale.setScalar(0.76 + localProgress * 0.55);
        shell.rotation.y = -elapsed * 0.72;
        shell.position.y = 0.2 + Math.sin(elapsed * 0.9) * 0.3;
        material.opacity = 0.6 * weight;
        shellMaterial.opacity = 0.88 * weight;
      }
    };
  }
};

class ThreeLayer {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 80);
    this.camera.position.set(0, 0, 5.4);

    this.items = new Map();
    this.activeSceneId = null;
    this.localProgress = 0;
    this.clock = new THREE.Clock();

    const ambient = new THREE.AmbientLight(0xffffff, 0.68);
    const directional = new THREE.DirectionalLight(0xd6efff, 1.1);
    directional.position.set(2, 3, 4);
    this.scene.add(ambient, directional);

    window.addEventListener("resize", () => this.handleResize());
    this.tick = this.tick.bind(this);
    requestAnimationFrame(this.tick);
  }

  registerStoryScene(sceneDef) {
    if (sceneDef.mode !== "three") {
      return;
    }
    const create = THREE_SCENE_FACTORIES[sceneDef.threeFactory];
    if (!create) {
      return;
    }
    const item = create(sceneDef);
    item.group.visible = false;
    this.items.set(sceneDef.id, { ...item, weight: 0 });
    this.scene.add(item.group);
  }

  setBlend(rawIndex) {
    for (let i = 0; i < SCENES.length; i += 1) {
      const sceneDef = SCENES[i];
      const item = this.items.get(sceneDef.id);
      if (!item) {
        continue;
      }
      const weight = Math.max(0, 1 - Math.abs(rawIndex - i));
      item.weight = weight;
      item.group.visible = weight > 0.01;
    }
  }

  setActive(sceneId, localProgress) {
    this.activeSceneId = sceneId;
    this.localProgress = localProgress;
  }

  handleResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
  }

  tick() {
    const elapsed = this.clock.getElapsedTime();
    this.items.forEach((item, sceneId) => {
      const local = sceneId === this.activeSceneId ? this.localProgress : 0;
      item.update({
        elapsed,
        localProgress: local,
        weight: item.weight
      });
    });
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.tick);
  }
}

const startButton = document.getElementById("startButton");
const storyTrack = document.getElementById("storyTrack");
const rocket = document.getElementById("rocket");
const sceneKicker = document.getElementById("sceneKicker");
const sceneTitle = document.getElementById("sceneTitle");
const sceneCopy = document.getElementById("sceneCopy");
const sceneFeatures = document.getElementById("sceneFeatures");
const sceneMedia = document.getElementById("sceneMedia");
const three = new ThreeLayer(document.getElementById("three-canvas"));

let activeSceneIndex = -1;

SCENES.forEach((scene) => {
  const spacer = document.createElement("section");
  spacer.className = "scene-spacer";
  spacer.dataset.sceneId = scene.id;
  spacer.dataset.sceneMode = scene.mode;
  spacer.innerHTML = "<div class='scene-marker' aria-hidden='true'></div>";
  storyTrack.appendChild(spacer);
  three.registerStoryScene(scene);
});

const rocketState = {
  xPercent: SCENES[0].rocket.xPercent,
  yPercent: SCENES[0].rocket.yPercent,
  rotation: SCENES[0].rocket.rotation,
  scale: SCENES[0].rocket.scale
};

const master = gsap.timeline({ paused: true, defaults: { ease: "none" } });
for (let i = 0; i < SCENES.length - 1; i += 1) {
  const next = SCENES[i + 1];
  master.to(rocketState, {
    xPercent: next.rocket.xPercent,
    yPercent: next.rocket.yPercent,
    rotation: next.rocket.rotation,
    scale: next.rocket.scale,
    duration: 1,
    onUpdate: () => {
      gsap.set(rocket, {
        xPercent: rocketState.xPercent,
        yPercent: rocketState.yPercent,
        rotation: rocketState.rotation,
        scale: rocketState.scale
      });
    }
  }, i);
}
gsap.set(rocket, {
  xPercent: rocketState.xPercent,
  yPercent: rocketState.yPercent,
  rotation: rocketState.rotation,
  scale: rocketState.scale
});

function renderSceneCard(scene) {
  if (!scene) {
    return;
  }
  sceneKicker.textContent = scene.kicker;
  sceneTitle.textContent = scene.title;
  sceneCopy.textContent = scene.copy;
  sceneFeatures.innerHTML = "";
  scene.features.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    sceneFeatures.appendChild(li);
  });
  sceneMedia.textContent = "Image slot: " + scene.image;
  document.documentElement.style.setProperty("--scene-accent", scene.accent);
}

function resolveProgress(reversedProgress) {
  const clamped = gsap.utils.clamp(0, 1, reversedProgress);
  const segments = SCENES.length - 1;
  const rawIndex = clamped * segments;
  const localProgress = rawIndex - Math.floor(rawIndex);
  const nearest = Math.round(rawIndex);
  return { rawIndex, localProgress, nearest };
}

function updateStory(reversedProgress) {
  const data = resolveProgress(reversedProgress);
  master.progress(reversedProgress);
  three.setBlend(data.rawIndex);
  three.setActive(SCENES[data.nearest].id, data.localProgress);
  if (activeSceneIndex !== data.nearest) {
    activeSceneIndex = data.nearest;
    renderSceneCard(SCENES[activeSceneIndex]);
  }
}

function jumpToBottom() {
  window.scrollTo({ top: document.documentElement.scrollHeight, left: 0, behavior: "auto" });
}

function startStory() {
  ScrollTrigger.refresh(true);

  requestAnimationFrame(() => {
    jumpToBottom();
    updateStory(0);
  });

  ScrollTrigger.create({
    trigger: storyTrack,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.16,
    onUpdate: (self) => {
      // Reverse direction: bottom is progress 0, top is progress 1.
      const reversedProgress = 1 - self.progress;
      updateStory(reversedProgress);
    }
  });
}

renderSceneCard(SCENES[0]);
startStory();