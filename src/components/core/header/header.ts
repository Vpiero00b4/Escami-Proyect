
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Categoria } from '../../../models/libros/categoria';
import { Subcategoria } from '../../../models/libros/subcategoria';
import { CategoriaService } from '../../services/services-tienda/libros/categorias.service';
import { macService } from '../../services/services-tienda/mac/mac.service';
import { MacCategoria } from '../../../models/mac/macCategoria';
import { OffcanvasCartComponent } from '../../features/offcanvas-cart.css/offcanvas-cart.component';
import { CartService } from '../../services/cart.service.ts';

declare const bootstrap: any;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, OffcanvasCartComponent],
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
  private macService = inject(macService);
  private route = inject(ActivatedRoute);
  cart = inject(CartService); // Cambiado a public para usar en template

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

  getSubcategoriasByCategoria(idCategoria: number): Subcategoria[] {
    return this.subcategorias.filter(s => s.idCategoria === idCategoria);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
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
  get cartCount(): number {
    return this.cart.items.length;
  }

  abrirCarrito() {
    const offcanvasEl = document.getElementById('cartOffcanvas');
    if (offcanvasEl && typeof bootstrap?.Offcanvas === 'function') {
      const instance = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
      instance.show();
    }
  }
}