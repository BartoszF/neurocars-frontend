import createCar from './Gameplay/CarFactory';
import { collisionCategories } from './Gameplay/Constants';
import CarSimpleController from './Gameplay/CarSimpleController';
import RootStore from '../../stores/RootStore';
import NeuralDriver from './Gameplay/NeuralDriver';
import { TrackDrawer } from '../../components/game/TrackDrawer';
import Phaser from 'phaser';

export const scene = {
  preload: function () {
    this.load.image('wheel', '/assets/wheel.png');
    this.load.image('car', '/assets/cars/Audi.png');
    this.load.image('track', '/assets/track/track.png');
  },

  create: function () {
    collisionCategories['WORLD'] = this.matter.world.nextCategory();
    collisionCategories['OUTERWALL'] = this.matter.world.nextCategory();
    collisionCategories['BODY'] = this.matter.world.nextCategory();

    let trackDrawer = new TrackDrawer(this);
    const points = RootStore.gameStore.simulationObject.trackDTO.trackPoints;

    let mappedPoints = [];

    points.forEach((point) => {
      mappedPoints.push(new Phaser.Math.Vector2(point.x, point.y));
    });

    trackDrawer.init(mappedPoints);
    trackDrawer.draw();

    this.matter.world.setBounds(-4000, -4000, 8000, 8000).disableGravity();
    let debug = this.matter.world.debugConfig;
    debug.staticLineColor = 0x00ff00;
    debug.sensorLineColor = 0x00ff00;
    this.matter.world.debugConfig = debug;

    let innerBounds = trackDrawer.getInnerBounds();
    let mappedInnerBounds = [];

    for (let i = 0; i < innerBounds.length; i += 2) {
      let pair = { x: innerBounds[i], y: innerBounds[i + 1] };
      mappedInnerBounds.push(pair);
    }

    let innerWall = this.matter.body.create({
      isStatic: true,
      vertices: mappedInnerBounds,
      collisionFilter: collisionCategories['WORLD'],
    });

    this.matter.world.add(innerWall);

    let outerBounds = trackDrawer.getOuterBounds();
    let mappedOuterBounds = [];

    for (let i = 0; i < outerBounds.length; i += 2) {
      let pair = { x: outerBounds[i], y: outerBounds[i + 1] };
      mappedOuterBounds.push(pair);
    }

    let outerWall = this.matter.body.create({
      isStatic: true,
      vertices: mappedOuterBounds,
      collisionFilter: collisionCategories['OUTERWALL'],
    });

    this.matter.world.add(outerWall);

    this.car = createCar(
      { maxForwardSpeed: 25, maxBackwardSpeed: 15, maxDriveForce: 4.5 },
      this
    );

    //this.car.body.setPosition(0, 0);
    this.car.body.setPosition(mappedPoints[0].x, mappedPoints[0].y);

    if (RootStore.gameStore.isSimulationView === false) {
      this.carController = new CarSimpleController(this);
    } else {
      this.carController = new NeuralDriver(this);
    }

    this.cameras.main.setZoom(0.3);
    this.cameras.main.startFollow(this.car.body, false, 0.6, 0.6, 0, 0);

    this.cursors = this.input.keyboard.createCursorKeys();
  },
  update: function (time, delta) {
    if (RootStore.gameStore.isSimulationView === false) {
      let x = 0;
      let y = 0;

      if (this.cursors.up.isDown) y = 1;
      if (this.cursors.down.isDown) y = -1;

      if (this.cursors.left.isDown) x = -1;
      if (this.cursors.right.isDown) x = 1;

      this.carController.update(x, y, delta);
    } else {
      this.carController.update();
    }
  },
};
