import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function createScissors() {
  const group = new THREE.Group()
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xC5B5EA, metalness: 0.8, roughness: 0.1,
    transmission: 0.2, thickness: 0.5,
  })
  // Blade 1
  const b1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.8, 0.04),
    mat
  )
  b1.position.x = 0.1
  b1.rotation.z = 0.3
  // Blade 2
  const b2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.8, 0.04),
    mat
  )
  b2.position.x = -0.1
  b2.rotation.z = -0.3
  // Screw/pivot
  const pivot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 0.08, 16),
    new THREE.MeshPhysicalMaterial({ color: 0xFFB5D8, metalness: 0.9, roughness: 0.05 })
  )
  pivot.rotation.x = Math.PI / 2
  group.add(b1, b2, pivot)
  return group
}

function createComb() {
  const group = new THREE.Group()
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xFFB5D8, metalness: 0.6, roughness: 0.2,
  })
  // Handle
  const handle = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.15, 0.04),
    mat
  )
  group.add(handle)
  // Teeth
  for (let i = 0; i < 8; i++) {
    const tooth = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.25, 0.04),
      mat
    )
    tooth.position.x = -0.3 + i * 0.085
    tooth.position.y = -0.18
    group.add(tooth)
  }
  return group
}

function createPaw() {
  const group = new THREE.Group()
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xFFB5D8, metalness: 0.0, roughness: 0.7,
    transmission: 0.1,
  })
  // Main pad
  const main = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 16, 16),
    mat
  )
  main.scale.y = 0.75
  group.add(main)
  // Toe beans
  const toePos = [
    [-0.15, 0.22, 0], [0.15, 0.22, 0],
    [-0.28, 0.08, 0], [0.28, 0.08, 0],
  ]
  toePos.forEach(([x, y, z]) => {
    const toe = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 12, 12),
      mat
    )
    toe.position.set(x, y, z)
    toe.scale.y = 0.8
    group.add(toe)
  })
  return group
}

export default function ThreeScene({ mouseX = 0, mouseY = 0 }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const objectsRef = useRef([])

  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY }
  }, [mouseX, mouseY])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
    camera.position.z = 5

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambient)
    const dirLight = new THREE.DirectionalLight(0xFFB5D8, 2)
    dirLight.position.set(2, 3, 2)
    scene.add(dirLight)
    const pinkLight = new THREE.PointLight(0xC5B5EA, 1.5, 10)
    pinkLight.position.set(-2, 1, 2)
    scene.add(pinkLight)

    // Objects
    const scissors = createScissors()
    scissors.position.set(-1.8, 0.5, 0)
    scissors.userData = { basePos: { x: -1.8, y: 0.5, z: 0 }, speed: 0.8, rotSpeed: 0.003 }

    const comb = createComb()
    comb.position.set(1.8, 0.2, 0.5)
    comb.userData = { basePos: { x: 1.8, y: 0.2, z: 0.5 }, speed: 1.1, rotSpeed: 0.002 }

    const paw = createPaw()
    paw.position.set(0.3, -1.2, 1)
    paw.userData = { basePos: { x: 0.3, y: -1.2, z: 1 }, speed: 0.6, rotSpeed: 0.004 }

    scene.add(scissors, comb, paw)
    objectsRef.current = [scissors, comb, paw]

    let frame = 0
    let animId

    const animate = () => {
      animId = requestAnimationFrame(animate)
      frame++
      const t = frame * 0.01
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      objectsRef.current.forEach((obj, i) => {
        const { basePos, speed, rotSpeed } = obj.userData
        // Float
        obj.position.y = basePos.y + Math.sin(t * speed + i * 2) * 0.15
        obj.position.x = basePos.x + Math.cos(t * speed * 0.7 + i) * 0.08
        // Parallax with mouse
        obj.position.x += mx * (0.3 + i * 0.1)
        obj.position.y += my * (0.2 + i * 0.08)
        // Slow rotation
        obj.rotation.z = Math.sin(t * 0.5 + i) * 0.15
        obj.rotation.y += rotSpeed
      })

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
    />
  )
}
