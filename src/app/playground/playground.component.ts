import { Component, ElementRef, NgZone, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'three';
import gsap from 'gsap';
import * as dat from 'lil-gui'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  constructor(private readonly zone: NgZone) { }

  ngOnInit() {
    this.zone.runOutsideAngular(() => {

      const parametersBackground = {
        color: '#122a42',
      }



      // Canvas
      // const canvas = document.querySelector('canvas.webgl')

      // Scene
      const scene = new THREE.Scene()
      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);
      // Lighting 
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)
      // const pointLight = new THREE.PointLight(0xffffff, 0.5)
      // pointLight.position.x = 2
      // pointLight.position.y = 3
      // pointLight.position.z = 4
      // scene.add(pointLight)
      const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
      spotLight.position.set(0, 2, 3)
      scene.add(spotLight)


      /**
       * Textures
       */
      const textureLoader = new THREE.TextureLoader()
      const matcapTexture = textureLoader.load('assets/textures/matcaps/7.png')

      /**
       * Fonts
       */
      const fontLoader = new FontLoader()

      fontLoader.load(
        // 'assets/fonts/helvetiker_regular.typeface.json',
        'assets/fonts/Luckiest_Guy_Regular.js',
        (font) => {
          // Material
          const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
          // Text

          const textGeometry = new TextGeometry(
            'Crypto\nKraken',
            {
              font: font,
              size: 0.5,
              height: 0.2,
              curveSegments: 12,
              bevelEnabled: true,
              bevelThickness: 0.03,
              bevelSize: 0.02,
              bevelOffset: 0,
              bevelSegments: 5
            }
          )
          textGeometry.center()

          const blockGeometry = new THREE.OctahedronGeometry(.25)
          const text = new THREE.Mesh(textGeometry, material)
          const materialBlock = new THREE.MeshStandardMaterial({})
          materialBlock.metalness = 0.75
          materialBlock.roughness = 0.00
          materialBlock.color.set(0x00fdff)

          // materialBlock.color = new THREE.Color( 0xff0faf )

          const block = new THREE.Mesh(blockGeometry, materialBlock)
          scene.add(text)
          scene.background = materialBlock.color.set(parametersBackground.color)
          

          /**
           * Particles
           */
          // Geometry
          const particlesGeometry = new THREE.BufferGeometry()
          const count = 5000

          const positions = new Float32Array(count * 3) // Multiply by 3 because each position is composed of 3 values (x, y, z)

          for (let i = 0; i < count * 3; i++) // Multiply by 3 for same reason
          {
            positions[i] = (Math.random() - 0.5) * 10 // Math.random() - 0.5 to have a random value between -0.5 and +0.5
          }

          particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)) // Create the Three.js BufferAttribute and specify that each information is composed of 3 values
          // Material
          const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            sizeAttenuation: true
          })
          // Points
          const particles = new THREE.Points(particlesGeometry, particlesMaterial)
          particlesMaterial.color = new THREE.Color('#00fdff')


          /**
 * Textures
 */
          const textureLoader = new THREE.TextureLoader()
          const particleTexture = textureLoader.load('assets/textures/matcaps/particles/2.png')

          // ...

          particlesMaterial.map = particleTexture
          // particlesMaterial.map = particleTexture
          particlesMaterial.transparent = true
          particlesMaterial.alphaMap = particleTexture
          // particlesMaterial.alphaTest = 0.001
          particlesMaterial.depthWrite = false
          scene.add(particles)
          


          // Add star cube desing
          // for(let i = 0; i < 100; i++)
          // {
          //     const block = new THREE.Mesh(blockGeometry, materialBlock)
          //     block.position.x = (Math.random() - 0.5) * 10
          //     block.position.y = (Math.random() - 0.5) * 10
          //     block.position.z = (Math.random() - 0.5) * 10
          //     block.rotation.x = Math.random() * Math.PI
          //     block.rotation.y = Math.random() * Math.PI
          //     const scale = Math.random()
          //     block.scale.set(scale, scale, scale)

          //     scene.add(block)
          // }
          /**
            * Base
            */
          // Debug
          const parameters = {
            color: 0xff0000,
            spinText: () => {
              gsap.to(text.rotation, { duration: 1, y: text.rotation.y + Math.PI * 2 })
            }
          }
          const parametersBlocks = {
            color: 0x00fdff,
            spinBlocks: () => {
              gsap.to(block.rotation, { duration: 1, y: block.rotation.y + Math.PI * 2 })
            }
          }
         
          const gui = new dat.GUI()
          gui.close()
          gui.addColor(parametersBackground, 'color').onChange(()=>{
            scene.background = materialBlock.color.set(parametersBackground.color)
          })
          gui.add(text.position, 'y').min(- 3).max(3).step(0.01).name('text y-axis')
          gui.add(text, 'visible')
          gui.add(materialBlock, 'wireframe')
          gui.add(parameters, 'spinText')
          gui.add(parametersBlocks, 'spinBlocks')
          gui.add(block.position, 'y').min(- 3).max(3).step(0.01).name('blocks y-axis')
          gui.add(block, 'visible')

          gui.add(materialBlock, 'metalness').min(0).max(1).step(0.0001)
          gui.add(materialBlock, 'roughness').min(0).max(1).step(0.0001)

          gui
            .addColor(parameters, 'color')
            .onChange(() => {
              material.color.set(parameters.color)
            })
          gui
            .addColor(parametersBlocks, 'color')
            .onChange(() => {
              materialBlock.color.set(parametersBlocks.color)
            })

        }
      )

      /**
       * Sizes
       */
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
      }

      window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.shadowMap.enabled = true
      })

      /**
       * Camera
       */
      // Base camera
      const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
      camera.position.x = 1
      camera.position.y = 1
      camera.position.z = 2
      scene.add(camera)

      // Controls
      const controls = new OrbitControls(camera, this.canvas.nativeElement)
      controls.enableDamping = true
      // controls.autoRotate = true

      /**
       * Renderer
       */
      const renderer = new THREE.WebGLRenderer({
        canvas: this.canvas.nativeElement
      })
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      /**
       * Animate
       */
      const clock = new THREE.Clock()

      const tick = () => {
        const elapsedTime = clock.getElapsedTime()


        // Update controls
        controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
      }

      tick()

    })
  }
}