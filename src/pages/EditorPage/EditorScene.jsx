import Phaser from 'phaser';
import { Track } from './editor/Track';

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

    let graph = this.add.graphics(0, 0);
    graph.lineStyle(8, 0xffffff, 1.0);

    this.track = new Track(this, graph);
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
