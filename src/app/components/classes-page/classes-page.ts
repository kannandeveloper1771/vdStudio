import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DANCE_CLASSES } from '../classes-section/classes-section';
import type { DanceClass } from '../classes-section/classes-section';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';

@Component({
  selector: 'app-classes-page',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective],
  templateUrl: './classes-page.html',
  styleUrl: './classes-page.css',
})
export class ClassesPage implements AfterViewInit {
  protected readonly classes = DANCE_CLASSES;
  protected readonly selectedClass = signal<DanceClass | null>(null);
  protected readonly bookingSent = signal(false);
  protected readonly classDialog = viewChild<ElementRef<HTMLDialogElement>>('classDialog');
  private readonly route = inject(ActivatedRoute);

  constructor() {
    const requestedNumber = this.route.snapshot.queryParamMap.get('class');
    this.selectedClass.set(
      this.classes.find((danceClass) => danceClass.number === requestedNumber) ?? null,
    );
  }

  ngAfterViewInit(): void {
    if (this.selectedClass()) {
      this.classDialog()?.nativeElement.showModal();
    }
  }

  protected openClassDetails(danceClass: DanceClass): void {
    this.bookingSent.set(false);
    this.selectedClass.set(danceClass);
    const dialog = this.classDialog()?.nativeElement;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }

  protected closeClassDetails(): void {
    this.classDialog()?.nativeElement.close();
  }

  protected onDialogClose(): void {
    this.selectedClass.set(null);
    this.bookingSent.set(false);
  }

  protected closeOnBackdrop(event: MouseEvent): void {
    if (event.target === this.classDialog()?.nativeElement) {
      this.closeClassDetails();
    }
  }

  protected submitBooking(event: SubmitEvent): void {
    event.preventDefault();
    this.bookingSent.set(true);
  }
}
