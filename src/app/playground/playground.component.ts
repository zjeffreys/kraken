import { Component, ElementRef, NgZone, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'three';

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
      const geometry = new THREE.BufferGeometry()

      // Create 50 triangles (450 values)
      const count = 50
      const positionsArray = new Float32Array(count * 3 * 3)
      for (let i = 0; i < count * 3 * 3; i++) {
        positionsArray[i] = (Math.random() - 0.5) * 4
      }

      // Create the attribute and name it 'position'
      const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
      geometry.setAttribute('position', positionsAttribute)
      //End triangle
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })

      var cube = new THREE.Mesh(geometry, material);
      // cube.position.set(0, 0, -300);
      scene.add(cube);

      camera.position.z = 3
      camera.lookAt(cube.position);
      // Controls
      const controls = new OrbitControls(camera, this.canvas.nativeElement)
      controls.enableDamping = true

      console.log("Testing Resize:")

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
        // Time
        // const elapsedTime = clock.getElapsedTime()

        // Update objects

        // cube.position.x = Math.cos(elapsedTime) * 40
        // cube.position.y = Math.sin(elapsedTime) * 40
        // cube.rotateX(cursor.x * .05);
        // cube.rotateX(cursor.y * .05);
        // cube.rotateZ(cursor.x * .05);
        // camera.position.x = cursor.x * 5
        // camera.position.y = cursor.y * 5
        // camera.lookAt(cube.position)
        // Update camera
        //   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
        //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
        //   camera.position.y = cursor.y * 3
        camera.lookAt(cube.position)




        controls.update()
        renderer.render(scene, camera);
        window.requestAnimationFrame(animate)
      }
      animate();


    })
  }
}
