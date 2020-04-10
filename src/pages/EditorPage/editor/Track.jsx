import Phaser from 'phaser';
import { PathEditor } from './PathEditor';
import { TrackDrawer } from './TrackDrawer';
import * as dat from 'dat.gui';
import createCar from '../../GamePage/Gameplay/CarFactory';
import { TrackService } from '../../../service/TrackService';

import { notification } from 'antd';

export class Track {
  constructor(scene, graphics) {
    this.pathEditor = new PathEditor(scene, graphics);
    this.trackDrawer = new TrackDrawer(scene, this.pathEditor);
    this.trackName = 'New Track';
    this.trackId = null;
    this.version = 0;

    this.car = createCar(
      { maxForwardSpeed: 25, maxBackwardSpeed: 15, maxDriveForce: 4.5 },
      scene
    );

    this.setGUI();

    this.setTestTrack();
  }

  saveTrack() {
    let data = {};
    data.name = this.trackName;
    data.points = [];
    let points = this.pathEditor.getPoints();
    for (let i in points) {
      data.points.push({
        x: points[i].x,
        y: points[i].y,
        width: 350,
        isCheckpoint: false,
        isStart: false,
      });
    }
    data.version = this.version++;

    if (this.trackId) {
      TrackService.updateTrack(this.trackId, data)
        .then((returned) => {
          console.log(returned);
        })
        .catch((err) => {
          console.log(err);
          notification['error']({
            message: 'Error saving track',
            description: err.error,
          });
        });
    } else {
      TrackService.createTrack(data)
        .then((returned) => {
          console.log(returned);
        })
        .catch((err) => {
          console.log(err);
          notification['error']({
            message: 'Error saving track',
            description: err.error,
          });
        });
    }
  }

  setGUI() {
    var gui = new dat.GUI({ autoPlace: false });

    gui.add(this, 'trackName').name('Track Name');
    gui.add(this, "saveTrack").name("Save");

    let createFolder = gui.addFolder('Create');

    createFolder
      .add(this.pathEditor, 'addCubicBezier')
      .name('Add cubic bezier');
    createFolder.open();

    let editor = this.pathEditor;

    editor.addCurveListener((name, curve) => {
      let folder = gui.addFolder(name);

      console.log(name, curve);
      let points = curve.editor.points;
      console.log(points);

      for (let i in points) {
        let pFolder = folder.addFolder('Point ' + i);
        pFolder.add(points[i], 'width');
      }
    });

    let trackFolder = gui.addFolder('Track');
    trackFolder.add(this.trackDrawer, 'draw').name('Draw track');
    trackFolder.add(this.trackDrawer, 'clear').name('Clear track');

    var customContainer = document.getElementById('dat-gui-container');
    customContainer.appendChild(gui.domElement);
  }

  setTestTrack() {
    //Prepare test path
    let points = [];
    let full90 = [
      Math.PI / 2,
      Math.PI,
      (3 * Math.PI) / 2,
      2 * Math.PI,
      2 * Math.PI,
    ];

    for (
      let a = Math.PI / 6;
      a <= 2 * Math.PI + Math.PI / 6;
      a += Math.PI / 6
    ) {
      let radius = 1380;

      let found = false;
      for (let i in full90) {
        let v = full90[i];

        if (Math.abs(v - a) < 0.1) {
          found = true;
          break;
        }
      }

      if (found) {
        radius = 1200;
      }

      points.push(
        new Phaser.Math.Vector2(Math.cos(a) * radius, Math.sin(a) * radius)
      );
    }

    for (let i = 0; i < points.length; i += 3) {
      this.pathEditor.addCubicBezierPoints(points.slice(i, i + 3));
    }

    this.pathEditor.closePath();
  }
}
