import createCar from './Gameplay/CarFactory';
import { collisionCategories } from './Gameplay/Constants';
import CarSimpleController from './Gameplay/CarSimpleController';
import RootStore from '../../stores/RootStore';
import NeuralDriver from './Gameplay/NeuralDriver';

export const scene = {
  preload: function() {
    this.load.image('wheel', '/assets/wheel.png');
    this.load.image('car', '/assets/cars/Audi.png');
  },

  create: function() {
    collisionCategories['WORLD'] = this.matter.world.nextCategory();
    collisionCategories['TIRE'] = this.matter.world.nextCategory();
    collisionCategories['BODY'] = this.matter.world.nextCategory();

    this.matter.world.setBounds(-2000, -2000, 4000, 4000).disableGravity();
    let debug = this.matter.world.debugConfig;
    debug.staticLineColor = 0x00ff00;
    debug.sensorLineColor = 0x00ff00;
    this.matter.world.debugConfig = debug;

    // var innerTrack = '100 0 75 50 100 100 25 100 0 50 25 0';

    // var poly = this.add.polygon(0, 0, innerTrack, 0xff0000, 0.2);

    // this.matter.add.gameObject(poly, { shape: { type: 'fromVerts', verts: innerTrack, flagInternal: true } });

    // poly.setBounce(0.2);
    // poly.setFriction(0, 0, 0);

    this.car = createCar(
      { maxForwardSpeed: 25, maxBackwardSpeed: 15, maxDriveForce: 4.5 },
      this
    );

    if (RootStore.gameStore.isSimulationView === false) {
      this.carController = new CarSimpleController(this);
    } else {
      this.carController = new NeuralDriver(this);
    }

    var centerBlock = this.matter.add.rectangle(0, 0, 1000, 1000, {
      isStatic: true,
      label: 'Center block'
    });

    var imgBlock = this.matter.add.image(0, 0, 'wheel');
    imgBlock.displayWidth = 1000;
    imgBlock.displayHeight = 1000;
    imgBlock.setExistingBody(centerBlock);

    var leftWall = this.matter.add.rectangle(-2000, 0, 100, 4000);
    imgBlock = this.matter.add.image(0, 0, 'wheel');
    imgBlock.displayWidth = 100;
    imgBlock.displayHeight = 4000;
    imgBlock.setExistingBody(leftWall);
    leftWall.isStatic = true;

    var rightWall = this.matter.add.rectangle(2000, 0, 100, 4000);
    imgBlock = this.matter.add.image(0, 0, 'wheel');
    imgBlock.displayWidth = 100;
    imgBlock.displayHeight = 4000;
    imgBlock.setExistingBody(rightWall);
    rightWall.isStatic = true;

    var topWall = this.matter.add.rectangle(0, -2000, 4000, 100);
    imgBlock = this.matter.add.image(0, 0, 'wheel');
    imgBlock.displayWidth = 4000;
    imgBlock.displayHeight = 100;
    imgBlock.setExistingBody(topWall);
    topWall.isStatic = true;

    var bottomWall = this.matter.add.rectangle(0, 2000, 4000, 100);
    imgBlock = this.matter.add.image(0, 0, 'wheel');
    imgBlock.displayWidth = 4000;
    imgBlock.displayHeight = 100;
    imgBlock.setExistingBody(bottomWall);
    bottomWall.isStatic = true;

    this.cameras.main.setZoom(0.3);
    this.cameras.main.startFollow(this.car.body, false, 0.6, 0.6, 0, 0);

    this.cursors = this.input.keyboard.createCursorKeys();
  },
  update: function(time, delta) {
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
  }
};
