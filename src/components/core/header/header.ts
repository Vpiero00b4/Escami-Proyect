import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Categoria } from '../../../models/libros/categoria';
import { Subcategoria } from '../../../models/libros/subcategoria';
import { CategoriaService } from '../../services/services-tienda/libros/categorias.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  isSidebarOpen = false;

  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];

  empresaAbierta: string | null = null;
  categoriaAbierta: number | null = null;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('❌ Error cargando categorías', err)
    });

    this.categoriaService.getSubcategorias().subscribe({
      next: (data) => this.subcategorias = data,
      error: (err) => console.error('❌ Error cargando subcategorías', err)
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
    this.categoriaAbierta = null; // reset categoría al cerrar empresa
  }

  toggleCategoria(idCategoria: number) {
    this.categoriaAbierta = this.categoriaAbierta === idCategoria ? null : idCategoria;
  }
}
