import { Routes } from '@angular/router';
import { LibroList } from './components/features/libros/libro-list/libro-list';
import { CalzadoList } from './components/features/calzados/calzado-list/calzado-list';
import { EmptyHomeComponent } from '../components/EmptyHomeComponent';
import { HomeComponent } from '../components/home.component';
import { MacList } from './components/features/mac/mac-list/mac-list';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'libros/subcategoria/:idSubcategoria', component: LibroList },
      { path: 'libros', component: LibroList }, 
      { path: 'calzados', component: CalzadoList },
      { path: '', component: EmptyHomeComponent },     
      // 🍏 Ruta dinámica para mac
      { path: 'macProductos/:categoriaMac/:subcategoriaMac/:idSubcategoria', component: MacList }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
