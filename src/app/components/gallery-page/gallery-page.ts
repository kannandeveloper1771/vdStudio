import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GALLERY_PHOTOS } from '../gallery-section/gallery-section';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective],
  templateUrl: './gallery-page.html',
  styleUrl: './gallery-page.css',
})
export class GalleryPage {
  protected readonly photos = GALLERY_PHOTOS;
}
