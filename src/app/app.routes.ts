import { Routes } from '@angular/router';
import { LibroList } from './components/features/libros/libro-list/libro-list';
import { CalzadoList } from './components/features/calzados/calzado-list/calzado-list'; // New import
import { EmptyHomeComponent } from '../components/EmptyHomeComponent';
import { HomeComponent } from '../components/home.component';
import { MacList } from './components/features/mac/mac-list/mac-list';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'libros', component: LibroList },       // 👉 /home/libros loads books
      { path: 'calzados', component: CalzadoList },    // 👉 /home/calzados loads footwear
      { path: '', component: EmptyHomeComponent },      // 👉 /home loads empty
      { path: 'macProductos/:categoriaMac/:subcategoriaMac/:idSubcategoria', component: MacList }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
