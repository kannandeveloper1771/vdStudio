import { Component } from '@angular/core';
import { AboutSection } from '../about-section/about-section';
import { ClassesSection } from '../classes-section/classes-section';
import { ContactSection } from '../contact-section/contact-section';
import { GallerySection } from '../gallery-section/gallery-section';
import { HeroSection } from '../hero-section/hero-section';
import { SiteFooter } from '../site-footer/site-footer';
import { SiteHeader } from '../site-header/site-header';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SiteHeader, HeroSection, AboutSection, ClassesSection, GallerySection, ContactSection, SiteFooter],
  templateUrl: './home-page.html',
})
export class HomePage {}
