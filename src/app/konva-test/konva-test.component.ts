import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import Konva from 'konva';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-konva-test',
  standalone: true,
  template: `<div #container></div>`,
})
export class KonvaTestComponent {
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  data = {
    rectangle: { left: 104, top: 76, right: 211, bottom: 222 },
    confidence: 99.99635314941406,
    age: 33,
    gender: 'male',
  };

  imageUrl = 'data:image/webp;base64,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'; // Change this to your image URL

  ngAfterViewInit() {
    const stage = new Konva.Stage({
      container: this.containerRef.nativeElement,
      width: 300,
      height: 300,
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    const imageObj = new Image();
    imageObj.onload = () => {
      const img = new Konva.Image({
        x: 0,
        y: 0,
        image: imageObj,
        width: 300,
        height: 300,
      });

      layer.add(img);
      this.drawBoundingBox(layer);
    };
    imageObj.src = this.imageUrl;
    layer.draw();
  }

  drawBoundingBox(layer: Konva.Layer) {
    const { left, top, right, bottom } = this.data.rectangle;

    const rect = new Konva.Rect({
      x: left,
      y: top,
      width: right - left,
      height: bottom - top,
      stroke: 'red',
      strokeWidth: 2,
    });

    const confidenceText = new Konva.Text({
      x: left,
      y: top - 22,
      text: `Confidence: ${this.data.confidence.toFixed(2)}%`,
      fontSize: 16,
      fill: 'black',
    });

    const confidenceBackground = new Konva.Rect({
      x: confidenceText.x()-3,
      y: confidenceText.y()-3,
      width: confidenceText.width() + 5,
      height: confidenceText.height() + 5,
      fill: 'white',  // Background (highlight) color
      cornerRadius: 4  // Optional rounded corners for the background
    });

    const ageText = new Konva.Text({
      x: left,
      y: top - 40,
      text: `Age: ${this.data.age}`,
      fontSize: 16,
      fill: 'black',
    });

    const ageBackground = new Konva.Rect({
      x: ageText.x()-3,
      y: ageText.y()-4,
      width: ageText.width() + 5,
      height: ageText.height() + 5,
      fill: 'white',  // Background (highlight) color
      cornerRadius: 4  // Optional rounded corners for the background
    });

    const genderText = new Konva.Text({
      x: left,
      y: top - 60,
      text: `Gender: ${this.data.gender}`,
      fontSize: 16,
      fill: 'black',
    });

    const genderBackground = new Konva.Rect({
      x: genderText.x()-3,
      y: genderText.y()-3,
      width: genderText.width() + 5,
      height: genderText.height() + 5,
      fill: 'white',  // Background (highlight) color
      cornerRadius: 4  // Optional rounded corners for the background
    });

    layer.add(rect);
    layer.add(confidenceBackground)
    layer.add(confidenceText);
    layer.add(ageBackground);
    layer.add(ageText);
    layer.add(genderBackground);
    layer.add(genderText);
    layer.draw();
  }
}
