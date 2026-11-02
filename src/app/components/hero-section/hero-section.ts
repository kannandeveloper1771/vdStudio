import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {
  private readonly imageUrls = [
    '/assets/images/im3.jpg',
    '/assets/images/image1.jpg',
    '/assets/images/image2.jpg',
    '/assets/images/img4.jpg',
    '/assets/images/img5.jpg',
    '/assets/images/img6.jpg',
    '/assets/images/img7.jpg',
    '/assets/images/img8.jpg',
  ];
  protected readonly imageSlots = signal(
    this.imageUrls
      .slice(0, 5)
      .map((src, id) => ({ id, src, replacement: null as string | null })),
  );
  private readonly availableImages = signal(this.imageUrls.slice(5));

  constructor() {
    interval(1500)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.replaceNextImage();
      });
  }

  protected finishReplacement(index: number): void {
    const slot = this.imageSlots()[index];
    if (!slot || !slot.replacement) {
      return;
    }

    const replacement = slot.replacement;
    this.imageSlots.update((slots) =>
      slots.map((currentSlot, slotIndex) =>
        slotIndex === index
          ? { ...currentSlot, src: replacement, replacement: null }
          : currentSlot,
      ),
    );
    this.availableImages.update((images) => [...images, slot.src]);
  }

  private replaceNextImage(): void {
    const availableSlots = this.imageSlots()
      .map((slot, index) => ({ slot, index }))
      .filter(({ slot }) => slot.replacement === null);
    const images = this.availableImages();

    if (availableSlots.length === 0 || images.length === 0) {
      return;
    }

    const selectedSlot = availableSlots[Math.floor(Math.random() * availableSlots.length)];
    const selectedImageIndex = Math.floor(Math.random() * images.length);
    const replacement = images[selectedImageIndex];

    this.availableImages.update((available) =>
      available.filter((_, index) => index !== selectedImageIndex),
    );
    this.imageSlots.update((slots) =>
      slots.map((slot, slotIndex) =>
        slotIndex === selectedSlot.index ? { ...slot, replacement } : slot,
      ),
    );
  }
}