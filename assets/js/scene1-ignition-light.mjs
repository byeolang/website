const prefersReducedMotion = typeof window !== "undefined"
  && typeof window.matchMedia === "function"
  && window.matchMedia("(prefers-reduced-motion: reduce)").matches

const clamp01 = (value) => Math.max(0, Math.min(1, value))

const smoothstep = (edge0, edge1, value) => {
  if (edge0 === edge1) {
    return value >= edge1 ? 1 : 0
  }

  const t = clamp01((value - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

const mix = (from, to, amount) => from + (to - from) * amount

export class Scene1IgnitionLight {
  constructor({ hostSelector, stageSelector, fireSelector, rocketSelector }) {
    this.enabled = false
    this.mode = null
    this.host = document.querySelector(hostSelector)
    this.stage = document.querySelector(stageSelector)
    this.fire = document.querySelector(fireSelector)
    this.rocket = document.querySelector(rocketSelector)
    this.THREE = window.THREE
    this.width = 0
    this.height = 0

    if (prefersReducedMotion || !this.host || !this.stage || !this.fire || !this.rocket) {
      return
    }

    try {
      if (this.THREE) {
        this._init()
      } else {
        this._initCanvasFallback()
      }
    } catch (error) {
      console.warn("Scene1IgnitionLight WebGL disabled:", error)
      this._dispose()

      try {
        this._initCanvasFallback()
      } catch (fallbackError) {
        console.warn("Scene1IgnitionLight fallback disabled:", fallbackError)
        this._dispose()
      }
    }
  }

  _init() {
    const THREE = this.THREE

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      premultipliedAlpha: true,
    })
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    this.renderer.domElement.setAttribute("aria-hidden", "true")
    this.host.appendChild(this.renderer.domElement)

    this.scene = new THREE.Scene()
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
    this.camera.position.z = 10

    this.group = new THREE.Group()
    this.scene.add(this.group)

    const glowTexture = this._createRadialTexture([
      [0, "rgba(255, 252, 243, 1)"],
      [0.16, "rgba(255, 239, 194, 0.96)"],
      [0.4, "rgba(255, 191, 98, 0.56)"],
      [0.7, "rgba(255, 132, 34, 0.08)"],
      [1, "rgba(255, 132, 34, 0)"],
    ])
    const ringTexture = this._createRadialTexture([
      [0, "rgba(255, 221, 154, 0)"],
      [0.45, "rgba(255, 221, 154, 0)"],
      [0.62, "rgba(255, 238, 210, 0.38)"],
      [0.74, "rgba(255, 192, 102, 0.18)"],
      [0.86, "rgba(255, 132, 34, 0.04)"],
      [1, "rgba(255, 132, 34, 0)"],
    ])

    this.aura = this._createSprite(glowTexture, 0xffbe76, 0.24)
    this.halo = this._createSprite(glowTexture, 0xffd5a0, 0.28)
    this.core = this._createSprite(glowTexture, 0xfff4d8, 0.38)
    this.beamH = this._createSprite(glowTexture, 0xffd7a0, 0.18)
    this.beamV = this._createSprite(glowTexture, 0xffefd2, 0.14)
    this.ring = this._createSprite(ringTexture, 0xffcb7a, 0.22)

    this.group.add(this.aura, this.halo, this.core, this.beamH, this.beamV, this.ring)
    this.mode = "webgl"
    this.enabled = true

    this._resize()
    this.setPhase(0, 1)
  }

  _initCanvasFallback() {
    this.canvas = document.createElement("canvas")
    this.ctx = this.canvas.getContext("2d")

    if (!this.ctx) {
      throw new Error("2D canvas context unavailable")
    }

    this.canvas.setAttribute("aria-hidden", "true")
    this.host.appendChild(this.canvas)
    this.mode = "canvas2d"
    this.enabled = true

    this._resize()
    this.setPhase(0, 1)
  }

  _dispose() {
    this.enabled = false
    this.mode = null

    if (this.renderer?.domElement?.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)
    }

    if (this.canvas?.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas)
    }

    this.renderer = null
    this.scene = null
    this.camera = null
    this.group = null
    this.canvas = null
    this.ctx = null
  }

  _createSprite(texture, color, opacity) {
    const THREE = this.THREE
    const material = new THREE.SpriteMaterial({
      map: texture,
      color,
      transparent: true,
      opacity,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    })
    const sprite = new THREE.Sprite(material)
    sprite.center.set(0.5, 0.5)
    return sprite
  }

  _createRadialTexture(stops) {
    const THREE = this.THREE
    const size = 256
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size

    const ctx = canvas.getContext("2d")
    const gradient = ctx.createRadialGradient(size * 0.5, size * 0.5, 0, size * 0.5, size * 0.5, size * 0.5)

    for (const [offset, color] of stops) {
      gradient.addColorStop(offset, color)
    }

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }

  _resize() {
    if (!this.host) {
      return
    }

    const width = Math.max(1, Math.round(this.host.clientWidth))
    const height = Math.max(1, Math.round(this.host.clientHeight))

    if (width === this.width && height === this.height) {
      return
    }

    this.width = width
    this.height = height

    if (this.mode === "webgl" && this.renderer && this.camera) {
      this.renderer.setSize(width, height, false)
      this.camera.left = -width * 0.5
      this.camera.right = width * 0.5
      this.camera.top = height * 0.5
      this.camera.bottom = -height * 0.5
      this.camera.updateProjectionMatrix()
    } else if (this.mode === "canvas2d" && this.canvas) {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      this.pixelRatio = ratio
      this.canvas.width = Math.round(width * ratio)
      this.canvas.height = Math.round(height * ratio)
      this.canvas.style.width = `${width}px`
      this.canvas.style.height = `${height}px`
      this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    }
  }

  _getAnchorPosition() {
    const stageRect = this.stage.getBoundingClientRect()
    const fireRect = this.fire.getBoundingClientRect()

    return {
      x: fireRect.left - stageRect.left + fireRect.width * 0.5,
      y: fireRect.top - stageRect.top + fireRect.height * 0.08,
    }
  }

  _getIntensity(time) {
    const ignitionStart = smoothstep(0.69, 0.82, time) * (1 - smoothstep(0.98, 1.14, time))
    const ignitionBurst = smoothstep(1.04, 1.18, time) * (1 - smoothstep(1.32, 1.54, time))
    const liftGlow = smoothstep(1.18, 1.42, time) * (1 - smoothstep(1.7, 1.98, time))
    return clamp01(ignitionStart * 0.58 + ignitionBurst * 0.92 + liftGlow * 0.58)
  }

  _getRingProgress(time) {
    const earlyRing = smoothstep(0.76, 0.9, time) * (1 - smoothstep(1.0, 1.14, time))
    const launchRing = smoothstep(1.08, 1.22, time) * (1 - smoothstep(1.34, 1.56, time))
    return clamp01(earlyRing * 0.34 + launchRing)
  }

  _getBeamIntensity(time) {
    const beamRise = smoothstep(0.7, 0.82, time)
    const beamFade = 1 - smoothstep(1.46, 1.64, time)
    return clamp01(beamRise * beamFade)
  }

  _drawRadialGlow(x, y, radiusX, radiusY, colorStops, opacity) {
    const ctx = this.ctx

    ctx.save()
    ctx.translate(x, y)
    ctx.scale(1, radiusY / radiusX)

    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radiusX)

    for (const [offset, color] of colorStops) {
      gradient.addColorStop(offset, color)
    }

    ctx.globalAlpha = opacity
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(0, 0, radiusX, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  _drawBeam(x, y, width, height, opacity, angle = 0) {
    const ctx = this.ctx
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)

    const gradient = ctx.createLinearGradient(-width * 0.5, 0, width * 0.5, 0)

    gradient.addColorStop(0, "rgba(255, 214, 138, 0)")
    gradient.addColorStop(0.18, `rgba(255, 244, 220, ${0.12 * opacity})`)
    gradient.addColorStop(0.5, `rgba(255, 248, 232, ${0.72 * opacity})`)
    gradient.addColorStop(0.82, `rgba(255, 244, 220, ${0.12 * opacity})`)
    gradient.addColorStop(1, "rgba(255, 214, 138, 0)")

    ctx.fillStyle = gradient
    ctx.fillRect(-width * 0.5, -height * 0.5, width, height)
    ctx.restore()
  }

  _drawRing(x, y, radius, opacity) {
    const ctx = this.ctx
    const inner = Math.max(0, radius * 0.5)
    const gradient = ctx.createRadialGradient(x, y, inner, x, y, radius)

    gradient.addColorStop(0, "rgba(255, 214, 138, 0)")
    gradient.addColorStop(0.45, "rgba(255, 214, 138, 0)")
    gradient.addColorStop(0.68, `rgba(255, 244, 220, ${0.72 * opacity})`)
    gradient.addColorStop(0.82, `rgba(255, 190, 104, ${0.28 * opacity})`)
    gradient.addColorStop(1, "rgba(255, 132, 34, 0)")

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  _renderCanvas(x, y, intensity, ringProgress, beamIntensity, liftOffset, flicker) {
    const ctx = this.ctx

    ctx.clearRect(0, 0, this.width, this.height)

    if (intensity <= 0.001 && ringProgress <= 0.001) {
      return
    }

    const spread = mix(1.04, 1.38, intensity)
    const baseY = y + liftOffset

    ctx.globalCompositeOperation = "lighter"

    this._drawRadialGlow(
      x,
      baseY + 18,
      (140 + intensity * 210) * spread,
      (180 + intensity * 280) * spread,
      [
        [0, "rgba(255, 252, 244, 1)"],
        [0.12, "rgba(255, 242, 214, 0.92)"],
        [0.42, "rgba(255, 190, 102, 0.44)"],
        [0.82, "rgba(255, 132, 34, 0)"],
      ],
      (0.08 + intensity * 0.14) * flicker,
    )

    this._drawRadialGlow(
      x,
      baseY - 6,
      48 + intensity * 78,
      58 + intensity * 92,
      [
        [0, "rgba(255, 250, 235, 1)"],
        [0.16, "rgba(255, 236, 194, 0.96)"],
        [0.46, "rgba(255, 178, 86, 0.38)"],
        [1, "rgba(255, 132, 34, 0)"],
      ],
      (0.08 + intensity * 0.18) * flicker,
    )

    if (beamIntensity > 0.001) {
      this._drawBeam(
        x,
        baseY + 10,
        220 + intensity * 260,
        22 + intensity * 26,
        (0.18 + intensity * 0.2) * beamIntensity,
        -0.18,
      )
    }
    this._drawRing(x, baseY + 6, 86 + ringProgress * 220, ringProgress * 0.32)
  }

  setPhase(time, duration) {
    if (!this.enabled || !duration) {
      return
    }

    this._resize()

    const intensity = this._getIntensity(time)
    const ringProgress = this._getRingProgress(time)
    const beamIntensity = this._getBeamIntensity(time)
    const flicker = 0.92 + Math.sin(time * 34) * 0.08 * intensity

    const anchor = this._getAnchorPosition()
    const liftOffset = mix(18, -42, smoothstep(1.24, 1.68, time))

    if (this.mode === "canvas2d" && this.ctx) {
      this._renderCanvas(anchor.x, anchor.y, intensity, ringProgress, beamIntensity, liftOffset, flicker)
      return
    }

    if (!this.renderer || !this.group || !this.camera) {
      return
    }

    if (intensity <= 0.001 && ringProgress <= 0.001) {
      this.group.visible = false
      this.renderer.render(this.scene, this.camera)
      return
    }

    const localX = anchor.x - this.width * 0.5
    const localY = this.height * 0.5 - anchor.y
    const spread = mix(1.02, 1.34, intensity)

    this.group.visible = true
    this.group.position.set(localX, localY, 0)

    this.aura.position.set(0, 28 + liftOffset, 0)
    this.aura.scale.set(240 * spread, 340 * spread, 1)
    this.aura.material.opacity = (0.08 + intensity * 0.16) * flicker

    this.halo.position.set(0, 6 + liftOffset, 0)
    this.halo.scale.set(126 + intensity * 152, 146 + intensity * 176, 1)
    this.halo.material.opacity = (0.09 + intensity * 0.16) * flicker

    this.core.position.set(0, -10 + liftOffset, 0)
    this.core.scale.set(72 + intensity * 96, 80 + intensity * 108, 1)
    this.core.material.opacity = (0.12 + intensity * 0.22) * flicker

    this.beamH.position.set(0, 8 + liftOffset, 0)
    this.beamH.scale.set(210 + intensity * 240, 34 + intensity * 32, 1)
    this.beamH.material.opacity = (0.04 + intensity * 0.08) * flicker * beamIntensity
    this.beamH.material.rotation = -0.18

    this.beamV.position.set(0, 4 + liftOffset, 0)
    this.beamV.scale.set(122 + intensity * 138, 22 + intensity * 18, 1)
    this.beamV.material.opacity = (0.02 + intensity * 0.04) * flicker * beamIntensity
    this.beamV.material.rotation = -0.18

    this.ring.position.set(0, 4 + liftOffset, 0)
    this.ring.scale.set(96 + ringProgress * 220, 96 + ringProgress * 220, 1)
    this.ring.material.opacity = ringProgress * 0.24

    this.renderer.render(this.scene, this.camera)
  }
}
