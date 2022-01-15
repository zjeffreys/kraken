
import { fn } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})

export class HeroComponent  implements OnInit{
  panelOpenState = false;
  @ViewChild('tmpl', {static:true})tmpl!:ElementRef<HTMLCanvasElement>;



  constructor(private readonly zone: NgZone) { }
  ngOnInit(){
    this.zone.runOutsideAngular(()=>{
      const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer({
        canvas: this.tmpl.nativeElement, 

      });
			renderer.setSize( window.innerWidth, window.innerHeight );
			// document.body.appendChild( renderer.domElement );

			const geometry = new THREE.BoxGeometry();
			const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

			camera.position.z = 5;

			function animate() {
				requestAnimationFrame( animate );

				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;

				renderer.render( scene, camera );
			};

			animate();
    })
  }

  
}
