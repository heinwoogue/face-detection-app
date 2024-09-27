import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import Konva from 'konva';
import { Result } from '../../models/face-detection.model';

@Component({
  selector: 'app-face-detection-viewer',
  standalone: true,
  template: `<div #container></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaceDetectionViewerComponent implements AfterViewInit, OnChanges {

  @Input()
  imageUrl!: string;

  @Input()
  data!: Result;

  @Output()
  scannedImageUrl = new EventEmitter<string>();

  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  
  private isViewInitialized = false;

  ngAfterViewInit() {
    this.renderKonva();
    this.isViewInitialized = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isViewInitialized) {
      this.renderKonva();
    }
  }

  private renderKonva(): void {
    const imageObj = new Image();
    imageObj.onload = () => {
      const stage = new Konva.Stage({
        container: this.containerRef.nativeElement,
        width: imageObj.width,
        height: imageObj.height,
      });

      const layer = new Konva.Layer();
      stage.add(layer);

      const img = new Konva.Image({
        x: 0,
        y: 0,
        image: imageObj,
        width: imageObj.width,
        height: imageObj.height,
      });

      layer.add(img);
      this.drawBoundingBox(layer);
      layer.draw();

      this.scannedImageUrl.emit(stage.toDataURL());
    };
    imageObj.src = this.imageUrl;
  }

  private drawBoundingBox(layer: Konva.Layer) {
    const { left, top, right, bottom } = this.data.rectangle;

    const rect = new Konva.Rect({
      x: left,
      y: top,
      width: right - left,
      height: bottom - top,
      stroke: 'red',
      strokeWidth: 2,
    });

    layer.add(rect);
    layer.draw();
  }
}
