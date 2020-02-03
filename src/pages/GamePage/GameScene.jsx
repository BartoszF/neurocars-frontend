import Phaser from "phaser";

export const scene = {
  preload: function() {
    this.load.image("wheel", "/assets/wheel.png");
  },

  create: function() {
    this.matter.world.setBounds().disableGravity();
    createWheel = createWheel.bind(this);

    var worldCat = this.matter.world.nextCategory();
    var tireCat = this.matter.world.nextCategory();
    var bodyCat = this.matter.world.nextCategory();

    var LFTire = createWheel(100, 110);
    var RFTire = createWheel(200, 110);
    var LRTire = createWheel(100, 240);
    var RRTire = createWheel(200, 240);

    LFTire.setCollisionCategory(tireCat);
    LFTire.setCollidesWith([tireCat, worldCat]);

    RFTire.setCollisionCategory(tireCat);
    RFTire.setCollidesWith([tireCat, worldCat]);

    LRTire.setCollisionCategory(tireCat);
    LRTire.setCollidesWith([tireCat, worldCat]);

    RRTire.setCollisionCategory(tireCat);
    RRTire.setCollidesWith([tireCat, worldCat]);

    var Bodies = Phaser.Physics.Matter.Matter.Bodies;
    var carPhysicsBody = Bodies.rectangle(150, 175, 125, 200);

    var carBody = this.matter.add.image(0, 0, "wheel");
    carBody.displayWidth = 125;
    carBody.displayHeight = 200;
    carBody.setExistingBody(carPhysicsBody);
    carBody.setCollisionCategory(bodyCat);
    carBody.setCollidesWith([worldCat, bodyCat]);

    var LFTireAttach = Phaser.Physics.Matter.Matter.Constraint.create({
      bodyA: LFTire.body,
      bodyB: carBody.body,
      length: 0,
      stiffnes: 0.9,
      pointA: Phaser.Physics.Matter.Matter.Vector.create(0, 0),
      pointB: Phaser.Physics.Matter.Matter.Vector.create(-50, -65)
    });

    this.matter.world.add(LFTireAttach);

    var RFTireAttach = Phaser.Physics.Matter.Matter.Constraint.create({
      bodyA: RFTire.body,
      bodyB: carBody.body,
      length: 0,
      stiffnes: 0.9,
      pointA: Phaser.Physics.Matter.Matter.Vector.create(0, 0),
      pointB: Phaser.Physics.Matter.Matter.Vector.create(50, -65)
    });

    this.matter.world.add(RFTireAttach);

    var LRTireAttach = Phaser.Physics.Matter.Matter.Constraint.create({
      bodyA: LRTire.body,
      bodyB: carBody.body,
      length: 0,
      stiffnes: 1,
      pointA: Phaser.Physics.Matter.Matter.Vector.create(0, 0),
      pointB: Phaser.Physics.Matter.Matter.Vector.create(-50, 65)
    });

    this.matter.world.add(LRTireAttach);

    var RRTireAttach = Phaser.Physics.Matter.Matter.Constraint.create({
      bodyA: RRTire.body,
      bodyB: carBody.body,
      length: 0,
      stiffnes: 1,
      pointA: Phaser.Physics.Matter.Matter.Vector.create(0, 0),
      pointB: Phaser.Physics.Matter.Matter.Vector.create(50, 65)
    });

    this.matter.world.add(RRTireAttach);

    var carComposite = Phaser.Physics.Matter.Matter.Composite.create({
      bodies: [
        LFTire.body,
        RFTire.body,
        LRTire.body,
        RRTire.body,
        carBody.body
      ],
      lineColor: "FFFFFF"
    });

    this.matter.world.add(carComposite);

    this.carBody = carBody;

    this.cameras.main.setZoom(0.5);
    this.cameras.main.centerOn(carBody.body.position.x, carBody.body.position.y);
  },
  update: function() {

    this.cameras.main.centerOn(this.carBody.body.position.x, this.carBody.body.position.y);
    
  }
};

function createWheel(x, y) {
  var rect = this.matter.add.image(x, y, "wheel");

  rect.setBody({
    type: "rectangle",
    width: 64,
    height: 100
  });

  rect.displayWidth = 24;
  rect.displayHeight = 50;
  rect.setFriction(0, 0, 0);

  return rect;
}
