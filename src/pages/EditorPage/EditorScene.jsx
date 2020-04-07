import Phaser from 'phaser';
import * as dat from 'dat.gui';
import createCar from '../GamePage/Gameplay/CarFactory';
import { PathEditor } from './editor/PathEditor';
import { TrackDrawer } from './editor/TrackDrawer';

const CAMERA_SPEED = 250.0;

export const scene = {
  preload: function () {
    this.load.image('wheel', '/assets/wheel.png');
    this.load.image('car', '/assets/cars/Audi.png');
    this.load.image('track', '/assets/track/track.png');

    this.lastMousePosition = null;
    this.guidePosition = new Phaser.Math.Vector2(0, 0);
    this.track = null;
  },

  create: function () {
    this.matter.world.setBounds(-2000, -2000, 4000, 4000).disableGravity();
    let debug = this.matter.world.debugConfig;
    debug.staticLineColor = 0x00ff00;
    debug.sensorLineColor = 0x00ff00;
    this.matter.world.debugConfig = debug;

    this.guide = this.add.image(0, 0, '');
    this.guide.setPosition(this.guidePosition.x, this.guidePosition.y);
    this.guide.visible = false;

    this.cameras.main.setZoom(0.3);
    this.cameras.main.setPosition(this.guidePosition.x, this.guidePosition.y);
    this.cameras.main.startFollow(this.guide, false, 0.2, 0.2);

    this.input.mouse.disableContextMenu();

    this.car = createCar(
      { maxForwardSpeed: 25, maxBackwardSpeed: 15, maxDriveForce: 4.5 },
      this
    );

    let graph = this.add.graphics(0, 0);
    graph.lineStyle(8, 0xffffff, 1.0);

    this.editor = new PathEditor(this, graph);
    this.trackDrawer = new TrackDrawer(this, this.editor);

    var gui = new dat.GUI({ autoPlace: false });

    let createFolder = gui.addFolder('Create');

    createFolder.add(this.editor, 'addCubicBezier').name('Add cubic bezier');
    createFolder.open();

    let editor = this.editor;

    editor.addCurveListener((name, curve) => {
      let folder = gui.addFolder(name);

      console.log(name, curve);
      let points = curve.editor.points;
      console.log(points);

      for (let i in points) {
        let pFolder = folder.addFolder('Point ' + i);
        pFolder.add(points[i], 'width');
      }
    });

    let trackFolder = gui.addFolder('Track');
    trackFolder.add(this.trackDrawer, 'draw').name('Draw track');
    trackFolder.add(this.trackDrawer, 'clear').name('Clear track');

    var customContainer = document.getElementById('dat-gui-container');
    customContainer.appendChild(gui.domElement);

    //Prepare test path
    let points = [];
    let full90 = [
      Math.PI / 2,
      Math.PI,
      (3 * Math.PI) / 2,
      2 * Math.PI,
      2 * Math.PI,
    ];

    for (
      let a = Math.PI / 6;
      a <= 2 * Math.PI + Math.PI / 6;
      a += Math.PI / 6
    ) {
      let radius = 1380;

      let found = false;
      for (let i in full90) {
        let v = full90[i];

        if (Math.abs(v - a) < 0.1) {
          found = true;
          break;
        }
      }

      if (found) {
        radius = 1200;
      }

      points.push(
        new Phaser.Math.Vector2(Math.cos(a) * radius, Math.sin(a) * radius)
      );
    }

    for (let i = 0; i < points.length; i += 3) {
      this.editor.addCubicBezierPoints(points.slice(i, i + 3));
    }

    this.editor.closePath();
    //
  },

  update: function (time, delta) {
    const properDelta = delta / 60;
    let pointer = this.input.activePointer;
    let mousePosition = new Phaser.Math.Vector2(pointer.worldX, pointer.worldY);
    let diff = new Phaser.Math.Vector2(0, 0);

    if (pointer.isDown && pointer.rightButtonDown()) {
      diff = this.lastMousePosition.subtract(mousePosition).normalize();
    }

    if (diff.length() > 0.1) {
      this.guidePosition = this.guidePosition.add(
        diff.scale(CAMERA_SPEED).scale(properDelta)
      );
      this.guide.setPosition(this.guidePosition.x, this.guidePosition.y);
    }

    this.lastMousePosition = new Phaser.Math.Vector2(
      pointer.worldX,
      pointer.worldY
    );
  },
};
