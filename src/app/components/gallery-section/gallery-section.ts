import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export const GALLERY_PHOTOS = [
  {
    number: '01',
    title: 'Find your flow',
    image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1100&q=85',
    imageAlt: 'Dancers moving together in a studio',
  },
  {
    number: '02',
    title: 'Move together',
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=1100&q=85',
    imageAlt: 'Dance class sharing an energetic moment',
  },
  {
    number: '03',
    title: 'Feel the music',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1100&q=85',
    imageAlt: 'Crowd enjoying live music under stage lights',
  },
  {
    number: '04',
    title: 'Let the music lead',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1100&q=85',
    imageAlt: 'Dancer expressing themself through movement',
  },
  {
    number: '05',
    title: 'Bring your own rhythm',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1100&q=85',
    imageAlt: 'Neon sign celebrating the music that moves you',
  },
  {
    number: '06',
    title: 'Make it a memory',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1100&q=85',
    imageAlt: 'Dancer posing after a studio session',
  },
  {
    number: '07',
    title: 'For your big moment',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1100&q=85',
    imageAlt: 'Wedding flowers arranged for a celebration',
  },
];

@Component({
  selector: 'app-gallery-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './gallery-section.html',
  styleUrl: './gallery-section.css',
})
export class GallerySection {
  protected readonly photos = GALLERY_PHOTOS.slice(0, 4);
}