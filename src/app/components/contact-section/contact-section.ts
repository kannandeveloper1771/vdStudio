import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-section',
  standalone: true,
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
    const email = String(values.get('email') ?? '').trim();
    const phone = String(values.get('phone') ?? '').trim();
    const danceClass = String(values.get('class') ?? '');
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || 'Not provided'}`,
      `Class: ${danceClass || 'Not sure yet'}`,
    ].join('\n');

    window.location.href = `mailto:hello@vinosdance.com?subject=${encodeURIComponent(`Class enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
  }
}