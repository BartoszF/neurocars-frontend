import Phaser from 'phaser';
import * as dat from 'dat.gui';
import createCar from '../GamePage/Gameplay/CarFactory';

const CAMERA_SPEED = 250.0;

const Vector2 = Phaser.Math.Vector2;

const getParamsFromVector2 = (vector, name) => {
  return [
    [vector, 'x', name + ' x'],
    [vector, 'y', name + ' y']
  ];
};

class CurveEditor {
  constructor(scene, graphics) {
    this.curves = [];
    this.listeners = [];
    this.graphics = graphics;
    this.path = new scene.add.path(0, 0);
    this.path.autoClose = true;
  }

  addCurveListener(listener) {
    this.listeners.push(listener);
  }

  addCubicBezier() {
    console.log('ADDED C BEZIER');
    this.path.cubicBezierTo(
      new Vector2(100, 100),
      new Vector2(75, 75),
      new Vector2(50, 50)
    );

    let bezier = this.path.curves[this.path.curves.length - 1];

    let params = [];

    params.push(...getParamsFromVector2(bezier.p0, 'p0'));
    params.push(...getParamsFromVector2(bezier.p1, 'p1'));
    params.push(...getParamsFromVector2(bezier.p2, 'p2'));
    params.push(...getParamsFromVector2(bezier.p3, 'p3'));

    this.onCurveAdded('Bezier ' + this.path.curves.length, params);

    this.draw();
  }

  draw() {
    for(let i in this.path.curves) {
      this.path.curves[i].updateArcLengths();
    }
    this.path.updateArcLengths();
    console.log('draw', this.path.curves, this.path.getLength());
    this.graphics.clear();
    this.path.draw(this.graphics);
    this.graphics.strokePath();
  }

  onCurveAdded(name, curve) {
    for (var i in this.listeners) this.listeners[i](name, curve);
  }
}

export const scene = {
  preload: function() {
    this.load.image('wheel', '/assets/wheel.png');
    this.load.image('car', '/assets/cars/Audi.png');

    this.lastMousePosition = null;
    this.guidePosition = new Phaser.Math.Vector2(0, 0);
  },

  create: function() {
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

    let graph = this.add.graphics(0,0);
    graph.lineStyle(8, 0xffffff, 1.0);

    this.editor = new CurveEditor(this, graph);

    var gui = new dat.GUI({ autoPlace: false });

    let createFolder = gui.addFolder("Create")

    createFolder.add(this.editor, 'addCubicBezier').name('Add cubic bezier');

    createFolder.open();

    let editor = this.editor;

    this.editor.addCurveListener((name, curve) => {
      console.log(curve);

      let folder = gui.addFolder(name);

      for (let i in curve) {
        let param = curve[i];
        let controller = folder.add(param[0], param[1]).name(param[2]);
        controller.onFinishChange(function(value) {
          console.log(param[0], param[0][param[1]], value);

          param[0][param[1]] = value;
          editor.draw();
        });
      }
    });

    var customContainer = document.getElementById('dat-gui-container');
    customContainer.appendChild(gui.domElement);
  },

  update: function(time, delta) {
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

  addCubicBezier: function() {
    console.log('ADDED');
  }
};
