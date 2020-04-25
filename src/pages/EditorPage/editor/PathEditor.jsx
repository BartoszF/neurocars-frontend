import Phaser from 'phaser';
import { CurveEditor } from './CurveEditor';

const Vector2 = Phaser.Math.Vector2;

export const getParamsFromVector2 = (vector, name) => {
  return [
    [vector, 'x', name + ' x'],
    [vector, 'y', name + ' y'],
  ];
};

export class PathEditor {
  constructor(scene, graphics) {
    this.curves = [];
    this.scene = scene;
    this.listeners = [];
    this.graphics = graphics;
    graphics.setDepth(8);
    this.path = scene.add.path(1200, 0);
    this.isClosed = false;
  }

  addCurveListener(listener) {
    this.listeners.push(listener);
  }

  getPath() {
    return this.path;
  }

  getPoints() {
    return this.path.getSpacedPoints(this.path.getLength() / 100);
  }

  closePath() {
    this.path.closePath();

    let firstCurve = this.curves[0];
    let lastCurve = this.curves[this.curves.length - 1];

    lastCurve.editor.attachLastTo(firstCurve.curve.p0);

    this.draw();

    this.isClosed = true;
  }

  addCubicBezier() {
    this.addCubicBezierPoints([
      new Vector2(100, 100),
      new Vector2(75, 75),
      new Vector2(50, 50),
    ]);
  }

  addCubicBezierPoints(points) {
    this.path.cubicBezierTo(points[0], points[1], points[2]);

    let currentCurve = this.path.curves[this.path.curves.length - 1];
    let previousCurve = null;

    if (this.path.curves.length > 1) {
      previousCurve = this.path.curves[this.path.curves.length - 2];
    }

    let curve = {
      curve: currentCurve,
      editor: new CurveEditor(this, currentCurve, previousCurve),
    };
    this.curves.push(curve);

    this.onCurveAdded('Bezier ' + this.path.curves.length, curve);

    this.draw();
  }

  draw() {
    this.updateLengths();

    this.graphics.clear();

    this.graphics.lineStyle(8, 0xffffff, 1.0);
    this.path.draw(this.graphics);

    this.graphics.strokePath();
  }

  updateLengths() {
    for (let i in this.path.curves) {
      this.path.curves[i].updateArcLengths();
    }
    this.path.updateArcLengths();
  }

  onCurveAdded(name, curve) {
    for (var i in this.listeners) this.listeners[i](name, curve);
  }
}
