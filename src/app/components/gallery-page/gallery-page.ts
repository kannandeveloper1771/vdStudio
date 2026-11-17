import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';

const GALLERY_CATEGORIES = ['All', 'Classes', 'Performances', 'Events', 'Workshops'] as const;

type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];
type PhotoCategory = Exclude<GalleryCategory, 'All'>;

interface GalleryPhoto {
  number: string;
  title: string;
  image: string;
  imageAlt: string;
  category: PhotoCategory;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    number: '01',
    title: 'Find your spotlight',
    image: '/assets/images/img4.jpg',
    imageAlt: 'Dancer performing beneath colorful stage lights',
    category: 'Performances',
  },
  {
    number: '02',
    title: 'Every move tells a story',
    image: '/assets/images/img5.jpg',
    imageAlt: 'Classical dancer practicing expressive hand movements',
    category: 'Classes',
  },
  {
    number: '03',
    title: 'Move as one',
    image: '/assets/images/img6.jpg',
    imageAlt: 'Dance crew moving together on a colorful stage',
    category: 'Performances',
  },
  {
    number: '04',
    title: 'Celebrate the rhythm',
    image: '/assets/images/img7.jpg',
    imageAlt: 'A joyful group dancing together',
    category: 'Events',
  },
  {
    number: '05',
    title: 'Bring your own energy',
    image: '/assets/images/img8.jpg',
    imageAlt: 'Dancer performing in a warm spotlight',
    category: 'Workshops',
  },
  {
    number: '06',
    title: 'Find your balance',
    image: '/assets/images/img9.jpg',
    imageAlt: 'Two dancers rehearsing together in the studio',
    category: 'Classes',
  },
  {
    number: '07',
    title: 'Make it a moment',
    image: '/assets/images/img10.jpg',
    imageAlt: 'Solo dancer moving across a golden stage',
    category: 'Performances',
  },
];

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective],
  templateUrl: './gallery-page.html',
  styleUrl: './gallery-page.css',
})
export class GalleryPage {
  @ViewChild('lightbox', { static: true })
  private readonly lightbox!: ElementRef<HTMLDialogElement>;

  protected readonly categories = GALLERY_CATEGORIES;
  protected readonly photos = GALLERY_PHOTOS;
  protected activeCategory: GalleryCategory = 'All';
  protected selectedPhotoIndex: number | null = null;

  protected get visiblePhotos(): GalleryPhoto[] {
    return this.activeCategory === 'All'
      ? this.photos
      : this.photos.filter((photo) => photo.category === this.activeCategory);
  }

  protected get selectedPhoto(): GalleryPhoto | null {
    return this.selectedPhotoIndex === null
      ? null
      : (this.visiblePhotos[this.selectedPhotoIndex] ?? null);
  }

  protected selectCategory(category: GalleryCategory): void {
    this.activeCategory = category;
  }

  protected openPhoto(index: number): void {
    this.selectedPhotoIndex = index;
    this.lightbox.nativeElement.showModal();
  }

  protected closePhoto(): void {
    this.selectedPhotoIndex = null;
    if (this.lightbox.nativeElement.open) {
      this.lightbox.nativeElement.close();
    }
  }

  protected closeOnBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closePhoto();
    }
  }

  protected showPreviousPhoto(): void {
    if (this.selectedPhotoIndex !== null) {
      this.selectedPhotoIndex =
        (this.selectedPhotoIndex - 1 + this.visiblePhotos.length) % this.visiblePhotos.length;
    }
  }

  protected showNextPhoto(): void {
    if (this.selectedPhotoIndex !== null) {
      this.selectedPhotoIndex = (this.selectedPhotoIndex + 1) % this.visiblePhotos.length;
    }
  }

  @HostListener('document:keydown', ['$event'])
  protected handleKeydown(event: KeyboardEvent): void {
    if (this.selectedPhotoIndex === null) {
      return;
    }

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.showPreviousPhoto();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.showNextPhoto();
        break;
    }
  }
}
