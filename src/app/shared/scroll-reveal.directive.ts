import { AfterViewInit, Directive, ElementRef, OnDestroy, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
  host: { class: 'scroll-reveal' },
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const host = this.element.nativeElement;
    const siblingIndex = Array.from(host.parentElement?.children ?? []).indexOf(host);
    this.renderer.setStyle(host, '--scroll-reveal-delay', `${Math.min(siblingIndex * 70, 350)}ms`);

    if (
      typeof IntersectionObserver === 'undefined' ||
      (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    ) {
      this.renderer.addClass(host, 'is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(host, 'is-visible');
          this.observer?.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -24px 0px' },
    );
    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
