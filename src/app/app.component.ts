import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbAlert, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleryComponent } from "./gallery/gallery.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    // NgbModule,
    NgbAlertModule,
    GalleryComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'face-detection-app';
}
