import { Component, ElementRef, NgZone, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'three';
import gsap from 'gsap';
import * as dat from 'lil-gui'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

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
      const gui = new dat.GUI()
      const scene = new THREE.Scene()

      const parametersBackground = {
        color: '#b160e6'
      }
      //       const scene = new THREE.Scene()
      //       const axesHelper = new THREE.AxesHelper(5);
      //       scene.add(axesHelper);
      //       // Lighting 
      //       const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      //       scene.add(ambientLight)

      //       const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
      //       spotLight.position.set(0, 2, 3)
      //       scene.add(spotLight)
      /**
       * Textures
       */
      const textureLoader = new THREE.TextureLoader();
      const matcapTexture = textureLoader.load('assets/textures/matcaps/7.png');

      /**
       * Fonts
       */
      const fontLoader = new FontLoader(); 

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
          const text = new THREE.Mesh(textGeometry, material)
          const materialBlock = new THREE.MeshStandardMaterial({})

          // const blockGeometry = new THREE.OctahedronGeometry(.25)
         
          materialBlock.metalness = 0.75
          materialBlock.roughness = 0.00
          materialBlock.color.set(0x00fdff)
          scene.add(text)
          scene.background = materialBlock.color.set(parametersBackground.color)

          const parameters = {
            color: 0xff0000,
            spinText: () => {
              gsap.to(text.rotation, { duration: 1, y: text.rotation.y + Math.PI * 2 })
            }
          }
        }); 

          /**
             * Particles
             */
          // Geometry
          const particlesGeometry = new THREE.BufferGeometry(); 
          const count = 20000; 

          const positions = new Float32Array(count * 3) // Multiply by 3 because each position is composed of 3 values (x, y, z)
          const colors = new Float32Array(count * 3)

          for (let i = 0; i < count * 3; i++) // Multiply by 3 for same reason
          {
            positions[i] = (Math.random() - 0.5) * 10 // Math.random() - 0.5 to have a random value between -0.5 and +0.5
            colors[i] = Math.random()
          }

          particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)) // Create the Three.js BufferAttribute and specify that each information is composed of 3 values
          particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

          // Material
          const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            sizeAttenuation: true
          })
          // Points
          const particles = new THREE.Points(particlesGeometry, particlesMaterial)
          particlesMaterial.color = new THREE.Color('#00fdff')
          particlesMaterial.depthWrite = false
          particlesMaterial.blending = THREE.AdditiveBlending
          particlesMaterial.vertexColors = true


          /**
    * Textures
    */
          const textureLoaderParticle = new THREE.TextureLoader()
          const particleTexture = textureLoaderParticle.load('assets/textures/matcaps/particles/2.png')

          // ...

          particlesMaterial.map = particleTexture
          // particlesMaterial.map = particleTexture
          particlesMaterial.transparent = true
          particlesMaterial.alphaMap = particleTexture
          // particlesMaterial.alphaTest = 0.001
          particlesMaterial.depthWrite = false


          /**
           * Sizes
           */
          //  scene.add(particles)
          // const sizes = {
          //   width: window.innerWidth,
          //   height: window.innerHeight
          // }

          // window.addEventListener('resize', () => {
          //   // Update sizes
          //   sizes.width = window.innerWidth
          //   sizes.height = window.innerHeight

          //   // Update camera
          //   camera.aspect = sizes.width / sizes.height
          //   camera.updateProjectionMatrix()

          //   // Update renderer
          //   renderer.setSize(sizes.width, sizes.height)
          //   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
          //   renderer.shadowMap.enabled = true
          // })

          //       /**
          //        * Camera
          //        */
          //       // Base camera
          //       const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
          //       camera.position.x = 1
          //       camera.position.y = 1
          //       camera.position.z = 2
          //       scene.add(camera)

          //       // Controls
          //       const controls = new OrbitControls(camera, this.canvas.nativeElement)
          //       controls.enableDamping = true
          //       // controls.autoRotate = true

          //       /**
          //        * Renderer
          //        */
          //       const renderer = new THREE.WebGLRenderer({
          //         canvas: this.canvas.nativeElement
          //       })
          //       renderer.setSize(sizes.width, sizes.height)
          //       renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

          //       /**
          //        * Animate
          //        */
          //       const clock = new THREE.Clock()

          //       const tick = () => {
          //         const elapsedTime = clock.getElapsedTime()

          //         // Update particles
          //         particles.rotation.y = elapsedTime * 0.1

          //         // Update controls
          //         controls.update()

          //         // Render
          //         renderer.render(scene, camera)

          //         // Call tick again on the next frame
          //         window.requestAnimationFrame(tick)
          //       }

          //       tick()

          /*------------------------------- KRAKEN DRAWING BEGIN ------------------------------- */
          /**
           * Base
           */
          // Debug
         

          /**
           * 
           * above that needed to moved here to show text
           */
        
          scene.add(particles)
         
          /**
           * Floor
           */
          // const floor = new THREE.Mesh(
          //   // new THREE.PlaneGeometry(10, 10),
          //   new THREE.MeshStandardMaterial({
          //     color: '#444444',
          //     metalness: 0,
          //     roughness: 0.5
          //   })
          // )
          // floor.receiveShadow = true
          // floor.rotation.x = - Math.PI * 0.5
          // scene.add(floor)
          


          /**
           * 3-D Models
           */
          const gltfLoader = new GLTFLoader()
          const dracoLoader = new DRACOLoader()
          gltfLoader.setDRACOLoader(dracoLoader)
          dracoLoader.setDecoderPath('assets/draco/')
          let mixer: THREE.AnimationMixer | null = null
          gltfLoader.load(
            // 'assets/models/Duck/glTF/Duck.gltf',
            // 'assets/models/FlightHelmet/glTF/FlightHelmet.gltf',
            // 'assets/models/Duck/glTF-Draco/Duck.gltf',
            'assets/models/Kraken/3D_Kraken1glb.glb',
            (gltf) => {
              // while(gltf.scene.children.length)
              // {
              //     scene.add(gltf.scene.children[0])
              // }
              // mixer = new THREE.AnimationMixer(gltf.scene)
              // const action = mixer.clipAction(gltf.animations[2])
              gltf.scene.scale.set(.5, .5, .5)
              gltf.scene.translateY(-5)

              scene.add(gltf.scene)
              // action.play()

            },
            (progress) => {
              console.log('progress')
              console.log(progress)
            },
            (error) => {
              console.log('error')
              console.log(error)
            }
          )




          /**
           * Lights
           */
          const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
          scene.add(ambientLight)

          const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
          directionalLight.castShadow = true
          directionalLight.shadow.mapSize.set(1024, 1024)
          directionalLight.shadow.camera.far = 15
          directionalLight.shadow.camera.left = - 7
          directionalLight.shadow.camera.top = 7
          directionalLight.shadow.camera.right = 7
          directionalLight.shadow.camera.bottom = - 7
          directionalLight.position.set(5, 5, 5)
          scene.add(directionalLight)

          /**
           * Sizes
           */
          const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
          };

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
          })

          /**
           * Camera
           */
          // Base camera
          const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
          camera.position.set(2, 2, 2)
          scene.add(camera)

          // Controls
          const controls = new OrbitControls(camera, this.canvas.nativeElement)
          controls.target.set(0, 0.75, 0)
          controls.enableDamping = true

          /**
           * Renderer
           */
          const renderer = new THREE.WebGLRenderer({
            canvas: this.canvas.nativeElement
          })
          renderer.shadowMap.enabled = true
          renderer.shadowMap.type = THREE.PCFSoftShadowMap
          renderer.setSize(sizes.width, sizes.height)
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

          /**
           * Animate
           */
          const clock = new THREE.Clock()
          let previousTime = 0

          const tick = () => {
            const elapsedTime = clock.getElapsedTime()
            const deltaTime = elapsedTime - previousTime
            previousTime = elapsedTime

            if (mixer) {
              mixer.update(deltaTime)
            }

             // Update particles
             particles.rotation.y = elapsedTime * 0.1
            // Update controls
            controls.update()

            // Render
            renderer.render(scene, camera)

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
          }

          tick()

          /*------------------------------- KRAKEN DRAWING END------------------------------- */
        })
    }
}