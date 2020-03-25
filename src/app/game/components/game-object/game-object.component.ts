import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-game-object',
  templateUrl: './game-object.component.html',
  styleUrls: ['./game-object.component.scss']
})
export class GameObjectComponent implements OnChanges, AfterViewInit {
  private renderer: THREE.WebGLRenderer;
  private loader: GLTFLoader = new GLTFLoader();
  private textureLoader: THREE.TextureLoader = new THREE.TextureLoader();
  private camera: THREE.PerspectiveCamera;
  scene: THREE.Scene = new THREE.Scene();
  group: THREE.Group;
  mouse = new THREE.Vector2();
  raycaster: THREE.Raycaster;
  backgroundTexture: string;
  @Input() texture: string;
  @Input() total: number;
  @Input() gainsPerSecond: number;
  @Input() gainsPerClick: number;
  @Output() userClick = new EventEmitter<void>();

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  constructor() {
    this.render = this.render.bind(this);
    this.animate = this.animate.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onModelLoadingCompleted = this.onModelLoadingCompleted.bind(this);
    this.onTextureLoadingCompleted = this.onTextureLoadingCompleted.bind(this);
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private createScene() {
    this.textureLoader.load(
      this.backgroundTexture,
      this.onTextureLoadingCompleted
    );
    this.loader.load(
      '../../../../assets/three/scene.gltf',
      this.onModelLoadingCompleted
    );
  }

  private onModelLoadingCompleted(model: GLTF) {
    this.group = model.scene;
    this.scene.add(model.scene);
    this.render();
  }

  private onTextureLoadingCompleted(texture: THREE.Texture) {
    this.scene.background = texture;
    this.render();
  }

  private createLights() {
    let pointLight = new THREE.PointLight(0xffffff, 1, 1000);
    pointLight.position.set(0, 0, 100);
    this.scene.add(pointLight);
    pointLight = new THREE.PointLight(0xffffff, 1, 1000);
    pointLight.position.set(0, 0, -100);
    this.scene.add(pointLight);
    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 100, 0);
    this.scene.add(directionalLight);
  }

  private createCamera() {
    const aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(50, aspectRatio, 1, 1100);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    const distance = this.getDistance();
    this.camera.position.z = distance;
  }

  private getAspectRatio(): number {
    const height = this.canvas.clientHeight;
    if (height === 0) {
      return 0;
    }
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private startRendering() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0xffffff, 1);
    this.renderer.autoClear = true;
    const component: GameObjectComponent = this;
    (function render() {
      component.render();
    })();
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  getDistance(): number {
    if (this.canvas.clientWidth <= 425) {
      return 15;
    } else {
      return 7;
    }
  }

  onClick(event: MouseEvent): void {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster = new THREE.Raycaster();
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(
      this.scene.children,
      true
    );
    if (intersects.length > 0) {
      this.getRotation(intersects[0].object);
      this.userClick.emit();
    }
  }

  @HostListener('window:resize')
  public onResize() {
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.camera.aspect = this.getAspectRatio();
    this.camera.position.z = this.getDistance();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.render();
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.render();
  }

  ngAfterViewInit() {
    this.createScene();
    this.createLights();
    this.createCamera();
    this.startRendering();
    this.animate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.texture) {
      this.backgroundTexture = `../../../../assets/three/textures/${this.texture}.jpg`;
      this.textureLoader.load(
        this.backgroundTexture,
        this.onTextureLoadingCompleted
      );
    }
  }

  getRotation(object: THREE.Object3D): void {
    object.rotateY(Math.abs(this.mouse.y));
    object.rotateX(Math.abs(this.mouse.x));
  }
}
