import { Routes } from '@angular/router';
import { ClassesPage } from './components/classes-page/classes-page';
import { GalleryPage } from './components/gallery-page/gallery-page';
import { HomePage } from './components/home-page/home-page';

export const routes: Routes = [
  { path: '', component: HomePage, title: "Vino's Dance Studio" },
  { path: 'classes', component: ClassesPage, title: "Dance Classes | Vino's Dance Studio" },
  { path: 'gallery', component: GalleryPage, title: "Studio Gallery | Vino's Dance Studio" },
  { path: '**', redirectTo: '' },
];
