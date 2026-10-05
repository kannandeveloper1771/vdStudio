import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app and render the studio sections', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain("Vino's");
    expect(compiled.querySelector('app-site-header')).toBeTruthy();
    expect(compiled.querySelector('app-classes-section')).toBeTruthy();
    expect(compiled.querySelector('app-gallery-section')).toBeTruthy();
    expect(compiled.querySelector('app-site-footer')).toBeTruthy();
    expect(compiled.querySelector('#contact input[name="name"][required]')).toBeTruthy();
    expect(compiled.querySelector('#contact input[name="email"][type="email"][required]')).toBeTruthy();
    expect(compiled.querySelector('#contact select[name="class"] option[value=""]')).toBeTruthy();
  });

  it('should render the full gallery on its own route', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/gallery');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#gallery-page-title')?.textContent).toContain('The studio');
    expect(compiled.querySelectorAll('.gallery-page__photo').length).toBe(7);
  });
});
