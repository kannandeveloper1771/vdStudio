import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.css',
})
export class ContactSection {
  protected submitContact(event: Event): void {
    event.preventDefault();

    const form = event.currentTarget;
    if (!(form instanceof HTMLFormElement) || !form.reportValidity()) {
      return;
    }

    const values = new FormData(form);
    const name = String(values.get('name') ?? '').trim();
    const age = String(values.get('age') ?? '').trim();
    const gender = String(values.get('gender') ?? '');
    const email = String(values.get('email') ?? '').trim();
    const phone = String(values.get('phone') ?? '').trim();
    const danceClass = String(values.get('class') ?? '');
    const body = [
      `Name: ${name}`,
      `Age: ${age}`,
      `Gender: ${gender}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Class: ${danceClass}`,
    ].join('\n');

    window.location.href = `mailto:hello@vinosdance.com?subject=${encodeURIComponent(`Class enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
  }
}