import { Component, ElementRef, NgZone, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'three';
import gsap from 'gsap';
import * as dat from 'lil-gui'


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

      const parameters = {
        color: 0xff0000,
        spin: () => {
          gsap.to(cube.rotation, { duration: 1, y: cube.rotation.y + Math.PI * 2 })
        }
      }

      // SCENE
      const scene = new THREE.Scene();
      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);
      // Lighting 
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)
      const pointLight = new THREE.PointLight(0xffffff, 0.5)
      pointLight.position.x = 2
      pointLight.position.y = 3
      pointLight.position.z = 4
      scene.add(pointLight)


      // CAMERA
      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);


      // RENDERER
      const renderer = new THREE.WebGLRenderer({
        canvas: this.canvas.nativeElement,
        alpha: true
      });
      // renderer.setClearColor( 0x000000, 0 ); // the default
      renderer.setSize(window.innerWidth, window.innerHeight);



      // OBJECTS
      // Create an empty BufferGeometry
      // const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
      const geometry = new THREE.SphereGeometry(1);
      const geometry2 = new THREE.TorusGeometry(1, 0.35, 32, 100)


      // Create 50 triangles (450 values)
      // const material = new THREE.MeshBasicMaterial({ color: parameters.color, wireframe: true })



      // Textures
      const loadingManager = new THREE.LoadingManager()
      loadingManager.onStart = () => {
        console.log('loading started')
      }
      loadingManager.onLoad = () => {
        console.log('loading finished')
      }
      loadingManager.onProgress = () => {
        console.log('loading progressing')
      }
      loadingManager.onError = () => {
        console.log('loading error')
      }

      const textureLoader = new THREE.TextureLoader(loadingManager)
      // ...
      const TEXTURES = 'assets/textures/'
      const colorTexture = textureLoader.load(TEXTURES.concat('door/color.jpg'))
      const alphaTexture = textureLoader.load(TEXTURES.concat('door/alpha.jpg'))
      const heightTexture = textureLoader.load(TEXTURES.concat('door/height.jpg'))
      const normalTexture = textureLoader.load(TEXTURES.concat('door/normal.jpg'))
      const ambientOcclusionTexture = textureLoader.load(TEXTURES.concat('door/ambientOcclusion.jpg'))
      const metalnessTexture = textureLoader.load(TEXTURES.concat('door/metalness.jpg'))
      const roughnessTexture = textureLoader.load(TEXTURES.concat('door/roughness.jpg'))
      const checker1 = textureLoader.load(TEXTURES.concat('checkerboard-8x8.png'))
      const checker2 = textureLoader.load(TEXTURES.concat('checkerboard-1024x1024.png'))
      const minecraft = textureLoader.load(TEXTURES.concat('minecraft.png'))
      const matcapTexture = textureLoader.load(TEXTURES.concat('matcaps/1.png'))

      // minecraft.generateMipmaps = false
      // minecraft.magFilter = THREE.NearestFilter

      // const material = new THREE.MeshBasicMaterial({ map: minecraft })
      // const material = new THREE.MeshNormalMaterial()
      // material.flatShading = true
      // const material = new THREE.MeshMatcapMaterial()
      // const material = new THREE.MeshPhongMaterial()
      // material.shininess = 100
      // material.specular = new THREE.Color(0x1188ff)
      const material = new THREE.MeshStandardMaterial()
      material.metalness = 0.75
      material.roughness = 0.00


      var cube = new THREE.Mesh(geometry, material);
      var object2 = new THREE.Mesh(geometry2, material);
      object2.position.setX(4)
      // cube.position.set(0, 0, -300);
      scene.add(cube);
      scene.add(object2);



      camera.position.z = 8
      camera.lookAt(cube.position);
      // Controls
      const controls = new OrbitControls(camera, this.canvas.nativeElement)
      controls.enableDamping = true

      var sizes = {
        width: window.innerWidth,
        height: window.innerHeight
      }
      window.addEventListener('resize', (event) => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
      })

      // const clock = new THREE.Clock()
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))
      function animate() {

        camera.lookAt(cube.position)
        controls.update()
        renderer.render(scene, camera);
        window.requestAnimationFrame(animate)
      }
      // VISUAL DEBUGGER TOOL 
      const gui = new dat.GUI()
      gui.add(cube.position, 'y').min(- 3).max(3).step(0.01).name('elevation')
      gui.add(cube, 'visible')
      gui.add(material, 'wireframe')
      gui.add(parameters, 'spin')
      gui.add(material, 'metalness').min(0).max(1).step(0.0001)
      gui.add(material, 'roughness').min(0).max(1).step(0.0001)

      gui
        .addColor(parameters, 'color')
        .onChange(() => {
          // change back to find color debugger issue
          // material.color.set(parameters.color)
        })





      animate();
    })
  }
}
