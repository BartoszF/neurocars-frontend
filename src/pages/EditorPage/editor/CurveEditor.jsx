import Phaser from 'phaser';
import { Point } from './Point';

const Vector2 = Phaser.Math.Vector2;

export class CurveEditor {
  constructor(pathEditor, curve, previousCurve) {
    this.pathEditor = pathEditor;
    this.scene = pathEditor.scene;
    this.curve = curve;
    this.previousCurve = previousCurve;
    this.points = [];

    //FOR NOW ITS ONLY BEZIER

    if (this.previousCurve != null) {
      this.curve.p0 = this.previousCurve.p3;
    } else {
      this.points.push(new Point(this, this.curve, 'p0'));
    }

    this.points.push(new Point(this, this.curve, 'p1'));
    this.points.push(new Point(this, this.curve, 'p2'));
    this.points.push(new Point(this, this.curve, 'p3'));
  }

  attachLastTo(point) {
    this.curve.p3 = point;

    let lastPoint = this.points.splice(-1, 1);
    lastPoint[0].onRemove();
  }

  onUpdate() {
    this.pathEditor.draw();
  }
}
