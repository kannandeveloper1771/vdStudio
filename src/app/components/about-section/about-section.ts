import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, signal } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './about-section.html',
  styleUrl: './about-section.css',
})
export class AboutSection implements AfterViewInit, OnDestroy {
  @ViewChild('aboutMetrics') private aboutMetrics?: ElementRef<HTMLElement>;

  protected readonly experienceCount = signal(0);
  protected readonly studentsCount = signal(0);

  private observer?: IntersectionObserver;
  private animationFrame = 0;

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.animateMetrics();
      return;
    }

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.observer?.disconnect();
        this.animateMetrics();
      }
    }, { threshold: 0.25 });

    if (this.aboutMetrics) {
      this.observer.observe(this.aboutMetrics.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.animationFrame && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  private animateMetrics(): void {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.experienceCount.set(10);
      this.studentsCount.set(150);
      return;
    }

    const startTime = window.performance.now();
    const duration = 1400;
    const update = (time: number): void => {
      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      this.experienceCount.set(Math.round(10 * easedProgress));
      this.studentsCount.set(Math.round(150 * easedProgress));

      if (progress < 1) {
        this.animationFrame = window.requestAnimationFrame(update);
      }
    };

    this.animationFrame = window.requestAnimationFrame(update);
  }
}