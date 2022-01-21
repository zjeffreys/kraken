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
        spin: () =>
    {
        gsap.to(cube.rotation, { duration: 1, y: cube.rotation.y + Math.PI * 2 })
    }
    }

      // SCENE
      const scene = new THREE.Scene();
      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);


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
      const geometry = new THREE.BoxGeometry(1,1,1,2, 2, 2)

      // Create 50 triangles (450 values)
      const material = new THREE.MeshBasicMaterial({ color: parameters.color, wireframe: true })

      var cube = new THREE.Mesh(geometry, material);
      // cube.position.set(0, 0, -300);
      scene.add(cube);

      camera.position.z = 3
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
    
    gui
        .addColor(parameters, 'color')
        .onChange(() =>
        {
            material.color.set(parameters.color)
        })





      animate();
    })
  }
}
