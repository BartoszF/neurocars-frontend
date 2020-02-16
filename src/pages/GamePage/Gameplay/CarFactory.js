import Phaser from "phaser";
import { collisionCategories } from "./Constants";
import Tire from "./Tire";

export default function createCar(carConfig, phaser) {
  //   var LFTire = createWheel(100, 110, phaser);
  //   var RFTire = createWheel(200, 110, phaser);
  //   var LRTire = createWheel(100, 240, phaser);
  //   var RRTire = createWheel(200, 240, phaser);

  const tireWorldCollision = [
    collisionCategories["TIRE"],
    collisionCategories["WORLD"]
  ];

  //   LFTire.setCollisionCategory(collisionCategories["TIRE"]);
  //   LFTire.setCollidesWith(tireWorldCollision);

  //   RFTire.setCollisionCategory(collisionCategories["TIRE"]);
  //   RFTire.setCollidesWith(tireWorldCollision);

  //   LRTire.setCollisionCategory(collisionCategories["TIRE"]);
  //   LRTire.setCollidesWith(tireWorldCollision);

  //   RRTire.setCollisionCategory(collisionCategories["TIRE"]);
  //   RRTire.setCollidesWith(tireWorldCollision);

  var Bodies = Phaser.Physics.Matter.Matter.Bodies;
  var carPhysicsBody = Bodies.rectangle(0, -600, 100, 62, {
    mass: 1000,
    inverseMass: 1 / 1000,
    friction: 0.3,
    fritctionAir: 0.4,
    label: "Car body"
  });

  var carBody = phaser.matter.add.image(0, 0, "car");
  carBody.displayWidth = 120;
  carBody.displayHeight = 140;

  carBody.setExistingBody(carPhysicsBody);
  //   carBody.setCollisionCategory(collisionCategories["BODY"]);
  //   carBody.setCollidesWith([
  //     collisionCategories["WORLD"],
  //     collisionCategories["BODY"]
  //   ]);

  //   var LFTireAttach = createAttachPoint(
  //     LFTire.body,
  //     carBody.body,
  //     Phaser.Physics.Matter.Matter.Vector.create(0, 0),
  //     Phaser.Physics.Matter.Matter.Vector.create(-50, 65)
  //   );
  //   phaser.matter.world.add(LFTireAttach);

  //   var RFTireAttach = createAttachPoint(
  //     RFTire.body,
  //     carBody.body,
  //     Phaser.Physics.Matter.Matter.Vector.create(0, 0),
  //     Phaser.Physics.Matter.Matter.Vector.create(50, 65)
  //   );
  //   phaser.matter.world.add(RFTireAttach);

  //   var LRTireAttach = createAttachPoint(
  //     LRTire.body,
  //     carBody.body,
  //     Phaser.Physics.Matter.Matter.Vector.create(0, 0),
  //     Phaser.Physics.Matter.Matter.Vector.create(-50, -65)
  //   );
  //   phaser.matter.world.add(LRTireAttach);

  //   var RRTireAttach = createAttachPoint(
  //     RRTire.body,
  //     carBody.body,
  //     Phaser.Physics.Matter.Matter.Vector.create(0, 0),
  //     Phaser.Physics.Matter.Matter.Vector.create(50, -65)
  //   );
  //   phaser.matter.world.add(RRTireAttach);

  //   var carComposite = Phaser.Physics.Matter.Matter.Composite.create({
  //     bodies: [LFTire.body, RFTire.body, LRTire.body, RRTire.body, carBody.body],
  //     lineColor: "FFFFFF"
  //   });

  //   phaser.matter.world.add(carComposite);

  return {
    body: carBody,
    config: carConfig
    // LFTire: new Tire(LFTire, carConfig),
    // RFTire: new Tire(RFTire, carConfig),
    // LRTire: new Tire(LRTire, carConfig),
    // RRTire: new Tire(RRTire, carConfig)
  };
}

function createWheel(x, y, phaser) {
  var rect = phaser.matter.add.image(x, y, "wheel");

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

function createAttachPoint(bodyA, bodyB, pointA, pointB) {
  return Phaser.Physics.Matter.Matter.Constraint.create({
    bodyA: bodyA,
    bodyB: bodyB,
    length: 0,
    stiffnes: 1,
    pointA: pointA,
    pointB: pointB
  });
}
