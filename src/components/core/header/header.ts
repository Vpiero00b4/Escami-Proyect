import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Categoria } from '../../../models/libros/categoria';
import { Subcategoria } from '../../../models/libros/subcategoria';
import { CategoriaService } from '../../services/services-tienda/libros/categorias.service';
import { macService } from '../../services/services-tienda/mac/mac.service';
import { MacCategoria } from '../../../models/mac/macCategoria';

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
  maccategorias: MacCategoria[] = [];
  macAbiertaCat: string | null = null;

  categoriaMac: string | null = null;
  subcategoriaMac: string | null = null;
  constructor(private categoriaService: CategoriaService, private macService: macService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('❌ Error cargando categorías', err)
    });

    this.categoriaService.getSubcategorias().subscribe({
      next: (data) => this.subcategorias = data,
      error: (err) => console.error('❌ Error cargando subcategorías', err)
    });
     this.route.paramMap.subscribe(params => {
      this.categoriaMac = params.get('categoriaMac');
      this.subcategoriaMac = params.get('subcategoriaMac');
    });
    this.cargarMacCategorias();
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
    this.macAbiertaCat = null;
  }

  toggleCategoria(idCategoria: number) {
    this.categoriaAbierta = this.categoriaAbierta === idCategoria ? null : idCategoria;
  }


  //MAC
  cargarMacCategorias() {
    this.macService.getCategorias().subscribe(res => {
      this.maccategorias = Array.isArray(res) ? res : [res];
    });
  }

}
