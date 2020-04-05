import Phaser from 'phaser';

const Vector2 = Phaser.Math.Vector2;

export class Point {
    constructor(curveEditor, curve, point) {
        this.curveEditor = curveEditor;
        this.position = curve[point];
        this.width = 50;

        this.rectangle = curveEditor.scene.add.rectangle(this.position.x, this.position.y, 32,32, 0xff0000).setInteractive({draggable: true});

        this.rectangle.on('drag', (pointer, dragX, dragY) => this.onDrag(pointer, dragX, dragY));
    }

    onDrag(pointer, dragX, dragY) {
        this.rectangle.setPosition(dragX, dragY);
        this.position.x = dragX;
        this.position.y = dragY;

        this.curveEditor.onUpdate();
    }
}