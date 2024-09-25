import { Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import Konva from 'konva';
import { BehaviorSubject } from 'rxjs';
import { Result } from '../face-detection/models/face-detection.model';

@Component({
  selector: 'app-konva-test',
  standalone: true,
  template: `<div #container></div>`,
})
export class KonvaTestComponent {
  @Input()
  imageUrl!: string;

  @Input()
  data!: Result;

  outputUrl?:string;

  readonly offset = 50;

  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    
    const imageObj = new Image();
    imageObj.onload = () => {
      console.log(
        '[imageObj.width]', imageObj.width
      );
      console.log(
        '[imageObj.height]', imageObj.height
      );

      const stage = new Konva.Stage({
        container: this.containerRef.nativeElement,
        width: imageObj.width + 50,
        height: imageObj.height + 50,
      });
  
      const layer = new Konva.Layer();
      stage.add(layer);

      const img = new Konva.Image({
        x: this.offset,
        y: this.offset,
        image: imageObj,
        width: imageObj.width,
        height: imageObj.height,
      });

      layer.add(img);
      this.drawBoundingBox(layer);
      layer.draw();

      this.outputUrl = stage.toDataURL();
      console.log('[this.outputUrl]', this.outputUrl);
    };
    imageObj.src = this.imageUrl;
  }

  drawBoundingBox(layer: Konva.Layer) {
    const { left, top, right, bottom } = this.data.rectangle;

    const rect = new Konva.Rect({
      x: left +this.offset,
      y: top+this.offset,
      width: right - left,
      height: bottom - top,
      stroke: 'red',
      strokeWidth: 2,
    });

    const confidenceText = new Konva.Text({
      x: left +this.offset,
      y: top - 22 +this.offset,
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
      x: left +this.offset,
      y: top - 40 +this.offset,
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
      x: left +this.offset,
      y: top - 60 +this.offset,
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
