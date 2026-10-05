import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GALLERY_PHOTOS } from '../gallery-section/gallery-section';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './gallery-page.html',
  styleUrl: './gallery-page.css',
})
export class GalleryPage {
  protected readonly photos = GALLERY_PHOTOS;
}
