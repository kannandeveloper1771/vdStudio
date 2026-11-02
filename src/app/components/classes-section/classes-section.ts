import { Component, ElementRef, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';

export interface DanceClass {
  name: string;
  number: string;
  category: string;
  description: string;
  level: string;
  schedule: string;
  fee: string;
  image: string;
  imageAlt: string;
}

export const DANCE_CLASSES: DanceClass[] = [
  {
    name: 'Hip Hop',
    number: '01',
    category: 'Rhythm & expression',
    description: 'Find your groove, sharpen your musicality, and make bold choreography your own.',
    level: 'Beginner friendly',
    schedule: 'Ask us for current batch timings.',
    fee: 'Ask us for current fee details.',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Hip hop dancer performing with energy',
  },
  {
    name: 'Bollywood',
    number: '02',
    category: 'Story in every step',
    description: 'Bring expressive movement, feel-good energy, and cinematic combinations to the floor.',
    level: 'All levels welcome',
    schedule: 'Ask us for current batch timings.',
    fee: 'Ask us for current fee details.',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Dance performers moving together on stage',
  },
  {
    name: 'Contemporary',
    number: '03',
    category: 'Move with feeling',
    description: 'Explore fluid movement, musical phrasing, and a more personal way to tell a story.',
    level: 'Beginner friendly',
    schedule: 'Ask us for current batch timings.',
    fee: 'Ask us for current fee details.',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Contemporary dancer moving across a stage',
  },
  {
    name: 'Dance Fitness',
    number: '04',
    category: 'Energy that moves you',
    description: 'Get moving to upbeat music and leave the floor feeling stronger and more energized.',
    level: 'All levels welcome',
    schedule: 'Ask us for current batch timings.',
    fee: 'Ask us for current fee details.',
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Dance fitness class moving under studio lights',
  },
  {
    name: 'Salsa & Latin',
    number: '05',
    category: 'Find the rhythm',
    description: 'Build your timing, learn expressive partner-work foundations, and enjoy every beat.',
    level: 'Start with the basics',
    schedule: 'Ask us for current batch timings.',
    fee: 'Ask us for current fee details.',
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Latin dance performance on a lit stage',
  },
  {
    name: 'Kids Dance',
    number: '06',
    category: 'Big moves for little feet',
    description: 'A playful introduction to rhythm, coordination, and self-expression through dance.',
    level: 'Young dancers',
    schedule: 'Ask us for current batch timings.',
    fee: 'Ask us for current fee details.',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Young performers dancing together',
  },
  {
    name: 'Freestyle',
    number: '07',
    category: 'Make it your own',
    description: 'Explore musicality and movement ideas, then find the confidence to dance your way.',
    level: 'Open level',
    schedule: 'Ask us for current batch timings.',
    fee: 'Ask us for current fee details.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Dancer expressing movement in a studio',
  },
  {
    name: 'Wedding Dance',
    number: '08',
    category: 'Your moment, your music',
    description: 'Shape a personal first-dance routine with steps that feel natural and memorable.',
    level: 'Private choreography',
    schedule: 'Ask us for available private-session timings.',
    fee: 'Ask us for current fee details.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Couple sharing a first dance',
  },
];

@Component({
  selector: 'app-classes-section',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective],
  templateUrl: './classes-section.html',
  styleUrl: './classes-section.css',
})
export class ClassesSection {
  protected readonly classTrack = viewChild<ElementRef<HTMLDivElement>>('classTrack');
  private pointerStartX = 0;
  private pointerStartScroll = 0;
  private activePointerId: number | null = null;
  private isDragging = false;
  private hasDragged = false;

  protected readonly classes = DANCE_CLASSES;

  protected scrollClasses(direction: number): void {
    const track = this.classTrack()?.nativeElement;
    const card = track?.querySelector<HTMLElement>('.class-card');

    track?.scrollBy({
      left: direction * ((card?.offsetWidth ?? 280) + 16),
      behavior: 'smooth',
    });
  }

  protected startTrackDrag(event: PointerEvent): void {
    const track = this.classTrack()?.nativeElement;
    if (!track || (event.pointerType === 'mouse' && event.button !== 0)) {
      return;
    }

    this.pointerStartX = event.clientX;
    this.pointerStartScroll = track.scrollLeft;
    this.activePointerId = event.pointerId;
    this.isDragging = true;
    this.hasDragged = false;
  }

  protected moveTrackDrag(event: PointerEvent): void {
    const track = this.classTrack()?.nativeElement;
    if (!track || !this.isDragging || this.activePointerId !== event.pointerId) {
      return;
    }

    const distance = event.clientX - this.pointerStartX;
    if (!this.hasDragged && Math.abs(distance) > 5) {
      this.hasDragged = true;
      track.classList.add('is-dragging');
      track.setPointerCapture(event.pointerId);
    }

    if (this.hasDragged) {
      event.preventDefault();
      track.scrollLeft = this.pointerStartScroll - distance;
    }
  }

  protected endTrackDrag(event: PointerEvent): void {
    const track = this.classTrack()?.nativeElement;
    if (!track || this.activePointerId !== event.pointerId) {
      return;
    }

    this.isDragging = false;
    this.activePointerId = null;
    track.classList.remove('is-dragging');
    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
  }

  protected suppressDraggedClick(event: MouseEvent): void {
    if (this.hasDragged) {
      event.preventDefault();
      event.stopPropagation();
      this.hasDragged = false;
    }
  }
}