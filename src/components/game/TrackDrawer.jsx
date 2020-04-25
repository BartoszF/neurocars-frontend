import Phaser from 'phaser';

const Vector2 = Phaser.Math.Vector2;

let vector2ToFloats = (vector) => {
  return [vector.x, vector.y];
};

export class TrackDrawer {
  constructor(scene) {
    this.scene = scene;
    this.points = [];
    this.mesh = null;
    this.vertices = [];
    this.uvs = [];

    this.outerBounds = [];
    this.innerBounds = [];
    //TEMPORARY
    this.width = 400;
  }

  init(points) {
    this.points = points;

    if (points.length === 0) {
      throw 'No points!';
    }

    this.vertices = [];
    this.uvs = [];

    this.outerBounds = [];
    this.innerBounds = [];

    for (let i = 0; i < points.length; i++) {
      let point = points[i];
      let nextPoint;
      let secondNextPoint;

      if (i === points.length - 1) {
        nextPoint = points[0];
        secondNextPoint = points[1];
      } else if (i === points.length - 2) {
        nextPoint = points[i + 1];
        secondNextPoint = points[0];
      } else {
        nextPoint = points[i + 1];
        secondNextPoint = points[i + 2];
      }

      let forward = nextPoint.clone().subtract(point).normalize();
      let right = new Vector2(forward.y, -forward.x);

      let secondForward = secondNextPoint
        .clone()
        .subtract(nextPoint)
        .normalize();
      let secondRight = new Vector2(secondForward.y, -secondForward.x);

      /*
       *      3 -------- 2
       *        |     /|
       *        |    / |
       *        |   /  |
       *        |  /   |
       *        | /    |
       *        |/     |
       *      0 -------- 1
       */

      let zero = point.clone().subtract(right.clone().scale(-this.width));
      let one = point.clone().subtract(right.clone().scale(this.width));
      let two = nextPoint
        .clone()
        .subtract(secondRight.clone().scale(this.width));
      let three = nextPoint
        .clone()
        .subtract(secondRight.clone().scale(-this.width));

      this.vertices.push(
        ...vector2ToFloats(zero),
        ...vector2ToFloats(one),
        ...vector2ToFloats(two),
        ...vector2ToFloats(zero),
        ...vector2ToFloats(two),
        ...vector2ToFloats(three)
      );
      this.uvs.push(
        ...vector2ToFloats(new Vector2(0, 0)),
        ...vector2ToFloats(new Vector2(1, 0)),
        ...vector2ToFloats(new Vector2(1, 1)),
        ...vector2ToFloats(new Vector2(0, 0)),
        ...vector2ToFloats(new Vector2(0, 1)),
        ...vector2ToFloats(new Vector2(1, 1))
      );

      // if (i < points.length - 1) {
      let leftZero = zero.clone().subtract(right.clone().scale(-50));
      let leftThree = three.clone().subtract(right.clone().scale(-50));
      this.outerBounds.push(
        ...vector2ToFloats(three),
        ...vector2ToFloats(zero),
        ...vector2ToFloats(leftZero),

        ...vector2ToFloats(zero),
        ...vector2ToFloats(leftZero),
        ...vector2ToFloats(leftThree),
      );

      let rightOne = one.clone().subtract(right.clone().scale(50));
      let rightTwo = two.clone().subtract(right.clone().scale(50));

      this.innerBounds.push(
        ...vector2ToFloats(one),
        ...vector2ToFloats(two),
        ...vector2ToFloats(rightOne),

        ...vector2ToFloats(two),
        ...vector2ToFloats(rightTwo),
        ...vector2ToFloats(rightOne)
      );
      // }
    }
  }

  clear() {
    if (this.mesh) {
      this.mesh.destroy();
      this.mesh = null;
    }
  }

  draw() {
    this.clear();

    this.mesh = this.scene.make.mesh({
      key: 'track',
      x: 0,
      y: 0,
      vertices: this.vertices,
      uv: this.uvs,
    });
  }

  getVertices() {
    return this.vertices;
  }

  getUVs() {
    return this.uvs;
  }

  getOuterBounds() {
    return this.outerBounds;
  }

  getInnerBounds() {
    return this.innerBounds;
  }
}
