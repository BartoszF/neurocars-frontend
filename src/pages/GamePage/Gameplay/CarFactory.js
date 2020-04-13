import Phaser from "phaser";
import { collisionCategories } from "./Constants";
import Tire from "./Tire";

export default function createCar(carConfig, phaser) {
  const tireWorldCollision = [
    collisionCategories["TIRE"],
    collisionCategories["WORLD"]
  ];


  var Bodies = Phaser.Physics.Matter.Matter.Bodies;
  var carPhysicsBody = Bodies.rectangle(0, -4000, 100, 62, {
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
  carBody.setPosition(0,-1900);

  return {
    body: carBody,
    config: carConfig
  };
}
