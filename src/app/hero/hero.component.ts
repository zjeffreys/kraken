
import { fn } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';


@Component({
	selector: 'app-hero',
	templateUrl: './hero.component.html',
	styleUrls: ['./hero.component.css']
})

export class HeroComponent implements OnInit {
	panelOpenState = false;
	@ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;



	constructor(private readonly zone: NgZone) { }
	ngOnInit() {
		this.zone.runOutsideAngular(() => {

			// SCENE
			const scene = new THREE.Scene();
			// CAMERA
			const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
			// RENDERER
			const renderer = new THREE.WebGLRenderer({
				canvas: this.canvas.nativeElement,
				alpha: true,
			});
			renderer.setClearColor( 0x000000, 0 ); // the default
			renderer.setSize(window.innerWidth, window.innerHeight);
			// document.body.appendChild( renderer.domElement );

			// const geometry = new THREE.BoxGeometry();
			// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
			// const cube = new THREE.Mesh(geometry, material);
			// scene.add(cube);
			// const color = new THREE.Color('#79018C');
			// const geometry = new THREE.BoxGeometry(6, 6, 6);
			// const material = new THREE.MeshBasicMaterial({ color: color});
			// material.
			// const cube = new THREE.Mesh(geometry, material);
			// scene.add(cube);
			var geometry = new THREE.BoxGeometry(100, 100, 100);
			var geometry2 = new THREE.BoxGeometry(100, 100, 100);
			// var material = new THREE.MeshLambertMaterial({ color: 0xffffff });
			// var mesh1 = new THREE.Mesh(geometry, material);
			// scene.add(mesh1);

			var material = new THREE.MeshLambertMaterial({
				color: 0X9A0680,
				opacity: 0.5,
				transparent: true
			});
			var material2 = new THREE.MeshLambertMaterial({
				color: 0X1F51FF,
				opacity: 0.5,
				transparent: true
			});

			var mesh1 = new THREE.Mesh(geometry, material);
			mesh1.material.side = THREE.BackSide;
			mesh1.renderOrder = 0;
			mesh1.position.set(0, 0, -1000);

			var mesh2 = new THREE.Mesh(geometry, material.clone());
			mesh2.material.side = THREE.FrontSide;
			mesh2.renderOrder = 1;
			mesh2.position.set(0, 0, -1000);

			scene.add(mesh1);
			scene.add(mesh2);

			var mesh3 = new THREE.Mesh(geometry2, material2);
			mesh3.material.side = THREE.BackSide;
			mesh3.renderOrder = 0;
			mesh3.position.set(200, 0, -1000);

			var mesh4 = new THREE.Mesh(geometry2, material2.clone());
			mesh4.material.side = THREE.FrontSide;
			mesh4.renderOrder = 1;
			mesh4.position.set(200, 0, -1000);

			scene.add(mesh3);
			scene.add(mesh4);

			var mesh5 = new THREE.Mesh(geometry2, material2);
			mesh5.material.side = THREE.BackSide;
			mesh5.renderOrder = 0;
			mesh5.position.set(-200, 0, -1000);

			var mesh6 = new THREE.Mesh(geometry2, material2.clone());
			mesh6.material.side = THREE.FrontSide;
			mesh6.renderOrder = 1;
			mesh6.position.set(-200, 0, -1000);

			scene.add(mesh5);
			scene.add(mesh6);

			var light1 = new THREE.AmbientLight(0x222222);
			scene.add(light1);
			var light2 = new THREE.PointLight(0xffffff, 1);
			scene.add(light2);

			camera.position.z = 30;

			function animate() {
				requestAnimationFrame(animate);

				mesh1.rotation.x += 0.02;
				mesh2.rotation.x += 0.02;
				mesh1.rotation.y += 0.02;
				mesh2.rotation.y += 0.02;
				

				mesh3.rotation.x += 0.02;
				mesh4.rotation.x += 0.02;
				mesh3.rotation.y += 0.02;
				mesh4.rotation.y += 0.02;

				mesh5.rotation.x += 0.02;
				mesh6.rotation.x += 0.02;
				mesh5.rotation.y += 0.02;
				mesh6.rotation.y += 0.02;
				renderer.render(scene, camera);
			};

			animate();
		})
	}


}
