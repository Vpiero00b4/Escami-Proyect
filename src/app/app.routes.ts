import { Routes } from '@angular/router';
import { LibroList } from './components/features/libros/libro-list/libro-list';
import { EmptyHomeComponent } from '../components/EmptyHomeComponent';
import { HomeComponent } from '../components/home.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'libros', component: LibroList },      // 👉 /home/libros carga libros
      { path: '', component: EmptyHomeComponent }    // 👉 /home carga vacío
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
