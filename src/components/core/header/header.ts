import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Categoria } from '../../../models/libros/categoria';
import { Subcategoria } from '../../../models/libros/subcategoria';
import { CategoriaService } from '../../services/services-tienda/libros/categorias.service';
import { MacCategoria } from '../../../models/mac/macCategoria';
import { CartService } from '../../services/cart.service.ts';
import { macService } from '../../services/services-tienda/mac/mac.service';

declare const bootstrap: any;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
  // Sidebar y navegación
  isSidebarOpen = false;
  empresaAbierta: string | null = null;
  categoriaAbierta: number | null = null;
  macAbiertaCat: string | null = null;

  // Categorías y subcategorías
  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];
  categoriaMac: string | null = null;
  subcategoriaMac: string | null = null;
  maccategorias: MacCategoria[] = [];

  // Servicios
  private categoriaService = inject(CategoriaService);
  // private macService = inject(MacService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public cartService = inject(CartService); // público para usar en el template
  public macService = inject(macService);
  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarSubcategorias();
    this.route.paramMap.subscribe(params => {
      this.categoriaMac = params.get('categoriaMac');
      this.subcategoriaMac = params.get('subcategoriaMac');
    });
    this.cargarMacCategorias();
  }

  /*** Manejo de categorías y subcategorías ***/
  cargarCategorias() {
    this.categoriaService.getCategorias().subscribe({
      next: data => this.categorias = data,
      error: err => console.error('❌ Error cargando categorías', err)
    });
  }

  cargarSubcategorias() {
    this.categoriaService.getSubcategorias().subscribe({
      next: data => this.subcategorias = data,
      error: err => console.error('❌ Error cargando subcategorías', err)
    });
  }

  navegarASubcategoria(idCategoria: number, idSubcategoria: number) {
    this.router.navigate([
      '/home/libros/subcategoria',
      idSubcategoria
    ]);
    this.toggleSidebar(); // cerrar sidebar al navegar
  }

  getSubcategoriasByCategoria(idCategoria: number): Subcategoria[] {
    return this.subcategorias.filter(s => s.idCategoria === idCategoria);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleCart() {
    this.cartService.abrirCarro();
  }

  toggleEmpresa(nombre: string) {
    this.empresaAbierta = this.empresaAbierta === nombre ? null : nombre;
    this.categoriaAbierta = null;
    this.macAbiertaCat = null;
  }

  toggleCategoria(idCategoria: number) {
    this.categoriaAbierta = this.categoriaAbierta === idCategoria ? null : idCategoria;
  }

  /*** Manejo MAC ***/
    cargarMacCategorias() {
      this.macService.getCategorias().subscribe(res => {
        this.maccategorias = Array.isArray(res) ? res : [res];
      });
    }

  /*** Carrito ***/
  abrirCarrito() {
    const offcanvasEl = document.getElementById('cartOffcanvas');
    if (offcanvasEl && typeof bootstrap?.Offcanvas === 'function') {
      const instance = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
      instance.show();
    }
  }
}
