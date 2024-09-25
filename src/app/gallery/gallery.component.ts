import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbCarouselModule, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    CommonModule,
    NgbCarouselModule
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  images = [
    { src: 'https://via.placeholder.com/600x400?text=Image+1', alt: 'Image 1' },
    { src: 'https://via.placeholder.com/600x400?text=Image+2', alt: 'Image 2' },
    { src: 'https://via.placeholder.com/600x400?text=Image+3', alt: 'Image 3' }
  ];
}
