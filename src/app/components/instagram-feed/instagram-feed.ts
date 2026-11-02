import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';

@Component({
  selector: 'app-instagram-feed',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './instagram-feed.html',
  styleUrl: './instagram-feed.css',
})
export class InstagramFeed {
  protected readonly photos = [
    { src: '/assets/images/im3.jpg', alt: 'A lively dance class moving together' },
    { src: '/assets/images/image1.jpg', alt: 'A dancer performing on stage' },
    { src: '/assets/images/image2.jpg', alt: 'A fitness dance class in the studio' },
    { src: '/assets/images/img4.jpg', alt: 'Students practicing choreography' },
    { src: '/assets/images/img5.jpg', alt: 'A dancer rehearsing a graceful movement' },
    { src: '/assets/images/img6.jpg', alt: 'A group sharing their passion for dance' },
  ];
}
