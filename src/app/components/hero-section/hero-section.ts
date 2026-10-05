import { Component, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {
  protected readonly slides = [
    {
      id: 'studio-flow',
      name: 'Studio flow',
      poster: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1800&q=85',
      video: 'https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4',
      quote: 'Take up space. Take the step. Trust the rhythm.',
    },
    {
      id: 'find-your-groove',
      name: 'Find your groove',
      poster: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1800&q=85',
      video: 'https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_25fps.mp4',
      quote: 'Confidence is built one count before the music drops.',
    },
    {
      id: 'move-together',
      name: 'Move together',
      poster: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=1800&q=85',
      video: 'https://videos.pexels.com/video-files/3129614/3129614-hd_1920_1080_25fps.mp4',
      quote: 'Some days you lead the dance. Some days the music does.',
    },
  ];
  protected readonly activeIndex = signal(0);
  protected readonly activeSlide = computed(() => this.slides[this.activeIndex()]);
  protected readonly autoAdvance = signal(true);

  constructor() {
    interval(8000)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        if (this.autoAdvance()) {
          this.nextVideo();
        }
      });
  }

  protected selectVideo(index: number): void {
    this.activeIndex.set(index);
  }

  protected nextVideo(): void {
    this.activeIndex.update((index) => (index + 1) % this.slides.length);
  }

  protected previousVideo(): void {
    this.activeIndex.update((index) => (index - 1 + this.slides.length) % this.slides.length);
  }

  protected toggleAutoAdvance(): void {
    this.autoAdvance.update((isPlaying) => !isPlaying);
  }
}